import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.vars.palette.neutral[500],
}));

export default function ColumnsGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
