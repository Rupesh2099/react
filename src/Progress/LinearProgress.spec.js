// @flow

import React from 'react';
import { assert } from 'chai';
import { createShallow } from '../test-utils';
import LinearProgress, { styleSheet } from './LinearProgress';

describe('<LinearProgress />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = shallow.context.styleManager.render(styleSheet);
  });

  it('should render a div with the root class', () => {
    const wrapper = shallow(<LinearProgress />);
    assert.strictEqual(wrapper.name(), 'div');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render with the user and root classes', () => {
    const wrapper = shallow(<LinearProgress className="woof" />);
    assert.strictEqual(wrapper.hasClass('woof'), true, 'should have the "woof" class');
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
  });

  it('should render intermediate mode by default', () => {
    const wrapper = shallow(<LinearProgress />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryBar),
      true,
      'should have the primaryBar class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.indeterminateBar1),
      true,
      'should have the indeterminateBar1 class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.primaryBar),
      true,
      'should have the primaryBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.indeterminateBar2),
      true,
      'should have the indeterminateBar2 class',
    );
  });

  it('should render for the primary color', () => {
    const wrapper = shallow(<LinearProgress color="primary" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryBar),
      true,
      'should have the primaryBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.primaryBar),
      true,
      'should have the primaryBar class',
    );
  });

  it('should render for the accent color', () => {
    const wrapper = shallow(<LinearProgress color="accent" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.accentBar),
      true,
      'should have the accentBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.accentBar),
      true,
      'should have the accentBar class',
    );
  });

  it('should render with determinate classes for the primary color by default', () => {
    const wrapper = shallow(<LinearProgress mode="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryBar),
      true,
      'should have the primaryBar class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.determinateBar1),
      true,
      'should have the determinateBar1 class',
    );
  });

  it('should render with determinate classes for the primary color', () => {
    const wrapper = shallow(<LinearProgress color="primary" mode="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryBar),
      true,
      'should have the primaryBar class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.determinateBar1),
      true,
      'should have the determinateBar1 class',
    );
  });

  it('should render with determinate classes for the accent color', () => {
    const wrapper = shallow(<LinearProgress color="accent" mode="determinate" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.accentBar),
      true,
      'should have the accentBar class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.determinateBar1),
      true,
      'should have the determinateBar1 class',
    );
  });

  it('should set width of bar1 on determinate mode', () => {
    const wrapper = shallow(<LinearProgress mode="determinate" value={77} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(0).props().style.width, '77%', 'should have width set');
    assert.strictEqual(wrapper.props()['aria-valuenow'], 77);
  });

  it('should render with buffer classes for the primary color by default', () => {
    const wrapper = shallow(<LinearProgress mode="buffer" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryDashed),
      true,
      'should have the primaryDashed class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.primaryBar),
      true,
      'should have the primaryBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.bufferBar1),
      true,
      'should have the bufferBar1 class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.primaryBar),
      true,
      'should have the primaryBar class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.primaryBufferBar2),
      true,
      'should have the primaryBufferBar2 class',
    );
  });

  it('should render with buffer classes for the primary color', () => {
    const wrapper = shallow(<LinearProgress color="primary" mode="buffer" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryDashed),
      true,
      'should have the primaryDashed class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.primaryBar),
      true,
      'should have the primaryBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.bufferBar1),
      true,
      'should have the bufferBar1 class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.primaryBar),
      true,
      'should have the primaryBar class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.primaryBufferBar2),
      true,
      'should have the primaryBufferBar2 class',
    );
  });

  it('should render with buffer classes for the accent color', () => {
    const wrapper = shallow(<LinearProgress color="accent" mode="buffer" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.accentDashed),
      true,
      'should have the accentDashed class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.accentBar),
      true,
      'should have the accentBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.bufferBar1),
      true,
      'should have the bufferBar1 class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.accentBar),
      true,
      'should have the accentBar class',
    );
    assert.strictEqual(
      wrapper.childAt(2).hasClass(classes.accentBufferBar2),
      true,
      'should have the accentBufferBar2 class',
    );
  });

  it('should set width of bar1 and bar2 on buffer mode', () => {
    const wrapper = shallow(<LinearProgress mode="buffer" value={77} valueBuffer={85} />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(wrapper.childAt(1).props().style.width, '77%', 'should have width set');
    assert.strictEqual(wrapper.childAt(2).props().style.width, '85%', 'should have width set');
  });

  it('should render with query classes', () => {
    const wrapper = shallow(<LinearProgress mode="query" />);
    assert.strictEqual(wrapper.hasClass(classes.root), true, 'should have the root class');
    assert.strictEqual(
      wrapper.hasClass(classes.rootQuery),
      true,
      'should have the rootQuery class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.primaryBar),
      true,
      'should have the primaryBar class',
    );
    assert.strictEqual(
      wrapper.childAt(0).hasClass(classes.indeterminateBar1),
      true,
      'should have the indeterminateBar1 class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.primaryBar),
      true,
      'should have the primaryBar class',
    );
    assert.strictEqual(
      wrapper.childAt(1).hasClass(classes.indeterminateBar2),
      true,
      'should have the indeterminateBar2 class',
    );
  });
});
