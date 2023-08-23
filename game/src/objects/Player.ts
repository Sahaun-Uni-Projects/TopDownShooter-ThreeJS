import { AnimationMixer, Box3, PointLight, Sphere, Vector3 } from "three";
import GameObject from "../core/GameObject";
import AssetManager from "../core/AssetManager";
import GameContext from "../core/GameContext";
import Input from "../core/Input";
import Bullet from "./Bullet";

class Player extends GameObject {
  protected speed = 0.04;
  protected gunOffset = new Vector3(0.7, -0.25, 0);
  protected canShoot = false;
  protected shootDelay = 60;
  protected shootDelayRemaining = 0;
  protected bulletCreated = false;
  protected bulletHeight = 1.1;
  protected light = new PointLight(0xffffff, 0.25);
  protected lightOffset = new Vector3(1, 0, 0);
  protected lightHeight = 1.5;

  public setState = (newState: string) => {
    if (newState === "shoot") {
      if (!this.canShoot) return;
      this.bulletCreated = false;
    }
    if (newState === "idle") {
      if (Math.random() < 0.5) newState = "idle_chill";
    }
    if (this.state === newState) return;

    this.stateTimer = 0;
    this.state = newState;

    let stateModel = this.stateModels.get(this.state);
    if (!stateModel) {
      throw `State ${this.state} is not defined`;
    }

    if (this.model) this.mesh.remove(this.model);
    this.model = stateModel;
    this.mesh.add(this.model);

    this.mixer = new AnimationMixer(this.model);
    this.mixer.clipAction(this.model.animations[0]).play();
  };

  public init = () => {
    // States
    this.stateModels.set("idle", AssetManager.instance.getModel("player_pistol_idle"));
    this.stateModels.set("idle_chill", AssetManager.instance.getModel("player_pistol_idle_chill"));
    this.stateModels.set("shoot", AssetManager.instance.getModel("player_pistol_shoot"));
    this.stateModels.set("walk", AssetManager.instance.getModel("player_pistol_walk"));
    this.stateModels.set("walk_back", AssetManager.instance.getModel("player_pistol_walk_back"));
    this.stateModels.set("walk_strafe", AssetManager.instance.getModel("player_pistol_walk_strafe"));

    this.stateModels.forEach((model) => {
      model.scale.divideScalar(75);
      model.rotation.set(Math.PI/2, Math.PI/2, 0);
    });
    
    this.setState("idle");

    // Collider
    this.collider = new Box3()
      .setFromObject(this.mesh)
      .getBoundingSphere(new Sphere(this.mesh.position.clone()));
    this.collider.radius *= 4;

    window.addEventListener("mousemove", (e) => {
      if (document.pointerLockElement === document.body) {
        let dz = - e.movementX/3000;
        this.rotation = new Vector3(
          this.rotation.x,
          this.rotation.y,
          this.rotation.z + dz,
        );
      }
    });

    // Light
    this.scene.addObjectRaw(this.light);
  };

  public checkCollision = (other: GameObject) => {
    if (this.position.distanceTo(other.position) > 2) {
      return false;
    }
    switch (other.constructor.name) {
      case "Wall":
      case "Crate":
        if (other.collider) {
          return other.collider.intersectsSphere(this.collider as Sphere);
        }
      break;
    }
    return false;
  };

  public update = (context: GameContext) => {
    let rot, off, dirs, bullet;
    this.stateTimer += 1;
    
    this.canShoot = true;
    if (this.shootDelayRemaining > 0) {
      this.canShoot = false;
      this.shootDelayRemaining -= 1;
    }

    switch (this.state) {
      case "idle":
      case "idle_chill":
        if (Input.up) {
          this.setState("walk");
          break;
        }
        if (Input.down) {
          this.setState("walk_back");
          break;
        }
        if (Input.right || Input.left) {
          this.setState("walk_strafe");
          break;
        }
        if (Input.action) {
          this.setState("shoot");
          break;
        }
        if (this.stateTimer >= context.fps * 5) {
          this.setState("idle");
          break;
        }
      break;

      case "walk":
        if (!Input.up) {
          this.setState("idle");
          break;
        }
        dirs = [Input.up, Input.left, Input.down, Input.right];
        rot = this.rotation.z;
        off = new Vector3(0, 0, 0);
        for (let dir of dirs) {
          if (dir) off.add(new Vector3(Math.cos(rot), Math.sin(rot), 0));
          rot += Math.PI/2;
        }
        off.normalize();
        off.multiplyScalar(this.speed);
        this.moveAndCollide(off);
      break;

      case "walk_strafe":
        if (Input.up) {
          this.setState("walk");
          break;
        }
        if (Input.down) {
          this.setState("walk_back");
          break;
        }
        if (!Input.left && !Input.right) {
          this.setState("idle");
          break;
        }
        dirs = [Input.left, Input.right];
        rot = this.rotation.z + Math.PI/2;
        off = new Vector3(0, 0, 0);
        for (let dir of dirs) {
          if (dir) off.add(new Vector3(Math.cos(rot), Math.sin(rot), 0));
          rot += Math.PI;
        }
        off.normalize();
        off.multiplyScalar(this.speed);
        this.moveAndCollide(off);
      break;

      case "walk_back":
        if (!Input.down) {
          this.setState("idle");
          break;
        }
        dirs = [Input.up, Input.left, Input.down, Input.right];
        rot = this.rotation.z;
        off = new Vector3(0, 0, 0);
        for (let dir of dirs) {
          if (dir) off.add(new Vector3(Math.cos(rot), Math.sin(rot), 0));
          rot += Math.PI/2;
        }
        off.normalize();
        off.multiplyScalar(this.speed);
        this.moveAndCollide(off);
      break;

      case "shoot":
        if (!this.bulletCreated && (this.stateTimer >= context.fps * 0.33)) {
          off = this.gunOffset.clone();
          rot = this.rotation.z;
          bullet = new Bullet(
            this.position.x + off.x * Math.cos(rot) + off.y * Math.cos(rot + Math.PI/2),
            this.position.y + off.x * Math.sin(rot) + off.y * Math.sin(rot + Math.PI/2),
            this.position.z + this.bulletHeight
          );
          bullet.rotation = this.rotation;
          this.scene.addObject(bullet);

          this.bulletCreated = true;
          this.shootDelayRemaining = this.shootDelay;
        }
      
        if (this.stateTimer >= context.fps * 1.25) {
          if (Input.action) this.setState("shoot");
            else this.setState("idle");
          break;
        }
      break;

      default: break;
    }
  };

  public updateTick = (context: GameContext) => {
    let off = this.lightOffset.clone();
    let rot = this.rotation.z;
    this.light.position.set(
      this.position.x + off.x * Math.cos(rot) + off.y * Math.cos(rot + Math.PI/2),
      this.position.y + off.x * Math.sin(rot) + off.y * Math.sin(rot + Math.PI/2),
      this.position.z + this.lightHeight
    );
    this.light.rotation.set(
      this.rotation.x,
      Math.PI/2,
      this.rotation.z
    );

    if (this.mixer) {
      this.mixer.update(context.clockDelta);
    }
  };
}

export default Player;