import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useSwitch } from '@mui/base/useSwitch';

export default function UseSwitchesBasic() {
  return (
    <div>
      <BasicSwitch defaultChecked />
      <BasicSwitch />
      <BasicSwitch defaultChecked disabled />
      <BasicSwitch disabled />
    </div>
  );
}

function BasicSwitch(props) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    'Switch-checked': checked,
    'Switch-disabled': disabled,
    'Switch-focusVisible': focusVisible,
  };

  return (
    <BasicSwitchRoot className={clsx(stateClasses)}>
      <BasicSwitchThumb className={clsx(stateClasses)} />
      <BasicSwitchInput {...getInputProps()} aria-label="Demo switch" />
    </BasicSwitchRoot>
  );
}

const blue = {
  500: '#007FFF',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const BasicSwitchRoot = styled('span')(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  margin: 10px;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[300]};
  border-radius: 24px;
  box-shadow: inset 0px 1px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.1)'
  };

  &.Switch-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Switch-checked {
    background: ${blue[500]};
  }
  `,
);

const BasicSwitchInput = styled('input')`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;

const BasicSwitchThumb = styled('span')(
  ({ theme }) => `
  display: block;
  width: 16px;
  height: 16px;
  top: 3px;
  left: 4px;
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[300]};
  position: relative;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  box-shadow: 0px 1px 2px
    ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.1)'};

  &.Switch-focusVisible {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgb(0 0 0 / 0.25);
  }

  &.Switch-checked {
    left: 28px;
    top: 3px;
    background-color: #fff;
  }
`,
);
