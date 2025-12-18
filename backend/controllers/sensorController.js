const sensorService = require('../services/sensorservice');

exports.getSensorData = (req, res) => {
    const data = sensorService.getReadings();
    res.json(data);
};
