import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, IconButton } from '@material-ui/core';
import { red, white } from '@material-ui/core/colors';
import { InfoOutlined } from '@material-ui/icons';

const zipApiKey = process.env.REACT_APP_ZIP_API_KEY;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: `80vw`,
    minWidth: '80vw',
    zIndex: 1,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  header: {
    marginTop: '-7rem',
    color: 'white',
  },
}));

const Slide = ({ dog, handleOpen }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={dog.photos[0]}
        title='puppy'
      />
      <CardHeader
        action={
          <IconButton
            aria-label='more-info'
            onClick={() => handleOpen(dog)}
            size='medium'>
            <InfoOutlined style={{ color: 'white' }} fontSize='large' />
          </IconButton>
        }
        align='left'
        title={dog.name}
        titleTypographyProps={{
          variant: 'h3',
        }}
        className={classes.header}
      />
    </Card>
  );
};

Slide.propTypes = {
  dog: PropTypes.object.isRequired,
};

export default Slide;
