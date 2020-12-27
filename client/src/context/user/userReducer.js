import { GET_USER_INFO, GET_USER_ID } from '../types';

const userReducer = (state, action) => {
  console.log('STARTING');

  const { payload, type } = action;
  switch (type) {
    case GET_USER_INFO:
      console.log('USER INFO');
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
    // case SET_ALERT:
    //   return [...state, action.payload];
    // case REMOVE_ALERT:
    //   return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};
export default userReducer;
