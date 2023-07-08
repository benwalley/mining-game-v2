import {config} from "../config.js";
import {getDataFromDB, setDataInDB} from "./databaseHelpers.js";

export function getUserData(name) {
    const userData = window[config.userDataName];
    return userData?.[name]
}

export function setUserData(key, value) {
    console.log('setting ' + key)
    if(window[config.userDataName] === undefined) {
        window[config.userDataName] = {}
    }

    window[config.userDataName][key] = value
}

export async function getChunkData(name) {
    const response = await getDataFromDB(name)
    return response?.value;
}

export function getAllWorldData() {
    const worldData = window.localStorage.getItem(config.worldDataName);
    try {
        return JSON.parse(worldData)
    } catch(e) {
        return undefined
    }
}

export async function setWorldData(key, value) {
    await setDataInDB({'xy': key, value})
}

export function setGameData(key, value) {
    if(window[config.generalDataName] === undefined) {
        window[config.generalDataName] = {}
    }

    window[config.generalDataName][key] = value
}

export function getGameData(name) {
    const worldData = window[config.generalDataName];
    return worldData?.[name]
}
