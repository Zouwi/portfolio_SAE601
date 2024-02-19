import * as THREE from 'three'
import Config from './Config.class.js';

class Camera {
    constructor(player) {
        this.config = new Config();
        this.player = player; // Référence au joueur

        // Créer une caméra qui suit le joueur
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.cameraOffset = new THREE.Vector3(0, 10, -20); // Ajustez l'offset de la caméra selon votre scène

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
    }



    // Méthode pour mettre à jour la position de la caméra pour suivre le joueur
    update() {
        if (this.player.model) {
            this.camera.position.copy(this.player.model.position).add(this.cameraOffset);
            this.camera.lookAt(this.player.model.position);
        }
    }
}

export default Camera;