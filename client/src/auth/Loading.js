import React from 'react';
import { CircularProgress } from '@material-ui/core';

const loadingImg =
  'https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg';

const Loading = () => <CircularProgress alt='Loading...' color='secondary' />;

export default Loading;
