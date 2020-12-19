CREATE TABLE IF NOT EXISTS dog(
  id serial primary key,
  user_id varchar,
  name varchar(100),
  breed varchar(100),
  color varchar(100),
  adult_weight int,
  age int,
);