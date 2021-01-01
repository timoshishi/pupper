/**
 * Required External Modules and Interfaces
 */

const express = require('express');
const { checkJwt } = require('../../middleware/check-jwt');
const { getDogInterests } = require('./interestsService');
/**
 * Router Definition
 */

const interestsRouter = express.Router();

/* 

 */
interestsRouter.post('/:dogId', checkJwt, async (req, res) => {
  try {
    const { dogId } = req.params;
    const dogInterests = await getDogInterests(dogId);
    return res.json(dogInterests);
  } catch (err) {
    console.error('@/api/interests/:userId/:dogId', err.message);
    return res.status(500).json({ msg: err.message });
  }
});

/* 
  CREATE USER 
  @Input: Object containing user info to go into user table as well as info for interests table
  @Output: Object containing users profile info and interests
  */
interestsRouter.post('/create', checkJwt, async (req, res) => {});

module.exports = { interestsRouter };
