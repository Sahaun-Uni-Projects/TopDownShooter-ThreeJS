import { HemisphereLight, Color, PointLight, Vector3 } from "three";
import GameScene from "../core/GameScene";
import GameContext from "../core/GameContext";
import Player from "../objects/Player";
import MapGenerator from "../objects/MapGenerator";
import Crate from "../objects/Crate";

class SahaunTestScene extends GameScene {
  protected player: Player | undefined;
  protected mapGen: MapGenerator | undefined;
  protected cameraHeightMin = 12;
  protected cameraHeightMax = 18;

  public init = () => {
    this.camera.position.setZ(15);

    this.scene.background = new Color(0x000000);

    let light, crate;

    light = new HemisphereLight(0xffffff, 0x000000, 0.01);
    this.scene.add(light);
    light = new PointLight(0xff0000, 0.5);
    light.position.set(1, 1, 1);
    this.scene.add(light);
    light = new PointLight(0x0fffff, 0.5);
    light.position.set(6, 6, 3);
    this.scene.add(light);

    this.mapGen = new MapGenerator();
    this.addObject(this.mapGen);
    this.mapGen.setMap([
      [4, 4, 4, 4, 4, 4, 4,  4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 0, 0, 0, 0, 0, 0,  5, 0, 0, 0, 0, 0, 0, 0, 4],
      [4, 0, 1, 0, 0, 0, 0,  5, 0, 0, 0, 0, 2, 0, 0, 4],
      [4, 0, 0, 0, 0, 0, 0,  5, 0, 0, 0, 0, 0, 0, 0, 4],
      [4, 0, 0, 0, 0, 0, 0, -3, 0, 0, 0, 0, 0, 0, 0, 4],
      [4, 0, 0, 0, 0, 0, 0, -3, 0, 0, 0, 0, 0, 0, 0, 4],
      [4, 0, 0, 0, 0, 0, 0,  5, 0, 0, 0, 0, 0, 0, 0, 4],
      [4, 0, 0, 0, 0, 0, 0,  5, 0, 0, 0, 0, 0, 0, 0, 4],
      [4, 0, 0, 0, 0, 0, 5,  5, 0, 0, 0, 0, 0, 0, 0, 4],
      [4, 0, 0, 0, 0, 0, 0,  3, 0, 0, 0, 0, 0, 0, 0, 4],
      [4, 0, 0, 0, 0, 0, 0,  2, 0, 0, 0, 0, 0, 0, 0, 4],
      [4, 0, 0, 0, 0, 0, 0,  1, 0, 0, 0, 0, 0, 0, 0, 4],
      [4, 0, 0, 0, 0, 0, 0,  2, 0, 0, 0, 0, 0, 0, 0, 4],
      [4, 0, 0, 0, 0, 0, 0,  3, 0, 0, 0, 0, 0, 0, 0, 4],
      [4, 0, 0, 0, 0, 0, 0,  4, 0, 0, 0, 0, 4, 0, 0, 4],
      [4, 4, 4, 4, 4, 4, 4,  4, 4, 4, 4, 4, 4, 4, 4, 4],
    ]);

    this.player = new Player(3, 4, 0);
    this.addObject(this.player);

    crate = new Crate(2, 5, 0);
    crate.rotation = new Vector3(0, 0, Math.random());
    this.addObject(crate);

    crate = new Crate(10, 5, 0);
    crate.rotation = new Vector3(0, 0, Math.random());
    this.addObject(crate);

    crate = new Crate(11, 8, 0);
    crate.rotation = new Vector3(0, 0, Math.random());
    this.addObject(crate);

    window.addEventListener("wheel", (e) => {
      if (e.deltaY < 0) {
        this.camera.position.z = Math.max(this.camera.position.z-0.5, this.cameraHeightMin);
      } else {
        this.camera.position.z = Math.min(this.camera.position.z+0.5, this.cameraHeightMax);
      }
    });
  };

  public update = (context: GameContext) => {
    if (this.player) {
      this.camera.position.x = this.player.position.x;
      this.camera.position.y = this.player.position.y;
    }
    for (let object of this.objects) {
      object.update(context);
    }
    this.render();
  };
}

export default SahaunTestScene;