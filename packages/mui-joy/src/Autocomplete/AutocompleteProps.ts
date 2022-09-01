import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import {
  useAutocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
  createFilterOptions,
  UseAutocompleteProps,
} from '@mui/base';
import { SxProps } from '../styles/types';

export {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
  createFilterOptions,
};

export type AutocompleteOwnerState<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & {
  disablePortal: boolean;
  focused: boolean;
  fullWidth: boolean;
  hasClearIcon: boolean;
  hasPopupIcon: boolean;
  inputFocused: boolean;
  popupOpen: boolean;
};

export type AutocompleteRenderGetTagProps = ({ index }: { index: number }) => {
  key: number;
  className: string;
  disabled: boolean;
  'data-tag-index': number;
  tabIndex: -1;
  onDelete: (event: any) => void;
};

export interface AutocompleteRenderOptionState {
  inputValue: string;
  selected: boolean;
}

export interface AutocompleteRenderGroupParams {
  key: string;
  group: string;
  children?: React.ReactNode;
}

export interface AutocompleteRenderInputParams {
  id: string;
  disabled: boolean;
  fullWidth: boolean;
  size: 'small' | undefined;
  InputLabelProps: ReturnType<ReturnType<typeof useAutocomplete>['getInputLabelProps']>;
  InputProps: {
    ref: React.Ref<any>;
    className: string;
    startAdornment: React.ReactNode;
    endAdornment: React.ReactNode;
  };
  inputProps: ReturnType<ReturnType<typeof useAutocomplete>['getInputProps']>;
}

export interface AutocompletePropsSizeOverrides {}

export interface AutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends UseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  className: string;
  /**
   * The icon to display in place of the default clear icon.
   * @default <ClearIcon fontSize="small" />
   */
  clearIcon?: React.ReactNode;
  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Clear'
   */
  clearText?: string;
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText?: string;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps?: {
    // clearIndicator?: Partial<IconButtonProps>;
    // paper?: PaperProps;
    // popper?: Partial<PopperProps>;
    // popupIndicator?: Partial<IconButtonProps>;
  };
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the `Popper` content will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean;
  /**
   * Force the visibility display of the popup icon.
   * @default 'auto'
   */
  forcePopupIcon?: true | false | 'auto';
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {number} more The number of truncated tags.
   * @returns {ReactNode}
   * @default (more) => `+${more}`
   */
  getLimitTagsText?: (more: number) => React.ReactNode;
  /**
   * If `true`, the component is in a loading state.
   * This shows the `loadingText` in place of suggestions (only if there are no suggestions to show, e.g. `options` are empty).
   * @default false
   */
  loading?: boolean;
  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Loading…'
   */
  loadingText?: React.ReactNode;
  /**
   * The maximum number of tags that will be visible when not focused.
   * Set `-1` to disable the limit.
   * @default -1
   */
  limitTags?: number;
  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'No options'
   */
  noOptionsText?: React.ReactNode;
  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Open'
   */
  openText?: string;
  /**
   * The icon to display in place of the default popup icon.
   * @default <ArrowDropDownIcon />
   */
  popupIcon?: React.ReactNode;
  /**
   * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Render the group.
   *
   * @param {AutocompleteRenderGroupParams} params The group to render.
   * @returns {ReactNode}
   */
  renderGroup?: (params: AutocompleteRenderGroupParams) => React.ReactNode;
  /**
   * Render the input.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {object} props The props to apply on the li element.
   * @param {T} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    state: AutocompleteRenderOptionState,
  ) => React.ReactNode;
  /**
   * Render the selected value.
   *
   * @param {T[]} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @param {object} ownerState The state of the Autocomplete component.
   * @returns {ReactNode}
   */
  renderTags?: (
    value: T[],
    getTagProps: AutocompleteRenderGetTagProps,
    ownerState: AutocompleteOwnerState<T, Multiple, DisableClearable, FreeSolo>,
  ) => React.ReactNode;
  /**
   * The size of the component.
   * @default 'md'
   */
  size?: OverridableStringUnion<'sm' | 'md' | 'lg', AutocompletePropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
}
