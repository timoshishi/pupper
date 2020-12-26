import React, { Fragment, useEffect, useContext } from 'react';
import { Hero, HomeContent } from './components';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import UserContext from './context/user/userContext';

const Home = () => {
  const { user } = useAuth0();
  const userContext = useContext(UserContext);
  const { getUserId } = userContext;
  const history = useHistory();
  useEffect(() => {
    getUserId(user.email)
      .then((res) => {
        if (res.status === 204) {
          history.push('/create-profile');
        }
      })
      .catch((err) => console.error('At Home useEffect', err.message));
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Hero />
      <HomeContent />
    </Fragment>
  );
};

export default Home;
