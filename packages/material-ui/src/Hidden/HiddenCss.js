import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import capitalize from '../utils/capitalize';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import useTheme from '../styles/useTheme';
import { getHiddenCssUtilityClass } from './hiddenCssClasses';

const overridesResolver = (props, styles) => styles.root || {};

const useUtilityClasses = (styleProps) => {
  const { classes, breakpoints } = styleProps;

  const slots = {
    root: ['root', ...breakpoints],
  };

  return composeClasses(slots, getHiddenCssUtilityClass, classes);
};

const HiddenCssRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'PrivateHiddenCss',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => {
  const hidden = {
    display: 'none',
  };

  return {
    ...styleProps.breakpoints
      .map((key) => {
        if (key.startsWith('only')) {
          return {
            [theme.breakpoints.only(key.replace('only', ''))]: hidden,
          };
        }
        return key.endsWith('Up')
          ? {
              [theme.breakpoints.up(key.replace('Up', ''))]: hidden,
            }
          : {
              [theme.breakpoints.down(key.replace('Down', ''))]: hidden,
            };
      })
      .reduce((r, o) => {
        Object.keys(o).forEach((k) => {
          r[k] = o[k];
        });
        return r;
      }, {}),
  };
});

/**
 * @ignore - internal component.
 */
const HiddenCss = React.forwardRef(function HiddenCss(inProps) {
  const props = useThemeProps({ props: inProps, name: 'PrivateHiddenCss' });
  const { children, className, only, ...other } = props;
  const theme = useTheme();

  if (process.env.NODE_ENV !== 'production') {
    const unknownProps = Object.keys(other).filter((propName) => {
      const isUndeclaredBreakpoint = !theme.breakpoints.keys.some((breakpoint) => {
        return `${breakpoint}Up` === propName || `${breakpoint}Down` === propName;
      });
      return !(propName === 'theme' || propName === 'isRtl') && isUndeclaredBreakpoint;
    });

    if (unknownProps.length > 0) {
      console.error(
        `Material-UI: Unsupported props received by \`<Hidden implementation="css" />\`: ${unknownProps.join(
          ', ',
        )}. Did you forget to wrap this component in a ThemeProvider declaring these breakpoints?`,
      );
    }
  }

  const breakpoints = [];

  for (let i = 0; i < theme.breakpoints.keys.length; i += 1) {
    const breakpoint = theme.breakpoints.keys[i];
    const breakpointUp = other[`${breakpoint}Up`];
    const breakpointDown = other[`${breakpoint}Down`];

    if (breakpointUp) {
      breakpoints.push(`${breakpoint}Up`);
    }
    if (breakpointDown) {
      breakpoints.push(`${breakpoint}Down`);
    }
  }

  if (only) {
    const onlyBreakpoints = Array.isArray(only) ? only : [only];
    onlyBreakpoints.forEach((breakpoint) => {
      breakpoints.push(`only${capitalize(breakpoint)}`);
    });
  }

  const styleProps = {
    ...props,
    breakpoints,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <HiddenCssRoot className={clsx(classes.root, className)} styleProps={styleProps}>
      {children}
    </HiddenCssRoot>
  );
});

HiddenCss.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   */
  implementation: PropTypes.oneOf(['js', 'css']),
  /**
   * If `true`, screens this size and down are hidden.
   */
  lgDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  lgUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down are hidden.
   */
  mdDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  mdUp: PropTypes.bool,
  /**
   * Hide the given breakpoint(s).
   */
  only: PropTypes.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    PropTypes.arrayOf(PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])),
  ]),
  /**
   * If `true`, screens this size and down are hidden.
   */
  smDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  smUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down are hidden.
   */
  xlDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  xlUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down are hidden.
   */
  xsDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   */
  xsUp: PropTypes.bool,
};

export default HiddenCss;
