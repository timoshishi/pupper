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
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImNfT2JBTmNkTlpNT0RlZGhEWndHdyJ9.eyJpc3MiOiJodHRwczovL2Rldi1pdXhpaGQ0NS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTE2Nzk2MzkwMzkxODEwMjI2MDUiLCJhdWQiOlsiaHR0cHM6Ly90aW1vc2hpc2hpLXB1cHByLmhlcm9rdWFwcC5jb20vIiwiaHR0cHM6Ly9kZXYtaXV4aWhkNDUudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYxMDA0MTY2NiwiZXhwIjoxNjEwMTI4MDY2LCJhenAiOiJRcnBVRjM1N0hLRFFQdUw3YmQ5MEdTbTZHY3dYeVhCUSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.m026QSXoB2pJyiF7VBnBJNfJA01sBm8n_8JyzvriumCBwHXmr1RFmR_9gJsLv_IAsoHifekr7GfIAYiXmNYh_1HY_MnkR8tqJhouA0NryQyFO-MyUl531C1cOGtIScPbHvpX2IKhM7lsiBHBqVfXCtKg6dtj2x5nSD4qCHXF95H1ArxeJ7hAakJXkhMGVIUL25MRg3dX7IPpI2zeg36UaH92Qkzjqqq5Z07AMOXx12Z-8mnCO7rXOpvR9fvjMxihli4LyAFqxJj0Cc4l2Rizh0KSN7hjdB_E6v7O93rp9xzna0jPIEujArEEdlVjVls2fU30Zo4SxxaP5S9nTVpAMg`,
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
