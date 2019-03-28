const main = require('../server/main.js');
const assert = require('assert');
const puppeteer = require('puppeteer');
let browser = {};
let page = {};
async function setup() {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:8080');
}

// describe('HTTP interface', function() {
//   describe('signup', function() {
//
//   });
//   describe('Login', function() {
//
//   });
// });

describe('Web interface', function() {
  describe('signup', function() {
    describe('invalid', function() {
      it("send back nothing", async function() {
        await page.evaluate(() => {
          document.documentElement.querySelector('#username').value = "";
          document.documentElement.querySelector('#password').value = "";
          document.documentElement.querySelector('#confirmPassword').value = "";
          document.documentElement.querySelector('#submit').click();
        });
      });
      it("send back username only", async function() {
        await page.evaluate(() => {
          document.documentElement.querySelector('#username').value = "test";
          document.documentElement.querySelector('#password').value = "";
          document.documentElement.querySelector('#confirmPassword').value = "";
          document.documentElement.querySelector('#submit').click();
        });
      });
      it("send back password only", async function() {
        await page.evaluate(() => {
          document.documentElement.querySelector('#username').value = "";
          document.documentElement.querySelector('#password').value = "test";
          document.documentElement.querySelector('#confirmPassword').value = "";
          document.documentElement.querySelector('#submit').click();
        });
      });
      it("send back confirm confirm Password only", async function() {
        await page.evaluate(() => {
          document.documentElement.querySelector('#username').value = "";
          document.documentElement.querySelector('#password').value = "";
          document.documentElement.querySelector('#confirmPassword').value = "test";
          document.documentElement.querySelector('#submit').click();
        });
      });
      it("send back confirm confirm Password and Password  only", async function() {
        await page.evaluate(() => {
          document.documentElement.querySelector('#username').value = "";
          document.documentElement.querySelector('#password').value = "test";
          document.documentElement.querySelector('#confirmPassword').value = "test";
          document.documentElement.querySelector('#submit').click();
        });
      });
      it("send back confirm confirm Password and username  only", async function() {
        await page.evaluate(() => {
          document.documentElement.querySelector('#username').value = "test";
          document.documentElement.querySelector('#password').value = "test";
          document.documentElement.querySelector('#confirmPassword').value = "";
          document.documentElement.querySelector('#submit').click();
        });
      });
      it("send back confirm confirm confirm Password and username  only", async function() {
        await page.evaluate(() => {
          document.documentElement.querySelector('#username').value = "test";
          document.documentElement.querySelector('#password').value = "";
          document.documentElement.querySelector('#confirmPassword').value = "test";
          document.documentElement.querySelector('#submit').click();
        });
      });
    });
    describe('valid', function() {
      it("send back password and username", async function() {
        await page.evaluate(() => {
          document.documentElement.querySelector('#username').value = "test";
          document.documentElement.querySelector('#password').value = "test";
          document.documentElement.querySelector('#confirmPassword').value = "test";
          document.documentElement.querySelector('#submit').click();
        });
      });
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
