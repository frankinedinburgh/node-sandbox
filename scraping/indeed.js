const _ = require('lodash');
const fs = require('fs');
const puppeteer = require('puppeteer');



async function indeed() {

	const url = 'https://ie.indeed.com/jobs?as_and=javascript+developer&as_phr=&as_any=&as_not=&as_ttl=&as_cmp=&jt=permanent&st=employer&as_src=&radius=25&l=Dublin&fromage=any&limit=50&sort=&psf=advsrch';
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto(url, {
		timeout: 0
	});

	// get price change details
	await page.waitForSelector('#resultsCol', { visible: true })
						.then(() => console.log('Results found: '));
	try {
		let results = await page.evaluate(() => {
			let companies = [];
			let info = document.querySelectorAll('span.company');
			info.forEach((el, index) => {


				console.log(el.innerText)
				companies.push(el.innerText);
			});

			return companies;
		});

		console.log(_.uniq(results));
		saveToFile(JSON.stringify(_.uniq(results), null, 4))
	}
	catch (error) {
		console.log(error);
		browser.close();
	}

	browser.close();
}

function saveToFile(data) {
	fs.writeFile('./playground/jobs.json', data, function (err) {
		if (err) throw err;
		console.log('Saved!');
	});
}



async function indeed() {
	const url = 'https://www.glassdoor.ie/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=senior+front+end+developer&sc.keyword=senior+front+end+developer&locT=C&locId=2739035&jobType=';
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto(url, {
		timeout: 0
	});

	// get price change details
	await page.waitForSelector('#MainCol', { visible: true })
						.then(() => console.log('Connected to Glass Door: '));

	try {

	} catch(err) {
		browser.close();
	}
}



indeed();


