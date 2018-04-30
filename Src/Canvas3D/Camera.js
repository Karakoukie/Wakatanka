class Camera {

    constructor() {
        this.transform = new Transform();
        this.fov = 60;
        this.near = 0.1;
        this.far = 1000;
    }

    getPerspectiveProjection(width, height) {
        var fov = this.fov;
        var near = this.near;
        var far = this.far;

        var fieldOfViewInRadians = fov * Math.PI / 180;
        var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
        var rangeInv = 1.0 / (near - far);
        var aspect = width / height;

        return [
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, -1,
            0, 0, near * far * rangeInv * 2, 0
        ];
    }

}