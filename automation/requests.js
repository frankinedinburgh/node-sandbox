/**
 * @link https://puppeteersandbox.com/
 * @type {Puppeteer}
 */

const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
		devtools: true,
		dumpio: true,
		headless: false,
		//executablePath: '/usr/local/bin/chromedriver --whitelisted-ips=""'
	});
	const page = await browser.newPage();
	await page.setCacheEnabled(false);
	await Promise.all([
		page.coverage.startJSCoverage(),
		page.coverage.startCSSCoverage()
	])

	await page.goto('http://0.0.0.0:8100', { waitUntil: 'networkidle2'});

	const [jsCoverage, cssCoverage] = await Promise.all([
		page.coverage.stopJSCoverage(),
		page.coverage.stopCSSCoverage()
	]);


	let totalBytes = 0;
	let usedBytes = 0;

	const coverage = [...jsCoverage, ...cssCoverage];

	for(const entry of coverage) {
		totalBytes += entry.text.length
		for(const range of entry.ranges) {
			usedBytes += range.end - range.start - 1;
		}
		console.log(`Bytes used: ${usedBytes / totalBytes * 100 }%`)
	}








	//const devtoolsProtocolClient = await page.target().createCDPSession();
	//await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', { show: true });


	//
	//Page.Events = {
	//	Close: 'close',
	//	Console: 'console',
	//	Dialog: 'dialog',
	//	DOMContentLoaded: 'domcontentloaded',
	//	Error: 'error',
	//	PageError: 'pageerror',
	//	Request: 'request',
	//	Response: 'response',
	//	RequestFailed: 'requestfailed',
	//	RequestFinished: 'requestfinished',
	//	FrameAttached: 'frameattached',
	//	FrameDetached: 'framedetached',
	//	FrameNavigated: 'framenavigated',
	//	Load: 'load',
	//	Metrics: 'metrics',
	//	WorkerCreated: 'workercreated',
	//	WorkerDestroyed: 'workerdestroyed',
	//};
	// PAGES

	await page.hover('#player-one')
	try {
		page.on('request', (req) => {
			console.log(`request => `, req);
		});
	} catch(err) {
		console.log(err)
	}
	//await page.mouse.move(0, 0);
	//await page.mouse.down();
	//await page.mouse.move(0, 100);
	//await page.mouse.move(100, 100);
	//await page.mouse.move(100, 0);
	//await page.mouse.move(0, 0);
	//await page.mouse.up();
	//"https://cdn.jwplayer.com/v2/media/LiVt1gVb"


	await page.waitFor(50000);
	await browser.close();

})();


//(async () => {
//	const browser = await puppeteer.launch({
//		devtools: false,
//		headless: false
//	});
//
//	const page = await browser.newPage();
//	await page.goto('https://cdn.jwplayer.com/v2/media/LiVt1gVb', { waitUntil: 'networkidle2'});
//	await page.waitFor(5000);
//	await browser.close();
//})();
