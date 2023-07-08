import * as PIXI from "pixi.js";
import {getCenterX, getCenterY} from "./helpers/worldDataHelpers.js";
const LOADING_TEXT = "Loading..."
let loadingText;

export async function loadData() {
    initGameContainer();
    setLoadingText()
    await generateWorld()
    removeLoadingText()
}

async function generateWorld() {
    // return new Promise((resolve) => {
    //     setTimeout(resolve, 3000);
    // });
}

function initGameContainer() {
    window.gameApp = new PIXI.Application(
        {
            autoResize: true,
            background: '#181818',
            autoDensity: true,
            resizeTo: window,
        }
    );
    document.body.appendChild(window.gameApp.view);

    window.gameContainer = new PIXI.Container();
    window.gameContainer.sortableChildren = true;
    window.gameApp.stage.addChild(window.gameContainer);
}

function setLoadingText() {
    loadingText = new PIXI.Text(LOADING_TEXT);

    loadingText.x = getCenterX();
    loadingText.y = getCenterY();
    loadingText.anchor.set(0.5)

    window.gameApp.stage.addChild(loadingText);
}

function removeLoadingText() {
    window.gameApp.stage.removeChild(loadingText)
}
