import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

class Light {
    constructor() {
        // Debug
        const gui = new GUI();
        /** LIGHTS **/
// Ambient light
        const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
        gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
//scene.add(ambientLight)

// Directional light
        const moonLight = new THREE.DirectionalLight('#ffffff', 1.5)
        moonLight.position.set(4, 5, -2)
        moonLight.castShadow = true;
        moonLight.shadow.mapSize.width = 1024;
        moonLight.shadow.mapSize.height = 1024;
        gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
        gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
        gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
        gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
//scene.add(moonLight)
    }
}

export default Light;