import { GET_USER_INFO, GET_USER_ID } from '../types';

const userReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_USER_INFO:
      return {
        ...state,
        userId: payload.user_id,
        userInfo: payload,
      };
    case GET_USER_ID:
      return {
        ...state,
        userId: payload,
      };
    default:
      return state;
  }
};
export default userReducer;
