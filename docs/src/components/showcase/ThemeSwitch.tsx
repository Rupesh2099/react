import * as React from 'react';
import Box from '@mui/material/Box';
import Switch, { switchClasses } from '@mui/material/Switch';

export default function ThemeSwitch() {
  const label = { inputProps: { 'aria-label': 'Themed Switch' } };
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1,
        [`& .${switchClasses.root}`]: {
          width: 32,
          height: 20,
          padding: 0,
          [`& .${switchClasses.switchBase}`]: {
            padding: '3px',
            color: '#fff',
            [`&.${switchClasses.checked}`]: {
              transform: 'translateX(12px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                opacity: 1,
              },
            },
          },
          [`& .${switchClasses.thumb}`]: {
            padding: 0,
            height: 14,
            width: 14,
            boxShadow: 'none',
          },
          [`& .${switchClasses.track}`]: {
            borderRadius: 20,
            opacity: 1,
            bgcolor: 'grey.400',
            [theme.getColorSchemeSelector('dark')]: {
              bgcolor: 'grey.800',
            },
          },
        },
      })}
    >
      <Switch defaultChecked {...label} />
      <Switch {...label} />
    </Box>
  );
}
