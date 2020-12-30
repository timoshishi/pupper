import React, { useEffect, useContext } from 'react';
import { Loading } from '../components';
import DogsContext from '../context/dogs/dogsContext';
import { useAuth0 } from '@auth0/auth0-react';
const Matches = () => {
  const dogsContext = useContext(DogsContext);
  const { matches, getMatches } = dogsContext;
  const { user } = useAuth0();
  useEffect(() => {
    getMatches(user.sub);
  }, []);

  if (!matches.length) {
    return <Loading />;
  }
  return (
    <div>
      <h1>Matches</h1>
      {matches.length && <pre>{JSON.stringify(matches)}</pre>}
    </div>
  );
};

Matches.propTypes = {};

export default Matches;
