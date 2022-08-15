import { getCustomProperty, 
        incrementCustomProperty, 
        setCustomProperty } from "./helpers.js";

const groundElems = document.querySelectorAll('[data-ground]');
const SPEED = 0.05

export function setupGround() {
    setCustomProperty(groundElems[0], '--left', 0);
    setCustomProperty(groundElems[1], '--left', 300);
}

export function updateGround(delta, speedScale) {
    groundElems.forEach(groundElem => {
        incrementCustomProperty(groundElem, '--left', -1 * speedScale * SPEED * delta);
        if (getCustomProperty (groundElem, '--left') < -300) {
            incrementCustomProperty (groundElem, '--left', 600);
        }
    });
} 