--DROP TABLE matches

CREATE TABLE IF NOT EXISTS matches(
  id serial primary key,
  user_id varchar(100),
  matched_to varchar(100),
  date_matched timestamptz
);

COPY matches(
  user_id,
  matched_to,
  date_matched
) 
FROM 'C:\Users\timfr\Documents\github\hackreactor\puppr\data-generation\dummy\matches.csv'
DELIMITER ','
CSV HEADER;

select * from matches;