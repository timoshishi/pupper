/**
 * Required External Modules and Interfaces
 */

const express = require('express');
const { checkJwt } = require('../../middleware/check-jwt');
const {
  createMessage,
  getCurrentChat,
  getChatUsersList,
} = require('./chatService.js');
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
    console.error('POST @/api/chat/', err.message);
    res.status(500).json({ msg: err.message });
  }
});

/* 
GET messages - Gets all messages for the current selected chat
@Input: params including the user_id and dog_id
@Output: all messages from the currently selected chat
*/
chatRouter.get('/current/:user_id/:dog_id', checkJwt, async (req, res) => {
  console.log('current');
  try {
    const { user_id, dog_id } = req.params;
    const { rows } = await getCurrentChat(user_id, dog_id);
    return res.json(rows);
  } catch (err) {
    console.error('GET @/api/chat/:userId/:dogId', err.message);
    res.status(500).json({ msg: err.message });
  }
});

/*
 GET all dogs that you have any messages with
 @Input: user_id in the params
 @Output: objects with the information of each dog
 */
chatRouter.get('/chat-list/:user_id', checkJwt, async (req, res) => {
  console.log('chat-list');
  console.log(req.params);
  try {
    const { user_id } = req.params;
    const dogs = await getChatUsersList(user_id);
    res.json(dogs);
  } catch (err) {
    console.error('GET @/api/chat/chat-list/:userId', err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = {
  chatRouter,
};
