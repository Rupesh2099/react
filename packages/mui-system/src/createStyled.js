/* eslint-disable no-underscore-dangle */
import defaultStyledEngineStyled, {
  internal_processStyles as defaultProcessStyles,
} from '@mui/styled-engine';
import {
  getDisplayName,
  unstable_capitalize as capitalize,
  isPlainObject,
  deepmerge,
} from '@mui/utils';
import createTheme from './createTheme';
import propsToClassKey from './propsToClassKey';
import styleFunctionSx from './styleFunctionSx';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// https://github.com/emotion-js/emotion/blob/26ded6109fcd8ca9875cc2ce4564fee678a3f3c5/packages/styled/src/utils.js#L40
function isStringTag(tag) {
  return (
    typeof tag === 'string' &&
    // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    tag.charCodeAt(0) > 96
  );
}

const getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }

  return null;
};

const transformVariants = (variants) => {
  let numOfCallbacks = 0;
  const variantsStyles = {};

  if (variants) {
    variants.forEach((definition) => {
      let key = '';
      if (typeof definition.props === 'function') {
        key = `callback${numOfCallbacks}`;
        numOfCallbacks += 1;
      } else {
        key = propsToClassKey(definition.props);
      }
      variantsStyles[key] = definition.style;
    });
  }

  return variantsStyles;
};
const getVariantStyles = (name, theme) => {
  let variants = [];
  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  return transformVariants(variants);
};

const variantsResolver = (props, styles, variants) => {
  const { ownerState = {} } = props;
  const variantsStyles = [];
  let numOfCallbacks = 0;

  if (variants) {
    variants.forEach((variant) => {
      let isMatch = true;
      if (typeof variant.props === 'function') {
        const propsToCheck = { ...props, ...ownerState };
        isMatch = variant.props(propsToCheck);
      } else {
        Object.keys(variant.props).forEach((key) => {
          if (ownerState[key] !== variant.props[key] && props[key] !== variant.props[key]) {
            isMatch = false;
          }
        });
      }
      if (isMatch) {
        if (typeof variant.props === 'function') {
          variantsStyles.push(styles[`callback${numOfCallbacks}`]);
        } else {
          variantsStyles.push(styles[propsToClassKey(variant.props)]);
        }
      }

      if (typeof variant.props === 'function') {
        numOfCallbacks += 1;
      }
    });
  }

  return variantsStyles;
};

const themeVariantsResolver = (props, styles, theme, name) => {
  const themeVariants = theme?.components?.[name]?.variants;
  return variantsResolver(props, styles, themeVariants);
};

// Update /system/styled/#api in case if this changes
export function shouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

export const systemDefaultTheme = createTheme();

const lowercaseFirstLetter = (string) => {
  if (!string) {
    return string;
  }
  return string.charAt(0).toLowerCase() + string.slice(1);
};

function resolveTheme({ defaultTheme, theme, themeId }) {
  return isEmpty(theme) ? defaultTheme : theme[themeId] || theme;
}

function defaultOverridesResolver(slot) {
  if (!slot) {
    return null;
  }
  return (props, styles) => styles[slot];
}

const muiStyledFunctionResolver = ({ styledArg, props, defaultTheme, themeId }) => {
  const resolvedStyles = styledArg({
    ...props,
    theme: resolveTheme({ ...props, defaultTheme, themeId }),
  });

  let optionalVariants;
  if (resolvedStyles && resolvedStyles.variants) {
    optionalVariants = resolvedStyles.variants;
    delete resolvedStyles.variants;
  }
  if (optionalVariants) {
    const variantsStyles = variantsResolver(
      props,
      transformVariants(optionalVariants),
      optionalVariants,
    );

    return [resolvedStyles, ...variantsStyles];
  }

  return resolvedStyles;
};

