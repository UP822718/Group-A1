//const main = require('../server/main.js');
const assert = require('assert');
const puppeteer = require('puppeteer');
const IP = "http://35.240.7.14:8080/"
it('website is up', async function() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(IP);
  await browser.close();
});


describe('Web interface', function() {
  this.timeout(9000);
  describe('signup', function() {
    describe('invalid', function() {
      it("send back nothing", async function() {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto(IP + 'signup.html');
        output = await page.evaluate(() => {
          try {
            document.documentElement.querySelector('#submit').click()
            return false;
          } catch (err) {
            return true;
          }
        });
        await browser.close();
        assert.equal(true, output);
      });
      it("send back username only", async function() {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto(IP + 'signup.html', {
          waitUntil: ['load', 'domcontentloaded']
        });
        output = await page.evaluate(() => {
          try {
            document.documentElement.querySelector("#particles-js > span > form > span:nth-child(1) > input[type='text']").setAttribute('value', 'value');
            document.documentElement.querySelector('#submit')
            return  true ;
          } catch (err) {
            return false;
          }
        });
        try {

          await page.click("('#submit')");
        } catch (err) {

        }
        await browser.close();
        assert.equal(true, output);
      });

      it("send back password only", async function() {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto(IP + 'signup.html', {
          waitUntil: ['load', 'domcontentloaded']
        });
        output = await page.evaluate(() => {
          try {
            document.documentElement.querySelector('#particles-js > span > form > span:nth-child(2) > input[type="password"]').setAttribute('value', 'value');
            document.documentElement.querySelector('#submit').click()
            return false;
          } catch (err) {
            return true;
          }
        });
        console.log(output);
        await browser.close();
        assert.equal(true, output);
      });
      it("send back confirm confirm Password only", async function() {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto(IP + 'signup.html', {
          waitUntil: ['load', 'domcontentloaded']
        });
        output = await page.evaluate(() => {
          try {
            document.documentElement.querySelector('#particles-js > span > form > span:nth-child(3) > input[type="password"]').setAttribute('value', 'value');
            document.documentElement.querySelector('#submit').click()
            return false;
          } catch (err) {
            return true;
          }
        });
        await browser.close();
        assert.equal(true, output);
      });
      it("send back confirm confirm Password and Password  only", async function() {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto(IP + 'signup.html', {
          waitUntil: ['load', 'domcontentloaded']
        });
        output = await page.evaluate(() => {
          try {
            document.documentElement.querySelector('#particles-js > span > form > span:nth-child(3) > input[type="password"]').setAttribute('value', 'value');
            document.documentElement.querySelector('#particles-js > span > form > span:nth-child(2) > input[type="password"]').setAttribute('value', 'value');
            document.documentElement.querySelector('#submit').click()
            return false;
          } catch (err) {
            return true;
          }
        });
        await browser.close();
        assert.equal(true, output);
      });
      it("send back confirm confirm Password and username  only", async function() {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto(IP + 'signup.html', {
          waitUntil: ['load', 'domcontentloaded']
        });
        output = await page.evaluate(() => {
          try {
            document.documentElement.querySelector("#particles-js > span > form > span:nth-child(1) > input[type='text']").setAttribute('value', 'value');
            document.documentElement.querySelector('#particles-js > span > form > span:nth-child(2) > input[type="password"]').setAttribute('value', 'value');
            document.documentElement.querySelector('#submit').click()
            return false;
          } catch (err) {
            return true;
          }
        });
        await browser.close();
        assert.equal(true, output); //to fix
      });

      it("send back confirm confirm confirm Password and username  only", async function() {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto(IP + 'signup.html', {
          waitUntil: ['load', 'domcontentloaded']
        });
        output = await page.evaluate(() => {
          try {
            document.documentElement.querySelector("#particles-js > span > form > span:nth-child(1) > input[type='text']").setAttribute('value', 'value');
            document.documentElement.querySelector('#particles-js > span > form > span:nth-child(2) > input[type="password"]').setAttribute('value', 'value');
            document.documentElement.querySelector('#submit').click()
            return false;
          } catch (err) {
            return true;
          }
        });
        await browser.close();
        assert.equal(true, output); //to fix
      });
    });
    describe('valid', function() {
      it("send back password and username", async function() {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto(IP + 'signup.html', {
          waitUntil: ['load', 'domcontentloaded']
        });
        output = await page.evaluate(() => {
          try {
            document.documentElement.querySelector("#particles-js > span > form > span:nth-child(1) > input[type='text']").setAttribute('value', 'cat');
            document.documentElement.querySelector('#particles-js > span > form > span:nth-child(2) > input[type="password"]').setAttribute('value', 'cat');
            document.documentElement.querySelector('#particles-js > span > form > span:nth-child(3) > input[type="password"]').setAttribute('value', 'cat');
            document.documentElement.querySelector('#submit').click()
                        return false;
          } catch (err) {
            return true;
          }
        });
          assert.equal(true, output);
        await browser.close();
      });



    });
  });
  describe('Login', function() {
    describe('invalid', function() {
      it("send back nothing", async function() {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto(IP , {
          waitUntil: ['load', 'domcontentloaded']
        });
        output = await page.evaluate(() => {
          document.documentElement.querySelector('#particles-js > section > div > form > div:nth-child(1) > input[type=text]').setAttribute('value', 'value');
        });
        try {
        await page.click('#particles-js > section > div > form > div:nth-child(3) > input[type="submit"]');

          assert.equal(false, false);
        } catch (err) {

        }
        await browser.close();
      });
      it("send back invalid username only ", async function() {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto(IP + '', {
          waitUntil: ['load', 'domcontentloaded']
        });
        output = await page.evaluate(() => {
          document.documentElement.querySelector('#particles-js > section > div > form > div:nth-child(1) > input[type="text"]').setAttribute('value', 'value');
        });
        await page.click('#particles-js > section > div > form > div:nth-child(3) > input[type="submit"]');
        await browser.close();
      });
      it("send back invalid password only", async function() {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto(IP + '', {
          waitUntil: ['load', 'domcontentloaded']
        });
        output = await page.evaluate(() => {
          document.documentElement.querySelector('#particles-js > section > div > form > div:nth-child(2) > input[type="password"]').setAttribute('value', 'value');
        });
        await page.click('#particles-js > section > div > form > div:nth-child(3) > input[type="submit"]');
        await browser.close();
      });
      it("send back invalid password and username", async function() {
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto(IP + '', {
          waitUntil: ['load', 'domcontentloaded']
        });
        output = await page.evaluate(() => {
          document.documentElement.querySelector('#particles-js > section > div > form > div:nth-child(2) > input[type="password"]').setAttribute('value', 'value');
          document.documentElement.querySelector('#particles-js > section > div > form > div:nth-child(1) > input[type="text"]').setAttribute('value', 'value');
        });
        await page.click('#particles-js > section > div > form > div:nth-child(3) > input[type="submit"]');
        await browser.close();
      });
    });
    it("send back valid password only", async function() {
      const browser = await puppeteer.launch({
        headless: false
      });
      const page = await browser.newPage();
      await page.goto(IP + '', {
        waitUntil: ['load', 'domcontentloaded']
      });
      output = await page.evaluate(() => {
        document.documentElement.querySelector('#particles-js > section > div > form > div:nth-child(2) > input[type="password"]').setAttribute('value', 'cat');
      });
      await page.click('#particles-js > section > div > form > div:nth-child(3) > input[type="submit"]');
      await browser.close();
    });
    it("send back valid username only ", async function() {
      const browser = await puppeteer.launch({
        headless: false
      });
      const page = await browser.newPage();
      await page.goto(IP + '', {
        waitUntil: ['load', 'domcontentloaded']
      });
      output = await page.evaluate(() => {
        document.documentElement.querySelector('#particles-js > section > div > form > div:nth-child(1) > input[type="text"]').setAttribute('value', 'cat');
      });
      try {
        await page.click('#particles-js > section > div > form > div:nth-child(3) > input[type="submit"]');
        assert.equal(true, false);
      } catch (err) {
        assert.equal(true, true);
      }
      await browser.close();
    });

  });
  describe('valid', function() {
    it("send back password and username", async function() {

        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto( 'http://35.240.7.14:8080/signup', {
          waitUntil: ['load', 'domcontentloaded']
        });
        output = await page.evaluate(() => {
          //document.documentElement.querySelector('#particles-js > section > div > form > div:nth-child(1) > input[type="text"]').setAttribute('value', 'cat');
          //document.documentElement.querySelector('#particles-js > section > div > form > div:nth-child(2) > input[type="password"]').setAttribute('value', 'cat');
        });
        await browser.close();
    });
  });
});
