const pool = require('../../db/db');

/* Called on Load at Home, gets all dogs in existence*/
// const getAllDogs = async () => {
//   try {
//     const { rows: dogs } = await pool.query('SELECT * FROM dogs');
//     const { rows: interests } = await pool.query('SELECT * FROM dog_interests');
//     const dogArr = dogs.map((dog) => {
//       const dogInterests = interests.find(
//         (dogInterest) => dogInterest.dog_id === dog.dog_id
//       );
//       const filteredInterests = {};
//       Object.keys(dogInterests).forEach((interest) => {
//         if (interest !== 'dog_id' && dogInterests[interest]) {
//           filteredInterests[interest] = dogInterests[interest];
//         }
//       });

//       return {
//         ...dog,
//         interests: filteredInterests,
//       };
//     });
//     return dogArr;
//   } catch (err) {
//     return console.error('at getUserByEmail', err.message);
//   }
// };

/* */
const createMessage = async (messageObj) => {
  try {
    const { from_human, user_id, dog_id, body } = messageObj;
    const now = new Date().toISOString();
    const queryString =
      'INSERT INTO chat (from_human, user_id, dog_id, body, created_at) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(queryString, [from_human, user_id, dog_id, body, now]);
  } catch (err) {
    return console.error('at createMessage', err.message);
  }
};

getCurrentChat = async (user_id, dog_id) => {
  try {
    const queryString = 'SELECT * FROM chat WHERE user_id = $1 AND dog_id = $2';
    const messages = await pool.query(queryString, [user_id, dog_id]);
    return messages;
  } catch (error) {
    return console.error('at createMessage', err.message);
  }
};

module.exports = { createMessage, getCurrentChat };
