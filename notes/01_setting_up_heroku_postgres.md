# Connecting Heroku DB to Local Environment

["error": "self signed certificate"](https://stackoverflow.com/questions/45088006/nodejs-error-self-signed-certificate-in-certificate-chain/45088585)

- Enter `npm config set strict-ssl=false` in the terminal

[Heroku Postgres: “psql: FATAL: no pg_hba.conf entry for host”](https://stackoverflow.com/questions/60048669/heroku-postgres-psql-fatal-no-pg-hba-conf-entry-for-host)

- Add `sslmode=require` to the end of the DATABASE_URL that exists in the heroku
  config option

Make your db file look like this

```javascript
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
```
