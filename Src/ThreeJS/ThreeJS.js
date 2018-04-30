/**
 * @description (Class to create a 3D canvas).
 * Canvas 3D is a javascript 3D implementing 
 * and rendering with Three JS quickly and efficiently.
 * @type {function} class
 * @author Tristan Muller ©StudioGazoline
 */
class ThreeJS {

    /**
     * @description Initialise the 3D canvas.
     * As you can see above, the constructor requires two properties. 
     * This is the height and width of the 3D rendering.
     * @param {number} width The width of the 3D canvas.
     * @param {number} height The height of the 3D canvas.
    */
    constructor(width = 800, height = 600) {
        this.getRenderer;
        this.width = width;
        this.height = height;
        console.log('Info:  ThreeJS instantiated');
    }

    /**
     * @description Set an environement map to the background.
     * The background of the scene can be a sky made up of 6 textures, 
     * to add a sky it is necessary to use this function  
     * which takes in parameter the path of the file in which are the 6 
     * textures to be loaded as well as the extension of the file format. 
     * Each texture should have the following names depending on their 
     * location: "px, py, pz, nx, ny, nz".
     * @param {string} path Specify the folder where the textures are.
     * @param {string} format Specify the extension of the file format.
     */
    setBackground(path = "", format = "") {
        var urls = [
            path + 'px.' + format, path + 'nx.' + format,
            path + 'py.' + format, path + 'ny.' + format,
            path + 'pz.' + format, path + 'nz.' + format
        ];
        var reflectionCube = new THREE.CubeTextureLoader().load(urls);
        reflectionCube.format = THREE.RGBFormat;
        this.getScene().background = reflectionCube;
        console.log("Info:  Background added");
    }

    /**
     * @description Add procedural skybox
     */
    addSky() {
        if (!this.sky) {
            this.sky = new THREE.Sky();
            this.sky.scale.setScalar(450000);
            this.getScene().add(this.sky);
            console.log("Info:  Sky added");
        }
    }

    /**
     * @description Add a grid size 10/10 in 3D space.
     * Two-dimensional grids can be added to 3D 
     * space to crisscross an area.
     * @param {number} size The size of the grid.
     * @returns {Object} Return the gridHelper object
     */
    addGrid(size = 10) {
        var gridHelper = new THREE.GridHelper(size, size, 0x303030, 0x303030);
        this.getScene().add(gridHelper);
        console.log("Info:  Grid added");
        return gridHelper;
    }

    /**
     * @description It is possible to create a group of several grids to crisscross an entire area.
     * @param {number} amount The quantity of grids added to the 3 dimensions.
     */
    addGlobalGrid(amount = 10) {
        for (var i = 0; i < amount; i++) {
            var grid = new THREE.GridHelper(amount, amount, 0x303030, 0x303030);
            grid.position.y = i - amount * 0.5;
            this.getScene().add(grid);
        }
        for (var i = 0; i < amount; i++) {
            var grid = new THREE.GridHelper(amount, amount, 0x303030, 0x303030);
            grid.position.z = i - amount * 0.5;
            grid.rotation.x = 1.57;
            this.getScene().add(grid);
        }
        for (var i = 0; i < amount; i++) {
            var grid = new THREE.GridHelper(amount, amount, 0x303030, 0x303030);
            grid.position.x = i - amount * 0.5;
            grid.rotation.z = 1.57;
            this.getScene().add(grid);
        }
        console.log("Info:  Global grid added");
    }

    /**
     * @description Add a new group (acts as an empty object)
     * Groups are objects that can contain other objects and influence their 
     * position. It is therefore possible to create object hierarchies.
     * @returns {Object} Return the group object
     */
    addGroup() {
        var group = new THREE.Group();
        this.getScene().add(group);
        console.log("Info:  Group added");
        return group;
    }

    /**
     * @description Add new cube mesh. Adding a cube is done with thi
     * function, which takes as parameter the size of each of the 
     * three axes: x, y and z. And a boolean to activate the shadows.
     * @param {number} x The X-axis coordinates for the object's position property.
     * @param {number} y The Y-axis coordinates for the object's position property.
     * @param {number} z The Z-axis coordinates for the object's position property.
     * @param {boolean} shadows boolean to activate shadows.
     * @returns {Object} Return the cube object
     */
    addCube(x = 1, y = 1, z = 1, shadows = true) {
        var geometry = new THREE.BoxGeometry(x, y, z, x, y, z);
        var material = this.standardMaterial(0x555555, 0.5, 0.5);
        var cube = new THREE.Mesh(geometry, material);
        cube.castShadow = shadows;
        cube.receiveShadow = shadows;
        this.getScene().add(cube);
        console.log("Info:  Cube added");
        return cube;
    }

    /**
     * @description Add new sphere mesh. The addition of sphere is done with this function 
     * which takes into parameter the radius, the number of segments 
     * and a boolean to activate the shadows.
     * @param {number} radius The radius of the sphere
     * @param {number} segments The number of segments of the model topology
     * @param {boolean} shadows boolean to activate shadows.
     * @returns {Object} Return the sphere object
     */
    addSphere(radius = 1, segments = 10, shadows = true) {
        var geometry = new THREE.SphereGeometry(radius, segments, segments);
        var material = this.standardMaterial(0x555555, 0.5, 0.5);
        var sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = shadows;
        sphere.receiveShadow = shadows;
        this.getScene().add(sphere);
        console.log("Info:  Sphere added");
        return sphere;
    }

