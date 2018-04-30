class Scene {

    constructor() {
        this.currentCamera = null;
        this.object3DList = [];
        this.backgroundColor = [0.5, 0.5, 0.5];
    }

    setCurrentCamera(camera) {
        this.currentCamera = camera;
    }

    addObject3D(object3D) {
        this.object3DList.push(object3D);
    }

    updateBackgroundColor(gl) {
        var backgroundColor = this.backgroundColor;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], 1.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    
    init(gl) {
        var camera = this.currentCamera;
        var projection = camera.getPerspectiveProjection(gl.drawingBufferWidth, gl.drawingBufferHeight);

        this.object3DList.forEach(object3D => {
            object3D.compileShader(gl);
            object3D.updateGeometry(gl);
            object3D.updateTransform(gl);
            object3D.updateMainColor(gl);
            object3D.updateProjection(projection, gl);
        });
    }

    render(gl) {
        this.updateBackgroundColor(gl);
        this.object3DList.forEach(object3D => {
            object3D.updateTransform(gl);
            object3D.updateMainColor(gl);
            object3D.draw(gl);
        });
    }

}