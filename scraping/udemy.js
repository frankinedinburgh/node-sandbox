/**
 * @link https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
 */

const puppeteer = require('puppeteer');
const _ = require('lodash');
const URL = 'https://www.glassdoor.ie/index.htm';
const FIRST_SELECTOR = '#_evidon-accept-button';
const SECOND_SELECTOR = '#KeywordSearch';
const THIRD_SELECTOR = '#JobActivityWrapper > div > div > header > nav > ul li';
const FOURTH_SELECTOR = '#_evidon-accept-button';


(async () => {
	const browser = await puppeteer.launch({
		headless: true,
		timeout: 3000
	})
	const page = await browser.newPage();

		await page.goto(URL, { waitUntil: 'networkidle2' });
		await page.waitForSelector(FIRST_SELECTOR);
		await page.click(FIRST_SELECTOR, { clickCount: 1 });
		await page.type(SECOND_SELECTOR, 'Senior javascript developer', {delay: 0});
		await page.waitForSelector('#MainCol', {visible: true});
		try {
			let data = await page.evaluate(() => {
				let elems = document.querySelectorAll('#MainCol > div > ul li');
				return _.chain(elems).value();
			});

			console.log(data);
		} catch(err) {
			console.log(err)
			browser.close();
		}

	browser.close();
})();


