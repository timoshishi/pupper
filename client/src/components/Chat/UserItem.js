import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
} from '@material-ui/core';

const UserItem = (props) => {
  return (
    <ListItem button key='RemySharp'>
      <ListItemIcon>
        <Avatar
          alt='Remy Sharp'
          src='https://material-ui.com/static/images/avatar/1.jpg'
        />
      </ListItemIcon>
      <ListItemText primary='John Wick'></ListItemText>
      <ListItemText secondary='online' align='right'></ListItemText>
    </ListItem>
  );
};

UserItem.propTypes = {};

export default UserItem;
