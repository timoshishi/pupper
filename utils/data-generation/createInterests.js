const ObjectsToCsv = require('objects-to-csv');

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
const interests = [...new Array(20)].map((un, i) => createInterests(i + 1));
const interestsCsv = new ObjectsToCsv(interests);
interestsCsv.toDisk('./dummy/dog_interests.csv');
module.exports = createInterests;
