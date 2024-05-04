const express = require('express');
const VegetableController = require('../controllers/vegetable.controller');
const router = express.Router();

router.get('/', VegetableController.getAllVegetables);
router.get('/:id', VegetableController.getVegetableById);
router.post('/predict-price', VegetableController.predictVegetablePrice);