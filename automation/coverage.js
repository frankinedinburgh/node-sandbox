const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });
const puppeteer = require('puppeteer');
const url = process.env.TESTING_URL;


(async() =>{
	puppeteer.launch().then(async browser =>{
		const page = await browser.newPage();
        await page.setViewport({
            width: 1920,
            height: 926
        });
		//start coverage trace
		await Promise.all([
			page.coverage.startJSCoverage(),
			page.coverage.startCSSCoverage()
		]);
		await page.goto(url, { waitUntil: 'networkidle2'});
		//stop coverage trace
		const [ jsCoverage, cssCoverage ] = await Promise.all([
			page.coverage.stopJSCoverage(),
			page.coverage.stopCSSCoverage(),
		]);
		let totalBytes = 0;
		let usedBytes = 0;
		const coverage = [ ...jsCoverage, ...cssCoverage ];
		for (const entry of coverage) {
			totalBytes += entry.text.length;
			for (const range of entry.ranges)
				usedBytes += range.end - range.start - 1;
		}
		const usedCode = ((usedBytes / totalBytes) * 100).toFixed(2);
		console.log('Code used by only', usedCode, '%');
		await browser.close();
	});
})();
