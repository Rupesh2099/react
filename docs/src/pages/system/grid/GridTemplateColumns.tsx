import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';

const GridItem = (props: BoxProps) => {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        p: 1,
        m: 1,
        borderRadius: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        ...sx,
      }}
      {...other}
    />
  );
};

export default function GridTemplateColumns() {
  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '50px 60px auto 60px 50px' }}>
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
        <GridItem>5</GridItem>
      </Box>
    </div>
  );
}
