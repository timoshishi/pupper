const faker = require('faker');
const { zipCodeMaker, photoStringMaker } = require('../utils/dataGen.js');

const createUser = () => {
  const user = {
    google_id: Math.floor(Math.random() * 51000),
    github_id: 'NULL',
    email: faker.internet.email(),
    name: faker.name.findName(),
    zip_code: zipCodeMaker(80001, 81658),
    about: faker.lorem.sentences(),
    summary: faker.lorem.sentence(),
    photos: photoStringMaker(),
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
  };
  return user;
};
console.log(JSON.stringify(createUser()));

module.exports = createUser;
