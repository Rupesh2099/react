/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useFakeTimers } from 'sinon';
import { cleanup, createClientRender, fireEvent } from 'test/utils/createClientRender';

const options = [
  'Show some love to Material-UI',
  'Show all notification content',
  'Hide sensitive notification content',
];

function SimpleMenu({ selectedIndex: selectedIndexProp, ...props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(selectedIndexProp || null);

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setAnchorEl(null);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button
        aria-haspopup="true"
        aria-controls="lock-menu"
        aria-label="Open menu"
        onClick={handleClickListItem}
      >
        {`selectedIndex: ${selectedIndex}, open: ${open}`}
      </Button>
      <Menu id="lock-menu" anchorEl={anchorEl} open={open} onClose={handleClose} {...props}>
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

SimpleMenu.propTypes = { selectedIndex: PropTypes.number };

describe('<Menu /> integration', () => {
  let clock;
  const render = createClientRender({ strict: false });

  function waitForExited(transitionDuration) {
    // transitions can't disappear instantly because of react-transition-group
    // exited is only reached on the next commit
    clock.tick(transitionDuration);
  }

  beforeEach(() => {
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
    cleanup();
  });

  it('is not part of the DOM by default', () => {
    const { queryByRole } = render(<SimpleMenu transitionDuration={0} />);

    expect(queryByRole('menu')).to.be.null;
  });

  it('is not part of the DOM by default even with a selectedIndex', () => {
    const { queryByRole } = render(<SimpleMenu transitionDuration={0} selectedIndex={2} />);

    expect(queryByRole('menu')).to.be.null;
  });

  it('should focus the list on open', () => {
    const { getByLabelText, getByRole } = render(<SimpleMenu transitionDuration={0} keepMounted />);
    const button = getByLabelText('Open menu');
    const menu = getByRole('menu');

    expect(menu).to.not.be.focused;

    button.focus();
    fireEvent.click(button);
    expect(menu).to.be.focused;
  });

  it('should focus the list as nothing has been selected and changes focus according to keyboard navigation', () => {
    const { getAllByRole, queryByRole, getByLabelText } = render(
      <SimpleMenu transitionDuration={0} />,
    );
    const button = getByLabelText('Open menu');

    expect(queryByRole('menu')).to.be.null;

    button.focus();
    fireEvent.click(button);
    expect(queryByRole('menu')).to.be.focused;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
    expect(getAllByRole('menuitem')[0]).to.be.focused;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
    expect(getAllByRole('menuitem')[2]).to.be.focused;

    fireEvent.keyDown(document.activeElement, { key: 'Home' });
    expect(getAllByRole('menuitem')[0]).to.be.focused;

    fireEvent.keyDown(document.activeElement, { key: 'End' });
    expect(getAllByRole('menuitem')[2]).to.be.focused;

    fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
    expect(getAllByRole('menuitem')[2], 'no change on unassociated keys').to.be.focused;
  });

  it('focuses the selected item when opening', () => {
    const { getAllByRole, getByLabelText } = render(
      <SimpleMenu transitionDuration={0} selectedIndex={2} />,
    );
    const button = getByLabelText('Open menu');

    expect(document.body).to.be.focused;

    button.focus();
    fireEvent.click(button);
    expect(getAllByRole('menuitem')[2]).to.be.focused;
  });

  describe('Menu variant differences', () => {
    function OpenMenu(props) {
      return <Menu anchorEl={document.body} open {...props} />;
    }

    it('[variant=menu] nothing selected', () => {
      const { getAllByRole, getByRole } = render(
        <OpenMenu variant="menu">
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getByRole('menu')).to.be.focused;
      getAllByRole('menuitem').forEach(item => expect(item).to.have.property('tabIndex', -1));
    });

    it('[variant=selectedMenu] nothing selected', () => {
      const { getAllByRole, getByRole } = render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getByRole('menu')).to.be.focused;
      getAllByRole('menuitem').forEach(item => expect(item).to.have.property('tabIndex', -1));
    });

    // no case for variant=selectedMenu
    it('[variant=menu] nothing selected, autoFocus on third', () => {
      const { getAllByRole, getByRole } = render(
        <OpenMenu variant="menu">
          <MenuItem />
          <MenuItem />
          <MenuItem autoFocus />
        </OpenMenu>,
      );

      expect(getByRole('menu')).to.be.focused;
      getAllByRole('menuitem').forEach(item => expect(item).to.have.property('tabIndex', -1));
    });

    // no case for variant=menu
    it('[variant=selectedMenu] nothing selected, first index invalid', () => {
      const { getAllByRole, getByRole } = render(
        <OpenMenu variant="selectedMenu">
          {null}
          <MenuItem />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getByRole('menu')).to.be.focused;
      getAllByRole('menuitem').forEach(item => expect(item).to.have.property('tabIndex', -1));
    });

    it('[variant=menu] second item selected', () => {
      const { getAllByRole, getByRole } = render(
        <OpenMenu variant="menu">
          <MenuItem />
          <MenuItem selected />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getByRole('menu')).to.be.focused;
      getAllByRole('menuitem').forEach(item => expect(item).to.have.property('tabIndex', -1));
    });

    it('[variant=selectedMenu] second item selected', () => {
      const { getAllByRole } = render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem selected />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getAllByRole('menuitem')[1]).to.be.focused;
      expect(getAllByRole('menuitem')[0]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[1]).to.have.property('tabIndex', 0);
      expect(getAllByRole('menuitem')[2]).to.have.property('tabIndex', -1);
    });

    // no case for menu
    it('[variant=selectedMenu] second item selected, explicit tabIndex', () => {
      const { getAllByRole } = render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem selected tabIndex={2} />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getAllByRole('menuitem')[1]).to.be.focused;
      expect(getAllByRole('menuitem')[0]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[1]).to.have.property('tabIndex', 2);
      expect(getAllByRole('menuitem')[2]).to.have.property('tabIndex', -1);
    });

    // no case for menu
    it('[variant=selectedMenu] second item selected and disabled', () => {
      const { getAllByRole, getByRole } = render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem disabled selected />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getByRole('menu')).to.be.focused;
      expect(getAllByRole('menuitem')[0]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[1]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[2]).to.have.property('tabIndex', -1);
    });

    // no case for menu
    it('[variant=selectedMenu] second item selected, no autoFocus', () => {
      const { getAllByRole, getByTestId } = render(
        <OpenMenu autoFocus={false} variant="selectedMenu" PaperProps={{ 'data-testid': 'Paper' }}>
          <MenuItem />
          <MenuItem selected />
          <MenuItem />
        </OpenMenu>,
      );

      expect(getByTestId('Paper')).to.be.focused;
      expect(getAllByRole('menuitem')[0]).to.have.property('tabIndex', -1);
      expect(getAllByRole('menuitem')[1]).to.have.property('tabIndex', 0);
      expect(getAllByRole('menuitem')[2]).to.have.property('tabIndex', -1);
    });
  });

  it('closes the menu when Tabbing while the list is active', () => {
    const { queryByRole, getByLabelText } = render(<SimpleMenu transitionDuration={0} />);
    const button = getByLabelText('Open menu');

    expect(document.body).to.be.focused;

    button.focus();
    fireEvent.click(button);
    expect(queryByRole('menu')).to.be.focused;

    fireEvent.keyDown(document.activeElement, { key: 'Tab' });
    waitForExited(0);
    expect(queryByRole('menu')).to.be.null;
  });

  it('closes the menu when the backdrop is clicked', () => {
    const { queryByRole, getByLabelText } = render(<SimpleMenu transitionDuration={0} />);
    const button = getByLabelText('Open menu');

    expect(queryByRole('menu')).to.be.null;

    button.focus();
    fireEvent.click(button);
    expect(queryByRole('menu')).to.be.focused;

    fireEvent.click(document.querySelector('[data-mui-test="Backdrop"]'));
    waitForExited(0);

    expect(queryByRole('menu')).to.be.null;
  });
});
