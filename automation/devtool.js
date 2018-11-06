// Node.js version: 8.9.4
const puppeteer = require('puppeteer'); // version 1.0.0

(async () => {
	// Prevent Puppeteer from showing the "Chrome is being controlled by automated test
	// software" prompt, but otherwise use Puppeteer's default args.
	const browser = await puppeteer.launch({
		headless: false,
		devtools: true,
		ignoreDefaultArgs: false
	});
	const page = await browser.newPage();
	const client = await page.target().createCDPSession();
	await client.send('Log.enable', { show: "true"});
	await client.send('Log.startViolationsReport', []);
	client.on('Log.entryAdded', () => console.log('Log.entryAdded!'));
	await page.goto('http://0.0.0.0:8100');
})();



