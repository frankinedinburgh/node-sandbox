const cheerio = require('cheerio')
const _ = require('lodash')
const axios = require('axios')
const fs = require('fs')

// GET request for remote image
axios({
	method:'get',
	url:'https://lodash.com/docs/4.17.11',
})
	.then(function (response) {

		const $ = cheerio.load(response.data)
		let data = $('.toc-container code').text();
		data = _.chain(data).split('_.').difference(['Array','String','Lang','Math','Number','Object','Seq','Properties','Methods','Date','Function']).value();
		data = JSON.stringify(data, null, 4)

		fs.writeFile(process.env.DIR, data, (err) => {
			if (err) throw err;
			console.log('The file has been saved!');
		});
	});
