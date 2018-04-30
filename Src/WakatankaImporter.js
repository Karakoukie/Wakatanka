class WakatankaImporter {

    static onImportAll(libraryPath, callback) {
        WakatankaImporter.loadVideoCapturing();
        WakatankaImporter.loadFaceTracking();
        WakatankaImporter.loadCanvas3D();
        WakatankaImporter.loadThreeJS();

        WakatankaImporter.onImporting(libraryPath, callback);
    }

    static loadVideoCapturing() {
        if (!WakatankaImporter.filesPaths) {
            WakatankaImporter.filesPaths = [];
            WakatankaImporter.filesPaths.push("Wakatanka.js");
            console.info("Info: Wakatanka file added to load queue.");
        }

        WakatankaImporter.filesPaths.push("VideoCapturing/VideoCapturing.js");

        console.info("Info: Video capturing files added to load queue.");
    }

    static loadFaceTracking() {
        if (!WakatankaImporter.filesPaths) {
            WakatankaImporter.filesPaths = [];
            WakatankaImporter.filesPaths.push("Wakatanka.js");
            console.info("Info: Wakatanka file added to load queue.");
        }

        WakatankaImporter.filesPaths.push("FaceTracking/clmtrackr.js");
        WakatankaImporter.filesPaths.push("FaceTracking/FaceClassifier.js");
        WakatankaImporter.filesPaths.push("FaceTracking/FaceDeformer.js");
        WakatankaImporter.filesPaths.push("FaceTracking/FaceImage.js");
        WakatankaImporter.filesPaths.push("FaceTracking/FaceModel.js");
        WakatankaImporter.filesPaths.push("FaceTracking/FaceTracking.js");

        console.info("Info: Face tracking files added to load queue.");
    }

    static loadCanvas3D() {
        if (!WakatankaImporter.filesPaths) {
            WakatankaImporter.filesPaths = [];
            WakatankaImporter.filesPaths.push("Wakatanka.js");
            console.info("Info: Wakatanka file added to load queue.");
        }

        WakatankaImporter.filesPaths.push("Canvas3D/Canvas3D.js");
        WakatankaImporter.filesPaths.push("Canvas3D/Camera.js");
        WakatankaImporter.filesPaths.push("Canvas3D/Mesh.js");
        WakatankaImporter.filesPaths.push("Canvas3D/Object3D.js");
        WakatankaImporter.filesPaths.push("Canvas3D/Scene.js");
        WakatankaImporter.filesPaths.push("Canvas3D/Shader.js");
        WakatankaImporter.filesPaths.push("Canvas3D/Transform.js");
        
        console.info("Info: Canvas3D files added to load queue.");
    }

    static loadThreeJS() {
        if (!WakatankaImporter.filesPaths) {
            WakatankaImporter.filesPaths = [];
            WakatankaImporter.filesPaths.push("Wakatanka.js");
            console.info("Info: Wakatanka file added to load queue.");
        }

        WakatankaImporter.filesPaths.push("ThreeJS/ThreeJS.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Lib/three.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Lib/Cache.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Lib/inflate.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Loading/FBXLoader.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Loading/FileLoader.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Loading/JSONLoader.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Object3D/Reflector.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Object3D/Sky.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/PostProcessing/EffectComposer.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/PostProcessing/FilmPass.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/PostProcessing/RenderPass.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/PostProcessing/SAOPass.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/PostProcessing/ShaderPass.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/PostProcessing/SMAAPass.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/PostProcessing/UnrealBloomPass.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Shading/ConvolutionShader.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Shading/CopyShader.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Shading/DepthLimitedBlurShader.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Shading/FilmShader.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Shading/LuminosityHighPassShader.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Shading/SAOShader.js");
        WakatankaImporter.filesPaths.push("ThreeJS/Include/Shading/UnpackDepthRGBAShader.js");
        
        console.info("Info: ThreeJS files added to load queue.");
    }

    static onImporting(libraryPath, callback) {
        var filesPaths = WakatankaImporter.filesPaths;

        var filesLoaded = 0;
        function load() {
            var script = document.createElement("script");
            script.src = libraryPath + filesPaths[filesLoaded];
            document.body.appendChild(script);

            script.onload = function () {
                filesLoaded++;
                
                if (filesLoaded == filesPaths.length) {
                    console.info("Wakatanka importing complete");
                    callback();
                }
                else {
                    load();
                }
            }
        }

        load();
    }

}