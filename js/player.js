class Player {
  constructor(name, weapon, map, x, y) {
    this.name = name;
    this.weapon = weapon;
    this.imgTag = null;
    this.map = map;
    this.x = x;
    this.y = y;
    this.updateImage();
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    this.map.grid[y][x].appendChild(this.imgTag);
  }

  updateImage() {
    if (this.weapon === null) {
      this.img = `./image/players/${this.name}.png`;
      return;
    }
    this.img = `./image/weapon/${this.name}_${this.weapon.name}.png`;
    this.imgTag.src = this.img;
  }
}
