import { Group, Texture, TextureLoader } from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

class AssetManager {
  private models = new Map<string,Group>();
  private textures = new Map<string,Texture>();

  private static _instance = new AssetManager();
  public static get instance() { return this._instance; }

  public load = async() => {
    await this.loadModels();
    await this.loadTextures();
  }

  private loadModels = async() => {
    const fbxLoader = new FBXLoader();
    let data = [
      ["player_pistol_idle", "player/pistol/idle.fbx"],
      ["player_pistol_idle_chill", "player/pistol/idle_chill.fbx"],
      ["player_pistol_shoot", "player/pistol/shoot.fbx"],
      ["player_pistol_walk", "player/pistol/walk.fbx"],
      ["player_pistol_walk_back", "player/pistol/walk_back.fbx"],
      ["player_pistol_walk_strafe", "player/pistol/walk_strafe.fbx"],
    ];
    for (let [key, dir] of data) {
      this.models.set(
        key,
        await fbxLoader.loadAsync(`models/${dir}`)
      );
      console.log(`Model loaded: ${key}`);
    }
    console.log(`AssetLoader: Models loaded`);
  };

  private loadTextures = async() => {
    const texLoader = new TextureLoader();
    let data = [
      ["floor_cobblestone", "floor/cobblestone.png"],
      ["wall_brick_diffuse", "wall_brick/diffuse_map.png"],
      ["wall_brick_height", "wall_brick/height_map.png"],
      ["wall_brick_normal", "wall_brick/normal_map.png"],
      ["wall_brick_specularity", "wall_brick/specularity_map.png"],
      ["crate0_bump", "crate0/bump.png"],
      ["crate0_diffuse", "crate0/diffuse.png"],
      ["crate0_normal", "crate0/normal.png"],
      ["crate1_bump", "crate1/bump.png"],
      ["crate1_diffuse", "crate1/diffuse.png"],
      ["crate1_normal", "crate1/normal.png"],
      ["crate2_bump", "crate2/bump.png"],
      ["crate2_diffuse", "crate2/diffuse.png"],
      ["crate2_normal", "crate2/normal.png"],
    ];
    for (let [key, dir] of data) {
      this.textures.set(
        key,
        await texLoader.loadAsync(`textures/${dir}`)
      );
      console.log(`Texture loaded: ${key}`);
    }
    console.log(`AssetLoader: Textures loaded`);
  };

  public getModel = (key: string) => {
    let elem = this.models.get(key);
    if (!elem) {
      throw `Model ${key} not found`;
    }
    return elem;
  };

  public getTexture = (key: string) => {
    let elem = this.textures.get(key);
    if (!elem) {
      throw `Texture ${key} not found`;
    }
    return elem;
  };
}

export default AssetManager;