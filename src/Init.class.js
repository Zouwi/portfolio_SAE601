import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import Config from './Config.class.js';
import Camera from './Camera.class.js';
import Player from './Player.class.js';
import KeyDisplay from './Character.class.js';
import Controls from './Controls.class.js';
import { CameraHelper } from 'three';

class Init {
    constructor() {
        const config = new Config();
        const camera = new Camera();
        let player; // Déclarez une variable player
        let characterControls;
        // Créer une instance de Player
        player = new Player();

        let scene3D;
        /** ENVIRONMENT **/
        config.JSONloader.load('./scene/sceneFINAL.json', function (gltf) {
            console.log(gltf);
                scene3D = gltf;
                scene3D.scale.set(1, 1, 1);
                scene3D.position.y = 0;
                scene3D.position.x = 0;
                scene3D.position.z = 0;
                config.scene.add(scene3D);

                config.renderer.render(config.scene, camera.camera);
            },
            undefined, function (error) {
                console.error(error);
            });

        /**BACKGROUND **/
        config.loader.load('./scene/skybox_autumn_forest.glb', function (gltf) {
            const model = gltf.scene;
            model.scale.set(0.3, 0.3, 0.3);
            model.position.y = 0;
            model.position.x = 0;
            model.position.z = 0;
            model.traverse(function (object) {
                if (object.isMesh) object.castShadow = true;
                if (object.isMesh) object.receiveShadow = true;
            });
            config.scene.add(model);
        });

        /** RENDERER**/
        config.renderer.shadowMap.enabled = true;
        config.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        config.renderer.setSize(camera.sizes.width, camera.sizes.height)
        config.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // CONTROLS
        // Create OrbitControls
        // Créer une instance de Camera en passant la référence du joueur
        const orbitControls = new OrbitControls(camera.camera, config.renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.minDistance = 5;
        orbitControls.maxDistance = 15;
        orbitControls.enablePan = false;
        orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
        orbitControls.update();

        // MODEL WITH ANIMATIONS
        // Load 3D model and create player and controls
        config.loader.load('./models/mareep_animated.glb', function (gltf) {
            const model = gltf.scene;
            model.scale.set(0.5, 0.5, 0.5);
            model.position.y = 0.1;
            model.position.x = -18;
            model.position.z = -17;
            model.traverse(function (object) {
                if (object.isMesh) object.castShadow = true;
                if (object.isMesh) object.receiveShadow = true;
            });
            config.scene.add(model);

            const gltfAnimations = gltf.animations;
            const mixer = new THREE.AnimationMixer(model);
            const animationsMap = new Map();
            gltfAnimations.filter(a => a.name !== 'Static Pose').forEach((a) => {
                animationsMap.set(a.name, mixer.clipAction(a))
            });

            // Create Controls instance once the model is loaded
            characterControls = new Controls(model, mixer, animationsMap, orbitControls, camera, 'Idle');
        });

        // CONTROL KEYS
        const keysPressed = {};
        const keyDisplayQueue = new KeyDisplay();
        document.addEventListener('keydown', (event) => {
            keyDisplayQueue.down(event.key);
            if (event.shiftKey && characterControls) {
                characterControls.switchRunToggle();
            } else {
                keysPressed[event.key.toLowerCase()] = true;
            }
        }, false);
        document.addEventListener('keyup', (event) => {
            keyDisplayQueue.up(event.key);
            keysPressed[event.key.toLowerCase()] = false;
        }, false);

        /*// Gérer les événements du clavier pour le déplacement du joueur
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    player.moveForward();
                    break;
                case 'ArrowDown':
                    player.moveBackward();
                    break;
                case 'ArrowLeft':
                    player.moveLeft();
                    break;
                case 'ArrowRight':
                    player.moveRight();
                    break;
                case ' ':
                    player.jump();
                    break;
            }
        });

        // Gérer les événements du clavier pour arrêter le déplacement du joueur
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                    player.stopMovingVertical();
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    player.stopMovingHorizontal();
                    break;
            }
        });*/

        /**
         * Animate
         */
        const clockElapse = new THREE.Clock();
        const clockDelta = new THREE.Clock();

        const tick = () => {
            // Render
            config.renderer.render(config.scene, camera.camera);

            const elapsedTime = clockElapse.getElapsedTime()

            let mixerUpdateDelta = clockDelta.getDelta();

            if (characterControls) {
                characterControls.update(mixerUpdateDelta, keysPressed);
            }
            orbitControls.update()


            // Update camera
            //camera.update();

            // Update player
            //player.update();



            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
    }
}

export default Init;

