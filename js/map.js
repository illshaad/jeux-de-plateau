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
    this.combat = false;
    this.action = {};
    this.action.attaqueP1 = document.getElementById("attaque-p1");
    this.action.defenseP1 = document.getElementById("defense-p1");
    this.action.attaqueP2 = document.getElementById("attaque-p2");
    this.action.defenseP2 = document.getElementById("defense-p2");

    this.action.attaqueP1.addEventListener("click", () => this.attaque(0));
    this.action.defenseP1.addEventListener("click", () => this.defense(0));
    this.action.attaqueP2.addEventListener("click", () => this.attaque(1));
    this.action.defenseP2.addEventListener("click", () => this.defense(1));
  }

  //Fonction Init() elle permet la géneration du jeux:
  //Generation des joueurs ,  cartes , armes , placements des joueurs , placements des armes,
  //ainsi que les obsctacles

  init() {
    for (const player of this.players) {
      $(player.imgTag).remove();
    }
    this.players.length = 0;
    for (const weapon of this.weapons) {
      $(weapon.imgTag).remove();
    }
    this.weapons.length = 0;

    this.combat = false;

    //generation de la map //
    this.mapGeneration();
    //Generation des armes//
    //Generation des obsctacle//
    this.generationObsctacle();

    const nbWeapon = 4;
    const weaponCells = this.cells.slice(
      this.nbObstacle,
      nbWeapon + this.nbObstacle
    );

    const arrayWeapon = [
      {
        damage: 15,
        name: "pistol",
      },
      {
        damage: 30,
        name: "sniper",
      },
      {
        damage: 50,
        name: "bazooka",
      },
      {
        damage: 25,
        name: "uzi",
      },
    ];
    for (let i = 0; i < weaponCells.length; i++) {
      const newWeapon = new Weapon(
        arrayWeapon[i].damage,
        arrayWeapon[i].name,
        this, //maps
        parseInt(weaponCells[i].dataset.x),
        parseInt(weaponCells[i].dataset.y)
      );
      weaponCells[i].innerHTML = `<img src="${newWeapon.image}"/>`;
      newWeapon.imgTag = weaponCells[i].children[0];
      newWeapon.imgTag.src;
      newWeapon.imgTag.classList.add("weapon");
      this.addWeapon(newWeapon);
    }

    const remainingCells = this.cells.slice(this.nbObstacle + nbWeapon);
    const knifeOne = new Weapon(5, "knife", this, 0, 0);
    const knifeTwo = new Weapon(5, "knife", this, 0, 0);

    const x1 = parseInt(remainingCells[0].dataset.x);
    const y1 = parseInt(remainingCells[0].dataset.y);

    this.addPlayer(new Player("playerOne", knifeOne, this, x1, y1));

    let i = 1;
    while (i < remainingCells.length) {
      const x2 = parseInt(remainingCells[i].dataset.x);
      const y2 = parseInt(remainingCells[i].dataset.y);
      if (isAdjacent(x1, y1, x2, y2)) {
        i++;
        continue;
      }
      this.addPlayer(
        new Player(
          "playerTwo",
          knifeTwo,
          this,
          parseInt(remainingCells[1].dataset.x),
          parseInt(remainingCells[1].dataset.y)
        )
      );
      break;
    }

    this.players[0].imgTag = document.createElement("img");
    this.players[0].imgTag.src = this.players[0].img;
    this.players[1].imgTag = document.createElement("img");
    this.players[1].imgTag.src = this.players[1].img;
    this.players[0].imgTag.classList.add("player");
    this.players[1].imgTag.classList.add("player");
    remainingCells[0].appendChild(this.players[0].imgTag);
    remainingCells[i].appendChild(this.players[1].imgTag);
    this.players[0].updateImage();
    this.players[1].updateImage();
    this.start();
  }

  //function updateInfo() elle permet d'afficher le nom de l'arme ansi que les pv des joueur , elle permet de voir la gestion des dégat et les attaques.
  //

  updateInfo() {
    const armeP1 = document.getElementById("arme-p1");
    const pvP1 = document.getElementById("pv-p1");
    const paP1 = document.getElementById("pa-p1");
    const armeP2 = document.getElementById("arme-p2");
    const pvP2 = document.getElementById("pv-p2");
    const paP2 = document.getElementById("pa-p2");

    armeP1.textContent = this.players[0].weapon.name;
    pvP1.textContent = this.players[0].pv;
    paP1.textContent = this.players[0].weapon.damage;
    armeP2.textContent = this.players[1].weapon.name;
    pvP2.textContent = this.players[1].pv;
    paP2.textContent = this.players[1].weapon.damage;

    this.action.attaqueP1.disabled = !this.combat || !!this.turn;
    this.action.defenseP1.disabled = !this.combat || !!this.turn;
    this.action.attaqueP2.disabled = !this.combat || !this.turn;
    this.action.defenseP2.disabled = !this.combat || !this.turn;
  }

  // Fonction Start() elle permet de controler si les mouvement du joueur sont sur la même
  // Elle permet de vérifier  le tour du joueur
  //
  start() {
    const cells = document.querySelectorAll(".cell");
    for (const cell of cells) {
      cell.classList.remove("moveable");
    }

    if (
      !this.combat &&
      isAdjacent(
        this.players[0].x,
        this.players[0].y,
        this.players[1].x,
        this.players[1].y
      )
    ) {
      alert("le combat commence");
      this.combat = true;
    }
    this.updateInfo();

    const player = this.players[this.turn];

    if (this.combat) return;

    for (const cell of cells) {
      let { x, y } = cell.dataset;
      x = parseInt(x);
      y = parseInt(y);
      //si la case n'est pas sur la meme ligne ni sur la meme colonne on zap
      if (x !== player.x && y !== player.y) {
        continue;
      }
      //Si la distance entre la case et le joueur et de 4 ou plus on zap//
      if (Math.abs(x - player.x) >= 4 || Math.abs(y - player.y) >= 4) {
        continue;
      }
      //on verifie si c'est un obstacle ou pas//
      if (cell.classList.contains("obstacle")) {
        continue;
      }
      //recuperation le cell du joueur
      if (x !== player.x || y !== player.y) {
        //Droite du joueur//
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

  //Generation du joueur//
  addPlayer(player) {
    this.players.push(player);
  }
  // Generation de l'arme
  addWeapon(weapon) {
    this.weapons.push(weapon);
  }

  // Function mapGeneration() création de la map avec tous les cellules verticales et horizontal
  mapGeneration() {
    this.grid = [];
    const height = this.height;
    const width = this.width;
    const map = document.querySelector("#map");
    map.innerHTML = "";
    let i = 0;
    while (i < height) {
      const tr = document.createElement("tr");
      tr.classList.add("row-" + i.toString());
      map.appendChild(tr);
      let j = 0;
      let row = [];
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

  //Function onCellClick elle permet au joueurs de récuperation d'une arme.
  // Elle permet de controler le tour du joueurs suivant
  onCellClick(event) {
    const target =
      event.target.tagName === "IMG"
        ? event.target.parentElement
        : event.target;

    if (!target.classList.contains("moveable")) {
      return;
    }

    const x = parseInt(target.dataset.x);
    const y = parseInt(target.dataset.y);
    this.players[this.turn].move(x, y);

    //recuperation l'arme qui ce trouve la meme cellule
    const weapon = this.weapons.find((w) => w.x === x && w.y === y);
    if (weapon !== undefined) {
      weapon.pickUp(this.players[this.turn]);
    }
    // Pour savoir le tour du joueur suivant//
    this.turn = 1 - this.turn;
    setTimeout(this.start.bind(this), 1);
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

  //Function attaque permet que le joueurs puisse attaquer avec l'arme qu'elle détient
  attaque(attaqeur) {
    if (this.combat === false || attaqeur !== this.turn) return;
    this.players[1 - attaqeur].takeDamage(this.players[attaqeur].weapon.damage);
    this.turn = 1 - this.turn;
    if (this.players[this.turn].pv <= 0) {
      alert("le joueur " + this.players[attaqeur].name + " a gagné");
      return this.init();
    }
    this.start();
  }

  //Function defense permet que le joueurs puisse se défendre
  defense(defenseur) {
    if (this.combat === false || defenseur !== this.turn) return;
    this.players[defenseur].defending = true;
    this.turn = 1 - this.turn;
    this.start();
  }
}
