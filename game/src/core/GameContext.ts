import Game from "./Game";

class GameContext {
  public mouseX = 0;
  public mouseY = 0;
  public clockDelta = 0.0;
  public fps = 1;

  constructor(game: Game) {
    this.fps = game.fps;

    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.x;
      this.mouseY = e.y;
    });
  }
}

export default GameContext;