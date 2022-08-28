import * as THREE from "three";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("app"),
});

renderer.setSize(WIDTH, HEIGHT);
renderer.setPixelRatio(window.devicePixelRatio);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.y = 10;

const vertex = new THREE.Vector3();
const color = new THREE.Color();

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
light.position.set(0.5, 1, 0.75);
scene.add(light);

// floor

let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
floorGeometry.rotateX(- Math.PI / 2);

// vertex displacement

let position = floorGeometry.attributes.position;

for (let i = 0, l = position.count; i < l; i++) {

  vertex.fromBufferAttribute(position, i);

  vertex.x += Math.random() * 20 - 10;
  vertex.y += Math.random() * 2;
  vertex.z += Math.random() * 20 - 10;

  position.setXYZ(i, vertex.x, vertex.y, vertex.z);

}

floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

position = floorGeometry.attributes.position;
const colorsFloor = [];

for (let i = 0, l = position.count; i < l; i++) {

  color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
  colorsFloor.push(color.r, color.g, color.b);

}

floorGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsFloor, 3));

const floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floor);



function tick() {
  // scene.update();
  renderer.render(scene, camera)

  requestAnimationFrame(tick);
}

tick();