import * as React from 'react';
import { StandardProps } from '..';
import { SwitchBaseProps, SwitchBaseClassKey } from '../internal/SwitchBase';

export interface SwitchProps
  extends StandardProps<SwitchBaseProps, SwitchClassKey, 'checkedIcon' | 'color' | 'icon'> {
  checkedIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  icon?: React.ReactNode;
  size?: 'small' | 'medium';
}

export type SwitchClassKey =
  | SwitchBaseClassKey
  | 'switchBase'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'sizeSmall'
  | 'thumb'
  | 'track';

/**
 *
 *
 * Demos:
 * - [Switches](https://material-ui.com/components/switches/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 * - [Switch API](https://material-ui.com/api/switch/)
 * - inherits [IconButton API](https://material-ui.com/api/icon-button/)
 */
declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
