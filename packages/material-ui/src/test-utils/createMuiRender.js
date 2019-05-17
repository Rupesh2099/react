import React from 'react';
import * as PropTypes from 'prop-types';
import { cleanup, render } from 'react-testing-library';

function muiRender(element, options = {}) {
  const { disableUnnmount = false, strict } = options;
  const Mode = strict ? React.StrictMode : React.Fragment;

  function TestWrapper({ children }) {
    return <Mode>{children}</Mode>;
  }
  TestWrapper.propTypes = {
    children: PropTypes.node,
  };

  if (!disableUnnmount) {
    cleanup();
  }

  const result = render(element, { wrapper: TestWrapper });

  /**
   * convenience helper. Better than repeating all props.
   */
  result.setProps = function setProps(props) {
    return render(React.cloneElement(element, props), { wrapper: TestWrapper });
  };

  return result;
}

export function createMuiRender(globalOptions = {}) {
  const { strict: globalStrict } = globalOptions;

  return function configuredMuiRender(element, options = {}) {
    const { strict = globalStrict, ...localOptions } = options;

    return muiRender(element, { ...localOptions, strict });
  };
}

export * from 'react-test-renderer';
export { cleanup, muiRender as render };
