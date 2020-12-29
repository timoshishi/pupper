import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import UserContext from '../../context/user/userContext';
import { Button, Card } from '@material-ui/core';
import PropTypes from 'prop-types';

const PhotoUpload = ({ userInfo, setUserInfo }) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const userContext = useContext(UserContext);
  const { userId } = userContext;
  const { getAccessTokenSilently } = useAuth0();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

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
        `${serverUrl}/api/users/photos/${userId}`,
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
    <div>
      <h1>photo upload</h1>
      <input
        type='file'
        id='file-upload'
        onChange={handleImageSelect}
        accept='image/x-png,image/jpeg'
      />
      <Button onClick={handleImageSubmit} disabled={imageUrl}>
        Add Photo
      </Button>
      {userInfo.photos.length ? (
        <Card style={{ maxHeight: '6rem', maxWidth: '4rem' }}>
          <img src={imageUrl} alt='profile' />
        </Card>
      ) : null}
    </div>
  );
};
PhotoUpload.propTypes = {
  userInfo: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func.isRequired,
};
export default PhotoUpload;
