const pool = require('../../db/db');

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

const getCurrentChat = async (user_id, dog_id) => {
  try {
    const queryString = 'SELECT * FROM chat WHERE user_id = $1 AND dog_id = $2';
    const messages = await pool.query(queryString, [user_id, dog_id]);
    return messages;
  } catch (err) {
    return console.error('at getCurrentChat', err.message);
  }
};

const getChatUsersList = async (user_id) => {
  console.log({ user_id });
  try {
    const queryString = 'SELECT DISTINCT dog_id FROM chat WHERE user_id = $1';
    const { rows } = await pool.query(queryString, [user_id]);
    // await console.log({ rows });
    const dogPromises = await rows.map(async (dog) => {
      const queryString =
        'SELECT dog_id, name, photos from dogs where dog_id = $1';
      const { rows } = await pool.query(queryString, [dog.dog_id]);
      return rows[0];
    });
    const dogArr = await Promise.all(dogPromises);
    return dogArr;
  } catch (err) {
    return console.error('at getChatUsersList', err.message);
  }
};

module.exports = { createMessage, getCurrentChat, getChatUsersList };
