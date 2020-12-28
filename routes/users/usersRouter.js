/**
 * Required External Modules and Interfaces
 */

const express = require('express');
const { getUserByEmail, createUser, getUserInfo } = require('./usersService');
const { checkJwt } = require('../../middleware/check-jwt');
const formidable = require('formidable');
/**
 * Router Definition
 */

const usersRouter = express.Router();

/* 
            GET INITIAL USER INFO
@Input: email returned from Auth0 on pageload
@Output: UserObject containing profile info and interests or 204 status if user doesn't exist
 */
usersRouter.post('/', checkJwt, async (req, res) => {
  console.log(req.body);
  try {
    const userId = await getUserByEmail(req.body.email);
    if (userId) {
      const userInfo = await getUserInfo(userId);
      return res.json(userInfo);
    } else {
      return res.status(204).send();
    }
  } catch (err) {
    console.error('at /api/users/', err.message);
    return res.status(204).json({ msg: err.message });
  }
});

/* 
  CREATE USER 
  @Input: Object containing user info to go into user table as well as info for interests table
  @Output: Object containing users profile info and interests
  */
usersRouter.post('/create', checkJwt, async (req, res) => {
  try {
    const userId = await createUser(req.body);
    const userInfo = await getUserInfo(userId);
    return res.json(userInfo);
  } catch (err) {
    console.error('at /api/users/create', err.message);
    return res.json({ msg: err.message });
  }
});

/* 
                GET USER INFO 
@Input: Users id in the req.params
@Output: Profile info and interests
*/
usersRouter.get('/:id', checkJwt, async (req, res) => {
  try {
    const userInfo = await getUserInfo(Number(req.params.id));
    return res.json(userInfo);
  } catch (err) {
    console.error('at /api/users/:id', err.message);
    return res.json({ msg: err.message });
  }
});

/* Get User Matches */
usersRouter.get('/matches/:id', checkJwt, async (req, res) => {});

/* Upload Photos */
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
// usersRouter.post('/photos/:id', checkJwt, async (req, res) => {
//   try {
//     new formidable.IncomingForm()
//       .parse(req)
//       .on('fileBegin', (name, file) => {
//         file.path = `${__dirname}/uploads/${file.name}`;
//       })
//       // .on('field', (name, field) => {
//       //   console.log('Field', name, field);
//       // })
//       .on('file', (name, file) => {
//         console.log('Uploaded file', name);
//         console.log('file.size', file.size);
//         console.log('file.path', file.path);
//         console.log('file.name', file.name);
//         console.log('file.type', file.type);
//       })
//       .on('aborted', () => {
//         console.error('Request aborted by the user');
//       })
//       .on('error', (err) => {
//         console.error('Error', err);
//         throw err;
//       })
//       .on('end', () => {
//         res.end();
//       });
//     console.log(req.params.id);
//     return res.json({ id: req.params.id });
//   } catch (error) {
//     console.error('at POST /api/users/photos/:id', err.message);
//     return res.json({ msg: err.message });
//   }
// });

module.exports = {
  usersRouter,
};
