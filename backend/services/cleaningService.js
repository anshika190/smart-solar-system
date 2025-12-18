/**
 * Automated solar panel cleaning logic
 * Triggers cleaning when dust exceeds threshold
 */

const DUST_THRESHOLD = 60;
const CLEANED_DUST_LEVEL = 10;

function checkAndCleanPanel(dustLevel) {
    let cleaningTriggered = false;
    let updatedDustLevel = dustLevel;

    if (dustLevel >= DUST_THRESHOLD) {
        cleaningTriggered = true;
        updatedDustLevel = CLEANED_DUST_LEVEL;
    }

    return {
        cleaningTriggered,
        updatedDustLevel
    };
}

module.exports = {
    checkAndCleanPanel
};
