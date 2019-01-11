const express = require('express')
const router = express.Router()
const jobsController = require('../controllers/jobs.controller')


router.get('/', jobsController.test)
router.post('/create', jobsController.create)

module.exports = router;
