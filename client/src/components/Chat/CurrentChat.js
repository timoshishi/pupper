import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import { List } from '@material-ui/core';
const CurrentChat = ({ classes, chatMessages }) => {
  const listRef = useRef(null);
  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [chatMessages]);
  return (
    <List className={classes.messageArea} id='current-chat' ref={listRef}>
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
