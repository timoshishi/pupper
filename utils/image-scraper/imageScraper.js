const puppeteer = require('puppeteer');
const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

/* 
This file will search and download dogs or any other search term from unsplash.com
It will create a file in the designated S3 bucket in your user Routes photoUpload folder
To use, update dogNames to whatever you want the file to be named and it's final patch
Change the bearer token to a new one because the server endpoint is protected by Auth0
Specify which bucket and what env variables are needed in photoUpload.js
Turn on the server and run the script
The data generation for dogs will automatically map the dogs name to the image url in the specified bucket
*/

const dogNames = ['Scout', 'Jazz', 'Star', 'Ivy', 'Elsa', 'Catcher', 'Jun'];
// const dogNames = [
//   'Fido',
//   'Spot',
//   'Ginger',
//   'Yoshi',
//   'Jun',
//   'Sparkles',
//   'Puppet',
//   'Cotton',
//   'Julius',
//   'Woofer',
//   'HeMan',
//   'Ace',
//   'Flash',
//   'Apollo',
//   'Bear',
//   'Birdie',
//   'Indy',
//   'Hattie',
//   'Roxy',
//   'Ruby',
//   'Shadow',
//   'Scout',
//   'Jazz',
//   'Catcher',
//   'CiCi',
//   'Buzz',
//   'Boomer',
//   'Miz',
//   'Peach',
//   'Crush',
//   'Daisy',
//   'Phoenix',
//   'Juniper',
//   'Roo',
//   'Star',
//   'Echo',
//   'Latte',
//   'Laser',
//   'Sophie',
//   'Lila',
//   'Ivy',
//   'Elsa',
//   'Bella',
//   'Aurora',
//   'Francesca',
//   'Sparkles',
//   'Unicorn',
//   'Fluffy',
//   'Maggie',
//   'Kawaii',
//   'Chester',
//   'Chloe',
//   'Camille',
// ];
const dogBreeds = [
  'retriever',
  'pug',
  'shitzu',
  'bulldog',
  'poodle',
  'spaniel',
  'shiba',
  'jindo',
  'beagle',
  'chihuahua',
  'husky',
  'dachshund',
  'maltese',
  'pomeranian',
  'corgi',
  'collie',
  'greyhound',
  'bichon',
  'terrier',
  'pinscher',
];
//create an integer array that will be as long as the dogs name list
const intArr = [...new Array(100)].map((undef, i) => i + 1);

const imageScraper = async () => {
  //save file to current directory
  const path = `${__dirname}\\example.png`;
  try {
    dogNames.forEach(async (dog) => {
      setTimeout(async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        //search unsplash for a random photo and take a screenshot of each resulting photo we are directed to
        const puppy = `https://source.unsplash.com/800x600/?puppy,dog`;
        await page.goto(puppy);
        await page.on('load');
        await page.screenshot({ path: 'example.png' });

        //add the screenshot to form data for sending to server
        const formData = new FormData();
        formData.append('image', fs.createReadStream(path));

        //send image to our secure endpoint on the server with temporary token
        const options = {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ADD_TOKEN_HERE`,
          },
        };
        //send in the dog name as a parameter which the server will use to name the photo when it is uploaded to s3
        const response = await fetch(
          `http://localhost:5000/api/users/photos/${dog}`,
          options
        );
        const url = await response.json();
        console.log('url.msg', url.msg);
        await browser.close();
      }, 2000);
    });
  } catch (err) {
    return console.error('@imageScraper', err.message);
  }
};

imageScraper();
