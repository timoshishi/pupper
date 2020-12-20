--DROP TABLE messages

CREATE TABLE IF NOT EXISTS messages(
  id serial primary key,
  user_id varchar(100),
  to_user varchar(100),
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