'use strict';
const puppeteer = require('puppeteer');
const _ = require('lodash');
const fs = require('fs');
let url = `https://www.glassdoor.co.uk/index.htm`;

async function scrapeGlassDoor() {
	const browser = await puppeteer.launch({
		args: ['--start-maximized','--disable-infobars','--disable-notifications'],
		headless: false
	});
	const page = await browser.newPage();
	await page.goto(url, {
		waitUntil: 'networkidle2'
	});
	await page.waitForSelector('#_evidon-accept-button');
	await page.click('#_evidon-accept-button');
	await page.waitForSelector('#KeywordSearch');
	await page.type('#KeywordSearch', 'Senior Javascript developer, Dublin');
	await page.click('#HeroSearchButton');
	await page
		.waitForSelector('ul.jlGrid.hover', {visible: true})
		.then(() => console.log('First URL with image: ' + url));
	await page
		.waitForSelector('#MainCol li.jl', {visible: true})
		.then(() => console.log('Got the list of jobs: ' + url));


	try {
		let results = await page.evaluate(() => document.querySelectorAll('li.jl'));
		console.log(_.map(results, 'innerText'))
	} catch (error) {
		console.log("The element didn't appear.", error)
		//browser.close();
	}
	//browser.close();

	//try{
	//    let results = await page.evaluate(() => {
	//        let info = document.querySelectorAll('ul.jlGrid li');
	//        //let companies = _.chain(info).map('innerText').value();
	//        return info;
	//    });
	//    saveToFile(JSON.stringify(_.uniq(results), null, 4))
	//} catch(err) {
	//    console.log(err);
	//    browser.close();
	//}

}

scrapeGlassDoor()
