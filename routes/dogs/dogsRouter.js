/**
 * Required External Modules and Interfaces
 */

const express = require('express');
const { checkJwt } = require('../../middleware/check-jwt');
const { getAllDogs, createMatch, getMatches } = require('./dogsService.js');
/**
 * Router Definition
 */

const dogsRouter = express.Router();

/* 

 */
dogsRouter.get('/', checkJwt, async (req, res) => {
  try {
    const dogs = await getAllDogs();
    return res.json({ dogs });
  } catch (err) {
    console.error('@/api/dogs/', err.message);
    res.status(500).json({ msg: err.message });
  }
});

/* 
CREATE Match
@Input: params including the dogId as well as userId
@Output: Object containing users profile info and interests
*/
dogsRouter.post('/match/:userId/:dogId', checkJwt, async (req, res) => {
  try {
    const { userId, dogId } = req.params;
    await createMatch(userId, dogId);
    const matches = await getMatches(userId);
    res.json(matches);
  } catch (err) {
    console.error('@/api/dogs/match/:userId/:dogId', err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = {
  dogsRouter,
};
