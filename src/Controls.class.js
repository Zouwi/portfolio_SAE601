import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Q, D, DIRECTIONS, S, Z } from './Character.class.js'
import Camera from './Camera.class.js'


export class Controls {
    constructor(model, mixer, animationsMap, orbitControl, camera, currentAction) {

        this.isCameraActive = false;

        this.model = model;
        this.mixer = mixer;
        this.animationsMap = animationsMap;
        this.currentAction = currentAction;
        this.animationsMap.forEach((value, key) => {
            if (key === currentAction) {
                value.play();
            }
        });
        this.orbitControl = orbitControl;
        this.camera = camera;
        this.cameraObject = this.camera.getCamera(); // Utilisez la méthode pour récupérer la caméra de l'instance de Camera
        this.cameraTarget = new THREE.Vector3();
        this.updateCameraTarget(-100, -100);

        // state
        this.toggleRun = true;

        // temporary data
        this.walkDirection = new THREE.Vector3();
        this.rotateAngle = new THREE.Vector3(0, 1, 0);
        this.rotateQuarternion = new THREE.Quaternion();



        // constants
        this.fadeDuration = 0.1;
        this.runVelocity = 2;
        this.walkVelocity = 2;
    }

    switchRunToggle() {
        this.toggleRun = !this.toggleRun;
    }

    update(delta, keysPressed) {
        const directionPressed = DIRECTIONS.some(key => keysPressed[key] === true);

        let play = '';
        if (directionPressed && this.toggleRun) {
            play = 'Run';
        } else if (directionPressed) {
            play = 'Walk';
        } else {
            play = 'Idle';
        }

        if (this.currentAction !== play) {
            const toPlay = this.animationsMap.get(play);
            const current = this.animationsMap.get(this.currentAction);

            current.fadeOut(this.fadeDuration);
            toPlay.reset().fadeIn(this.fadeDuration).play();

            this.currentAction = play;
        }

        this.mixer.update(delta);

        if (this.currentAction === 'Run' || this.currentAction === 'Walk') {
            // calculate towards camera direction
            let angleYCameraDirection = Math.atan2(
                (this.cameraObject.position.x - this.model.position.x),
                (this.cameraObject.position.z - this.model.position.z));
            // diagonal movement angle offset
            let directionOffset = this.directionOffset(keysPressed);

            // rotate model
            this.rotateQuarternion.setFromAxisAngle(this.rotateAngle, angleYCameraDirection + directionOffset);
            this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.5);

            // calculate direction
            this.cameraObject.getWorldDirection(this.walkDirection);
            this.walkDirection.y = 0;
            this.walkDirection.normalize();
            this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

            // run/walk velocity
            const velocity = this.currentAction === 'Run' ? this.runVelocity : this.walkVelocity;

            // move model & camera
            const moveX = this.walkDirection.x * velocity * delta;
            const moveZ = this.walkDirection.z * velocity * delta;
            this.model.position.x += moveX;
            this.model.position.z += moveZ;
            this.updateCameraTarget(moveX, moveZ);
        }
    }

    updateCameraTarget(moveX, moveZ) {
        console.log(this.walkDirection);
        if (this.cameraObject) {
            // Move camera
            this.cameraObject.position.x += moveX;
            this.cameraObject.position.z += moveZ;
            this.cameraObject.focus = 100;

            // Update camera target
            this.cameraTarget.x = this.model.position.x;
            this.cameraTarget.y = this.model.position.y + 1;
            this.cameraTarget.z = this.model.position.z;
            this.orbitControl.target = this.cameraTarget;
        }
    }

    directionOffset(keysPressed) {
        let directionOffset = 0; // z

        if (keysPressed[Z]) {
            if (keysPressed[Q]) {
                directionOffset = -Math.PI / 4; // z+q
            } else if (keysPressed[D]) {
                directionOffset = Math.PI / 4; // z+d
            }
        } else if (keysPressed[S]) {
            if (keysPressed[Q]) {
                directionOffset = -Math.PI / 4 + Math.PI / 2; // s+q
            } else if (keysPressed[D]) {
                directionOffset = Math.PI / 4 - Math.PI / 2; // s+d
            } else {
                directionOffset = Math.PI; // s
            }
        } else if (keysPressed[Q]) {
            directionOffset = -Math.PI / 2; // q
        } else if (keysPressed[D]) {
            directionOffset = Math.PI / 2; // d
        }

        return directionOffset;
    }
}

export default Controls;