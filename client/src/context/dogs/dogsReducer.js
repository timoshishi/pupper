import { GET_ALL_DOGS } from '../types';

const dogsReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: payload,
      };
    default:
      return state;
  }
};
export default dogsReducer;
