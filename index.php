<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Test Video</title>

    <!-- Sugar -->
    <link rel="stylesheet" href="css/sugar/bootstrap.min.css" />
    <!-- End of Sugar -->

    <link rel="stylesheet" href="css/video-js.min.css" />
    <link rel="stylesheet" href="css/videojs.wavesurfer.min.css" />
    <link rel="stylesheet" href="css/videojs.record.min.css" />
    <link rel="stylesheet" href="css/main.css" />

    <link rel="icon" type="image/png" href="images/favicon.png" />
  </head>

  <body>
     <!-- Page Content -->
    <div class="container">
      <center>
        <h2>Video Recorder (Please use <a href="https://teahrm.id/">HTTPS</a>!.)</h2> 
        <!-- https://github.com/collab-project/videojs-record#examples -->
        <!-- Video player, When recording either audio/video, video-only, animated GIF or a single image, include a video element -->
        <video id="myVideo" playsinline class="video-js vjs-default-skin"></video>
        <br/>
      </center>
      <div>
        <!-- Local Filesystem -->
        <h2><u>In your local harddrive.</u></h2>
        <ul id="filelistLocal"></ul>
        <i>*Click title to download.</i>
      </div>

      <!-- @todo <div>
        Server Filesystem
        <h2><u>Uploaded to the server.</u></h2>
        <ul id="filelistServer"></ul>
        <i>*Click title to donwload.</i>
      </div> -->

    </div>

    <center>
        <hr/>
        <h2><u>Connection status</u></h2>
        <img src="images/online.svg" width="80" height="80" />
        <p>Nice! You are currently online.</p>
    <center>
  </body>

  <!-- Sugar (For tampilan only) -->
  <script src="js/sugar/jquery-3.3.1.slim.min.js"></script>
  <script src="js/sugar/popper.min.js"></script>
  <script src="js/sugar/bootstrap.min.js"></script>
  <!-- End of Sugar -->
  
  <!-- Video related libs -->
  <script src="js/video.min.js"></script>
  <script src="js/videojs.wavesurfer.min.js"></script>
  <script src="js/record-rtc.js"></script>
  <script src="js/videojs.record.min.js"></script>
  <script src="js/videojs.record.ts-ebml.min.js"></script>
  <!-- End of Video -->

  <!-- App Configuration -->
  <script>
      var fileSystemSupported = false; // Default is false
      var indexedDBSupported = false; // Default is false
      var tmpBlob = null;
      var video_format = "mp4";
  </script>

  <!-- Here is the custom code! -->
  <script src="js/helpers.js"></script>

  <script src="js/filesystem_video.js"></script>
  <script src="js/indexedDB_video.js"></script>

  <script src="js/oplayer.js"></script>
  <script src="js/service_worker.js"></script>
  <!-- End of custom code -->

</html>
