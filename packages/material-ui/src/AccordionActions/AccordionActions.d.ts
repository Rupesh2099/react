import * as React from 'react';
import { StandardProps } from '..';

export interface AccordionActionsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AccordionActionsClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * If `true`, the actions do not have additional margin.
   */
  disableSpacing?: boolean;
}

export type AccordionActionsClassKey = 'root' | 'spacing';

/**
 *
 * Demos:
 *
 * - [Accordions](https://material-ui.com/components/accordions/)
 *
 * API:
 *
 * - [AccordionActions API](https://material-ui.com/api/accordion-actions/)
 */
export default function AccordionActions(props: AccordionActionsProps): JSX.Element;
