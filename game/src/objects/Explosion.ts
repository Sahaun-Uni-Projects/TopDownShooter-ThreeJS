import { DodecahedronGeometry, MeshPhongMaterial, Vector3 } from "three";
import GameObject from "../core/GameObject";

class ExplosionParticle extends GameObject {
  protected speed = 0;
  protected angle = 0;

  public init = () => {
    this.shadowsEnable(false, false);

    this.speed = 0.05 + Math.random() * 0.1;
    this.angle = Math.random() * Math.PI * 2;

    this.mesh.geometry = new DodecahedronGeometry(1, 0);
    this.mesh.material = new MeshPhongMaterial({
      color: 0xff4500
    });

    this.scale.set(0.1, 0.1, 0.1);
  };

  public update = () => {
    let off = new Vector3(Math.cos(this.angle), Math.sin(this.angle), 0);
    off.multiplyScalar(this.speed);
    this.position.add(off);

    this.scale.addScalar(Math.random() * 0.05);

    this.stateTimer += 1;
    if (this.stateTimer >= 10) {
      this.markDestroy();
    }
  };
}

class Explosion extends GameObject {
  public init = () => {
    this.shadowsEnable(false, false);

    let particles = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < particles; ++i) {
      this.scene.addObject(new ExplosionParticle(
        this.position.x,
        this.position.y,
        this.position.z,
      ));
    }
    this.markDestroy();
  }
}

export default Explosion;