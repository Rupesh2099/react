'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getAccordionGroupUtilityClass } from './accordionGroupClasses';
import {
  AccordionGroupProps,
  AccordionGroupOwnerState,
  AccordionGroupTypeMap,
} from './AccordionGroupProps';
import useSlot from '../utils/useSlot';
import ListProvider from '../List/ListProvider';
import { StyledList } from '../List/List';

const useUtilityClasses = (ownerState: AccordionGroupOwnerState) => {
  const { variant, color, size } = ownerState;
  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}}`,
    ],
  };

  return composeClasses(slots, getAccordionGroupUtilityClass, {});
};

const AccordionGroupRoot = styled(StyledList as unknown as 'div', {
  name: 'JoyAccordionGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AccordionGroupOwnerState }>(({ theme }) => ({
  '--List-padding': '0px',
  '--ListDivider-gap': '0px',
}));

/**
 * ⚠️ AccordionGroup must be used as a direct child of the [Card](https://mui.com/joy-ui/react-card/) component.
 *
 * Demos:
 *
 * - [Card](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [AccordionGroup API](https://mui.com/joy-ui/api/card-content/)
 */
const AccordionGroup = React.forwardRef(function AccordionGroup(inProps, ref) {
  const props = useThemeProps<typeof inProps & AccordionGroupProps>({
    props: inProps,
    name: 'JoyAccordionGroup',
  });

  const {
    className,
    component = 'div',
    color = 'neutral',
    children,
    variant = 'plain',
    size = 'md',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const externalForwardedProps = { ...other, component, slots, slotProps };

  const ownerState = {
    ...props,
    component,
    color,
    variant,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: AccordionGroupRoot,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      <ListProvider>{children}</ListProvider>
    </SlotRoot>
  );
}) as OverridableComponent<AccordionGroupTypeMap>;

AccordionGroup.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the AccordionGroup if `src` is not set.
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
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
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

export default AccordionGroup;
