const Training = require('../models/training.model');

const test = function (req, res){
	Training.find({}).exec(function (err, books){
		if (err) return res.send('error occured')
		console.log(books);
		res.json(books);
	});
};

const findOne = function(req, res) {
	Training.findOne({
		_id: req.params.id
	}).exec(function (err, session){
		if (err) return res.send('error occured');
		console.log('Sucessfully requested one item');
		res.json(session);
	});
};

const create = function(req, res, next) {
	let session = new Training({
			date: req.params.date,
			day: req.params.day,
			session: req.params.session,
			details: req.params.details,
			notes: req.params.notes
		});

	session.save(function (err){
		if (err) return next(err);
		res.send('Product Created successfully')
	})
};

//Simple version, without validation or sanitation
module.exports = {
	test,
	create,
	findOne
}

