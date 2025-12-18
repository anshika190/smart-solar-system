const { logActivity } = require('../services/activityLogger');
const User = require('../models/User');
const UserActivity = require('../models/UserActivity');

const logPageVisit = async (req, res) => {
    try {
        const { userId, page } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await logActivity(user, 'PAGE_VISIT', { page }, req.ip);

        res.status(200).json({ message: 'Activity logged' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getActivities = async (req, res) => {
    try {
        const activities = await UserActivity.find().sort({ timestamp: -1 }).limit(100);
        res.status(200).json(activities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const exportLogsCSV = async (req, res) => {
    try {
        const activities = await UserActivity.find().sort({ timestamp: -1 });

        // Define CSV Headers
        const headers = ['Timestamp (IST)', 'User Name', 'Action', 'Details', 'IP Address'];
        const rows = activities.map(log => {
            const dateIST = new Date(log.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            return [
                dateIST,
                log.userName,
                log.action,
                JSON.stringify(log.details || {}).replace(/,/g, ';'), // Escape commas for CSV
                log.ipAddress || 'Unknown'
            ].join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=SolarGov_Audit_Logs_${Date.now()}.csv`);
        res.status(200).send(csvContent);

    } catch (err) {
        console.error("Export Error:", err);
        res.status(500).send("Failed to export logs");
    }
};

module.exports = { logPageVisit, getActivities, exportLogsCSV };
