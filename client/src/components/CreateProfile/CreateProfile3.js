import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Chip } from '@material-ui/core';
const CreateProfile3 = ({ interests, handleInterests, step, setStep }) => {
  return (
    <>
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
      <Box
        display='flex'
        my={2}
        m4={4}
        alignItems='center'
        justifyContent='space-between'>
        <Button onClick={() => setStep(step - 1)}>Back</Button>
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </Box>
    </>
  );
};

CreateProfile3.propTypes = {
  interests: PropTypes.object.isRequired,
  handleInterests: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
};

export default CreateProfile3;
