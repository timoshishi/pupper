--DROP TABLE message

CREATE TABLE IF NOT EXISTS message(
  id serial primary key,
  user_id varchar(100),
  created_at timestamptz,
  from_user varchar(100),
  to_user varchar(100),
  body varchar(1000),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(user_id)
);