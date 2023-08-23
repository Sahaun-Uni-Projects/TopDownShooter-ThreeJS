import { Clock } from "three";
import GameScene from "./GameScene";
import GameContext from "./GameContext";
import * as Stats from "stats.js";

class Game {
  private _scene!: GameScene;
  public set scene(newScene: GameScene) {
    this._scene = newScene;
    this._scene.init();
  }
  
  public clock = new Clock();
  public fps = 60;
  public clockDelta = 0;
  public frameUpdateInterval = 1/this.fps;
  public context = new GameContext(this);
  public stats = new Stats();

  constructor(newScene: GameScene) {
    this.scene = newScene;
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);
  }

  public update = () => {
    requestAnimationFrame(this.update);
    this.clockDelta += this.clock.getDelta();
    this.context.clockDelta = this.clockDelta % this.frameUpdateInterval;

    this.stats.begin();

    if (this.clockDelta >= this.frameUpdateInterval) {
      if (this._scene) {
        this._scene.update(this.context);
      }
      this.clockDelta %= this.frameUpdateInterval;
    }
    if (this._scene) {
      this._scene.updateTick(this.context);
    }

    this.stats.end();
  };
}

export default Game;