import * as React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';

export default function MaterialUIDefaultDark() {
  return (
    <CssVarsProvider defaultMode="dark">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(256px, 1fr))',
          gridAutoRows: 'minmax(160px, auto)',
          gap: 2,
          '& > div': {
            placeSelf: 'center',
          },
        }}
      >
        <AppBar position="static" color="secondary" elevation={12}>
          <Toolbar>The color should be `palette.AppBar.darkBg`</Toolbar>
        </AppBar>
        <Box sx={{ height: 100, bgcolor: 'red' }}>
          <Paper elevation={24} sx={{ bgcolor: 'red', p: 2 }}>
            I should be red with overlay.
          </Paper>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
