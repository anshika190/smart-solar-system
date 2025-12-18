/**
 * @fileoverview Service to simulate solar sensor data (Sunlight, Dust, Temperature).
 * This service runs a background interval to update sensor readings with realistic
 * random-walk variations.
 */

class SensorService {
    constructor() {
        /**
         * Current state of the sensors.
         * @type {{sunlightIntensity: number, dustLevel: number, temperature: number, lastUpdated: Date}}
         */
        this.currentReadings = {
            sunlightIntensity: 800, // W/m² (Typical peak solar irradiance is ~1000 W/m²)
            dustLevel: 5,           // µg/m³ (0-50 is good, >150 is unhealthy)
            temperature: 25,        // Celsius
            lastUpdated: new Date()
        };

        /** @type {NodeJS.Timeout|null} */
        this.simulationInterval = null;

        // Configuration for simulation bounds and variance
        this.config = {
            updateIntervalMs: 5000,
            sunlight: { min: 0, max: 1200, maxStep: 50 },
            dust: { min: 0, max: 200, maxStep: 2 },
            temperature: { min: -10, max: 50, maxStep: 0.5 }
        };
    }

    /**
     * starts the simulation loop.
     */
    startSimulation() {
        if (this.simulationInterval) {
            console.warn('Sensor simulation is already running.');
            return;
        }

        console.log('Starting solar sensor simulation...');
        this.simulationInterval = setInterval(() => {
            this._updateReadings();
        }, this.config.updateIntervalMs);
    }

    /**
     * Stops the simulation loop.
     */
    stopSimulation() {
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
            console.log('Stopped solar sensor simulation.');
        }
    }

    /**
     * Returns the current sensor readings.
     * @returns {{sunlightIntensity: number, dustLevel: number, temperature: number, lastUpdated: Date}}
     */
    getReadings() {
        return { ...this.currentReadings };
    }

    /**
     * Internal method to update readings with a random walk algorithm.
     * This prevents unrealistic jumps in values between updates.
     * @private
     */
    _updateReadings() {
        const { sunlight, dust, temperature } = this.config;

        // Helper to calculate next value with boundaries
        const nextValue = (current, min, max, step) => {
            const change = (Math.random() * step * 2) - step; // Random value between -step and +step
            let newVal = current + change;
            return Math.max(min, Math.min(newVal, max));
        };

        this.currentReadings.sunlightIntensity = parseFloat(nextValue(this.currentReadings.sunlightIntensity, sunlight.min, sunlight.max, sunlight.maxStep).toFixed(2));

        this.currentReadings.dustLevel = parseFloat(nextValue(this.currentReadings.dustLevel, dust.min, dust.max, dust.maxStep).toFixed(2));

        this.currentReadings.temperature = parseFloat(nextValue(this.currentReadings.temperature, temperature.min, temperature.max, temperature.maxStep).toFixed(2));

        this.currentReadings.lastUpdated = new Date();

        // Optional: Log for debug/demo purposes (can be removed in prod)
        // console.log('Sensors updated:', this.currentReadings); 
    }
}

// Export a singleton instance
const sensorService = new SensorService();
module.exports = sensorService;
