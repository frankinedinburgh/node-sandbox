const Houses = require('../models/property.model');

const test = function (req, res){
	res.send('This is only a test for the POST request for houses!');
};

const create = function (req, res, next){
	let house = new Houses({
		address: req.params.address,
		link: req.params.link,
		desc: req.params.desc,
		price: req.params.price,
		viewings: req.params.viewings
	});

	house.save(function (err){
		if (err) return next(err);
		res.send('New property added to the database')
	})
};


const foo = function (req, res){
	//res.json({
	//	params: req.params
	//})

	res.json({
		name: req.params.id
	});
};

//Simple version, without validation or sanitation
module.exports = {
	test,
	create,
	foo
}

