import { HemisphereLight, Color, PointLight, Vector3 } from "three";
import GameScene from "../core/GameScene";
import GameContext from "../core/GameContext";
import Player from "../objects/Player";
import MapGenerator from "../objects/MapGenerator";
import Crate from "../objects/Crate";

class NabilaTestScene extends GameScene {
  protected player: Player | undefined;
  protected mapGen: MapGenerator | undefined;
  public init = () => {
    this.scene.background = new Color(0x000000);

    let light, crate;
    
    light = new HemisphereLight(0xffffff, 0x000001, 0.05);
    this.scene.add(light);

    light = new PointLight(0xff0000, 0.5);
    light.position.set(1, 1, 1);
    this.scene.add(light);

    light = new PointLight(0x0fffff, 0.5);
    light.position.set(9, 9, 3);
    this.scene.add(light);

    light = new PointLight(0x0fffff, 0.5);
    light.position.set(18, 20, 3);
    this.scene.add(light);

    light = new PointLight(0x00ff00, 0.5);
    light.position.set(30, 20, 3);
    this.scene.add(light);

    light = new PointLight(0xff0000, 0.5);
    light.position.set(30, 1, 3);
    this.scene.add(light);
    
    this.mapGen = new MapGenerator();
    this.addObject(this.mapGen);
    this.mapGen.setMap([
        [4, 4, 4, 4, 4, 4, 4, 4, 4,  4,  4,  4,  4, 4,  4, 4, 4,  4,  4,  4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [4, 0, 4, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  4, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 4, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0, -2, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0, -2, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0, -2, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  4, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  5, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  5, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, -3, -3, -3, -3, 5,  5, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  5, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  5, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  4, 4, 3, -2, -2, -2, 4, 4, 5, 5, 5, 4, 4, 4, 3, 3, 4, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  4, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  3, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  2, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  1, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  2, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  3, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  4, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4],
        [4, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0, 0,  4, 0, 0,  0,  0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4,  4,  4,  4,  4, 4,  4, 4, 4,  4,  4,  4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    ]);

    this.player = new Player(3, 4, 0);
    this.addObject(this.player);

    crate = new Crate(2, 5, 0);
    crate.rotation = new Vector3(0, 0, Math.random());
    this.addObject(crate);
  
    crate = new Crate(10, 5, 0);
    crate.rotation = new Vector3(0, 0, Math.random());
    this.addObject(crate);

    crate = new Crate(4, 2, 0);
    crate.rotation = new Vector3(0, 0, Math.random());
    this.addObject(crate);
    
    crate = new Crate(20, 5, 0);
    crate.rotation = new Vector3(0, 0, Math.random());
    this.addObject(crate);

    crate = new Crate(20, 3, 0);
    crate.rotation = new Vector3(0, 0, Math.random());
    this.addObject(crate);

    crate = new Crate(26, 2, 0);
    crate.rotation = new Vector3(0, 0, Math.random());
    this.addObject(crate);

    crate = new Crate(11, 8, 0);
    crate.rotation = new Vector3(0, 0, Math.random());
    this.addObject(crate);
    
    this.addObject(crate);
   
  };

  public update = (context: GameContext) => {
    
    if (this.player) {
      this.camera.position.x = this.player.position.x;
      this.camera.position.y = this.player.position.y;
      this.camera.position.z = 16;  
    }
    for (let object of this.objects) {
      object.update(context);
    }
    this.render();
  };
}

export default NabilaTestScene;