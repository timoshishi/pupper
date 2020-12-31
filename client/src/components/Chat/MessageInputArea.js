import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const MessageInputArea = ({
  chatUser,
  userId,
  createMessage,
  getCurrentChat,
}) => {
  const [messageBody, setMessageBody] = useState('');

  const submitMessage = async () => {
    const messageObj = {
      from_human: true,
      user_id: userId,
      dog_id: chatUser.dog_id,
      body: messageBody,
    };
    await createMessage(messageObj);
    await getCurrentChat(userId, chatUser.dog_id);
    setMessageBody('');
  };
  return (
    <Grid container style={{ padding: '20px' }}>
      <Grid item={true} xs={11}>
        <TextField
          id='outlined-basic-email'
          label='Type Something'
          fullWidth
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
        />
      </Grid>
      <Grid item={true} xs={1} align='right'>
        <Fab
          color='primary'
          aria-label='add'
          disabled={!chatUser}
          onClick={submitMessage}>
          <SendIcon />
        </Fab>
      </Grid>
    </Grid>
  );
};

MessageInputArea.propTypes = {
  chatUser: PropTypes.object,
  userId: PropTypes.string.isRequired,
  createMessage: PropTypes.func.isRequired,
  getCurrentChat: PropTypes.func.isRequired,
};

export default MessageInputArea;
