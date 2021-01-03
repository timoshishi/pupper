import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip } from '@material-ui/core';
const InterestChips = ({ interests, handleInterests }) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      flexWrap='wrap'
      justifyContent='space-around'
      maxWidth='40vh'>
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

InterestChips.propTypes = {
  interests: PropTypes.object.isRequired,
  handleInterests: PropTypes.func,
};

export default InterestChips;
