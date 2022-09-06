import CastleScene from "./threejs/castleScene";
import CubeScene from "./threejs/cubeScene";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const scene1 = new CastleScene(WIDTH, HEIGHT);
const scene2 = new CubeScene(WIDTH, HEIGHT);


let mainScene = scene1;

function update() {
  requestAnimationFrame(() => update());
  mainScene.update()
}

update();


function changeScene(value){
  if(value === "castle"){
    mainScene = scene1;

  }
  if(value === "Cube"){
    mainScene = scene2;
  }
}

document.querySelector('#createAccountId').addEventListener('click', changeScene);
