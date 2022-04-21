import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { ThemeProvider } from '@mui/joy/styles';
import CardOverflow, { cardOverflowClasses as classes } from '@mui/joy/CardOverflow';

describe('<CardOverflow />', () => {
  const { render } = createRenderer();

  describeConformance(<CardOverflow />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'MuiCardOverflow',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'contained' },
    skip: ['classesRoot', 'componentsProp'],
  }));

  describe('prop: variant', () => {
    it('text by default', () => {
      const { getByTestId } = render(<CardOverflow data-testid="root">Hello World</CardOverflow>);

      expect(getByTestId('root')).to.have.class(classes.variantText);
    });

    ['text', 'outlined', 'light', 'contained'].forEach((variant) => {
      it(`should render ${variant}`, () => {
        const { getByTestId } = render(
          <CardOverflow data-testid="root" variant={variant}>
            Hello World
          </CardOverflow>,
        );

        expect(getByTestId('root')).to.have.class(classes[`variant${capitalize(variant)}`]);
      });
    });
  });

  describe('prop: palette', () => {
    it('adds a neutral class by default', () => {
      const { getByTestId } = render(<CardOverflow data-testid="root">Hello World</CardOverflow>);

      expect(getByTestId('root')).to.have.class(classes.paletteNeutral);
    });

    ['primary', 'success', 'info', 'danger', 'neutral', 'warning'].forEach((palette) => {
      it(`should render ${palette}`, () => {
        const { getByTestId } = render(
          <CardOverflow data-testid="root" palette={palette}>
            Hello World
          </CardOverflow>,
        );

        expect(getByTestId('root')).to.have.class(classes[`palette${capitalize(palette)}`]);
      });
    });
  });
});
