const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });

const faker = require('faker');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPad = devices['iPad'];
const url = process.env.TESTING_URL;

const text =  JSON.stringify({
	title: faker.name.jobTitle(),
	excerpt: faker.lorem.lines(3),
	description: faker.lorem.text(200),
	tags: faker.lorem.words(3).split(' '),
	image: faker.image.imageUrl(),
	name: faker.name.firstName(),
	last: faker.name.lastName(),
	position: faker.name.jobType(),

}, null, 4);


fs.writeFile(path.join(__dirname, '../faker.txt'), text, function(err) {
	if(err) {
		return console.log(err);
	}

	console.log("The file was saved!");
	process.exit();
});







(async() => {

	const browser = await puppeteer.launch({
		headless: false,
		//slowMo: 100
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


	await page.click('body > div.ng-scope > upload-blog > div > div:nth-child(1) > div > div > div > form > div:nth-child(5) > div.add_cover.blog_thumb.hover-pointer.ng-pristine.ng-untouched.ng-valid.ng-scope.ng-empty')
	await page.uploadFile('../example.png');


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
})();
