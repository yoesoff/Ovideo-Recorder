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

  </body>

  <script src="js/video.min.js"></script>
  <script src="js/videojs.wavesurfer.min.js"></script>
  <script src="js/record-rtc.js"></script>
  <script src="js/videojs.record.min.js"></script>
  <script src="js/videojs.record.ts-ebml.min.js"></script>
  <script>
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
            maxLength: 50,
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
      #player.record().saveAs({'video': 'my-video-file-name.webm'});
    });

    // converter ready and stream is available
    player.on('finishConvert', function() {
      // the convertedData object contains the converted data that
      // can be downloaded by the user, stored on server etc.
      // console.log('finished converting: ', player.convertedData);
      player.record().saveAs({'video': 'my-video-file-converted.webm'}); // pure
    });

  </script>
</html>
