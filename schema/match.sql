--DROP TABLE match

CREATE TABLE IF NOT EXISTS match(
  id serial primary key,
  user_id varchar(100),
  matched_to varchar(100),
  date_matched timestamptz,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(user_id)
);