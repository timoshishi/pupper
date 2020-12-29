const pool = require('../../db/db');

/* Called on Page Load, Checks if User Exists */
const getAllDogs = async () => {
  try {
    const dogsQueryString = 'SELECT * FROM dogs';

    const { rows: dogs } = await pool.query('SELECT * FROM dogs');
    const { rows: interests } = await pool.query('SELECT * FROM dog_interests');
    const dogArr = dogs.map((dog) => {
      const dogInterests = interests.find(
        (dogInterest) => dogInterest.dog_id === dog.dog_id
      );
      const filteredInterests = {};
      Object.keys(dogInterests).forEach((interest) => {
        if (interest !== 'dog_id' && dogInterests[interest]) {
          filteredInterests[interest] = dogInterests[interest];
        }
      });

      return {
        ...dog,
        interests: filteredInterests,
      };
    });
    return dogArr;
  } catch (err) {
    return console.error('at getUserByEmail', err.message);
  }
};

module.exports = {
  getAllDogs,
};
