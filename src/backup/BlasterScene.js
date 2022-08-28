// import * as THREE from 'three'
// import { Vector3 } from 'three';


// import Bullet from './Bullet';
// import Loader from './utils/loader';

// export default class BlasterScene extends THREE.Scene {




//     constructor(camera) {
//         super();
//         this.camera = camera;

//         this.keyDown = new Set();
//         this.bullets = [];
//         this.targets = [];
//         this.directionVector;
//         this.bulletMTL;
//         this.blaster;


//     }

//     async initialize() {



//         const t1 = await new Loader('assets/targetA.mtl', 'assets/targetA.obj', new Vector3(-1, 0, -3), Math.PI * 0.5).model();
//         const t2 = await new Loader('assets/targetA.mtl', 'assets/targetA.obj', new Vector3(1, 0, -3), Math.PI * 0.5).model();
//         const t3 = await new Loader('assets/targetA.mtl', 'assets/targetA.obj', new Vector3(2, 0, -3), Math.PI * 0.5).model();
//         const t4 = await new Loader('assets/targetA.mtl', 'assets/targetA.obj', new Vector3(-2, 0, -3), Math.PI * 0.5).model();
//         this.blaster = await new Loader('assets/blasterG.mtl', 'assets/blasterG.obj', new Vector3(-2, 0, -3)).model();


//         this.add(t1, t2, t3, t4)
//         this.targets.push(t1, t2, t3, t4)

//         this.add(this.blaster);
//         this.blaster.position.z = 3
//         this.blaster.add(this.camera);

//         this.camera.position.z = 1;
//         this.camera.position.y = 0.5;
//         const light = new THREE.DirectionalLight(0xFFFFFF, 1);
//         light.position.set(0, 4, 2);
//         this.add(light);

//         document.addEventListener('keydown', this.handleKeyDown)
//         document.addEventListener('keyup', this.handleKeyUp)
//         // const geometry = new THREE.BoxGeometry();
//         // const material = new THREE.MeshPhongMaterial({ color: 0xFFAD00 })
//         // const cube = new THREE.Mesh(geometry, material);
//         // cube.position.z = -5;
//         // cube.position.y = 1;
//         // this.add(cube);
//         // const light = new THREE.DirectionalLight(0xFFFFFF, 1);
//         // light.position.set(0, 4, 2);
//         // this.add(light);


//     }

//     handleKeyDown = (event) => {
//         this.keyDown.add(event.key.toLowerCase());
//     }

//     handleKeyUp = (event) => {
//         this.keyDown.delete(event.key.toLowerCase());


//         if (event.key === ' ') {
//             //this.createBullet();
//         }
//     }

//     updateInput() {
//         if (!this.blaster) {
//             return
//         }
//         const shiftKey = this.keyDown.has('shift');

//         if (!shiftKey) {
//             if (this.keyDown.has('a') || this.keyDown.has('arrowleft')) {
//                 this.blaster.rotateY(0.02);
//             } else if (this.keyDown.has('d') || this.keyDown.has('arrowright')) {
//                 this.blaster.rotateY(-0.02);
//             }
//         }

//         const dir = this.directionVector;
//         this.camera.getWorldDirection(dir);

//         const speed = 0.1;


//         if (this.keyDown.has('w') || this.keyDown.has('arrowup')) {
//             this.blaster.position.add(dir.clone().multiplyScalar(speed));
//         } else if (this.keyDown.has('s') || this.keyDown.has('arrowdown')) {
//             this.blaster.position.add(dir.clone().multiplyScalar(-speed));
//         }


//         if (shiftKey) {
//             const strafeDir = dir.clone();
//             const upVector = new THREE.Vector3(0, 1, 0);

//             if (this.keyDown.has('a') || this.keyDown.has('arrowleft')) {
//                 this.blaster.position.add(strafeDir.applyAxisAngle(upVector, Math.PI * 0.5).multiplyScalar(speed));
//             } else if (this.keyDown.has('d') || this.keyDown.has('arrowright')) {
//                 this.blaster.position.add(strafeDir.applyAxisAngle(upVector, Math.PI * -0.5).multiplyScalar(speed));
//             }
//         }
//     }

//     // async createBullet() {
//     //     if (!this.blaster) return;
//     //     if (this.bulletMTL) {
//     //         this.objLoader.setMaterials(this.bulletMTL);
//     //     }

//     //     const bulletModel = await this.objLoader.loadAsync("assets/foamBulletB.obj");

//     //     this.camera.getWorldDirection(this.directionVector);

//     //     const aabb = new THREE.Box3().setFromObject(this.blaster);
//     //     const size = aabb.getSize(new THREE.Vector3());

//     //     const vec = this.blaster.position.clone();
//     //     vec.y += 0.06;

//     //     bulletModel.position.add(vec.add(this.directionVector.clone().multiplyScalar(size.z * 0.5)));

//     //     bulletModel.children.forEach(child => child.rotateX(Math.PI * -0.5));

//     //     bulletModel.rotation.copy(this.blaster.rotation);



//     //     this.add(bulletModel);

//     //     const b = new Bullet(bulletModel)
//     //     b.setVelocity(
//     //         this.directionVector.x * 0.2,
//     //         this.directionVector.y * 0.2,
//     //         this.directionVector.z * 0.2
//     //     )

//     //     this.bullets.push(b)
//     // }

//     updateBullets() {
//         for (let i = 0; i < this.bullets.length; ++i) {
//             const b = this.bullets[i]
//             b.update()

//             if (b.shouldRemove) {
//                 this.remove(b.group)
//                 this.bullets.splice(i, 1)
//                 i--
//             }
//             else {
//                 for (let j = 0; j < this.targets.length; ++j) {
//                     const target = this.targets[j]
//                     if (target.position.distanceToSquared(b.group.position) < 0.05) {
//                         this.remove(b.group)
//                         this.bullets.splice(i, 1)
//                         i--

//                         target.visible = false
//                         setTimeout(() => {
//                             target.visible = true
//                         }, 1000)
//                     }
//                 }
//             }
//         }
//     }



//     update() {
//         this.updateInput();
//         this.updateBullets();
//     }
// }