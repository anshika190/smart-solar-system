const sensorService = require('../services/sensorservice');
const { calculateEnergyOutput } = require('../utils/energyCalculator');
const batteryService = require('../services/batteryService'); // We need to access battery level, but batteryService.manageEnergySource modifies it. 
// For now, I'll just use manageEnergySource to simulate the "current state" check or I might need a getter in batteryService.
// Looking at batteryService (step 56), it doesn't expose a getter, only 'manageEnergySource'.
// This is a slight design flaw (state mutation on read), but I'll stick to the existing service method for now.
const evChargingService = require('../services/evChargingService');

exports.getChargingStatus = (req, res) => {
    const readings = sensorService.getReadings();

    const solarPower = calculateEnergyOutput({
        sunlightIntensity: readings.sunlightIntensity,
        dustLevel: readings.dustLevel,
        temperature: readings.temperature
    });

    // Get current battery/system status
    const systemStatus = batteryService.manageEnergySource(
        readings.sunlightIntensity,
        solarPower
    );

    const chargingDecision = evChargingService.selectChargingSource(
        solarPower,
        systemStatus.batteryLevel
    );

    res.json({
        chargingSource: chargingDecision.chargingSource,
        solarPowerAvailable: solarPower,
        batteryLevel: systemStatus.batteryLevel,
        timestamp: new Date()
    });
};
