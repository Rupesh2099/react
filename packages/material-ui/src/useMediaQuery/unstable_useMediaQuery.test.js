/* eslint-disable camelcase */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createMount } from '@material-ui/core/test-utils';
import mediaQuery from 'css-mediaquery';
import { assert } from 'chai';
import { spy } from 'sinon';
import unstable_useMediaQuery, { testReset } from './unstable_useMediaQuery';

describe('unstable_useMediaQuery', () => {
  let mount;
  let values;

  // Only run the test on node.
  // Waiting for https://github.com/facebook/react/issues/14050
  if (!/jsdom/.test(window.navigator.userAgent)) {
    return;
  }

  before(() => {
    mount = createMount();
    if (!window.matchMedia) {
      window.matchMedia = query => ({
        matches: mediaQuery.match(query, {
          width: 1200,
        }),
        addListener: () => {},
        removeListener: () => {},
      });
    }
  });

  beforeEach(() => {
    ReactDOM.unmountComponentAtNode(mount.attachTo);
    testReset();
    values = spy();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('option: defaultMatches', () => {
    it('should be false by default', done => {
      const Test = () => {
        const matches = unstable_useMediaQuery('(min-width:2000px)');
        values(matches);
        return <span>{`${matches}`}</span>;
      };

      const wrapper = mount(<Test />);
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 1);
      setTimeout(() => {
        assert.strictEqual(wrapper.text(), 'false');
        assert.strictEqual(values.callCount, 1);
        done();
      });
    });

    it('should take the option into account', done => {
      const Test = () => {
        const matches = unstable_useMediaQuery('(min-width:2000px)', {
          defaultMatches: true,
        });
        values(matches);
        return <span>{`${matches}`}</span>;
      };

      const wrapper = mount(<Test />);
      assert.strictEqual(wrapper.text(), 'true');
      assert.strictEqual(values.callCount, 1);
      setTimeout(() => {
        assert.strictEqual(wrapper.text(), 'false');
        assert.strictEqual(values.callCount, 2);
        done();
      });
    });
  });

  describe('option: noSsr', () => {
    it('should render once if the defaut value match the expectation', done => {
      const Test = () => {
        const matches = unstable_useMediaQuery('(min-width:2000px)', {
          defaultMatches: false,
        });
        values(matches);
        return <span>{`${matches}`}</span>;
      };

      const wrapper = mount(<Test />);
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 1);
      setTimeout(() => {
        assert.strictEqual(wrapper.text(), 'false');
        assert.strictEqual(values.callCount, 1);
        done();
      });
    });

    it('should render twice if the defaut value does not match the expectation', done => {
      const Test = () => {
        const matches = unstable_useMediaQuery('(min-width:2000px)', {
          defaultMatches: true,
        });
        values(matches);
        return <span>{`${matches}`}</span>;
      };

      const wrapper = mount(<Test />);
      assert.strictEqual(wrapper.text(), 'true');
      assert.strictEqual(values.callCount, 1);
      setTimeout(() => {
        assert.strictEqual(wrapper.text(), 'false');
        assert.strictEqual(values.callCount, 2);
        done();
      });
    });

    it('should render once if the defaut value does not match the expectation with noSsr', done => {
      const Test = () => {
        const matches = unstable_useMediaQuery('(min-width:2000px)', {
          defaultMatches: true,
          noSsr: true,
        });
        values(matches);
        return <span>{`${matches}`}</span>;
      };

      const wrapper = mount(<Test />);
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 1);
      setTimeout(() => {
        assert.strictEqual(wrapper.text(), 'false');
        assert.strictEqual(values.callCount, 1);
        done();
      });
    });
  });

  it('should try to reconciliate only the first time', done => {
    const Test = () => {
      const matches = unstable_useMediaQuery('(min-width:2000px)', {
        defaultMatches: true,
      });
      values(matches);
      return <span>{`${matches}`}</span>;
    };

    let wrapper = mount(<Test />);
    assert.strictEqual(wrapper.text(), 'true');
    assert.strictEqual(values.callCount, 1);
    setTimeout(() => {
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 2);

      ReactDOM.unmountComponentAtNode(mount.attachTo);
      wrapper = mount(<Test />);
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 3);

      setTimeout(() => {
        assert.strictEqual(wrapper.text(), 'false');
        assert.strictEqual(values.callCount, 3);
        done();
      });
    });
  });

  it('should be able to change the query dynamically', done => {
    const Test = props => {
      const matches = unstable_useMediaQuery(props.query, {
        defaultMatches: true,
      });
      values(matches);
      return <span>{`${matches}`}</span>;
    };
    Test.propTypes = {
      query: PropTypes.string.isRequired,
    };

    const wrapper = mount(<Test query="(min-width:2000px)" />);
    assert.strictEqual(wrapper.text(), 'true');
    assert.strictEqual(values.callCount, 1);

    setTimeout(() => {
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 2);

      wrapper.setProps({ query: '(min-width:100px)' });
      assert.strictEqual(values.callCount, 3);
      setTimeout(() => {
        assert.strictEqual(wrapper.text(), 'true');
        assert.strictEqual(values.callCount, 4);
        done();
      });
    });
  });
});
