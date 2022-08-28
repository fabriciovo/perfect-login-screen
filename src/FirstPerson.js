import * as THREE from 'three';

import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import Input from './utils/input';

export default class FirstPerson extends THREE.Object3D {
    constructor(camera, scene, renderer, controls) {
        super();
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;

        this.raycaster;

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = false;

        this.prevTime = performance.now();
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();

        this.controls = controls;

        document.getElementById('app').addEventListener('click', function () {

            controls.lock();

        });



        this.input = new Input();
        this.init();
    }

    init() {

        this.scene.add(this.controls.getObject());
        //
        console.log("init");
    }


    update() {

        const time = performance.now();

        if (this.controls.isLocked) {
            
            const delta = (time - this.prevTime) / 1000;

            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;

            this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            this.direction.z = Number(this.input.inputPressed('w')) - Number(this.input.inputPressed('s'));
            this.direction.x = Number(this.input.inputPressed('d')) - Number(this.input.inputPressed('a'));
            this.direction.normalize(); // this ensures consistent movements in all directions

            if (this.input.inputPressed('w') || this.input.inputPressed('s')) {
                debugger
                this.velocity.z -= this.direction.z * 400.0 * delta
            };
            if (this.input.inputPressed('a') || this.input.inputPressed('d')) {
                debugger
                this.velocity.x -= this.direction.x * 400.0 * delta
            };

            this.controls.moveRight(- this.velocity.x * delta);
            this.controls.moveForward(- this.velocity.z * delta);

            this.controls.getObject().position.y += (this.velocity.y * delta); // new behavior

            if (this.controls.getObject().position.y < 10) {
                this.velocity.y = 0;
                this.controls.getObject().position.y = 10;

                this.canJump = true;

            }

        }
        this.prevTime = time;

        //this.renderer.render( scene, camera );
    }

}