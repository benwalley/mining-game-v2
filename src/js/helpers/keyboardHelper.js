import {config} from "../config.js";
import {getUserData, setUserData} from "./dataHelper.js";

window[config.keypressTrackerName] = new Set()

export function initListeners() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
}

function handleKeyDown(e) {
    window[config.keypressTrackerName].add(e.key)
    handleSetData(e.key)
}

function handleKeyUp(e) {
    window[config.keypressTrackerName].delete(e.key);
    setUserData('direction', undefined)
    setUserData('directionTimestamp', undefined)
}

// TODO: handle pressing new direction slightly before releasing old one.
function handleSetData(key) {
    if(key === 'w' || key === 'W' || key === 'ArrowUp') {
        setDirection('up')
    }
    if(key === 's' || key === 'S' || key === 'ArrowDown') {
        setDirection('down')
    }
    if(key === 'a' || key === 'A' || key === 'ArrowLeft') {
        setDirection('left')
    }
    if(key === 'd' || key === 'D' || key === 'ArrowRight') {
        setDirection('right')
    }
}

function setDirection(direction) {
    if(getUserData('direction') === direction) return; // because the keydown events get fired multiple times
    setUserData('direction', direction);
    setUserData('directionTimestamp', new Date().getTime())
}

export function isKeyPressed(key) {
    return window[config.keypressTrackerName].has(key)
}
