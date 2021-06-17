class Player {
  constructor(name, weapon, map, x, y) {
    this.name = name;
    this.weapon = weapon;
    this.imgTag = null;
    this.map = map;
    this.x = x;
    this.y = y;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    this.map.grid[y][x].appendChild(this.imgTag);
  }

  updateImage() {
    console.log(this.weapon);
    this.img =
      this.weapon.name === "knife"
        ? `./image/players/${this.name}.png`
        : `./image/weapon/${this.name}_${this.weapon.name}.png`;

    this.imgTag.src = this.img;
  }
}
