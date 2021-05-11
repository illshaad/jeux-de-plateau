class Weapon {
  constructor(type, damage, name, map, x, y) {
    this.type = type;
    this.damage = damage;
    this.image = `./image/weapon/${name}.png`;
    this.name = name;
    this.map = map;
    this.imgTag = null;
    this.x = x;
    this.y = y;
  }

  pickUp(player) {
    // this.imgTag.parentElement.removeChild(this.imgTag);
    player.weapon = this;
    player.updateImage();
  }
}
