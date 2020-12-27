import React, { useContext } from 'react';
import UserContext from '../../context/user/userContext';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;
const HomeContent = () => {
  const userContext = useContext(UserContext);
  const { userId } = userContext;
  const { getAccessTokenSilently } = useAuth0();

  const handleImageUpload = async (e) => {
    try {
      const token = await getAccessTokenSilently();
      const files = e.target.files;
      console.log(files);
      const formData = new FormData();

      formData.append('image', files[0]);
      console.log('etarte', formData.getAll('image'));

      const options = {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // const response = await axios.post(
      //   `${serverUrl}/api/users/photos/${userId}`,
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       'Content-Type': 'application/octet-stream',
      //     },
      //   }
      // );
      const response = await fetch(
        `${serverUrl}/api/users/photos/${userId}`,
        options
      );
      const data = await response.json();
      await console.log({ data });
    } catch (err) {
      return console.error('@handleImageUpload', err.message);
    }
  };

  return (
    <div>
      <h2>What can I do next?</h2>
      <input type='file' id='file-upload' onChange={handleImageUpload} />

      <div>
        <div>
          <h6 className=''>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://auth0.com/docs/connections'>
              <i className='fas fa-link mr-2' />
              Configure other identity providers
            </a>
          </h6>
          <p>
            Auth0 supports social providers as Facebook, Twitter, Instagram and
            100+, Enterprise providers as Microsoft Office 365, Google Apps,
            Azure, and more. You can also use any OAuth2 Authorization Server.
          </p>
        </div>

        <div />

        <div>
          <h6>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://auth0.com/docs/multifactor-authentication'>
              <i className='fas fa-link mr-2' />
              Enable Multi-Factor Authentication
            </a>
          </h6>
          <p>
            Add an extra layer of security by enabling Multi-factor
            Authentication, requiring your users to provide more than one piece
            of identifying information. Push notifications, authenticator apps,
            SMS, and DUO Security are supported.
          </p>
        </div>
      </div>

      <div>
        <div>
          <h6>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://auth0.com/docs/anomaly-detection'>
              <i className='fas fa-link mr-2' />
              Anomaly Detection
            </a>
          </h6>
          <p>
            Auth0 can detect anomalies and stop malicious attempts to access
            your application. Anomaly detection can alert you and your users of
            suspicious activity, as well as block further login attempts.
          </p>
        </div>

        <div />

        <div>
          <h6>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://auth0.com/docs/rules'>
              <i className='fas fa-link mr-2' />
              Learn About Rules
            </a>
          </h6>
          <p>
            Rules are JavaScript functions that execute when a user
            authenticates to your application. They run once the authentication
            process is complete, and you can use them to customize and extend
            Auth0's capabilities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
