--DROP TABLE messages

CREATE TABLE IF NOT EXISTS messages(
  id serial primary key,
  from_user int,
  to_user int,
  body varchar(1000),
  created_at timestamptz
);

COPY messages(
  user_id,
  to_user,
  body,
  created_at
) 
FROM 'C:\Users\timfr\Documents\github\hackreactor\puppr\data-generation\dummy\message.csv'
DELIMITER ','
CSV HEADER;

select * from messages;