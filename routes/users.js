const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');

router.get('/', async (req, res) => {
  try {
    let count = await pool.query('SELECT * FROM test');
    console.log('u got it');
    res.json({ msg: count });
  } catch (err) {
    console.error('Error at get users.js', err.message);
    res.json({ error: err.message });
  }
});

module.exports = router;
