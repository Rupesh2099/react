// @flow weak

import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import { createShallow } from 'test/utils';
import Chip, { styleSheet } from './Chip.js';
import Avatar from '../Avatar/Avatar.js';

describe('<Chip />', () => {
  let shallow;
  let classes;

  before(() => {
    shallow = createShallow();
    classes = shallow.context.styleManager.render(styleSheet);
  });

  describe('text only', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Chip
          className="my-Chip"
          data-my-prop="woof"
        >
          Text Chip
        </Chip>,
      );
    });

    it('should render a button containing a span', () => {
      assert.strictEqual(wrapper.is('button'), true, 'should be a button');
      assert.strictEqual(wrapper.childAt(0).is('span'), true, 'should be a span');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-Chip'), true);
      assert.strictEqual(wrapper.prop('data-my-prop'), 'woof');
    });

    it('should have a tabIndex prop with value -1', () => {
      assert.strictEqual(wrapper.prop('tabIndex'), -1);
    });
  });

  describe('clickable text chip', () => {
    let wrapper;
    let handleClick;

    before(() => {
      handleClick = () => {};
      wrapper = shallow(
        <Chip
          className="my-Chip"
          data-my-prop="woof"
          onClick={handleClick}
        >
          Text Chip
        </Chip>,
      );
    });

    it('should render a button containing a span', () => {
      assert.strictEqual(wrapper.is('button'), true, 'should be a button');
      assert.strictEqual(wrapper.childAt(0).is('span'), true, 'should be a span');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-Chip'), true);
      assert.strictEqual(wrapper.prop('data-my-prop'), 'woof');
      assert.strictEqual(wrapper.prop('onClick'), handleClick);
    });

    it('should not have a tabIndex prop', () => {
      assert.strictEqual(wrapper.prop('tabIndex'), undefined);
    });

    it('should apply user value of tabIndex', () => {
      wrapper = shallow(
        <Chip
          onClick={() => {}}
          tabIndex={5} // eslint-disable-line jsx-a11y/tabindex-no-positive
        >
          Text Chip
        </Chip>,
      );
      assert.strictEqual(wrapper.prop('tabIndex'), 5);
    });
  });

  describe('deletable Avatar chip', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(
        <Chip
          avatar={
            <Avatar className="my-Avatar" data-my-prop="woof">
              MB
            </Avatar>
          }
          label="Text Avatar Chip"
          onRequestDelete={() => {}}
          className="my-Chip"
          data-my-prop="woof"
        />,
      );
    });

    it('should render a button containing an Avatar, span and svg', () => {
      assert.strictEqual(wrapper.is('button'), true, 'should be a button');
      assert.strictEqual(wrapper.childAt(0).is('Avatar'), true, 'should have an Avatar');
      assert.strictEqual(wrapper.childAt(1).is('span'), true, 'should have a span');
      assert.strictEqual(wrapper.childAt(2).is('pure(Cancel)'), true,
        'should be an svg icon');
    });

    it('should merge user classes & spread custom props to the root node', () => {
      assert.strictEqual(wrapper.hasClass(classes.root), true);
      assert.strictEqual(wrapper.hasClass('my-Chip'), true);
      assert.strictEqual(wrapper.prop('data-my-prop'), 'woof');
    });

    it('should merge user classes & spread custom props to the Avatar node', () => {
      assert.strictEqual(wrapper.childAt(0).hasClass(classes.avatar), true);
      assert.strictEqual(wrapper.childAt(0).hasClass('my-Avatar'), true);
      assert.strictEqual(wrapper.childAt(0).prop('data-my-prop'), 'woof');
    });

    it('should not have a tabIndex prop', () => {
      assert.strictEqual(wrapper.prop('tabIndex'), undefined);
    });
  });

  describe('reacts to keyboard chip', () => {
    let wrapper;
    let onKeyDownSpy;

    before(() => {
      wrapper = shallow(
        <Chip
          className="my-Chip"
          data-my-prop="woof"
        >
          Text Chip
        </Chip>,
      );

      onKeyDownSpy = spy();
      wrapper.setProps({ onKeyDown: onKeyDownSpy });
    });

    it('should call onKeyDown when a key is pressed', () => {
      let anyKeydownEvent = {
        preventDefault: () => {},
        keyCode: 80 // keycode for `p`, which is not `space`, `enter` or `esc`
      };
      wrapper.find('button').simulate('keydown', anyKeydownEvent);
      assert.strictEqual(onKeyDownSpy.callCount, 1, 'should have called onKeyDown');
      assert(onKeyDownSpy.calledWith(anyKeydownEvent));
    });

    describe('onClick is defined', () => {
      let onClickSpy;
      before(() => {
        onClickSpy = spy();
        wrapper.setProps({ onClick: onClickSpy });
      });

      afterEach(() => {
        onClickSpy.reset();
      });

      it('should call onClick when `space` is pressed ', () => {
        let preventDefaultSpy = spy();
        let spaceKeydownEvent = {
          preventDefault: preventDefaultSpy,
          keyCode: 32 // keycode `space`
        };
        wrapper.find('button').simulate('keydown', spaceKeydownEvent);
        assert.strictEqual(preventDefaultSpy.callCount, 1, 'should have stopped event propagation');
        assert.strictEqual(onClickSpy.callCount, 1, 'should have called onClick');
        assert(onClickSpy.calledWith(spaceKeydownEvent));
      });

      it('should call onClick when `enter` is pressed ', () => {
        let preventDefaultSpy = spy();
        let enterKeydownEvent = {
          preventDefault: preventDefaultSpy,
          keyCode: 13 // keycode `enter`
        };
        wrapper.find('button').simulate('keydown', enterKeydownEvent);
        assert.strictEqual(preventDefaultSpy.callCount, 1, 'should have stopped event propagation');
        assert.strictEqual(onClickSpy.callCount, 1, 'should have called onClick');
        assert(onClickSpy.calledWith(enterKeydownEvent));
      });
    });

    describe('onRequestDelete is defined  and `backspace is pressed', () => {
      it('should call onRequestDelete', () => {
        let onRequestDeleteSpy = spy();
        wrapper.setProps({ onRequestDelete: onRequestDeleteSpy });

        let preventDefaultSpy = spy();
        let backspaceKeydownEvent = {
          preventDefault: preventDefaultSpy,
          keyCode: 8 // keycode `backspace`
        };
        wrapper.find('button').simulate('keydown', backspaceKeydownEvent);

        assert.strictEqual(preventDefaultSpy.callCount, 1, 'should have stopped event propagation');
        assert.strictEqual(onRequestDeleteSpy.callCount, 1, 'should have called onClick');
        assert(onRequestDeleteSpy.calledWith(backspaceKeydownEvent));
      })
    })
  });
});
