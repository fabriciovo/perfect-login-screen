import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

async function loader(mtlFile, objFile) {
    this.mtlFile = mtlFile
    this.objFile = objFile

    this.mtlLoader = new MTLLoader();
    this.objLoader = new OBJLoader();

    const mtl = await this.mtlLoader.loadAsync(this.mtlFile);
    mtl.preload();

    this.objLoader.setMaterials(mtl);

    const modelRoot = await this.objLoader.loadAsync(this.objFile);

    modelRoot.position.x = this.position.x;
    modelRoot.position.y = this.position.y;
    modelRoot.position.z = this.position.z;

    return modelRoot;
}

