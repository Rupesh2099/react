import * as React from 'react';
import { pascal } from 'naming-style';
import { addPropertyControls, ControlType } from 'framer';
import * as Icons from '@material-ui/icons';

interface Props {
  color?: 'action' | 'disabled' | 'error' | 'inherit' | 'primary' | 'secondary';
  icon?: string;
  theme?: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  width?: number;
  height?: number;
}

const defaultProps: Props = {
  color: 'inherit',
  icon: 'add',
  theme: 'Filled',
  width: 24,
  height: 24,
};

export function Icon(props: Props): JSX.Element {
  const { height, icon: iconProp, theme, width, ...other } = props;
  const iconName = `${iconProp && pascal(iconProp)}${theme === 'Filled' ? '' : theme}`;
  const Icon = Object.keys(Icons).includes(iconName) ? Icons[iconName] : undefined;

  return Icon ? <Icon style={{ width, height }} {...other} /> : null;
}

Icon.defaultProps = defaultProps;

addPropertyControls(Icon, {
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['action', 'disabled', 'error', 'inherit', 'primary', 'secondary'],
  },
  icon: {
    type: ControlType.String,
    title: 'Icon',
  },
  theme: {
    type: ControlType.Enum,
    title: 'Theme',
    options: ['Filled', 'Outlined', 'Rounded', 'TwoTone', 'Sharp'],
  },
});
