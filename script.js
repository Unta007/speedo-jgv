let elements = {};
let speedMode = 0;
let indicators = 0;

/**
 * Updates the display of the engine state.
 * @param {boolean} state If true, the engine is on.
 */
function setEngine(state) {
    elements.engineIndicator.classList.toggle('active', state);
}

/**
 * Updates the speed display and gauge.
 * @param {number} speed The speed value in meters per second (m/s).
 */
function setSpeed(speed) {
    let displaySpeed;
    let maxSpeed = 300; // Default max speed in KMH

    switch (speedMode) {
        case 1: // MPH
            displaySpeed = Math.round(speed * 2.236936);
            maxSpeed = 200;
            break;
        case 2: // Knots
            displaySpeed = Math.round(speed * 1.943844);
            maxSpeed = 150;
            break;
        default: // KMH
            displaySpeed = Math.round(speed * 3.6);
            maxSpeed = 300;
    }

    elements.speed.innerText = displaySpeed;

    const speedPercent = Math.min(displaySpeed / maxSpeed, 1);
    const rotation = speedPercent * 180 - 180;
    elements.speedFill.style.transform = `rotate(${rotation}deg)`;
}

/**
 * Updates the fuel level display.
 * @param {number} fuel The fuel level from 0.0 to 1.0.
 */
function setFuel(fuel) {
    const fuelPercent = Math.max(0, Math.min(1, fuel)) * 100;

    elements.fuelFill.style.width = `${fuelPercent}%`;
    elements.fuelFill.classList.remove('fuel-low', 'fuel-critical');

    if (fuelPercent <= 15) {
        elements.fuelFill.classList.add('fuel-critical');
    } else if (fuelPercent <= 30) {
        elements.fuelFill.classList.add('fuel-low');
    }
}

/**
 * Updates the vehicle health display.
 * @param {number} health The vehicle health level from 0.0 to 1.0.
 */
function setHealth(health) {
    const healthPercent = Math.max(0, Math.min(1, health)) * 100;

    elements.healthFill.style.width = `${healthPercent}%`;
    elements.healthFill.classList.remove('health-damaged', 'health-critical');

    if (healthPercent <= 30) {
        elements.healthFill.classList.add('health-critical');
    } else if (healthPercent <= 60) {
        elements.healthFill.classList.add('health-damaged');
    }
}

/**
 * Updates the current gear display.
 * @param {string|number} gear The current gear.
 */
function setGear(gear) {
    if (gear === 0) {
        elements.gear.innerText = 'R';
    } else if (gear === -1) {
        elements.gear.innerText = 'N';
    } else {
        elements.gear.innerText = String(gear);
    }
}

/**
 * Updates the headlights status display.
 * @param {number} state 0: Off, 1: On, 2: High Beam.
 */
function setHeadlights(state) {
    const indicator = elements.headlightsIndicator;
    const icon = indicator.querySelector('i');
    indicator.classList.remove('active', 'high-beam');
    icon.className = 'fa-solid fa-lightbulb';

    switch (state) {
        case 1: // Low beam
            indicator.classList.add('active');
            break;
        case 2: // High beam
            indicator.classList.add('active', 'high-beam');
            icon.className = 'fa-solid fa-sun';
            break;
    }
}

/**
 * Sets the state of the left turn indicator.
 * @param {boolean} state If true, turns the left indicator on.
 */
function setLeftIndicator(state) {
    indicators = (indicators & 0b10) | (state ? 0b01 : 0b00);
    updateTurnIndicators();
}

/**
 * Sets the state of the right turn indicator.
 * @param {boolean} state If true, turns the right indicator on.
 */
function setRightIndicator(state) {
    indicators = (indicators & 0b01) | (state ? 0b10 : 0b00);
    updateTurnIndicators();
}

/**
 * Updates the visual state of both turn indicators based on the bitmask.
 */
function updateTurnIndicators() {
    const leftOn = (indicators & 0b01) > 0;
    const rightOn = (indicators & 0b10) > 0;
    elements.leftTurnIndicator.classList.toggle('active', leftOn);
    elements.rightTurnIndicator.classList.toggle('active', rightOn);
}

/**
 * Updates the seatbelt status display.
 * @param {boolean} state If true, seatbelts are fastened.
 */
function setSeatbelts(state) {
    elements.seatbeltIndicator.classList.toggle('active', state);
}

// Initialize elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    elements = {
        speed: document.getElementById('speed'),
        speedFill: document.getElementById('speed-fill'),
        fuelFill: document.getElementById('fuel-fill'),
        healthFill: document.getElementById('health-fill'),
        gear: document.getElementById('gear'),
        engineIndicator: document.getElementById('engine-indicator'),
        headlightsIndicator: document.getElementById('headlights-indicator'),
        leftTurnIndicator: document.getElementById('left-turn-indicator'),
        rightTurnIndicator: document.getElementById('right-turn-indicator'),
        seatbeltIndicator: document.getElementById('seatbelt-indicator'),
    };
});