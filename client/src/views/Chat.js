import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {
  UserItem,
  Message,
  MessageInputArea,
  UserSearch,
} from '../components/Chat';
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

const Chat = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item={true} xs={12}>
          <Typography variant='h5' className='header-message'>
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item={true} xs={3} className={classes.borderRight500}>
          <List>
            <UserItem id='current-chat-user' />
          </List>
          <Divider />
          <Grid item={true} xs={12} style={{ padding: '10px' }}>
            <UserSearch />
          </Grid>
          <Divider />
          <List id='user-chats'>
            <UserItem />
            <UserItem />
          </List>
        </Grid>
        <Grid item={true} xs={9}>
          <List className={classes.messageArea} id='current-chat'>
            <Message />
            <Message />
            <Message />
            <Message />
          </List>
          <Divider />
          <MessageInputArea />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
