import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '../styles/colorManipulator';
import styled, { rootShouldForwardProp } from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ListContext from '../List/ListContext';
import ButtonBase from '../ButtonBase';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import { dividerClasses } from '../Divider';
import { listItemIconClasses } from '../ListItemIcon';
import { listItemTextClasses } from '../ListItemText';
import menuItemClasses, { getMenuItemUtilityClass } from './menuItemClasses';

export const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return {
    ...styles.root,
    ...(styleProps.dense && styles.dense),
  };
};

const useUtilityClasses = (styleProps) => {
  const { disabled, dense, selected, classes } = styleProps;
  const slots = {
    root: ['root', dense && 'dense', disabled && 'disabled', selected && 'selected'],
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
})(({ theme, styleProps }) => ({
  ...theme.typography.body1,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  minHeight: 48,
  padding: '6px 16px',
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
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
  ...(!styleProps.dense && {
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto',
    },
  }),
  ...(styleProps.dense && {
    minHeight: 36,
    ...theme.typography.body2,
    [`& .${listItemIconClasses.root} svg`]: {
      fontSize: '1.25rem',
    },
  }),
}));

const MenuItem = React.forwardRef(function MenuItem(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiMenuItem' });
  const {
    autoFocus = false,
    component = 'li',
    dense: denseProp = false,
    focusVisibleClassName,
    role = 'menuitem',
    tabIndex: tabIndexProp,
    ...other
  } = props;

  const context = React.useContext(ListContext);
  const dense = denseProp || context.dense || false;
  const childContext = {
    dense,
  };

  const menuItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (menuItemRef.current) {
        menuItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error(
          'Material-UI: Unable to set focus to a MenuItem whose component has not been rendered.',
        );
      }
    }
  }, [autoFocus]);

  const styleProps = {
    ...props,
    dense,
  };

  const classes = useUtilityClasses(props);

  const handleRef = useForkRef(menuItemRef, ref);

  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return (
    <ListContext.Provider value={childContext}>
      <MenuItemRoot
        ref={handleRef}
        role={role}
        tabIndex={tabIndex}
        component={component}
        focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
        {...other}
        styleProps={styleProps}
        classes={classes}
      />
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
  role: PropTypes.string,
  /**
   * @ignore
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * @default 0
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default MenuItem;
