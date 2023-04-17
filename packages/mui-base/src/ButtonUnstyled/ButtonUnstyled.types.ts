import * as React from 'react';
import { Simplify } from '@mui/types';
import { UseButtonParameters, UseButtonRootSlotProps } from '../useButton';
import { SlotComponentProps } from '../utils';
import { PolymorphicProps } from '../utils/OverridableComponent';

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
  slots?: ButtonUnstyledSlots;
}

export interface ButtonUnstyledSlots {
  /**
   * The component that renders the root.
   * @default props.href || props.to ? 'a' : 'button'
   */
  root?: React.ElementType;
}

export type ButtonUnstyledProps<
  RootComponent extends React.ElementType = ButtonUnstyledTypeMap['defaultComponent'],
> = PolymorphicProps<ButtonUnstyledTypeMap<{}, RootComponent>, RootComponent>;

export interface ButtonUnstyledTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'button',
> {
  props: AdditionalProps & ButtonUnstyledOwnProps;
  defaultComponent: DefaultComponent;
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
