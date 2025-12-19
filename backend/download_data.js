const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config({ path: './.env' });

// Define Schema (copied from UserActivity.js)
const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true },
    action: { type: String, required: true }, // e.g., 'PAGE_VISIT', 'LOGIN', 'LOGOUT'
    details: { type: mongoose.Schema.Types.Mixed }, // Flexible field for page URL, error messages, etc.
    ipAddress: { type: String },
    timestamp: { type: Date, default: Date.now }
});
const UserActivity = mongoose.model('UserActivity', activitySchema);

const exportData = async () => {
    try {
        console.log("Connecting to Database...");
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in backend/.env");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected.");

        console.log("Fetching Logs...");
        const logs = await UserActivity.find().sort({ timestamp: -1 }).lean();
        console.log(`Found ${logs.length} records.`);

        const headers = ["Timestamp (IST)", "User Name", "Action", "Details", "IP Address"];
        const csvRows = [headers.join(',')];

        logs.forEach(log => {
            const date = new Date(log.timestamp);
            const istDate = date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

            // Format details
            let detailStr = '';
            if (typeof log.details === 'string') detailStr = log.details;
            else if (log.details && log.details.page) detailStr = log.details.page;
            else if (log.details) detailStr = JSON.stringify(log.details);

            const row = [
                `"${istDate}"`,
                `"${log.userName || 'Guest'}"`,
                `"${log.action}"`,
                `"${detailStr.replace(/"/g, '""')}"`, // Escape quotes
                `"${log.ipAddress || 'Unknown'}"`
            ];
            csvRows.push(row.join(','));
        });

        const fileName = `audit_logs_${Date.now()}.csv`;
        fs.writeFileSync(fileName, csvRows.join('\n'));
        console.log(`\nSUCCESS! Data saved to: ${fileName}`);
        process.exit(0);

    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
};

exportData();
