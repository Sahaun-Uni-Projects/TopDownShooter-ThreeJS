import { Box3, BoxGeometry, MeshStandardMaterial } from "three";
import GameObject from "../core/GameObject";
import AssetManager from "../core/AssetManager";
import Explosion from "./Explosion";

class Crate extends GameObject {
  protected hp = 1;

  public init = () => {
    this.mesh.geometry = new BoxGeometry(1, 1, 1.2);
    this.position.setZ(0.5);

    let texId = Math.floor(Math.random() * 3);
    this.mesh.material = new MeshStandardMaterial({
      map: AssetManager.instance.getTexture(`crate${texId}_diffuse`),
      normalMap: AssetManager.instance.getTexture(`crate${texId}_normal`),
      bumpMap: AssetManager.instance.getTexture(`crate${texId}_bump`),
    });

    this.collider = new Box3().setFromObject(this.mesh.clone());
  };

  public damage = (intensity = 1) => {
    this.hp -= intensity;
    if (this.hp <= 0) {
      this.scene.addObject(new Explosion(
        this.position.x,
        this.position.y,
        this.position.z,
      ));
      this.markDestroy();
      return true;
    }
    return false;
  };
}

export default Crate;