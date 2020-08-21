import * as React from 'react';
import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '../ButtonBase';
import { IconButtonProps } from '../IconButton';
import { OverrideProps } from '../OverridableComponent';

export type AccordionSummaryTypeMap<
  P = {},
  D extends React.ElementType = 'div'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    /**
     * The content of the accordion summary.
     */
    children?: React.ReactNode;
    /**
     * See [CSS API](#css) below for more details.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Pseudo-class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. */
      expanded?: string;
      /** Pseudo-class applied to the root element if `focused={true}`. */
      focused?: string;
      /** Pseudo-class applied to the root element if `disabled={true}`. */
      disabled?: string;
      /** Styles applied to the children wrapper element. */
      content?: string;
      /** Styles applied to the `IconButton` component when `expandIcon` is supplied. */
      expandIcon?: string;
    };
    /**
     * The icon to display as the expand indicator.
     */
    expandIcon?: React.ReactNode;
    /**
     * Props applied to the `IconButton` element wrapping the expand icon.
     */
    IconButtonProps?: Partial<IconButtonProps>;
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Accordion](https://material-ui.com/components/accordion/)
 *
 * API:
 *
 * - [AccordionSummary API](https://material-ui.com/api/accordion-summary/)
 * - inherits [ButtonBase API](https://material-ui.com/api/button-base/)
 */
declare const AccordionSummary: ExtendButtonBase<AccordionSummaryTypeMap>;

export type AccordionSummaryClassKey =
  | 'root'
  | 'expanded'
  | 'focused'
  | 'disabled'
  | 'content'
  | 'expandIcon';

export type AccordionSummaryProps<
  D extends React.ElementType = AccordionSummaryTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<AccordionSummaryTypeMap<P, D>, D>;

export default AccordionSummary;
