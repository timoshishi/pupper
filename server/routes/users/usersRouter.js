/**
 * Required External Modules and Interfaces
 */

const express = require('express');
const { createUser, getUserInfo } = require('./usersService');
const { checkJwt } = require('../../middleware/check-jwt');
/**
 * Router Definition
 */

const usersRouter = express.Router();

/* 
                GET USER INFO 
@Input: Users id in the req.params
@Output: Profile info and interests
*/
usersRouter.get('/:id', checkJwt, async (req, res) => {
  console.log(req.params);
  try {
    const userInfo = await getUserInfo(req.params.id);

    if (userInfo.user_id) {
      return res.json(userInfo);
    } else {
      return res.sendStatus(204);
    }
  } catch (err) {
    console.error('at /api/users/:id', err.message);
    return res.json({ msg: err.message });
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
    // const userInfo = await getUserInfo(userId);
    // console.log('userInfo', userInfo);
    // return res.json(userInfo);
    return res.sendStatus(200);
  } catch (err) {
    console.error('at /api/users/create', err.message);
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

module.exports = {
  usersRouter,
};
