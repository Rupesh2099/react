import * as React from 'react';
import { expect } from 'chai';
import { createMount, describeConformanceV5, act, createClientRender, fireEvent } from 'test/utils';
import { useFakeTimers } from 'sinon';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { fabClasses } from '@material-ui/core/Fab';
import SpeedDialAction, {
  speedDialActionClasses as classes,
} from '@material-ui/core/SpeedDialAction';

describe('<SpeedDialAction />', () => {
  let clock;
  beforeEach(() => {
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(
    <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    () => ({
      classes,
      inheritComponent: Tooltip,
      mount,
      render,
      refInstanceof: window.HTMLButtonElement,
      muiName: 'MuiSpeedDialAction',
      testRootOverrides: { slotName: 'fab' },
      testVariantProps: { tooltipPlacement: 'right' },
      skip: ['componentProp', 'reactTestRenderer', 'componentsProp'],
    }),
  );

  it('should be able to change the Tooltip classes', () => {
    const { getByText, container } = render(
      <SpeedDialAction
        icon={<Icon>add</Icon>}
        open
        tooltipTitle="placeholder"
        TooltipClasses={{ tooltip: 'bar' }}
      />,
    );

    fireEvent.mouseOver(container.querySelector('button'));
    act(() => {
      clock.tick(100);
    });

    expect(getByText('placeholder')).to.have.class('bar');
  });

  it('should render a Fab', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    );
    expect(container.querySelector('button')).to.have.class(fabClasses.root);
  });

  it('should have aria-labelledby if tooltipOpen prop is passed', () => {
    const { getByRole } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" tooltipOpen />,
    );
    const target = getByRole('menuitem')
    expect(target).to.have.attribute('aria-labelledby');
  });

  it('should not have aria-labelledby if tooltipOpen prop is not passed', () => {
    const { getByRole } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    );
    const target = getByRole('menuitem')
    expect(target).to.not.have.attribute('aria-labelledby');
  });

  it('should render the button with the fab class', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" open />,
    );
    expect(container.querySelector('button')).to.have.class(classes.fab);
  });

  it('should render the button with the fab and fabClosed classes', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    );
    expect(container.querySelector('button')).to.have.class(classes.fab);
    expect(container.querySelector('button')).to.have.class(classes.fabClosed);
  });
});
