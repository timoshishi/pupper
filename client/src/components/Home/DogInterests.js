import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip } from '@material-ui/core';

const DogInterests = ({ interests }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      flexWrap='wrap'
      justifyContent='space-around'>
      {Object.keys(interests).map((interest, i) => {
        const name = interest.replaceAll('_', ' ');
        return (
          <Box m={0.5} key={i}>
            <Chip label={name} color='primary' name={interest} />
          </Box>
        );
      })}
    </Box>
  );
};

DogInterests.propTypes = {
  interests: PropTypes.object.isRequired,
};

export default DogInterests;
