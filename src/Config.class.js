import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
class Config {
    constructor() {
        /** CANVA **/
        this.canvas = document.querySelector('canvas.webgl');
        /** SCENE **/
        this.scene = new THREE.Scene();
        /** LOADERS **/
        this.textureLoader = new THREE.TextureLoader();
        this.loader = new GLTFLoader();
        this.JSONloader = new THREE.ObjectLoader();
        this.animation = new THREE.AnimationMixer();
        /** RENDERER **/
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
    }
}

export default Config;