const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://34.76.102.144:8080/signup.html', { waitUntil : ['load', 'domcontentloaded']});
    f = await page.evaluate(() => {
      try {
        document.documentElement.querySelector('#particles-js > span > form > span:nth-child(2) > input[type="password"]').setAttribute('value', 'value');
        document.documentElement.querySelector('#submit').click()
       return false;
      } catch (err) {
        return true;
      }
    });
  console.log(f);
  await browser.close();
})();
