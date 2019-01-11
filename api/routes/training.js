const express = require('express')
const router = express.Router()
const trainingController = require('../controllers/training.controller');

router.get('/', trainingController.test);
router.get('/:id', trainingController.findById);
router.post('/create', trainingController.create);

module.exports = router;
