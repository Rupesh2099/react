import * as React from 'react';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/router';

/**
 * Similar to `React.useState`, but it syncs back the current state to a query
 * parameter in the url, therefore it only supports strings. Wrap the result with
 * parse/stringify logic if more complex values are needed
 */
export default function useQueryParameterState(
  name: string,
  initialValue = '',
): [string, (newValue: string) => void] {
  const router = useRouter();

  const queryParamValue = router.query[name];
  const urlValue = Array.isArray(queryParamValue) ? queryParamValue[0] : queryParamValue;

  const [state, setState] = React.useState(urlValue || initialValue);

  const setUrlValue = React.useMemo(
    () =>
      debounce((newValue = '') => {
        const query = new URLSearchParams(window.location.search);
        if (newValue) {
          query.set(name, newValue);
        } else {
          query.delete(name);
        }
        const newSearch = query.toString();
        if (window.location.search !== newSearch) {
          router.replace(
            {
              pathname: router.pathname,
              // TODO: this resets the scroll position, even though we have scroll: false
              // hash: window.location.hash,
              search: newSearch,
            },
            undefined,
            {
              scroll: false,
              shallow: true,
            },
          );
        }
      }, 220),
    [name, router],
  );

  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current && urlValue !== state) {
      // This syncs the initial value to the url
      setUrlValue(state);
    }

    isFirstRender.current = false;
  }, [state, urlValue, setUrlValue]);

  const setUserState = React.useCallback(
    (newValue: string) => {
      setUrlValue(newValue);
      setState(newValue);
    },
    [setUrlValue],
  );

  return [state, setUserState];
}
