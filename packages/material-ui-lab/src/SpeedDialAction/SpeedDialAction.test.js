import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import SpeedDialAction from './SpeedDialAction';

describe('<SpeedDialAction />', () => {
  let mount;
  let shallow;
  let classes;
  const icon = <Icon>add</Icon>;
  const defaultProps = {
    icon,
    tooltipTitle: 'placeholder',
  };

  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
    classes = getClasses(<SpeedDialAction {...defaultProps} />);
  });

  it('should render its component tree without warnings', () => {
    const wrapper = mount(<SpeedDialAction {...defaultProps} />);

    wrapper.unmount();
  });

  it('should render a Tooltip', () => {
    const wrapper = shallow(<SpeedDialAction {...defaultProps} />);
    assert.strictEqual(wrapper.type(), Tooltip);
  });

  it('should render a Button', () => {
    const wrapper = shallow(<SpeedDialAction {...defaultProps} />);
    const buttonWrapper = wrapper.childAt(0);
    assert.strictEqual(buttonWrapper.type(), Button);
  });

  it('should render the Button with the button class', () => {
    const wrapper = shallow(<SpeedDialAction {...defaultProps} open />);
    const buttonWrapper = wrapper.childAt(0);
    assert.strictEqual(
      buttonWrapper.hasClass(classes.button),
      true,
      'should have the actionButton class',
    );
  });

  it('should render the Button with the button and buttonClosed classes', () => {
    const wrapper = shallow(<SpeedDialAction {...defaultProps} />);
    const buttonWrapper = wrapper.childAt(0);
    assert.strictEqual(
      buttonWrapper.hasClass(classes.button),
      true,
      'should have the button class',
    );
    assert.strictEqual(
      buttonWrapper.hasClass(classes.buttonClosed),
      true,
      'should have the buttonClosed class',
    );
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const wrapper = shallow(<SpeedDialAction {...defaultProps} open onClick={handleClick} />);
      const buttonWrapper = wrapper.childAt(0);
      buttonWrapper.simulate('click');
      assert.strictEqual(handleClick.callCount, 1, 'it should forward the click event');
    });
  });

  // it('should call handleTooltipOpen & handleTooltipClose on mouseOver & blur', () => {
  //   const wrapper = shallow(<SpeedDialAction icon={icon} open />);
  //   const buttonWrapper = wrapper.childAt(0);
  //   assert.strictEqual(wrapper.state().tooltipOpen, false);
  //   buttonWrapper.simulate('mouseOver', {});
  //   assert.strictEqual(wrapper.state().tooltipOpen, true);
  //   buttonWrapper.simulate('blur', {});
  //   assert.strictEqual(wrapper.state().tooltipOpen, false);
  // });
});
