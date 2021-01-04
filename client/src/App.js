import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { NavBar, Footer, Loading } from './components/index.js';
import Landing from './views/Landing';
import Home from './views/Home';
import ProtectedRoute from './auth/ProtectedRoute';
import { useAuth0 } from '@auth0/auth0-react';
import { Container } from '@material-ui/core';
import CreateProfile from './views/CreateProfile';
import { Chat, Matches, UserProfile } from './views';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <Container>
        <Switch>
          <Route path='/' exact component={isAuthenticated ? Home : Landing} />
          <ProtectedRoute path='/' exact component={Home} />
          <ProtectedRoute
            path='/create-profile'
            exact
            component={CreateProfile}
          />
          <ProtectedRoute path='/matches' exact component={Matches} />
          <ProtectedRoute path='/chat' component={Chat} />
          <ProtectedRoute patch='/profile' component={UserProfile} />
        </Switch>
      </Container>
    </>
  );
}

export default withRouter(App);
