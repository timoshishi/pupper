import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box } from '@material-ui/core';

const AboutMeStep = ({ summary, about, handleFormData, name, zip_code }) => {
  return (
    <>
      <Box my={2}>
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
        </>

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

AboutMeStep.propTypes = {
  handleFormData: PropTypes.func.isRequired,
  about: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  name: PropTypes.func.isRequired,
  zip_code: PropTypes.number.isRequired,
};

export default AboutMeStep;
