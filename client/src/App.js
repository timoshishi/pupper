import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { NavBar, Footer, Loading } from './components/index.js';
import { Home, ExternalApi, Landing } from './views/index.js';
import ProtectedRoute from './auth/ProtectedRoute';
import { useAuth0 } from '@auth0/auth0-react';
import { Container } from '@material-ui/core';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <NavBar />
      <Switch>
        <Route path='/' exact component={!isAuthenticated ? Landing : Home} />
        <ProtectedRoute path='/' exact component={Home} />
        <ProtectedRoute path='/external-api' component={ExternalApi} />
      </Switch>
      <Footer />
    </Container>
  );
}

export default withRouter(App);
