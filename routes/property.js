const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');


// Require the controllers WHICH WE DID NOT CREATE YET!!
const propertyController = require('../controllers/property.controller');
// a simple test url to check that all of our files are communicating correctly.


/**
 * @todo fetch training data from database
 */


router.get('/property/', propertyController.test);
router.get('/property/:id', propertyController.foo);
router.post('/property/create', propertyController.create);

module.exports = router;
