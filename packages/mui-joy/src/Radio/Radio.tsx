import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import { styled, useThemeProps } from '../styles';
import { getRadioUtilityClass } from './radioClasses';
import { RadioProps, RadioTypeMap } from './RadioProps';

const useUtilityClasses = (ownerState: RadioProps & { focusVisible: boolean }) => {
  const { checked, disabled, focusVisible, color, variant, size } = ownerState;

  const slots = {
    root: [
      'root',
      checked && 'checked',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    radio: ['radio', checked && 'checked', disabled && 'disabled'],
    action: ['action', focusVisible && 'focusVisible'],
    input: ['input'],
    label: ['label'],
  };

  return composeClasses(slots, getRadioUtilityClass, {});
};

const RadioRoot = styled('span', {
  name: 'MuiRadio',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: RadioProps }>(({ ownerState, theme }) => {
  return [
    {
      '--Icon-fontSize': 'var(--Radio-size)',
      '--Radio-radius': 'var(--Radio-size)',
      ...(ownerState.size === 'sm' && {
        '--Radio-size': '1rem',
        '--Radio-gap': '0.375rem',
        fontSize: theme.vars.fontSize.sm,
      }),
      ...(ownerState.size === 'md' && {
        '--Radio-size': '1.25rem',
        '--Radio-gap': '0.5rem',
        fontSize: theme.vars.fontSize.md,
      }),
      ...(ownerState.size === 'lg' && {
        '--Radio-size': '1.5rem',
        '--Radio-gap': '0.625rem',
        fontSize: theme.vars.fontSize.lg,
      }),
      ...(ownerState.label && {
        // add some space at the end to not have focus overlapping the label
        paddingInlineEnd: 'var(--Radio-gap)',
      }),
      position: 'relative',
      display: 'inline-flex',
      justifyContent: 'center',
      verticalAlign: 'middle',
      flexShrink: 0,
      fontFamily: theme.vars.fontFamily.body,
      lineHeight: 'var(--Checkbox-size)', // prevent label from having larger height than the checkbox
      '&.Mui-disabled': {
        color: theme.vars.palette[ownerState.color!]?.textDisabledColor,
      },
    },
  ];
});

const RadioRadio = styled('span', {
  name: 'MuiRadio',
  slot: 'Radio',
  overridesResolver: (props, styles) => styles.radio,
})<{ ownerState: RadioProps }>(({ ownerState, theme }) => [
  {
    margin: 0,
    boxSizing: 'border-box',
    width: 'var(--Radio-size)',
    height: 'var(--Radio-size)',
    borderRadius: 'var(--Radio-radius)',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  theme.variants[ownerState.variant!]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
]);

const RadioAction = styled('span', {
  name: 'MuiRadio',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})<{ ownerState: RadioProps }>(({ theme }) => ({
  position: 'absolute',
  borderRadius: 'var(--Radio-radius)',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  ...theme.focus.default,
}));

const RadioInput = styled('input', {
  name: 'MuiRadio',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: RadioProps }>(() => ({
  margin: 0,
  opacity: 0,
  position: 'absolute',
  height: '100%',
  width: '100%',
  cursor: 'pointer',
}));

const RadioLabel = styled('label', {
  name: 'MuiRadio',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})<{ ownerState: RadioProps }>({
  marginInlineStart: 'var(--Radio-gap)',
});

/**
 * internal component
 */
const RadioIcon = styled('span', {
  name: 'MuiRadio',
  slot: 'Icon',
  overridesResolver: (props, styles) => styles.icon,
})<{ ownerState: RadioProps }>(({ ownerState }) => ({
  width: '50%',
  height: '50%',
  borderRadius: 'var(--Radio-radius)',
  color: 'inherit',
  backgroundColor: 'currentColor',
  // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
  transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  transform: ownerState.checked ? 'scale(1)' : 'scale(0)',
}));

const Radio = React.forwardRef(function Radio(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiRadio',
  });

  const {
    checked: checkedProp,
    checkedIcon,
    className,
    component,
    componentsProps = {},
    defaultChecked,
    disabled: disabledProp,
    label,
    id,
    name,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    required,
    color,
    variant = 'outlined',
    size = 'md',
    uncheckedIcon,
    ...otherProps
  } = props;

  const useRadioProps = {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
  };

  const { getInputProps, checked, disabled, focusVisible } = useSwitch(useRadioProps);

  const activeColor = color || 'primary';
  const inactiveColor = color || 'neutral';

  const ownerState = {
    ...props,
    checked,
    disabled,
    focusVisible,
    color: checked ? activeColor : inactiveColor,
    variant,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <RadioRoot
      ref={ref}
      {...otherProps}
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
    >
      <RadioRadio
        {...componentsProps?.radio}
        ownerState={ownerState}
        className={clsx(classes.radio, componentsProps?.radio?.className)}
      >
        {checked && checkedIcon}
        {!checked && uncheckedIcon}
        {!checkedIcon && !uncheckedIcon && <RadioIcon ownerState={ownerState} />}
        <RadioAction
          {...componentsProps?.action}
          ownerState={ownerState}
          className={clsx(classes.action, componentsProps?.action?.className)}
        >
          <RadioInput
            ownerState={ownerState}
            {...getInputProps(componentsProps.input)}
            type="radio"
            id={id}
            name={name}
            className={clsx(classes.input, componentsProps.input?.className)}
          />
        </RadioAction>
      </RadioRadio>
      {label && (
        <RadioLabel
          {...componentsProps?.label}
          ownerState={ownerState}
          className={clsx(classes.label, componentsProps?.label?.className)}
        >
          {label}
        </RadioLabel>
      )}
    </RadioRoot>
  );
}) as OverridableComponent<RadioTypeMap>;

Radio.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   * @default <CheckIcon />
   */
  checkedIcon: PropTypes.node,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
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
   * The `name` attribute of the input.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The variant to use.
   * @default 'contained'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined']),
    PropTypes.string,
  ]),
} as any;

export default Radio;