    /**
     * @description Add new plane mesh. The addition of plans is done with this function 
     * which takes in parameter the width, the height 
     * and a boolean allowing to activate the shadows.
     * @param {number} witdh The width of the model
     * @param {number} height The height of the model
     * @param {boolean} shadows boolean to activate shadows.
     * @returns {Object} Return the plane object
     */
    addPlane(witdh = 10, height = 10, shadows = true) {
        var geometry = new THREE.PlaneBufferGeometry(witdh, height);
        var material = this.standardMaterial(0x555555, 0.5, 0.5);
        var plane = new THREE.Mesh(geometry, material);
        plane.castShadow = shadows;
        plane.receiveShadow = shadows;
        this.getScene().add(plane);
        console.log("Info:  Plane added");
        return plane;
    }

    /**
     * @description Add new plane mirror mesh. It is possible to add objects 
     * that reflect the scene and surrounding objects.
     * The addition of mirror circles is done with this function 
     * which takes as parameter the radius and the number of segments.
     * @param {number} witdh 
     * @param {number} height
     * @returns {Object} Return the plane object
     */
    addPlaneMirror(witdh = 10, height = 10) {
        var geometry = new THREE.PlaneBufferGeometry(witdh, height);
        var mirror = new THREE.Reflector(geometry, {
            clipBias: 0.003,
            textureWidth: this.width,
            textureHeight: this.height,
            recursion: 1
        });
        this.getScene().add(mirror);
        console.log("Info:  Plane mirror added");
        return mirror;
    }

    /**
     * @description Add new cicle mirror mesh. 
     * It is possible to add objects that reflect the scene and surrounding objects.
     * @param {number} radius 
     * @param {number} segments 
     * @returns {Object} Return the circle object
     */
    addCircleMirror(radius = 1, segments = 10) {
        var geometry = new THREE.CircleGeometry(radius, segments);
        var mirror = new THREE.Reflector(geometry, {
            clipBias: 0.003,
            textureWidth: this.width,
            textureHeight: this.height,
            recursion: 1
        });
        this.getScene().add(mirror);
        console.log("Info:  Circle mirror added");
        return mirror;
    }

    /**
     * @description Add a new ambient light. 
     * Ambient lights are used to define the overall 
     * brightness of the scene, ie to influence the darkness of shadows and non-illuminated areas.
     * @param {Object} color Specifies the color of the light
     * @returns {Object} Return the light object
     */
    addAmbientLight(color = 0xFFFFFF) {
        var light = new THREE.AmbientLight(color);
        this.getScene().add(light);
        console.log("Info:  Ambient light added");
        return light;
    }

    /**
     * @description Add a new hemisphere light. 
     * Hemisphere lights are similar to mood lights, 
     * but they only act on some shaders and use a gradient.
     * @param {Object} skyColor Specifies the color of the sky
     * @param {Object} groundColor Specifies the color of the ground
     * @returns {Object} Return the light object
     */
    addHemiLight(skyColor = 0x444444, groundColor = 0x666666) {
        var light = new THREE.HemisphereLight(skyColor, groundColor);
        this.getScene().add(light);
        console.log("Info:  Hemisphere light added");
        return light;
    }

    /**
     * @description Add a new directionnal light. 
     * Directional lights act like sunlight, illuminating 
     * all objects in the scene according to their orientation.
     * @param {Object} color Specifies the color of the light
     * @returns {Object} Return the light object
     */
    addDirectionnalLight(color = 0xFFFFFF) {
        var light = new THREE.DirectionalLight(color);
        light.castShadow = true;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500;
        light.position.set(0, 1, 0);
        this.getScene().add(light);
        console.log("Info:  Directionnal light added");
        return light;
    }

    /**
     * @description Add a new point light. 
     * The points of light illuminate objects in a nearby radius.
     * @param {Object} color Specifies the color of the light
     * @param {number} radius Specifies the color of the light
     * @param {boolean} castShadow Specifies the color of the light
     * @returns {Object} Return the light object
     */
    addPointLight(color = 0xFFFFFF, radius = 1, castShadow = true) {
        var light = new THREE.PointLight(color, 1, radius);
        light.castShadow = castShadow;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500;
        light.position.set(0, 1, 0);
        this.getScene().add(light);
        console.log("Info:  Point light added");
        return light;
    }

    /**
     * @description Add SAO post processing effect. 
     * The effects of "post processing" images or effects are added to the 
     * camera to enhance the visual rendering directly from the captured image.
     * This effect makes it possible to add shadows in the corners of the models to fill the lack of realism of surface shaders.
     */
    addSao() {
        if (!this.saoPass) {
            this.saoPass = new THREE.SAOPass(this.getScene(), this.getCamera(), false, true);
            this.saoPass.renderToScreen = true;
            this.getComposer().addPass(this.saoPass);
            console.log("Info:  SAO added");
        }
    }

