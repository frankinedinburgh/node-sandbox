/**
 * @link https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Builder.html
 */
const _ = require('lodash');
const fs = require('fs');
const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

const width = 640;
const height = 480;

(async function(){
	const driver = new webdriver.Builder()
		.forBrowser('chrome')
		.build();


	await driver.get('https://www.google.com');
	await driver.findElement({ name: 'q' }).sendKeys('2 bedroom apartment for sale, Fernleigh, Carpenterstown', Key.RETURN);
	await driver.wait(until.titleIs('2 bedroom apartment for sale, Fernleigh, Carpenterstown - Google Search'), 1000);
	const html = driver.getPageSource();
	try {
		//await driver.wait(until.elementLocated({ className: 'LC20lb'}, 1000)).getTagName();
		fs.writeFile('results.html', JSON.stringify(html, null, 4), 'utf8', () => { return true });
	} catch(err) {
		//console.log(err)
		throw Error('Unable to get item')
	} finally {
		driver.quit()
	}

})();


//'https://assets.altv.com/player/4.17.4_03/skin-plugin/iframe.html?ec=I4eTVsZzE6BjiVXuhkIiYxGisrRpNSWy&pbid=9f79b22f32bc4e168c5beaafc6784edb&pcode=wxMGMyOno4A4DdQx3QuOpcNwdc-R&al=en

