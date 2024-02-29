import * as THREE from 'three';
import Config from './Config.class.js';
import Camera from './Camera.class.js';
import Ammo from "ammo.js";

class Physics {
    constructor() {
        this.config = new Config();
        this.camera = new Camera();

        let collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration();
        let dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration);
        let overlappingPairCache    = new Ammo.btDbvtBroadphase();
        let solver                  = new Ammo.btSequentialImpulseConstraintSolver();
        this.physicsUniverse = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
        this.physicsUniverse.setGravity(new Ammo.btVector3(0, -75, 0));

        this.tmpTransformation = new Ammo.btTransform();

        this.rigidBody_List = [];

        //console.log(this.rigidBody_List);
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
        let material = new THREE.MeshPhongMaterial({color: 0xffffff});
        let newCube = new THREE.Mesh(cube, material);
        newCube.position.set(position.x, position.y, position.z);
        newCube.scale.set(scale, scale, scale);
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

        //Ajout a l'univers physique
        this.physicsUniverse.addRigidBody( RBody );

        newCube.userData.physicsBody = RBody;

        //Ajout a la liste des objets rigides
        this.rigidBody_List.push(newCube);
    }

    updatePhysicsUniverse( deltaTime )
    {
        this.physicsUniverse.stepSimulation( deltaTime, 10 );

        for ( let i = 0; i < this.rigidBody_List.length; i++ )
        {
            let Graphics_Obj = this.rigidBody_List[ i ];
            let Physics_Obj = Graphics_Obj.userData.physicsBody;

            let motionState = Physics_Obj.getMotionState();
            if ( motionState )
            {
                motionState.getWorldTransform( this.tmpTransformation );
                let new_pos = this.tmpTransformation.getOrigin();
                let new_qua = this.tmpTransformation.getRotation();
                Graphics_Obj.position.set( new_pos.x(), new_pos.y(), new_pos.z() );
                Graphics_Obj.quaternion.set( new_qua.x(), new_qua.y(), new_qua.z(), new_qua.w() );
            }
        }
    }
}

export default Physics;