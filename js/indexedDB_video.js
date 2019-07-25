var xdb_name = 'videodb';

var xdb;
var dbaccessrequest;
var dbversion = 3; //bila ada perubahan struktur maka naikan versi

// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

if (typeof window.indexedDB === 'object') {
    console.log("IndexedDB Supported");
    indexedDBSupported = true;

    dbaccessrequest = indexedDB.open(xdb_name, dbversion);

    dbaccessrequest.onerror = function(event) {
        indexedDBSupported = false;
        console.log("Why didn't you allow my web app to use IndexedDB?!");
    };

    dbaccessrequest.onsuccess = function(event) {
        xdb = event.target.result; // <- ready to use

        xdb.onerror = function(event) {
            console.error("Database error: " + event.target.errorCode);
        };

        console.log("IndexedDB Allowed.");
    };

    dbaccessrequest.onupgradeneeded = function (event) {
        xdb = event.target.result; // <- ready to use

        xdb.onerror = function(event) {
            console.error("Database error: " + event.target.errorCode);
        };

        // https://www.raymondcamden.com/2012/04/25/How-to-handle-setup-logic-with-indexedDB
        if(!thisDb.objectStoreNames.contains("note")) {
            // Create another object store called "names" with the autoIncrement flag set as true.    
            var objStore = xdb.createObjectStore('videos', { autoIncrement : true });
            console.log("IndexedDB Upgraded to "+dbversion+".");
        }
    }    

} else {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

// Save video
function xsaveVideo(xdb, video) {
    if (!xdb)
        return false;

    var transaction = xdb.transaction(['videos'], "readwrite");

    transaction.oncomplete = function(event) {
        console.log("videos transaction completed!");
    };

    transaction.onerror = function(event) {
        console.log("Ups, transaction!");
    };

    var objectStore = transaction.objectStore("videos");

    var request = objectStore.add(video);
    request.onsuccess = function(event) {
        console.log("Video saved to indexed db!");
    };
}

// Delete video
function xremoveVideo(xdb, key) {
    var request = xdb.transaction(["videos"], "readwrite")
                .objectStore("videos")
                .delete(key);

    request.onsuccess = function(event) {
        msg = "Deleted from IndexedDB";
        console.log(msg);
        alert(msg);
    };
}

// Get video
function xgetVideo (xdb, key) {
    if (!xdb)
        return false;

    var transaction = xdb.transaction(['videos'], "readwrite");

    var objectStore = transaction.objectStore("videos");
    var request = objectStore.get(key);

    request.onerror = function(event) {
        // Handle errors!
        console.log("Video for "+ key +" not found! ");
    };

    request.onsuccess = function(event) {
        // Do something with the request.result!
        console.log("Video for "+ key +" is " + request.result.name);
    };

}