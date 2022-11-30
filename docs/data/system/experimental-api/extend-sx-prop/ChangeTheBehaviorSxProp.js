import * as React from 'react';
import { createTheme, ThemeProvider, Box, Stack } from '@mui/system';

// Retain type safety.

const theme = createTheme({
  unstable_sxConfig: {
    // You can now use the background key in sx
    // by providing direct values from the palette
    borderRadius: {
      themeKey: 'shape',
    },
  },
  shape: {
    sm: 4,
    md: 8,
    lg: 12,
  },
});

export default function ExtendSxProp() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" gap={1}>
        <Box sx={{ borderRadius: 'sm', bgcolor: '#007FFF', color: '#FFF', p: 1 }}>
          sm border radius
        </Box>
        <Box sx={{ borderRadius: 'md', bgcolor: '#007FFF', color: '#FFF', p: 1 }}>
          md border radius
        </Box>
        <Box sx={{ borderRadius: 'lg', bgcolor: '#007FFF', color: '#FFF', p: 1 }}>
          lg border radius
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
