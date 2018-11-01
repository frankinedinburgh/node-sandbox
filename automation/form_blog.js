/**
 * @link https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });

const faker = require('faker');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPad = devices['iPad'];
//const url = process.env.TESTING_URL;
const url = 'http://localhost:8100';



const filePath = path.join(process.env.HOME,  'Desktop/images/');

let files = fs.readdirSync(filePath, {
	withFileTypes: true
});

for (let j=0; j < files.length; j++) {
	files[j] = path.join(process.env.HOME, 'Desktop/images/', files[j])
	console.log(files[j])
}




(async() => {

	const browser = await puppeteer.launch({
		headless: false,
		viewport: {
			width: 375,
			height: 667,
			deviceScaleFactor: 2,
			isMobile: true,
			hasTouch: true,
			isLandscape: false
		}
	});
	const page = await browser.newPage();
	console.log(Object.keys(page));
	//await page.emulate(iPad);

	await page.goto(`${url}/upload-blog/`, { waitUntil: 'networkidle2' });
	await page.setViewport({ width: 1280, height: 1400 });
	await page.focus('body > div.ng-scope > upload-blog > div > div:nth-child(1) > div > div > div > form > div:nth-child(1) > input')
	await page.keyboard.type(faker.fake("{{lorem.sentence}}"));


	await page.focus('#exampleFormControlTextarea1')
	await page.keyboard.type(faker.lorem.lines(3));


	await page.focus('body > div.ng-scope > upload-blog > div > div:nth-child(1) > div > div > div > form > div:nth-child(3) > div > trix-editor')
	await page.keyboard.type(faker.fake("{{lorem.paragraph}}"));


	await page.focus('body > div.ng-scope > upload-blog > div > div:nth-child(1) > div > div > div > form > div:nth-child(4) > input')
	await page.keyboard.type(faker.fake("{{lorem.word}}"));


	await page.click('body > div.ng-scope > upload-blog > div > div:nth-child(1) > div > div > div > form > div:nth-child(5) > div.add_cover.blog_thumb')
	try{
		await page.uploadFile(...files);
	} catch(err) {
		throw 'Unable to upload file\n' + err;
	}

	await page.waitFor(2000);


	// Type into search box.
	//await page.type('input[name="title"]', 'Headless Chrome');

	// Wait for suggest overlay to appear and click "show all results".
	//const allResultsSelector = 'input[name="title"]';
	//await page.waitForSelector(allResultsSelector);
	//await page.click(allResultsSelector);
	//
	//// Wait for the results page to load and display the results.
	//const resultsSelector = '.gsc-results .gsc-thumbnail-inside a.gs-title';
	//await page.waitForSelector(resultsSelector);
	//
	//// Extract the results from the page.
	//const links = await page.evaluate(resultsSelector => {
	//	const anchors = Array.from(document.querySelectorAll(resultsSelector));
	//	return anchors.map(anchor => {
	//		const title = anchor.textContent.split('|')[0].trim();
	//		return `${title} - ${anchor.href}`;
	//	});
	//}, resultsSelector);
	//console.log(links.join('\n'));

	await browser.close();
})().catch(e => console.log(e));
