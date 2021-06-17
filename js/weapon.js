class Weapon {
  constructor(damage, name, map, x, y) {
    this.damage = damage;
    this.image = `./image/weapon/${name}.png`;
    this.name = name;
    this.map = map;
    this.imgTag = null;
    this.x = x;
    this.y = y;
  }

  pickUp(player) {
    console.log(this);
    this.imgTag.parentElement.removeChild(this.imgTag);
    this.imgTag = null;
    player.weapon.imgTag = document.createElement("img");
    player.weapon.imgTag.src = player.weapon.image;
    player.weapon.x = this.x;
    player.weapon.y = this.y;
    this.map.grid[this.y][this.x].appendChild(player.weapon.imgTag);
    const index = this.map.weapons.indexOf(this);
    if (index === -1) {
      throw new Error("erreur");
    }

    this.map.weapons[index] = player.weapon;
    player.weapon = this;
    this.x = 0;
    this.y = 0;

    player.updateImage();
  }
}

//deposer une arme :
//1°) crée une image
//2°) on attribue src de l'image
//3°) on depose l'image dans la bonne cellule
