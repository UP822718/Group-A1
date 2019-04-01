//const main = require('../server/main.js');
const assert = require('assert');
const puppeteer = require('puppeteer');

  it('website is up', async function() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('http://34.76.102.144:8080');
      await browser.close();
  });


describe('Web interface', function() {
  describe('signup', function() {
    describe('invalid', function() {
      it("send back nothing", async function() {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('http://34.76.102.144:8080/signup.html');
        output = await page.evaluate(() => {
          try {
           document.documentElement.querySelector('#submit').click()
           return false;
          } catch (err) {
            return true;
          }
        });
        await browser.close();
        assert.equal(true,output);
      });
      it("send back username only", async function() {});
      it("send back password only", async function() {});
      it("send back confirm confirm Password only", async function() {});
      it("send back confirm confirm Password and Password  only", async function() {});
      it("send back confirm confirm Password and username  only",async function() {});

      it("send back confirm confirm confirm Password and username  only", async function() {});
    });
    describe('valid', function() {
      it("send back password and username", async function() {});
    });
  });
  describe('Login', function() {
    describe('invalid', function() {
      it("send back nothing", async function() {});
      it("send back invalid username only ", async function() {});
      it("send back invalid password only", async function() {});
      it("send back invalid password and username", async function() {});
      it("send back valid password only", async function() {});
      it("send back valid username only ", async function() {});
    });
    describe('valid', function() {
      it("send back password and username", async function() {});
    });
  });
});
