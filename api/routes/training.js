const express = require('express')
const router = express.Router()
const trainingController = require('../controllers/training.controller');

router.get('/', trainingController.test);
router.post('/create', trainingController.create);
router.get('/:id', trainingController.findById);

module.exports = router;
