import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';
import Apps from '@mui/icons-material/Apps';

export default function ActionableList() {
  return (
    <List sx={{ bgcolor: 'background.surface', maxWidth: 240 }}>
      <ListItem>
        <ListItemButton selected>
          <ListItemDecorator>
            <Home />
          </ListItemDecorator>
          Home
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <Apps />
          </ListItemDecorator>
          Apps
        </ListItemButton>
      </ListItem>
    </List>
  );
}
