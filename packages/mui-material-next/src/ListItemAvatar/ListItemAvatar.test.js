import * as React from 'react';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import ListItemAvatar, {
  listItemAvatarClasses as classes,
} from '@mui/material-next/ListItemAvatar';
import { CssVarsProvider, extendTheme } from '@mui/material-next/styles';

describe('<ListItemAvatar />', () => {
  const { render } = createRenderer();

  describeConformance(
    <ListItemAvatar>
      <div />
    </ListItemAvatar>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiListItemAvatar',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'componentsProp', 'themeVariants'],
      ThemeProvider: CssVarsProvider,
      createTheme: extendTheme,
    }),
  );
});
