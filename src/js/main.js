import * as PIXI from 'pixi.js';
import {initUser} from './user.js'
import {initWorld} from "./world";
import {setWorldData} from "./helpers/dataHelper.js";
import {initUserData, initWorldData} from "./initData.js";
import {loadData} from "./loadData.js";
import {initListeners} from "./helpers/keyboardHelper";

async function init() {


    initUserData()
    await initWorldData();
    await loadData()
    await initWorld();
    initUser();
    initListeners();


    window.addEventListener("resize", handleResize);
}

function handleResize() {
    window.gameApp.renderer.resize(window.innerWidth, window.innerHeight);
}

init()


