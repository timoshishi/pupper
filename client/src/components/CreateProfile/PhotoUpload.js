import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const PhotoUpload = ({ userInfo, setUserInfo }) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently, user } = useAuth0();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const defaultImage =
    'https://puppr-photos.s3.us-east-2.amazonaws.com/Portrait_Placeholder.png';
  const handleImageSelect = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    formData.append('image', files[0]);
    setImage(formData);
  };

  const handleImageSubmit = async () => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: 'POST',
        body: image,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        `${serverUrl}/api/users/photos/${user.sub}`,
        options
      );
      const url = await response.json();
      setImage(null);
      await setImageUrl(url.msg);
      await setUserInfo({
        ...userInfo,
        photos: [...userInfo.photos, url.msg],
      });
    } catch (err) {
      return console.error('@handleImageUpload', err.message);
    }
  };

  return (
    <Box display='flex' my={2}>
      <Box display='flex' flexDirection='column'>
        <Typography variant='h5'>Add A Photo</Typography>
        <input
          type='file'
          id='file-upload'
          onChange={handleImageSelect}
          accept='image/x-png,image/jpeg'
          style={{ marginLeft: '2rem' }}
        />
        <Box marginTop='3rem'>
          <Button
            onClick={handleImageSubmit}
            color='primary'
            variant='outlined'
            disabled={!image}>
            Add Photo
          </Button>
        </Box>
      </Box>
      <Box maxHeight='5rem'>
        <img
          src={!imageUrl ? defaultImage : imageUrl}
          alt='profile'
          style={{ maxHeight: '10rem' }}
        />
      </Box>
    </Box>
  );
};
PhotoUpload.propTypes = {
  userInfo: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func.isRequired,
};
export default PhotoUpload;
