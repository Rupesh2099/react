import * as React from 'react';
import {
  unstable_useControlled as useControlled,
  unstable_useForkRef as useForkRef,
  unstable_useId as useId,
} from '@mui/utils';
import { useButton } from '../ButtonUnstyled';
import {
  SelectChangeEventType,
  SelectOption,
  UseSelectButtonSlotProps,
  UseSelectListboxSlotProps,
  UseSelectMultiParameters,
  UseSelectMultiResult,
  UseSelectOptionSlotProps,
  UseSelectParameters,
  UseSelectSingleParameters,
  UseSelectSingleResult,
} from './useSelect.types';
import {
  ListboxReducer,
  useListbox,
  defaultListboxReducer,
  ActionTypes,
  UseListboxParameters,
} from '../ListboxUnstyled';
import { EventHandlers } from '../utils/types';
import defaultOptionStringifier from './defaultOptionStringifier';

function useSelect<TValue>(props: UseSelectSingleParameters<TValue>): UseSelectSingleResult<TValue>;
function useSelect<TValue>(props: UseSelectMultiParameters<TValue>): UseSelectMultiResult<TValue>;
function useSelect<TValue>(props: UseSelectParameters<TValue>) {
  const {
    buttonRef: buttonRefProp,
    defaultValue,
    disabled = false,
    listboxId: listboxIdProp,
    listboxRef: listboxRefProp,
    multiple = false,
    onChange,
    onHighlightChange,
    onOpenChange,
    open = false,
    options,
    optionStringifier = defaultOptionStringifier,
    value: valueProp,
  } = props;

  const buttonRef = React.useRef<HTMLElement>(null);
  const handleButtonRef = useForkRef(buttonRefProp, buttonRef);

  const listboxRef = React.useRef<HTMLElement | null>(null);
  const listboxId = useId(listboxIdProp);

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'SelectUnstyled',
    state: 'value',
  });

  const optionsMap = React.useMemo(() => {
    const map = new Map<TValue, SelectOption<TValue>>();
    options.forEach((option) => {
      map.set(option.value, option);
    });
    return map;
  }, [options]);

  // prevents closing the listbox on keyUp right after opening it
  const ignoreEnterKeyUp = React.useRef(false);

  // prevents reopening the listbox when button is clicked
  // (listbox closes on lost focus, then immediately reopens on click)
  const ignoreClick = React.useRef(false);

  // Ensure the listbox is focused after opening
  const [listboxFocusRequested, requestListboxFocus] = React.useState(false);

  const focusListboxIfRequested = React.useCallback(() => {
    if (listboxFocusRequested && listboxRef.current != null) {
      listboxRef.current.focus();
      requestListboxFocus(false);
    }
  }, [listboxFocusRequested]);

  const handleListboxRef = useForkRef(listboxRefProp, listboxRef, focusListboxIfRequested);

  const selectionChangeEventHandlers = React.useRef<
    Set<(e: SelectChangeEventType, newValue: TValue | TValue[] | null) => void>
  >(new Set());

  const highlightChangeEventHandlers = React.useRef<
    Set<(e: SelectChangeEventType, newValue: TValue | null) => void>
  >(new Set());

  const handleSelectionChange = React.useCallback(
    (e: SelectChangeEventType, newValue: TValue | TValue[] | null) => {
      selectionChangeEventHandlers.current.forEach((handler) => handler(e, newValue));
    },
    [],
  );

  const handleHighlightChange = React.useCallback(
    (e: SelectChangeEventType, newValue: TValue | null) => {
      highlightChangeEventHandlers.current.forEach((handler) => handler(e, newValue));
    },
    [],
  );

  const registerSelectionChangeHandler = React.useCallback(
    (handler: (e: SelectChangeEventType, newValue: TValue | TValue[] | null) => void) => {
      selectionChangeEventHandlers.current.add(handler);
    },
    [],
  );

  const unregisterSelectionChangeHandler = React.useCallback(
    (handler: (e: SelectChangeEventType, newValue: TValue | TValue[] | null) => void) => {
      selectionChangeEventHandlers.current.delete(handler);
    },
    [],
  );

  const registerHighlightChangeHandler = React.useCallback(
    (handler: (e: SelectChangeEventType, newValue: TValue | null) => void) => {
      highlightChangeEventHandlers.current.add(handler);
    },
    [],
  );

  const unregisterHighlightChangeHandler = React.useCallback(
    (handler: (e: SelectChangeEventType, newValue: TValue | null) => void) => {
      highlightChangeEventHandlers.current.delete(handler);
    },
    [],
  );

  React.useEffect(() => {
    focusListboxIfRequested();
  }, [focusListboxIfRequested]);

  React.useEffect(() => {
    requestListboxFocus(open);
  }, [open]);

  const createHandleMouseDown =
    (otherHandlers?: Record<string, React.EventHandler<any>>) =>
    (event: React.MouseEvent<HTMLElement>) => {
      otherHandlers?.onMouseDown?.(event);
      if (!event.defaultPrevented && open) {
        ignoreClick.current = true;
      }
    };

  const createHandleButtonClick =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.MouseEvent) => {
      otherHandlers?.onClick?.(event);
      if (!event.defaultPrevented && !ignoreClick.current) {
        onOpenChange?.(!open);
      }

      ignoreClick.current = false;
    };

  const createHandleButtonKeyDown =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.KeyboardEvent) => {
      otherHandlers?.onKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Enter') {
        ignoreEnterKeyUp.current = true;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        onOpenChange?.(true);
      }
    };

  const createHandleListboxKeyUp =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.KeyboardEvent) => {
      otherHandlers?.onKeyUp?.(event);
      if (event.defaultPrevented) {
        return;
      }

      const closingKeys = multiple ? ['Escape'] : ['Escape', 'Enter', ' '];

      if (open && !ignoreEnterKeyUp.current && closingKeys.includes(event.key)) {
        buttonRef?.current?.focus();
      }

      ignoreEnterKeyUp.current = false;
    };

  const createHandleListboxItemClick = React.useCallback(
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.MouseEvent) => {
      otherHandlers?.onClick?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (!multiple) {
        onOpenChange?.(false);
      }
    },
    [multiple, onOpenChange],
  );

  const createHandleListboxBlur =
    (otherHandlers?: Record<string, React.EventHandler<any>>) => (event: React.FocusEvent) => {
      otherHandlers?.onBlur?.(event);
      if (!event.defaultPrevented) {
        onOpenChange?.(false);
      }
    };

  const listboxReducer: ListboxReducer<TValue> = React.useCallback(
    (state, action) => {
      const newState = defaultListboxReducer(state, action);

      // change selection when listbox is closed
      if (
        action.type === ActionTypes.keyDown &&
        !open &&
        (action.event.key === 'ArrowUp' || action.event.key === 'ArrowDown')
      ) {
        return {
          ...newState,
          selectedValue: newState.highlightedValue,
        };
      }

      if (
        action.type === ActionTypes.blur ||
        action.type === ActionTypes.setValue ||
        action.type === ActionTypes.optionsChange
      ) {
        return {
          ...newState,
          highlightedValue: newState.selectedValue as TValue,
        };
      }

      return newState;
    },
    [open],
  );

  const {
    getRootProps: getButtonRootProps,
    active: buttonActive,
    focusVisible: buttonFocusVisible,
  } = useButton({
    disabled,
    ref: handleButtonRef,
  });

  const optionValues = React.useMemo(() => options.map((o) => o.value), [options]);

  let useListboxParameters: UseListboxParameters<TValue>;

  const isOptionDisabled = React.useCallback(
    (valueToCheck: TValue) => {
      const option = optionsMap.get(valueToCheck);
      return option?.disabled ?? false;
    },
    [optionsMap],
  );

  const stringifyOption = React.useCallback(
    (valueToCheck: TValue) => {
      const option = optionsMap.get(valueToCheck);
      if (!option) {
        return '';
      }

      return optionStringifier(option);
    },
    [optionsMap, optionStringifier],
  );

  if (props.multiple) {
    const onChangeMultiple = onChange as (
      e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
      value: TValue[],
    ) => void;
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled,
      listboxRef: handleListboxRef,
      multiple: true,
      onChange: (e, newValues) => {
        setValue(newValues);
        onChangeMultiple?.(e, newValues);
        handleSelectionChange(e, newValues);
      },
      onHighlightChange: (e, newValue) => {
        onHighlightChange?.(e, newValue ?? null);
        handleHighlightChange(e, newValue ?? null);
      },
      options: optionValues,
      optionStringifier: stringifyOption,
      value: value as TValue[],
    };
  } else {
    const onChangeSingle = onChange as (
      e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
      value: TValue | null,
    ) => void;
    useListboxParameters = {
      id: listboxId,
      isOptionDisabled,
      listboxRef: handleListboxRef,
      multiple: false,
      onChange: (e, newValue: TValue | null) => {
        setValue(newValue);
        onChangeSingle?.(e, newValue);
        handleSelectionChange(e, newValue);
      },
      onHighlightChange: (e, newValue) => {
        onHighlightChange?.(e, newValue);
        handleHighlightChange(e, newValue);
      },
      options: optionValues,
      optionStringifier: stringifyOption,
      stateReducer: listboxReducer,
      value: value as TValue | null,
    };
  }

  const {
    getRootProps: getListboxRootProps,
    getOptionProps: getListboxOptionProps,
    getOptionState,
    highlightedOption,
    selectedOption: listboxSelectedOption,
  } = useListbox(useListboxParameters);

  const getButtonProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseSelectButtonSlotProps<TOther> => {
    return {
      ...getButtonRootProps({
        ...otherHandlers,
        onClick: createHandleButtonClick(otherHandlers),
        onMouseDown: createHandleMouseDown(otherHandlers),
        onKeyDown: createHandleButtonKeyDown(otherHandlers),
      }),
      role: 'combobox' as const,
      'aria-expanded': open,
      'aria-haspopup': 'listbox' as const,
      'aria-controls': listboxId,
    };
  };

  const getListboxProps = <TOther extends EventHandlers>(
    otherHandlers: TOther = {} as TOther,
  ): UseSelectListboxSlotProps<TOther> =>
    getListboxRootProps({
      ...otherHandlers,
      onBlur: createHandleListboxBlur(otherHandlers),
      onKeyUp: createHandleListboxKeyUp(otherHandlers),
    });

  const getOptionProps = React.useCallback(
    <TOther extends EventHandlers>(
      optionValue: TValue,
      otherHandlers: TOther = {} as TOther,
    ): UseSelectOptionSlotProps<TOther> => {
      return getListboxOptionProps(optionValue, {
        ...otherHandlers,
        onClick: createHandleListboxItemClick(otherHandlers),
      });
    },
    [getListboxOptionProps, createHandleListboxItemClick],
  );

  React.useDebugValue({
    selectedOption: listboxSelectedOption,
    highlightedOption,
    open,
  });

  return {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    open,
    registerHighlightChangeHandler,
    registerSelectionChangeHandler,
    unregisterHighlightChangeHandler,
    unregisterSelectionChangeHandler,
    value,
    highlightedOption,
  };
}

export default useSelect;
