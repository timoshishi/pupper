const { chatRouter } = require('./chat/chatRouter.js');
const { usersRouter } = require('./users/usersRouter.js');
const { dogsRouter } = require('./dogs/dogsRouter.js');
const { interestsRouter } = require('./interests/interestsRouter.js');

module.exports = { chatRouter, usersRouter, dogsRouter, interestsRouter };
