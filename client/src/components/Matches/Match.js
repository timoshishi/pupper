import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Divider,
  ListItem,
  ListItemIcon,
  Typography,
  IconButton,
  // Badge,
  Box,
  ListItemSecondaryAction,
} from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
const Match = ({ dog, userId }) => {
  return (
    <>
      <ListItem>
        <Box display='flex'>
          <ListItemIcon>
            <Avatar src={dog.photos[0]} alt={dog.name} />
          </ListItemIcon>
          <div>
            <Typography>{dog.name}</Typography>
            <Typography>Breed: {dog.breed}</Typography>
          </div>
          <ListItemSecondaryAction style={{ marginRight: '1rem' }}>
            <Link to={`/chat`}>
              <IconButton aria-label={`Show new notifications`} edge='end'>
                {/* <Badge badgeContent={17} color='secondary'> */}
                <ForumIcon />
                {/* </Badge> */}
              </IconButton>
            </Link>
          </ListItemSecondaryAction>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

Match.propTypes = {
  dog: PropTypes.object.isRequired,
};

export default Match;
