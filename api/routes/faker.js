const express = require('express')
const router = express.Router()
const fakerController = require('../controllers/faker.controller');

router.get('/', fakerController.test);
router.get('/:page', fakerController.pagination);

module.exports = router;
