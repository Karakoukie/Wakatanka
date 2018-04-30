class Wakatanka {

    constructor(width, height) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        this.canvas = canvas;

        var context = canvas.getContext("2d");
        this.context = context;

        console.info("Wakatanka instantiated");
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    append() {
        document.body.appendChild(this.canvas);
    }

    draw(element) {
        var context = this.canvas.getContext("2d");
        context.drawImage(element, 0, 0, context.canvas.width, context.canvas.height);
        console.debug("draw");
    }

    onUpdate(callback) {
        update();
        function update() {
            requestAnimationFrame(update);
            callback();
        }
    }

}