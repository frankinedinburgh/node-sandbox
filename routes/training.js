const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const training = require('../db/training')


// Require the controllers WHICH WE DID NOT CREATE YET!!
const trainingController = require('../controllers/training.controller');
// a simple test url to check that all of our files are communicating correctly.


/**
 * @todo fetch training data from database
 */

router.get('/training/:id?', function (req, res){
	console.log(req.params);
	res.send('user ');
});
router.get('/training/', trainingController.test);
//router.get('/training/:id', trainingController.findOne);

router.post('/training/create', trainingController.create);

module.exports = router;
