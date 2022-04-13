import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { UseSwitchProps } from '@mui/base/SwitchUnstyled';
import { SxProps } from '../styles/defaultTheme';
import { ColorPaletteProp, VariantProp } from '../styles/types';

export type RadioSlot = 'root' | 'radio' | 'action' | 'input' | 'label';

export interface RadioPropsVariantOverrides {}

export interface RadioPropsColorOverrides {}

export interface RadioPropsSizeOverrides {}

export interface RadioTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P &
    UseSwitchProps & {
      /**
       * The icon to display when the component is checked.
       */
      checkedIcon?: React.ReactNode;
      /**
       * Class name applied to the root element.
       */
      className?: string;
      /**
       * The component used for the Root slot.
       * Either a string to use a HTML element or a component.
       */
      component?: React.ElementType;
      /**
       * The props used for each slot inside the Input.
       * @default {}
       */
      componentsProps?: {
        root?: React.ComponentPropsWithRef<'span'>;
        radio?: React.ComponentPropsWithRef<'span'>;
        action?: React.ComponentPropsWithRef<'span'>;
        input?: React.ComponentPropsWithRef<'input'>;
        label?: React.ComponentPropsWithRef<'label'>;
      };
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<
        Exclude<ColorPaletteProp, 'context'>,
        RadioPropsColorOverrides
      >;
      /**
       * The label element at the end the radio.
       */
      label?: React.ReactNode;
      /**
       * The `name` attribute of the input.
       */
      name?: string;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', RadioPropsSizeOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
      /**
       * The icon to display when the component is not checked.
       */
      uncheckedIcon?: React.ReactNode;
      /**
       * The variant to use.
       * @default 'outlined'
       */
      variant?: OverridableStringUnion<Exclude<VariantProp, 'text'>, RadioPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type RadioProps<
  D extends React.ElementType = RadioTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<RadioTypeMap<P, D>, D>;
