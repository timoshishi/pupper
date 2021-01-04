import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Fab } from '@material-ui/core';
import woofBot from '../../utils/woofBot';
import { Telegram } from '@material-ui/icons';

const MessageInputArea = ({
  chatUser,
  userId,
  createMessage,
  getCurrentChat,
}) => {
  const [messageBody, setMessageBody] = useState('');

  const submitMessage = async (e) => {
    e.preventDefault();
    const messageObj = {
      from_human: true,
      user_id: userId,
      dog_id: chatUser.dog_id,
      body: messageBody,
    };
    await createMessage(messageObj);
    await getCurrentChat(userId, chatUser.dog_id);
    //send a random message back
    const timeout = Math.floor(Math.random() * (3500 - 1500) + 1500);
    setTimeout(async () => {
      try {
        const messageObj = {
          formHuman: false,
          user_id: userId,
          dog_id: chatUser.dog_id,
          body: woofBot(),
        };

        await createMessage(messageObj);
        await getCurrentChat(userId, chatUser.dog_id);
      } catch (err) {
        console.error('@messageInputArea submitMessage', err.message);
      }
    }, timeout);
    setMessageBody('');
  };
  return (
    <form onSubmit={submitMessage}>
      <Grid container style={{ padding: '20px' }}>
        <Grid item={true} xs={11}>
          <TextField
            id='outlined-basic-email'
            label='Type Something'
            fullWidth
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            required={true}
          />
        </Grid>
        <Grid item={true} xs={1} align='right'>
          <Fab
            type='submit'
            color='primary'
            aria-label='add'
            disabled={!chatUser}
            // onClick={submitMessage}
          >
            <Telegram />
          </Fab>
        </Grid>
      </Grid>
    </form>
  );
};

MessageInputArea.propTypes = {
  chatUser: PropTypes.object,
  userId: PropTypes.string.isRequired,
  createMessage: PropTypes.func.isRequired,
  getCurrentChat: PropTypes.func.isRequired,
};

export default MessageInputArea;
