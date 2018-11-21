const puppeteer = require('puppeteer');
const fs = require('fs');
const _ = require('lodash');

let myHome = `https://property.trovit.ie/fernleigh-castleknock`;

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(myHome);

    // get hotel details
    await page.waitForSelector('#wrapper_listing', {visible: true})
    try {
        let trovitData = await page.evaluate(() => {
            let results = document.querySelectorAll('.js-item-title');
            let list = _.chain(results).map(o => ({ text: o.innerText, href: o.href })).value();

            return list;
        });

        console.log(trovitData);
        saveToFile(JSON.stringify(trovitData, null, 4))
    }
    catch (error) {
        console.log(error);
        browser.close();
    }

    browser.close();
})();



function saveToFile(data) {
    fs.writeFile('./playground/trovit.json', data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}
