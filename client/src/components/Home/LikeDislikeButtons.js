import React from 'react';
import { IconButton, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Done, Clear } from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: '50%',
    backgroundColor: 'white',
    border: '1px solid black',
    marginRight: '2rem',
    marginLeft: '2rem',
    opacity: '.5',
  },
  done: {
    color: 'green',
    fontSize: '3rem',
    fontWeight: 'bold',
    opacity: '1',
  },
  clear: {
    fontSize: '3rem',
    color: 'red',
  },
}));

const LikeDislikeButtons = () => {
  const classes = useStyles();
  return (
    <Box display='flex' justifyContent='center' align='center'>
      <IconButton className={(classes.button, 'dislikeButton')}>
        <Clear className={classes.clear} />
      </IconButton>
      <IconButton className={(classes.button, 'likeButton')}>
        <Done className={classes.done} />
      </IconButton>
    </Box>
  );
};

LikeDislikeButtons.propTypes = {};
export default LikeDislikeButtons;
