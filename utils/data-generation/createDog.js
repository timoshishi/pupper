const ObjectsToCsv = require('objects-to-csv');
const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const { zipCodeMaker, photoStringMaker } = require('./dataGen.js');
const dogNames = [
  'Fido',
  'Spot',
  'Ginger',
  'Yoshi',
  'Jun',
  'Sparkles',
  'Puppet',
  'Cotton',
  'Julius',
  'Woofer',
  'HeMan',
];
const breeds = [
  'German Shepard',
  'Blood Hound',
  'Shitzu',
  'Jindo',
  'Golden Retriever',
  'Labrador Retriever',
  'Poodle',
  'Mutt',
];

const createDog = () => {
  return {
    name: dogNames[Math.floor(Math.random() * dogNames.length)],
    breed: breeds[Math.floor(Math.random() * breeds.length)],
    color: faker.commerce.color(),
    adult_weight: Math.floor(Math.random() * 45),
    age: Math.floor(Math.random() * 15) + 1,
    about: faker.lorem.sentences(),
    title: faker.lorem.sentence(),
    zip_code: zipCodeMaker(80001, 81658),
    photos: photoStringMaker(),
    created_at: new Date().toISOString(),
  };
};
console.log(createDog());
const dogs = [...new Array(20)].map((un) => createDog());
const dogCsv = new ObjectsToCsv(dogs);
dogCsv.toDisk('./dummy/dogs.csv');

module.exports = createDog;
