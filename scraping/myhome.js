const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, '../db/myhome.json');
const Property = require('../models/property.model');
const myHome = `https://www.myhome.ie/residential/dublin-15/property-for-sale-in-castleknock?maxprice=275000`;

/**
 * @description setup mongoose configurations
 */
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('debug', function (collectionName, method, query, doc, options){
	console.log('collectionName', collectionName)
	console.log('query', query)
	console.log('doc', doc)
});

/**
 * @description gte the reference to the database
 */
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


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


				saveToDatabase(obj)
        saveToFile(filepath, JSON.stringify(hotelData, null, 4))
    } catch (error) {
        console.log(error);
        browser.close();
    }

    browser.close();
})();

// Write property to the database
function saveToDatabase(obj){
	let house = new Property({
		address: obj.address,
		link: obj.link,
		desc: obj.desc,
		price: obj.price,
		viewings: obj.viewings
	});

	house.save(function (err){
		if (err) return next(err);
		res.send('New property added to the database')
	})
};

function saveToFile(data, location) {
    fs.writeFile(location, data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}
