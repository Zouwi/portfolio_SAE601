import Config from './Config.class.js';
import Camera from './Camera.class.js';
import Ammo from './ammo.js';

class Physics {
    constructor() {
        //VARIABLES GLOBALES
        this.tmpTransformation = undefined;
        this.clock = new THREE.Clock();
        // Three.js
        this.camera = new Camera();
        this.config = new Config();

        // ------ Ammo.js Init ------
        Ammo().then( this.AmmoStart );
    }

    AmmoStart(Ammo)
    {
        this.tmpTransformation = new Ammo.btTransform();
        this.physicsUniverse = undefined;
        this.rigidBody_List = new Array();

        initPhysicsUniverse();
        //initGraphicsUniverse();
        // base
        createCube(40 , new THREE.Vector3(0, 0, 0) , 0 );
        // falling cubes
        createCube(4 , new THREE.Vector3(0, 10, 0) , 1, null );
        createCube(2 , new THREE.Vector3(10, 30, 0) , 1, null );
        createCube(4 , new THREE.Vector3(10, 20, 10) , 1, null );
        createCube(6 , new THREE.Vector3(5, 40, 20) , 1, null );
        createCube(8 , new THREE.Vector3(25, 100, 5) , 1, null );
        createCube(8 , new THREE.Vector3(20, 60, 25) , 1, null );
        createCube(4 , new THREE.Vector3(20, 100, 25) , 1, null );
        createCube(2 , new THREE.Vector3(20, 200, 25) , 1, null );
        //render();

        // ------ Physics World setup ------
        function initPhysicsUniverse()
        {
            let collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration();
            let dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration);
            let overlappingPairCache    = new Ammo.btDbvtBroadphase();
            let solver                  = new Ammo.btSequentialImpulseConstraintSolver();
            this.physicsUniverse               = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
            this.physicsUniverse.setGravity(new Ammo.btVector3(0, -75, 0));
        }

        // ------ Three.js setup ------
        /*function initGraphicsUniverse()
        {
            clock = new THREE.Clock();
            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.set( -25, 20, -25 );
            camera.lookAt(new THREE.Vector3(0, 6, 0));

            //renderer
            renderer = new THREE.WebGLRenderer({antialias : true, alpha : true});
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement) ;

            //light
            let ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
            scene.add(ambientLight);
            let directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
            directionalLight.position.set(-1, 0.9, 0.4);
            scene.add(directionalLight);
        }*/



        function createCube(scale, position, mass, rot_quaternion)
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

        function updatePhysicsUniverse( deltaTime )
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

        /*function render()
        {
            let deltaTime = this.clock.getDelta();
            updatePhysicsUniverse( deltaTime );

            this.config.renderer.render( this.config.scene, this.camera.camera );
            requestAnimationFrame( render );
        }*/

    }

}

export default Physics;