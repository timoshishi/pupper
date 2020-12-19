const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
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
    user_id: uuidv4(),
    name: dogNames[Math.floor(Math.random() * dogNames.length)],
    breed: breeds[Math.floor(Math.random() * breeds.length)],
    color: faker.commerce.color(),
    adult_weight: Math.floor(Math.random() * 45),
    age: Math.floor(Math.random() * 15) + 1,
  };
};

console.log(createDog());
