/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {BottomSheetBody} from './BottomSheetBody';
import getMuiTheme from '../styles/getMuiTheme';
import {SMALL} from '../utils/withWidth';

describe('<BottomSheetBody />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('props: open', () => {
    it('should be hidden when open is false', () => {
      const wrapper = shallowWithContext(
        <BottomSheetBody open={false} action="done" width={SMALL} />
      );

      assert.strictEqual(
        wrapper.find('div').at(1).node.props.style.opacity,
        0,
        'The element should be hidden.'
      );
    });

    it('should be visible when open is true', () => {
      const wrapper = shallowWithContext(
        <BottomSheetBody open={true} action="done" width={SMALL} />
      );

      assert.strictEqual(
        wrapper.find('div').at(1).node.props.style.opacity,
        1,
        'The element should be visible.'
      );
    });
  });
});
