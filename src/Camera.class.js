import * as THREE from 'three'
import Config from './Config.class.js';

class Camera {
    constructor() {
        this.config = new Config();
        /** SIZES **/
        this.sizes = {

            width: window.innerWidth,
            height: window.innerHeight
        }

        window.addEventListener('resize', () => {
            // Update sizes
            this.sizes.width = window.innerWidth
            this.sizes.height = window.innerHeight

            // Update camera
            this.camera.aspect = this.sizes.width / this.sizes.height
            this.camera.updateProjectionMatrix()

            // Update renderer
            this.config.renderer.setSize(this.sizes.width, this.sizes.height)
            this.config.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })
        this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 50, -0);
        this.camera.lookAt(0, 0, 0);
    }

    getCamera() {
        return this.camera;
    }
}

export default Camera;