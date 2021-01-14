const pool = require('../../db/db');

/* Called on Page Load, Checks if User Exists */
const getDogInterests = async (dogId) => {
  try {
    const queryString = 'SELECT * FROM dog_interests where id = $1';
  } catch (err) {
    return console.error('at createMatch', err.message);
  }
};

module.exports = {
  getDogInterests,
};
