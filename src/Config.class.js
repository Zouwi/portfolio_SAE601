import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import { Project, Scene3D, PhysicsLoader } from 'enable3d'
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";
import { TTFLoader } from 'three/addons/loaders/TTFLoader.js'

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
        this.font = new FontLoader();
        this.ttf = new TTFLoader();
        /** RENDERER **/
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
    }

    /** CAMERA **/
     THREE() {
        return THREE;
    }
}

export default Config;