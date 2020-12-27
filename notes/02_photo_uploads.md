# Setting up photo uploads to AWS S3 From Front End Using Heroku, React, and Express

- Follow this **getting access keys
  [guide](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)**
  on AWS

- Follow this **S3 Upload to Node
  [Guide](https://devcenter.heroku.com/articles/s3-upload-node)** On Heroku

- Look at the **Node Direct Uploader
  [Github Repository](https://github.com/willwebberley/NodeDirectUploader)** as
  an example

- Use the **Fetch Form Data
  [Guide](https://flaviocopes.com/how-to-upload-files-fetch/)** On the client
  side To upload using Fetch as opposed to xhr requests

- Use the **Formidable library
  [Guide](https://flaviocopes.com/express-forms-files/)** to handle parsing the
  files on the server.

## Server Side

### In users router

```javascript
/* Upload Photos Route */
const upload = require('./uploadPhotos');
const singleUpload = upload.single('image');

usersRouter.post('/photos/:id', checkJwt, async (req, res) => {
  try {
    singleUpload(req, res, function (err) {
      if (err) {
        return res.status(422).send({
          errors: [{ title: 'Image Upload Error', detail: err.message }],
        });
      }
      return res.json({ msg: req.file.location });
    });
  } catch (err) {
    console.error('at POST /api/users/photos/:id', err.message);
    return res.status(400).json({ msg: err.message });
  }
});
```

### In uploadPhotos.js

Utilizes the multer library and aws-sdk to take care of the complicated bits

```javascript
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-1',
});
const s3 = new aws.S3();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'puppr-photos',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'TESTING_METADATA' });
    },
    key: function (req, file, cb) {
      const ext = file.mimetype.split('/')[1];
      cb(null, `${req.params.id}-${Date.now()}.${ext}`);
    },
  }),
});

module.exports = upload;
```

## Client Side in a component

### Function for uploading on change

**Returns the Url of the image after it has been uploaded**

```javascript
const userContext = useContext(UserContext);
const { userId } = userContext;
const { getAccessTokenSilently } = useAuth0();

const handleImageUpload = async (e) => {
  try {
    const files = e.target.files;
    const formData = new FormData();
    formData.append('image', files[0]);

    const token = await getAccessTokenSilently();
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${serverUrl}/api/users/photos/${userId}`,
      options
    );
    const url = await response.json();
    return url;
  } catch (err) {
    return console.error('@handleImageUpload', err.message);
  }
};
```

### JSX

```javascript
<div>
  <h2>What can I do next?</h2>
  <input
    type='file'
    id='file-upload'
    onChange={handleImageUpload}
    accept='image/x-png,image/jpeg'
  />
</div>
```
