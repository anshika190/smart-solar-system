const express = require('express');
const router = express.Router();
const evController = require('../controllers/evController');

// GET /api/ev
router.get('/', evController.getChargingStatus);

module.exports = router;
