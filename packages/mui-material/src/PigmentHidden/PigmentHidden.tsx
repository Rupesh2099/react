'use client';
import * as React from 'react';
import clsx from 'clsx';
import { Breakpoint } from '@mui/system';
// @ts-ignore
import Hidden from '@pigment-css/react/Hidden';
import capitalize from '@mui/utils/capitalize';
import composeClasses from '@mui/utils/composeClasses';
import HiddenJs from '../Hidden/HiddenJs';
import { getHiddenCssUtilityClass } from '../Hidden/hiddenCssClasses';
import { useTheme } from '../zero-styled';

export interface HiddenProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   * @default 'js'
   */
  implementation?: 'js' | 'css';
  /**
   * You can use this prop when choosing the `js` implementation with server-side rendering.
   *
   * As `window.innerWidth` is unavailable on the server,
   * we default to rendering an empty component during the first mount.
   * You might want to use a heuristic to approximate
   * the screen width of the client browser screen width.
   *
   * For instance, you could be using the user-agent or the client-hints.
   * https://caniuse.com/#search=client%20hint
   */
  initialWidth?: Breakpoint;
  /**
   * If `true`, component is hidden on screens below (but not including) this size.
   * @default false
   */
  lgDown?: boolean;
  /**
   * If `true`, component is hidden on screens this size and above.
   * @default false
   */
  lgUp?: boolean;
  /**
   * If `true`, component is hidden on screens below (but not including) this size.
   * @default false
   */
  mdDown?: boolean;
  /**
   * If `true`, component is hidden on screens this size and above.
   * @default false
   */
  mdUp?: boolean;
  /**
   * Hide the given breakpoint(s).
   */
  only?: Breakpoint | Breakpoint[];
  /**
   * If `true`, component is hidden on screens below (but not including) this size.
   * @default false
   */
  smDown?: boolean;
  /**
   * If `true`, component is hidden on screens this size and above.
   * @default false
   */
  smUp?: boolean;
  /**
   * If `true`, component is hidden on screens below (but not including) this size.
   * @default false
   */
  xlDown?: boolean;
  /**
   * If `true`, component is hidden on screens this size and above.
   * @default false
   */
  xlUp?: boolean;
  /**
   * If `true`, component is hidden on screens below (but not including) this size.
   * @default false
   */
  xsDown?: boolean;
  /**
   * If `true`, component is hidden on screens this size and above.
   * @default false
   */
  xsUp?: boolean;
}

const useUtilityClasses = (ownerState: {
  classes: Record<string, string>;
  breakpoints: Array<{ breakpoint: string; dir: string }>;
}) => {
  const { classes, breakpoints } = ownerState;

  const slots = {
    root: [
      'root',
      ...breakpoints.map(({ breakpoint, dir }) => {
        return dir === 'only'
          ? `${dir}${capitalize(breakpoint)}`
          : `${breakpoint}${capitalize(dir)}`;
      }),
    ],
  };

  return composeClasses(slots, getHiddenCssUtilityClass, classes);
};

function HiddenCss(props: HiddenProps & { className?: string }) {
  const theme = useTheme();
  const { children, className, only, ...other } = props;

  if (process.env.NODE_ENV !== 'production') {
    const unknownProps = Object.keys(other).filter((propName) => {
      const isUndeclaredBreakpoint = !theme.breakpoints.keys.some((breakpoint) => {
        return `${breakpoint}Up` === propName || `${breakpoint}Down` === propName;
      });
      return !['classes', 'theme', 'isRtl', 'sx'].includes(propName) && isUndeclaredBreakpoint;
    });

    if (unknownProps.length > 0) {
      console.error(
        `MUI: Unsupported props received by \`<Hidden implementation="css" />\`: ${unknownProps.join(
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
      breakpoints.push({ breakpoint, dir: 'up' });
    }
    if (breakpointDown) {
      breakpoints.push({ breakpoint, dir: 'down' });
    }
  }

  if (only) {
    const onlyBreakpoints = Array.isArray(only) ? only : [only];
    onlyBreakpoints.forEach((breakpoint) => {
      breakpoints.push({ breakpoint, dir: 'only' });
    });
  }

  const ownerState = {
    ...props,
    classes: {},
    breakpoints,
  };

  const classes = useUtilityClasses(ownerState);

  return <Hidden className={clsx(classes.root, className)} {...props} />;
}

function PigmentHidden({ implementation = 'js', ...props }: HiddenProps & { className?: string }) {
  if (implementation === 'js') {
    return <HiddenJs {...props} />;
  }
  return <HiddenCss {...props} />;
}

export default PigmentHidden;
