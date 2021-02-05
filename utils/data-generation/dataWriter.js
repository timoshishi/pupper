const { random } = require('faker');
const ObjectsToCsv = require('objects-to-csv');
const { v4: uuidv4 } = require('uuid');
const createDog = require('./createDog.js');
const createInterests = require('./createInterests.js');
const createMatch = require('./createMatch.js');
const createMessage = require('./createMessage.js');
const createProfile = require('./createProfile.js');
const createUser = require('./createUser.js');

const qty = 9;

const userIdArr = [...new Array(qty)].map((un) => uuidv4());
const dogIdArr = [...new Array(qty)].map((un) => uuidv4());

//creates a random array of messages with numbers evenly distributed between dog senders and human senders

const writeData = () => {
  const dogs = dogIdArr.map((id) => createDog(id));
  const users = userIdArr.map((id) => createUser(id));
  const dogCsv = new ObjectsToCsv(dogs);
  const userCsv = new ObjectsToCsv(users);
  userCsv.toDisk('./dummy/user.csv');
  dogCsv.toDisk('./dummy/dog.csv');

  const messages = createMessages(qty);
  const messageCsv = new ObjectsToCsv(messages);
  messageCsv.toDisk('./dummy/message.csv');

  const dogInterests = dogIdArr.map((id) => createInterests(id));
  const userInterests = userIdArr.map((id) => createInterests(id));
  const interestsCsv = new ObjectsToCsv(dogInterests.concat(userInterests));
  interestsCsv.toDisk('./dummy/interests.csv');

  const matches = createMatches(qty, userIdArr, dogIdArr);
  const matchesCsv = new ObjectsToCsv(matches);
  matchesCsv.toDisk('./dummy/matches.csv');

  const dogProfiles = dogIdArr.map((id) => createProfile(id));
  const userProfiles = userIdArr.map((id) => createProfile(id));
  const profilesCsv = new ObjectsToCsv(dogProfiles.concat(userProfiles));
  profilesCsv.toDisk('./dummy/profilesCsv.csv');
};

const createMessages = (qty) => {
  const messages = [...new Array(qty * 3)].map((msg) => {
    const randomPersonId =
      userIdArr[Math.floor(Math.random() * userIdArr.length)];
    const randomDogId = dogIdArr[Math.floor(Math.random() * dogIdArr.length)];

    if (Math.random() > 0.5) {
      return createMessage(randomDogId, randomPersonId);
    } else {
      return createMessage(randomPersonId, randomDogId);
    }
  });
  return messages;
};

//randomize unique matches between dogs and users using UUIDs
const createMatches = (qty, users, dogs) => {
  users = [...users];
  dogs = [...dogs];
  const matches = [];

  for (let i = 0; i < qty / 3; i++) {
    const randomDogIdx = Math.floor(Math.random() * dogs.length);
    const randomUserIdx = Math.floor(Math.random() * users.length);
    const randomDog = dogs.splice(randomDogIdx, 1)[0];
    const randomUser = users.splice(randomUserIdx, 1)[0];

    if (Math.random > 0.5) {
      matches.push(createMatch(randomDog, randomUser));
    } else {
      matches.push(createMatch(randomUser, randomDog));
    }
  }

  return matches;
};

writeData();
