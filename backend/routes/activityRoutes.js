const express = require('express');
const router = express.Router();
const { logPageVisit, getActivities, exportLogsCSV } = require('../controllers/activityController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/log', logPageVisit);
router.get('/all', protect, admin, getActivities);
// router.get('/export', protect, admin, exportLogsCSV);

module.exports = router;
