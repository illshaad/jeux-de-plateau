class Weapon {
  constructor(type, damage, speed, image) {
    this.type = type;
    this.damage = damage;
    this.speed = speed;
    this.img = `./image/weapon/${image}`;

    // switch (type) {
    //   case "Pistol":
    //     this.damage = 3;
    //     this.speed = 1;
    //     this.img = "./image/pistol.png";
    //     break;
    //   case "Sniper":
    //     this.damage = 30;
    //     this.speed = 0.3;
    //     this.img = "./image/sniper.png";
    //     break;
    //   case "RocketLauncher":
    //     this.damage = 50;
    //     this.speed = 0.1;
    //     this.img = "./image/rocket.png";
    //     break;
    //   case "Uzi":
    //     this.damage = 1;
    //     this.speed = 4;
    //     this.img = "./image/uzi.png";
    //     break;
    // }
  }
}
