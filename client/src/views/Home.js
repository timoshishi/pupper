import React, { Fragment, useEffect, useContext } from 'react';
import { Swiper } from '../components/Home';
import { useAuth0 } from '@auth0/auth0-react';
import UserContext from '../context/user/userContext';
import DogsContext from '../context/dogs/dogsContext';
import Loading from '../auth/Loading';

const Home = () => {
  const { user } = useAuth0();

  const userContext = useContext(UserContext);
  const { getUser, userId } = userContext;
  const dogsContext = useContext(DogsContext);
  const { getAllDogs, dogs, getMatches } = dogsContext;
  useEffect(() => {
    getUser(user.sub);
    getAllDogs();
    getMatches(user.sub);
    // eslint-disable-next-line
  }, []);

  if (!userId) return <Loading />;

  return (
    <Fragment>
      {dogs.length ? <Swiper dogs={dogs} /> : <Loading />}
      {/* <Hero /> */}
      {/* <HomeContent /> */}
    </Fragment>
  );
};

export default Home;
