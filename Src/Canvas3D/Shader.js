class Shader {

    constructor() {
        this.vertexCode = "";
        this.vertexCode += "attribute vec4 vertexPosition_vector;";
        this.vertexCode += "uniform vec3 position_vector;";
        this.vertexCode += "uniform vec3 rotation_vector;";
        this.vertexCode += "uniform vec3 scale_vector;";
        this.vertexCode += "uniform mat4 projection_matrix;";
        this.vertexCode += "mat4 getPositionMatrix(void) {";
        this.vertexCode += "return mat4(1,0,0,0,0,1,0,0,0,0,1,0,position_vector.x, position_vector.y, position_vector.z,1);";
        this.vertexCode += "}";
        this.vertexCode += "mat4 getRotationXMatrix(void) {";
        this.vertexCode += "float angle = radians(rotation_vector.x);";
        this.vertexCode += "float c = cos(angle);";
        this.vertexCode += "float s = sin(angle);";
        this.vertexCode += "return mat4(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1);";
        this.vertexCode += "}";
        this.vertexCode += "mat4 getRotationYMatrix(void) {";
        this.vertexCode += "float angle = radians(rotation_vector.y);";
        this.vertexCode += "float c = cos(angle);";
        this.vertexCode += "float s = sin(angle);";
        this.vertexCode += "return mat4(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);";
        this.vertexCode += "}";
        this.vertexCode += "mat4 getRotationZMatrix(void) {";
        this.vertexCode += "float angle = radians(rotation_vector.z);";
        this.vertexCode += "float c = cos(angle);";
        this.vertexCode += "float s = sin(angle);";
        this.vertexCode += "return mat4(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);";
        this.vertexCode += "}";
        this.vertexCode += "mat4 getScaleMatrix(void) {";
        this.vertexCode += "return mat4(scale_vector.x,0,0,0,0,scale_vector.y,0,0,0,0,scale_vector.z,0,0,0,0,1);";
        this.vertexCode += "}";
        this.vertexCode += "mat4 getRotationMatrix(void) {";
        this.vertexCode += "return getRotationXMatrix() * getRotationYMatrix() * getRotationZMatrix();";
        this.vertexCode += "}";
        this.vertexCode += "void main(void) {";
        this.vertexCode += "gl_Position = projection_matrix * getPositionMatrix() * getRotationMatrix() * getScaleMatrix() * vertexPosition_vector;";
        this.vertexCode += "}";

        this.fragmentCode = "";
        this.fragmentCode += "precision mediump float;";
        this.fragmentCode += "uniform vec4 main_color;";
        this.fragmentCode += "void main(void) {";
        this.fragmentCode += "gl_FragColor = main_color;";
        this.fragmentCode += "}";
    }

    compile(gl) {
        var shaderProgram = gl.createProgram();
        
        if (this.vertexCode) {
            var vertShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertShader, this.vertexCode);
            gl.compileShader(vertShader);
            gl.attachShader(shaderProgram, vertShader);
        }

        if (this.fragmentCode) {
            var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragShader, this.fragmentCode);
            gl.compileShader(fragShader);
            gl.attachShader(shaderProgram, fragShader);
        }

        gl.linkProgram(shaderProgram);
        return shaderProgram;
    }

}