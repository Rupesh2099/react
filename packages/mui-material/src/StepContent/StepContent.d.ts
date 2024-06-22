import * as React from 'react';
import { SxProps } from '@mui/system';
import { InternalStandardProps as StandardProps } from '..';
import { Theme } from '../styles';
import { TransitionProps } from '../transitions/transition';
import { StepContentClasses } from './stepContentClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface StepContentSlots {
  /**
   * The component that renders the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  transition?: React.JSXElementConstructor<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
}

export type StepContentSlotsAndSlotProps = CreateSlotsAndSlotProps<
  StepContentSlots,
  {
    transition: SlotProps<React.ElementType<TransitionProps>, {}, StepContentOwnerState>;
  }
>;

export interface StepContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>>,
    StepContentSlotsAndSlotProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StepContentClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   * @deprecated Use `slotProps.transition` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionComponent?: React.JSXElementConstructor<
    TransitionProps & { children: React.ReactElement<any, any> }
  >;
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a prop to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration?: TransitionProps['timeout'] | 'auto';
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @deprecated Use `slotProps.transition` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TransitionProps?: TransitionProps;
}

export interface StepContentOwnerState extends StepContentProps {}

export type StepContentClasskey = keyof NonNullable<StepContentProps['classes']>;

/**
 *
 * Demos:
 *
 * - [Stepper](https://next.mui.com/material-ui/react-stepper/)
 *
 * API:
 *
 * - [StepContent API](https://next.mui.com/material-ui/api/step-content/)
 */
export default function StepContent(props: StepContentProps): React.JSX.Element;
