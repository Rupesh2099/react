import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import { useMenu, MenuUnstyledContext, MenuUnstyledContextType } from '@mui/base/MenuUnstyled';
import { styled, useThemeProps } from '../styles';
import { ListRoot } from '../List/List';
import RowListContext from '../List/RowListContext';
import { MenuListProps, MenuListTypeMap } from './MenuListProps';
import { getMenuListUtilityClass } from './menuListClasses';

const useUtilityClasses = (ownerState: MenuListProps) => {
  const { variant, color, size } = ownerState;
  const slots = {
    root: [
      'root',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getMenuListUtilityClass, {});
};

const MenuListRoot = styled(ListRoot, {
  name: 'MuiMenuList',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: MenuListProps; component?: React.ElementType }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    overflow: 'auto',
    ...(!variantStyle.backgroundColor && {
      backgroundColor: theme.vars.palette.background.surface,
    }),
    '--List-radius': theme.vars.radius.sm,
    '--List-item-stickyBackground':
      variantStyle?.backgroundColor ||
      variantStyle?.background ||
      theme.vars.palette.background.surface,
    '--List-item-stickyTop': 'calc(var(--List-padding, var(--List-divider-gap)) * -1)', // negative amount of the List's padding block
  };
});

const MenuList = React.forwardRef(function MenuList(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMenuList',
  });

  const {
    actions,
    id: idProp,
    children,
    size = 'md',
    variant = 'outlined',
    color = 'neutral',
    ...other
  } = props;

  const {
    registerItem,
    unregisterItem,
    getListboxProps,
    getItemProps,
    getItemState,
    highlightFirstItem,
    highlightLastItem,
  } = useMenu({
    listboxRef: ref,
    listboxId: idProp,
  });

  React.useImperativeHandle(
    actions,
    () => ({
      highlightFirstItem,
      highlightLastItem,
    }),
    [highlightFirstItem, highlightLastItem],
  );

  const ownerState = {
    ...props,
    variant,
    color,
    size,
    instanceSize: size,
    nesting: false,
    scoped: true,
    row: false,
  };
  const classes = useUtilityClasses(ownerState);

  const listboxProps = useSlotProps({
    elementType: MenuListRoot,
    getSlotProps: getListboxProps,
    externalSlotProps: {},
    externalForwardedProps: other,
    ownerState,
    className: classes.root,
  });

  const contextValue = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
    getListboxProps,
    open: true,
  } as MenuUnstyledContextType;

  return (
    <MenuListRoot {...listboxProps}>
      <MenuUnstyledContext.Provider value={contextValue}>
        <RowListContext.Provider value={false}>
          {React.Children.map(children, (child, index) =>
            React.isValidElement(child)
              ? React.cloneElement(child, {
                  // to let MenuItem knows when to apply margin(Inline|Block)Start
                  ...(index === 0 && { 'data-first-child': '' }),
                })
              : child,
          )}
        </RowListContext.Provider>
      </MenuUnstyledContext.Provider>
    </MenuListRoot>
  );
}) as OverridableComponent<MenuListTypeMap>;

MenuList.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref with imperative actions.
   * It allows to select the first or last menu item.
   */
  actions: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        highlightFirstItem: PropTypes.func.isRequired,
        highlightLastItem: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * The size of the component (affect other nested list* components).
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
} as any;

export default MenuList;
