import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { styled, useThemeProps } from '@mui/system';
import { unstable_composeClasses as composeClasses, generateUtilityClass } from '@mui/base';

function getSvgIconUtilityClass(slot) {
  return generateUtilityClass('MuiSvgIcon', slot);
}

const useUtilityClasses = (ownerState) => {
  const { color, fontSize, classes } = ownerState;

  const slots = {
    root: [
      'root',
      color !== 'inherit' && `color${capitalize(color)}`,
      `fontSize${capitalize(fontSize)}`,
    ],
  };

  return composeClasses(slots, getSvgIconUtilityClass, classes);
};

const SvgIconRoot = styled('svg', {
  name: 'MuiSvgIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.color !== 'inherit' && styles[`color${capitalize(ownerState.color)}`],
      styles[`fontSize${capitalize(ownerState.fontSize)}`],
    ];
  },
})(({ theme = {}, ownerState }) => {
  const styles = {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0,
  };
  if (typeof theme.transitions?.create === 'function') {
    styles.transition = theme.transitions.create('fill', {
      duration: theme.transitions.duration.shorter,
    });
  }
  // font size
  if (ownerState.fontSize) {
    if (ownerState.fontSize === 'inherit') {
      styles.fontSize = 'inherit';
    } else if (theme.name === 'joy') {
      // for @mui/joy, use CSS var if exists
      styles.fontSize = (theme.vars || theme).fontSize[ownerState.fontSize];
    } else {
      // default (same as @mui/material)
      styles.fontSize = {
        small: theme.typography?.pxToRem(20) || '1.25rem',
        medium: theme.typography?.pxToRem(24) || '1.5rem',
        large: theme.typography?.pxToRem(35) || '2.1875rem',
      }[ownerState.fontSize];
    }
  }

  // color
  if (ownerState.color) {
    if (ownerState.color === 'inherit') {
      styles.color = 'inherit';
    } else if (theme.name === 'joy') {
      // for @mui/joy, use CSS var if exists
      styles.color = (theme.vars || theme).palette[ownerState.color].textColor;
    } else {
      // default (same as @mui/material)
      styles.color =
        theme.palette?.[ownerState.color]?.main ??
        {
          action: theme.palette?.action.active || 'rgba(0, 0, 0, 0.54)',
          disabled: theme.palette?.action.disabled || 'rgba(0, 0, 0, 0.26)',
        }[ownerState.color];
    }
  }
  return styles;
});

const SvgIcon = React.forwardRef(function SvgIcon(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiSvgIcon' });
  const {
    children,
    className,
    color = 'primary',
    component = 'svg',
    fontSize = 'medium',
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = '0 0 24 24',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    fontSize,
    inheritViewBox,
    viewBox,
  };

  const more = {};

  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }

  const classes = useUtilityClasses(ownerState);

  return (
    <SvgIconRoot
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      focusable="false"
      color={htmlColor}
      aria-hidden={titleAccess ? undefined : true}
      role={titleAccess ? 'img' : undefined}
      ref={ref}
      {...more}
      {...other}
    >
      {children}
      {titleAccess ? <title>{titleAccess}</title> : null}
    </SvgIconRoot>
  );
});
SvgIcon.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Node passed into the SVG element.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit']),
    PropTypes.string,
  ]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: PropTypes.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: PropTypes.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: PropTypes.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: PropTypes.string,
};

SvgIcon.muiName = 'SvgIcon';

/**
 * Private module reserved for @mui packages.
 */
export default function createSvgIcon(path, displayName) {
  const Component = (props, ref) => (
    <SvgIcon data-testid={`${displayName}Icon`} ref={ref} {...props}>
      {path}
    </SvgIcon>
  );

  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }

  Component.muiName = SvgIcon.muiName;

  return React.memo(React.forwardRef(Component));
}
