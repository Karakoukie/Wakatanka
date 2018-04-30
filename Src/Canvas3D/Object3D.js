class Object3D {

    constructor() {
        this.transform = new Transform();
        this.mesh = new Mesh();
        this.shader = new Shader();
        this.compiledShader = null;
        this.mainColor = [1,0,0,1];
    }

    compileShader(gl) {
        this.compiledShader = this.shader.compile(gl);
    }

    updateProjection(projection, gl) {
        var shaderProgram = this.compiledShader;
        gl.useProgram(shaderProgram);
        var projectionMatrixLocation = gl.getUniformLocation(shaderProgram, "projection_matrix");
        gl.uniformMatrix4fv(projectionMatrixLocation, false, projection);
    }

    updateMainColor(gl) {
        var mainColor = this.mainColor;
        var shaderProgram = this.compiledShader;
        gl.useProgram(shaderProgram);
        var mainColorLocation = gl.getUniformLocation(shaderProgram, "main_color");
        gl.uniform4fv(mainColorLocation, mainColor);
    }

    updateGeometry(gl) {
        var vertices = this.mesh.vertices;
        var indices = this.mesh.indices;
        var shaderProgram = this.compiledShader;

        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        gl.enableVertexAttribArray(vertexPositionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        var vertexPositionLocation = gl.getAttribLocation(shaderProgram, "vertexPosition_vector");
        gl.vertexAttribPointer(vertexPositionLocation, 3, gl.FLOAT, false, 0, 0);

        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    updatePosition(gl) {
        var shaderProgram = this.compiledShader;
        gl.useProgram(shaderProgram);
        var positionVectorLocation = gl.getUniformLocation(shaderProgram, "position_vector");
        gl.uniform3fv(positionVectorLocation, this.transform.position);
    }

    updateRotation(gl) {
        var shaderProgram = this.compiledShader;
        gl.useProgram(shaderProgram);
        var rotationVectorLocation = gl.getUniformLocation(shaderProgram, "rotation_vector");
        gl.uniform3fv(rotationVectorLocation, this.transform.rotation);
    }

    updateScale(gl) {
        var shaderProgram = this.compiledShader;
        gl.useProgram(shaderProgram);
        var scaleVectorLocation = gl.getUniformLocation(shaderProgram, "scale_vector");
        gl.uniform3fv(scaleVectorLocation, this.transform.scale);
    }

    updateTransform(gl) {
        this.updatePosition(gl);
        this.updateRotation(gl);
        this.updateScale(gl);
    }

    draw(gl) {
        var indicesLength = this.mesh.indices.length;
        gl.drawElements(gl.TRIANGLES, indicesLength, gl.UNSIGNED_SHORT, 0);
    }

}