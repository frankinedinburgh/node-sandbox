const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: path.join(__dirname, '../.env')});

const url = process.env.TESTING_URL;
console.log(url)
//process.exit();



const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle2' });
	await page.screenshot({path: 'example2.png', fullPage: true });

	await browser.close();
})();
