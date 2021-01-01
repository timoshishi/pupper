import React from 'react';
import PropTypes from 'prop-types';
import Match from './Match';
import { Box, Divider, List } from '@material-ui/core';
const MatchList = ({ matches, userId }) => {
  return (
    <Box>
      <Divider />
      <List />
      {matches.map((dog) => (
        <Match
          key={Math.floor(Math.random() * Date.now())}
          dog={dog}
          userId={userId}
        />
      ))}
    </Box>
  );
};

MatchList.propTypes = {
  matches: PropTypes.array.isRequired,
  clearNewMatches: PropTypes.func.isRequired,
};

export default MatchList;
