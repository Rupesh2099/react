import { OverrideProps, Simplify } from '@mui/types';
import { FormControlState } from '../FormControl';
import {
  UseNumberInputParameters,
  UseNumberInputRootSlotProps,
  UseNumberInputIncrementButtonSlotProps,
  UseNumberInputDecrementButtonSlotProps,
} from '../useNumberInput/useNumberInput.types';
import { SlotComponentProps } from '../utils';

export interface NumberInputRootSlotPropsOverrides {}
export interface NumberInputInputSlotPropsOverrides {}
export interface NumberInputIncrementButtonSlotPropsOverrides {}
export interface NumberInputDecrementButtonSlotPropsOverrides {}

export type NumberInputOwnProps = Omit<UseNumberInputParameters, 'error'> & {
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `Mui-error` class on the root element.
   */
  error?: boolean;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * The props used for each slot inside the NumberInput.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'div', NumberInputRootSlotPropsOverrides, NumberInputOwnerState>;
    input?: SlotComponentProps<'input', NumberInputInputSlotPropsOverrides, NumberInputOwnerState>;
    incrementButton?: SlotComponentProps<
      'button',
      NumberInputIncrementButtonSlotPropsOverrides,
      NumberInputOwnerState
    >;
    decrementButton?: SlotComponentProps<
      'button',
      NumberInputDecrementButtonSlotPropsOverrides,
      NumberInputOwnerState
    >;
  };
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: {
    root?: React.ElementType;
    input?: React.ElementType;
    incrementButton?: React.ElementType;
    decrementButton?: React.ElementType;
  };
};

export interface NumberInputTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & NumberInputOwnProps;
  defaultComponent: D;
}

export type NumberInputProps<
  D extends React.ElementType = NumberInputTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<NumberInputTypeMap<P, D>, D> & {
  component?: D;
};

export type NumberInputOwnerState = Simplify<
  Omit<NumberInputProps, 'component' | 'slots' | 'slotProps'> & {
    formControlContext: FormControlState | undefined;
    focused: boolean;
    isIncrementDisabled: boolean;
    isDecrementDisabled: boolean;
  }
>;

export type NumberInputRootSlotProps = Simplify<
  UseNumberInputRootSlotProps & {
    ownerState: NumberInputOwnerState;
    className?: string;
    children?: React.ReactNode;
    ref?: React.Ref<Element>;
  }
>;

export type NumberInputInputSlotProps = Simplify<
  Omit<UseNumberInputRootSlotProps, 'onClick'> & {
    id: string | undefined;
    ownerState: NumberInputOwnerState;
    placeholder: string | undefined;
    ref: React.Ref<HTMLInputElement>;
  }
>;

export type NumberInputIncrementButtonSlotProps = Simplify<
  UseNumberInputIncrementButtonSlotProps & {
    ownerState: NumberInputOwnerState;
  }
>;

export type NumberInputDecrementButtonSlotProps = Simplify<
  UseNumberInputDecrementButtonSlotProps & {
    ownerState: NumberInputOwnerState;
  }
>;
