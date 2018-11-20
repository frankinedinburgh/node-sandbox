const puppeteer = require('puppeteer');
const fs = require('fs');

let myHome = `https://www.myhome.ie/residential/dublin-15/property-for-sale-in-castleknock?maxprice=275000`;

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(myHome);

    // get hotel details
    await page.waitForSelector('.resultContent', {visible: true})
    try {
        let hotelData = await page.evaluate(() => {
            let list = [];
            // get the hotel elements
            let results = document.querySelectorAll('.resultContent');
            let address = document.querySelectorAll('h2.address a');
            let desc = document.querySelectorAll('.descriptiveTitle');
            let price = document.querySelectorAll('.price');
            let time = document.querySelectorAll('.time');
            // get the hotel data

            results.forEach((el, index) => {
                // let txt = el.innerText.replace('\n','');
                let obj = {
                    address: address[index].innerText || '',
                    link: address[index].href || '',
                    desc: desc[index].innerText || '',
                    price: price[index] ? price[index].innerText : '',
                    viewings: time[index] ? time[index].innerText : '',
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
