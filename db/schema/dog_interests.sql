--DROP TABLE interests;


CREATE TABLE IF NOT EXISTS dog_interests(
  id serial primary key,
  dog_id int,
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