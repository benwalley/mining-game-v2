import {config} from "../config.js";
import {getGameData, getUserData, getChunkData, setGameData, setWorldData} from "./dataHelper.js";
import {generateWorldData} from "./generateWorldData.js";

export async function addWorldData(x, y) {
    const worldGenerator = new Worker('/src/js/workers/generateWorld.js', {type: "module"})
    worldGenerator.postMessage({width: config.chunkWidth, height: config.chunkHeight, x, y})
    worldGenerator.onmessage = async (e) => {
        const chunkData = e.data;
        const chunkName = `${x}|${y}`;
        await setWorldData(chunkName, chunkData)
    };
}

export async function getChunkDataByXY(x, y) {
    const key = `${x}|${y}`;
    const data = await getChunkData(key);
    if (data) {
        return data;
    }
    const chunkData = await generateWorldData(config.chunkWidth,config.chunkHeight,x,y);
    await setWorldData(key, chunkData);
    return chunkData;
}

export function getCenterX() {
    return window.gameApp.screen.width / 2
}

export function getCenterY() {
    return window.gameApp.screen.height / 2
}

// check if any chunks need to be added to the world data.
export function checkShouldUpdateChunks() {
    const worldData = window[config.worldDataName];
}

export async function getRenderingArray() {
    const returnArray = [];
    const tilesOnScreenX = Math.ceil(window.gameApp.screen.width / config.blockWidth);
    const tilesOnScreenY = Math.ceil(window.gameApp.screen.height / config.blockWidth);
    // get chunk columns
    const userColumn = getUserData('currentColumn') || 0;
    const userLocalColumn = userColumn % config.chunkWidth
    const tilesToSides = Math.floor(tilesOnScreenX / 2)
    const chunksToLeft = Math.ceil((tilesToSides - userLocalColumn + config.screenBufferBlocks) / config.chunkWidth);
    const chunksToRight = Math.ceil((tilesToSides - (config.chunkWidth - userLocalColumn) + config.screenBufferBlocks) / config.chunkWidth);
    const chunkColumns = chunksToLeft + chunksToRight + 1;
    // get chunk rows
    const userRow = getUserData('currentRow') || 0;
    const tilesAboveBelow = Math.floor(tilesOnScreenY / 2)
    const userLocalRow = userRow % config.chunkHeight;
    const chunksAbove = Math.ceil((tilesAboveBelow - userLocalRow + config.screenBufferBlocks) / config.chunkHeight);
    const chunksBelow = Math.ceil((tilesAboveBelow - (config.chunkHeight - userLocalRow) + config.screenBufferBlocks) / config.chunkHeight);
    const chunkRows = chunksAbove + chunksBelow + 1;

    const totalWidth = chunkColumns * config.chunkWidth;
    const totalHeight = chunkRows * config.chunkHeight;

    const firstChunkX = getCurrentChunkX() - chunksToLeft;
    const firstChunkY = getCurrentChunkY() - chunksAbove;
    setGameData('firstChunkX', firstChunkX)
    setGameData('firstChunkY', firstChunkY)

    let chunkData;

    for (let i = 0; i < totalHeight; i++) {
        const rowArray = [];
        for (let q = 0; q < totalWidth; q++) {
            if((i % config.chunkHeight === 0) && (i % config.chunkHeight === 0)) {
                const chunkNumberX = firstChunkX + Math.floor(q / config.chunkWidth);
                const chunkNumberY = firstChunkY + Math.floor(i / config.chunkHeight);
                chunkData = await getChunkDataByXY(chunkNumberX, chunkNumberY);
            }

            rowArray.push(chunkData[i % config.chunkHeight][q % config.chunkWidth]);
        }
        returnArray.push(rowArray)
    }

    return returnArray;
}

export function getPivotX() {
   return ((getCurrentChunkX() - getGameData('firstChunkX')) * config.chunkWidth * config.blockWidth) + (getUserData('currentColumn') * config.blockWidth);
}

export function getPivotY() {
    return ((getCurrentChunkY() - getGameData('firstChunkY')) * config.chunkHeight * config.blockWidth) + (getUserData('currentRow') * config.blockWidth);
}

export function getCurrentChunkX() {
    return Math.floor(getUserData('currentColumn') / config.chunkWidth);
}

export function getCurrentChunkY() {
    return Math.floor(getUserData('currentRow') / config.chunkWidth);
}
