class Player {
  constructor(name, x, y) {
    this.name = name;
    this.img =
      name === "playerOne"
        ? "./image/players/playerOne.png"
        : "./image/playerTwo.png";
  }
}
