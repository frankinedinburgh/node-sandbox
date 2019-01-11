const express = require('express')
const router = express.Router()
const propertyController = require('../controllers/property.controller');

router.get('/', propertyController.test);
router.post('/create', propertyController.create);

module.exports = router;
