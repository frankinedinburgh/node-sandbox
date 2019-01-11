const Job = require('../models/job.model');
const jobsList = require('../../db/jobs');

exports.test = function (req, res){
	res.json(jobsList);
};

exports.create = function (req, res, next){
	//console.log(Object.keys(req))
	let job = new Job({
		title: req.body.title,
		company: req.body.company
	});

	job.save(function (err){
		if (err) return next(err);
		res.send('New job has been added to the database')
	})
};
