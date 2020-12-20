--DROP TABLE profiles;


CREATE TABLE IF NOT EXISTS profiles(
  id serial primary key,
  user_id varchar(100) not null,
  about varchar(1000) not null,
  title varchar(100) not null,
  zip_code varchar(100) not null,
  photos text[9] not null
);

COPY profiles(
  user_id,
  about,
  title,
  zip_code,
  photos
) 
FROM 'C:\Users\timfr\Documents\github\hackreactor\puppr\data-generation\dummy\profilesCsv.csv'
DELIMITER ','
CSV HEADER;

select * from profiles;