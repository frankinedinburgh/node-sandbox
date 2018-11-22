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
	})
		.then(function (response) {
			const $ = cheerio.load(response.data);
			let list = $('tbody.lister-list td.titleColumn').text();
			list = _.chain(list).split('\n')
							.map(o => _.trim(o))
							.map(o => o.replace(/\d+|^\s+|\s+$/g, ''))
							.map(o => o.replace(/^\(+|\)$/g, ''))
							.map(o => o.replace(/^,/g, ''))
							.filter(Boolean).uniq()
							.slice(1, list.length)
							.value();

			fs.writeFile(`${process.env.DIR}/imdb.json`, JSON.stringify(list, null, 4), err => {
				if (err) throw err;
				console.log('The file has been saved!');
			});
		});
}



scrape(URL)
