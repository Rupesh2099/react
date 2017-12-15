import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import wrapDisplayName from 'recompose/wrapDisplayName';
import Styled from './Styled';

// Wrap a component in `Styled` to provide classes.
const withStyles = (stylesOrCreator, options = {}) => Component => {
  const Style = props => {
    const { classes, innerRef, ...componentProps } = props;
    return (
      <Styled classes={classes} Component={Component} options={options} styles={stylesOrCreator}>
        {styledProps => <Component ref={innerRef} {...styledProps} {...componentProps} />}
      </Styled>
    );
  };

  Style.propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object,
    /**
     * Use that property to pass a ref callback to the decorated component.
     */
    innerRef: PropTypes.func,
  };

  if (process.env.NODE_ENV !== 'production') {
    Style.displayName = wrapDisplayName(Component, 'withStyles');
  }

  hoistNonReactStatics(Style, Component);

  if (process.env.NODE_ENV !== 'production') {
    // Exposed for test purposes.
    Style.Naked = Component;
    Style.options = options;
  }

  return Style;
};

export default withStyles;
