import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import { List } from '@material-ui/core';
import UserContext from '../../context/user/userContext';

const CurrentChat = ({ classes, chatMessages, dog }) => {
  const listRef = useRef(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [chatMessages]);
  return (
    <List className={classes.messageArea} id='current-chat' ref={listRef}>
      {chatMessages.length
        ? chatMessages.map((message) => (
            <Message
              key={message.id}
              message={message}
              dog={dog}
              user={userInfo}
            />
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
