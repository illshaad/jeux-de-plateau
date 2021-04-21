class Player {
  constructor(name, defaultWeapon, image, map, x, y) {
    this.name = name;
    this.defaultWeapon = defaultWeapon;
    this.img = `./image/players/${image}`;
    this.map = map;
    this.x = x;
    this.y = y;
  }

  // move(direction) {}
}

// si il peut pas return false sinon true

// horizontal = x
// vertical = y

// x: 1 , y:5  en haut : y -1 a gauche : x -1  a droit : x+1 en bas : y+1

// verication si la case existe
