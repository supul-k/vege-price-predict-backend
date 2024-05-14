const express = require('express');
const VegetableController = require('../controllers/vegetable.controller');
const router = express.Router();
const jwtAuth = require('../middlewares/jwtAuth')

router.get('/', jwtAuth.verify ,VegetableController.getAllVegetables);
router.get('/:id', jwtAuth.verify ,VegetableController.getVegetableById);
router.post('/predict-price', jwtAuth.verify,VegetableController.predictVegetablePrice);