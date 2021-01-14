import React from 'react';
import { Card, Box, Typography, CardMedia } from '@material-ui/core';
import { SignupButton } from '../components/AuthButtons';
import { makeStyles } from '@material-ui/core/styles';
import LoginButton from '../components/AuthButtons/LoginButton';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: '50vh',
    width: '50vh',
    margin: '2rem',
  },
  header: {},
  buttons: {
    margin: '1rem',
  },
});

const Landing = (props) => {
  const classes = useStyles();
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      my={6}
      className={classes.header}>
      <Card elevation={3}>
        <Box justifyContent='center' display='flex' flexDirection='column'>
          <Typography variant='h1'>Pupper</Typography>
          <CardMedia
            image='puppy-svg.svg'
            title='Puppy with love'
            className={classes.media}
          />

          <LoginButton />
          <SignupButton>Sign Up</SignupButton>
        </Box>
      </Card>
    </Box>
  );
};

export default Landing;
