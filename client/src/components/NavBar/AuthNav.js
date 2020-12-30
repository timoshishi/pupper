import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const AuthNav = () => {
  return (
    <>
      <IconButton aria-label='show 4 new mails' color='inherit'>
        <Badge badgeContent={4} color='secondary'>
          <ChatIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label='show 17 new notifications' color='inherit'>
        <Badge badgeContent={17} color='secondary'>
          <PeopleAltIcon />
        </Badge>
      </IconButton>
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
