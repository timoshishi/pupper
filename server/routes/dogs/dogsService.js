const pool = require('../../db/db');

/* Called on Load at Home, gets all dogs in existence*/
const getAllDogs = async () => {
  try {
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

/* Called on swiper swipe-right, creates a new match */
const createMatch = async (userId, dogId) => {
  try {
    const queryString =
      'SELECT * FROM matches where user_id = $1 AND dog_id = $2';
    const insertString =
      'INSERT INTO matches (user_id, dog_id, created_at) VALUES ($1, $2, $3)';
    const { rows } = await pool.query(queryString, [userId, dogId]);
    if (!rows.length) {
      const now = new Date().toISOString();
      await pool.query(insertString, [userId, dogId, now]);
    }
  } catch (err) {
    return console.error('at createMatch', err.message);
  }
};

const getMatches = async (userId) => {
  try {
    const queryString = 'SELECT dog_id FROM matches WHERE user_id = $1';
    const { rows } = await pool.query(queryString, [userId]);
    const matches = await rows.map(async (match) => {
      const { dog_id } = match;

      const {
        rows: dog,
      } = await pool.query('SELECT * FROM dogs WHERE dog_id = $1', [dog_id]);
      const {
        rows: interests,
      } = await pool.query('SELECT * FROM dog_interests WHERE dog_id = $1', [
        dog_id,
      ]);
      const filteredInterests = {};
      Object.keys(interests[0]).forEach((interest) => {
        if (interest !== 'dog_id' && interests[0][interest]) {
          filteredInterests[interest] = interests[0][interest];
        }
      });
      return {
        ...dog[0],
        interests: filteredInterests,
      };
    });
    const dogArr = await Promise.all(matches);
    return dogArr;
  } catch (err) {
    return console.error('at getMatches', err.message);
  }
};

module.exports = {
  getAllDogs,
  createMatch,
  getMatches,
};
