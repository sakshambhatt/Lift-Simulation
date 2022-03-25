const floorPlan = [];

// if i = floorPlan.length - 1
const upButtonList = `<ul class="button-list"><button class="hidden">u</button><button>d</button></ul>`;
// else if i = 0
const downButtonList = `<ul class="button-list"><button>u</button><button class="hidden">d</button></ul>`;
// else
const normalButtonList = `<ul class="button-list"><button>u</button><button class>d</button></ul>`;

// if currentFloor[j] === 1
const visibleLift = `<div class="lift"></div>`;
// else
const hiddenLift = `<div class="hidden lift"></div>`;

function setFloorPlan() {
  const floorCount = parseInt(document.getElementById("floors").value);
  const liftCount = parseInt(document.getElementById("lifts").value);
  floorPlan.push(Array(liftCount).fill(1));
  for (let i = 1; i < floorCount; i++) {
    floorPlan.push(Array(liftCount).fill(0));
  }
  // to see currentFloorPlan
  window.sessionStorage.setItem("floorPlan", JSON.stringify(floorPlan));
}

// continue from here
// every package is a flex-h
// composed of buttonList
// and lift
function generateLiftPackageArrTemplate(currentFloor, buttonList) {
  let liftPackageArr = `<ul class="lift-array">`;
  for (let j = 0; j < currentFloor.length; ++j) {
    // generating lift plan
    let liftPackage = `<ul class="lift-package">`;
    liftPackage += buttonList;
    liftPackage += currentFloor[j] === 1 ? visibleLift : hiddenLift;
    liftPackage += `</ul>`;
    liftPackageArr += liftPackage;
  }
  liftPackageArr += `</ul>`;
  return liftPackageArr;
}

function generateUI() {
  let floors = "";
  for (let i = floorPlan.length - 1; i > -1; --i) {
    const floorNumTemplate = `<small class="floorNumber">${i}</small>`;
    let buttonList = "";
    switch (i) {
      case floorPlan.length - 1:
        buttonList = upButtonList;
        break;
      case 0:
        buttonList = downButtonList;
        break;
      default:
        buttonList = normalButtonList;
        break;
    }
    const liftPackageArrTemplate = generateLiftPackageArrTemplate(
      floorPlan[i],
      buttonList
    );
    floors += `<div class="line">${floorNumTemplate}${liftPackageArrTemplate}</div>`;
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
