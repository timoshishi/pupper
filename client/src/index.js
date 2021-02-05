import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'fontsource-roboto';
import App from './App';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import { CssBaseline } from '@material-ui/core';
import UserState from './context/user/UserState';
import DogsState from './context/dogs/DogsState';
import ChatState from './context/chat/ChatState';

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <UserState>
        <DogsState>
          <ChatState>
            <CssBaseline />
            <App />
          </ChatState>
        </DogsState>
      </UserState>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
