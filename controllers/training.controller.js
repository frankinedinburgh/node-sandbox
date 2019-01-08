const Training = require('../models/training.model');

const test = function (req, res){
	res.send('This is only a teadsfdsafsdfasst!');
};

const create = function(req, res, next) {

	let session = new Training(
		{
			date: req.body.date,
			day: req.body.day,
			session: req.body.session,
			details: req.body.details,
			notes: req.body.notes
		}
	);

	session.save(function (err){
		if (err) return next(err);
		res.send('Product Created successfully')
	})
};

//Simple version, without validation or sanitation
module.exports = {
	test,
	create
}


