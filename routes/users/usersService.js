const pool = require('../../db/db');
/**
 * Service Methods
 */

/* Called on Page Load, Checks if User Exists */
const getUserByEmail = async (email) => {
  try {
    const queryString = 'SELECT id FROM users WHERE email = $1';
    const user = await pool.query(queryString, [email]);
  } catch (err) {
    console.error('at getUserByEmail', err.message);
  }
};

/* Get User Profile And Interests */
const getUserInfo = async (userId) => {
  try {
    const userQueryString =
      'SELECT * FROM users name, zip_code, about, summary, photos, created_at, last_login WHERE user_id = $1';
    const interestsQueryString =
      'SELECT walkies, scritches, the_beach, playing_fetch, nap_time, running, frolicking, cuddles, wrestling, tug_of_war FROM interests WHERE user_id = $1';

    const res = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      userId,
    ]);
    const userInfo = res.rows[0];

    const interestsRes = await pool.query(interestsQueryString, [userId]);
    const interests = interestsRes.rows[0];
    return {
      userId,
      ...userInfo,
      interests,
    };
  } catch (err) {
    console.error('at getUserInfo', err.message);
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
  const {
    google_id,
    github_id,
    email,
    name,
    zip_code,
    about,
    summary,
    photos,
    created_at,
    last_login,
    interests,
  } = userObj;
  const {
    walkies,
    scritches,
    the_beach,
    playing_fetch,
    nap_time,
    running,
    frolicking,
    cuddles,
    wrestling,
    tug_of_war,
  } = interests;

  let photoArr = '{';
  if (photos.length && Array.isArray(photos)) {
    photos.forEach((url, i) => {
      if (i < photos.length - 1) {
        photoArr += `${url}, `;
      } else {
        photoArr += `${url}}`;
      }
    });
  } else {
    photoArr = photos;
  }

  try {
    const usersInsertQuery =
      'INSERT INTO users(google_id, github_id, email, name, zip_code, about, summary, photos, created_at, last_login) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING user_id';

    const interestsInsertQuery =
      'INSERT INTO interests(user_id, walkies, scritches, the_beach, playing_fetch, nap_time, running, frolicking, cuddles, wrestling, tug_of_war) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';

    const user_id = await pool
      .query(usersInsertQuery, [
        google_id,
        github_id,
        email,
        name,
        zip_code,
        about,
        summary,
        photoArr,
        created_at,
        last_login,
      ])
      .then((res) => res.rows[0].user_id)
      .catch((err) => console.log('userId query', err.message));

    await pool.query(interestsInsertQuery, [
      user_id,
      walkies,
      scritches,
      the_beach,
      playing_fetch,
      nap_time,
      running,
      frolicking,
      cuddles,
      wrestling,
      tug_of_war,
    ]);
    return user_id;
  } catch (err) {
    console.error('at createUser', err.message);
  }
};

const getUserMessages = async () => {};

module.exports = {
  getUserMessages,
  getUserByEmail,
  getUserInfo,
  createUser,
};
