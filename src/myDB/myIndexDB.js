// This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
let idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

export const createCollection = () => {
    if(!idb){
        alert("No Index DB. Saddd!")
        return;
    }

    console.log("index db is ", idb)

    const request = idb.open("test-db")

    request.onError = (event) => {
        console.log("** event ", event);
        console.log("An error occured with IndexDB");
    }

    request.onupgradeneeded = (event) => {
        const db = request.result;
        
        if(!db.objectStoreNames.contains("transactions")){
            db.createObjectStore("transaction", {
                keyPath: "id"
            })
        }
    }

    request.onsuccess = (event)=>{
        console.log("index db connected successfully")
    }

}