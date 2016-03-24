import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceAccessTime = (props) => (
  <SvgIcon {...props}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </SvgIcon>
);
DeviceAccessTime = pure(DeviceAccessTime);
DeviceAccessTime.displayName = 'DeviceAccessTime';

export default DeviceAccessTime;
