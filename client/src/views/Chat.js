import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Divider, List } from '@material-ui/core';
import {
  UserItem,
  MessageInputArea,
  UserSearch,
  CurrentChat,
  ChatHeader,
} from '../components/Chat';
import ChatContext from '../context/chat/chatContext';
import { useAuth0 } from '@auth0/auth0-react';

const Chat = () => {
  const chatContext = useContext(ChatContext);
  const {
    getChatUserList,
    chatUsers,
    getCurrentChat,
    currentChat,
    createMessage,
    chatUser,
    setChatUser,
  } = chatContext;
  const classes = useStyles();
  const { user } = useAuth0();

  useEffect(() => {
    getChatUserList(user.sub);
    if (chatUser) {
      getCurrentChat(user.sub, chatUser.dog_id);
    }
    //eslint-disable-next-line
  }, [chatUser]);

  return (
    <div>
      <Grid container>
        <Grid item={true} xs={12}>
          <ChatHeader />
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item={true} xs={3} className={classes.borderRight500}>
          <List>
            {chatUser && (
              <UserItem
                id='current-chat-user'
                dog={chatUser}
                setChatUser={setChatUser}
              />
            )}
          </List>
          <Divider />
          <Grid item={true} xs={12} style={{ padding: '10px' }}>
            <UserSearch />
          </Grid>
          <Divider />
          <List id='user-chats'>
            {chatUsers.length
              ? chatUsers.map((dog) => (
                  <UserItem
                    key={`dog_id_${dog.dog_id}`}
                    dog={dog}
                    setChatUser={setChatUser}
                  />
                ))
              : null}
          </List>
        </Grid>
        <Grid item={true} xs={9}>
          <CurrentChat classes={classes} chatMessages={currentChat} />
          <Divider />
          <MessageInputArea
            chatUser={chatUser}
            userId={user.sub}
            createMessage={createMessage}
            getCurrentChat={getCurrentChat}
          />
        </Grid>
      </Grid>
    </div>
  );
};
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});

export default Chat;
