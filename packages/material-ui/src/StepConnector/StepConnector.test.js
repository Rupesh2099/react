import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import StepConnector from './StepConnector';

describe('<StepConnector />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('rendering', () => {
    it('renders a div containing a span', () => {
      const wrapper = shallow(<StepConnector orientation="horizontal" />);
      assert.strictEqual(wrapper.type(), 'div');
      const line = wrapper.find('span');
      assert.strictEqual(line.length, 1);
    });

    it('has the class lineHorizontal when horizontal', () => {
      const wrapper = shallow(<StepConnector orientation="horizontal" />);
      const line = wrapper.find('span');
      assert.include(line.props().className, 'StepConnector-lineHorizontal');
    });

    it('has the class lineVertical when vertical', () => {
      const wrapper = shallow(<StepConnector orientation="vertical" />);
      const line = wrapper.find('span');
      assert.include(line.props().className, 'StepConnector-lineVertical');
    });

    it('has the class active when active', () => {
      const wrapper = shallow(<StepConnector active />);
      assert.include(wrapper.props().className, 'StepConnector-active');
    });

    it('has the class completed when completed', () => {
      const wrapper = shallow(<StepConnector completed />);
      assert.include(wrapper.props().className, 'StepConnector-completed');
    });

    it('has the class disabled when disabled', () => {
      const wrapper = shallow(<StepConnector disabled />);
      assert.include(wrapper.props().className, 'StepConnector-disabled');
    });
  });
});
