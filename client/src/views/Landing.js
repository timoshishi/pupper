import React from 'react';
import { Box } from '@material-ui/core';
import { SignupButton, AuthenticationButton } from '../components/AuthButtons';

const Landing = (props) => {
  return (
    <Box display='flex' alignItems='center'>
      <Box m='auto'>
        <h1 style={{ marginLeft: '5rem' }}>Pupper</h1>
        <Box as='span'>
          <AuthenticationButton />
          <SignupButton>Sign Up</SignupButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
