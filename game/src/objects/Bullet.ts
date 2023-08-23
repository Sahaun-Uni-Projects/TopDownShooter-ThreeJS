import { Box3, MeshStandardMaterial, Sphere, SphereGeometry, Vector3 } from "three";
import GameObject from "../core/GameObject";

class Bullet extends GameObject{
  protected hp = 1;
  
  public init = () => {
    this.speed = 0.5;

    this.mesh.geometry = new SphereGeometry(0.05);
    this.mesh.material = new MeshStandardMaterial({ color: 0x000000 });

    this.collider = new Box3()
      .setFromObject(this.mesh)
      .getBoundingSphere(new Sphere(this.mesh.position.clone()));
  };

  public update = () => {
    let rot = this.rotation.z;
    let off = new Vector3(Math.cos(rot), Math.sin(rot), 0)
    off.multiplyScalar(this.speed);
    if (this.moveAndCollide(off)) {
      this.damage(1);
    }
  };

  public checkCollision = (other: GameObject) => {
    if (this.position.distanceTo(other.position) > 2) {
      return false;
    }
    switch (other.constructor.name) {
      case "Wall":
        if (other.collider) {
          return other.collider.intersectsSphere(this.collider as Sphere);
        }
      break;
      case "Crate":
        if (other.collider) {
          if (other.collider.intersectsSphere(this.collider as Sphere)) {
            other.damage(1);
            return true;
          }
          return false;
        }
      break;
    }
    return false;
  };

  public damage = (intensity = 1) => {
    this.hp -= intensity;
    if (this.hp <= 0) {
      this.markDestroy();
      return true;
    }
    return false;
  };
}

export default Bullet;