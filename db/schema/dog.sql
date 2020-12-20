--DROP TABLE dogs;

CREATE TABLE IF NOT EXISTS dogs(
  id serial primary key,
  user_id varchar,
  name varchar(100),
  breed varchar(100),
  color varchar(100),
  adult_weight int,
  age int,
  about varchar(1000),
  title varchar(100),
  zip_code varchar(100),
  photos text[9]
);


COPY dogs(
  user_id,
  name,
  breed,
  color,
  adult_weight,
  age,
  about,
  title,
  zip_code,
  photos
) 
FROM 'C:\Users\timfr\Documents\github\hackreactor\puppr\data-generation\dummy\dog.csv'
DELIMITER ','
CSV HEADER;

select * from dogs;