import * as React from 'react';
import { OverrideProps, Simplify } from '@mui/types';
import { UseButtonParameters, UseButtonRootSlotProps } from './useButton.types';
import { SlotComponentProps } from '../utils';

export interface ButtonUnstyledActions {
  focusVisible(): void;
}

export interface ButtonUnstyledRootSlotPropsOverrides {}

export interface ButtonUnstyledOwnProps extends Omit<UseButtonParameters, 'ref'> {
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action?: React.Ref<ButtonUnstyledActions>;
  children?: React.ReactNode;
  className?: string;
  /**
   * If `true`, the component will not have any built-in classes applied.
   * @default undefined
   */
  disableDefaultClasses?: boolean;
  /**
   * The props used for each slot inside the Button.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'button',
      ButtonUnstyledRootSlotPropsOverrides,
      ButtonUnstyledOwnerState
    >;
  };
  /**
   * The components used for each slot inside the Button.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: {
    root?: React.ElementType;
  };
}

export type ButtonUnstyledProps<
  D extends React.ElementType = ButtonUnstyledTypeMap['defaultComponent'],
> = OverrideProps<ButtonUnstyledTypeMap<{}, D>, D> & {
  component?: D;
};

export interface ButtonUnstyledTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & ButtonUnstyledOwnProps;
  defaultComponent: D;
}

export type ButtonUnstyledOwnerState = ButtonUnstyledOwnProps & {
  active: boolean;
  focusVisible: boolean;
};

export type ButtonUnstyledRootSlotProps = Simplify<
  UseButtonRootSlotProps & {
    ownerState: ButtonUnstyledOwnerState;
    className?: string;
    children?: React.ReactNode;
  }
>;
