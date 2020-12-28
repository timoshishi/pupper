import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip } from '@material-ui/core';
const CreateProfile3 = ({ interests, handleInterests }) => {
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
            <Chip
              label={name}
              variant={!interests[interest] ? 'outlined' : 'default'}
              color='primary'
              clickable
              name={interest}
              onClick={() => handleInterests(interest)}
            />
          </Box>
        );
      })}
    </Box>
  );
};

CreateProfile3.propTypes = {
  interests: PropTypes.object.isRequired,
  handleInterests: PropTypes.func.isRequired,
};

export default CreateProfile3;
