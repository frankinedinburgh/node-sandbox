const puppeteer = require('puppeteer');
const fs = require('fs');
const _ = require('lodash');


async function fn() {
	let URL = `https://www.theguardian.com/international`;
	const CLICK_1 = '#top > div.site-message.js-site-message.js-double-site-message.site-message--banner.site-message--double-banner > div.js-first-pv-consent-site-message.site-message--first-pv-consent > div > div > div.site-message__copy.js-site-message-copy.u-cf > div.site-message--first-pv-consent__actions > button';
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto(URL);

	// get hotel details
	await page.waitForSelector(CLICK_1, {visible: true})
	await page.click(CLICK_1)

	const inputElement = await page.$('#headlines > div > div.fc-container--rolled-up-hide.fc-container__body');
	await inputElement.click();

	try {
		let data = await page.evaluate(() => {
			let elems = '#headlines > div > div.fc-container--rolled-up-hide.fc-container__body > div:nth-child(1) > ul li';
			elems = document.querySelectorAll(elems);
			return _.map(elems, 'innerText');
		});
		console.log(data);
	} catch (error) {
		console.log(error);
		browser.close();
	}
	browser.close();
}


fn()
