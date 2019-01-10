const _ = require('lodash')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const trainingController = require('../controllers/training.controller');
// middleware that is specific to this router

router.use(function(req, res, next){
	console.log('Training Route: ')
	//console.log(_.keys(res))
	//console.log(req.originalUrl)
	//console.log(req.body)
	//console.log(req.route)
	next()
})



/**
 * @todo fetch training data from database
 */

router.get('/training/', trainingController.test);
router.get('/training/:id', (res, req) => {
	res.send('SUCCESS')
});
//router.post('/training/create', trainingController.create);

module.exports = router;
