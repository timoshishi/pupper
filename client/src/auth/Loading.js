import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

const Loading = () => (
  <Box display='flex' align='center' justify='center'>
    <CircularProgress alt='Loading...' color='secondary' size={70} />
  </Box>
);

export default Loading;
