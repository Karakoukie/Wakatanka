class FaceImage {

    constructor(src) {
        var faceImage = document.createElement("img");
        faceImage.src = src;
        this.faceImage = faceImage;
        console.info("Face image instantiated");
    }

    onLoad(callback) {
        this.faceImage.onload = function() {
            console.info("Face image loaded");
            callback();
        }
    }

    getPositions() {
        var canvas = document.createElement("canvas");
        var canvasContext = canvas.getContext('2d');

        var faceImage = this.faceImage;
        canvas.width = faceImage.width;
        canvas.height = faceImage.height;
        canvasContext.drawImage(faceImage, 0, 0, faceImage.width, faceImage.height);

        var curpoints = null;

        var ctrack = new clm.tracker();
        ctrack.init(pModel);

        var positions = [];
        var converged = false;
        var iteration = 0;

        while (!converged) {
            iteration++;

            curpoints = ctrack.track(canvas);

            if (!curpoints) {
                console.error("Impossible to generate face image positions.");
                return false;
            }

            if (positions.length == 10) {
                positions.splice(0, 1);
            }

            positions.push(curpoints);

            if (positions.length == 10) {
                var means = [];

                for (var i = 0; i < positions[0].length; i++) {
                    means[i] = [0, 0];

                    for (var j = 0; j < positions.length; j++) {
                        means[i][0] += positions[j][i][0];
                        means[i][1] += positions[j][i][1];
                    }

                    means[i][0] /= 10;
                    means[i][1] /= 10;
                }

                var variances = [];

                for (var i = 0; i < positions[0].length; i++) {
                    variances[i] = [0, 0];

                    for (var j = 0; j < positions.length; j++) {
                        variances[i][0] += ((positions[j][i][0] - means[i][0]) * (positions[j][i][0] - means[i][0]));
                        variances[i][1] += ((positions[j][i][1] - means[i][1]) * (positions[j][i][1] - means[i][1]));
                    }
                }

                var allVariance = 0;

                for (var i = 0; i < positions[0].length; i++) {
                    for (var j = 0; j < positions.length; j++) {
                        allVariance += variances[i][0];
                        allVariance += variances[i][1];
                    }
                }

                if (allVariance < 50) {
                    converged = true;
                }
            }

            if (iteration > 100) {
                converged = true;
            }
        }

        for (var i = 0; i < curpoints.length; i++) {
            if (curpoints[i][0][0] > canvas.width) {
                curpoints[i][0][0] = canvas.width;
            }
            else if (curpoints[i][0][0] < 0) {
                curpoints[i][0][0] = 0;
            }

            if (curpoints[i][0][1] > canvas.height) {
                curpoints[i][0][1] = canvas.height;
            }
            else if (curpoints[i][0][1] < 0) {
                curpoints[i][0][1] = 0;
            }
        }

        console.info("Face image positions generated");
        return curpoints;
    }

}