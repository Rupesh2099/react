import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import { alpha } from '@mui/system';
import { makeStyles } from '@mui/styles';
import styled, { rootShouldForwardProp } from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useTheme from '../styles/useTheme';
import ListContext from '../List/ListContext';
import ButtonBase from '../ButtonBase';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import { dividerClasses } from '../Divider';
import { listItemIconClasses } from '../ListItemIcon';
import { listItemTextClasses } from '../ListItemText';
import menuItemClasses, { getMenuItemUtilityClass } from './menuItemClasses';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import createChainedFunction from '../utils/createChainedFunction';

const RTL_ANCHOR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left',
};

const LTR_ANCHOR_ORIGIN = {
  vertical: 'top',
  horizontal: 'right',
};

const RTL_TRANSFORM_ORIGIN = {
  vertical: 'top',
  horizontal: 'right',
};

const LTR_TRANSFORM_ORIGIN = {
  vertical: 'top',
  horizontal: 'left',
};

export const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.dense && styles.dense,
    ownerState.divider && styles.divider,
    !ownerState.disableGutters && styles.gutters,
  ];
};

const useUtilityClasses = (ownerState) => {
  const { disabled, dense, divider, disableGutters, openSubMenu, selected, classes } = ownerState;
  const slots = {
    root: [
      'root',
      dense && 'dense',
      disabled && 'disabled',
      !disableGutters && 'gutters',
      divider && 'divider',
      selected && 'selected',
      openSubMenu && 'openSubMenuParent',
    ],
  };

  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);

  return {
    ...classes,
    ...composedClasses,
  };
};

const MenuItemRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiMenuItem',
  slot: 'Root',
  overridesResolver,
})(({ theme, ownerState }) => ({
  ...theme.typography.body1,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  ...(!ownerState.disableGutters && {
    paddingLeft: 16,
    paddingRight: 16,
  }),
  ...(ownerState.divider && {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundClip: 'padding-box',
  }),
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: theme.palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
  [`&.${menuItemClasses.selected}`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${menuItemClasses.focusVisible}`]: {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
      ),
    },
  },
  [`&.${menuItemClasses.selected}:hover`]: {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
    ),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
  },
  [`&.${menuItemClasses.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus,
  },
  [`&.${menuItemClasses.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity,
  },
  [`&.${menuItemClasses.openSubMenuParent}`]: {
    backgroundColor: theme.palette.action.hover,
  },
  [`& + .${dividerClasses.root}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  [`& + .${dividerClasses.inset}`]: {
    marginLeft: 52,
  },
  [`& .${listItemTextClasses.root}`]: {
    marginTop: 0,
    marginBottom: 0,
  },
  [`& .${listItemTextClasses.inset}`]: {
    paddingLeft: 36,
  },
  [`& .${listItemIconClasses.root}`]: {
    minWidth: 36,
  },
  ...(!ownerState.dense && {
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto',
    },
  }),
  ...(ownerState.dense && {
    minHeight: 32, // https://material.io/components/menus#specs > Dense
    paddingTop: 4,
    paddingBottom: 4,
    ...theme.typography.body2,
    [`& .${listItemIconClasses.root} svg`]: {
      fontSize: '1.25rem',
    },
  }),
}));

/* Styles applied to a Menu Item's children when a subMenu is present */
const useStyles = makeStyles({
  subMenuItemWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  /* Styles applied to the subMenuIcon when it is present. */
  subMenuIcon: {
    marginLeft: ({ theme }) => theme.spacing(2),
  },
  /* Styles applied to subMenuIcon when direction is 'rtl'. */
  rtlSubMenuIcon: {
    transform: 'rotate(-180deg)',
  },
});

const MenuItem = React.forwardRef(function MenuItem(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiMenuItem' });
  const {
    autoFocus = false,
    children,
    component = 'li',
    dense = false,
    divider = false,
    disableGutters = false,
    focusVisibleClassName,
    onArrowRightKeydown,
    openSubMenu = false,
    onKeyDown,
    role = 'menuitem',
    selected,
    subMenu,
    subMenuIcon: SubMenuIcon = KeyboardArrowRight,
    setParentOpenSubMenuIndex,
    tabIndex: tabIndexProp,
    onParentClose,
    ...other
  } = props;

  const context = React.useContext(ListContext);
  const childContext = {
    dense: dense || context.dense || false,
    disableGutters,
  };

  const theme = useTheme();

  const menuItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (menuItemRef.current) {
        menuItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error(
          'MUI: Unable to set focus to a MenuItem whose component has not been rendered.',
        );
      }
    }
  }, [autoFocus]);

  const ownerState = {
    ...props,
    dense: childContext.dense,
    divider,
    disableGutters,
  };

  const classes = useUtilityClasses(props);
  const hookClasses = useStyles({ theme });

  const handleRef = useForkRef(menuItemRef, ref);

  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  const {
    anchorEl, // disallowed
    onParentClose: onParentCloseProp, // disallowed
    MenuListProps, // Needs to be spread into subMenu prop
    isSubMenu, // disallowed
    open, // disallowed
    setParentOpenSubMenuIndex: setParentOpenSubMenuIndexProp, // disallowed
    onClose: subOnClose, // Needs to be combined with parentOnClose on the subMenu
    ...allowedSubMenuProps
  } = subMenu ? subMenu.props : {};

  const listItemAnchorEl = menuItemRef.current;
  const renderSubMenu = openSubMenu && listItemAnchorEl;

  return (
    <ListContext.Provider value={childContext}>
      <MenuItemRoot
        aria-haspopup={subMenu ? true : undefined}
        aria-expanded={subMenu ? openSubMenu : undefined}
        onKeyDown={createChainedFunction(onArrowRightKeydown, onKeyDown)}
        ref={handleRef}
        role={role}
        tabIndex={tabIndex}
        component={component}
        focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
        {...other}
        ownerState={ownerState}
        classes={classes}
      >
        {subMenu ? (
          <div className={hookClasses.subMenuItemWrapper}>
            {children}
            <SubMenuIcon
              className={clsx(hookClasses.subMenuIcon, {
                [hookClasses.rtlSubMenuIcon]: theme.direction === 'rtl',
              })}
            />
          </div>
        ) : (
          children
        )}
      </MenuItemRoot>
      {renderSubMenu &&
        React.cloneElement(subMenu, {
          key: 'subMenu',
          anchorEl: listItemAnchorEl,
          anchorOrigin: theme.direction === 'rtl' ? RTL_ANCHOR_ORIGIN : LTR_ANCHOR_ORIGIN,
          MenuListProps: { ...MenuListProps, isSubMenu: true },
          open: openSubMenu,
          onClose: createChainedFunction(onParentClose, subOnClose),
          setParentOpenSubMenuIndex,
          transformOrigin: theme.direction === 'rtl' ? RTL_TRANSFORM_ORIGIN : LTR_TRANSFORM_ORIGIN,
          ...allowedSubMenuProps,
        })}
    </ListContext.Provider>
  );
});

MenuItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent Menu component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  onArrowRightKeydown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseEnter: PropTypes.func,
  /**
   * @ignore
   */
  onParentClose: PropTypes.func,
  /**
   * When `true`, opens the subMenu, if provided.
   * @default false
   */
  openSubMenu: PropTypes.bool,
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * @ignore
   */
  selected: PropTypes.bool,
  /**
   * @ignore
   */
  setParentOpenSubMenuIndex: PropTypes.func,
  /**
   * Menu to display as a sub-menu.
   */
  subMenu: PropTypes.node,
  /**
   * Normally `Icon`, `SvgIcon`, or a `@material-ui/icons`
   * SVG icon element rendered on a MenuItem that
   * contains a subMenu
   * @default KeyboardArrowRight
   */
  subMenuIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
};

export default MenuItem;
