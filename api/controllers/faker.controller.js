const Job = require('../models/job.model');
const homeListing = require('../../db/myhome');

exports.test = function (req, res){
	res.json(homeListing);
};

exports.pagination = function (req, res) {
	let page = parseInt(req.params.page)
	return (page < 10 && page >= 0) ? res.send(req.params) : res.send('Woops : unable to make the request');
};


