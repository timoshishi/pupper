DROP TABLE chat;

CREATE TABLE IF NOT EXISTS chat(
  id serial primary key,
  from_human boolean,
  user_id varchar(100),
  dog_id int,
  body varchar(1000),
  created_at timestamptz,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
        REFERENCES users(user_id),
    CONSTRAINT fk_dog
      FOREIGN KEY(dog_id)
        REFERENCES dogs(dog_id)
);

COPY chat(
  from_human,
  user_id,
  dog_id,
  body,
  created_at
) 
FROM 'C:\Users\timfr\Documents\github\hackreactor\puppr\data-generation\dummy\message.csv'
DELIMITER ','
CSV HEADER;

select * from messages;