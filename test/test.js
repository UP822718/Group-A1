const main = require('../server/main.js');
const assert = require('assert');
const puppeteer = require('puppeteer');

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('http://localhost:8080');
