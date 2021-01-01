const dogSounds = [
  'woof',
  'woof',
  'woof',
  'arf',
  'bowow',
  'bowow',
  'yip',
  'grrrrr',
  'grrrrr',
  'meong meong',
  'ruff',
  'vuf',
  'bau',
  'bow bow',
];

const firstToUpper = (str) => str[0].toUpperCase() + str.slice(1);

//returns an array of between 1 and 4 sentences
const woofBot = () => {
  const sentenceLength = Math.floor(Math.random() * (12 - 4) + 4);
  const sentence = [...new Array(sentenceLength)].map((un, i) => {
    const idx = Math.floor(Math.random() * dogSounds.length);
    if (i === 0) {
      return firstToUpper(dogSounds[idx]);
    } else {
      return dogSounds[idx] + (Math.random() > 0.8 ? ',' : '');
    }
  });

  return sentence.join(' ');
};

module.exports = woofBot;
