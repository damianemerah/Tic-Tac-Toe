const cells = document.querySelectorAll(".cell");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");
const restartBtn = document.querySelector("button");
const h1 = document.querySelector("h1");
const cellWidth = cells[0].clientWidth;
const cellHeight = cells[0].clientHeight;

console.log(cellWidth, cellHeight);

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""]; //Number of plays per round

let currentPlayer = "X";
let running = false;
let roundWon;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", cellClicked);
  });

  restartBtn.addEventListener("click", restartGame);

  p1.classList.add("active");
  running = true;
  roundWon = false;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) return;

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayers() {
  if (currentPlayer == "X") {
    if (roundWon) {
      p1.textContent = "WON";
    }
    currentPlayer = "O";
    p2.classList.add("active");
    p1.classList.remove("active");
  } else {
    currentPlayer = "X";
    p1.classList.add("active");
    p2.classList.remove("active");
    if (roundWon) {
      p2.textContent = "WON";
    }
  }
}

function checkWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];

    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    } else if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      running = false;
      break;
    }
  }

  if (!options.includes("")) {
    h1.textContent = "Draw";
    running = false;
  } else {
    changePlayers();
  }
}

function restartGame() {
  running = true;
  roundWon = false;
  p1.classList.add("active");
  p2.classList.remove("active");
  p1.textContent = "0";
  p2.textContent = "0";
  h1.textContent = "TIC TAC TOE";
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";

  cells.forEach((cell) => {
    cell.textContent = "";
  });
}
