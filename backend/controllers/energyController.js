const sensorService = require('../services/sensorservice');
const { calculateEnergyOutput } = require('../utils/energyCalculator');

exports.getEnergyStats = (req, res) => {
    // Get current sensor data
    const readings = sensorService.getReadings();

    // Calculate energy output
    const powerOutput = calculateEnergyOutput({
        sunlightIntensity: readings.sunlightIntensity,
        dustLevel: readings.dustLevel,
        temperature: readings.temperature
    });

    res.json({
        powerOutputKw: powerOutput,
        timestamp: new Date()
    });
};
