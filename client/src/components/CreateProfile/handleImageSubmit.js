const handleImageSubmit = async () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
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
