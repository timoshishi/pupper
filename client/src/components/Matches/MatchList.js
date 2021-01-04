import React from 'react';
import PropTypes from 'prop-types';
import Match from './Match';
import { Box, Divider, List } from '@material-ui/core';
import PuppyProfileModal from '../../PuppyPopup/PuppyProfileModal';
const MatchList = ({ matches, userId }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (dog) => {
    console.log(dog);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Divider />
      <List />
      <PuppyProfileModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
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
