const sensorService = require('../services/sensorservice');
const { calculateEnergyOutput } = require('../utils/energyCalculator');
const batteryService = require('../services/batteryService');

exports.getBatteryStatus = (req, res) => {
    const readings = sensorService.getReadings();

    // Calculate current solar power generation
    const solarPower = calculateEnergyOutput({
        sunlightIntensity: readings.sunlightIntensity,
        dustLevel: readings.dustLevel,
        temperature: readings.temperature
    });

    // Update and get battery status
    const status = batteryService.manageEnergySource(
        readings.sunlightIntensity,
        solarPower
    );

    res.json({
        ...status,
        timestamp: new Date()
    });
};
