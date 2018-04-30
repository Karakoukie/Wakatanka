class FaceTracking {

    constructor(target, width, height) {
        this.target = target;

        var tracker = new clm.tracker();
        tracker.init(pModel);
        this.tracker = tracker;

        this.trackScore = 0.0;

        var face3DCanvas = document.createElement("canvas");
        face3DCanvas.width = width;
        face3DCanvas.height = height;
        this.face3DCanvas = face3DCanvas;

        var fd = new FaceDeformer();
        fd.init(face3DCanvas);
        this.faceDeformer = fd;

        console.info("Face tracking instantiated");
    }

    resize(width, height) {
        this.face3DCanvas.width = width;
        this.face3DCanvas.height = height;
    }

    onTrack(callback) {
        if (this.tracker.track(this.target)) {
            this.trackScore = this.tracker.getScore();
            callback();
        }
    }

    getScore() {
        return this.trackScore;
    }

    getParameters() {
        return this.tracker.getCurrentParameters();
    }

    drawFace2D(canvas) {
        if (this.trackScore >= 0.1) {
            this.tracker.draw(canvas);
        }
    }

    drawFace3D(faceImage, faceImagePoints, canvas) {
        if (faceImage && faceImagePoints && canvas) {
            if (this.trackScore >= 0.1) {
                var fd = this.faceDeformer;
                fd.load(faceImage, faceImagePoints, pModel);
                fd.draw(this.tracker.getCurrentPosition());
                var context = canvas.getContext("2d");
                context.drawImage(this.face3DCanvas, 0, 0, context.canvas.width, context.canvas.height);
            }
        }
    }

}