const root = document.querySelector("#root");
const random = document.querySelector("#random");
const grid = document.querySelector("#grid");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
pause.style.display = "none";
let timeOut;
const numRows = 10;
const numColumns = 10;
const cellWidth = 50;
let GRID = [];
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

grid.style.display = "grid";
grid.style.gridTemplateColumns = `repeat(${numColumns},${cellWidth}px)`;

const checkBounds = (i, j) => {
  return i >= 0 && i < numRows && j >= 0 && j < numColumns;
};

const checkNeighbours = () => {};

const runGame = () => {
  let neighbours = 0;
  const NEW_GRID = JSON.parse(JSON.stringify(GRID));
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      operations.forEach(([x, y]) => {
        const newI = i + x;
        const newJ = j + y;
        if (checkBounds(newI, newJ)) {
          neighbours += NEW_GRID[newI][newJ];
        }
      });
      if (neighbours < 2 || neighbours > 3) {
        cell.style.background = "#fff";
        GRID[i][j] = 0;
      } else if (NEW_GRID[i][j] === 0 && neighbours === 3) {
        cell.style.background = "#555";
        GRID[i][j] = 1;
      }
      neighbours = 0;
    }
  }
  timeOut = setTimeout(runGame, 500);
};

const generateRandom = () => {
  GRID = [];
  for (let i = 0; i < numRows; i++) {
    GRID.push(
      Array.from(Array(numColumns), () => (Math.random() > 0.8 ? 1 : 0))
    );
  }
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      if (GRID[i][j]) {
        cell.setAttribute("data", 1);
        cell.style.background = "#555";
      } else {
        cell.setAttribute("data", 0);
        cell.style.background = "#fff";
      }
    }
  }
};

const toggleCell = (cell) => {
  const i = parseInt(cell.getAttribute("id").split("-")[0]);
  const j = parseInt(cell.getAttribute("id").split("-")[1]);
  if (!cell.getAttribute("data") || cell.getAttribute("data") == "0") {
    GRID[i][j] = 1;
    cell.setAttribute("data", 1);
    cell.style.background = "#555";
  } else {
    GRID[i][j] = 0;
    cell.setAttribute("data", 0);
    cell.style.background = "#fff";
  }
};

const createGrid = () => {
  GRID = [];
  root.innerHTML = "";
  for (let i = 0; i < numRows; i++) {
    GRID.push(Array.from(Array(numColumns), () => 0));
  }
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numColumns; j++) {
      const cell = document.createElement("div");
      cell.style.width = `${cellWidth}px`;
      cell.style.height = `${cellWidth}px`;
      cell.setAttribute("id", `${i}-${j}`);
      cell.onclick = (e) => {
        e.preventDefault();
        toggleCell(cell);
      };
      cell.classList.add("cell");
      grid.append(cell);
    }
  }
  root.append(grid);
};

window.onload = () => {
  createGrid();
  random.onclick = (e) => {
    e.preventDefault();
    generateRandom();
  };
  play.onclick = (e) => {
    e.preventDefault();
    play.style.display = "none";
    pause.style.display = "inline-block";
    runGame();
  };
  pause.onclick = (e) => {
    e.preventDefault();
    pause.style.display = "none";
    play.style.display = "inline-block";
    clearTimeout(timeOut);
  };
};
