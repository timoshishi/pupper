import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
const ChatHeader = (props) => {
  return (
    <Typography variant='h5' className='header-message'>
      Chat
    </Typography>
  );
};

ChatHeader.propTypes = {};

export default ChatHeader;
