import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
} from '@material-ui/core';

const UserItem = ({ dog }) => {
  return (
    <ListItem button key='RemySharp'>
      <ListItemIcon>
        <Avatar alt='Remy Sharp' src={dog.photos[0]} />
      </ListItemIcon>
      <ListItemText primary={dog.name}></ListItemText>
      <ListItemText
        secondary={Math.random() > 0.5 ? 'online' : null}
        align='right'></ListItemText>
    </ListItem>
  );
};

UserItem.propTypes = {
  dog: PropTypes.object.isRequired,
};

export default UserItem;
