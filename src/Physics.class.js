/*
import * as THREE from 'three';
import Config from './Config.class.js';
import Camera from './Camera.class.js';
import Ammo from './ammo.js';

    class Physics {
        constructor() {
            this.config = new Config();
            this.camera = new Camera();
            this.renderer = new Config();
            this.tmpTransformation = undefined;
            this.physicsUniverse = undefined;
            this.clock = new THREE.Clock();

            this.rigidBody_List = [];

            // ------ Ammo.js Init ------
            Ammo().then( this.AmmoStart );
        }

        AmmoStart()
        {
            this.tmpTransformation = new Ammo.btTransform();
            this.initPhysicsUniverse();
            //initGraphicsUniverse();
            // base
            this.createCube(40 , new THREE.Vector3(10, -30, 10) , 0 );
            // falling cubes
            this.createCube(4 , new THREE.Vector3(0, 10, 0) , 1, null );
            this.createCube(2 , new THREE.Vector3(10, 30, 0) , 1, null );
            this.createCube(4 , new THREE.Vector3(10, 20, 10) , 1, null );
            this.createCube(6 , new THREE.Vector3(5, 40, 20) , 1, null );
            this.createCube(8 , new THREE.Vector3(25, 100, 5) , 1, null );
            this.createCube(8 , new THREE.Vector3(20, 60, 25) , 1, null );
            this.createCube(4 , new THREE.Vector3(20, 100, 25) , 1, null );
            this.createCube(2 , new THREE.Vector3(20, 200, 25) , 1, null );
            this.render();
        }

        initPhysicsUniverse()
        {
            let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
            let dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
            let overlappingPairCache = new Ammo.btDbvtBroadphase();
            let solver = new Ammo.btSequentialImpulseConstraintSolver();
            this.physicsUniverse = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
            this.physicsUniverse.setGravity(new Ammo.btVector3(0, -75, 0));
        }

        createCube(scale, position, mass, rot_quaternion)
        {
            let quaternion = undefined;
            if(rot_quaternion == null)
            {
                quaternion = {x: 0, y: 0, z: 0, w:  1};
            }
            else
            {
                quaternion = rot_quaternion;
            }
            // ------ Graphics Universe - Three.JS ------
            let cube = new THREE.BoxGeometry(scale, scale, scale);
            let material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
            let newCube = new THREE.Mesh(cube, material);
            newCube.position.set(position.x, position.y, position.z);
            this.config.scene.add(newCube);

            // ------ Physics Universe - Ammo.js ------
            let transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin( new Ammo.btVector3( position.x, position.y, position.z ) );
            transform.setRotation( new Ammo.btQuaternion( quaternion.x, quaternion.y, quaternion.z, quaternion.w ) );
            let defaultMotionState = new Ammo.btDefaultMotionState( transform );
            let structColShape = new Ammo.btBoxShape( new Ammo.btVector3( scale*0.5, scale*0.5, scale*0.5 ) );
            structColShape.setMargin( 0.05 );
            let localInertia = new Ammo.btVector3( 0, 0, 0 );
            structColShape.calculateLocalInertia( mass, localInertia );
            let RBody_Info = new Ammo.btRigidBodyConstructionInfo( mass, defaultMotionState, structColShape, localInertia );
            let RBody = new Ammo.btRigidBody( RBody_Info );

            this.physicsUniverse.addRigidBody( RBody );
            newCube.userData.physicsBody = RBody;
            this.rigidBody_List.push(newCube);
        }

        updatePhysicsUniverse(deltaTime) {
            this.physicsUniverse.stepSimulation(deltaTime, 10);

            for (let i = 0; i < this.rigidBody_List.length; i++) {
                let Graphics_Obj = this.rigidBody_List[i];
                let Physics_Obj = Graphics_Obj.userData.physicsBody;

                let motionState = Physics_Obj.getMotionState();
                if (motionState) {
                    motionState.getWorldTransform(this.tmpTransformation);
                    let new_pos = this.tmpTransformation.getOrigin();
                    let new_qua = this.tmpTransformation.getRotation();
                    Graphics_Obj.position.set(new_pos.x(), new_pos.y(), new_pos.z());
                    Graphics_Obj.quaternion.set(new_qua.x(), new_qua.y(), new_qua.z(), new_qua.w());
                }
            }
        }

        render()
        {
            let deltaTime = this.clock.getDelta();
            this.updatePhysicsUniverse( deltaTime );

            this.renderer.renderer.render( this.config.scene, this.camera.camera );
            requestAnimationFrame( this.render );
        }
    }
export default Physics;*/
