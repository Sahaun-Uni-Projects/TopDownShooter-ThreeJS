import { Box3, BoxGeometry, MeshPhongMaterial } from "three";
import GameObject from "../core/GameObject";
import AssetManager from "../core/AssetManager";

class Wall extends GameObject {
  public init = () => {
    this.mesh.geometry = new BoxGeometry(1, 1, 1);
    this.mesh.material = new MeshPhongMaterial({
      map: AssetManager.instance.getTexture("wall_brick_diffuse"),
      normalMap: AssetManager.instance.getTexture("wall_brick_normal"),
      displacementMap: AssetManager.instance.getTexture("wall_brick_height"),
      displacementScale: 0,
      specularMap: AssetManager.instance.getTexture("wall_brick_specularity")
    });

    this.collider = new Box3().setFromObject(this.mesh.clone());
  };
}

export default Wall;