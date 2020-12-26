import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user/userContext';

import {
  CreateProfile1,
  CreateProfile2,
  CreateProfile3,
} from '../components/CreateProfile';

const CreateProfile = (props) => {
  const { user } = useAuth0();
  const history = useHistory();
  const userContext = useContext(UserContext);
  const { createUser } = userContext;
  const [userInfo, setUserInfo] = useState({
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

  const [step, setStep] = useState(3);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const userInterests = {};
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
      const res = await createUser(userObj);
      await console.log({ res });
      history.push('/home');
    } catch (err) {
      console.error('Error at CreateProfile handleSubmit');
    }
  };

  return (
    <Box display='flex'>
      <Box m='auto' style={{ width: '80vw' }}>
        <h1>Create Profile</h1>
        <form noValidate autoComplete='off' onSubmit={onSubmit}>
          <div>
            {step === 1 && (
              <CreateProfile1
                step={step}
                setStep={setStep}
                handleFormData={handleFormData}
                name={userInfo.name}
                zip_code={userInfo.zip_code}
              />
            )}

            {step === 2 && (
              <CreateProfile2
                step={step}
                setStep={setStep}
                handleFormData={handleFormData}
                about={userInfo.about}
                summary={userInfo.summary}
              />
            )}
            {step === 3 && (
              <CreateProfile3
                step={step}
                setStep={setStep}
                handleInterests={handleInterests}
                interests={interests}
              />
            )}
          </div>
        </form>
      </Box>
    </Box>
  );
};

CreateProfile.propTypes = {};

export default CreateProfile;
