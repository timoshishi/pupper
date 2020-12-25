/**
 * Required External Modules and Interfaces
 */

const express = require('express');
const { getUserByEmail, createUser, getUserInfo } = require('./users.service');
const { checkJwt } = require('../../authz/check-jwt');

/**
 * Router Definition
 */

const usersRouter = express.Router();

/**
 * Controller Definitions
 */

// GET messages/
/*
usersRouter.get('/public-message', (req, res) => {
  const message = getPublicMessage();
  res.status(200).send(message);
});

usersRouter.get('/protected-message', checkJwt, (req, res) => {
  const message = getProtectedMessage();
  res.status(200).send(message);
});
*/

/* GET INITIAL USER INFO */
usersRouter.get('/', checkJwt, async (req, res) => {
  try {
    const userId = await getUserByEmail(req.body.email);
    if (user) {
      getUserInfo(userId);
      res.json(user);
    } else {
      return res.status(204).send();
    }
  } catch (err) {
    console.error('at /api/users/', err.message);
    return res.json({ msg: err.message });
  }
});
/* CREATE USER */
usersRouter.post('/create', checkJwt, async (req, res) => {
  try {
    const userObj = req.body;
    const userId = await createUser(userObj);
    const userInfo = await getUserInfo(userId);
    return res.json(userInfo);
  } catch (err) {
    console.error('at /api/users/create', err.message);
    return res.json({ msg: err.message });
  }
});
/* GET USER INFO */
usersRouter.get('/:id', async (req, res) => {
  try {
    const userInfo = await getUserInfo(Number(req.params.id));

    res.json(userInfo);
  } catch (err) {
    console.error('at /api/users/:id', err.message);
    return res.json({ msg: err.message });
  }
});
module.exports = {
  usersRouter,
};
