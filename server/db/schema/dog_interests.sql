DROP TABLE dog_interests;


CREATE TABLE IF NOT EXISTS dog_interests(
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
COPY dog_interests(
  dog_id,
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
FROM 'C:\Users\timfr\Documents\github\hackreactor\puppr\utils\data-generation\dummy\dog_interests.csv'
DELIMITER ','
CSV HEADER;

\copy dog_interests from 'C:\Users\timfr\Documents\github\hackreactor\puppr\utils\data-generation\dummy\dog_interests.csv' CSV HEADER;

select * from dog_interests;