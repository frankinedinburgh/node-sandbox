const cheerio = require('cheerio')
const _ = require('lodash')
const axios = require('axios')
const fs = require('fs')

// GET request for remote image
axios({
	method:'get',
	url:'https://www.theguardian.com/international',
})
	.then(function (response) {

		const $ = cheerio.load(response.data);

		let spotlight = $('#spotlight ul li').text();
		spotlight = _.chain(spotlight).split('\n').filter(Boolean).map(d => _.trim(d)).filter(o => !_.isEmpty(o)).uniq().value();


		let headlines = $('#headlines ul li').text();
		headlines = _.chain(headlines).split('\n').filter(Boolean).map(d => _.trim(d)).filter(o => !_.isEmpty(o)).uniq().value();

		console.log(headlines);
		process.exit();

		let data = _.assign({}, { headlines: headlines, spotlight: spotlight });
		data = JSON.stringify(data, null, 4)


		fs.writeFile(`${process.env.DIR}/gaurdian.json`, data, err => {
			if (err) throw err;
			console.log('The file has been saved!');
		});
	});
