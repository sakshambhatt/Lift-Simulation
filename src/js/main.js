const floorPlan = [];

function getButtonList(floorCount, floorNumber, liftNum) {
  // if floorNumber = floorCount - 1
  const upButtonList = `<ul class="button-list"><button class="hidden">u</button><button onclick="callToFloor(
    ${floorNumber},
    ${liftNum}
  )">d</button></ul>`;
  // else if floorNumber = 0
  const downButtonList = `<ul class="button-list"><button onclick="callToFloor(
    ${floorNumber},
    ${liftNum}
  )">u</button><button class="hidden">d</button></ul>`;
  // else
  const normalButtonList = `<ul class="button-list"><button onclick="callToFloor(
    ${floorNumber},
    ${liftNum}
  )">u</button><button onclick="callToFloor(
    ${floorNumber},
    ${liftNum}
  )">d</button></ul>`;

  let buttonList = "";
  switch (floorNumber) {
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

function getLift(liftNum, visibility) {
  return visibility
    ? `<div class="lift" id=lift${liftNum}></div>`
    : `<div class="lift hidden"></div>`;
}

function getCurrentFloor(liftNum) {
  let currentFloor = 0;
  for (let i; i < floorPlan.length; ++i) {
    currentFloor = floorPlan[i][liftNum] === 1 && i;
  }
  return currentFloor;
}

function setFloorPlan() {
  const floorCount = parseInt(document.getElementById("floors").value);
  const liftCount = parseInt(document.getElementById("lifts").value);
  floorPlan.push(Array(liftCount).fill(1));
  for (let i = 1; i < floorCount; i++) {
    floorPlan.push(Array(liftCount).fill(0));
  }
  // to see currentFloorPlan
  // window.sessionStorage.setItem("floorPlan", JSON.stringify(floorPlan));
}

function generateLiftPackageArrTemplate(floorCount, floorNum, currentFloor) {
  let liftPackageArr = `<ul class="lift-array">`;
  for (let j = 0; j < currentFloor.length; ++j) {
    // generating lift plan
    let liftPackage = `<ul class="lift-package">`;

    const buttonList = getButtonList(floorCount, floorNum, `${j}`);

    liftPackage += buttonList;
    liftPackage +=
      currentFloor[j] === 1 ? getLift(`${j}`, true) : getLift(`${j}`, false);
    liftPackage += `</ul>`;
    liftPackageArr += liftPackage;
  }
  liftPackageArr += `</ul>`;
  return liftPackageArr;
}

function callToFloor(desiredFloorNum, liftNum) {
  // desired floor's floorLine element
  const desiredFloorLineRect = document
    .getElementById(desiredFloorNum)
    .getBoundingClientRect();

  // currentFloor's floorLine element
  const currentFloorNum = getCurrentFloor(liftNum);
  const currentFloorLineRect = document
    .getElementById(currentFloorNum)
    .getBoundingClientRect();

  // diff between bottoms of currentFloorLine and desiredFloorLine
  const diff = -1 * (currentFloorLineRect.bottom - desiredFloorLineRect.bottom);

  // lift element of lifId
  const liftElement = document.getElementById(`lift${liftNum}`);

  // move lift
  liftElement.style.setProperty("transform", `translate(0, ${diff}px)`);
}

function generateUI() {
  let floors = "";
  for (let i = floorPlan.length - 1; i > -1; --i) {
    const floorNumTemplate = `<small class="floorNumber">${i}</small>`;

    const liftPackageArrTemplate = generateLiftPackageArrTemplate(
      floorPlan.length,
      i,
      floorPlan[i]
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
