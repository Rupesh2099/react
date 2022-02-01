import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useButton } from '@mui/base/ButtonUnstyled';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import iconButtonClasses, { getIconButtonUtilityClass } from './iconButtonClasses';
import { IconButtonProps, IconButtonTypeMap, ExtendIconButton } from './IconButtonProps';

const useUtilityClasses = (ownerState: IconButtonProps & { focusVisible: boolean }) => {
  const { color, disabled, focusVisible, focusVisibleClassName, size, variant } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  const composedClasses = composeClasses(slots, getIconButtonUtilityClass, {});

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

const IconButtonRoot = styled('button', {
  name: 'MuiIconButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: IconButtonProps }>(({ theme, ownerState }) => [
  {
    '--IconButton-size': '2.5rem',
    padding: '0.25rem',
    ...(ownerState.variant === 'outlined' && {
      padding: 'calc(0.25rem - var(--variant-outlined-borderWidth))', // account for the border width
    }),
    ...(ownerState.size === 'sm' && {
      '--IconButton-size': '2rem',
    }),
    ...(ownerState.size === 'lg' && {
      '--IconButton-size': '3rem',
      padding: '0.5rem',
      ...(ownerState.variant === 'outlined' && {
        padding: 'calc(0.5rem - var(--variant-outlined-borderWidth))', // account for the border width
      }),
    }),
    minWidth: 'var(--IconButton-size)', // use min-width instead of height to make the button resilient to its content
    minHeight: 'var(--IconButton-size)', // use min-height instead of height to make the button resilient to its content
    borderRadius: theme.vars.radius.sm,
    border: 'none',
    backgroundColor: 'transparent',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    [`&.${iconButtonClasses.focusVisible}`]: theme.focus.default,
  },
  theme.variants[ownerState.variant!]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
]);

const IconButton = React.forwardRef(function IconButton(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiIconButton',
  });

  const {
    children,
    className,
    action,
    component = 'button',
    color = 'primary',
    variant = 'light',
    size = 'md',
    ...other
  } = props;

  const buttonRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const ComponentProp = component;

  const { focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    component: ComponentProp,
    ref: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current?.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState = {
    ...props,
    component,
    color,
    variant,
    size,
    focusVisible,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <IconButtonRoot
      as={ComponentProp}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
      {...getRootProps()}
    >
      {children}
    </IconButtonRoot>
  );
}) as ExtendIconButton<IconButtonTypeMap>;

IconButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['context', 'danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The shape of the component.
   */
  shape: PropTypes.oneOf(['circular', 'rounded', 'square']),
  /**
   * The size of the component.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The variant to use.
   * @default 'contained'
   */
  variant: PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
} as any;

export default IconButton;
