/**
 * Required External Modules and Interfaces
 */

const express = require('express');
const { checkJwt } = require('../../middleware/check-jwt');
const { getAllDogs } = require('./dogsService');
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
  CREATE USER 
  @Input: Object containing user info to go into user table as well as info for interests table
  @Output: Object containing users profile info and interests
  */
dogsRouter.post('/create', checkJwt, async (req, res) => {});

module.exports = {
  dogsRouter,
};
