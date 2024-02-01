'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { getTextboxUtilityClass } from './textboxClasses';
import { TextboxOwnerState, TextboxProps } from './Textbox.types';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { useTextbox } from '../useTextbox';
import { TextboxContext } from './TextboxContext';

const useUtilityClasses = (ownerState: TextboxOwnerState) => {
  const { disabled, error, focused, formControlContext } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      error && 'error',
      focused && 'focused',
      Boolean(formControlContext) && 'formControl',
    ],
    input: ['input', disabled && 'disabled'],
  };

  return composeClasses(slots, useClassNamesOverride(getTextboxUtilityClass));
};

function defaultRender(props: React.ComponentPropsWithRef<'div'>) {
  return <div {...props} />;
}

/**
 *
 * Demos:
 *
 * - [Textbox](https://mui.com/base-ui/react-input/)
 *
 * API:
 *
 * - [Textbox API](https://mui.com/base-ui/react-input/components-api/#input)
 */
const Textbox = React.forwardRef(function Textbox(
  props: TextboxProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    children,
    className,
    defaultValue,
    disabled: disabledProp,
    error: errorProp,
    id,
    name,
    onChange,
    onKeyDown,
    onKeyUp,
    onBlur,
    render: renderProp,
    required: requiredProp,
    value,
    type = 'text',
    ...other
  } = props;

  const render = renderProp ?? defaultRender;

  const inputRef = React.useRef<HTMLElement | null>(null);

  const { getProps, disabled, error, required, focused, setFocused, formControlContext } =
    useTextbox({
      ...props,
      inputRef,
    });

  const ownerState: TextboxOwnerState = React.useMemo(
    () => ({
      disabled,
      error,
      focused,
      formControlContext,
      required,
      type,
    }),
    [disabled, error, formControlContext, required, type, focused],
  );

  const classes = useUtilityClasses(ownerState);

  const rootProps = getProps({
    ...other,
    children,
    ref: forwardedRef,
    type,
    className: clsx([className, classes.root]),
  });

  const registerInput = React.useCallback((element: HTMLElement | null) => {
    inputRef.current = element;
  }, []);

  const contextValue = React.useMemo(
    () => ({ registerInput, focused, setFocused, ownerState, defaultValue, value, onChange }),
    [focused, setFocused, ownerState, registerInput, defaultValue, value, onChange],
  );

  return (
    <TextboxContext.Provider value={contextValue}>
      {render(rootProps, ownerState)}
    </TextboxContext.Provider>
  );
});

Textbox.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  defaultValue: PropTypes.any,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `baseui--error` class on the root element.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  render: PropTypes.func,
  /**
   * @ignore
   */
  required: PropTypes.bool,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: PropTypes /* @typescript-to-proptypes-ignore */.oneOf([
    'button',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
} as any;

export { Textbox };
