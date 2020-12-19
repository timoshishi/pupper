CREATE TABLE IF NOT EXISTS dog(
  id serial primary key,
  user_id varchar,
  breed varchar(100),
  color varchar(100),
  adult_weight int,
  age int,
  CONSTRAINT fk_user
  FOREIGN KEY(user_id)
    REFERENCES users(user_id)
);