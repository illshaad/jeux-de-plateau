class Weapon {
  constructor(type, damage, image, x, y) {
    this.type = type;
    this.damage = damage;
    this.image = `./image/weapon/${image}`;
    // this.map = map;
    this.x = x;
    this.y = y;
  }
}
