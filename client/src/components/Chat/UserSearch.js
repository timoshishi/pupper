import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
const UserSearch = (props) => {
  return (
    <TextField
      id='outlined-basic-email'
      label='Search'
      variant='outlined'
      fullWidth
    />
  );
};

UserSearch.propTypes = {};

export default UserSearch;
