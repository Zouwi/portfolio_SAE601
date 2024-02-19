import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import Config from './Config.class.js';
import Camera from './Camera.class.js';
import Player from './Player.class.js';

class Init {
    constructor() {
        const config = new Config();

        let player; // Déclarez une variable player

        // Créer une instance de Player
        player = new Player();

        // Créer une instance de Camera en passant la référence du joueur
        const camera = new Camera(player);

        let scene3D;
        /** ENVIRONMENT **/
        config.JSONloader.load('./scene/sceneFINAL.json', function (gltf) {
            console.log(gltf);
                scene3D = gltf;
                scene3D.scale.set(1, 1, 1);
                scene3D.position.y = -2;
                scene3D.position.x = 0;
                scene3D.position.z = 0;
                config.scene.add(scene3D);

                config.renderer.render(config.scene, camera.camera);
            },
            undefined, function (error) {
                console.error(error);
            });

        // Add a large invisible plane behind your scene
        const geometry = new THREE.PlaneGeometry(1000, 1000);
        const material = new THREE.MeshBasicMaterial({visible: true, color: 0x00ff00, side: THREE.DoubleSide});
        const plane = new THREE.Mesh(geometry, material);
        plane.position.z = 10; // Position the plane behind your scene
        //config.scene.add(plane);

/*// Controls
        const controls = new OrbitControls(camera.camera, config.canvas)
        controls.enableDamping = true*/


        config.renderer.shadowMap.enabled = true;
        config.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        config.renderer.setSize(camera.sizes.width, camera.sizes.height)
        config.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Gérer les événements du clavier pour le déplacement du joueur
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
        });

        /**
         * Animate
         */
        const clock = new THREE.Clock()

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()

            /*// Update controls
            controls.update()*/

            // Update camera
            camera.update();

            // Update player
            player.update()

            // Render
            config.renderer.render(config.scene, camera.camera);

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
    }
}

export default Init;

