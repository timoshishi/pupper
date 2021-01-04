import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Divider, List } from '@material-ui/core';
import {
  UserItem,
  MessageInputArea,
  UserSearch,
  CurrentChat,
  ChatHeader,
  UserList,
} from '../components/Chat';
import ChatContext from '../context/chat/chatContext';
import { useAuth0 } from '@auth0/auth0-react';

const Chat = () => {
  const chatContext = useContext(ChatContext);
  const classes = useStyles();
  const { user } = useAuth0();
  const {
    getChatUserList,
    chatUsers,
    getCurrentChat,
    currentChat,
    createMessage,
    chatUser,
    setChatUser,
  } = chatContext;
  const [filteredUsers, setFilteredUsers] = useState(chatUsers);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    getChatUserList(user.sub);
    if (chatUser) {
      getCurrentChat(user.sub, chatUser.dog_id);
    }
    filterUsers(searchVal);
    //eslint-disable-next-line
  }, [chatUser, searchVal]);

  const filterUsers = (searchVal) => {
    const searchedUsers = chatUsers.filter((user) => {
      return user.name.toLowerCase().includes(searchVal.toLowerCase());
    });
    setFilteredUsers(searchedUsers);
  };

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
            {/* User that you are currently chatting with */}
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
            {/* Search bar for finding users with active chat */}
            {chatUsers.length ? (
              <UserSearch searchVal={searchVal} setSearchVal={setSearchVal} />
            ) : null}
          </Grid>
          <Divider />
          {/* Filtered List of users with active chats */}
          {filteredUsers.length ? (
            <UserList setChatUser={setChatUser} chatUsers={filteredUsers} />
          ) : null}
        </Grid>
        <Grid item={true} xs={9}>
          {/* Messages for the current chat being displayed */}
          <CurrentChat
            classes={classes}
            chatMessages={currentChat}
            dog={chatUser}
          />
          <Divider />
          {/* Area for sending a message */}
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
