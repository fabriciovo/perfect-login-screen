import * as THREE from "three";
import Nebula, { SpriteRenderer } from "three-nebula";
import BaseRenderer from "three-nebula";

import { loaderFBX } from "../utils/loader";
import fire from "../nebula/fire.json";
import portal from "../nebula/portal.json";

import Camera from "./camera";
import Light from "./light";

export default class CastleScene extends THREE.Scene {
    constructor(WIDTH, HEIGHT) {
        super()
        this.width = WIDTH;
        this.height = HEIGHT;
        this.camera = undefined;
        this.light = undefined;
        this.particles = [];
        this.renderer = undefined;

        this.init();

    }

    init() {
        this.createCamera();
        this.createLight();
        this.createParticles();
        this.createObjects();
        this.createRender();
        window.addEventListener('resize', this.onWindowResize, false);
        this.background = new THREE.Color(0x1B2631);

    }


    createCamera() {
        this.camera = new Camera({ x: 0, y: 10, z: 100 }).perspectiveCamera;
    }

    createLight() {
        this.light = new Light();
        const hemiLight = this.light.createHemisphereLight();
        const dirLight = this.light.createDirectionalLight();
        this.add(hemiLight);
        this.add(dirLight);

    }


    createParticles() {
        Nebula.fromJSONAsync(fire, THREE).then(loaded => {
            loaded.emitters.forEach(emitter => {
                emitter.position.y = 26;
                emitter.position.x = -69;
                emitter.rotation.x = -120
            })
            const nebulaRenderer = new SpriteRenderer(this, THREE);
            const nebula = loaded.addRenderer(nebulaRenderer);
            this.particles.push(nebula);
        });


        Nebula.fromJSONAsync(fire, THREE).then(loaded => {
            loaded.emitters.forEach(emitter => {
                emitter.position.y = 26;
                emitter.position.x = 56;
                emitter.rotation.x = -120
            })
            const nebulaRenderer = new SpriteRenderer(this, THREE);
            const nebula = loaded.addRenderer(nebulaRenderer);
            this.particles.push(nebula);
        });

        Nebula.fromJSONAsync(portal, THREE).then(loaded => {
            loaded.emitters.forEach(emitter => {
                emitter.position.x = -5
                emitter.position.y = 12

            })
            const nebulaRenderer = new SpriteRenderer(this, THREE)
            const nebula = loaded.addRenderer(nebulaRenderer);
            this.particles.push(nebula);
        });
    }


    async createObjects() {
        const fbx = await loaderFBX('assets/dungeon.fbx')
        fbx.position.z = 260;
        fbx.position.y = -130;
        fbx.position.x = 1395;

        this.add(fbx)
    }

    createRender() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("app"),
        });

        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    update() {
        this.renderer.render(this, this.camera);

        this.particles.forEach(particle => particle.update())

    }

    onWindowResize() {

        this.camera.cam.aspect = window.innerWidth / window.innerHeight;
        this.camera.cam.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

    }
}