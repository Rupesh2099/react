import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function DottedConnector() {
  return (
    <Stepper
      sx={{
        width: '100%',
        [`& .${stepClasses.root}`]: {
          flexDirection: 'column-reverse',
          '&:after': {
            top: 'unset',
            bottom:
              'calc(var(--StepIndicator-size) / 2 - var(--Step-connectorThickness) / 2)',
          },
        },
        [`& .${stepClasses.completed}::after`]: {
          bgcolor: 'primary.500',
        },
        [`& .${stepClasses.active} .${stepIndicatorClasses.root}`]: {
          borderColor: 'primary.500',
        },
        [`& .${stepClasses.root}:has(+ .${stepClasses.active})::after`]: {
          color: 'primary.500',
          backgroundColor: 'transparent',
          backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)',
          backgroundSize: '7px 7px',
          backgroundPosition: 'center left',
        },
        [`& .${stepClasses.disabled} *`]: {
          color: 'neutral.plainDisabledColor',
        },
      }}
    >
      <Step
        completed
        orientation="vertical"
        indicator={
          <StepIndicator variant="solid" color="primary">
            <Check />
          </StepIndicator>
        }
      >
        <Typography
          level="h4"
          fontWeight="xl"
          endDecorator={
            <Typography fontSize="sm" fontWeight="normal">
              Preliminary
            </Typography>
          }
        >
          01
        </Typography>
      </Step>
      <Step
        completed
        orientation="vertical"
        indicator={
          <StepIndicator variant="solid" color="primary">
            <Check />
          </StepIndicator>
        }
      >
        <Typography
          level="h4"
          fontWeight="xl"
          endDecorator={
            <Typography fontSize="sm" fontWeight="normal">
              Your details
            </Typography>
          }
        >
          02
        </Typography>
      </Step>
      <Step
        active
        orientation="vertical"
        indicator={
          <StepIndicator variant="outlined" color="primary">
            <KeyboardArrowDown />
          </StepIndicator>
        }
      >
        <Typography
          level="h4"
          fontWeight="xl"
          endDecorator={
            <Typography fontSize="sm" fontWeight="normal">
              KYC
            </Typography>
          }
        >
          03
        </Typography>
      </Step>
      <Step
        disabled
        orientation="vertical"
        indicator={<StepIndicator variant="outlined" color="neutral" />}
      >
        <Typography
          level="h4"
          fontWeight="xl"
          endDecorator={
            <Typography fontSize="sm" fontWeight="normal">
              KYC
            </Typography>
          }
        >
          04
        </Typography>
      </Step>
    </Stepper>
  );
}
