import React from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';
import { List } from '@material-ui/core';
const UserList = ({ chatUsers, setChatUser }) => {
  return (
    <List id='user-chats'>
      {chatUsers.map((dog) => (
        <UserItem
          key={`dog_id_${dog.dog_id}`}
          dog={dog}
          setChatUser={setChatUser}
        />
      ))}
    </List>
  );
};

UserList.propTypes = {
  chatUsers: PropTypes.array.isRequired,
  setChatUser: PropTypes.func.isRequired,
};

export default UserList;
