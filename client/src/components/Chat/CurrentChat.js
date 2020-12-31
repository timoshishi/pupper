import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import { List } from '@material-ui/core';
const CurrentChat = ({ classes }) => {
  return (
    <List className={classes.messageArea} id='current-chat'>
      <Message />
      <Message />
    </List>
  );
};

CurrentChat.propTypes = {};

export default CurrentChat;
