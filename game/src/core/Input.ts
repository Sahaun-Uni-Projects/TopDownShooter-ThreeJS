class Input {
  private static _instance = new Input();
  public static get instance() { return this._instance; }

  private state = {
    up: false,
    down: false,
    left: false,
    right: false,
    action: false,
  };

  public static get up() { return Input.instance.state.up; }
  public static get down() { return Input.instance.state.down; }
  public static get left() { return Input.instance.state.left; }
  public static get right() { return Input.instance.state.right; }
  public static get action() { return Input.instance.state.action; }

  private constructor() {
    window.addEventListener("mousedown", this.onMouseDown);
    window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }

  private onMouseDown = (e: MouseEvent) => {
    switch (e.button) {
      case 0:
        this.state.action = true;
      break;
      default: break;
    }
  };

  private onMouseUp = (e: MouseEvent) => {
    switch (e.button) {
      case 0:
        this.state.action = false;
      break;
      default: break;
    }
  };

  private onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
      case "w":
        this.state.up = true;
      break;
      case "ArrowDown":
      case "s":
        this.state.down = true;
      break;
      case "ArrowLeft":
      case "a":
        this.state.left = true;
      break;
      case "ArrowRight":
      case "d":
        this.state.right = true;
      break;
      default: break;
    }
  };

  private onKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
      case "w":
        this.state.up = false;
      break;
      case "ArrowDown":
      case "s":
        this.state.down = false;
      break;
      case "ArrowLeft":
      case "a":
        this.state.left = false;
      break;
      case "ArrowRight":
      case "d":
        this.state.right = false;
      break;
      default: break;
    }
  };
}

export default Input;