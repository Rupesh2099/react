import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

// Icons import
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import OutboxRoundedIcon from '@mui/icons-material/OutboxRounded';
import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function EmailNav() {
  return (
    <React.Fragment>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          color="neutral.500"
          fontWeight={700}
          sx={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1rem' }}
        >
          Browse
        </Typography>
        <IconButton size="sm" variant="plain" color="primary" sx={{ '--IconButton-size': '24px' }}>
          <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
      <List
        size="sm"
        sx={{
          '--List-item-radius': '8px',
          '& .JoyListItemButton-root': { p: '8px' },
        }}
      >
        <ListItem>
          <ListItemButton variant="soft" color="primary">
            <ListItemDecorator sx={{ color: 'inherit' }}>
              <InboxRoundedIcon fontSize="small" />
            </ListItemDecorator>
            <ListItemContent>Inbox</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator sx={{ color: 'neutral.500' }}>
              <OutboxRoundedIcon fontSize="small" />
            </ListItemDecorator>
            <ListItemContent>Sent</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator sx={{ color: 'neutral.500' }}>
              <DraftsRoundedIcon fontSize="small" />
            </ListItemDecorator>
            <ListItemContent>Draft</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator sx={{ color: 'neutral.500' }}>
              <AssistantPhotoRoundedIcon fontSize="small" />
            </ListItemDecorator>
            <ListItemContent>Flagged</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator sx={{ color: 'neutral.500' }}>
              <DeleteRoundedIcon fontSize="small" />
            </ListItemDecorator>
            <ListItemContent>Trash</ListItemContent>
          </ListItemButton>
        </ListItem>
      </List>
      <Box
        sx={{
          mt: 2,
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          color="neutral.500"
          fontWeight={700}
          sx={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1rem' }}
        >
          Tags
        </Typography>
        <IconButton size="sm" variant="plain" color="primary" sx={{ '--IconButton-size': '24px' }}>
          <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
        </IconButton>
      </Box>
      <List
        size="sm"
        sx={{
          '--List-item-radius': '8px',
          '--List-decorator-width': '32px',
          '& .JoyListItemButton-root': { p: '8px' },
        }}
      >
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '99px',
                  bgcolor: 'primary.300',
                }}
              />
            </ListItemDecorator>
            <ListItemContent>Personal</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '99px',
                  bgcolor: 'danger.400',
                }}
              />
            </ListItemDecorator>
            <ListItemContent>Work</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '99px',
                  bgcolor: 'warning.500',
                }}
              />
            </ListItemDecorator>
            <ListItemContent>Travels</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '99px',
                  bgcolor: 'success.400',
                }}
              />
            </ListItemDecorator>
            <ListItemContent>Concert tickets</ListItemContent>
          </ListItemButton>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
