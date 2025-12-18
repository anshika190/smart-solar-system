const sensorService = require('./services/sensorservice');

console.log('Initializing Test...');

// Start simulation
sensorService.startSimulation();

// Check readings immediately
console.log('Initial Readings:', sensorService.getReadings());

// Check readings after 6 seconds (1 update should have happened)
setTimeout(() => {
    console.log('Readings after 6s:', sensorService.getReadings());
}, 6000);

// Check readings after 11 seconds (2 updates)
setTimeout(() => {
    console.log('Readings after 11s:', sensorService.getReadings());
    sensorService.stopSimulation();
    console.log('Test Complete.');
}, 11000);
