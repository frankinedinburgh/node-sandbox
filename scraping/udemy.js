const _ = require('lodash');
const puppeteer = require('puppeteer');


async function udemy() {

    const url = 'https://www.glassdoor.ie/';
    const browser = await puppeteer.launch({
        args: [
            '--enable-features=NetworkService',
            '--ignore-certificate-errors'
        ],
        ignoreHTTPSErrors: true,
        headless: true
    });
    const page = await browser.newPage();

    await Promise.all([
        page.waitForNavigation({timeout: 30000, waitUntil: 'networkidle2'}),
        page.goto(url),
        page.click('#JobActivityWrapper > div > div > header > nav > ul > li:nth-child(1) > span')
    ]);

    try {
        await page.evaluate(() => {
            let elems = document.querySelectorAll('#JobActivityWrapper > div > div > article > div > ul')[0];
            console.log(elems)
        });
    } catch(err) {
        console.log(err)
        browser.close();
    }
    browser.close();
}




udemy();


