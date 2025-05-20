
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let player1Name = '';
let player2Name = '';
let scoreX = 0, scoreO = 0, draws = 0;

// Sound setup
const clickSound = new Audio('click.mp3');
const winSound = new Audio('win.mp3');
const drawSound = new Audio('draw.mp3');

// Confetti function
function fireConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function startGame() {
  player1Name = document.getElementById('player1').value.trim();
  player2Name = document.getElementById('player2').value.trim();
  if (!player1Name || !player2Name) {
    alert('Please enter names for both players!');
    return;
  }

  document.getElementById('playerInput').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'block';
  document.getElementById('nameX').innerText = player1Name + " (X)";
  document.getElementById('nameO').innerText = player2Name + " (O)";
  gameActive = true;
  renderBoard();
}

function renderBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    if (cell) {
      const symbol = document.createElement('div');
      symbol.classList.add('symbol');
      symbol.innerText = cell;
      cellElement.appendChild(symbol);
    }
    cellElement.addEventListener('click', () => handleCellClick(index, cellElement));
    gameBoard.appendChild(cellElement);
  });
}

function handleCellClick(index, cellElement) {
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  clickSound.play();
  renderBoard();
  checkResult();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
  let roundWon = false;
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      gameActive = false;
      highlightWinningCells(combo);
      const winner = currentPlayer === 'X' ? player1Name : player2Name;
      if (currentPlayer === 'X') scoreX++; else scoreO++;
      updateScoreboard();
      document.getElementById('result').innerText = `${winner} Wins! 🎉`;
      winSound.play();
      fireConfetti();
      return;
    }
  }

  if (!roundWon && board.every(cell => cell !== '')) {
    gameActive = false;
    draws++;
    updateScoreboard();
    document.getElementById('result').innerText = "It's a Draw!";
    drawSound.play();
  }
}

function highlightWinningCells(combo) {
  const gameBoard = document.getElementById('gameBoard');
  combo.forEach(i => {
    gameBoard.children[i].classList.add('win');
  });
}

function updateScoreboard() {
  document.getElementById('scoreX').innerText = scoreX;
  document.getElementById('scoreO').innerText = scoreO;
  document.getElementById('draws').innerText = draws;
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  document.getElementById('result').innerText = '';
  renderBoard();
}

function renderBoard() {
  const colors = [
    ["#ff6b6b", "#b91c1c"],
    ["#4ecdc4", "#2a9d8f"],
    ["#ffd60a", "#d4a017"],
    ["#8338ec", "#5a189a"],
    ["#ff006e", "#c70039"],
    ["#06d6a0", "#047552"],
    ["#f48c06", "#dc2f02"],
    ["#7209b7", "#480ca8"],
    ["#f72585", "#c9184a"]
  ];

  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.style.setProperty('--cell-color', colors[index][0]);
    cellElement.style.setProperty('--cell-color-dark', colors[index][1]);

    for (let i = 0; i < 9; i++) {
      const subCell = document.createElement('div');
      subCell.classList.add('sub-cell');
      cellElement.appendChild(subCell);
    }

    if (cell) {
      const symbol = document.createElement('div');
      symbol.classList.add('symbol');
      symbol.innerText = cell;
      cellElement.appendChild(symbol);
    }

    cellElement.addEventListener('click', () => handleCellClick(index, cellElement));
    gameBoard.appendChild(cellElement);
  });
}
