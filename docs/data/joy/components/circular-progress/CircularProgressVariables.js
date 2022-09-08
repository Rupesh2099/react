import * as React from 'react';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

export default function CircularProgressVariables() {
  return (
    <JoyVariablesDemo
      componentName="CircularProgress"
      data={[
        {
          var: '--CircularProgress-size',
          defaultValue: '40px',
        },
        {
          var: '--CircularProgress-track-thickness',
          defaultValue: '6px',
        },
        {
          var: '--CircularProgress-progress-thickness',
          defaultValue: '6px',
        },
      ]}
      renderDemo={(sx) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <CircularProgress sx={sx} />
          <CircularProgress variant="soft" color="neutral" sx={sx} />
        </Box>
      )}
    />
  );
}
