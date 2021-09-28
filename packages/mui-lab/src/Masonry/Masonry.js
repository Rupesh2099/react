import { unstable_composeClasses as composeClasses } from '@mui/core';
import { styled, useThemeProps } from '@mui/material/styles';
import {
  createUnarySpacing,
  getValue,
  handleBreakpoints,
  unstable_resolveBreakpointValues as resolveBreakpointValues,
} from '@mui/system';
import { deepmerge, unstable_useForkRef as useForkRef } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { getMasonryUtilityClass } from './masonryClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryUtilityClass, classes);
};

const computeBreakpointsBase = (breakpoints, prop) => {
  const base = {};
  if (Array.isArray(prop)) {
    const arrayLen = prop.length;
    Object.keys(breakpoints.values).forEach((breakpoint, i) => {
      if (i < arrayLen) {
        base[breakpoint] = true;
      }
    });
  } else {
    Object.keys(breakpoints.values).forEach((breakpoint) => {
      if (prop[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }
  return base;
};

const validatePropValues = (base, prop) => {
  const values = {};
  if (Array.isArray(prop)) {
    Object.keys(base).forEach((breakpoint, i) => {
      values[breakpoint] = Number(prop[i]);
    });
    return values;
  }
  return prop;
};

export const style = ({ ownerState, theme }) => {
  let styles = {
    display: 'flex',
    flexFlow: 'column wrap',
    alignContent: 'space-between',
    boxSizing: 'border-box',
    '& *': {
      boxSizing: 'border-box',
    },
  };

  const spacingBreakpointsBase = computeBreakpointsBase(theme.breakpoints, ownerState.spacing);
  const spacingValues = resolveBreakpointValues({
    values: validatePropValues(spacingBreakpointsBase, ownerState.spacing),
    base: spacingBreakpointsBase,
  });

  const transformer = createUnarySpacing(theme);
  const spacingStyleFromPropValue = (propValue) => {
    propValue = Number(propValue);
    const spacing = Number(getValue(transformer, propValue).replace('px', ''));
    return {
      margin: -(spacing / 2),
      '& *': {
        margin: spacing / 2,
      },
      ...(ownerState.maxColumnHeight &&
        ownerState.maxNumOfRows && {
          height: ownerState.maxColumnHeight + spacing * ownerState.maxNumOfRows,
        }),
    };
  };

  styles = deepmerge(
    styles,
    handleBreakpoints({ theme }, spacingValues, spacingStyleFromPropValue),
  );

  const columnBreakpointsBase = computeBreakpointsBase(theme.breakpoints, ownerState.columns);
  const columnValues = resolveBreakpointValues({
    values: validatePropValues(columnBreakpointsBase, ownerState.columns),
    base: columnBreakpointsBase,
  });

  const columnStyleFromPropValue = (propValue) => {
    propValue = Number(propValue);
    const width = `${(100 / propValue).toFixed(1)}%`;
    const spacing =
      typeof spacingValues !== 'object' ? getValue(transformer, Number(spacingValues)) : '0px';
    return {
      '& *': { width: `calc(${width} - ${spacing})` },
    };
  };

  styles = deepmerge(styles, handleBreakpoints({ theme }, columnValues, columnStyleFromPropValue));

  // configure width for responsive spacing values
  if (typeof spacingValues === 'object') {
    styles = deepmerge(
      styles,
      handleBreakpoints({ theme }, spacingValues, (propValue, breakpoint) => {
        if (breakpoint) {
          propValue = Number(propValue);
          const lastBreakpoint = Object.keys(columnValues).pop();
          const spacing = getValue(transformer, propValue);
          const column =
            typeof columnValues === 'object'
              ? columnValues[breakpoint] || columnValues[lastBreakpoint]
              : columnValues;
          const width = `${(100 / column).toFixed(1)}%`;
          return {
            '& *': { width: `calc(${width} - ${spacing})` },
          };
        }
        return null;
      }),
    );
  }

  return styles;
};

const MasonryRoot = styled('div', {
  name: 'MuiMasonry',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root];
  },
})(style);

const Masonry = React.forwardRef(function Masonry(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMasonry',
  });

  const masonryRef = React.useRef();
  const [maxColumnHeight, setMaxColumnHeight] = React.useState();
  const [maxNumOfRows, setMaxNumOfRows] = React.useState();
  const [numberOfLineBreaks, setNumberOfLineBreaks] = React.useState(0);
  const { children, className, component = 'div', columns = 4, spacing = 1, ...other } = props;
  const ownerState = { ...props, spacing, columns, maxColumnHeight, maxNumOfRows };
  const classes = useUtilityClasses(ownerState);

  React.useEffect(() => {
    const handleResize = () => {
      let columnHeights;
      let numOfRows;
      let curNumOfCols;
      let skip = false;
      masonryRef.current.childNodes.forEach((child) => {
        if (child.nodeType !== Node.ELEMENT_NODE || child.dataset.class === 'line-break' || skip) {
          return;
        }
        const computedStyle = window.getComputedStyle(child);
        const parentWidth = Number(
          window.getComputedStyle(masonryRef.current).width.replace('px', ''),
        );

        const width = Number(computedStyle.width.replace('px', ''));
        const height = Number(computedStyle.height.replace('px', ''));
        // if any one of children is not rendered yet, container's height shouldn't be set;
        // this is especially crucial for image masonry
        if (parentWidth === 0 || width === 0 || height === 0) {
          skip = true;
          return;
        }
        if (!curNumOfCols) {
          curNumOfCols = Math.floor(parentWidth / width);
        }
        if (!columnHeights) {
          columnHeights = new Array(curNumOfCols).fill(0);
        }
        if (!numOfRows) {
          numOfRows = new Array(curNumOfCols).fill(0);
        }

        // find the current shortest column (where the current item will be placed)
        const curMinColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        columnHeights[curMinColumnIndex] += height;
        numOfRows[curMinColumnIndex] += 1;
        const order = curMinColumnIndex + 1;
        child.style.order = order;
      });
      if (!skip) {
        setMaxColumnHeight(Math.max(...columnHeights));
        setMaxNumOfRows(Math.max(...numOfRows));
        const numOfLineBreaks = curNumOfCols > 0 ? curNumOfCols - 1 : 0;
        setNumberOfLineBreaks(numOfLineBreaks);
      }
    };
    if (typeof ResizeObserver === 'undefined') {
      return null;
    }
    const resizeObserver = new ResizeObserver(handleResize);

    const container = masonryRef.current;
    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, [columns, spacing]);

  const handleRef = useForkRef(ref, masonryRef);
  const lineBreakStyle = {
    flexBasis: '100%',
    width: 0,
    margin: 0,
    padding: 0,
  };

  return (
    <MasonryRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={handleRef}
      ownerState={ownerState}
      {...other}
    >
      {children}
      {new Array(numberOfLineBreaks).fill('').map((_, index) => (
        <span key={index} data-class="line-break" style={{ ...lineBreakStyle, order: index + 1 }} />
      ))}
    </MasonryRoot>
  );
});

Masonry.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Number of columns.
   * @default 4
   */
  columns: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Defines the space between children. It is a factor of the theme's spacing.
   * @default 1
   */
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default Masonry;
