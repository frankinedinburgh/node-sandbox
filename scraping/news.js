const puppeteer = require('puppeteer');
const fs = require('fs');
const _ = require('lodash');


async function fn() {
	let URL = `https://www.imdb.com/`;
	const pageOpts = {
	    timeout: 0,
        waitUntil: 'networkidle2'
	};
	const browserOpts = {
        headless: true,
        devtools: false
    };

	const browser = await puppeteer.launch(browserOpts);
	const page = await browser.newPage();
	await page.goto(URL, pageOpts);
	await page.waitForSelector('#navTitleMenu');
	await page.hover('#navTitleMenu');
    await page.waitForSelector('#navMenu1', { visible: true }).catch(err => { console.log('There has been an erro here')});
	await page.click('#navMenu1 > div:nth-child(2) > ul:nth-child(2) > li:nth-child(1) > a');
    await page.waitForNavigation();
    await page.waitFor(10000);
    await page.title();

    await page.$eval('h4', function(heading) {
        return heading.innerText;
    }).then(res => { console.log(res)})
    browser.close();
    // await page.$$('#cinemas-at-list').catch(err => { console.log(err )});
    //
    //
    //
	// // await page.click('#top > div.site-message.js-site-message.site-message--fiv-banner.site-message--banner > div > div > div.site-message__copy.js-site-message-copy.u-cf > div.fiv-banner__close > button');
    //
    // let data = await page.evaluate(() => {
    //     let els = document.querySelectorAll('#cinemas-at-list .list_item h4');
    //     return _.map(els, 'innerText');
    // });
    // console.log(data)


    // browser.close();
}


fn()
