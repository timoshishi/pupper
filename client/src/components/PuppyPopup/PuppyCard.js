import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Favorite, Share } from '@material-ui/icons';
import { InterestsStep } from '../CreateProfile';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '70vh',
  },
  media: {
    width: 'auto',
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const firstToUpperCase = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;
const Slide = ({ dog }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={dog.name} subheader={dog.title}></CardHeader>
      <CardMedia
        className={classes.media}
        image={dog.photos[0]}
        title='puppy'
      />
      <CardContent>
        <Box display='flex'>
          <Box mr={6}>
            <Typography variant='subtitle1'>
              {firstToUpperCase(dog.breed)}
            </Typography>
          </Box>
          <InterestsStep isForm={false} interests={dog.interests} />
        </Box>
        <Typography>{dog.about}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <Favorite />
        </IconButton>
        <IconButton aria-label='share'>
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};

Slide.propTypes = {
  dog: PropTypes.object.isRequired,
};

export default Slide;
