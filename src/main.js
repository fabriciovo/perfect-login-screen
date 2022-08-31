import * as THREE from "three";
import Nebula, { SpriteRenderer } from "three-nebula";
import json from "./my-particle-system.json";
import { loaderFBX } from "./utils/loader";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("app"),
});

renderer.setSize(WIDTH, HEIGHT);
renderer.setPixelRatio(window.devicePixelRatio);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.y = 10;
camera.position.z = 100;

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x1B2631  );


const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 200, 0 );
scene.add( hemiLight );

const dirLight = new THREE.DirectionalLight( 0xffffff );
dirLight.position.set( 0, 200, 100 );
dirLight.castShadow = true;
dirLight.shadow.camera.top = 180;
dirLight.shadow.camera.bottom = - 100;
dirLight.shadow.camera.left = - 120;
dirLight.shadow.camera.right = 120;
scene.add( dirLight );

const fbx = await loaderFBX('assets/dungeon.fbx')
fbx.position.z = 260;
fbx.position.y = -130;
fbx.position.x = 1395;
scene.add(fbx)


Nebula.fromJSONAsync(json, THREE).then(loaded => {
  const nebulaRenderer = new SpriteRenderer(scene, THREE);
  const nebula = loaded.addRenderer(nebulaRenderer);
  animate(nebula);
});


function animate(nebula) {
  requestAnimationFrame(() => animate(nebula));

  nebula.update();
  renderer.render(scene, camera);
}


window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
