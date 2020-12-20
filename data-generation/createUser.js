const faker = require('faker');

const createUser = (user_id) => {
  return {
    user_id,
    email: faker.internet.email(),
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
    created_at: new Date().toISOString(),
  };
};

module.exports = createUser;
