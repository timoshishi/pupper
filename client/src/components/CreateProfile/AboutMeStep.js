import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box } from '@material-ui/core';
import PhotoUpload from './PhotoUpload';
const AboutMeStep = ({
  summary,
  about,
  handleFormData,
  name,
  userInfo,
  setUserInfo,
}) => {
  return (
    <Box maxWidth='60vh'>
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
          required
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
        required
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
      <PhotoUpload userInfo={userInfo} setUserInfo={setUserInfo} />
    </Box>
  );
};

AboutMeStep.propTypes = {
  handleFormData: PropTypes.func.isRequired,
  about: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default AboutMeStep;
