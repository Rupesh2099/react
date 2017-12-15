// @flow

import { assert } from 'chai';
import getStylesCreator from './getStylesCreator';
import consoleErrorMock from '../../test/utils/consoleErrorMock';
import withStyles from './withStyles';

describe('getStylesCreator', () => {
  const name = 'name';
  const stylesCreator = getStylesCreator({
    root: {
      color: 'black',
      '&:hover': {
        color: 'red',
        borderRadius: 0,
      },
    },
  });

  it('should be able to get the styles', () => {
    const styles = stylesCreator.create({});
    assert.deepEqual(styles, {
      root: {
        color: 'black',
        '&:hover': {
          color: 'red',
          borderRadius: 0,
        },
      },
    });
  });

  describe('equality', () => {
    it('result from object input should be equal', () => {
      const styles = {};
      assert.strictEqual(getStylesCreator(styles), getStylesCreator(styles));
    });

    it('result from function input should be equal', () => {
      // real sample from Paper.js
      const styles = theme => {
        const shadows = {};
        theme.shadows.forEach((shadow, index) => {
          shadows[`shadow${index}`] = {
            boxShadow: shadow,
          };
        });

        return {
          root: {
            backgroundColor: theme.palette.background.paper,
          },
          rounded: {
            borderRadius: 2,
          },
          ...shadows,
        };
      };
      assert.strictEqual(getStylesCreator(styles), getStylesCreator(styles));
    });

    it('result from different objects should not be equal', () => {
      const styles1 = { root: { padding: 1 } };
      const styles2 = { root: { padding: 2 } };
      assert.notStrictEqual(getStylesCreator(styles1), getStylesCreator(styles2));
    });
  });

  describe('overrides', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should be able to overrides some rules, deep', () => {
      const theme = {
        overrides: {
          [name]: { root: { color: 'white', '&:hover': { borderRadius: 2, background: 'black' } } },
        },
      };
      const styles = stylesCreator.create(theme, name);
      assert.deepEqual(styles, {
        root: {
          color: 'white',
          '&:hover': {
            color: 'red',
            borderRadius: 2,
            background: 'black',
          },
        },
      });
    });

    it('should warn on wrong usage', () => {
      const theme = {
        overrides: {
          [name]: {
            bubu: {
              color: 'white',
            },
          },
        },
      };
      stylesCreator.create(theme, name);
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.match(consoleErrorMock.args()[0][0], /Fix the `bubu` key of `theme\.overrides\.name`/);
    });
  });
});
