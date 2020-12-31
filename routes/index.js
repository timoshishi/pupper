const { messagesRouter } = require('./messages/messages.router.js');
const { usersRouter } = require('./users/usersRouter.js');
const { dogsRouter } = require('./dogs/dogsRouter.js');
const { interestsRouter } = require('./interests/interestsRouter');

module.exports = { messagesRouter, usersRouter, dogsRouter, interestsRouter };
