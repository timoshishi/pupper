import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user/userContext';

import {
  SpeciesDistanceSelectStep,
  AboutMeStep,
  InterestsStep,
  Stepper,
} from '../components/CreateProfile';

const CreateProfile = () => {
  const history = useHistory();
  const { user } = useAuth0();
  const userContext = useContext(UserContext);
  const { createUser, userId } = userContext;
  const [userInfo, setUserInfo] = useState({
    user_id: user.sub,
    email: user.email,
    name: '',
    zip_code: '',
    about: '',
    summary: '',
    photos: [],
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
  });

  const [interests, setInterests] = useState({
    walkies: false,
    scritches: false,
    the_beach: false,
    playing_fetch: false,
    nap_time: false,
    running: false,
    frolicking: false,
    cuddles: false,
    wrestling: false,
    tug_of_war: false,
  });
  const handleFormData = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterests = (interest) => {
    setInterests({
      ...interests,
      [interest]: !interests.interest,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userObj = {
      ...userInfo,
      zip_code: parseInt(userInfo.zip_code),
      interests,
    };
    try {
      await createUser(userObj);
    } catch (err) {
      console.error('Error at CreateProfile handleSubmit');
    }
  };
  //Stepper Props
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <>
      {!userId ? (
        <Box display='flex' align='center' justify='center'>
          <Box m='auto' style={{ width: '70vw' }}>
            <Box my={3}>
              <Typography variant='h2'>Create Profile</Typography>
            </Box>
            <form noValidate autoComplete='off' style={{ minHeight: '30vh' }}>
              <div>
                {activeStep === 0 && (
                  <SpeciesDistanceSelectStep
                    handleFormData={handleFormData}
                    zip_code={userInfo.zip_code}
                  />
                )}
                {activeStep === 1 && (
                  <AboutMeStep
                    name={userInfo.name}
                    handleFormData={handleFormData}
                    about={userInfo.about}
                    summary={userInfo.summary}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                  />
                )}
                {activeStep === 2 && (
                  <InterestsStep
                    isForm={true}
                    handleInterests={handleInterests}
                    interests={interests}
                  />
                )}
              </div>
            </form>
            <Stepper
              handleSubmit={handleSubmit}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </Box>
        </Box>
      ) : (
        history.push('/')
      )}
    </>
  );
};

export default CreateProfile;
