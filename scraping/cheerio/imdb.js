const cheerio = require('cheerio')
const _ = require('lodash')
const axios = require('axios')
const fs = require('fs')
const URL = 'https://www.imdb.com/chart/moviemeter';



// GET request for remote image
const scrape = url => {
    axios({
        method:'get',
        url: url
    }).then(function (response) {
        const $ = cheerio.load(response.data);
        const titles = [];
        $('tbody.lister-list td.titleColumn').each(function(i, elem) {
            titles[i] = $(this).text().replace(/[^A-Za-z']/g, '').replace(/([a-z])([A-Z])/g, '$1 $2');
        });

        console.log($('tbody.lister-list img').html())

        process.exit();
        fs.writeFile(`${process.env.DIR}/imdb.json`, JSON.stringify(titles, null, 4), err => {
            if (err) throw Error('There is an error');
            console.log('The file has been saved!');
        });
    });
}



scrape(URL)
