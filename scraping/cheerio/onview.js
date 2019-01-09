const cheerio = require('cheerio')
const _ = require('lodash')
const axios = require('axios')
const fs = require('fs')
const url = 'https://www.myhome.ie/residential/onview/dublin-15/property-for-sale';

// GET request for remote image
axios({
	method: 'get',
	url: url,
})
	.then(function (response){

		console.log(response.data)
		process.exit();
		const $ = cheerio.load(response.data);


		const items = [];
		$('.mhPropertyListItem').each(function (i, elem){
			items[ i ] = $(this).text();
		});

		console.log(items)

		//let spotlight = $('#spotlight ul li').text();
		//spotlight = _.chain(spotlight).split('\n').filter(Boolean).map(d => _.trim(d)).filter(o => !_.isEmpty(o)).uniq().value();
		//
		//let headlines = $('#headlines ul li').text();
		//headlines = _.chain(headlines).split('\n').filter(Boolean).map(d => _.trim(d)).filter(o => !_.isEmpty(o)).uniq().value();
		//
		//let data = _.assign({}, {headlines: headlines, spotlight: spotlight});
		//data = JSON.stringify(data, null, 4)
		//
		//fs.writeFile(`${process.env.DIR}/gaurdian.json`, data, err =>{
		//	if (err) throw err;
		//	console.log('The file has been saved!');
		//});
	});
