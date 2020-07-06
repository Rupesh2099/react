import { deepmerge } from '@material-ui/utils';
import noopTheme from './noopTheme';

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const propsToClassKey = (matcher) => {
  let classKey = matcher.variant ? matcher.variant : '';
  if (matcher.color) {
    classKey += classKey.length === 0 ? matcher.color : capitalize(matcher.color);
  }
  if (matcher.size) {
    classKey += (classKey.length === 0 ? 's' : 'S') + `ize${capitalize(matcher.size)}`;
  }
  return classKey;
};

export default function getStylesCreator(stylesOrCreator) {
  const themingEnabled = typeof stylesOrCreator === 'function';

  if (process.env.NODE_ENV !== 'production') {
    if (typeof stylesOrCreator !== 'object' && !themingEnabled) {
      console.error(
        [
          'Material-UI: The `styles` argument provided is invalid.',
          'You need to provide a function generating the styles or a styles object.',
        ].join('\n'),
      );
    }
  }

  return {
    create: (theme, name) => {
      let styles;
      try {
        styles = themingEnabled ? stylesOrCreator(theme) : stylesOrCreator;
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          if (themingEnabled === true && theme === noopTheme) {
            // TODO: prepend error message/name instead
            console.error(
              [
                'Material-UI: The `styles` argument provided is invalid.',
                'You are providing a function without a theme in the context.',
                'One of the parent elements needs to use a ThemeProvider.',
              ].join('\n'),
            );
          }
        }
        throw err;
      }

      if (
        !name ||
        ((!theme.overrides || !theme.overrides[name]) && (!theme.variants || !theme.variants[name]))
      ) {
        return styles;
      }

      const overrides = theme.overrides[name] || {};
      const variants = theme.variants[name] || [];
      const stylesWithOverrides = { ...styles };

      Object.keys(overrides).forEach((key) => {
        if (process.env.NODE_ENV !== 'production') {
          if (!stylesWithOverrides[key]) {
            console.warn(
              [
                'Material-UI: You are trying to override a style that does not exist.',
                `Fix the \`${key}\` key of \`theme.overrides.${name}\`.`,
                'If you intentionally wanted to add new key, please use the theme.variants option',
              ].join('\n'),
            );
          }
        }

        stylesWithOverrides[key] = deepmerge(stylesWithOverrides[key] || {}, overrides[key]);
      });
      variants.forEach((definition) => {
        const classKey = propsToClassKey(definition.matcher);
        const styles =
          typeof definition.styles === 'function' ? definition.styles(theme) : definition.styles;
        stylesWithOverrides[classKey] = deepmerge(stylesWithOverrides[classKey] || {}, styles);
      });

      return stylesWithOverrides;
    },
    options: {},
  };
}
