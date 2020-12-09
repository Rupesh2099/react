import * as React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Cache with option to prepend emotion's style tag 
export const cache = createCache({ key: 'css', prepend: true });

export function StylesProvider({ injectFirst }) {
  return injectFirst ? <CacheProvider value={cache}>{props.children}</CacheProvider> : props.children;
}

StylesProvider.propTypes = {
    /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override Material-UI's styles, set this prop.
   */
  injectFirst: PropTypes.bool,
};

export default StylesProvider;