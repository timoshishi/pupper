import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import { List } from '@material-ui/core';
const CurrentChat = ({ classes, chatMessages }) => {
  console.log({ chatMessages });
  return (
    <List className={classes.messageArea} id='current-chat'>
      {chatMessages.length
        ? chatMessages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        : null}
    </List>
  );
};

CurrentChat.propTypes = {
  classes: PropTypes.object.isRequired,
  chatMessages: PropTypes.array,
};

export default CurrentChat;
