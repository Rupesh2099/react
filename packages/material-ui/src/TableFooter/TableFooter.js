import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { Tablelvl2Context } from '../Table';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'table-footer-group',
  },
};

function TableFooter(props) {
  const { classes, className, component: Component, ...other } = props;
  const childContext = { variant: 'footer' };

  return (
    <Tablelvl2Context.Provider value={childContext}>
      <Component className={classNames(classes.root, className)} {...other} />
    </Tablelvl2Context.Provider>
  );
}

TableFooter.propTypes = {
  /**
   * The content of the component, normally `TableRow`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
};

TableFooter.defaultProps = {
  component: 'tfoot',
};

export default withStyles(styles, { name: 'MuiTableFooter' })(TableFooter);
