import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Button } from '@material-ui/core';

const CreateProfile2 = ({ step, setStep, summary, about, handleFormData }) => {
  return (
    <div>
      <Box my={2}>
        <TextField
          id='standard-multiline-flexible'
          label='Your Headline'
          multiline
          rowsMax={4}
          w='100'
          fullWidth
          name='summary'
          onChange={handleFormData}
          value={summary}
        />
      </Box>
      <TextField
        id='standard-multiline-flexible'
        label='Tell us a little about yourself'
        multiline
        rows={4}
        fullWidth
        variant='outlined'
        name='about'
        onChange={handleFormData}
        value={about}
      />

      <Box
        display='flex'
        my={2}
        m4={4}
        alignItems='center'
        justifyContent='space-between'>
        <Button onClick={() => setStep(step - 1)}>Back</Button>
        <Button onClick={() => setStep(step + 1)}>Next</Button>
      </Box>
    </div>
  );
};

CreateProfile2.propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  handleFormData: PropTypes.func.isRequired,
  about: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

export default CreateProfile2;
