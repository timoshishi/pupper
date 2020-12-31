import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
const MessageInputArea = (props) => {
  return (
    <Grid container style={{ padding: '20px' }}>
      <Grid item={true} xs={11}>
        <TextField id='outlined-basic-email' label='Type Something' fullWidth />
      </Grid>
      <Grid item={true} xs={1} align='right'>
        <Fab color='primary' aria-label='add'>
          <SendIcon />
        </Fab>
      </Grid>
    </Grid>
  );
};

MessageInputArea.propTypes = {};

export default MessageInputArea;
