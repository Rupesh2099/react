import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface TimelineItemContentProps extends StandardProps<{}, TimelineItemContentClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

export type TimelineItemContentClassKey =
  | 'root';

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineItemContent API](https://material-ui.com/api/timeline-item-content/)
 */
export default function TimelineItemContent(props: TimelineItemContentProps): JSX.Element;
