import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import { useSwitch } from '@mui/core/SwitchUnstyled';
import { styled } from '../styles';
import { rootShouldForwardProp } from '../styles/styled';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import { SwitchProps } from './SwitchProps';

const useUtilityClasses = (ownerState: SwitchProps & { focusVisible: boolean }) => {
  const { classes, checked, disabled, focusVisible, readOnly } = ownerState;

  const slots = {
    root: [
      'root',
      checked && 'checked',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      readOnly && 'readOnly',
    ],
    thumb: ['thumb', checked && 'checked'],
    track: ['track', checked && 'checked'],
    input: ['input'],
  };

  return composeClasses(slots, getSwitchUtilityClass, classes);
};

const SwitchRoot = styled('span', {
  name: 'JoySwitch',
  slot: 'Root',
  shouldForwardProp: rootShouldForwardProp,
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SwitchProps }>(({ theme, ownerState }) => {
  const colorPalette = theme.vars.palette[ownerState.color || 'brand'];
  return {
    '--joy-Switch-track-radius': '20px',
    '--joy-Switch-track-width': '48px',
    '--joy-Switch-track-height': '24px',
    '--joy-Switch-thumb-size': '16px',
    '--joy-Switch-thumb-radius': 'calc(var(--joy-Switch-track-radius) - 2px)',
    '--joy-Switch-thumb-width': 'var(--joy-Switch-thumb-size)',
    '--joy-Switch-thumb-offset':
      'max((var(--joy-Switch-track-height) - var(--joy-Switch-thumb-size)) / 2, 0px)',
    borderRadius: 'var(--joy-Switch-track-radius)',
    position: 'relative',
    padding:
      'calc((var(--joy-Switch-thumb-size) / 2) - (var(--joy-Switch-track-height) / 2)) calc(-1 * var(--joy-Switch-thumb-offset))',
    [`&.${switchClasses.focusVisible}`]: {
      outline: '4px solid',
      outlineColor: theme.vars.palette.brand[300],
    },
    color: theme.vars.palette.neutral[600],
    '&:hover': {
      color: theme.vars.palette.neutral[500],
    },
    [`&.${switchClasses.checked}`]: {
      color: colorPalette[600],
      '&:hover': {
        color: colorPalette[700],
      },
    },
    [`&.${switchClasses.disabled}`]: {
      pointerEvents: 'none',
      cursor: 'default',
      opacity: 0.6,
    },
  };
});

const SwitchInput = styled('input', {
  name: 'JoySwitch',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: SwitchProps }>(() => ({
  margin: 0,
  height: '100%',
  width: '100%',
  opacity: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  cursor: 'pointer',
}));

const SwitchTrack = styled('span', {
  name: 'JoySwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: SwitchProps & { focusVisible: boolean } }>(() => ({
  position: 'relative',
  color: 'inherit',
  height: 'var(--joy-Switch-track-height)',
  width: 'var(--joy-Switch-track-width)',
  display: 'block',
  backgroundColor: 'currentColor',
  borderRadius: 'var(--joy-Switch-track-radius)',
}));

const SwitchThumb = styled('span', {
  name: 'JoySwitch',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb,
})<{ ownerState: SwitchProps }>(() => ({
  transition: 'left 0.2s',
  position: 'absolute',
  top: '50%',
  left: 'calc(50% - var(--joy-Switch-track-width) / 2 + var(--joy-Switch-thumb-width) / 2 + var(--joy-Switch-thumb-offset))',
  transform: 'translate(-50%, -50%)',
  width: 'var(--joy-Switch-thumb-width)',
  height: 'var(--joy-Switch-thumb-size)',
  borderRadius: 'var(--joy-Switch-thumb-radius)',
  backgroundColor: '#fff',
  [`&.${switchClasses.checked}`]: {
    left: 'calc(50% + var(--joy-Switch-track-width) / 2 - var(--joy-Switch-thumb-width) / 2 - var(--joy-Switch-thumb-offset))',
  },
}));

const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>(function Switch(inProps, ref) {
  const props = inProps;
  const {
    checked: checkedProp,
    className,
    component,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
    required,
    ...otherProps
  } = props;

  const useSwitchProps = {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
  };

  const { getInputProps, checked, disabled, focusVisible, readOnly } = useSwitch(useSwitchProps);

  const ownerState = {
    ...props,
    checked,
    disabled,
    focusVisible,
    readOnly,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <SwitchRoot
      ref={ref}
      {...otherProps}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
    >
      <SwitchTrack ownerState={ownerState} className={clsx(classes.track)} />
      <SwitchThumb ownerState={ownerState} className={clsx(classes.thumb)} />
      <SwitchInput ownerState={ownerState} {...getInputProps()} className={clsx(classes.input)} />
    </SwitchRoot>
  );
});

export default Switch;
