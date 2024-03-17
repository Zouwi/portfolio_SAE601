import * as THREE from 'three'
import Config from './Config.class.js'
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";

class Text {
    constructor() {
        config.font.load('./fonts/helvetiker_regular.typeface.json', (font) => {
            const geometry = new TextGeometry('Hello threejs', {
                font: font,
                size: 4,
                height: 4,
                curveSegments: 1,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 1,
                bevelOffset: 0,
                bevelSegments: 5
            });

            const textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

            const mesh = new THREE.Mesh( geometry, textMaterial );
            mesh.position.x = -11.3;
            mesh.position.y = 0;
            mesh.position.z = -7.3;
            mesh.rotation.y = 180;
            mesh.scale.set(0.1, 0.1, 0.1);

            mesh.castShadow = true;
            mesh.receiveShadow = true;
            console.log(mesh);
            config.scene.add( mesh );
        });
    }
}

export default Text;