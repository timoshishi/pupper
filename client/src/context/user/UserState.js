import React, { useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { GET_USER_INFO, GET_USER_ID } from '../types';
// import { GET_USER_INFO } from '../types';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const UserState = (props) => {
  const initialState = {
    userId: null,
    userInfo: null,
  };
  const { getAccessTokenSilently } = useAuth0();

  // eslint-disable-next-line
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUserId = async (email) => {
    console.log({ email });
    try {
      const token = await getAccessTokenSilently();
      console.log({ token });
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      };
      const response = await fetch(`${serverUrl}/api/users/`, options);
      const data = await response.json();

      await console.log({ data });
      await dispatch({
        type: GET_USER_INFO,
        payload: data,
      });
      return response;
    } catch (err) {
      console.error('Error @ UserState getUserId', err.message);
    }
  };

  const createUser = async (userObj) => {
    try {
      const token = await getAccessTokenSilently();

      const response = axios({
        method: 'post',
        url: `${serverUrl}/api/users/create`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: userObj,
      });
      const user = await response;
      await dispatch({
        type: GET_USER_INFO,
        payload: user,
      });
    } catch (err) {
      return console.error('Error @ UserState createUser', err.message);
    }
  };
  /*  
const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${serverUrl}/api/messages/protected-message`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
*/
  return (
    <UserContext.Provider
      value={{
        userInfo: state.userInfo,
        getUserId,
        createUser,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
