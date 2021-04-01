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
    const nbWeapon = Math.floor(Math.random() * 4) + 1;
    const weaponCells = cells.slice(nbObstacle, nbWeapon + nbObstacle);
    weaponCells.forEach((element) => {
      element.classList.add("weapon");
    });

    // generation player//
    const remainingCells = cells.slice(nbObstacle + nbWeapon);
    remainingCells[0].classList.add("firstPlayer");
    remainingCells[1].classList.add("secondPlayer");

    // Créate player and weapon//
    this.players.push(new Player("playerOne"));
    this.players.push(new Player("playerTwo"));
    // this.weapons.push(new Weapon("Pistol"));
    console.log(this.players);
    // console.log(this.weapons);
  }
}

//Selector toujours une String//
// Math.Random function aléatoire
// floor arrondi a l'entier inferieur
// ceil arrondi a l'entier superieur
// document.querySelector(qs)
// document.createElement("td")
// element.appendChild(elements)
// td.classList.add("obstacle"); ajouter une class

// A FAIRE //

// A chaque fois que je rajoutes un player ou une arme, met a jour `this.players` ou `this.weapons`
//exemple: `this.players.push(new Player('playerOne'));`

// ajouter les images pour les players et les weapons et remplace le background-color par l'utilisation de l'image (supprime la classe CSS)
