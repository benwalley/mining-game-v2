import {isKeyPressed} from "./keyboardHelper.js";
import {getUserData, setUserData} from "./dataHelper.js";

export function handleMovement() {
    const direction = getUserData('direction');
    const timeMoving = new Date().getTime() - getUserData('directionTimestamp');
    if(timeMoving > 2000) {
        setUserData('currentColumn', getUserData('currentColumn') + 1)
        setUserData('directionTimestamp', new Date().getTime())
    }
}

function handleMoveUp() {
    console.log('moving up')
}

function handleMoveDown() {
    console.log('moving down')
}

function handleMoveLeft() {
    console.log('moving left')
}

function handleMoveRight() {
    console.log('moving right')
}
