import AssetManager from "./core/AssetManager";
import Game from "./core/Game";
import SahaunTestScene from "./scenes/SahaunTestScene";
import NabilaTestScene from "./scenes/NabilaTestScene";
import "./style.css";

function startGame() {
  console.log("Game started");
  const scene = new NabilaTestScene();
  const game = new Game(scene);
  game.update();
}

await AssetManager.instance.load();
startGame();