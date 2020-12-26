import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
const Landing = (props) => {
  return (
    <Box display='flex' alignItems='center'>
      <Box m='auto'>
        <h1 style={{ marginLeft: '5rem' }}>Pupper</h1>
        <h2>Meet Your New Best Friend</h2>
      </Box>
    </Box>
  );
};

Landing.propTypes = {};

export default Landing;
