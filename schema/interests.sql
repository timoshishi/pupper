--DROP TABLE interests

CREATE TABLE IF NOT EXISTS interests(
  id serial primary key,
  user_id varchar(100),
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
	