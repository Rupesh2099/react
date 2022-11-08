import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function HelperTextAligned() {

const [value, setValue] = React.useState('');

const handleChange= (event) => {
  setValue(event.target.value);
}

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
      }}
    >
      <TextField
        helperText="Please enter your name"
        id="demo-helper-text-aligned"
        label="Name"
        value={value}
        onChange={handleChange}
      />
      <TextField
        helperText=" "
        id="demo-helper-text-aligned-no-helper"
        label="Name"
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
