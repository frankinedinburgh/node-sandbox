const puppeteer = require('puppeteer');
const _ = require('lodash');
const url = 'https://www.myhome.ie/residential/onview/dublin-15/property-for-sale';

(async () =>{
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto(url, {waitUntil: 'networkidle2'});
	// Get the "viewport" of the page, as reported by the page.
	const dimensions = await page.evaluate(() => {
		let items = document.querySelectorAll('.mhPropertyListItem');
			items = _.chain(items).map('innerHTML').value()
		return {
			items
		}
		//let list = [];
		//items.forEach((val, key) => {
		//	list.push(val.content())
		//})
		//return { list }
	});

	console.log('Dimensions:', dimensions);

	await browser.close();
})();
