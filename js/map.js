class GameMap {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.nbObstacle = Math.floor(width * height * 0.12);
    this.players = [];
    this.weapons = [];
    this.cells = [];
    this.turn = 0;
    this.grid = [];
  }

  init() {
    //generation de la map //
    this.mapGeneration();
    //Generation des armes//
    this.generationObsctacle();

    const nbWeapon = 4;
    const weaponCells = this.cells.slice(
      this.nbObstacle,
      nbWeapon + this.nbObstacle
    );

    const arrayWeapon = [
      {
        type: "pistol",
        damage: 8,
        name: "pistol",
      },
      {
        type: "Sniper",
        damage: 20,
        name: "sniper",
      },
      {
        type: "Rocket",
        damage: 10,
        name: "bazooka",
      },
      {
        type: "Uzi",
        damage: 3,
        name: "uzi",
      },
    ];
    for (let i = 0; i < weaponCells.length; i++) {
      // console.dir(weaponCells[i]);
      const newWeapon = new Weapon(
        arrayWeapon[i].type,
        arrayWeapon[i].domage,
        arrayWeapon[i].name,
        this, //maps
        parseInt(weaponCells[i].dataset.x),
        parseInt(weaponCells[i].dataset.y)
      );
      console.log(newWeapon);
      weaponCells[i].innerHTML = `<img src="${newWeapon.image}"/>`;
      newWeapon.imgTag = weaponCells[i].children[0];
      newWeapon.imgTag.classList.add("weapon");
      this.addWeapon(newWeapon);
    }

    // generation player//
    const remainingCells = this.cells.slice(this.nbObstacle + nbWeapon);

    //Création methode//
    //generation plays1
    this.addPlayer(
      new Player(
        "playerOne",
        null,
        this,
        parseInt(remainingCells[0].dataset.x),
        parseInt(remainingCells[0].dataset.y)
      )
    );
    //generation plays2
    this.addPlayer(
      new Player(
        "playerTwo",
        null,
        this,
        parseInt(remainingCells[1].dataset.x),
        parseInt(remainingCells[1].dataset.y)
      )
    );
    this.players[0].imgTag = document.createElement("img");
    this.players[0].imgTag.src = this.players[0].img;
    this.players[1].imgTag = document.createElement("img");
    this.players[1].imgTag.src = this.players[1].img;
    this.players[0].imgTag.classList.add("player");
    this.players[1].imgTag.classList.add("player");
    remainingCells[0].appendChild(this.players[0].imgTag);
    remainingCells[1].appendChild(this.players[1].imgTag);

    this.start();
  }

  //function commencement du  joueur//

  start() {
    //1°) verification le tour ?
    const player = this.players[this.turn];

    //2°)marquer les cases dispo facon visuel et en ajouter un click
    const cells = document.querySelectorAll(".cell");
    for (const cell of cells) {
      cell.classList.remove("moveable");
      let { x, y } = cell.dataset;
      x = parseInt(x);
      y = parseInt(y);
      //si la case n'est pas sur la meme ligne ni sur la meme colonne on zap

      if (x !== player.x && y !== player.y) {
        continue;
      }
      //Si la distance entre la case et le joeur et de 4 ou plus on zap//
      if (Math.abs(x - player.x) >= 4 || Math.abs(y - player.y) >= 4) {
        continue;
      }
      //on verifie si c'est un obstacle ou pas//
      if (cell.classList.contains("obstacle")) {
        continue;
      }
      //recuperation le cell du joueur
      if (x !== player.x || y !== player.y) {
        //Droit du joueur//
        if (x - player.x >= 2) {
          if (
            this.grid[y][x - 1].classList.contains("obstacle") ||
            this.grid[y][x - 2].classList.contains("obstacle")
          )
            continue;
        }
        //Gauche du joueur//
        if (player.x - x >= 2) {
          if (
            this.grid[y][x + 1].classList.contains("obstacle") ||
            this.grid[y][x + 2].classList.contains("obstacle")
          )
            continue;
        }
        //haut du joueur//
        if (player.y - y >= 2) {
          if (
            this.grid[y + 1][x].classList.contains("obstacle") ||
            this.grid[y + 2][x].classList.contains("obstacle")
          )
            continue;
        }
        //bas du joueur//
        if (y - player.y >= 2) {
          if (
            this.grid[y - 1][x].classList.contains("obstacle") ||
            this.grid[y - 2][x].classList.contains("obstacle")
          )
            continue;
        }
      }

      //Savoir la position exacte d'obsactale
      cell.classList.add("moveable");
    }
  }

  addPlayer(player) {
    this.players.push(player);
  }

  addWeapon(weapon) {
    this.weapons.push(weapon);
  }

  mapGeneration() {
    this.grid = [];
    const height = this.height;
    const width = this.width;
    const map = document.querySelector("#map");
    let i = 0;
    //Création des lignes
    while (i < height) {
      const tr = document.createElement("tr");
      tr.classList.add("row-" + i.toString());
      map.appendChild(tr);
      let j = 0;
      let row = [];
      //Création des carré
      while (j < width) {
        const td = document.createElement("td");
        td.addEventListener("click", (event) => this.onCellClick(event));
        td.classList.add("cell");
        row.push(td);
        td.dataset.x = j;
        td.dataset.y = i;
        tr.appendChild(td);
        j++;
      }
      this.grid.push(row);
      i++;
    }
  }

  onCellClick(event) {
    if (!event.target.classList.contains("moveable")) {
      return;
    }

    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    this.players[this.turn].move(x, y);

    //recuperation l'arme qui ce trouve la meme cellule
    const weapon = this.weapons.find((w) => w.x === x && w.y === y);
    if (weapon !== undefined) {
      weapon.pickUp(this.players[this.turn]);
    }
    //Changer l'image du joueur//
    // this.player.imgTag.src =
    //   this.players[this.turn] + this.map.turn + this.weapons.imgTag;

    // Pour savoir le tour du joueur suivant//
    // 1 - 0 => le deuxieme joueur  || 1-1 => le premiere joueur
    this.turn = 1 - this.turn;
    this.start();
  }

  //Generation des obstacles//
  generationObsctacle() {
    this.cells = [].slice.call(document.querySelectorAll("td.cell"));
    this.cells.sort((a, b) => Math.floor(Math.random() * 2) - 1);
    const obstacleCells = this.cells.slice(0, this.nbObstacle);
    obstacleCells.forEach((element) => {
      element.classList.add("obstacle");
    });
  }
}

// const test = -6 - 20 ;
//Math.abs(test)
//Selector toujours une String//
// Math.Random function aléatoire
// floor arrondi a l'entier inferieur
// ceil arrondi a l'entier superieur
// document.querySelector(qs) // ciblé un element
//innertHtml recuperation d'un element
// document.createElement("td")
// element.appendChild(elements)
// td.classList.add("obstacle"); ajouter une class

//Regrouper dans des methodes
// Il faut pas que les player soie côte à côte .//
//trouver les bonnes images

//RAMASSER UNE ARME::

//1°) il faut que l'image disparait de la map
//2°) Ramasser une arme mettre à jour l'image du joueur
// 3°) mise à jour les dégats du joueur
