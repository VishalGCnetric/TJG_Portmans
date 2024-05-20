import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography } from '@mui/material';

const steps = [
  "Placed",
  'Order Confirmed',
  'Shipped',
  'Out For Delivery',
  'Delivered'
];

export default function OrderTraker({ activeStep }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel
              sx={{
                '& .MuiStepLabel-label': {
                  color: activeStep >= index ? '#333' : '#999',
                },
                '& .Mui-completed .MuiStepLabel-label': {
                  color: '#333 !important',
                },
                '& .Mui-active .MuiStepLabel-label': {
                  color: '#333 !important',
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
