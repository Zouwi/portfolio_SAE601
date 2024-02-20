import * as THREE from "three";
import Config from "./Config.class.js";

let pathPoints = [
    new THREE.Vector3(-5, 0, 0),
    new THREE.Vector3(5, 0, 0)
];

let path = new THREE.CatmullRomCurve3(pathPoints);

let clock = new THREE.Clock();
let time = 0;
let speed = 1; // Vitesse de déplacement de la caméra
let camPos = new THREE.Vector3();
let camTarget = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);

const animateCamera = () => {
    path.getPointAt(time % 1, camPos);
    path.getPointAt((time + 0.01) % 1, camTarget);
    this.camera.position.copy(camPos);
    this.camera.lookAt(camTarget);
    console.log('Camera position:', this.camera.position); // Log the camera position
    requestAnimationFrame(animateCamera);
}

const onMouseWheel = (event) => {
    let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    time += delta * 0.01; // Adjust the time variable based on the mouse wheel delta
    time = time < 0 ? 1 + time : time; // Ensure time is within the range [0, 1]
    console.log('Time:', time); // Log the time variable

}

animateCamera();
document.addEventListener('mousewheel', onMouseWheel, false);
document.addEventListener('DOMMouseScroll', onMouseWheel, false);

/*class Camera {
    constructor(player) {
        this.config = new Config();
        this.player = player; // Référence au joueur

        // Créer une caméra qui suit le joueur
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.cameraOffset = new THREE.Vector3(0, 10, -20); // Ajustez l'offset de la caméra selon votre scène

        /** SIZES **/
        /*this.sizes = {
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
    }*/

    // Méthode pour mettre à jour la position de la caméra pour suivre le joueur
    /*update() {
        if (this.player.model) {
            this.camera.position.copy(this.player.model.position).add(this.cameraOffset);
            this.camera.lookAt(this.player.model.position);
        }
    }*/
//}
