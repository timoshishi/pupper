import React, { useContext, useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { Link, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  const [matchCount, setMatchCount] = useState(newMatchCount);
  useEffect(() => {
    setMatchCount(newMatchCount);
  }, [newMatchCount]);

  return (
    <>
      {pathname !== '/create-profile' && (
        <>
          <Link to='/chat' style={{ color: 'white' }}>
            <IconButton
              aria-label='messages'
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
          <Link to='/profile' style={{ color: 'white' }}>
            <IconButton
              edge='end'
              aria-label='account'
              aria-haspopup='true'
              color='inherit'>
              <AccountCircle />
            </IconButton>
          </Link>
        </>
      )}
    </>
  );
};

export default AuthNav;
