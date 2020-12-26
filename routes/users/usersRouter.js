/**
 * Required External Modules and Interfaces
 */

const express = require('express');
const { getUserByEmail, createUser, getUserInfo } = require('./usersService');
const { checkJwt } = require('../../middleware/check-jwt');

/**
 * Router Definition
 */

const usersRouter = express.Router();

/*
            GET INITIAL USER INFO
@Input: email returned from Auth0 on pageload
@Output: UserObject containing profile info and interests or 204 status if user doesn't exist
 */
usersRouter.get('/', checkJwt, async (req, res) => {
  try {
    const userId = await getUserByEmail(req.body.email);
    if (user) {
      const userInfo = await getUserInfo(+req.params.id);
      return res.json(userInfo);
    } else {
      return res.status(204).send();
    }
  } catch (err) {
    console.error('at /api/users/', err.message);
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
    const userObj = req.body;
    const userId = await createUser(userObj);
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
    const userInfo = await getUserInfo(+req.params.id);
    return res.json(userInfo);
  } catch (err) {
    console.error('at /api/users/:id', err.message);
    return res.json({ msg: err.message });
  }
});

/* Get User Matches */
usersRouter.get('/matches/:id', checkJwt, async (req, res) => { });

module.exports = {
  usersRouter,
};
