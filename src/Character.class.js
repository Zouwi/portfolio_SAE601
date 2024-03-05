import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import { Q, D, DIRECTIONS, S, Z } from './Controls.class.js'
import Config from './Config.class.js'
import Camera from './Camera.class.js'

export class Character {
    constructor(model, mixer, animationsMap, orbitControl, camera, currentAction) {
        //this.physicsUniverse = new physicsUniverse;
        //this.createPhysicalBody();

        this.config = new Config();
        const three = this.config.THREE();
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
        this.runVelocity = 1;
        this.walkVelocity = 1;
    }

    switchRunToggle() {
        this.toggleRun = !this.toggleRun;
    }

    update(delta, keysPressed) {
        const directionPressed = DIRECTIONS.some(key => keysPressed[key] === true);

        let play = '';
        if (directionPressed && this.toggleRun) {
            play = 'WalkClean';
        } else if (directionPressed) {
            play = 'WalkClean';
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

        if (this.currentAction === 'WalkClean' || this.currentAction === 'WalkClean') {
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

    /*createPhysicalBody() {
        // Créez le corps physique pour votre personnage, en utilisant Ammo.js
        // Assurez-vous de définir la forme du corps physique, la masse, et la position initiale
        // Par exemple :
        const mass = 1; // Masse du personnage
        const scale = 1; // Echelle du personnage
        const position = { x: 0, y: 0, z: 0 }; // Position initiale du personnage

        // Création du corps physique Ammo.js
        const transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));
        const motionState = new Ammo.btDefaultMotionState(transform);
        const colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale / 2, scale / 2, scale / 2));
        const localInertia = new Ammo.btVector3(0, 0, 0);
        colShape.calculateLocalInertia(mass, localInertia);
        const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
        this.physicsBody = new Ammo.btRigidBody(rbInfo);

        // Ajout du corps physique à l'univers physique
        this.physicsUniverse.addRigidBody(this.physicsBody);
    }

    updatePhysics() {
        // Mettez à jour la position du corps physique en fonction de la position du personnage dans la scène 3D
        const position = this.model.position;
        const transform = this.physicsBody.getMotionState().getWorldTransform();
        transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));
    }*/
}

export default Character;