    /**
     * @description Add bloom post processing effect. 
     * The effects of "post processing" images or effects are added to the 
     * camera to enhance the visual rendering directly from the captured image.
     * This effect blurs the very light colors to create a blur effect.
     */
    addBloom() {
        if (!this.bloomPass) {
            this.bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(this.width, this.width), 0.2, 1, 0.8);
            this.bloomPass.renderToScreen = true;
            this.getComposer().addPass(this.bloomPass);
            console.log("Info:  Bloom added");
        }
    }

    /**
     * @description Add film post processing effect. 
     * The effects of "post processing" images or effects are added to the 
     * camera to enhance the visual rendering directly from the captured image.
     */
    addFilm() {
        if (!this.bloomPass) {
            this.filmPass = new THREE.FilmPass(0.35, 0.025, 648, true);
            this.filmPass.renderToScreen = true;
            this.getComposer().addPass(this.filmPass);
            console.log("Info:  Film added");
        }
    }

    /**
     * @description Import FBX 3D mesh. It is possible to add templates in FBX format. 
     * For this use the function "importMesh" which takes in parameter the path to the 
     * file and the function "callback" called when loading the model. This function 
     * needs to be processed on the server side to work.
     * @param {string} path 
     */
    importMesh(path = "", load_callback) {
        var scene = this.getScene();
        var loader = new THREE.FBXLoader();
        loader.load(path, load_callback, null, function (error) {
            console.log(error);
        }
        );
    }

    /**
     * @description import texture image. To import textures, use this function 
     * which takes as parameter the path to the file.
     * @param {string} path 
     */
    importTexture(path = "") {
        var texture = new THREE.TextureLoader().load(path);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        console.log("Info:  Texture imported");
        return texture;
    }

    /**
     * @description Create a PBR material. To create a realistic material, 
     * use this function which takes as parameter 
     * the main color, the roughness and the metalness.
     * @param {number} roughness 
     * @param {number} metalness 
     */
    standardMaterial(mainColor = 0xFFFFFF, roughness = 1, metalness = 0) {
        var background = this.getScene().background;
        var material = new THREE.MeshStandardMaterial();
        material.color.set(mainColor);
        material.roughness = roughness;
        material.metalness = metalness;
        material.envMap = background;
        return material;
    }

    /**
     * @description (Coming soon ...)
     */
    customMaterial() {
        var vertexShader = "";
        var fragmentShader = "";
        var material = new THREE.RawShaderMaterial({
            uniforms: {
                resolution: { value: new THREE.Vector2(this.width, this.height) },
                cameraWorldMatrix: { value: this.getCamera().matrixWorld },
                cameraProjectionMatrixInverse: { value: new THREE.Matrix4().getInverse(this.getCamera().projectionMatrix) }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
        return material;
    }

    /**
     * @description render the scene. Once the scene is set and the objects added, 
     * you have to render. For that, use this function.
     */
    render() {
        if (this.getComposer().passes.length > 1) {
            this.getComposer().render();
        }
        else {
            this.getRenderer().render(this.getScene(), this.getCamera());
        }
    }

    /**
     * @description Call that function to render at each frame and do something in 
     * a callback function after just after rendering at each frames again.
     * @param {function} callback The function which was called after the rendering.
     */
    onRendering(callback = function() {}) {
        var self = this;
        var update = function () {
            window.requestAnimationFrame(update);
            self.render();
            callback();
        }
        update();
    }

    /**
     * @description Get renderer singleton
     * @returns {Object}
     */
    getRenderer() {
        if (!this.renderer) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.gammaInput = true;
            this.renderer.gammaOutput = true;
            this.renderer.toneMapping = THREE.CineonToneMapping;
            this.renderer.toneMappingExposure = 1;
            this.renderer.autoClear = true;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.renderer.setSize(this.width, this.height);
            console.log("Info:  Renderer initialized");
        }
        return this.renderer;
    }

    getCanvas() {
        var renderer = this.getRenderer();
        return renderer.domElement;
    }

    /**
     * @public
     * @description Get scene singleton
     * @returns {Object}
     */
    getScene() {
        if (!this.scene) {
            this.scene = new THREE.Scene();
            console.log("Info:  Scene initialized");
        }
        return this.scene;
    }

    /**
     * @public
     * @description Get camera singleton
     * @returns {Object}
     */
    getCamera() {
        if (!this.camera) {
            this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.1, 1000);
            this.camera.position.set(0, 0, 10);
            console.log("Info:  Camera added");
        }
        return this.camera;
    }

    /**
     * @public
     * @description Get composer singleton
     * @returns {Object}
     */
    getComposer() {
        if (!this.composer) {
            this.composer = new THREE.EffectComposer(this.getRenderer());
            var renderPass = new THREE.RenderPass(this.getScene(), this.getCamera());
            this.composer.addPass(renderPass);
            this.addSao();
            this.addBloom();
            //console.log(this.composer);
            console.log("Info:  Composer added");
        }
        return this.composer;
    }

}