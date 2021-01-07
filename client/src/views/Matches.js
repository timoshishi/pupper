import React, { useEffect, useContext } from 'react';
import DogsContext from '../context/dogs/dogsContext';
import { useAuth0 } from '@auth0/auth0-react';
import { MatchList } from '../components/Matches';
import { Box, Typography, Paper } from '@material-ui/core';

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
    <Box display='flex' alignContent='center' justifyContent='center'>
      <Box width='40vw' my={2}>
        <Paper>
          <Typography variant='h3'>Matches</Typography>
          {matches.length ? (
            <MatchList
              matches={matches}
              userId={user.sub}
              clearNewMatches={clearNewMatches}
            />
          ) : null}
        </Paper>
      </Box>
    </Box>
  );
};

export default Matches;
