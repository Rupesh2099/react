import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import FEATURE_TOGGLE from 'docs/src/featureToggle';

export default function AppHeaderBanner() {
  return FEATURE_TOGGLE.enable_website_banner ? (
    <Typography
      variant="body2"
      fontWeight="medium"
      sx={{
        color: '#fff',
        p: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? `linear-gradient(90deg, ${theme.palette.primary[900]}, ${theme.palette.primary[600]} 120%)`
            : `linear-gradient(-90deg, ${theme.palette.primary[700]}, ${theme.palette.primary[500]} 120%)`,
      }}
    >
      🚀 We&apos;re hiring a Designer, Full-stack Engineer, React Support Engineer, and more!&nbsp;
      <Link
        href={ROUTES.careers} // Fix me!
        target="_blank"
        data-ga-event-category="$event-category" // Fix me!
        data-ga-event-action="click"
        data-ga-event-label="header"
        sx={{
          fontWeight: 'semiBold',
          textDecoration: 'underline',
          color: '#fff',
          '&:hover': { color: 'grey.200' },
        }}
      >
        Check the careers page →
      </Link>
    </Typography>
  ) : null;
}
