import React, { useReducer } from 'react';
import DogsContext from './dogsContext';
import dogsReducer from './dogsReducer';
import { useAuth0 } from '@auth0/auth0-react';
// import UserContext from '../user/userContext';
import {
  GET_ALL_DOGS,
  GET_MATCHES,
  INCREMENT_NEW_MATCHES,
  CLEAR_NEW_MATCHES,
} from '../types';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const DogsState = (props) => {
  const initialState = {
    dogs: [],
    matches: [],
    newMatchCount: 0,
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
      dispatch({
        type: GET_ALL_DOGS,
        payload: data.dogs,
      });
      return;
    } catch (err) {
      console.error('Error @ DogsState getUser', err.message);
    }
  };

  /* Returns an array of all dog matches for the current user */
  const getMatches = async (userId) => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${serverUrl}/api/dogs/match/${userId}`,
        options
      );
      const data = await response.json();
      dispatch({
        type: GET_MATCHES,
        payload: data,
      });
      return;
    } catch (err) {
      console.error('Error @ DogsState getMatches', err.message);
    }
  };

  /* Creates a match with current user and current dog ID, returns an array of all matches */
  const createMatch = async (userId, dogId) => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${serverUrl}/api/dogs/match/${userId}/${dogId}`,
        options
      );
      const data = await response.json();
      dispatch({
        type: GET_MATCHES,
        payload: data,
      });
      return;
    } catch (err) {
      console.error('Error @ DogsState getMatches', err.message);
    }
  };

  /* Add a match to local state for display on the navbar badge */
  const incrementNewMatches = () => {
    dispatch({
      type: INCREMENT_NEW_MATCHES,
      payload: null,
    });
  };

  const clearNewMatches = () => {
    dispatch({
      type: CLEAR_NEW_MATCHES,
      payload: null,
    });
  };

  return (
    <DogsContext.Provider
      value={{
        dogs: state.dogs,
        matches: state.matches,
        newMatchCount: state.newMatchCount,
        getAllDogs,
        getMatches,
        createMatch,
        incrementNewMatches,
        clearNewMatches,
      }}>
      {props.children}
    </DogsContext.Provider>
  );
};

export default DogsState;
