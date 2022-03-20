const floorPlan = [];

function setFloorPlan() {
  const floorCount = parseInt(document.getElementById("floors").value);
  const liftCount = parseInt(document.getElementById("lifts").value);
  floorPlan.push(Array(liftCount).fill(1));
  for (let i = 1; i < floorCount; i++) {
    floorPlan.push(Array(liftCount).fill(0));
  }

  window.sessionStorage.setItem("floorPlan", JSON.stringify(floorPlan));
}

function generateLiftsTemplate(currentFloor) {
  let lift = `<ul class="lift-array">`;
  for (let j = 0; j < currentFloor.length; ++j) {
    // generating lift plan
    lift +=
      currentFloor[j] === 1
        ? `<div class="lift"></div>`
        : `<div class="hidden-lift"></div>`;
  }
  lift += `</ul>`;
  return lift;
}

function generateUI() {
  let floors = "";
  for (let i = floorPlan.length - 1; i > -1; --i) {
    const floorNumTemplate = `<small class="floorNumber">${i}</small>`;
    const liftTemplate = generateLiftsTemplate(floorPlan[i]);
    floors += `<div class="line">${floorNumTemplate}${liftTemplate}</div>`;
  }
  document.getElementById("floorplan").innerHTML = floors;
}

function resetUI() {
  document.getElementById("floorplan").innerHTML = "";
  document.getElementById("floors").value = "";
  document.getElementById("lifts").value = "";
}

function resetState() {
  window.sessionStorage.removeItem("floorPlan");
  floorPlan.splice(0, floorPlan.length);
}

function resetAll() {
  resetUI();
  resetState();
}

function initializeSimulation() {
  setFloorPlan();
  generateUI();
}
