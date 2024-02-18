import * as THREE from "three";

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
