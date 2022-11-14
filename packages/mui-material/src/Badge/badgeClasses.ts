import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface BadgeClasses {
  /** Class name applied to the badge `span` element if `variant="dot"`. */
  dot: string;
  /** Class name applied to the badge `span` element if `variant="standard"`. */
  standard: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }}`. */
  anchorOriginTopRight: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }}`. */
  anchorOriginBottomRight: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }}`. */
  anchorOriginTopLeft: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }}`. */
  anchorOriginBottomLeft: string;
  /** Styles applied to the badge `span` element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the badge `span` element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the badge `span` element if `color="error"`. */
  colorError: string;
  /** Styles applied to the badge `span` element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the badge `span` element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the badge `span` element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangular"`. */
  anchorOriginTopRightRectangular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangular"`. */
  anchorOriginBottomRightRectangular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangular"`. */
  anchorOriginTopLeftRectangular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangular"`. */
  anchorOriginBottomLeftRectangular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }} overlap="circular"`. */
  anchorOriginTopRightCircular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circular"`. */
  anchorOriginBottomRightCircular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }} overlap="circular"`. */
  anchorOriginTopLeftCircular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circular"`. */
  anchorOriginBottomLeftCircular: string;
  /** Class name applied to the badge `span` element if `overlap="rectangular"`. */
  overlapRectangular: string;
  /** Class name applied to the badge `span` element if `overlap="circular"`. */
  overlapCircular: string;
}

export type BadgeClassKey = keyof BadgeClasses;

export function getBadgeUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBadge', slot);
}

const badgeClasses: BadgeClasses = generateUtilityClasses('MuiBadge', [
  'dot',
  'standard',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
  'colorError',
  'colorInfo',
  'colorPrimary',
  'colorSecondary',
  'colorSuccess',
  'colorWarning',
  'overlapRectangular',
  'overlapCircular',
  // TODO: v6 remove the overlap value from these class keys
  'anchorOriginTopLeftCircular',
  'anchorOriginTopLeftRectangular',
  'anchorOriginTopRightCircular',
  'anchorOriginTopRightRectangular',
  'anchorOriginBottomLeftCircular',
  'anchorOriginBottomLeftRectangular',
  'anchorOriginBottomRightCircular',
  'anchorOriginBottomRightRectangular',
]);

export default badgeClasses;
