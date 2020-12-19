-- DROP TABLE profile

CREATE TABLE IF NOT EXISTS profile(
  id serial primary key,
  user_id,
  human boolean,
  about varchar(1000),
  title varchar(100),
  location varchar(100),
  photos text[9],
  CONSTRAINT fk_user
      FOREIGN KEY(user_id)
        REFERENCES user(user_id)
);