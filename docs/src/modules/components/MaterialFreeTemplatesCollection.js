import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/joy/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const sourcePrefix = `${process.env.SOURCE_CODE_REPO}/tree/v${process.env.LIB_VERSION}`;

function layouts(t) {
  return [
    {
      title: t('dashboardTitle'),
      description: t('dashboardDescr'),
      src: '/static/images/templates/dashboard.png',
      href: '/material-ui/getting-started/templates/dashboard/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/dashboard`,
    },
    {
      title: t('signInTitle'),
      description: t('signInDescr'),
      src: '/static/images/templates/sign-in.png',
      href: '/material-ui/getting-started/templates/sign-in/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-in`,
    },
    {
      title: t('signInSideTitle'),
      description: t('signInSideDescr'),
      src: '/static/images/templates/sign-in-side.png',
      href: '/material-ui/getting-started/templates/sign-in-side/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-in-side`,
    },
    {
      title: t('signUpTitle'),
      description: t('signUpDescr'),
      src: '/static/images/templates/sign-up.png',
      href: '/material-ui/getting-started/templates/sign-up/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sign-up`,
    },
    {
      title: t('blogTitle'),
      description: t('blogDescr'),
      src: '/static/images/templates/blog.png',
      href: '/material-ui/getting-started/templates/blog/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/blog`,
    },
    {
      title: t('checkoutTitle'),
      description: t('checkoutDescr'),
      src: '/static/images/templates/checkout.png',
      href: '/material-ui/getting-started/templates/checkout/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/checkout`,
    },
    {
      title: t('albumTitle'),
      description: t('albumDescr'),
      src: '/static/images/templates/album.png',
      href: '/material-ui/getting-started/templates/album/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/album`,
    },
    {
      title: t('pricingTitle'),
      description: t('pricingDescr'),
      src: '/static/images/templates/pricing.png',
      href: '/material-ui/getting-started/templates/pricing/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/pricing`,
    },
    {
      title: t('stickyFooterTitle'),
      description: t('stickyFooterDescr'),
      src: '/static/images/templates/sticky-footer.png',
      href: '/material-ui/getting-started/templates/sticky-footer/',
      source: `${sourcePrefix}/docs/data/material/getting-started/templates/sticky-footer`,
    },
  ];
}

export default function Templates() {
  const t = useTranslate();

  return (
    <Grid container spacing={2} sx={{ pt: 2, pb: 4 }}>
      {layouts(t).map((layout) => (
        <Grid item xs={12} sm={4} sx={{ flexGrow: 1 }} key={layout.title}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              background: 'background.paper',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                overflow: 'auto',
                position: 'relative',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardMedia
                component="a"
                href={layout.href}
                image={layout.src}
                title={layout.title}
                rel="nofollow"
                target="_blank"
                sx={{ height: 0, pt: '65%' }}
              />
              <NextLink href={layout.href} passHref legacyBehavior>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link
                  tabIndex={-1}
                  aria-hidden
                  data-ga-event-category="joy-template"
                  data-ga-event-label={layout.title}
                  data-ga-event-action="preview-img"
                  sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 1,
                    transition: '0.15s',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    top: 0,
                    left: 0,
                    bgcolor: alpha(theme.palette.primary[50], 0.5),
                    backdropFilter: 'blur(4px)',
                    '&:hover, &:focus': {
                      opacity: 1,
                    },
                    ...theme.applyDarkStyles({
                      bgcolor: alpha(theme.palette.common.black, 0.8),
                    }),
                  })}
                >
                  <Visibility />
                  <Typography fontWeight="bold" color="text.primary">
                    View live preview
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <CardContent sx={{ pt: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography component="h3" variant="subtitle1" fontWeight="bold" gutterBottom>
                {layout.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {layout.description}
              </Typography>
              <Button
                size="small"
                fullWidth
                variant="outlined"
                color="secondary"
                component="a"
                href={layout.source}
                startIcon={<CodeRoundedIcon sx={{ mr: 0.5 }} />}
                sx={{ mt: 'auto' }}
              >
                {t('sourceCode')}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
