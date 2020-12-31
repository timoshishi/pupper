import React, { useEffect, useContext } from 'react';
import DogsContext from '../context/dogs/dogsContext';
import { useAuth0 } from '@auth0/auth0-react';
import { MatchList } from '../components/Matches';

const Matches = () => {
  const dogsContext = useContext(DogsContext);
  const { matches, getMatches, clearNewMatches } = dogsContext;
  const { user } = useAuth0();
  useEffect(() => {
    getMatches(user.sub);
    clearNewMatches();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Matches</h1>
      {matches.length ? (
        <MatchList
          matches={matches}
          userId={user.sub}
          clearNewMatches={clearNewMatches}
        />
      ) : null}
    </div>
  );
};

export default Matches;
