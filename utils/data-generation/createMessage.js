const faker = require('faker');

const createMessage = (user_id, to_user) => ({
  user_id,
  to_user,
  body: faker.lorem.sentences(3),
  created_at: new Date().toISOString(),
});

module.exports = createMessage;
