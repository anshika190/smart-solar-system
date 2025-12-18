const express = require('express');
const router = express.Router();
const batteryController = require('../controllers/batteryController');

// GET /api/battery
router.get('/', batteryController.getBatteryStatus);

module.exports = router;
