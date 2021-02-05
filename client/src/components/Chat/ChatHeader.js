import React from 'react';
import { Box, Typography } from '@material-ui/core';
const ChatHeader = () => {
  return (
    <Box display='flex' justify='center' align='center'>
      <Typography variant='h5' className='header-message'>
        Chat
      </Typography>
    </Box>
  );
};

export default ChatHeader;
