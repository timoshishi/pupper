/**
 * Required External Modules and Interfaces
 */

const express = require('express');
const { checkJwt } = require('../../middleware/check-jwt');
const { createMessage, getCurrentChat } = require('./chatService.js');
/**
 * Router Definition
 */

const chatRouter = express.Router();
/*
CREATE Message
@Input: body containing user_id, dog_id, if creator is human, and the message body
@Output: status 201 created
*/
chatRouter.post('/', checkJwt, async (req, res) => {
  try {
    await createMessage(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error('@/api/dogs/match/:userId/:dogId', err.message);
    res.status(500).json({ msg: err.message });
  }
});

/* 
GET messages - Gets all messages for the current selected chat
@Input: params including the user_id and dog_id
@Output: all messages from the currently selected chat
*/
chatRouter.get('/:user_id/:dog_id', checkJwt, async (req, res) => {
  try {
    const { user_id, dog_id } = req.params;
    const { rows } = await getCurrentChat(user_id, dog_id);
    res.json(rows);
  } catch (err) {
    console.error('@/api/dogs/match/:userId/:dogId', err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = {
  chatRouter,
};
