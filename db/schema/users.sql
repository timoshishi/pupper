DROP TABLE users;

CREATE TABLE IF NOT EXISTS users(
  user_id serial primary key,
  email varchar(100) UNIQUE,
  name varchar(100),
  zip_code int,
  about varchar(1000),
  summary varchar(100),
  photos text[],
  created_at timestamptz,
  last_login timestamptz
);

select * from users;