const faker = require('faker');
const { zipCodeMaker, photoStringMaker } = require('./dataGen.js');
const createProfile = (user_id) => ({
  user_id,
  about: faker.lorem.sentences(),
  title: faker.lorem.sentence(),
  zip_code: zipCodeMaker(80001, 81658),
  photos: photoStringMaker(),
});
module.exports = createProfile;
