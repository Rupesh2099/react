import React from 'react';
import {
  LeftNav,
  Mixins,
  Styles,
} from 'material-ui';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import SelectableContainerEnhance from 'material-ui/hoc/selectable-enhance';
import muiThemeable from 'material-ui/lib/muiThemeable';

const {Colors, Spacing, Typography} = Styles;
const {StylePropable} = Mixins;
const SelectableList = SelectableContainerEnhance(List);

let AppLeftNav = React.createClass({
  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    history: React.PropTypes.object,
    location: React.PropTypes.object,
  },

  contextTypes: {
    router: React.PropTypes.func,
  },

  getInitialState() {
    return {
      leftNavOpen: false,
    };
  },

  getStyles() {
    return {
      cursor: 'pointer',
      fontSize: 24,
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      marginBottom: 8,
    };
  },

  render() {
    return (
      <LeftNav
        docked={false}
        open={this.state.leftNavOpen}
        onRequestChange={this.handleChangeRequestLeftNav}
      >
        <div
          style={this.prepareStyles(this.getStyles())}
          onTouchTap={this.handleTouchTapHeader}
        >
          material ui
        </div>
        <SelectableList
          valueLink={{
            value: this._getSelectedIndex(),
            requestChange: this.handleRequestChangeList,
          }}
        >
          <ListItem
            value="get-started"
            primaryText="Get Started"
          />
          <ListItem
            value="customization"
            primaryText="Customization"
          />
          <ListItem
            value="components"
            primaryText="Components"
          />
        </SelectableList>
        <Divider />
        <SelectableList
          subheader="Resources"
          valueLink={{
            value: '',
            requestChange: this.handleRequestChangeLink,
          }}
        >
          <ListItem
            value="https://github.com/callemall/material-ui"
            primaryText="GitHub"
          />
          <ListItem
            value="http://facebook.github.io/react"
            primaryText="React"
          />
          <ListItem
            value="https://www.google.com/design/spec/material-design/introduction.html"
            primaryText="Material Design"
          />
        </SelectableList>
      </LeftNav>
    );
  },

  toggle() {
    this.setState({leftNavOpen: !this.state.leftNavOpen});
  },

  _getSelectedIndex() {
    return this.props.location.pathname.split('/')[1];
  },

  handleChangeRequestLeftNav(open) {
    this.setState({
      leftNavOpen: open,
    });
  },

  handleRequestChangeList(event, value) {
    this.props.history.push(value);
    this.setState({
      leftNavOpen: false,
    });
  },

  handleRequestChangeLink(event, value) {
    window.location = value;
    this.setState({
      leftNavOpen: false,
    });
  },

  handleTouchTapHeader() {
    this.props.history.push('/');
    this.setState({
      leftNavOpen: false,
    });
  },

});

AppLeftNav = muiThemeable(AppLeftNav);

export default AppLeftNav;
