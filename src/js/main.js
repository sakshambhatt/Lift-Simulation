const mainState = {
  floorCount: 0,
  liftCount: 0,
};

function setMainState() {
  const newFloorCount = document.getElementById("floors").value;
  const newLiftCount = document.getElementById("lifts").value;
  mainState.floorCount = newFloorCount;
  mainState.liftCount = newLiftCount;
  window.sessionStorage.setItem("mainState", JSON.stringify(mainState));
}

function generateUI() {
  let floors = "";
  for (let i = mainState.floorCount - 1; i > -1; --i) {
    floors += `<div class="line"><small class="floorNumber">${i}</small></div>`;
  }
  document.getElementById("floorplan").innerHTML = floors;
}

function resetUI() {
  document.getElementById("floorplan").innerHTML = "";
  document.getElementById("floors").value = "";
  document.getElementById("lifts").value = "";
}

function initializeSimulation() {
  setMainState();
  resetUI();
  generateUI();
}
