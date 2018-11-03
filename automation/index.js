const puppeteer = require('puppeteer');
const fs = require('fs');

// let bookingUrl = 'https://ie.indeed.com/jobs?as_and=senior+javascript+developer&limit=50';
let bookingUrl = `https://ie.indeed.com/jobs?as_and=senior+javascript+developer&as_phr=react&as_any=react%2C+nodejs%2C+node%2C+javascript%2C+webstorm&as_not=&as_ttl=&as_cmp=&jt=permanent&st=&sr=directhire&as_src=&radius=25&l=Dublin&fromage=any&limit=500&sort=&psf=advsrch`;


let myHome = `https://www.myhome.ie/residential/results?localities=1269%7C1270%7C1404&region=1456&maxprice=275000`;
let query = 's[mxp]=275000';
(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    // await page.setViewport({ width: 1920, height: 926 });
    // await page.goto(`https://www.daft.ie/dublin-city/property-for-sale/castleknock/?${query}`);
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

    fs.writeFile('./houses.json', data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}
