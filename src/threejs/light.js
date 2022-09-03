import * as THREE from "three";
export default class Light {
    constructor(){
        this.hemiLight = undefined;
        this.dirLight = undefined;


    }

    createHemisphereLight(){
        this.hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        this.hemiLight.position.set( 0, 200, 0 );

        return this.hemiLight
    }


    createDirectionalLight(){
        this.dirLight = new THREE.DirectionalLight( 0xffffff );
        this.dirLight.position.set( 0, 200, 100 );
        this.dirLight.castShadow = true;
        this.dirLight.shadow.camera.top = 180;
        this.dirLight.shadow.camera.bottom = - 100;
        this.dirLight.shadow.camera.left = - 120;
        this.dirLight.shadow.camera.right = 120;


        return this.dirLight;
    }


}