DROP TABLE users;

CREATE TABLE IF NOT EXISTS users(
  user_id varchar(100),
  email varchar(100),
  name varchar(100),
  phone varchar(20),
  created_at timestamptz,
  PRIMARY KEY(user_id)
);

CREATE INDEX idx_user_id on users(user_id);

COPY users(
  user_id,
  email,
  name,
  phone,
  created_at
) 
FROM 'C:\Users\timfr\Documents\github\hackreactor\puppr\data-generation\dummy\user.csv'
DELIMITER ','
CSV HEADER;

select * from users;