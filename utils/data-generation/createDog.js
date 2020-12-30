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
  'Ace',
  'Flash',
  'Apollo',
  'Bear',
  'Birdie',
  'Indy',
  'Hattie',
  'Roxy',
  'Ruby',
  'Shadow',
  'Scout',
  'Jazz',
  'Catcher',
  'CiCi',
  'Buzz',
  'Boomer',
  'Miz',
  'Peach',
  'Crush',
  'Daisy',
  'Phoenix',
  'Juniper',
  'Roo',
  'Star',
  'Echo',
  'Latte',
  'Laser',
  'Sophie',
  'Lila',
  'Ivy',
  'Elsa',
  'Bella',
  'Aurora',
  'Francesca',
  'Sparkles',
  'Unicorn',
  'Fluffy',
  'Maggie',
  'Kawaii',
  'Chester',
  'Chloe',
  'Camille',
];
const breeds = [
  'retriever',
  'pug',
  'shitzu',
  'bulldog',
  'poodle',
  'spaniel',
  'shiba',
  'jindo',
  'beagle',
  'chihuahua',
  'husky',
  'dachshund',
  'maltese',
  'pomerian',
  'corgi',
  'collie',
  'greyhound',
  'bichon',
  'terrier',
  'wolfhound',
  'pinscher',
];

const createDog = (name) => {
  const breed = breeds[Math.floor(Math.random() * breeds.length)];
  return {
    name: name,
    breed,
    color: faker.commerce.color(),
    adult_weight: Math.floor(Math.random() * 45),
    age: Math.floor(Math.random() * 15) + 1,
    about: faker.lorem.sentences(),
    title: faker.lorem.sentence(),
    zip_code: zipCodeMaker(80001, 81658),
    photo: `{https://puppr-photos.s3.us-east-2.amazonaws.com/${breed}.png}`,
    created_at: new Date().toISOString(),
  };
};
console.log(createDog('francis'));
const dogs = dogNames.map((name) => createDog(name));
const dogCsv = new ObjectsToCsv(dogs);
dogCsv.toDisk('./dummy/dogs.csv');

const createInterests = (dog_id) => {
  return {
    dog_id,
    walkies: Math.random() < 0.4 ? 't' : 'f',
    scritches: Math.random() < 0.3 ? 't' : 'f',
    the_beach: Math.random() < 0.3 ? 't' : 'f',
    playing_fetch: Math.random() < 0.3 ? 't' : 'f',
    nap_time: Math.random() < 0.3 ? 't' : 'f',
    running: Math.random() < 0.5 ? 't' : 'f',
    frolicking: Math.random() < 0.3 ? 't' : 'f',
    cuddles: Math.random() < 0.5 ? 't' : 'f',
    wrestling: Math.random() < 0.3 ? 't' : 'f',
    tug_of_war: Math.random() < 0.3 ? 't' : 'f',
  };
};
const interests = [...new Array(dogNames.length)].map((un, i) =>
  createInterests(i + 1)
);
const interestsCsv = new ObjectsToCsv(interests);
interestsCsv.toDisk('./dummy/dog_interests.csv');

module.exports = createDog;
