const canvas = document.querySelector("#main-canvas");
const statusCanvas = document.querySelector("#status-canvas");
const secondsCount = document.querySelector(".seconds");
const level = document.querySelector(".grade");
const context = canvas.getContext("2d");
const context2 = statusCanvas.getContext("2d");
const quesoDimensions = { width: 353 * 1.2, height: 325 * 1.2 };
let currentLevel;

const levels = {
  5: "Asistente Junior",
  10: "Asistente Senior",
  15: "Amiguito",
  35: "Cholulo",
  65: "Capitán",
  105: "Acólito",
  150: "Predicador",
  250: "Maestro Adorador",
  450: "Apóstol VIP",
  650: "CEO",
  1000: "Ermitaño",
  1500: "Maestro Hermitaño Senior",
  2500: "Señor Sagrado",
  3500: "Comandante General Supremo",
  4500: "Príncipe",
  10500: "Rey",
  20500: "Gorrión Elevado",
  30500: "Serafín",
  40500: "Querubín",
  50500: "Dios Junior",
  60500: "Dios Senior",
  70500: "Dios Celestial Sagrado",
  80500: "Dios Supremo Absoluto",
  90500: "Requeso",
  500000: "Dios Intradimensional Máximo Requesero del Queso Quesístico",
};

const startTime = Date.now();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
statusCanvas.width = window.innerWidth / 2;
statusCanvas.height = 120;

context.translate(window.innerWidth / 2, window.innerHeight / 2);

const image = new Image();
image.src = "./assets/queso.png";

const loopingQuesos = 40;
const offsetDistance = 120;
let currentOffset = 0;

const movementRange = 200;

const mouseOffset = {
  x: 0,
  y: 0,
};

const movementOffset = {
  x: 0,
  y: 0,
};

image.onload = () => {
  startLooping();
};

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.setTransform(1, 0, 0, 1, 0, 0); //Reset the canvas context
  context.translate(window.innerWidth / 2, window.innerHeight / 2);
};

window.addEventListener("mousemove", onMouseMove);

function draw(offset, loopCount) {
  let currentPercentage = (loopingQuesos - loopCount) / loopingQuesos;
  context.drawImage(
    image,
    -quesoDimensions.width / 2 -
      offset / 2 +
      movementOffset.x * currentPercentage,
    -quesoDimensions.height / 2 -
      offset / 2 +
      movementOffset.y * currentPercentage,
    quesoDimensions.width + offset,
    quesoDimensions.height + offset
  );
}

function onMouseMove(e) {
  mouseOffset.x =
    ((e.clientX - window.innerWidth / 2) / window.innerWidth / 2) *
    movementRange;
  mouseOffset.y =
    ((e.clientY - window.innerHeight / 2) / window.innerHeight / 2) *
    movementRange;
}

function lerp(start, end, amount) {
  return start * (1 - amount) + end * amount;
}

function loopDraw() {
  movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.05);
  movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.05);

  for (let i = loopingQuesos; i >= 1; i--) {
    draw(i * offsetDistance + currentOffset, i);
  }

  draw(offsetDistance, 1);

  currentOffset++;
  if (currentOffset >= offsetDistance) {
    currentOffset = 0;
  }

  const newTime = Math.floor((Date.now() - startTime) / 1000);

  if (levels[newTime]) {
    currentLevel = levels[newTime];
  }
  if (newTime < 5) currentLevel = levels[5];

  context2.clearRect(0, 0, statusCanvas.width, statusCanvas.height);
  context2.font = "20px monospace";
  context2.fillStyle = "#FFFFFF";
  context2.shadowOffsetX = 3;
  context2.shadowOffsetY = 3;
  context2.shadowBlur = 4;
  context2.shadowColor = "rgba(0,0,0,0.3)";
  context2.fillText(
    `Has honrado al queso por ${newTime} segundos`,
    15,
    50,
    statusCanvas.width
  );
  context2.fillText(
    `Sos un ${currentLevel} del queso`,
    15,
    75,
    statusCanvas.width
  );
  context2.fill();

  requestAnimationFrame(loopDraw);
}

function startLooping() {
  requestAnimationFrame(loopDraw);
}
