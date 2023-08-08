'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getDialogActionsUtilityClass } from './dialogActionsClasses';
import { DialogActionsProps, DialogActionsTypeMap } from './DialogActionsProps';
import useSlot from '../utils/useSlot';
import { StyledCardActionsRoot } from '../CardActions/CardActions';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getDialogActionsUtilityClass, {});
};

const DialogActionsRoot = styled(StyledCardActionsRoot, {
  name: 'JoyDialogActions',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: DialogActionsProps }>({});
/**
 *
 * Demos:
 *
 * - [Card](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [DialogActions API](https://mui.com/joy-ui/api/card-actions/)
 */
const DialogActions = React.forwardRef(function DialogActions(inProps, ref) {
  const props = useThemeProps<typeof inProps & DialogActionsProps>({
    props: inProps,
    name: 'JoyDialogActions',
  });

  const {
    className,
    component = 'div',
    children,
    buttonFlex,
    orientation = 'horizontal-reverse',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const ownerState = {
    ...props,
    component,
    buttonFlex,
    orientation,
  };

  const classes = useUtilityClasses();

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: DialogActionsRoot,
    externalForwardedProps,
    ownerState,
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<DialogActionsTypeMap>;

DialogActions.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The CSS `flex` for the Button and its wrapper.
   */
  buttonFlex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Used to render icon or text elements inside the DialogActions if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal-reverse', 'horizontal', 'vertical']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default DialogActions;
