import React from 'react';
import AlertTitle from '@material-ui/core/AlertTitle';

export default React.forwardRef(function DeprecatedAlertTitle(props, ref) {
  let warnedOnce = false;

  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: the AlertTitle component was moved from the lab to the core.',
        '',
        "You should use `import { AlertTitle } from '@material-ui/core'`",
        "or `import AlertTitle from '@material-ui/core/AlertTitle'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <AlertTitle ref={ref} {...props} />;
});
