import React, { useReducer } from 'react';
import ChatContext from './chatContext';
import chatReducer from './chatReducer';
import { useAuth0 } from '@auth0/auth0-react';
import {
  GET_CURRENT_CHAT,
  GET_CHAT_USER_LIST,
  SET_CHAT_USER,
  INCREMENT_NEW_MESSAGE_COUNT,
  CLEAR_NEW_MESSAGE_COUNT,
} from '../types';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const ChatState = (props) => {
  const initialState = {
    currentChat: [],
    chatUsers: [],
    chatUser: null,
    newMessageCount: 0,
  };
  const { getAccessTokenSilently } = useAuth0();
  const [state, dispatch] = useReducer(chatReducer, initialState);

  //CREATES A MESSAGE IN THE CURRENTLY SELECTED CHAT
  //Input: {from_human, user_id, dog_id, body}
  const createMessage = async (messageObj) => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageObj),
      };
      await fetch(`${serverUrl}/api/chat`, options);
      return;
    } catch (err) {
      return console.error('Error @ ChatState createUser', err.message);
    }
  };

  //GETS A UNIQUE LIST OF DOGS THAT HAVE CHATS WITH THE CURRENT USER
  const getChatUserList = async (userId) => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${serverUrl}/api/chat/chat-list/${userId}`,
        options
      );
      const dogs = await response.json();
      dispatch({
        type: GET_CHAT_USER_LIST,
        payload: dogs,
      });
      return;
    } catch (err) {
      console.error('Error @ ChatState getUser', err.message);
    }
  };
  //GETS ALL MESSAGES FOR CURRENTLY SELECTED CHAT
  const getCurrentChat = async (userId, dogId) => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${serverUrl}/api/chat/current/${userId}/${dogId}`,
        options
      );
      const messages = await response.json();
      dispatch({
        type: GET_CURRENT_CHAT,
        payload: messages,
      });
      return;
    } catch (err) {
      console.error('Error @ ChatState getUser', err.message);
    }
  };
  //Set the currently displayed chat user on the UserList in Chat
  const setChatUser = (userObj) => {
    dispatch({
      type: SET_CHAT_USER,
      payload: userObj,
    });
  };
  //ADD TO THE NEW MESSAGE COUNT
  const incrementNewMessageCount = () => {
    return dispatch({
      type: INCREMENT_NEW_MESSAGE_COUNT,
      payload: null,
    });
  };
  const clearNewMessageCount = () => {
    return dispatch({
      type: CLEAR_NEW_MESSAGE_COUNT,
      payload: null,
    });
  };
  return (
    <ChatContext.Provider
      value={{
        currentChat: state.currentChat,
        chatUsers: state.chatUsers,
        chatUser: state.chatUser,
        newMessageCount: state.newMessageCount,
        createMessage,
        getCurrentChat,
        getChatUserList,
        setChatUser,
        clearNewMessageCount,
        incrementNewMessageCount,
      }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
