import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Card, { cardClasses as classes } from '@mui/joy/Card';
import { unstable_capitalize as capitalize } from '@mui/utils';

describe('<Card />', () => {
  const { render } = createRenderer();

  describeConformance(<Card />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'MuiCard',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'li',
    testVariantProps: { variant: 'contained' },
    skip: ['classesRoot', 'componentsProp'],
  }));

  describe('prop: variant', () => {
    it('text by default', () => {
      const { getByTestId } = render(<Card data-testid="root">Hello World</Card>);

      expect(getByTestId('root')).to.have.class(classes.variantText);
    });

    ['text', 'outlined', 'light', 'contained'].forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(
          <Card data-testid="root" variant={variant}>
            Hello World
          </Card>,
        );

        expect(getByTestId('root')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: color', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(<Card data-testid="root">Hello World</Card>);

      expect(getByTestId('root')).to.have.class(classes.colorNeutral);
    });

    ['primary', 'success', 'info', 'danger', 'neutral', 'warning'].forEach((color) => {
      it(`should render ${color}`, () => {
        const { getByTestId } = render(
          <Card data-testid="root" color={color}>
            Hello World
          </Card>,
        );

        expect(getByTestId('root')).to.have.class(classes[`color${capitalize(color)}`]);
      });
    });
  });

  it('can change size', () => {
    const { container, rerender } = render(<Card />);

    expect(container.firstChild).to.have.class(classes.sizeMd);

    rerender(<Card size="lg" />);

    expect(container.firstChild).to.have.class(classes.sizeLg);
  });
});
