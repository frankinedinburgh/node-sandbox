const puppeteer = require('puppeteer');
const URL = `https://sandbox.altv.com/dugout/om-greatest-the-greatest-strikers-d`;


(async () => {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
	const page = await browser.newPage();
	await page.goto(URL, { waitUntil: 'networkidle2' });
	await page.waitForSelector('#player-dugout-video-3', { imeout: 10000 })
	await page.screenshot({
		path: 'ads.png',
		fullPage: true
	});
	await browser.close();
})();