const createResolveExpression = ({ defaultTheme, themeId }) => {
  const resolveExpression = (stylesArg) => {
    if (Array.isArray(stylesArg)) {
      return stylesArg.map(resolveExpression);
    }
    // On the server Emotion doesn't use React.forwardRef for creating components, so the created
    // component stays as a function. This condition makes sure that we do not interpolate functions
    // which are basically components used as a selectors.
    if (typeof stylesArg === 'function' && stylesArg.__emotion_real !== stylesArg) {
      return (props) => {
        const resolvedFunction = muiStyledFunctionResolver({
          styledArg: stylesArg,
          props,
          defaultTheme,
          themeId,
        });

        return resolveExpression(resolvedFunction);
      };
    }
    if (isPlainObject(stylesArg)) {
      let transformedStylesArg = stylesArg;
      let styledArgVariants;

      if (stylesArg && stylesArg.variants) {
        styledArgVariants = stylesArg.variants;
        delete transformedStylesArg.variants;

        transformedStylesArg = (props) => {
          let result = stylesArg;
          const variantStyles = variantsResolver(
            props,
            transformVariants(styledArgVariants),
            styledArgVariants,
          );
          variantStyles.forEach((variantStyle) => {
            result = deepmerge(result, variantStyle);
          });

          return result;
        };
      }
      return transformedStylesArg;
    }

    return stylesArg;
  };

  return resolveExpression;
};

export default function createStyled(input = {}) {
  const {
    styledEngineStyled = defaultStyledEngineStyled,
    processStyles = defaultProcessStyles,
    themeId,
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
  } = input;

  const resolveExpression = createResolveExpression({ defaultTheme, themeId });

  const systemSx = (props) => {
    return styleFunctionSx({ ...props, theme: resolveTheme({ ...props, defaultTheme, themeId }) });
  };
  systemSx.__mui_systemSx = true;

  return (tag, inputOptions = {}) => {
    // Filter out the `sx` style function from the previous styled component to prevent unnecessary styles generated by the composite components.
    processStyles(tag, (styles) => styles.filter((style) => !style?.__mui_systemSx));

    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver = defaultOverridesResolver(lowercaseFirstLetter(componentSlot)),
      ...options
    } = inputOptions;

    // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.
    const skipVariantsResolver =
      inputSkipVariantsResolver !== undefined
        ? inputSkipVariantsResolver
        : // TODO v6: remove `Root` in the next major release
          // For more details: https://github.com/mui/material-ui/pull/37908
          (componentSlot && componentSlot !== 'Root' && componentSlot !== 'root') || false;

    const skipSx = inputSkipSx || false;

    let label;

    if (process.env.NODE_ENV !== 'production') {
      if (componentName) {
        // TODO v6: remove `lowercaseFirstLetter()` in the next major release
        // For more details: https://github.com/mui/material-ui/pull/37908
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
      }
    }

    let shouldForwardPropOption = shouldForwardProp;

    // TODO v6: remove `Root` in the next major release
    // For more details: https://github.com/mui/material-ui/pull/37908
    if (componentSlot === 'Root' || componentSlot === 'root') {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      // any other slot specified
      shouldForwardPropOption = slotShouldForwardProp;
    } else if (isStringTag(tag)) {
      // for string (html) tag, preserve the behavior in emotion & styled-components.
      shouldForwardPropOption = undefined;
    }

    const defaultStyledResolver = styledEngineStyled(tag, {
      shouldForwardProp: shouldForwardPropOption,
      label,
      ...options,
    });
    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions ? expressions.map(resolveExpression) : [];

      let transformedStyleArg = resolveExpression(styleArg);

      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = resolveTheme({ ...props, defaultTheme, themeId });
          const styleOverrides = getStyleOverrides(componentName, theme);

          if (styleOverrides) {
            const resolvedStyleOverrides = {};
            Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
              resolvedStyleOverrides[slotKey] =
                typeof slotStyle === 'function' ? slotStyle({ ...props, theme }) : slotStyle;
            });
            return overridesResolver(props, resolvedStyleOverrides);
          }

          return null;
        });
      }

      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = resolveTheme({ ...props, defaultTheme, themeId });
          return themeVariantsResolver(
            props,
            getVariantStyles(componentName, theme),
            theme,
            componentName,
          );
        });
      }

      if (!skipSx) {
        expressionsWithDefaultTheme.push(systemSx);
      }

      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;

      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill('');
        // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles.
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      }
      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);

      if (process.env.NODE_ENV !== 'production') {
        let displayName;
        if (componentName) {
          displayName = `${componentName}${capitalize(componentSlot || '')}`;
        }
        if (displayName === undefined) {
          displayName = `Styled(${getDisplayName(tag)})`;
        }
        Component.displayName = displayName;
      }

      if (tag.muiName) {
        Component.muiName = tag.muiName;
      }

      return Component;
    };

    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }

    return muiStyledResolver;
  };
}
