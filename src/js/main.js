const floorPlan = [];

function getButtonList(floorNumber, floorCount) {
  // if floorNumber = floorCount - 1
  const upButtonList = `<ul class="button-list"><button class="hidden">u</button><button onclick=${callToFloor(
    floorNumber
  )}>d</button></ul>`;
  // else if floorNumber = 0
  const downButtonList = `<ul class="button-list"><button onclick=${callToFloor(
    floorNumber
  )}>u</button><button class="hidden">d</button></ul>`;
  // else
  const normalButtonList = `<ul class="button-list"><button onclick=${callToFloor(
    floorNumber
  )}>u</button><button onclick=${callToFloor(floorNumber)}>d</button></ul>`;

  let buttonList = "";
  switch (floorCount) {
    case floorCount - 1:
      buttonList = upButtonList;
      break;
    case 0:
      buttonList = downButtonList;
      break;
    default:
      buttonList = normalButtonList;
      break;
  }
  return buttonList;
}

function getLift(liftId) {
  return `<div class="lift" id=lift${liftId}></div>`;
}

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

function generateLiftPackageArrTemplate(floorNum, currentFloor, buttonList) {
  let liftPackageArr = `<ul class="lift-array">`;
  for (let j = 0; j < currentFloor.length; ++j) {
    // generating lift plan
    let liftPackage = `<ul class="lift-package">`;
    liftPackage += buttonList;
    liftPackage += currentFloor[j] === 1 ? getLift(`${floorNum}${j}`) : ``;
    liftPackage += `</ul>`;
    liftPackageArr += liftPackage;
  }
  liftPackageArr += `</ul>`;
  return liftPackageArr;
}

function callToFloor(floorNumber) {
  // diff between bottom of lift and bottom of floor line
  // move lift down by diff
  // transition 1s
}

function generateUI() {
  let floors = "";
  for (let i = floorPlan.length - 1; i > -1; --i) {
    const floorNumTemplate = `<small class="floorNumber">${i}</small>`;
    const buttonList = getButtonList(i, floorPlan.length);

    const liftPackageArrTemplate = generateLiftPackageArrTemplate(
      i,
      floorPlan[i],
      buttonList
    );
    floors += `<div class="line" id=${i}>${floorNumTemplate}${liftPackageArrTemplate}</div>`;
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
