import * as React from 'react';
import JoyVariablesDemo from 'docs/src/modules/components/JoyVariablesDemo';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';

export default function ChipVariables() {
  return (
    <JoyVariablesDemo
      componentName="Chip"
      renderCode={(formattedSx) => `<Chip
  startDecorator={<Avatar />}
  endDecorator={<ChipDelete />}${formattedSx ? `${formattedSx}>` : '\n>'}`}
      data={[
        {
          var: '--Chip-minHeight',
          defaultValue: '32px',
        },
        {
          var: '--Chip-radius',
          defaultValue: '24px',
        },
        {
          var: '--Chip-gap',
          defaultValue: '6px',
        },
        {
          var: '--Chip-paddingInline',
          defaultValue: '12px',
        },
        {
          var: '--Chip-decorator-childHeight',
          defaultValue: '24px',
        },
      ]}
      renderDemo={(sx) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Chip
            startDecorator={<Avatar src="/static/images/avatar/1.jpg" />}
            endDecorator={<ChipDelete />}
            sx={sx}
          >
            Person name
          </Chip>
          <Chip
            variant="outlined"
            color="neutral"
            startDecorator={<Avatar src="/static/images/avatar/1.jpg" />}
            endDecorator={<ChipDelete />}
            sx={sx}
          >
            Person name
          </Chip>
        </Box>
      )}
    />
  );
}
