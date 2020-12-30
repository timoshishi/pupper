import React from 'react';
import { Box } from '@material-ui/core';
import { SignupButton } from '../components/AuthButtons';

const Landing = (props) => {
  return (
    <Box display='flex' alignItems='center'>
      <Box m='auto'>
        <h1>Pupper</h1>
        <SignupButton>Sign Up</SignupButton>
      </Box>
    </Box>
  );
};

export default Landing;
