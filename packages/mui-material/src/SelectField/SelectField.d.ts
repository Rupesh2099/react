import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { InternalStandardProps as StandardProps } from '..';
import { FormControlProps } from '../FormControl';
import { FormHelperTextProps } from '../FormHelperText';
import { InputBaseProps } from '../InputBase';
import { InputProps as StandardInputProps } from '../Input';
import { FilledInputProps } from '../FilledInput';
import { OutlinedInputProps } from '../OutlinedInput';
import { InputLabelProps } from '../InputLabel';
import { SelectProps } from '../Select';
import { Theme } from '../styles';
import { SelectFieldClasses } from './selectFieldClasses';

export interface SelectFieldPropsColorOverrides {}
export interface SelectFieldPropsSizeOverrides {}

export interface BaseSelectFieldProps
  extends StandardProps<
    FormControlProps,
    // event handlers are declared on derived interfaces
    'onChange' | 'onBlur' | 'onFocus' | 'defaultValue'
  > {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete?: string;
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * @ignore
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SelectFieldClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    SelectFieldPropsColorOverrides
  >;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: unknown;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * Props applied to the [`FormHelperText`](/material-ui/api/form-helper-text/) element.
   */
  FormHelperTextProps?: Partial<FormHelperTextProps>;
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The helper text content.
   */
  helperText?: React.ReactNode;
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id?: string;
  /**
   * Props applied to the [`InputLabel`](/material-ui/api/input-label/) element.
   * Pointer events like `onClick` are enabled if and only if `shrink` is `true`.
   */
  InputLabelProps?: Partial<InputLabelProps>;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: InputBaseProps['inputProps'];
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * The label content.
   */
  label?: React.ReactNode;
  /**
   * If `true`, a `textarea` element is rendered instead of an input.
   * @default false
   */
  multiline?: boolean;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  onBlur?: InputBaseProps['onBlur'];
  onFocus?: StandardInputProps['onFocus'];
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required?: boolean;
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number;
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows?: string | number;
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows?: string | number;
  /**
   * Render a [`Select`](/material-ui/api/select/) element while passing the Input element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   * @default false
   */
  select?: boolean;
  /**
   * Props applied to the [`Select`](/material-ui/api/select/) element.
   */
  SelectProps?: Partial<SelectProps>;
  /**
   * The size of the component.
   */
  size?: OverridableStringUnion<'small' | 'medium', SelectFieldPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type?: React.InputHTMLAttributes<unknown>['type'];
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: unknown;
  /**
   * slotProps
   */
  slotProps?: {
    root?: Record<string, unknown>;
    inputLabel?: {
      root?: Record<string, unknown>;
    };
    select?: {
      root?: Record<string, unknown>;
      listbox?: Record<string, unknown>;
      popper?: Record<string, unknown>;
    };
    input?: {
      root?: Record<string, unknown>;
      input?: Record<string, unknown>;
    };
    formHelperText?: {
      root?: Record<string, unknown>;
    };
  };
}

export interface StandardSelectFieldProps extends BaseSelectFieldProps {
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: StandardInputProps['onChange'];
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: 'standard';
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/material-ui/api/filled-input/),
   * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps?: Partial<StandardInputProps>;
}

export interface FilledSelectFieldProps extends BaseSelectFieldProps {
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: FilledInputProps['onChange'];
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: 'filled';
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/material-ui/api/filled-input/),
   * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps?: Partial<FilledInputProps>;
}

export interface OutlinedSelectFieldProps extends BaseSelectFieldProps {
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: OutlinedInputProps['onChange'];
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: 'outlined';
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/material-ui/api/filled-input/),
   * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps?: Partial<OutlinedInputProps>;
}

export type TextFieldVariants = 'outlined' | 'standard' | 'filled';

export type SelectFieldProps<Variant extends TextFieldVariants = TextFieldVariants> =
  Variant extends 'filled'
    ? FilledSelectFieldProps
    : Variant extends 'standard'
    ? StandardSelectFieldProps
    : OutlinedSelectFieldProps;

/**
 * The `SelectField` is extracted out of `<TextField select />`
 *
 * Demos:
 *
 * - [Text Field](https://mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [SelectField API](https://mui.com/material-ui/api/select-field/)
 * - inherits [FormControl API](https://mui.com/material-ui/api/form-control/)
 */
export default function SelectField<Variant extends TextFieldVariants>(
  props: {
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: Variant;
  } & Omit<SelectFieldProps, 'variant'>,
): JSX.Element;
