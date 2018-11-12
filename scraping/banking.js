require('dotenv').config({ path: `${process.env.HOME}/Sites/node-sandbox/.env` });

const _ = require('lodash');
const fs = require('fs');
const puppeteer = require('puppeteer');


async function banking() {
	const url = process.env.BANK_URL;
	const pass = process.env.PASS_CODE;
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto(url, {
		timeout: 0,
		waitUntil: 'networkidle2'
	});

	// get price change details
	await page.waitForSelector('#loginstep1Form', { visible: true })
						.then(() => console.log('Navigation is set: '));
	await page.type('#regNumber_id', process.env.REG, {delay: 10})
	await page.click('#nextButton');
	await page.waitForSelector('#loginstep2Form', { visible: true })

	const result = await page.evaluate(() => {

		let form = document.getElementById('loginstep2Form').innerText;
		form = form.split('\n')
							 .filter(Boolean)
							 .filter(d => /Digit/.test(d))
							 .map(d => d.replace('Digit ', ''))
							 .map(d => parseInt(d))
							 .map(d => pass[d]);
		return form;
	});



	console.log(result);
	await page.waitFor(0);
	//try {
	//	let results = await page.evaluate(() => {
	//		let companies = [];
	//		let info = document.querySelectorAll('span.company');
	//		info.forEach((el, index) => {
	//
	//
	//			console.log(el.innerText)
	//			companies.push(el.innerText);
	//		});
	//
	//		return companies;
	//	});
	//
	//	console.log(_.uniq(results));
	//	saveToFile(JSON.stringify(_.uniq(results), null, 4))
	//}
	//catch (error) {
	//	console.log(error);
	//	browser.close();
	//}

	await browser.close();
}

function saveToFile(data) {
	fs.writeFile('./playground/jobs.json', data, function (err) {
		if (err) throw err;
		console.log('Saved!');
	});
}



banking();



