import {} from '../types';

const userReducer = (state, action) => {
  // const { payload, type } = action;
  switch (action.type) {
    // case SET_ALERT:
    //   return [...state, action.payload];
    // case REMOVE_ALERT:
    //   return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};
export default userReducer;
