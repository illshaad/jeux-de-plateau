class GameMap {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.nbObstacle = Math.floor(width * height * 0.12);
    this.players = [];
    this.weapons = [];
    this.cells = [];
    this.turn = 0;
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
        image: "pistol.png",
      },
      {
        type: "Sniper",
        damage: 20,
        image: "sniper.png",
      },
      {
        type: "Rocket",
        damage: 10,
        image: "rocket.png",
      },
      {
        type: "Uzi",
        damage: 3,
        image: "uzi.png",
      },
    ];
    for (let i = 0; i < weaponCells.length; i++) {
      const newWeapon = new Weapon(
        arrayWeapon[i].type,
        arrayWeapon[i].domage,
        arrayWeapon[i].image,
        // this, //maps
        weaponCells[i].dataset.x,
        weaponCells[i].dataset.y
      );
      weaponCells[i].innerHTML = `<img src="${newWeapon.image}"/>`;
      this.addWeapon(newWeapon);
    }

    // generation player//
    const remainingCells = this.cells.slice(this.nbObstacle + nbWeapon);

    //Création methode//
    //generation plays1
    this.addPlayer(
      new Player(
        "playerOne",
        "defaultWeapon",
        "playerOne.png",
        this,
        remainingCells[0].dataset.x,
        remainingCells[0].dataset.y
      )
    );
    //generation plays2
    this.addPlayer(
      new Player(
        "playerTwo",
        "defaultWeapon",
        "playerTwo.png",
        this,
        remainingCells[1].dataset.x,
        remainingCells[1].dataset.y
      )
    );
    remainingCells[0].innerHTML = `<img name=${this.players[0].name} src="${this.players[0].img}"/>`;
    remainingCells[1].innerHTML = `<img name=${this.players[1].name} src="${this.players[1].img}"/>`;

    this.start();
  }

  //function commencement du  joueur//

  start() {
    //1°) verification le tour ?
    const player = this.players[this.turn];

    //2°)marquer les cases dispo facon visuel et en ajouter un click
    const cells = document.querySelectorAll(".cell");

    for (const cell of cells) {
      const { x, y } = cell.dataset;
      if (x !== player.x && y !== player.y) {
        continue;
      }

      if (Math.abs(x - player.x) > 3 || Math.abs(y - player.y) > 3) {
        continue;
      }

      if (cell.classList.contains("obstacle")) {
        continue;
      }

      cell.style.background = "green";
    }
    //3°) appeler la fonction move dans le onClick
    //4°) verification si la partie est fini
    //5°) changer le this.turn et appeler start
  }

  addPlayer(player) {
    this.players.push(player);
  }
  addWeapon(weapon) {
    this.weapons.push(weapon);
  }

  mapGeneration() {
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
      //Création des carré
      while (j < width) {
        const td = document.createElement("td");
        td.classList.add("cell");
        td.dataset.x = j;
        td.dataset.y = i;
        tr.appendChild(td);
        j++;
      }
      i++;
    }
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
// afficher les cases ou le player peux ce déplacer//
// Essayer de fair bouger les players//
//trouver les bonnes images
