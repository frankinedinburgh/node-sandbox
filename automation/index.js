const path = require('path')
const dotenv = require('dotenv')
dotenv.config({path: path.join(__dirname, '../.env')});
// https://pptr.dev/



const puppeteer = require('puppeteer');




(async () => {
	const browser = await puppeteer.launch({
		devtools: true,
		headless: false
	});
	const page = await browser.newPage();
	for(var i=0; i<=70; i++) {
		await page.goto('https://www.poll-maker.com/poll2129695x202b4f4A-60', { waitUntil: 'networkidle2'});
		await page.click('#qp_form2129695 > div.qp_ao > div:nth-child(7) > span > input');
		await page.click('#qp_form2129695 > div.qp_bo > a.qp_hra > input');
	}


	await browser.close();
})();
