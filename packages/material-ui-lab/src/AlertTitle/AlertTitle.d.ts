import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface AlertTitleProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AlertTitleClassKey> {}

export type AlertTitleClassKey = 'root';

/**
 *
 *
 * Demos:
 * -
 *
 * API:
 * - [AlertTitle API](https://material-ui.com/api/alert-title/)
 *
 */
export default function AlertTitle(props: AlertTitleProps): JSX.Element;
