DROP TABLE matches;

CREATE TABLE IF NOT EXISTS matches(
  id serial primary key,
  user_id varchar(100),
  dog_id int UNIQUE,
  created_at timestamptz
);
-- CREATE TABLE IF NOT EXISTS matches(
--   id serial primary key,
--   user_id int,
--   dog_id int,
--   created_at timestamptz,
--     CONSTRAINT fk_user
--       FOREIGN KEY(user_id)
--         REFERENCES users(user_id),
--     CONSTRAINT fk_dog
--       FOREIGN KEY(dog_id)
--         REFERENCES dogs(dog_id)
-- );


COPY matches(
  user_id,
  matched_to,
  date_matched
) 
FROM 'C:\Users\timfr\Documents\github\hackreactor\puppr\data-generation\dummy\matches.csv'
DELIMITER ','
CSV HEADER;

select * from matches;