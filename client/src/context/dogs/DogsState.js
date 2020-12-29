import React, { useReducer } from 'react';
import DogsContext from './dogsContext';
import dogsReducer from './dogsReducer';
import { useAuth0 } from '@auth0/auth0-react';

import { GET_ALL_DOGS } from '../types';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const DogsState = (props) => {
  const initialState = {
    dogs: [],
  };
  const { getAccessTokenSilently } = useAuth0();
  const [state, dispatch] = useReducer(dogsReducer, initialState);

  const getAllDogs = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`${serverUrl}/api/dogs/`, options);
      const data = await response.json();
      console.log({ data });
      dispatch({
        type: GET_ALL_DOGS,
        payload: data.dogs,
      });
      return;
    } catch (err) {
      console.error('Error @ DogsState getUser', err.message);
    }
  };

  return (
    <DogsContext.Provider
      value={{
        dogs: state.dogs,
        getAllDogs,
      }}>
      {props.children}
    </DogsContext.Provider>
  );
};

export default DogsState;
