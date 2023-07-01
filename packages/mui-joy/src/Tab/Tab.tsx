import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import useTab from '@mui/base/useTab';
import { StyledListItemButton } from '../ListItemButton/ListItemButton';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { useColorInversion } from '../styles/ColorInversion';
import { getTabUtilityClass } from './tabClasses';
import { TabOwnerState, TabTypeMap } from './TabProps';
import RowListContext from '../List/RowListContext';
import ListItemButtonOrientationContext from '../ListItemButton/ListItemButtonOrientationContext';
import useSlot from '../utils/useSlot';
import listItemDecoratorClasses from '../ListItemDecorator/listItemDecoratorClasses';

const useUtilityClasses = (ownerState: TabOwnerState) => {
  const { selected, disabled, focusVisible, variant, color, orientation } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      selected && 'selected',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getTabUtilityClass, {});
};

const TabRoot = styled(StyledListItemButton, {
  name: 'JoyTab',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TabOwnerState }>(({ ownerState, theme }) => [
  {
    flexGrow: ownerState.row ? 1 : 0,
    justifyContent: ownerState.row ? 'center' : 'initial',
    [`& > .${listItemDecoratorClasses.root}`]: { alignItems: 'center' },
    '--_offset': 'calc(-1 * var(--variant-borderWidth, 0px))',
    // using pseudo element for showing active indicator is best for controlling the size and customization.
    // for example, developers can customize the radius, width or background.
    // (border and box-shadow are not flexible when it comes to customization).
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      margin: 'auto',
      background: 'var(--Tab-lineColor)',
    },
    '&:not([aria-selected="true"]):hover': {
      '--Tab-lineColor': theme.vars.palette.divider,
      // private variable to prevent the Tab's background from covering TabList's underline
      '--_lineThickness':
        ownerState.variant === 'outlined' ? '0px' : 'var(--_TabList-hasUnderline, 1px)', // this means if TabList has underline, the value will be 1px.
    },
    '&[aria-selected="true"]': {
      '--Tab-lineColor': 'var(--Tab-selectedLineColor, currentColor)',
    },
  },
  // the padding is to account for the indicator's thickness to make the text proportional.
  ownerState.indicatorPlacement === 'bottom' && {
    paddingBottom:
      'calc(var(--ListItem-paddingY) - var(--variant-borderWidth, 0px) + var(--Tab-lineThickness))',
    '&::after': {
      height: 'var(--_lineThickness, var(--Tab-lineThickness))',
      left: 'var(--_offset)',
      right: 'var(--_offset)',
      bottom: 'var(--_offset)',
    },
  },
  ownerState.indicatorPlacement === 'top' && {
    paddingTop:
      'calc(var(--ListItem-paddingY) - var(--variant-borderWidth, 0px) + var(--Tab-lineThickness))',
    '&::after': {
      height: 'var(--_lineThickness, var(--Tab-lineThickness))',
      left: 'var(--_offset)',
      right: 'var(--_offset)',
      top: 'var(--_offset)',
    },
  },
  ownerState.indicatorPlacement === 'right' && {
    paddingRight: 'calc(var(--ListItem-paddingRight) + var(--Tab-lineThickness))',
    '&::after': {
      width: 'var(--_lineThickness, var(--Tab-lineThickness))',
      top: 'var(--_offset)',
      bottom: 'var(--_offset)',
      right: 'var(--_offset)',
    },
  },
  ownerState.indicatorPlacement === 'left' && {
    paddingLeft: 'calc(var(--ListItem-paddingLeft) + var(--Tab-lineThickness))',
    '&::after': {
      width: 'var(--_lineThickness, var(--Tab-lineThickness))',
      top: 'var(--_offset)',
      bottom: 'var(--_offset)',
      left: 'var(--_offset)',
    },
  },
]);
/**
 *
 * Demos:
 *
 * - [Tabs](https://mui.com/joy-ui/react-tabs/)
 *
 * API:
 *
 * - [Tab API](https://mui.com/joy-ui/api/tab/)
 */
const Tab = React.forwardRef(function Tab(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyTab',
  });

  const row = React.useContext(RowListContext);

  const {
    action,
    children,
    value: valueProp,
    disabled = false,
    onChange,
    onClick,
    onFocus,
    component = 'button',
    orientation = 'horizontal',
    variant = 'plain',
    color: colorProp = 'neutral',
    indicatorPlacement = row ? 'bottom' : 'right',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, colorProp);

  const tabRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement>();
  const handleRef = useForkRef(tabRef, ref) as React.RefCallback<Element>;

  const { active, focusVisible, setFocusVisible, selected, getRootProps } = useTab({
    ...props,
    rootRef: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        tabRef.current!.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState = {
    ...props,
    indicatorPlacement,
    orientation,
    row,
    active,
    focusVisible,
    disabled,
    selected,
    variant,
    color,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    elementType: TabRoot,
    getSlotProps: getRootProps,
    externalForwardedProps,
    ownerState,
    className: classes.root,
  });

  return (
    <ListItemButtonOrientationContext.Provider value={orientation}>
      {/* @ts-ignore ListItemButton base is div which conflict with TabProps 'button' */}
      <SlotRoot {...rootProps}>{children}</SlotRoot>
    </ListItemButtonOrientationContext.Provider>
  );
}) as OverridableComponent<TabTypeMap>;

Tab.propTypes /* remove-proptypes */ = {
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
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Callback invoked when new value is being set.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * The content direction flow.
   * @default 'horizontal'
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
  /**
   * You can provide your own value. Otherwise, it falls back to the child position index.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'plain'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Tab;
