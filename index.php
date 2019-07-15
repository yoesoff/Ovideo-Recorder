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
        <h1>Video Recorder</h1> 
        <!-- https://github.com/collab-project/videojs-record#examples -->
        <!-- Video player, When recording either audio/video, video-only, animated GIF or a single image, include a video element -->
        <video id="myVideo" playsinline class="video-js vjs-default-skin"></video>
        <br/>
        Please use <a href="https://teahrm.id/">HTTPS</a>!, Supported browsers: <a href="https://www.google.com/chrome/">Chrome</a> (Mobile, Desktop), <a href="https://www.microsoft.com/en-us/windows/microsoft-edge">Edge</a> (Mobile, Desktop).
        <hr />

        <h2>Connection status</h2>
        <img src="images/online.svg" width="80" height="80" />
        <p>Nice! You are currently online.</p>
      </center>
      <!-- Local Filesystem -->
      <h2>In your local harddrive.</h2>
      <ul id="filelistLocal"></ul>
      <p><i>*Click image to donwload.</i></p>

      <!-- Server Filesystem -->
      <h2>Uploaded to the server.</h2>
      <ul id="filelistServer"></ul>
      <p><i>*Click image to donwload.</i></p>

    </div>
  </body>

  <!-- Sugar -->
  <script src="js/sugar/jquery-3.3.1.slim.min.js"></script>
  <script src="js/sugar/popper.min.js"></script>
  <script src="js/sugar/bootstrap.min.js"></script>
  <!-- End of Sugar -->
  
  <script src="js/video.min.js"></script>
  <script src="js/videojs.wavesurfer.min.js"></script>
  <script src="js/record-rtc.js"></script>
  <script src="js/videojs.record.min.js"></script>
  <script src="js/videojs.record.ts-ebml.min.js"></script>

  <!-- Here is the custom code! -->
  <script src="js/helpers.js"></script>
  <script src="js/index.js"></script>

  <script>
    // Register the service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
        // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
  </script>

</html>
