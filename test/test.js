const main = require('../server/main.js');
const assert = require('assert');
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('http://localhost:8080');

describe('signup', function () {
  it('it shuld allow me to make a user with the password set to test and the user name set to test when there are no user in the DB',function() {

  })
  it('it sguld not allow me to put in to password that are diffrunt')
});
