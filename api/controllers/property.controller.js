const Houses = require('../models/property.model');

exports.test = function (req, res){
	res.send('This is only a test for the POST request for houses!');
};

exports.foo = function (req, res){
	res.json({
		name: req.params.id
	});
};

exports.create = function (req, res, next){
	//console.log(Object.keys(req))
	let house = new Houses({
		address: req.body.address,
		link: req.body.link,
		desc: req.body.desc,
		price: req.body.price,
		viewings: req.body.viewings
	});

	house.save(function (err){
		if (err) return next(err);
		res.send('New property added to the database')
	})
};
