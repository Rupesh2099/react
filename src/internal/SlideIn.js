import React, {Component, PropTypes} from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import SlideInChild from './SlideInChild';

class SlideIn extends Component {
  static propTypes = {
    childStyle: PropTypes.object,
    children: PropTypes.node,
    direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
    enterDelay: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    enterDelay: 0,
    direction: 'left',
  };
  
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };
/*
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };*/

  getLeaveDirection = () => {
    return this.props.direction;
  };

  render() {
    const {
      enterDelay,
      children,
      childStyle,
      direction,
      style,
      ...other
    } = this.props;
  
    const styleManager = this.context.styleManager;
    
    const mergedRootStyles = Object.assign({}, {
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
    }, style);
    const RootStyles = styleManager.prepareInline(mergedRootStyles);

    const newChildren = React.Children.map(children, (child) => {
      return (
        <SlideInChild
          key={child.key}
          direction={direction}
          enterDelay={enterDelay}
          getLeaveDirection={this.getLeaveDirection}
          style={childStyle}
        >
          {child}
        </SlideInChild>
      );
    }, this);

    return (
      <ReactTransitionGroup
        {...other}
        style={RootStyles}
        component="div"
      >
        {newChildren}
      </ReactTransitionGroup>
    );
  }
}

export default SlideIn;
