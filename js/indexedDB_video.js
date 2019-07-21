// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

var db;
var dbaccessrequest;
var dbversion = 2;//bila ada perubahan struktur maka naikan versi
if (typeof window.indexedDB === 'object') {
    console.log("IndexedDB Supported");

    dbaccessrequest = indexedDB.open("videodb", dbversion);

    dbaccessrequest.onerror = function(event) {
        console.log("Why didn't you allow my web app to use IndexedDB?!");
    };

    dbaccessrequest.onsuccess = function(event) {
        db = event.target.result; // <- ready to use
        db.onerror = function(event) {
            console.error("Database error: " + event.target.errorCode);
        };
        console.log("IndexedDB Allowed.");
    };

    dbaccessrequest.onupgradeneeded = function (event) {
        db = event.target.result; // <- ready to use
        // Create another object store called "names" with the autoIncrement flag set as true.    
        var objStore = db.createObjectStore("videos", { autoIncrement : true });
        console.log("IndexedDB Upgraded to "+dbversion+".");

    }    

} else {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}



