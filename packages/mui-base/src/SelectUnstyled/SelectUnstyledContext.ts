import * as React from 'react';
import { OptionState } from '../ListboxUnstyled';
import { SelectOption, UseSelectOptionSlotProps } from './useSelect.types';

export interface SelectUnstyledContextType {
  getOptionState: (value: SelectOption<any>) => OptionState;
  getOptionProps: (option: SelectOption<any>) => UseSelectOptionSlotProps;
  listboxRef: React.RefObject<HTMLElement>;
  registerSelectionChangeHandler: (
    handler: (
      e:
        | React.MouseEvent<Element, MouseEvent>
        | React.KeyboardEvent<Element>
        | React.FocusEvent<Element, Element>
        | null,
      newValue: any | any[],
    ) => void,
  ) => void;
  unregisterSelectionChangeHandler: (
    handler: (
      e:
        | React.MouseEvent<Element, MouseEvent>
        | React.KeyboardEvent<Element>
        | React.FocusEvent<Element, Element>
        | null,
      newValue: any | any[],
    ) => void,
  ) => void;
  registerHighlightChangeHandler: (
    handler: (
      e:
        | React.MouseEvent<Element, MouseEvent>
        | React.KeyboardEvent<Element>
        | React.FocusEvent<Element, Element>
        | null,
      newValue: any | null,
    ) => void,
  ) => void;
  unregisterHighlightChangeHandler: (
    handler: (
      e:
        | React.MouseEvent<Element, MouseEvent>
        | React.KeyboardEvent<Element>
        | React.FocusEvent<Element, Element>
        | null,
      newValue: any | null,
    ) => void,
  ) => void;
}

export const SelectUnstyledContext = React.createContext<SelectUnstyledContextType | undefined>(
  undefined,
);
