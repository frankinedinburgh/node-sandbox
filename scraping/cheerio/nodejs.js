const cheerio = require('cheerio')
const _ = require('lodash')
const axios = require('axios')
const fs = require('fs')

// GET request for remote image
axios({
	method:'get',
	url:'https://nodejs.org/dist/latest-v11.x/docs/api/',
})
	.then(function (response) {

		const $ = cheerio.load(response.data)
		let data = $('div#column2 .line + ul').text();
		data = _.chain(data).split('\n').filter(Boolean).initial().value();
		data = JSON.stringify(data, null, 4)

		fs.writeFile(process.env.DIR, data, (err) => {
			if (err) throw err;
			console.log('The file has been saved!');
		});
	});
