const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');

router.get('/', async (req, res) => {
  try {
    let users = await pool.query('SELECT * FROM users');
    console.log('u got it');
    res.json(users);
  } catch (err) {
    console.error('Error at get users.js', err.message);
    res.json({ error: err.message });
  }
});

module.exports = router;
