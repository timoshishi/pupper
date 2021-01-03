DROP TABLE chat;
DROP TABLE interests;
DROP TABLE matches;
DROP TABLE users;

CREATE TABLE IF NOT EXISTS users(
  user_id varchar(100) UNIQUE PRIMARY KEY,
  email varchar(100),
  name varchar(100),
  zip_code int,
  about varchar(1000),
  summary varchar(100),
  photos text[],
  created_at timestamptz,
  last_login timestamptz
);


CREATE TABLE IF NOT EXISTS interests(
  id serial primary key,
  user_id varchar(100) UNIQUE REFERENCES users ON DELETE CASCADE,
  walkies boolean,
  scritches boolean,
  the_beach boolean,
  playing_fetch boolean,
  nap_time boolean,
  running boolean,
  frolicking boolean,
  cuddles boolean,
  wrestling boolean,
  tug_of_war boolean,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
        REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS matches(
  id serial primary key,
  user_id varchar(100) REFERENCES users ON DELETE CASCADE,
  dog_id int UNIQUE REFERENCES dogs ON DELETE CASCADE,
  created_at timestamptz,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
        REFERENCES users(user_id),
    CONSTRAINT fk_dog
      FOREIGN KEY(dog_id)
        REFERENCES dogs(dog_id)
);

CREATE TABLE IF NOT EXISTS chat(
  id serial primary key,
  from_human boolean,
  user_id varchar(100) REFERENCES users ON DELETE CASCADE,
  dog_id int REFERENCES dogs ON DELETE CASCADE,
  body varchar(1000),
  created_at timestamptz,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
        REFERENCES users(user_id),
    CONSTRAINT fk_dog
      FOREIGN KEY(dog_id)
        REFERENCES dogs(dog_id)
);

-- ********************************************** --
-- ************** DOG STUFF! ******************** --
-- ********************************************** --

DROP TABLE dog_interests;
DROP TABLE dogs;

CREATE TABLE IF NOT EXISTS dogs(
  dog_id serial primary key,
  name varchar(100),
  breed varchar(100),
  color varchar(100),
  adult_weight int,
  age int,
  about varchar(1000),
  title varchar(100),
  zip_code varchar(100),
  photos text[9],
  created_at timestamptz
);


CREATE TABLE IF NOT EXISTS dog_interests(
  dog_id int UNIQUE REFERENCES dogs ON DELETE CASCADE,
  walkies boolean,
  scritches boolean,
  the_beach boolean,
  playing_fetch boolean,
  nap_time boolean,
  running boolean,
  frolicking boolean,
  cuddles boolean,
  wrestling boolean,
  tug_of_war boolean,
    CONSTRAINT fk_dog
      FOREIGN KEY(dog_id)
        REFERENCES dogs(dog_id)
);
\copy dog_interests from 'C:\Users\timfr\Documents\github\hackreactor\puppr\utils\data-generation\dummy\dog_interests.csv' CSV HEADER;

\copy dogs from 'C:\Users\timfr\Documents\github\hackreactor\puppr\utils\data-generation\dummy\dogs.csv' CSV HEADER;