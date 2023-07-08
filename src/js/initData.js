import {config} from "./config.js";
import {initDB} from "./helpers/databaseHelpers.js";

export function initUserData() {
    window[config.userDataName] = {
        inventory: [],
        velocityX: Math.random() - 0.5,
        velocityY: Math.random() - 0.5,
        currentRow: 200,
        currentColumn: 1000000000000,
        direction: 'right',
    }
}

export async function initWorldData() {
    await initDB();

}



