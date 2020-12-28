const { json } = require('express');

const zipCodeMaker = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const photoStringMaker = () => {
  const randomAmt = Math.floor(Math.random() * (9 - 1) + 1);
  let returnStr = '{';
  for (let i = 0; i <= randomAmt; i++) {
    if (i === randomAmt) {
      returnStr += 'https://picsum.photos/200/300}';
    } else {
      returnStr += 'https://picsum.photos/200/300, ';
    }
  }
  return returnStr;
};

const photoArrMaker = () => {
  return [...new Array(4)].map((noVal) => 'https://picsum.photos/200/300');
};
console.log(JSON.stringify(photoArrMaker()));
module.exports = { zipCodeMaker, photoStringMaker };
