// @flow weak

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiList', () => {
  return {
    root: {
      flex: '1 1 auto',
      overflow: 'auto',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    padding: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    dense: {
      paddingTop: 4,
      paddingBottom: 4,
    },
    subheader: {
      paddingTop: 0,
    },
  };
});

/**
 * A material list root element.
 *
 * ```jsx
 * <List>
 *   <ListItem>....</ListItem>
 * </List>
 * ```
 */
export default class List extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a ReactElement.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    dense: PropTypes.bool,
    padding: PropTypes.bool,
    /**
     * @ignore
     */
    rootRef: PropTypes.func,
    subheader: PropTypes.node,
  };

  static defaultProps = {
    component: 'div',
    dense: false,
    padding: true,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  static childContextTypes = {
    dense: PropTypes.bool,
  };

  getChildContext() {
    const { dense } = this.props;

    return {
      dense,
    };
  }

  render() {
    const {
      className: classNameProp,
      component: ComponentProp,
      padding,
      children,
      dense,
      subheader,
      rootRef,
      ...other
    } = this.props;
    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(classes.root, {
      [classes.dense]: dense,
      [classes.padding]: padding,
      [classes.subheader]: subheader,
    }, classNameProp);

    return (
      <ComponentProp ref={rootRef} className={className} {...other}>
        {subheader}
        {children}
      </ComponentProp>
    );
  }
}
