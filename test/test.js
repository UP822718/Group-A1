const main = require('../server/main.js');
const assert = require('assert');
const puppeteer = require('puppeteer');

describe('Web interface', function() {
  describe('signup', function() {
    describe('invalid', function() {
      it("send back nothing", async function() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:8080/signup');
        let response = await page.evaluate(async function()  {
          const [response] = await Promise.all([
            page.waitForNavigation(),
            document.documentElement.querySelector('#submit').click()
          ]);
          return response;
        });
        console.log(response);
        await browser.close();
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
