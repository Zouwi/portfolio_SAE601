import * as THREE from 'three'
import Config from './Config.class.js';

class Camera {
    constructor() {
        this.config = new Config();
        /** CAMERA **/
        this.camera = new THREE.PerspectiveCamera(57, window.innerWidth / window.innerHeight, 1, 3500);
        this.camera.position.set(-30, 3, -30); // Position initiale de la caméra
        this.camera.rotation.y = 10;
        /** SIZES **/
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        // Add raycaster and mouse vector
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

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

        // Initialize targetPosition
        this.targetPosition = new THREE.Vector3();
        this.moveX = (distance) => {
            this.camera.position.x += distance;
        };

        this.moveZ = (distance) => {
            this.camera.position.z += distance;
        };
    }
    // Add a method to move the camera towards the target position
    update() {
        if (!this.targetPosition.equals(this.camera.position)) {
            // Set the camera's position to the target position
            this.camera.position.copy(this.targetPosition);
        }
    }
}

export default Camera;