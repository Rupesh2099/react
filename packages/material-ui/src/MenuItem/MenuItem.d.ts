import { SxProps } from '@material-ui/system';
import { Theme } from '@material-ui/core/styles';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { MenuItemClasses } from './menuItemClasses';

export type MenuItemTypeMap<P = {}, D extends React.ElementType = 'li'> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * If `true`, the list item is focused during the first mount.
     * Focus will also be triggered if the value changes from false to true.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<MenuItemClasses>;
    /**
     * If `true`, compact vertical padding designed for keyboard and mouse input is used.
     * The prop defaults to the value inherited from the parent Menu component.
     * @default false
     */
    dense?: boolean;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Use to apply selected styling.
     * @default false
     */
    selected?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Menus](https://material-ui.com/components/menus/)
 *
 * API:
 *
 * - [MenuItem API](https://material-ui.com/api/menu-item/)
 * - inherits [ListItemButton API](https://material-ui.com/api/list-item-button/)
 */
declare const MenuItem: ExtendButtonBase<MenuItemTypeMap>;

export type MenuItemProps<
  D extends React.ElementType = MenuItemTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MenuItemTypeMap<P, D>, D>;

export default MenuItem;
