import {
  GET_ALL_DOGS,
  GET_MATCHES,
  INCREMENT_NEW_MATCHES,
  CLEAR_NEW_MATCHES,
} from '../types';

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
    case INCREMENT_NEW_MATCHES:
      return {
        ...state,
        newMatchCount: state.newMatchCount + 1,
      };
    case CLEAR_NEW_MATCHES:
      return {
        ...state,
        newMatchCount: 0,
      };
    default:
      return state;
  }
};
export default dogsReducer;
