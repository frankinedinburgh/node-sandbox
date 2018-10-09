const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });


const puppeteer = require('puppeteer');
const url = process.env.TESTING_URL;

(async() =>{
	const browser = await puppeteer.launch({
		headless: false,
		//slowMo: 100
	});
	const page = await browser.newPage();
	await page.tracing.start({path: 'trace.json'});
	await page.goto(`${url}`, { waitUntil: 'networkidle2' });
	await page.tracing.stop();

})().catch(e => console.log(e));
