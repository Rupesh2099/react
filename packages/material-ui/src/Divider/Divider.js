import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    height: 1,
    margin: 0, // Reset browser default style.
    border: 'none',
    flexShrink: 0,
    backgroundColor: theme.palette.divider,
  },
  /* Styles applied to the root element if `absolute={true}`. */
  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  /* Styles applied to the root element if `variant="inset"`. */
  inset: {
    marginLeft: 72,
  },
  /* Styles applied to the root element if `light={true}`. */
  light: {
    backgroundColor: fade(theme.palette.divider, 0.08),
  },
  /* Styles applied to the root element if `variant="middle"`. */
  middle: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    height: '100%',
    width: 1,
  },
  /* Styles applied to the root element if flexItem={true}. */
  flexItem: {
    alignSelf: 'stretch',
    height: 'auto',
  },
});

const Divider = React.forwardRef(function Divider(props, ref) {
  const {
    absolute = false,
    classes,
    className,
    component: Component = 'hr',
    flexItem,
    light = false,
    orientation = 'horizontal',
    role = Component !== 'hr' ? 'separator' : undefined,
    variant = 'fullWidth',
    ...other
  } = props;

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes[variant]]: variant !== 'fullWidth',
          [classes.absolute]: absolute,
          [classes.flexItem]: flexItem,
          [classes.light]: light,
          [classes.vertical]: orientation === 'vertical',
        },
        className,
      )}
      role={role}
      ref={ref}
      {...other}
    />
  );
});

Divider.propTypes = {
  /**
   * Absolutely position the element.
   */
  absolute: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If true, the divider will apply different strategy for height
   */
  flexItem: PropTypes.bool,
  /**
   * If `true`, the divider will have a lighter color.
   */
  light: PropTypes.bool,
  /**
   * The divider orientation.
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['fullWidth', 'inset', 'middle']),
};

export default withStyles(styles, { name: 'MuiDivider' })(Divider);
