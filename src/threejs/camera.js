import * as THREE from "three";

export default class Camera {
    constructor(position){
        this.perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
        this.perspectiveCamera.position.y = position.y//10;
        this.perspectiveCamera.position.z = position.z//100;
    }


    
}