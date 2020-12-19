# Connecting Heroku DB to Local Environment

["error": "self signed certificate"](https://stackoverflow.com/questions/45088006/nodejs-error-self-signed-certificate-in-certificate-chain/45088585)

- Enter `npm config set strict-ssl=false` in the terminal

[Heroku Postgres: “psql: FATAL: no pg_hba.conf entry for host”](https://stackoverflow.com/questions/60048669/heroku-postgres-psql-fatal-no-pg-hba-conf-entry-for-host)

- Add `sslmode=require` to the end of the DATABASE_URL that exists in the heroku
  config option
