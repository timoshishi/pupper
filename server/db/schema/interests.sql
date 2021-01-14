DROP TABLE interests;


CREATE TABLE IF NOT EXISTS interests(
  id serial primary key,
  user_id varchar(100) UNIQUE,
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
COPY interests(
  user_id,
  walkies,
  scritches,
  the_beach,
  playing_fetch,
  nap_time,
  running,
  frolicking,
  cuddles,
  wrestling,
  tug_of_war
) 
FROM 'C:\Users\timfr\Documents\github\hackreactor\puppr\data-generation\dummy\interests.csv'
DELIMITER ','
CSV HEADER;

select * from interests;