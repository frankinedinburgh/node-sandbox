const puppeteer = require('puppeteer');
const fs = require('fs');

let myHome = `https://property.trovit.ie/fernleigh-castleknock`;

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(myHome);

    // get hotel details
    await page.waitForSelector('#wrapper_listing', {visible: true})
    try {
        let hotelData = await page.evaluate(() => {
            let list = [];
            // get the hotel elements
            let results = document.querySelector('#wrapper_listing').children;

            // get the hotel data
            // let txt = el.innerText.replace('\n','');

            results.forEach((el, index) => {
                let obj = {
                    text: el.innerText || '',
                }
                list.push(obj);
            });

            return list;
        });

        console.log(hotelData);
        saveToFile(JSON.stringify(hotelData, null, 4))
    }
    catch (error) {
        console.log(error);
        browser.close();
    }

    browser.close();
})();



function saveToFile(data) {
    fs.writeFile('./playground/houses.json', data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}
