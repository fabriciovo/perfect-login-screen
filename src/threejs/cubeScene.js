import * as THREE from "three";
import { Camera } from "three";
import ParticleSystem, {
    BoxZone,
    Color,
    CrossZone,
    CustomRenderer,
    Debug,
    Emitter,
    Gravity,
    Life,
    Mass,
    RadialVelocity,
    Radius,
    Rate,
    Rotate,
    Scale,
    Span,
    Vector3D,
    ease,
} from 'three-nebula';

export default class CubeScene extends THREE.Scene {

    constructor() {
        super()

        this.system = new ParticleSystem();
        this.renderer = new CustomRenderer();
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial()
        );
        this.zone = this.createZone();
        this.emitter = this.createEmitter(this.zone);

        this.renderer.onParticleCreated = function (p) {
            p.target = this.targetPool.get(this.mesh);

            p.target.position.copy(p.position);
            this.add(p.target);
        };

        this.renderer.onParticleUpdate = function (p) {
            const scale = p.scale * 30;

            p.target.position.copy(p.position);
            p.target.rotation.set(p.rotation.x, p.rotation.y, p.rotation.z);
            p.target.scale.set(scale, scale, scale);
        };

        this.renderer.onParticleDead = function (p) {
            this.targetPool.expire(p.target);
            this.remove(p.target);

            p.target = null;
        };

        this.system.addEmitter(this.emitter).addRenderer(this.renderer);

        //createDebugger({ THREE, system, this, zone });
        this.camera = new Camera({ x: 0, y: 0, z: 500 }).perspectiveCamera;


    }
    createZone() {
        const zone = new BoxZone(600);

        zone.friction = 0.95;
        zone.max = 7;

        return zone;
    };

    createEmitter() {
        const emitter = new Emitter();

        emitter
            .setRate(new Rate(new Span(4, 8), new Span(0.2, 0.5)))
            .addInitializers([
                new Mass(1),
                new Radius(100),
                new Life(2, 4),
                new RadialVelocity(400, new Vector3D(0, 1, 0), 60),
            ])
            .addBehaviours([
                new Rotate('random', 'random'),
                new Scale(1, 0.1),
                new Gravity(6),
                new CrossZone(this.zone, 'bound'),
                new Color(0xff0000, 'random', Infinity, ease.easeOutQuart),
            ])
            .setPosition({ x: 0, y: 0 })
            .emit();

        return emitter;
    };
    update(){
        Debug.drawZone(THREE, this.system, this, this.zone);

    }
};