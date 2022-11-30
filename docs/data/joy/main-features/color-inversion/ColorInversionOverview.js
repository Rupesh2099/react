import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkOutlined from '@mui/icons-material/BookmarkOutlined';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function ColorInversionMotivation() {
  return (
    <Card
      variant="solid"
      color="primary"
      invertedColors
      sx={{ gap: 2, maxWidth: 300, boxShadow: 'md' }}
    >
      <Chip
        size="sm"
        variant="soft"
        sx={{ alignSelf: 'flex-start', borderRadius: 'xl' }}
      >
        New
      </Chip>
      <IconButton
        variant="outlined"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
      >
        <BookmarkOutlined />
      </IconButton>
      <Typography fontSize="xl2" fontWeight="lg">
        Learn how to build super fast website.
      </Typography>
      <Button variant="solid" endDecorator={<KeyboardArrowRight />}>
        Read more
      </Button>
    </Card>
  );
}
