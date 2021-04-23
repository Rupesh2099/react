import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { TypographyProps } from '../Typography';

export interface FormHelperTextTypeMap<P = {}, D extends React.ElementType = 'p'> {
  props: P & {
    /**
     * The content of the component.
     *
     * If `' '` is provided, the component reserves one line height for displaying a future message.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Pseudo-class applied to the root element if `error={true}`. */
      error?: string;
      /** Pseudo-class applied to the root element if `disabled={true}`. */
      disabled?: string;
      /** Styles applied to the root element if `size="small"`. */
      sizeSmall?: string;
      /** Styles applied to the root element if `variant="filled"` or `variant="outlined"`. */
      contained?: string;
      /** Pseudo-class applied to the root element if `focused={true}`. */
      focused?: string;
      /** Pseudo-class applied to the root element if `filled={true}`. */
      filled?: string;
      /** Pseudo-class applied to the root element if `required={true}`. */
      required?: string;
    };
    /**
     * The props used for each slot inside.
     * @default {}
     */
    componentProps?: {
      /**
       * props applied to the Typography wrapper of the passed childrem. this is
       * unused if disableTpography is true
       * @default {}
       */
      typography?: TypographyProps;
    };
    /**
     * If `true`, the helper text should be displayed in a disabled state.
     */
    disabled?: boolean;
    /**
     * If `true`, the label is rendered as it is passed without an additional typography  node.
     */
    disableTypography?: boolean;
    /**
     * If `true`, helper text should be displayed in an error state.
     */
    error?: boolean;
    /**
     * If `true`, the helper text should use filled classes key.
     */
    filled?: boolean;
    /**
     * If `true`, the helper text should use focused classes key.
     */
    focused?: boolean;
    /**
     * If `dense`, will adjust vertical spacing. This is normally obtained via context from
     * FormControl.
     */
    margin?: 'dense';
    /**
     * If `true`, the helper text should use required classes key.
     */
    required?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The variant to use.
     */
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [FormHelperText API](https://material-ui.com/api/form-helper-text/)
 */
declare const FormHelperText: OverridableComponent<FormHelperTextTypeMap>;

export type FormHelperTextClassKey = keyof NonNullable<FormHelperTextTypeMap['props']['classes']>;

export type FormHelperTextProps<
  D extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FormHelperTextTypeMap<P, D>, D>;

export default FormHelperText;
