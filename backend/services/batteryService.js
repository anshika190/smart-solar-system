/**
 * Battery and low-sunlight energy management logic
 * Handles charging, discharging, and grid fallback
 */

const BATTERY_CAPACITY = 100; // percentage
const MIN_BATTERY_LEVEL = 20; // below this, switch to grid
const CHARGING_EFFICIENCY = 0.9;

let batteryLevel = 50; // initial battery state (%)

function manageEnergySource(sunlightIntensity, solarPower) {
    let source = "solar";

    // LOW SUNLIGHT CONDITION
    if (sunlightIntensity < 200) {
        if (batteryLevel > MIN_BATTERY_LEVEL) {
            source = "battery";
            batteryLevel -= 5; // discharge rate
        } else {
            source = "grid";
        }
    }
    // HIGH SUNLIGHT → BATTERY CHARGING
    else {
        const chargeGain = (solarPower * CHARGING_EFFICIENCY) / 10;
        batteryLevel = Math.min(BATTERY_CAPACITY, batteryLevel + chargeGain);
    }

    return {
        powerSource: source,
        batteryLevel: Number(batteryLevel.toFixed(2))
    };
}

module.exports = {
    manageEnergySource
};
