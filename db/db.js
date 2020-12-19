const { Pool, Client } = require('pg');
require('dotenv').config();
const connectionString = process.env.DB_HOST;
// THIS LINE SHOULD BE REMOVED IN PRODUCTION!!!!

if (!process.env.DATABASE_URL) process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_DEV,
  ssl: { rejectUnauthorized: false },
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
