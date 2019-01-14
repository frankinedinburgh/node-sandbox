const Training = require('../models/training.model');

exports.test = function (req, res) {
	Training.find({}).exec(function (err, books){
		if (err) return res.send('error occured')
		res.json(books);
	});
};

exports.create = function(req, res, next) {
	console.log(req.body)
	let session = new Training({
			date: req.body.date,
			day: req.body.day,
			session: req.body.session,
			details: req.body.details,
			notes: req.body.notes
		});

	session.save(function (err){
		if (err) return next(err);
		res.send('Product Created successfully')
	})
};

exports.findById = function (req, res, next){
	Training.findById(req.params.id).exec(function (err, session){
		if (err) return res.send('error occured');
		console.log('Sucessfully requested one item');
		//res.send('Sucessfully requested one item');
		res.json(session);
	});
};

exports.createMany = function (req, res, next){
	let session = new Training({
		date: req.body.date,
		day: req.body.day,
		session: req.body.session,
		details: req.body.details,
		notes: req.body.notes
	});

	session.save(function (err){
		if (err) return next(err);
		res.send('Product Created successfully')
	})
};


