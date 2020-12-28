import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import //   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   USER_LOADED,
//   AUTH_ERROR,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT,
//   CLEAR_ERRORS,
'../types';

const AuthState = (props) => {
  const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
  };
  //allows us to access state and to dispatch state to the reducer
  const [state, dispatch] = useReducer(authReducer, initialState);
  // Load User

  //Register User

  //Login User

  //Logout

  //Clear Error
  return (
    //Anything that we need to use later from context must be added in as a value
    //this includes functions
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
