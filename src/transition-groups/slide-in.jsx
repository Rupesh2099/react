const React = require('react');
const ReactTransitionGroup = require('react-addons-transition-group');
const StylePropable = require('../mixins/style-propable');
const SlideInChild = require('./slide-in-child');


const SlideIn = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    enterDelay: React.PropTypes.number,
    childStyle: React.PropTypes.object,
    direction: React.PropTypes.oneOf(['left', 'right', 'up', 'down']),
  },

  getDefaultProps() {
    return {
      enterDelay: 0,
      direction: 'left',
    };
  },

  render() {
    let {
      enterDelay,
      children,
      childStyle,
      direction,
      style,
      ...other,
    } = this.props;

    let mergedRootStyles = this.mergeAndPrefix({
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
    }, style);

    let newChildren = React.Children.map(children, (child) => {
      return (
        <SlideInChild
          key={child.key}
          direction={direction}
          enterDelay={enterDelay}
          getLeaveDirection={this._getLeaveDirection}
          style={childStyle}>
          {child}
        </SlideInChild>
      );
    }, this);

    return (
      <ReactTransitionGroup
        {...other}
        style={mergedRootStyles}
        component="div">
        {newChildren}
      </ReactTransitionGroup>
    );
  },

  _getLeaveDirection() {
    return this.props.direction;
  },

});

module.exports = SlideIn;
