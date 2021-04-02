class GameMap {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.nbObstacle = Math.floor(width * height * 0.12);
    this.players = [];
    this.weapons = [];
  }

  init() {
    const height = this.height;
    const width = this.width;
    const nbObstacle = this.nbObstacle;

    const map = document.querySelector("#map");
    let i = 0;
    while (i < height) {
      const tr = document.createElement("tr");
      tr.classList.add("row-" + i.toString());
      map.appendChild(tr);
      let j = 0;

      while (j < width) {
        const td = document.createElement("td");
        td.classList.add(`cell-${i}-${j}`);
        td.classList.add("cell");
        tr.appendChild(td);
        j++;
      }
      i++;
    }
    //Generation des obstacles//
    const cells = [].slice.call(document.querySelectorAll("td.cell"));
    cells.sort((a, b) => Math.floor(Math.random() * 2) - 1);
    const obstacleCells = cells.slice(0, nbObstacle);
    obstacleCells.forEach((element) => {
      element.classList.add("obstacle");
    });

    //Generation des armes//

    this.weapons.push(new Weapon("Pistol", 8, 1, "pistol.png"));
    this.weapons.push(new Weapon("Sniper", 20, 2, "sniper.png"));
    this.weapons.push(new Weapon("Rocket", 10, 3, "rocket.png"));
    this.weapons.push(new Weapon("Uzi", 3, 4, "uzi.png"));
    const nbWeapon = Math.floor(Math.random() * this.weapons.length) + 1;
    const weaponCells = cells.slice(nbObstacle, nbWeapon + nbObstacle);
    console.log(weaponCells);
    for (let i = 0; i < weaponCells.length; i++) {
      weaponCells[i].innerHTML = this.weapons[i].type;
    }

    // generation player//
    this.players.push(new Player("playerOne", "playerOne.png"));
    this.players.push(new Player("playerTwo", "playerTwo.png"));
    const remainingCells = cells.slice(nbObstacle + nbWeapon);
    for (let i = 0; i < remainingCells.length; i++) {
      remainingCells[i].innerHTML = this.players[i].name;
    }
  }
}

//Selector toujours une String//
// Math.Random function aléatoire
// floor arrondi a l'entier inferieur
// ceil arrondi a l'entier superieur
// document.querySelector(qs) // ciblé un element
//innertHtml recuperation d'un element
// document.createElement("td")
// element.appendChild(elements)
// td.classList.add("obstacle"); ajouter une class
