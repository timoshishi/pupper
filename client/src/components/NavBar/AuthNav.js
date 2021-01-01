import React, { useContext, useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { Link } from 'react-router-dom';
import DogsContext from '../../context/dogs/dogsContext';
import ChatContext from '../../context/chat/chatContext';
import { useAuth0 } from '@auth0/auth0-react';

const AuthNav = () => {
  const dogsContext = useContext(DogsContext);
  const { newMatchCount } = dogsContext;
  const chatContext = useContext(ChatContext);
  const {
    newMessageCount,
    clearNewMessageCount,
    getChatUserList,
  } = chatContext;
  const { user } = useAuth0();
  const [matchCount, setMatchCount] = useState(newMatchCount);
  useEffect(() => {
    setMatchCount(newMatchCount);
  }, [newMatchCount]);

  return (
    <>
      <Link to='/chat' style={{ color: 'white' }}>
        <IconButton
          aria-label='show 4 new mails'
          color='inherit'
          onClick={async () => {
            await getChatUserList(user.sub);
            clearNewMessageCount();
          }}>
          <Badge badgeContent={newMessageCount} color='secondary'>
            <ChatIcon />
          </Badge>
        </IconButton>
      </Link>
      <Link to='/matches' style={{ color: 'white' }}>
        <IconButton aria-label='show 17 new notifications' color='inherit'>
          <Badge badgeContent={matchCount} color='secondary'>
            <PeopleAltIcon />
          </Badge>
        </IconButton>
      </Link>
      <IconButton
        edge='end'
        aria-label='account of current user'
        aria-haspopup='true'
        color='inherit'>
        <AccountCircle />
      </IconButton>
    </>
  );
};

export default AuthNav;
