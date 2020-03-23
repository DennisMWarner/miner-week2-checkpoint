//console.log("game.js linked....");
let totalPts = 0;
let activeModRate = 0;
let basePoints = 1;

let player = {
  level: [
    "Moon Plebe",
    "Moon Tenderfoot",
    "Donkey Master Sergeant",
    "Nugget Captain",
    "Major Donkey Master",
    "Moon Admiral",
    "General Nugget"
  ],
  activeMods: []
};

let mods = {
  moonPickaxe: {
    name: "Moon Pickaxe",
    qty: 0,
    mod: 2,
    cost: 20,
    costMultiplier: 2,
    available: false,
    intervalMod: false,
    resetCost: 20
  },
  moonDonkey: {
    name: "Moon Donkey",
    qty: 0,
    mod: 3,
    cost: 50,
    costMultiplier: 2,
    available: false,
    intervalMod: false,
    resetCost: 50
  },
  moonSaddlebag: {
    name: "Moon Saddlebag",
    qty: 0,
    mod: 2,
    cost: 200,
    costMultiplier: 2,
    available: false,
    intervalMod: false,
    resetCost: 200
  },
  moonWagon: {
    name: "Moon Cart",
    qty: 0,
    mod: 5,
    cost: 500,
    costMultiplier: 2,
    available: false,
    intervalMod: false,
    resetCost: 500
  },
  moonCarrots: {
    name: "Moon Carrot",
    qty: 0,
    mod: 1,
    cost: 300,
    costMultiplier: 2,
    available: false,
    intervalMod: true,
    preReq: "moonDonkey",
    resetCost: 300
  }
};

//generates all mod buttons from the "mods" object and injects them into the HTML
function drawModButtons() {
  let modButtonTemplate = "";
  for (let modKey in mods) {
    if (mods.hasOwnProperty(modKey)) {
      let mod = mods[modKey];
      console.log(mod.available);
      if (!mod.available) {
        modButtonTemplate +=
          /*html*/
          `<div class="col-xs-6 col-md-2 my-2 text-secondary bg-transparent rounded text-center btn btn-secondary" onClick="modClicked('${modKey}')">
          <div class="row">
        <div class="col-12"><h3>${mod.name}</h3></div>
        <div class="col-12 text-muted font-italic font-weight-light"><h5>+$${mod.mod} per click bonus
        </h5></div>
        <div class="col-12 text-muted font-weight-bold"><h3>Moon Cost: ${mod.cost}
        </h3></div>
        </div>
      </div>`;
      } else {
        modButtonTemplate += /*html*/ `<div class="col-xs-6 col-md-2 text-light my-2 bg-success rounded text-center btn btn-success" onClick="modClicked('${modKey}')">
    <div class="col-12"><h2>${mod.name}</h2></div>
    <div class="col-12 text-light font-italic"><h4>+$${mod.mod} per click bonus
        </h4></div>
    <div class="col-12 text-dark font-italic"><h3>Moon Cost: ${mod.cost}
    </h3></div>
  </div>`;
        console.log("modButtonTemplate working....");
      }
    }
  }
  document.getElementById("modButtons").innerHTML = modButtonTemplate;
}

//Generates the HTML to represent only purchased mods and their quantities and injects them
function drawModTotals() {
  let modTotals = "";
  for (let key in mods) {
    if (mods.hasOwnProperty(key) && mods[key].qty != 0) {
      let element = mods[key];
      modTotals += /*html*/ `<div class="col-12 font-weight-bold font-italic pl-2  text-left text-success">${element.name}s:</div>
      
      <div class=" col-12 text-center">X ${element.qty}</div>
      `;
    }
  }
  document.getElementById("activeMods").innerHTML = modTotals;
}

//Calculates interval mods and their associated requirements and adds them to the point total; Calls draw functions to update the score, mod availability, and rank while Moon is not being clicked
function intervalMods(modKey) {
  console.log("carrot generator called...");
  setInterval(function() {
    totalPts += modKey.qty * mods[modKey.preReq].qty;
    drawTotalScore();
    updateMods();
    drawModButtons();
    drawRank();
  }, 1000);
}

function clickedMoon() {
  totalPts++;
  totalPts += activeModRate;
  updateMods();
  drawModButtons();
  drawTotalScore();
  drawRank();
}

function modClicked(modKey) {
  let mod = mods[modKey];

  if (mod.intervalMod == true) {
    intervalMods(mod);
  }
  if (mod.cost <= totalPts) {
    totalPts -= mod.cost;
    mod.cost *= mod.costMultiplier;
    player.activeMods.push(mod);
    mod.qty++;
    for (const key in mods) {
      if (mods.hasOwnProperty(key)) {
        const element = mods[key];
        if (element.cost > totalPts) {
          element.available = false;
        }
      }
    }
    updateMods();
    drawModButtons();
    drawTotalScore();
  }
  updateActiveModRate();

  drawModTotals();
}

function updateActiveModRate() {
  let addActiveMod = player.activeMods.pop();
  activeModRate += addActiveMod.mod;
  drawActiveModRate();
}

//Calculate and display player rank
function drawRank() {
  document.getElementById("playerRank").innerHTML =
    player.level[Math.floor(totalPts / 2500)];
}

function drawTotalScore() {
  document.getElementById("pointTotal").innerHTML = totalPts.toString();
  drawModTotals();
}

function drawActiveModRate() {
  document.getElementById("dollarsPerClick").innerHTML = (
    activeModRate + basePoints
  ).toString();
}

function updateMods() {
  for (const key in mods) {
    if (mods.hasOwnProperty(key) && mods[key].cost <= totalPts) {
      const element = mods[key];
      element.available = true;
      //console.log(element.name, element.available);
    } else if (mods.hasOwnProperty(key) && mods[key].cost > totalPts) {
      const element = mods[key];
      element.available = false;
      //console.log(element.name, element.available);
    }
  }
}
//clear all values when player clicks Reset button
function reset() {
  player.activeMods.splice(0);
  totalPts = 0;
  activeModRate = 0;
  for (const key in mods) {
    if (mods.hasOwnProperty(key)) {
      const element = mods[key];
      element.qty = 0;
      element.available = false;
      element.cost = element.resetCost;
    }
  }
  updateMods();
  drawModTotals();
  drawModButtons();
  drawTotalScore();
  drawActiveModRate();
  drawRank();
}

//initialize page
drawActiveModRate();
drawModButtons();
drawModTotals();
drawRank();
