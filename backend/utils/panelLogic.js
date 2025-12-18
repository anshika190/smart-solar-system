/**
 * Calculate optimal solar panel tilt angle
 * based on sunlight intensity using linear proportional model.
 * 
 * Logic:
 * - Sunlight range: 0 – 1000 W/m²
 * - Max tilt angle: 60°
 * - Linear mapping between intensity and tilt.
 * 
 * @param {number} sunlightIntensity - Current sunlight intensity in W/m²
 * @returns {number} - Optimal tilt angle in degrees (0 - 60)
 */
function calculatePanelTilt(sunlightIntensity) {
    const MAX_SUNLIGHT = 1000;
    const MAX_TILT = 60;

    // Boundary checks
    if (sunlightIntensity <= 0) return 0;
    if (sunlightIntensity >= MAX_SUNLIGHT) return MAX_TILT;

    // Linear proportional calculation
    const tiltAngle = (sunlightIntensity / MAX_SUNLIGHT) * MAX_TILT;

    // Return rounded integer for stepper motor precision
    return Math.round(tiltAngle);
}

module.exports = {
    calculatePanelTilt
};
