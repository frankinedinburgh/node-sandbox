const puppeteer = require('puppeteer');
const fs = require('fs');


async function priceChanges() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    let location = 'castleknock';
    let myHome = `https://www.myhome.ie/pricechanges/dublin/${location}`;
    await page.goto(myHome);
    await page.waitForSelector('.propertyCardInfo', {visible: true})

    try {
        let hotelData = await page.evaluate(() => {
            let list = [];
            let info = document.querySelectorAll('.propertyCardInfo');
            info.forEach((el, index) => {
                let obj = {
                    address: el.firstChild.innerText || '',
                    priceChange: el.childNodes[2].children[0].innerText.replace(/\s/g,'') || '',
                    priceChangePercentage: el.childNodes[2].children[1].innerText.replace(/\s/g,'') || '',
                    prevPrice: el.childNodes[2].children[2].innerText.split(/\s/g).filter(Boolean) || '',
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
}

function saveToFile(data) {
    fs.writeFile('./playground/price-changes.json', data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}


priceChanges();
