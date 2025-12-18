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

module.exports = { logPageVisit, getActivities };
