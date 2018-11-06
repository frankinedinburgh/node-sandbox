const puppeteer = require('puppeteer');





async function daft() {
	const browser = await puppeteer.launch({
		headless: false
	});
	const params = encodeURIComponent('s[mxp]=300000&s[mxb]=2');
	const url = `https://www.daft.ie/dublin/apartments-for-sale/castleknock/?${params}`;

	const page = await browser.newPage();
	await page.goto(url, {
		waitUntil: 'networkidle2',
		timeout: 0
	});
	await browser.close();

}



async function indeed() {
	const url = 'https://ie.indeed.com/jobs?as_and=javascript+developer&as_phr=&as_any=&as_not=&as_ttl=&as_cmp=&jt=permanent&st=employer&as_src=&radius=25&l=Dublin&fromage=any&limit=50&sort=&psf=advsrch';
	const browser = await puppeteer.launch({
		headless: false
	});
	const page = await browser.newPage();

	await page.goto(url, {
		waitUntil: 'networkidle2',
		timeout: 0
	});
	await browser.close();

}


function saveToFile(data) {
	fs.writeFile('./playground/price-changes.json', data, function (err) {
		if (err) throw err;
		console.log('Saved!');
	});
}


indeed();


