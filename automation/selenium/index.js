/**
 * @link https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Builder.html
 */
const _ = require('lodash');
const fs = require('fs');
const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until, promise} = require('selenium-webdriver');

const width = 640;
const height = 480;




(async function(){
	const driver = new webdriver.Builder()
		.forBrowser(webdriver.Browser.CHROME)
		.build();

    const saveToFile = function(arr){
        fs.writeFile("out.txt", arr, function(err, data) {
            if(err) console.log(err);
            console.log(data)
        });
    }

    const pendingElements = driver.findElements({ className: 'LC20lb' });

	try {
        await driver.get('https://www.google.com');
        await driver.findElement({ name: 'q' }).sendKeys('Selenium webdriver nodeJS', Key.RETURN);
        await driver.wait(until.titleIs('Selenium webdriver nodeJS - Google Search'), 1000);
        // await driver.takeScreenshot(true).then(function(data){
        //     var base64Data = data.replace(/^data:image\/png;base64,/,"")
        //     fs.writeFile("out.png", base64Data, 'base64', function(err) {
        //         if(err) console.log(err);
        //     });
        // });
        await driver.wait(until.elementsLocated({ className: 'LC20lb' }));
        await driver.wait(until.titleIs('Selenium webdriver nodeJS - Google Search'), 1000);
        await pendingElements.then(function (elements) {
            const pendingHtml = elements.map(function (elem) {
                return elem.getInnerHtml();
            });

            promise.all(pendingHtml).then(saveToFile);
        });
    } finally {
		driver.quit()
	}

})();


//'https://assets.altv.com/player/4.17.4_03/skin-plugin/iframe.html?ec=I4eTVsZzE6BjiVXuhkIiYxGisrRpNSWy&pbid=9f79b22f32bc4e168c5beaafc6784edb&pcode=wxMGMyOno4A4DdQx3QuOpcNwdc-R&al=en

