const puppeteer = require('puppeteer');


async function poll() {
	const url = 'https://www.poll-maker.com/poll2139704x6eBc400C-60';
	//const sel = document.querySelector('[name="qp_v2139704"]');
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	const page = await browser.newPage();








	for(var i=0; i<= 3; i++) {
		await page.goto(url, {
			waitUntil: 'networkidle2',
			timeout: 0
		});
		await page.evaluate(() => {
			const sel = document.querySelector('[name="qp_v2139704"]');
			sel.click();
		});
	}

	await browser.close();

}




function saveToFile(data) {
	fs.writeFile('./playground/price-changes.json', data, function (err) {
		if (err) throw err;
		console.log('Saved!');
	});
}


poll();


