/**
 * @link https://puppeteersandbox.com/
 * @type {Puppeteer}
 */

const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
		headless: true
	});
	let page = await browser.newPage();
	let client = await page.target().createCDPSession()
	await client.send('Network.enable');
	await client.send('Network.clearBrowserCache');

	const performanceFirst = JSON.parse(
		await page.evaluate(() => JSON.stringify(window.performance.timing))
	)
	await page.goto('https://www.altv.com', {
		timeout: 0,
	});

	const performanceSecond = JSON.parse(
		await page.evaluate(() => JSON.stringify(window.performance.timing))
	)

	console.log(performanceFirst);

	console.log(`Time to interact on the first visit => ` + (
		performanceFirst.domInteractive - performanceFirst.navigationStart
	));

	console.log(`Time to interact on the second visit => ` + (
		performanceSecond.domInteractive - performanceSecond.navigationStart
	));

	await browser.close();

})();
