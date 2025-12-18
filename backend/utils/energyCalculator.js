/**
 * Calculate solar energy output considering
 * sunlight, dust, and temperature effects
 */

function calculateEnergyOutput({
    sunlightIntensity,
    dustLevel,
    temperature
}) {
    const MAX_SUNLIGHT = 1000; // W/m²
    const MAX_POWER = 10; // kW (plant capacity)

    // Base power from sunlight
    let powerOutput = (sunlightIntensity / MAX_SUNLIGHT) * MAX_POWER;

    // Dust loss (linear degradation)
    const dustLossFactor = 1 - dustLevel / 100;
    powerOutput *= dustLossFactor;

    // Temperature loss (above 40°C)
    if (temperature > 40) {
        powerOutput *= 0.9; // 10% efficiency loss
    }

    return Number(powerOutput.toFixed(2));
}

module.exports = {
    calculateEnergyOutput
};
