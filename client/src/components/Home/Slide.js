import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Favorite, Share, ExpandMore, MoreVert } from '@material-ui/icons';
import { InterestsStep } from '../CreateProfile';
import UserContext from '../../context/user/userContext';

const zipApiKey = process.env.REACT_APP_ZIP_API_KEY;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: `80vh`,
  },
  media: {
    height: 0,
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

const Slide = ({ dog }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [distance, setDistance] = useState(null);
  const { userInfo } = useContext(UserContext);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const getDistance = async () => {
    const proxyUrl = 'https://secure-island-98608.herokuapp.com/';
    var url = `https://www.zipcodeapi.com/rest/Lgz5EpY4q1TDKZbcPU4zfombbq4FdIwQV6lEDMgVNUsydGdkYsGzvudkDr1YNmLh/distance.json/48104/${dog.zip_code}/mile`;

    try {
      const response = await fetch(proxyUrl + url);
      const { distance } = await response.json();
      setDistance(distance);
      await console.log({ distance });
    } catch (err) {
      console.error('Error @getDistance', err.message);
    }
  };
  useEffect(() => {
    // getDistance();
  }, [dog]);
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={dog.photos[0]}
        title='puppy'
      />
      <CardHeader
        action={
          <IconButton aria-label='settings'>
            <MoreVert />
          </IconButton>
        }
        title={dog.name}
        subheader={dog.title}
      />
      <CardContent>
        <Typography>{dog.breed}</Typography>
        <InterestsStep interests={dog.interests} isForm={false} />
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'></Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <Favorite />
        </IconButton>
        <IconButton aria-label='share'>
          <Share />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>{dog.about}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

Slide.propTypes = {
  dog: PropTypes.object.isRequired,
};

export default Slide;
