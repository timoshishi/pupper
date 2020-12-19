--DROP TABLE user

CREATE TABLE IF NOT EXISTS users(
  user_id varchar(100),
  email varchar(100),
  name varchar(100),
  phone int,
  created_at timestamptz,
  PRIMARY KEY(user_id)
);

CREATE INDEX idx_user_id on users(user_id);