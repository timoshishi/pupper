import React, { useContext, useState } from 'react';
import UserContext from '../context/user/userContext';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Loading } from '../components';
import { InterestsStep } from '../components/CreateProfile';
const Profile = () => {
  const { userInfo, getUser } = useContext(UserContext);
  const [filteredInterests, setFilteredInterests] = useState(
    userInfo.interests
  );
  const { about, interests, name, photos, summary, zip_code } = userInfo;
  if (!userInfo) {
    return <Loading />;
  }
  return (
    <Box my={4}>
      <Grid container my={4} justify='center' spacing={6}>
        {userInfo ? (
          <>
            <Grid item>
              <Box
                display='flex'
                justify='center'
                align='center'
                flexDirection='column'>
                <Typography variant='h4' style={{ margin: '1rem' }}>
                  {name}
                </Typography>
                <img
                  src={photos[0]}
                  alt='Profile'
                  style={{ maxWidth: '30vw', margin: 'auto' }}
                />{' '}
              </Box>
            </Grid>
            <Grid item my={4} height='100%'>
              <Box
                display='flex'
                flexDirection='column'
                justify='space-around'
                align='center'
                my={3}>
                <Box>
                  <Typography variant='h5'>{summary}</Typography>
                  <Typography style={{ margin: '1rem' }}>{about}</Typography>
                  <Typography>Location: {zip_code}</Typography>
                </Box>

                <Box style={{ marginTop: '2rem' }}>
                  <InterestsStep isForm={false} interests={interests} />
                </Box>
                <Button style={{ marginTop: '6rem' }} variant='outlined'>
                  Edit Profile
                </Button>
              </Box>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Box>
  );
};

export default Profile;
