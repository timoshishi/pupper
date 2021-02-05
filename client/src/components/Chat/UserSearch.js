import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
const UserSearch = ({ searchVal, setSearchVal }) => {
  return (
    <TextField
      id='outlined-basic-email'
      label='Search'
      variant='outlined'
      value={searchVal}
      onChange={(e) => setSearchVal(e.target.value)}
      fullWidth
    />
  );
};

UserSearch.propTypes = {
  searchVal: PropTypes.string.isRequired,
  setSearchVal: PropTypes.func.isRequired,
};

export default UserSearch;
