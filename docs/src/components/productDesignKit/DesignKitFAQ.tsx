import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InternalLink from 'docs/src/modules/components/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetail from '@mui/material/AccordionDetails';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';

const faqData = [
  {
    summary: 'What long-term support do you offer?',
    detail: (
      <React.Fragment>
        We think you’ll love the components we&apos;ve built so far, but we&apos;re planning to
        release more. We opened it up as soon as we had something useful, so that you can start
        getting value from it right away, and we&apos;ll be adding new features and components based
        on our own ideas, and on suggestions from early access customers.
      </React.Fragment>
    ),
  },
  {
    summary: 'How many licenses do I need?',
    detail: (
      <React.Fragment>
        The number of licenses purchased must correspond to the maximum number of editors working
        concurrently in a 24 hour period. An editor is somebody contributing changes to the designed
        screens that use the UI kits. No licenses are required for viewing the designs.
      </React.Fragment>
    ),
  },
  {
    summary: 'The UI kit got an update. How do I get it?',
    detail: (
      <React.Fragment>
        We&apos;ll send you an email when a new release is available. You can access the item on the{' '}
        <InternalLink href="https://mui.com/store/account/downloads/">
          download
        </InternalLink>{' '}
        page of your store account. You can find a detailed description of the changes under the
        &quot;Changelog&quot; tab on this page.
      </React.Fragment>
    ),
  },
  {
    summary: 'Do you offer discounts to educational or non-profit organizations?',
    detail: (
      <React.Fragment>
        Yes, we offer a 50% discount on all products licensed to students, instructors, non-profit,
        and charity entities. This special discount cannot be combined with any other type of
        discount. To qualify for the discount, you need to send us a document clearly indicating
        that you are a member of the respective institution. An email from your official account
        which bears your signature is sufficient in most cases. For more information on how to
        qualify for a discount, please contact sales.
      </React.Fragment>
    ),
  },
  {
    summary: 'Figma or Sketch or Adobe XD?',
    detail: (
      <React.Fragment>
        We aim to keep feature parity between the Figma, Sketch, and Adobe XD kits where possible.
        We have a 50% off coupon for past customers who want to switch between two design tools.
      </React.Fragment>
    ),
  },
];

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  padding: theme.spacing(2),
  transition: theme.transitions.create('box-shadow'),
  '&&': {
    borderRadius: theme.shape.borderRadius,
  },
  '&:hover': {
    boxShadow: '1px 1px 20px 0 rgb(90 105 120 / 20%)',
  },
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2),
  },
  '&:before': {
    display: 'none',
  },
  '&:after': {
    display: 'none',
  },
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(-2),
  minHeight: 'auto',
  '&.Mui-expanded': {
    minHeight: 'auto',
  },
  '& .MuiAccordionSummary-content': {
    margin: 0,
    paddingRight: theme.spacing(2),
    '&.Mui-expanded': {
      margin: 0,
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetail)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: 0,
}));

export default function DesignKitFAQ() {
  function renderItem(index: number) {
    const faq = faqData[index];
    return (
      <Accordion variant="outlined">
        <AccordionSummary
          expandIcon={<KeyboardArrowDownRounded sx={{ fontSize: 20, color: 'primary.main' }} />}
        >
          <Typography variant="body2" fontWeight="bold" component="h3">
            {faq.summary}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            component="div"
            variant="body2"
            color="text.secondary"
            sx={{ '& ul': { pl: 2 } }}
          >
            {faq.detail}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  }
  return (
    <Container sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <Typography variant="h2" sx={{ mb: { xs: 2, sm: 4 } }}>
        Frequently asked questions
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {renderItem(0)}
          {renderItem(1)}
          {renderItem(2)}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderItem(3)}
          {renderItem(4)}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderStyle: 'dashed',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.300',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.800' : 'white'),
            }}
          >
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body2" color="text.primary" fontWeight="bold">
                Got any questions unanswered or need more help?
              </Typography>
            </Box>
            <Typography variant="body2" color="text.primary" sx={{ my: 1, textAlign: 'left' }}>
              From community help to premium business support, we’re here to help.
            </Typography>
            <Link href="mailto:sales@mui.com" variant="body2">
              Contact sales
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
