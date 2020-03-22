//console.log("game.js linked....");
let totalPts = 0;
let activeModRate = 0;
let basePoints = 1;

let player = {
  level: "",
  nextLevel: 0,
  activeMods: [],
  donkeys: 0,
  carts: 0,
  pickaxes: 0,
  saddlebags: 0
};

let mods = {
  moonPickaxe: {
    name: "Moon Pickaxe",
    qty: 0,
    next: 0,
    mod: 2,
    cost: 100,
    costMultiplier: 2
  },
  moonDonkey: {
    name: "Moon Donkey",
    qty: 0,
    next: 0,
    mod: 4,
    cost: 1000,
    costMultiplier: 2
  },
  moonSaddlebag: {
    name: "Moon Saddlebag",
    qty: 0,
    next: 0,
    mod: 3,
    cost: 200,
    costMultiplier: 2
  },
  moonWagon: {
    name: "Moon Cart",
    qty: 0,
    next: 0,
    mod: 5,
    cost: 5000,
    costMultiplier: 2
  },
  moonCarrots: {
    name: "Moon Carrots",
    qty: 0,
    next: 0,
    mod: 1,
    cost: 200,
    costMultplier: 1
  }
};
function drawModButtons() {
  let modButtonTemplate = "";

  for (let modKey in mods) {
    if (mods.hasOwnProperty(modKey)) {
      let mod = mods[modKey];

      modButtonTemplate +=
        /*html*/
        `<div class="row text-light rounded text-center py-1 my-3 btn btn-secondary w-100" onClick="modClicked('${modKey}')">
        <div class="col-12"><h2>${mod.name}</h2></div>
        <div class="col-12 text-dark font-italic"><h3>Moon Cost: ${mod.cost}
        </h3></div>
      </div>`;
    }
  }
  document.getElementById("modButtons").innerHTML = modButtonTemplate;
}

function drawModTotals() {
  let modTotals = "";
  for (let key in mods) {
    if (mods.hasOwnProperty(key) && mods[key].qty != 0) {
      let element = mods[key];
      modTotals += /*html*/ `<div class="col-12 font-weight-light font-italic pl-4">${element.name}s:</div>
     <div class="col-12 text-right pr-5">${element.qty}</div>`;
    }
  }
  document.getElementById("activeMods").innerHTML = modTotals;
}
function carrotGenerator() {}
function clickedMoon() {
  console.log("Moon clicked");
  totalPts++;
  updateAll();
}
function modClicked(modKey) {
  let mod = mods[modKey];
  player.activeMods.push(mod);
  mod.qty++;
  drawModTotals();

  //console.log("Mod 1 clicked");
}

function updateAll() {
  player.activeMods.forEach(element => {
    totalPts += element.mod;
  });
  console.log(player.activeMods);
  document.getElementById("pointTotal").innerHTML = totalPts.toString();
  drawModTotals();
}

function reset() {
  player.activeMods.splice(0);
  totalPts = 0;
  for (const key in mods) {
    if (mods.hasOwnProperty(key)) {
      const element = mods[key];
      element.qty = 0;
    }
  }
  drawModTotals();
  drawModButtons();
  updateAll();
}
drawModButtons();
drawModTotals();
