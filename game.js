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
    cost: 25,
    costMultiplier: 2,
    available: false,
    intervalMod: false
  },
  moonDonkey: {
    name: "Moon Donkey",
    qty: 0,
    mod: 3,
    cost: 1000,
    costMultiplier: 2,
    available: false,
    intervalMod: false
  },
  moonSaddlebag: {
    name: "Moon Saddlebag",
    qty: 0,
    mod: 1,
    cost: 200,
    costMultiplier: 2,
    available: false,
    intervalMod: false
  },
  moonWagon: {
    name: "Moon Cart",
    qty: 0,
    mod: 5,
    cost: 5000,
    costMultiplier: 2,
    available: false,
    intervalMod: false
  },
  moonCarrots: {
    name: "Moon Carrot",
    qty: 0,
    mod: 2,
    cost: 200,
    costMultiplier: 2,
    available: false,
    intervalMod: true,
    preReq: "moonDonkey"
  }
};

function drawModButtons() {
  let modButtonTemplate = "";
  for (let modKey in mods) {
    if (mods.hasOwnProperty(modKey)) {
      let mod = mods[modKey];
      console.log(mod.available);
      if (!mod.available) {
        modButtonTemplate +=
          /*html*/
          `<div class="row text-secondary bg-transparent rounded text-center my-2 btn btn-secondary w-100" onClick="modClicked('${modKey}')">
        <div class="col-12"><h3>${mod.name}</h3></div>
        <div class="col-12 text-muted font-italic font-weight-light"><h5>+$${mod.mod} per click bonus
        </h5></div>
        <div class="col-12 text-muted font-weight-bold"><h3>Moon Cost: ${mod.cost}
        </h3></div>
      </div>`;
      } else {
        modButtonTemplate += /*html*/ `<div class="row text-light rounded text-center py-1 my-3 btn btn-success w-100" onClick="modClicked('${modKey}')">
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

function drawModTotals() {
  let modTotals = "";
  for (let key in mods) {
    if (mods.hasOwnProperty(key) && mods[key].qty != 0) {
      let element = mods[key];
      modTotals += /*html*/ `<div class="col-12 font-weight-bold font-italic pl-2 text-left text-success">${element.name}s:</div>
      
      <div class=" col-12 text-center">X ${element.qty}</div>
      `;
    }
  }
  document.getElementById("activeMods").innerHTML = modTotals;
}

function intervalMods(modKey) {
  console.log("carrot generator called...");
  setInterval(function() {
    totalPts += modKey.qty * mods[modKey.preReq].qty;
    drawTotalScore();
  }, 1000);
}

function clickedMoon() {
  totalPts++;
  totalPts += activeModRate;
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
    player.level[Math.floor(totalPts / 10000)];
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
    }
  }
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
