var tmpBlob = null;

//  Buat nama file pakai date. 
function createTime() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+'_'+time;
}

// filesystem access https://www.html5rocks.com/en/tutorials/file/filesystem/
function createVideo(fs) {
    console.log('Opened file system: ' + fs.name);

    fs.root.getFile('vid_'+createTime()+'.webm', {create: true, exclusive: false}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

        fileWriter.onwriteend = function(e) {
            console.log('Write completed.');
            resetFilelistLocal(fs); // reset list local video
        };

        fileWriter.onerror = function(e) {
            console.log('Write failed: ' + e.toString());
        };

        // Create a new Blob and write it to log.txt.
        // var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
        fileWriter.write(tmpBlob);

    }, errorHandler);

    }, errorHandler);

    
}

// Ini yang ambil videos dari Filesystem
function readVideos(fs) {
    var dirReader = fs.root.createReader();
    var entries = [];

    // Call the reader.readEntries() until no more results are returned.
    var readEntries = function() {
        dirReader.readEntries (function(results) {
            if (!results.length) {
                listVideos(entries.sort(), fs);
            } else {
                entries = entries.concat(toArray(results));
                readEntries();  // <- recursive here!
            }
        }, errorHandler);
    };

    readEntries(); // Start reading dirs recursively.
}

function deleteVideo(fs, name) {
    var conf = confirm(`Are you sure want to remove ${name}?`);
    
    if (conf) {
        fs.root.getFile(name, {create: false}, function(fileEntry) {

            fileEntry.remove(function() {
                console.log(`File ${name} removed.`);
                resetFilelistLocal(fs); // reset list local video
            }, errorHandler);
        
        }, errorHandler);
        
    }
}


function videoActions(fs, name) {
    var videlid = name.replace(/[^a-z0-9]/gi,''); // link element id
    return `&nbsp;(<a href="javascript:void(0);" id="delete_${videlid}"> Delete </a> | <a href="javascript:void(0);" id="play_${videlid}"> Play </a> | <a href="javascript:void(0);" id="upload_${videlid}"> Upload </a>)`;
}

function bindVideoActions(fs, name) {
    var videlid = name.replace(/[^a-z0-9]/gi,''); // link element id

    document.getElementById(`delete_${videlid}`).addEventListener('click', function () {
        console.log(`delete_${videlid} clicked`);
        deleteVideo(fs, name);
     }, false);
    document.getElementById(`play_${videlid}`).addEventListener('click', function () {
        console.log(`delete_${videlid} clicked`);
        alert('click');
        return false;
     }, false);
    document.getElementById(`upload_${videlid}`).addEventListener('click', function () {
        alert('click');
        return false;
     }, false);
}

function toArray(list) {
    return Array.prototype.slice.call(list || [], 0);
}

// Ini yang bikin LI list.
function listVideos(entries, fs) {
    if (entries.length > 0) {
        // Document fragments can improve performance since they're only appended
        // to the DOM once. Only one browser reflow occurs.
        var fragment = document.createDocumentFragment();
        var x = 1;

        entries.forEach(function(entry, i) {
            var li = document.createElement('li');
            var videlid = entry.name.replace(/[^a-z0-9]/gi,''); // link element id
            var name = entry.name;

            li.innerHTML = ['<a id="'+videlid+'" href rel="stylesheet" download="'+name+'">', x, '. ', name, '</a>', videoActions(fs, entry.name)].join('');

            fragment.appendChild(li);

            // get video by name to filesystem and set to download link
            fs.root.getFile(entry.name, {}, function(entry) {
                entry.file(function(file) {
                    //console.log(file);
                    var link = document.getElementById(videlid);
                    link.href = window.URL.createObjectURL(file); // <-- download link

                    bindVideoActions(fs, name);
                }, errorHandler);

            }, errorHandler);
            // end get

            x++;
        });

        document.querySelector('#filelistLocal').appendChild(fragment);
    } else {
        document.getElementById("filelistLocal").innerHTML = "<li>No video found! </li>";
    }
}

// Error handling lari kesini.
function errorHandler(fs) {
    console.log('Error: ' + fs.name);
}

// beres recording reset
function resetFilelistLocal(fs) {
    document.getElementById("filelistLocal").innerHTML = "";
    readVideos(fs);
    console.log("reset list (resetFilelistLocal)!");
}