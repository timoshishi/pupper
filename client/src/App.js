import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { NavBar, Footer, Loading } from './components';
import { Home, Profile, ExternalApi } from './views';
import ProtectedRoute from './auth/protected-route';

import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

function App(props) {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id='app' className='d-flex flex-column h-100'>
      <NavBar />
      <div className='container flex-grow-1'>
        <Switch>
          <Route path='/' exact component={Home} />
          <ProtectedRoute path='/profile' component={Profile} />
          <ProtectedRoute path='/external-api' component={ExternalApi} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(App);
// import { AuthConfig } from 'react-use-auth';
// import { Auth0 } from 'react-use-auth/auth0';
// import Home from './components/Home';
// import AUTHCallback from './components/AUTHCallback';

// <AuthConfig
//   authProvider={Auth0}
//   navigate={props.history.push}
//   params={{
//     domain: process.env.REACT_APP_AUTH_DOMAIN,
//     clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
// }}>
// </AuthConfig>
