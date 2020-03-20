//console.log("game.js linked....");
let totalPts = 0;
let activeModRate = 0;
let basePoints = 1;
let donkeys = 0;

let player = {
  level: "",
  nextLevel: 0,
  donkey: false,
  activeMods: []
};

let mods = {
  moonPickaxe: { mod: 2, cost: 100, costMultiplier: 2 },
  moonDonkey: { mod: 4, cost: 1000, costMultiplier: 2 },
  moonSaddlebag: { mod: 3, cost: 200, costMultiplier: 2 },
  moonWagon: { mod: 5, cost: 5000, costMultiplier: 2 },
  moonCarrots: { mod: 1, cost: 200, costMultplier: 1 }
};

function carrotGenerator() {}
function clickedMoon() {
  //console.log("Moon clicked");
  totalPts++;
  drawAll();
}
function clickedMod1(modKey) {
  let modValue = mods[modKey].mod;
  player.activeMods.push(modValue);
  console.log(player.activeMods);
  //console.log("Mod 1 clicked");
}
function clickedMod2(modKey) {
  let modValue = mods[modKey].mod;
  player.activeMods.push(modValue);
  console.log(player.activeMods);
  //console.log("Mod 2 clicked");
}
function clickedMod3(modKey) {
  let modValue = mods[modKey].mod;
  player.activeMods.push(modValue);
  console.log(player.activeMods);
  //console.log("Mod 3 clicked");
}
function clickedMod4(modKey) {
  let modValue = mods[modKey].mod;
  player.activeMods.push(modValue);
  console.log(player.activeMods);
  //console.log("Mod 4 clicked");
}
function clickedMod5(modKey) {
  let modValue = mods[modKey].mod;
  player.activeMods.push(modValue);

  console.log(player.activeMods);
  console.log("Mod 5 clicked");
}
function clickedMenu1() {
  //console.log("Menu button 1 clicked");
}
function clickedMenu2() {
  //console.log("Menu button 2 clicked");
}
function clickedMenu3() {
  //console.log("Menu button 3 clicked");
}

function modRate() {}
function drawAll() {
  console.log("drawAll() called....");
  document.getElementById("pointTotal").innerHTML = totalPts.toString();
}
