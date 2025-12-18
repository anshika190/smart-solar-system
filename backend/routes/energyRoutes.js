const express = require('express');
const router = express.Router();
const energyController = require('../controllers/energyController');

// GET /api/energy
router.get('/', energyController.getEnergyStats);

module.exports = router;
