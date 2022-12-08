import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface TableClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `stickyHeader={true}`. */
  stickyHeader: string;
}

export type TableClassKey = keyof TableClasses;

export function getTableUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTable', slot);
}

const tableClasses: TableClasses = generateUtilityClasses('MuiTable', ['root', 'stickyHeader']);

export default tableClasses;
