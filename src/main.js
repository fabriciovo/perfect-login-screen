import CastleScene from "./threejs/castleScene";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const scene = new CastleScene(WIDTH, HEIGHT);

function update() {
  requestAnimationFrame(() => update());
  scene.update()
}

update();