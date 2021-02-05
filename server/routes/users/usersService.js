const pool = require('../../db/db');

/* Get User Profile And Interests */
const getUserInfo = async (userId) => {
  try {
    const userQueryString = 'SELECT * FROM users WHERE user_id = $1';
    const interestsQueryString =
      'SELECT walkies, scritches, the_beach, playing_fetch, nap_time, running, frolicking, cuddles, wrestling, tug_of_war FROM interests WHERE user_id = $1';

    const res = await pool.query(userQueryString, [userId]);

    const userInfo = res.rows[0];
    const interestsRes = await pool.query(interestsQueryString, [userId]);
    const interests = interestsRes.rows[0];
    const filteredInterests = {};
    if (userInfo) {
      Object.keys(interests).forEach((interest) => {
        if (interest !== 'user_id' && interests[interest]) {
          filteredInterests[interest] = interests[interest];
        }
      });
    }
    return {
      ...userInfo,
      interests: filteredInterests,
    };
  } catch (err) {
    return console.error('at getUserInfo', err.message, err.stack);
  }
};

/*
CREATE A NEW USER IF DOES NOT EXIST 
*/
const createUser = async (userObj) => {
  Object.keys(userObj).forEach((key) => {
    if (typeof userObj[key] === 'undefined' || userObj[key] === null) {
      userObj[key === 'NULL'];
    }
  });

  try {
    const usersInsertQuery =
      'INSERT INTO users(user_id, email, name, zip_code, about, summary, photos, created_at, last_login) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING user_id';

    const interestsInsertQuery =
      'INSERT INTO interests(user_id, walkies, scritches, the_beach, playing_fetch, nap_time, running, frolicking, cuddles, wrestling, tug_of_war) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';

    const { rows } = await pool.query(usersInsertQuery, [
      userObj.user_id,
      userObj.email,
      userObj.name,
      userObj.zip_code,
      userObj.about,
      userObj.summary,
      userObj.photos,
      userObj.created_at,
      userObj.last_login,
    ]);

    await pool.query(interestsInsertQuery, [
      userObj.user_id,
      userObj.interests.walkies,
      userObj.interests.scritches,
      userObj.interests.the_beach,
      userObj.interests.playing_fetch,
      userObj.interests.nap_time,
      userObj.interests.running,
      userObj.interests.frolicking,
      userObj.interests.cuddles,
      userObj.interests.wrestling,
      userObj.interests.tug_of_war,
    ]);
    return;
  } catch (err) {
    return console.error('at createUser', err.message);
  }
};

const getUserMessages = async () => {};

module.exports = {
  getUserMessages,
  getUserInfo,
  createUser,
};
