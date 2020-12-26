const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const createInterests = (user_id) => {
  return {
    user_id,
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
console.log(JSON.stringify(createInterests()));
module.exports = createInterests;
