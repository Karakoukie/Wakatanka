class VideoCapturing {

    constructor(width, height) {
        var video = document.createElement("video");
        video.width = width;
        video.height = height;
        this.video = video;
    }

    resize(width, height) {
        this.video.width = width;
        this.video.height = height;
    }

    onStart(callback) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
        
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(setStream);
        }
        else if (navigator.getUserMedia) {
            navigator.getUserMedia({ video: true }, setStream, null);
        }
        
        var video = this.video;
        function setStream(stream) {
            video.srcObject = stream;
            video.play();
            console.info("Video capture started");
            callback();
        }
    }

}