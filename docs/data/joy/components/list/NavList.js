import * as React from 'react';
import List from '@mui/joy/List';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Videocam from '@mui/icons-material/Videocam';
import Image from '@mui/icons-material/Image';

export default function NavList() {
  return (
    <List
      component="nav"
      sx={{
        bgcolor: 'background.body',
        borderRadius: 'sm',
        border: '1px solid',
        borderColor: 'neutral.outlinedBorder',
        overflow: 'auto',
        maxWidth: 240,
      }}
    >
      <ListItemButton>
        <ListItemDecorator>
          <Image />
        </ListItemDecorator>
        Add another image
      </ListItemButton>
      <ListItemButton>
        <ListItemDecorator>
          <Videocam />
        </ListItemDecorator>
        Add another video
      </ListItemButton>
    </List>
  );
}
