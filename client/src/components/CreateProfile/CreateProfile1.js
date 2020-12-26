import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box } from '@material-ui/core';
const CreateProfile1 = ({ step, setStep, handleFormData, name, zip_code }) => {
  return (
    <>
      <TextField
        required
        id='standard-required'
        label='Name'
        placeholder='Name'
        m='2'
        fullWidth
        name='name'
        value={name}
        onChange={handleFormData}
      />
      <TextField
        id='standard-number'
        label='Zip Code'
        type='number'
        fullWidth
        max='99999'
        min='0'
        name='zip_code'
        value={zip_code}
        onChange={handleFormData}
      />
      <Box display='flex' justifyContent='flex-end'>
        <Button onClick={() => setStep(step + 1)}>Next</Button>
      </Box>
    </>
  );
};

CreateProfile1.propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  handleFormData: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default CreateProfile1;
