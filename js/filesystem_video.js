window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

if (typeof window.requestFileSystem === "function") { // Filesystem Supported
    window.requestFileSystem(window.TEMPORARY, 50*1024*1024 /*5MB*/, readVideos, errorHandler); // on doc load ambil existin videos 
    fileSystemSupported = true; // <- ini acuan selanjutnya!
    console.log("Filesystem Supported.");
} else { // No Filesystem support
    var emsg = "<li style='color:red;'>Your browser doesn't support FileSystem! <br/>Supported browsers: Chrome (Mob, PC), Edge (Mob, PC). </li>";
    document.getElementById("filelistLocal").innerHTML = emsg;
    console.log("No support for Filesystem!");
}

// filesystem access https://www.html5rocks.com/en/tutorials/file/filesystem/
function saveVideo(fs) {
    console.log('Opened file system: ' + fs.name);

    fs.root.getFile('vid_'+createTime()+'.'+video_format, {create: true, exclusive: false}, function(fileEntry) {

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

// Ini yang ambil videos dari Filesystem lalu panggil fungsi list buat populate videos ke list.
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

// Delete video dengan konfirmasi dulu.
function deleteVideo(fs, name) {

    var conf = confirm(`Are you sure want to remove ${name}?`);
    
    if (conf) {
        fs.root.getFile(name, {create: false}, function(fileEntry) {
            console.log('Deleted', fileEntry);
            fileEntry.remove(function() {
                console.log(`File ${name} removed.`);
                resetFilelistLocal(fs); // reset list local video
            }, errorHandler);
        
        }, errorHandler);
        
    }
}

// Tombol-tombol delete|view|play
function videoActions(fs, name) {
    var videlid = name.replace(/[^a-z0-9]/gi,''); // link element id
    return `&nbsp;(<a href="javascript:void(0);" id="delete_${videlid}"> Delete </a> | <a href="javascript:void(0);" id="play_${videlid}"> Play </a> | <a href="javascript:void(0);" id="upload_${videlid}"> Upload </a>)`;
}

// Beri event pada tombol-tombol delete|view|play
function bindVideoActions(fs, name) {
    var videlid = name.replace(/[^a-z0-9]/gi,''); // link element id

    document.getElementById(`delete_${videlid}`).addEventListener('click', function () {
        console.log(`delete_${videlid} clicked`);
        deleteVideo(fs, name);
     }, false);
    document.getElementById(`play_${videlid}`).addEventListener('click', function () {
        console.log(`play_${videlid} clicked`);
        alert('play, todo.');
     }, false);
    document.getElementById(`upload_${videlid}`).addEventListener('click', function () {
        alert('upload, todo.');
     }, false);
}

// beres recording langsung reset list LI videos
function resetFilelistLocal(fs) {
    document.getElementById("filelistLocal").innerHTML = "";
    readVideos(fs);
    console.log("reset list (resetFilelistLocal)!");
}

// Ini yang populate LI list.
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
            x++;
        });

        document.querySelector('#filelistLocal').appendChild(fragment);

        // untuk donwload video
        entries.forEach(function(entry, i) {
            var li = document.createElement('li');
            var videlid = entry.name.replace(/[^a-z0-9]/gi,''); // link element id
            var name = entry.name;

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
        });

    } else {
        document.getElementById("filelistLocal").innerHTML = "<li>No video found! </li>";
    }
}