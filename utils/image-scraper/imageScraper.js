const puppeteer = require('puppeteer');
const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

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
  'pomerian',
  'corgi',
  'collie',
  'greyhound',
  'bichon',
  'terrier',
  'wolfhound',
  'pinscher',
];
const imageScraper = async () => {
  //save file to current directory
  const path = `${__dirname}\\example.png`;
  try {
    dogBreeds.forEach(async (dog) => {
      setTimeout(async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const puppy = `https://source.unsplash.com/800x600/?${dog}`;
        await page.goto(puppy);
        await page.on('load');
        await page.screenshot({ path: 'example.png' });

        //add file to form data for sending to server
        const formData = new FormData();
        formData.append('image', fs.createReadStream(path));

        const options = {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImNfT2JBTmNkTlpNT0RlZGhEWndHdyJ9.eyJpc3MiOiJodHRwczovL2Rldi1pdXhpaGQ0NS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTE2Nzk2MzkwMzkxODEwMjI2MDUiLCJhdWQiOlsiaHR0cHM6Ly90aW1vc2hpc2hpLXB1cHByLmhlcm9rdWFwcC5jb20vIiwiaHR0cHM6Ly9kZXYtaXV4aWhkNDUudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYwOTI2NTIxNywiZXhwIjoxNjA5MzUxNjE3LCJhenAiOiJRcnBVRjM1N0hLRFFQdUw3YmQ5MEdTbTZHY3dYeVhCUSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.crgrlKCvtKUBGgnIRvOkfx-1dTdMgrLV1vi_xw5HgLw135lpu-QPf3ssEbziCH8scL8krgtQlRh3T0R_zbMmF9pNaicNN_lJZ5bm8sa3LTFgPRvimZ9jMkF98LQYF0PDvqAlXk8HroNKy29DdAtU3GDgoByu3Txeu6MVPn8HZjK6j1GatJOu1hKekzlZfBQc_28qEOev1Q63fcLZlogc0MDtei5-k00t-Vj2InAQ02l7y7wBW9Wj3PVJi3QUEZjbJB_S7s3IlElpVvD7v9Dd87mMbLZMeZfzAEUuMyRlhG7KxHUekQwgQndXCqehMpBqLKtJklKjJZMO7KIvfQbkKQ`,
          },
        };
        const response = await fetch(
          `http://localhost:5000/api/users/photos/${dog}`,
          options
        );
        const url = await response.json();
        console.log('url.msg', url.msg);
        await browser.close();
      }, 500);
    });
  } catch (err) {
    return console.error('@imageScraper', err.message);
  }

  // const res = await page.$('img');
  // const imgUrl = await res._frameManager._mainFrame._url;
};

imageScraper();
