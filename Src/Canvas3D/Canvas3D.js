class Canvas3D {

    constructor(width, height) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        this.element = canvas;

        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        this.context = gl;

        this.currentScene = null;
    }

    resize() {
        var canvas = this.element;
        var gl = this.context;
        
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    setCurrentScene(scene) {
        this.currentScene = scene;
    }

    init() {
        var canvas = this.element;
        var gl = this.context;

        this.currentScene.init(gl);

        console.info("Info: Canvas3D initializate.");
    }

    render() {
        var gl = this.context;
        this.resize();
        this.currentScene.render(gl);
    }

}