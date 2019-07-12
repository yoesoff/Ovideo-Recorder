<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Test Video</title>
    
    <link rel="stylesheet" href="css/video-js.min.css" />
    <link rel="stylesheet" href="css/videojs.wavesurfer.min.css" />
    <link rel="stylesheet" href="css/videojs.record.min.css" />
    <link rel="icon" type="image/png" href="images/favicon.png" />
  </head>

  <body>
    <h1>Video Recorder</h1> 
    <!-- https://github.com/collab-project/videojs-record#examples -->
    <!--When recording either audio/video, video-only, animated GIF or a single image, include a video element -->
    <video id="myVideo" playsinline class="video-js vjs-default-skin"></video>

    <ul id="filelist"></ul>

  </body>

  <script src="js/video.min.js"></script>
  <script src="js/videojs.wavesurfer.min.js"></script>
  <script src="js/record-rtc.js"></script>
  <script src="js/videojs.record.min.js"></script>
  <script src="js/videojs.record.ts-ebml.min.js"></script>
  <script>

  function createTime() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+'_'+time;
  }

    var tmpBlob = null;

    // filesystem access
    // https://www.html5rocks.com/en/tutorials/file/filesystem/
    function createVideo(fs) {
      console.log('Opened file system: ' + fs.name);

      fs.root.getFile('vid_'+createTime()+'.webm', {create: true, exclusive: false}, function(fileEntry) {

        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function(fileWriter) {

          fileWriter.onwriteend = function(e) {
            console.log('Write completed.');
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

    function toArray(list) {
      return Array.prototype.slice.call(list || [], 0);
    }

    function listResults(entries, fs) {
      // Document fragments can improve performance since they're only appended
      // to the DOM once. Only one browser reflow occurs.
      var fragment = document.createDocumentFragment();

      entries.forEach(function(entry, i) {
        var li = document.createElement('li');
        var linkObj = null;

        li.innerHTML = ['<a id="'+entry.name.replace(/[^a-z0-9]/gi,'')+'" href rel="stylesheet" download="'+entry.name+'">', entry.name, '</a>'].join('');
        fragment.appendChild(li);

        // get video by name and set to download link
        fs.root.getFile(entry.name, {}, function(entry) {
          entry.file(function(file) {
             console.log(file);

             var link = document.getElementById(entry.name.replace(/[^a-z0-9]/gi,''));
             link.href = window.URL.createObjectURL(file);
          }, errorHandler);

        }, errorHandler);
        // end get



      });

      document.querySelector('#filelist').appendChild(fragment);
    }

    function readVideos(fs) {
      var dirReader = fs.root.createReader();
      var entries = [];

      // Call the reader.readEntries() until no more results are returned.
      var readEntries = function() {
         dirReader.readEntries (function(results) {
          if (!results.length) {
            listResults(entries.sort(), fs);
          } else {
            entries = entries.concat(toArray(results));
            readEntries();
          }
        }, errorHandler);
      };

      readEntries(); // Start reading dirs.
    }

    function errorHandler(fs) {
      console.log('Opened file system: ' + fs.name);
      //alert("Ups, please don't use incognito mode!");
    }

    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(window.TEMPORARY, 50*1024*1024 /*5MB*/, readVideos, errorHandler);
    // end of filesystem 


    // start video stuff
    var player = videojs('myVideo', {
    // video.js options
    controls: true,
    loop: false,
    fluid: false,
    width: 320,
    height: 240,
    plugins: {
          // videojs-record plugin options
          record: {
            image: false,
            audio: true,
            video: true,
            maxLength: 120,
            debug: true,
            convertEngine: 'ts-ebml' // Intervals metadata
          }
        }
    });

    player.on('startRecord', function() {
        console.log('Recording....!');
    });

    // user completed recording and stream is available
    player.on('finishRecord', function() {
      //player.record().saveAs({'video': 'my-video-file-name.webm'});
    });

    // converter ready and stream is available
    player.on('finishConvert', function() {
      // the convertedData object contains the converted data that
      // can be downloaded by the user, stored on server etc.
      // console.log('finished converting: ', player.convertedData);
      // player.record().saveAs({'video': 'my-video-file-converted.webm'});

      // Request access to save file.
      tmpBlob = player.convertedData;
      window.requestFileSystem(window.TEMPORARY, 50*1024*1024 /*50MB*/, createVideo, errorHandler);
    });

  </script>
</html>
