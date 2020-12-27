import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box } from '@material-ui/core';

const CreateProfile2 = ({ summary, about, handleFormData }) => {
  return (
    <>
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
    </>
  );
};

CreateProfile2.propTypes = {
  handleFormData: PropTypes.func.isRequired,
  about: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

export default CreateProfile2;
