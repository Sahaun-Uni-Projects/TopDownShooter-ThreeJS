import { AnimationMixer, Box3, Group, Material, Mesh, Sphere, Vector3 } from "three";
import GameScene from "./GameScene";
import GameContext from "./GameContext";

const enum GameObjectFlag {
  NONE = 0,
  DESTROY = 1 << 0,
}

abstract class GameObject {
  protected mixer: AnimationMixer | undefined;
  protected model: Group | undefined;
  protected stateModels = new Map<string,Group>();
  protected state = "";
  protected stateTimer = 0;
  
  protected speed = 0;
  protected direction = 0;
  public flags = GameObjectFlag.NONE;

  protected _scene!: GameScene;
  public get scene() { return this._scene; }
  public set scene(newScene: GameScene) { this._scene = newScene; }

  protected _mesh = new Mesh();
  public get mesh() { return this._mesh; }
  public set mesh(newMesh: Mesh) { this._mesh = newMesh; }

  protected _collider : Box3 | Sphere | undefined;
  public get collider() { return this._collider; }
  public set collider(newCollider: Box3 | Sphere | undefined) { this._collider = newCollider; }

  public get position() { return this.mesh.position; }
  public set position(vec: Vector3) {
    this.mesh.position.set(
      vec.x,
      vec.y,
      vec.z
    );
  }

  public get scale() { return this.mesh.scale; }
  public set scale(vec: Vector3) {
    this.mesh.scale.set(vec.x, vec.y, vec.z);
  }

  public get rotation() {
    return new Vector3(
      this.mesh.rotation.x,
      this.mesh.rotation.y,
      this.mesh.rotation.z,
    );
  }
  public set rotation(vec: Vector3) {
    this.mesh.rotation.set(vec.x, vec.y, vec.z);
  }

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.mesh.position.set(x, y, z);
    this.shadowsEnable();
  }

  public init = () => {};
  public updateTick = (context: GameContext) => {}; // Every animation frame
  public update = (context: GameContext) => {};
  
  public cleanup = () => {
    (this.mesh.material as Material).dispose();
    this.mesh.geometry.dispose();
  };
  public markDestroy = () => {
    this.flags |= GameObjectFlag.DESTROY;
  };
  public shouldDestroy = () => {
    let res = this.flags & GameObjectFlag.DESTROY;
    return (res > 0);
  };

  public setState = (state: string) => {};

  public checkCollision = (other: GameObject) => {
    return false;
  };

  public shadowsEnable = (cast = true, receive = true) => {
    this.mesh.castShadow = cast;
    this.mesh.receiveShadow = receive;
  };

  public moveAndCollide = (offset: Vector3) => {
    let collided = false;
    if (this.collider) {
      let prevCollider = this.collider.clone();
      this.collider.translate(offset);
      if (this.scene.checkCollisionWith(this)) {
        collided = true;
      }
      this.collider = prevCollider;
    }
    let prevPos = this.position.clone();
    if (!collided) {
      this.position.add(offset);
      this.collider?.translate(offset);
    }
    this.direction = prevPos.angleTo(this.position);
    return collided;
  };

  public damage = (intensity = 1) => { return false; }
}

export default GameObject;