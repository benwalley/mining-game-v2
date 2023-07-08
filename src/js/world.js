import * as PIXI from "pixi.js";
import {
    addWorldData,
    getCenterX,
    getCenterY,
    getChunkDataByXY,
    getPivotX, getPivotY,
    getRenderingArray
} from "./helpers/worldDataHelpers.js";
import {getGameData, getUserData, getChunkData} from "./helpers/dataHelper.js";
import {config} from "./config.js";

export async function initWorld() {
    window.worldContainer = new PIXI.Container();
    window.gameContainer.addChild(window.worldContainer);

    const worldData = await getRenderingArray();

    let rowIndex = 0;
    let columnIndex = 0;
    for (const row of worldData) {
        for (const block of row) {
            let texture
            if (block.type === 'gold') {
                texture = PIXI.Texture.from('images/gold.png')
            } else {
                texture = PIXI.Texture.from('images/stone.png')
            }
            const blockSprite = new PIXI.Sprite(texture);

            blockSprite.x = columnIndex * config.blockWidth;
            blockSprite.y = rowIndex * config.blockWidth;
            blockSprite.width = config.blockWidth;
            blockSprite.height = config.blockWidth;
            blockSprite.anchor.set(0.5);
            blockSprite.zIndex = 1;
            window.worldContainer.addChild(blockSprite)
            columnIndex++
        }
        columnIndex = 0;
        rowIndex++
    }


    // center world container
    //TODO: Set correct world placement
    window.worldContainer.x = getCenterX();
    window.worldContainer.y = getCenterY();
    window.worldContainer.pivot.x = window.worldContainer.width / 2;
    window.worldContainer.pivot.y = window.worldContainer.height / 2;


    window.gameApp.ticker.add(onTick);
}

function onTick(delta) {
    //TODO: Move world

    // const pivotX = getPivotX()
    // const pivotY = getPivotY();
    // window.worldContainer.pivot.x = pivotX;
    // window.worldContainer.pivot.y = pivotY;
}

function drawWorld() {

}
