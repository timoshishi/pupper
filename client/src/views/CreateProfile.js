import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user/userContext';

import {
  CreateProfile1,
  CreateProfile2,
  InterestChips,
  PhotoUpload,
  Stepper,
} from '../components/CreateProfile';

const CreateProfile = () => {
  const history = useHistory();
  const { user } = useAuth0();
  const userContext = useContext(UserContext);
  const { createUser, userId } = userContext;
  const [userInfo, setUserInfo] = useState({
    email: user.email,
    name: '',
    zip_code: 0,
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

  const [step, setStep] = useState(1);

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
    const userInterests = {};
    //transform booleans to insertable values
    Object.keys(interests).forEach((interest) =>
      interests[interest]
        ? (userInterests[interest] = 't')
        : (userInterests[interest] = 'f')
    );
    const userObj = {
      ...userInfo,
      interests: userInterests,
    };
    try {
      await createUser(userObj);
    } catch (err) {
      console.error('Error at CreateProfile handleSubmit');
    }
  };

  return (
    <>
      {!userId ? (
        <Box display='flex'>
          <Box m='auto' style={{ width: '80vw' }}>
            <h1>Create Profile</h1>
            <form noValidate autoComplete='off'>
              <div>
                {step === 1 && (
                  <CreateProfile1
                    handleFormData={handleFormData}
                    name={userInfo.name}
                    zip_code={userInfo.zip_code}
                  />
                )}
                {step === 2 && (
                  <CreateProfile2
                    handleFormData={handleFormData}
                    about={userInfo.about}
                    summary={userInfo.summary}
                  />
                )}
                {step === 3 && (
                  <PhotoUpload userInfo={userInfo} setUserInfo={setUserInfo} />
                )}
                {step === 4 && (
                  <InterestChips
                    handleInterests={handleInterests}
                    interests={interests}
                  />
                )}
                <Stepper
                  step={step}
                  setStep={setStep}
                  maxStep={4}
                  handleSubmit={handleSubmit}
                />
              </div>
            </form>
          </Box>
        </Box>
      ) : (
        history.push('/')
      )}
    </>
  );
};

export default CreateProfile;
