import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { NavBar, Footer, Loading } from './components';
import { Home, ExternalApi, Landing, Profile } from './views';
import ProtectedRoute from './auth/ProtectedRoute';
import { useAuth0 } from '@auth0/auth0-react';
import { Container } from '@material-ui/core';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Landing} />
        <ProtectedRoute path='/profile' component={Profile} />
        <ProtectedRoute path='/home' exact component={Home} />
        <ProtectedRoute path='/external-api' component={ExternalApi} />
      </Switch>
      <Footer />
    </Container>
  );
}

export default withRouter(App);
