import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';

const Stepper = ({ step, setStep, maxStep, handleSubmit }) => {
  return (
    <Box
      display='flex'
      my={2}
      m4={4}
      alignItems='center'
      justifyContent='space-between'>
      <Button onClick={() => setStep(step - 1)} disabled={step === 1}>
        Back
      </Button>
      {step === maxStep ? (
        <Button onClick={handleSubmit} variant='contained'>
          Submit
        </Button>
      ) : (
        <Button onClick={() => setStep(step + 1)}>Next</Button>
      )}
    </Box>
  );
};

Stepper.propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  maxStep: PropTypes.number.isRequired,
};

export default Stepper;
