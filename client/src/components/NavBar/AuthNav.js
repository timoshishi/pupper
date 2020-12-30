import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { Link } from 'react-router-dom';

const AuthNav = () => {
  return (
    <>
      <IconButton aria-label='show 4 new mails' color='inherit'>
        <Badge badgeContent={4} color='secondary'>
          <ChatIcon />
        </Badge>
      </IconButton>
      <Link to='/matches' style={{ color: 'white' }}>
        <IconButton aria-label='show 17 new notifications' color='inherit'>
          <Badge badgeContent={17} color='secondary'>
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
