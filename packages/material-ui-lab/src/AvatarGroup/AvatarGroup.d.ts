import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface AvatarGroupProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AvatarGroupClassKey> {
  /**
   * The avatars to stack.
   */
  children: React.ReactNode;
  /**
   * Max avatars to show before +x.
   */
  max?: number;
  /**
   * Spacing between avatars.
   */
  spacing?: 'small' | 'medium' | number;
}

export type AvatarGroupClassKey = 'root' | 'avatar';

/**
 * 
 *
 * Demos:
 * - {@link https://material-ui.com/components/avatars Avatars}
 *
 * API:
 * - {@link https://material-ui.com/api/AvatarGroup AvatarGroup API}
 * 
 */
export default function AvatarGroup(props: AvatarGroupProps): JSX.Element;
