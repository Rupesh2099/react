import * as React from 'react';
import { PropTypes } from '..';
import { ExtendButtonBase } from '../ButtonBase';
import { OverridableComponent, SimplifiedPropsOf, OverrideProps } from '../OverridableComponent';

declare const Button: ExtendButtonBase<{
  props: {
    color?: PropTypes.Color;
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    mini?: boolean;
    size?: 'small' | 'medium' | 'large';
    type?: string;
    variant?: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab' | 'extendedFab';
  };
  defaultComponent: 'button';
  classKey: ButtonClassKey;
}>;

export type ButtonProps = SimplifiedPropsOf<typeof Button>;

export type ButtonClassKey =
  | 'root'
  | 'label'
  | 'text'
  | 'textPrimary'
  | 'textSecondary'
  | 'flat'
  | 'flatPrimary'
  | 'flatSecondary'
  | 'outlined'
  | 'outlinedPrimary'
  | 'outlinedSecondary'
  | 'colorInherit'
  | 'contained'
  | 'containedPrimary'
  | 'containedSecondary'
  | 'raised'
  | 'raisedPrimary'
  | 'raisedSecondary'
  | 'focusVisible'
  | 'disabled'
  | 'fab'
  | 'extendedFab'
  | 'mini'
  | 'sizeSmall'
  | 'sizeLarge'
  | 'fullWidth';

export default Button;
