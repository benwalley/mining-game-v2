import * as PIXI from "pixi.js";
import {config} from "./config.js";
import {getCenterX, getCenterY} from "./helpers/worldDataHelpers.js";
import {getUserData, setUserData} from "./helpers/dataHelper.js";
import {handleMovement} from "./helpers/userHelpers.js";


let user = {};

export function initUser() {
    user = PIXI.Sprite.from('images/cat.png')

    user.anchor.set(0.5);
    user.x = getCenterX();
    user.y = getCenterY();
    user.width = config.blockWidth;
    user.height = config.blockWidth;
    user.zIndex = 100;

    window.gameContainer.addChild(user);

    window.gameApp.ticker.add(onTick);
}

function onTick(delta) {
    handleMovement();
    const currentUserRow = getUserData('currentRow')
    const currentUserColumn = getUserData('currentColumn')
}
