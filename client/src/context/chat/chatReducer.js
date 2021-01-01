import {
  CREATE_MESSAGE,
  GET_CURRENT_CHAT,
  GET_CHAT_USER_LIST,
  SET_CHAT_USER,
} from '../types';

const chatReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case CREATE_MESSAGE:
      return {
        ...state,
      };
    case GET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: payload,
      };
    case GET_CHAT_USER_LIST:
      return {
        ...state,
        chatUsers: payload,
      };
    case SET_CHAT_USER:
      return {
        ...state,
        chatUser: payload,
      };
    default:
      return state;
  }
};
export default chatReducer;
