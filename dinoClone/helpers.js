export function getCustomProperty(elem, prop) {
    return  Number(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(elem, prop, value) {
    elem.style.setProperty(prop, value);
}

export function incrementCustomProperty(element, prop, incValue) {
    setCustomProperty(element, prop, getCustomProperty(element, prop) + incValue); 
}

