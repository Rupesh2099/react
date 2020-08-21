import * as React from 'react';
import { InternalStandardProps as StandardProps } from '@material-ui/core';

export interface AvatarGroupProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The avatars to stack.
   */
  children?: React.ReactNode;
  /**
   * See [CSS API](#css) below for more details.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the avatar elements. */
    avatar?: string;
  };
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
 * Demos:
 *
 * - [Avatars](https://material-ui.com/components/avatars/)
 *
 * API:
 *
 * - [AvatarGroup API](https://material-ui.com/api/avatar-group/)
 */
export default function AvatarGroup(props: AvatarGroupProps): JSX.Element;
