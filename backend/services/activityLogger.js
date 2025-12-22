const UserActivity = require('../models/UserActivity');

const logActivity = async (user, action, details = {}, ipAddress = null) => {
    try {
        if (!user) {
            console.warn("Attempted to log activity with no user");
            return;
        }

        const activity = new UserActivity({
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            action,
            details,
            ipAddress
        });

        await activity.save();
        console.log(`📝 Activity Logged: [${action}] for ${user.name}`);
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
};

module.exports = { logActivity };
