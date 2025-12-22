const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {  // Denormalized for easier querying
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: false // Optional for backward compatibility with old logs
    },
    action: {
        type: String,
        enum: ['LOGIN', 'SIGNUP', 'PAGE_VISIT', 'LOGOUT'],
        required: true
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    ipAddress: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserActivity', userActivitySchema);
