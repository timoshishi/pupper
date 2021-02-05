# Setting up photo uploads to AWS S3 From Front End Using Heroku, React, and Express

**tldr; code at the bottom**

- Follow this **getting access keys
  [guide](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)**
  on AWS

- Use the **Fetch Form Data
  [Guide](https://flaviocopes.com/how-to-upload-files-fetch/)** On the client
  side To upload using Fetch as opposed to xhr requests

- Most code below is based on this: ** How to set up simple image upload with
  Node and AWS S3
  [Guide](https://www.freecodecamp.org/news/how-to-set-up-simple-image-upload-with-node-and-aws-s3-84e609248792/)**.
  and [Github repository](https://github.com/Jerga99/bwm-ng) (typescript,
  angular, node, express). The useful information is included in the server side
  including the routes and upload-image function. Ignore the client side.

## Avenues followed and failed

- **S3 Upload to Node
  [Guide](https://devcenter.heroku.com/articles/s3-upload-node)** On Heroku.
  Helpful but got sidetracked because of xhr requests and ultimately did not
  follow it.

- Look at the **Node Direct Uploader
  [Github Repository](https://github.com/willwebberley/NodeDirectUploader)** as
  an example

- Using the **Formidable library
  [Guide](https://flaviocopes.com/express-forms-files/)** to handle parsing the
  files on the server. Easy to save to disk at root dir but not to push to S3.

### Bugs

After setting env variables locally and in heroku I was pretty much immediately
able to upload images using postman. When trying to upload from client side I
was continually getting 422 errors that the server was not able to handle this
resource.

Checked headers client side and set them to 'content-type':
'application/octet-stream' and that took out the errors but was not uploading.

I was not able to access anything in the server side req body even though I was
able to log out the FormData object client side so I knew the files were in
there.

I researched heavily why in heck it was not being parsed. Apparently the multer
library was handling multi-part form data and so i would not be able to access
anything until it went into the multer object.

I tried about a million different headers to no avail

Logged out the 600 line req bodies for both the postman POST and the client side
POST and compared them side by side to see if there were any differences.

I had all but given up hope when I looked at the Postman POST request and
noticed that in the body i had set the key to 'image' and the value to the file.
In my client side code I had named the key 'file'. Apparently multer would only
accept 'image' as a key name. Changing the form-data key/val pair to
'image'/files[0] when appending and before sending it in the body fixed this.

# Solutions

## Server Side

### In users router

```javascript
/* Upload Photos Route */
const upload = require('./uploadPhotos');
const singleUpload = upload.single('image'); // from multer library

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
  //specific params for this bucket
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
      const ext = file.mimetype.split('/')[1]; //multer will not attatch file ext when creating file name
      cb(null, `${req.params.id}-${Date.now()}.${ext}`); // must add file ext
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
    formData.append('image', files[0]); //Must be called 'image'!!

    const token = await getAccessTokenSilently();
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        // do not set content-type in the headers
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
    accept='image/x-png,image/jpeg' // restrict types to be selected
  />
</div>
```
