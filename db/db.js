const { Pool, Client } = require('pg');
require('dotenv').config;
const connectionString = process.env.DB_HOST;

const host = process.env.DB_HOST;
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const database = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

const pool = new Pool({
  connectionString:
    process.env.DB_URL || 'postgresql://postgres:password@localhost:5432/test',
  ssl: process.env.DATABASE_URL ? true : false,
});
// pool.connect();
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
