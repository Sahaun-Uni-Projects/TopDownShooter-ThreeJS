import { MeshStandardMaterial, PlaneGeometry } from "three";
import GameObject from "../core/GameObject";
import AssetManager from "../core/AssetManager";
import Wall from "./Wall";

class MapTile extends GameObject {
  public init = () => {
    const tex = AssetManager.instance.getTexture("floor_cobblestone");
    this.mesh.geometry = new PlaneGeometry(1, 1);
    this.mesh.material = new MeshStandardMaterial({
      map: tex
    });

    this.shadowsEnable(false, true);
  };
}

class MapGenerator extends GameObject {
  protected map: number[][] = [];

  public setMap = (m: number[][]) => {
    this.map = new Array(m[0].length);
    for (let i = 0; i < this.map.length; ++i) {
      this.map[i] = new Array(m.length);
    }

    for (let i = 0; i < m.length; ++i) {
      for (let j = 0; j < m[0].length; ++j) {
        this.map[j][i] = m[i][j];
      }
    }
    for (let i = 0; i < this.map.length; ++i) {
      let t = new Array(this.map[0].length);
      for (let j = 0; j < t.length; ++j) {
        t[t.length-j-1] = this.map[i][j];
      }
      this.map[i] = t;
    }

    let rows = this.map.length;
    let cols = this.map[0].length;
    
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        this.scene.addObject(new MapTile(i, j, 0));
      }
    }

    let maxHeight = 0;
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        maxHeight = Math.max(maxHeight, this.map[i][j]);
      }
    }

    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        let cnt = this.map[i][j];
        if (cnt >= 0) {
          for (let k = 0; k < cnt; ++k) {
            this.scene.addObject(new Wall(i, j, k));
          }
        } else {
          for (let k = -cnt; k < maxHeight; ++k) {
            this.scene.addObject(new Wall(i, j, k));
          }
        }
      }
    }
  };

  public init = () => {
    this.shadowsEnable(false, false);
  };
}

export default MapGenerator;