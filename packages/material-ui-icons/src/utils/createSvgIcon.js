import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function createSvgIcon(path, displayName) {
  const Component = React.memo(
    React.forwardRef((props, ref) => (
      <SvgIcon {...props} data-mui-test={`${displayName}Icon`} ref={ref}>
        {path}
      </SvgIcon>
    )),
  );

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = displayName;
  }

  Component.muiName = SvgIcon.muiName;

  return Component;
}
