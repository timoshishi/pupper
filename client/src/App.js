import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { NavBar, Footer, Loading } from './components/index.js';
import Landing from './views/Landing';
import Home from './Home';
import ProtectedRoute from './auth/ProtectedRoute';
import { useAuth0 } from '@auth0/auth0-react';
import { Container } from '@material-ui/core';
import CreateProfile from './views/CreateProfile';

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
        </Switch>
        <Footer />
      </Container>
    </>
  );
}

export default withRouter(App);
