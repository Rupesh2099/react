import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, createClientRender } from 'test/utils';
import HiddenCss from './HiddenCss';
import { createMuiTheme, MuiThemeProvider } from '../styles';

const TestChild = () => <div data-testid="test-child">bar</div>;

describe('<HiddenCss />', () => {
  /**
   * @type {ReturnType<typeof createMount>}
   */
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(
      <HiddenCss>
        <div />
      </HiddenCss>,
    );
  });

  describe('the generated class names', () => {
    it('should be ok with only', () => {
      const { container } = render(
        <HiddenCss only="sm">
          <div className="foo" />
        </HiddenCss>,
      );
      const root = container.firstElementChild;

      expect(root).to.have.tagName('div');
      expect(root).to.have.class(classes.onlySm);
      expect(root.firstElementChild).to.have.tagName('div');
      expect(root.firstElementChild).to.have.class('foo');
    });

    it('should be ok with only as an array', () => {
      const { container } = render(
        <HiddenCss only={['xs', 'sm']}>
          <div className="foo" />
        </HiddenCss>,
      );
      const root = container.firstElementChild;

      expect(root).to.have.tagName('div');
      expect(root).to.have.class(classes.onlyXs);
      expect(root).to.have.class(classes.onlySm);
    });

    it('should be ok with only as an empty array', () => {
      const { container } = render(
        <HiddenCss only={[]}>
          <div className="foo" />
        </HiddenCss>,
      );
      const root = container.firstElementChild;

      expect(root).to.have.tagName('div');
      Object.keys(classes).forEach((className) => expect(root).to.not.have.class(className));
    });

    it('should be ok with mdDown', () => {
      const { container } = render(
        <HiddenCss mdDown>
          <div className="foo" />
        </HiddenCss>,
      );
      const root = container.firstElementChild;

      expect(root).to.have.class(classes.mdDown);
    });

    it('should be ok with mdUp', () => {
      const { container } = render(
        <HiddenCss mdUp>
          <div className="foo" />
        </HiddenCss>,
      );
      const root = container.firstElementChild;

      expect(root).to.have.class(classes.mdUp);
    });
    it('should handle provided className prop', () => {
      const { container } = render(
        <HiddenCss mdUp className="custom">
          <div className="foo" />
        </HiddenCss>,
      );
      const root = container.firstElementChild;

      expect(root).to.have.class('custom');
    });

    it('allows custom breakpoints', () => {
      const theme = createMuiTheme({ breakpoints: { keys: ['xxl'] } });
      const { container } = render(
        <MuiThemeProvider theme={theme}>
          <HiddenCss xxlUp className="testid" classes={{ xxlUp: 'xxlUp' }}>
            <div />
          </HiddenCss>
        </MuiThemeProvider>,
      );
      const root = container.querySelector('.testid');

      expect(root).to.have.class('xxlUp');
    });
  });

  describe('prop: children', () => {
    it('should work when text Node', () => {
      const { container, getByText } = render(<HiddenCss mdUp>foo</HiddenCss>);
      const root = container.firstElementChild;

      expect(root).to.have.tagName('div');
      expect(root).to.have.class(classes.mdUp);
      expect(getByText('foo')).to.not.equal(null);
    });

    it('should work when Element', () => {
      const { container, getByTestId } = render(
        <HiddenCss mdUp>
          <TestChild />
        </HiddenCss>,
      );

      const root = container.firstElementChild;

      expect(root).to.have.tagName('div');
      expect(root).to.have.class(classes.mdUp);
      expect(getByTestId('test-child')).not.to.equal(null);
    });

    it('should work when mixed ChildrenArray', () => {
      const { container, getAllByTestId, getByText } = render(
        <HiddenCss mdUp>
          <TestChild />
          <TestChild />
          foo
        </HiddenCss>,
      );

      const root = container.firstElementChild;
      const children = getAllByTestId('test-child');

      expect(root).to.have.tagName('div');
      expect(root).to.have.class(classes.mdUp);
      expect(children.length).to.equal(2);
      expect(getByText('foo')).not.to.equal(null);
    });
  });

  it('warns about excess props (potentially undeclared breakpoints)', () => {
    expect(() => {
      mount(
        <HiddenCss xxlUp>
          <div />
        </HiddenCss>,
      );
    }).toErrorDev(
      'Material-UI: Unsupported props received by `<Hidden implementation="css" />`: xxlUp.',
    );
  });
});
