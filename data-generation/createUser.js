const faker = require('faker');
const { v4: uuidv4, v4 } = require('uuid');

const createUser = () => {
  return {
    user_id: uuidv4,
    email: faker.internet.email(),
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
    created_at: new Date().toISOString(),
  };
};

console.log(createUser());
