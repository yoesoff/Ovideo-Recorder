window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
window.requestFileSystem(window.TEMPORARY, 50*1024*1024 /*5MB*/, readVideos, errorHandler); // on doc load ambil existin videos 

// start video recording stuff
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
    // player.record().saveAs({'video': 'my-video-file-name.webm'});
    // kita pake ini aja triggernya finishConvert
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
// end video recording stuff