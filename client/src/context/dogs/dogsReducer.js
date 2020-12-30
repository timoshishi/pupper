import { GET_ALL_DOGS, GET_MATCHES } from '../types';

const dogsReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: payload,
      };
    case GET_MATCHES:
      return {
        ...state,
        matches: payload,
      };
    default:
      return state;
  }
};
export default dogsReducer;
