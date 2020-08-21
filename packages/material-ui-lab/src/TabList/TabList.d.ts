import * as React from 'react';
import { TabsTypeMap, TabsClassKey } from '@material-ui/core/Tabs';
import { Omit } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';

export interface TabListTypeMap<
  P = {},
  D extends React.ElementType = TabsTypeMap['defaultComponent']
> {
  props: P & {
    /**
     * A list of `<Tab />` elements.
     */
    children?: React.ReactElement[];
    /**
     * See [CSS API](#css) below for more details.
     */
    classes?: {};
  } & Omit<TabsTypeMap['props'], 'children' | 'value'>;
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Tabs](https://material-ui.com/components/tabs/)
 *
 * API:
 *
 * - [TabList API](https://material-ui.com/api/tab-list/)
 * - inherits [Tabs API](https://material-ui.com/api/tabs/)
 */
declare const TabList: OverridableComponent<TabListTypeMap>;

export type TabListClassKey = TabsClassKey;

export type TabListProps<
  D extends React.ElementType = TabListTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TabListTypeMap<P, D>, D>;

export default TabList;
