import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';


async function loaderObj(mtlFile, objFile) {
    this.mtlFile = mtlFile
    this.objFile = objFile

    this.mtlLoader = new MTLLoader();
    this.objLoader = new OBJLoader();

    const mtl = await this.mtlLoader.loadAsync(this.mtlFile);
    mtl.preload();

    this.objLoader.setMaterials(mtl);

    const modelRoot = await this.objLoader.loadAsync(this.objFile);

    return modelRoot;
}


export async function loaderFBX(fbxFile) {
    const fbxloader = new FBXLoader();

    const fbxObject = await fbxloader.loadAsync(fbxFile)

    return fbxObject;
}

