import {config} from "../config.js";

export async function initDB() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(config.databaseName, 7);

        request.onerror = (event) => {
            // Handle the error
            console.error("Why didn't you allow my web app to use IndexedDB?!");
            reject(event.target.error);
        };



        request.onsuccess = (event) => {
            window[config.databaseName] = event.target.result;
            resolve();
        };

        request.onupgradeneeded = (event) => {
            window[config.databaseName] = event.target.result;
            const objectStore = window[config.databaseName].createObjectStore("chunks", { keyPath: 'xy' });
            objectStore.transaction.oncomplete = (event) => {
                // Resolve the promise when transaction is complete
                resolve();
            };
        }
    });
}

export async function getDataFromDB(key) {
    return new Promise((resolve, reject) => {
        const transaction = window[config.databaseName].transaction("chunks", "readonly");
        const objectStore = transaction.objectStore("chunks");
        const request = objectStore.get(key);

        request.onsuccess = (event) => {
            const result = event.target.result;
            resolve(result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

export async function setDataInDB(data) {
    return new Promise((resolve, reject) => {
        const transaction = window[config.databaseName].transaction("chunks", "readwrite");
        const objectStore = transaction.objectStore("chunks");
        const request = objectStore.put(data);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}
