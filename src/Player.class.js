import * as THREE from 'three';
import Config from './Config.class.js';

class Player {
    constructor() {
        this.model = null;
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.isJumping = false;
        this.jumpVelocity = 8; // Vitesse de saut
        this.gravity = 0.25; // Gravité
        this.speed = 0.6; // Vitesse de déplacement

        this.config = new Config();
        this.loadModel();
    }

    loadModel() {
        return new Promise((resolve, reject) => {
            // Chargez le modèle 3D du joueur (GLB, OBJ, etc.)
            // Assurez-vous d'ajuster la position et la taille du modèle selon votre scène
            // Par exemple :
            this.config.loader.load('./models/fox_walk.glb', (gltf) => {
                const model = gltf.scene;
                model.scale.set(0.08, 0.08, 0.08);
                model.position.y = 2;
                model.position.x = 10;
                model.position.z = 0;
                // Placez le modèle dans votre scène
                this.model = model;
                resolve();
            });
        });
    }

    async update() {
        // Attendre le chargement initial du modèle avant de continuer
        await this.loadModel();

        // Déplacer le joueur en fonction de la vélocité et de la gravité
        if (this.model) {
            // Appliquer la gravité si le joueur est en l'air
            if (this.isJumping) {
                this.velocity.y -= this.gravity;
            }

            // Mettre à jour la position du joueur en fonction de la vélocité
            this.model.position.add(this.velocity);
        }
    }

    // Méthode pour déplacer le joueur vers la gauche
    moveLeft() {
        this.velocity.x = -this.speed;
    }

    // Méthode pour déplacer le joueur vers la droite
    moveRight() {
        this.velocity.x = this.speed;
    }

    // Méthode pour arrêter le mouvement horizontal du joueur
    stopMovingHorizontal() {
        this.velocity.x = 0;
    }

    // Méthode pour déplacer le joueur vers l'avant
    moveForward() {
        this.velocity.z = -this.speed;
    }

    // Méthode pour déplacer le joueur vers l'arrière
    moveBackward() {
        this.velocity.z = this.speed;
    }

    // Méthode pour arrêter le mouvement vertical du joueur
    stopMovingVertical() {
        this.velocity.z = 0;
    }

    jump() {
        if (!this.isJumping) {
            this.velocity.y = this.jumpVelocity;
            this.isJumping = true;
        }
    }
}

export default Player;