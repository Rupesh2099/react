import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CheckIcon from 'docs/src/modules/branding/icons/Check';

interface BrandingBulletItemProps {
  children?: React.ReactNode;
  variant?: 'dark' | 'light';
  BoxSx?: object;
  spanSx?: object;
  spanVariant?: string;
}

export default function BrandingBulletItem(props: BrandingBulletItemProps) {
  const { children, variant = 'light', spanSx, BoxSx, spanVariant, ...other } = props;

  return (
    <Box
      component="li"
      {...other}
      sx={{ display: 'flex', my: variant === 'light' ? 2 : '10px', ...BoxSx }}
    >
      <CheckIcon
        sx={{
          display: 'inline-block',
          width: 24,
          height: 24,
          bgcolor: variant === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgb(204, 229, 255)',
          color: variant === 'light' ? 'primary.main' : 'vividBlue',
          borderRadius: '50%',
          p: 0.5,
          boxSizing: 'content-box',
          mr: '11px',
          mt: '-2px',
        }}
      />
      <Typography component="span" variant={spanVariant} sx={{ ...spanSx }}>
        {children}
      </Typography>
    </Box>
  );
}
