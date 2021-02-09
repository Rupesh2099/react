import * as React from 'react';
import PropTypes from 'prop-types';
import { refType, deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import SwitchBase from '../internal/SwitchBase';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import { alpha } from '../styles/colorManipulator';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled, { shouldForwardProp } from '../styles/experimentalStyled';
import checkboxClasses, { getCheckboxUtilityClass } from './checkboxClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    ...(styleProps.indeterminate && styles.indeterminate),
    ...(styleProps.color !== 'default' && styles[`color${capitalize(styleProps.color)}`]),
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes, indeterminate, color } = styleProps;

  const slots = {
    root: [
      'root',
      indeterminate && 'indeterminate',
      `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getCheckboxUtilityClass, classes);
};

const CheckboxRoot = experimentalStyled(
  SwitchBase,
  { shouldForwardProp: (prop) => shouldForwardProp(prop) || prop === 'classes' },
  {
    name: 'MuiCheckbox',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => ({
  /* Styles applied to the root element. */
  color: theme.palette.text.secondary,
  /* Styles applied to the root element unless `color="default"`. */
  ...(styleProps.color !== 'default' && {
    [`&.Mui-checked, &.${checkboxClasses.indeterminate}`]: {
      color: theme.palette[styleProps.color].main,
      '&:hover': {
        backgroundColor: alpha(
          theme.palette[styleProps.color].main,
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
    },
    '&.Mui-disabled': {
      color: theme.palette.action.disabled,
    },
  }),
}));

const defaultCheckedIcon = <CheckBoxIcon />;
const defaultIcon = <CheckBoxOutlineBlankIcon />;
const defaultIndeterminateIcon = <IndeterminateCheckBoxIcon />;

const Checkbox = React.forwardRef(function Checkbox(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiCheckbox' });
  const {
    checkedIcon = defaultCheckedIcon,
    classes: classesProp = {},
    color = 'secondary',
    icon: iconProp = defaultIcon,
    indeterminate = false,
    indeterminateIcon: indeterminateIconProp = defaultIndeterminateIcon,
    inputProps,
    size = 'medium',
    ...other
  } = props;

  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;

  const styleProps = {
    ...props,
    classes: classesProp,
    color,
    indeterminate,
    size,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <CheckboxRoot
      type="checkbox"
      color={color}
      inputProps={{
        'data-indeterminate': indeterminate,
        ...inputProps,
      }}
      icon={React.cloneElement(icon, {
        fontSize:
          icon.props.fontSize === undefined && size !== 'medium' ? size : icon.props.fontSize,
      })}
      checkedIcon={React.cloneElement(indeterminateIcon, {
        fontSize:
          indeterminateIcon.props.fontSize === undefined && size !== 'medium'
            ? size
            : indeterminateIcon.props.fontSize,
      })}
      styleProps={styleProps}
      ref={ref}
      classes={{
        root: classes.root,
        checked: classesProp.checked,
        disabled: classesProp.disabled,
      }}
      {...other}
    />
  );
});

Checkbox.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
   */
  checkedIcon: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'secondary'
   */
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate: PropTypes.bool,
  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon: PropTypes.node,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['medium', 'small']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any,
};

export default Checkbox;
