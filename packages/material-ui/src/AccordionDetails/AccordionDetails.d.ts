import * as React from 'react';
import { StandardProps } from '..';

export interface AccordionDetailsProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, AccordionDetailsClassKey> {
  /**
   * The content of the accordion details.
   */
  children?: React.ReactNode;
}

export type AccordionDetailsClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Accordions](https://material-ui.com/components/accordions/)
 *
 * API:
 *
 * - [AccordionDetails API](https://material-ui.com/api/accordion-details/)
 */
export default function AccordionDetails(props: AccordionDetailsProps): JSX.Element;
