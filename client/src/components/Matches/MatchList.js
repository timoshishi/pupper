import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Match from './Match';
import { Box, Divider, List } from '@material-ui/core';
import PuppyModal from '../PuppyPopup/PuppyModal';
const MatchList = ({ matches, userId }) => {
  const [open, setOpen] = useState(false);
  const [dog, setDog] = useState(null);
  const handleOpen = (dog) => {
    setDog(dog);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Divider />
      <List />
      <PuppyModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        dog={dog}
      />
      {matches.map((dog) => (
        <Match
          key={Math.floor(Math.random() * Date.now())}
          dog={dog}
          userId={userId}
          handleOpen={handleOpen}
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
