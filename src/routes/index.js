const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const vegetableRoutes = require('./vegetable.routes');

router.use('/users', userRoutes);
// router.use('/vegetables', vegetableRoutes);

module.exports = router;