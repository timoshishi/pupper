import React, { useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import { GET_USER_INFO, SET_CHAT_USER } from '../types';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const UserState = (props) => {
  const initialState = {
    userId: null,
    userInfo: null,
  };
  const { getAccessTokenSilently, user } = useAuth0();
  const history = useHistory();
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUser = async (userId) => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${serverUrl}/api/users/${user.sub}`,
        options
      );
      if (response.status === 204) {
        return history.push('/create-profile');
      } else {
        const data = await response.json();
        dispatch({
          type: GET_USER_INFO,
          payload: data,
        });
        history.push('/');
        return;
      }
    } catch (err) {
      console.error('Error @ UserState getUser', err.message);
    }
  };

  const createUser = async (userObj) => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj),
      };
      await fetch(`${serverUrl}/api/users/create`, options);

      history.push('/');
      return;
    } catch (err) {
      return console.error('Error @ UserState createUser', err.message);
    }
  };
  const setChatUser = (userObj) => {
    dispatch({
      type: SET_CHAT_USER,
      payload: userObj,
    });
  };

  return (
    <UserContext.Provider
      value={{
        userInfo: state.userInfo,
        userId: state.userId,
        getUser,
        createUser,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
