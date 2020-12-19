const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

const createInterests = (num) => {
  return [...new Array(num)].map((i) => ({
    walkies: Math.random() > 0.3,
    scritches: Math.random() > 0.3,
    the_beach: Math.random() > 0.3,
    playing_fetch: Math.random() > 0.3,
    nap_time: Math.random() > 0.3,
    running: Math.random() > 0.3,
    frolicking: Math.random() > 0.3,
    cuddles: Math.random() > 0.3,
    wrestling: Math.random() > 0.3,
    tug_of_war: Math.random() > 0.3,
  }));
};

console.log();
