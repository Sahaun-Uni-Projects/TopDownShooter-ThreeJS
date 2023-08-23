import { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import GameObject from "./GameObject";
import GameContext from "./GameContext";

abstract class GameScene {
  public width: number = 1;
  public height: number = 1;
  public readonly scene: Scene;
  protected renderer: WebGLRenderer;
  protected objects: GameObject[] = [];
  protected objectsCollidable: GameObject[] = [];
  public camera: PerspectiveCamera;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.scene = new Scene();

    // Renderer
    this.renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;

    const targetElement = document.querySelector("#app");
    if (!targetElement) {
      throw "Unable to find target element";
    }
    targetElement.appendChild(this.renderer.domElement);
    
    // Camera
    const aspect = this.width/this.height;
    this.camera = new PerspectiveCamera(45, aspect, 0.1, 2000);
    this.camera.position.set(0, 0, 3);
    // this.camera.rotation.set(0, 0, 0);

    // Window
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.renderer.setSize(this.width, this.height);

      this.camera.aspect = this.width/this.height;
      this.camera.updateProjectionMatrix();
    });
    window.addEventListener("mousedown", () => {
      document.body.requestPointerLock();
    });
  }

  public init = () => {};
  public updateTick = (context: GameContext) => {
    for (let object of this.objects) {
      object.updateTick(context);
    }
    this.render();
  }; // Every animation frame

  public update = (context: GameContext) => {
    for (let object of this.objects) {
      object.update(context);
    }
    this.render();
  };

  public render = () => {
    this.pruneObjects();
    this.renderer.render(this.scene, this.camera);
  };

  public pruneObjects = () => {
    const disposables = this.objects.filter((e) => e.shouldDestroy());
    disposables.forEach((e) => {
      e.cleanup();
      this.scene.remove(e.mesh);
    });

    this.objects = [...this.objects.filter((e) => !e.shouldDestroy())];
    this.objectsCollidable = [...this.objectsCollidable.filter((e) => !e.shouldDestroy())];
  };

  public addObject = (object: GameObject) => {
    object.scene = this;
    object.init();
    this.objects.push(object);
    if (object.collider) {
      this.objectsCollidable.push(object);
    }
    this.scene.add(object.mesh);
  };

  public addObjectRaw = (object: Object3D) => {
    this.scene.add(object);
  };

  public checkCollisionWith = (inst: GameObject) => {
    if (!inst.collider) return false;
    
    const colliders = this.objectsCollidable.filter((e) => {
      return (
        (e !== inst) &&
        (inst.checkCollision(e))
      )
    });

    return (colliders.length !== 0);
  };
}

export default GameScene;