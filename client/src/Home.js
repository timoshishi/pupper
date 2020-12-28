import React, { Fragment, useEffect, useContext } from 'react';
import { Hero, HomeContent } from './components';
import { useAuth0 } from '@auth0/auth0-react';
import UserContext from './context/user/userContext';
import Loading from './auth/Loading';

const Home = () => {
  const { user } = useAuth0();
  const userContext = useContext(UserContext);
  const { getUser, userId } = userContext;

  useEffect(() => {
    getUser(user.email);
    // eslint-disable-next-line
  }, []);

  if (!userId) return <Loading />;

  return (
    <Fragment>
      <Hero />
      <HomeContent />
    </Fragment>
  );
};

export default Home;
