/**
 * EV Charging energy source selection logic
 * Priority: Solar → Battery → Grid
 */

const MIN_BATTERY_LEVEL = 20;

function selectChargingSource(solarPower, batteryLevel) {
    let selectedSource = "grid";

    if (solarPower > 2) {
        // Enough solar power available
        selectedSource = "solar";
    }
    else if (batteryLevel > MIN_BATTERY_LEVEL) {
        // Use stored energy
        selectedSource = "battery";
    }
    else {
        // Fallback to grid
        selectedSource = "grid";
    }

    return {
        chargingSource: selectedSource
    };
}

module.exports = {
    selectChargingSource
};
