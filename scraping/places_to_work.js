const puppeteer = require('puppeteer');
const _ = require('lodash');
const fs = require('fs');
let url = `https://www.glassdoor.co.uk/index.htm`;

async function scrapeGlassDoor() {
    const browser = await puppeteer.launch({ headless: true });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForSelector('.jlGrid', { visible: true })
        .then(() => console.log('Results found: '));

    try{
        let results = await page.evaluate(() => {
            let info = document.querySelectorAll('.jlGrid');
            let companies = _.chain(info).map('innerText').value();
            return companies;
        });
        saveToFile(JSON.stringify(_.uniq(results), null, 4))
    } catch(err) {
        console.log(err);
        browser.close();
    }
    browser.close();
}


function saveToFile(data) {
    fs.writeFile('./playground/best_places_to_work.json', data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}



scrapeGlassDoor()
