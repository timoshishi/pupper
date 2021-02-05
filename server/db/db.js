const { Pool, Client } = require('pg');
require('dotenv').config();
// const connectionString = process.env.DB_HOST;

if (!process.env.DATABASE_URL) {
  // THIS LINE SHOULD BE REMOVED IN PRODUCTION!!!!
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  pool = new Pool({
    user: 'postgres',
    password: process.env.DB_PASSWORD_DEV,
    host: 'localhost',
    port: 5432,
    database: 'puppr',
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
