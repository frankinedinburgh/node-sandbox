const cheerio = require('cheerio')
const _ = require('lodash')
const axios = require('axios')
const fs = require('fs')

// GET request for remote image
axios({
	method: 'get',
	url: 'https://medium.com/topic/javascript',
})
	.then(function (response){

		const $ = cheerio.load(response.data, {
			withDomLvl1: true,
			normalizeWhitespace: false,
			xmlMode: false,
			decodeEntities: true
		});

		let headlines = $('#root > div > section > section.o.ch.q.c').find('h3');
		let titles = [];
		headlines.each(function (i, elem){
			titles[ i ] = $(this).html();
			console.log(titles[i])
		});

		//spotlight = _.chain(spotlight).split('\n').filter(Boolean).map(d => _.trim(d)).filter(o => !_.isEmpty(o)).uniq().value();
		//
		//let headlines = $('#headlines ul li').text();
		//headlines = _.chain(headlines).split('\n').filter(Boolean).map(d => _.trim(d)).filter(o => !_.isEmpty(o)).uniq().value();
		//
		let data = _.assign({}, {headlines: titles});
		data = JSON.stringify(data, null, 4)

		fs.writeFile(`${process.env.DIR}/javascript.json`, data, err =>{
			if (err) throw err;
			console.log('The file has been saved!');
		});
	});
