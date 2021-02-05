import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AuthNav from './AuthNav';
import AuthenticationButton from '../AuthButtons/authentication-button';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: '1rem',
  },
  logo: {
    height: '2rem',
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth0();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <img src='puppy-svg.svg' alt='logo' className={classes.logo} />
          </Link>
          <Typography variant='h6' className={classes.title}>
            Pupper
          </Typography>

          {isAuthenticated && <AuthNav />}
          <Box mx={2}>
            <AuthenticationButton color='white' />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
