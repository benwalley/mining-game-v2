import {generateWorldData} from "../helpers/generateWorldData.js";

onmessage = (e) => {
    const {width, height, x, y} = e.data;
    const chunk = generateWorldData(width, height, x, y)
    postMessage(chunk);
};


