const pool = require('../../db/db');

/* Called on Page Load, Checks if User Exists */
const getAllDogs = async () => {
  try {
    const queryString = 'SELECT * FROM dogs';
    const { rows } = await pool.query(queryString);
    return rows;
  } catch (err) {
    return console.error('at getUserByEmail', err.message);
  }
};

module.exports = {
  getAllDogs,
};
