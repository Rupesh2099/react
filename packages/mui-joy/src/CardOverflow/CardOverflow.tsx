'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { useColorInversion } from '../styles/ColorInversion';
import { getCardOverflowUtilityClass } from './cardOverflowClasses';
import {
  CardOverflowProps,
  CardOverflowOwnerState,
  CardOverflowTypeMap,
} from './CardOverflowProps';
import useSlot from '../utils/useSlot';
import buttonClasses from '../Button/buttonClasses';
import cardClasses from '../Card/cardClasses';
import modalDialogClasses from '../ModalDialog/modalDialogClasses';

const useUtilityClasses = (ownerState: CardOverflowOwnerState) => {
  const { variant, color } = ownerState;
  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getCardOverflowUtilityClass, {});
};

const CardOverflowRoot = styled('div', {
  name: 'JoyCardOverflow',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{
  ownerState: CardOverflowOwnerState & {
    'data-first-child'?: string;
    'data-last-child'?: string;
    'data-parent'?: 'Card-horizontal' | 'Card-vertical';
  };
}>(({ theme, ownerState }) => {
  const childRadius = 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))';
  return {
    alignSelf: 'stretch', // prevent shrinking if parent's align-items is not initial
    position: 'relative',
    display: 'flex',
    margin: 'var(--_CardOverflow-margin)',
    borderRadius: 'var(--_CardOverflow-radius)',
    padding: 'var(--_CardOverflow-padding)',
    [`.${cardClasses.horizontal} > &`]: {
      '--AspectRatio-margin': 'calc(-1 * var(--Card-padding)) 0px',
      '--_CardOverflow-margin': 'var(--CardOverflow-offset) 0px',
      '--_CardOverflow-padding': 'var(--Card-padding) 0px',
      '&[data-first-child]': {
        '--AspectRatio-radius': `${childRadius} 0 0 ${childRadius}`,
        '--_CardOverflow-radius': 'var(--CardOverflow-radius) 0 0 var(--CardOverflow-radius)',
        '--_CardOverflow-margin':
          'var(--CardOverflow-offset) 0px var(--CardOverflow-offset) var(--CardOverflow-offset)',
      },
      '&[data-last-child]': {
        '--AspectRatio-radius': `0 ${childRadius} ${childRadius} 0`,
        '--_CardOverflow-radius': '0 var(--CardOverflow-radius) var(--CardOverflow-radius) 0',
        '--_CardOverflow-margin':
          'var(--CardOverflow-offset) var(--CardOverflow-offset) var(--CardOverflow-offset) 0px',
      },
      '&[data-last-child][data-first-child]': {
        '--AspectRatio-radius': childRadius,
      },
      [`& > .${buttonClasses.root}:only-child`]: {
        height: 'calc(100% + -2 * var(--CardOverflow-offset))',
        '--Button-margin': 'var(--CardOverflow-offset) 0',
        '--Button-radius': '0 var(--CardOverflow-radius) var(--CardOverflow-radius) 0',
      },
    },
    [`.${cardClasses.vertical} > &, .${modalDialogClasses.root} > &`]: {
      flexDirection: 'column', // required to make AspectRatio works
      '--AspectRatio-margin': '0 calc(-1 * var(--Card-padding))',
      '--_CardOverflow-margin': '0 var(--CardOverflow-offset)',
      '--_CardOverflow-padding': '0 var(--Card-padding)',
      '&[data-first-child]': {
        '--AspectRatio-radius': `${childRadius} ${childRadius} 0 0`,
        '--_CardOverflow-radius': 'var(--CardOverflow-radius) var(--CardOverflow-radius) 0 0',
        '--_CardOverflow-margin': 'var(--CardOverflow-offset) var(--CardOverflow-offset) 0',
      },
      '&[data-last-child]': {
        '--AspectRatio-radius': `0 0 ${childRadius} ${childRadius}`,
        '--_CardOverflow-radius': '0 0 var(--CardOverflow-radius) var(--CardOverflow-radius)',
        '--_CardOverflow-margin': '0 var(--CardOverflow-offset) var(--CardOverflow-offset)',
      },
      '&[data-last-child][data-first-child]': {
        '--AspectRatio-radius': childRadius,
      },
      [`& > .${buttonClasses.root}:only-child`]: {
        zIndex: 1, // prevent button from being covered Link overlay. This can be improved in the future with :has() selector
        width: 'calc(100% + -2 * var(--CardOverflow-offset))',
        '--Button-margin': '0 var(--CardOverflow-offset)',
        '--Button-radius': '0 0 var(--CardOverflow-radius) var(--CardOverflow-radius)',
      },
    },
    ...theme.variants[ownerState.variant!]?.[ownerState.color!],
  };
});
/**
 *
 * Demos:
 *
 * - [Card](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [CardOverflow API](https://mui.com/joy-ui/api/card-overflow/)
 */
const CardOverflow = React.forwardRef(function CardOverflow(inProps, ref) {
  const props = useThemeProps<typeof inProps & CardOverflowProps>({
    props: inProps,
    name: 'JoyCardOverflow',
  });

  const {
    className,
    component = 'div',
    children,
    color: colorProp = 'neutral',
    variant = 'plain',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const ownerState = {
    ...props,
    component,
    color,
    variant,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: CardOverflowRoot,
    externalForwardedProps,
    ownerState,
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<CardOverflowTypeMap>;

CardOverflow.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the CardOverflow if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

// @ts-ignore
CardOverflow.muiName = 'CardOverflow';

export default CardOverflow;
