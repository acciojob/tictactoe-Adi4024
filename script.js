//your JS code here. If required.
// script.js

// DOM elements
const playerForm = document.getElementById('player-form');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitBtn = document.getElementById('submit');

const messageDiv = document.getElementById('message');
const boardWrapper = document.getElementById('board-wrapper');
const grid = document.getElementById('grid');
const resetBtn = document.getElementById('reset');

const cells = Array.from(document.querySelectorAll('.cell'));

// Game state
let board; // array of 9: 'X','O' or ''
let currentPlayer; // 'X' or 'O'
let playerNames = { X: 'Player 1', O: 'Player 2' };
let gameActive = false;

// Winning combos (indexes based on data-index 0..8)
const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

// Start game handler
submitBtn.addEventListener('click', () => {
  const name1 = player1Input.value.trim();
  const name2 = player2Input.value.trim();

  if (!name1 || !name2) {
    messageDiv.textContent = 'Please enter both player names.';
    return;
  }

  playerNames.X = name1;
  playerNames.O = name2;

  startGame();
});

resetBtn.addEventListener('click', resetAll);

// Initialize game variables and UI
function startGame() {
  board = Array(9).fill('');
  currentPlayer = 'X'; // X always starts
  gameActive = true;

  // clear cells
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('disabled');
    // attach listener if not attached
    cell.removeEventListener('click', onCellClick);
    cell.addEventListener('click', onCellClick);
  });

  // show board, hide form
  boardWrapper.classList.remove('hidden');
  resetBtn.classList.add('hidden');
  playerForm.classList.add('hidden');

  // show initial message
  messageDiv.textContent = `${playerNames[currentPlayer]}, you're up`;
}

// Cell click handler
function onCellClick(e) {
  if (!gameActive) return;

  const cell = e.currentTarget;
  const index = Number(cell.dataset.index);

  if (board[index] !== '') return; // already occupied

  // mark board
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('disabled');

  // check win/draw
  if (checkWin(currentPlayer)) {
    gameActive = false;
    messageDiv.textContent = `${playerNames[currentPlayer]} congratulations you won`;
    endGame();
    return;
  }

  if (board.every(v => v !== '')) {
    gameActive = false;
    messageDiv.textContent = `It's a draw`;
    endGame();
    return;
  }

  // switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  messageDiv.textContent = `${playerNames[currentPlayer]}, you're up`;
}

// Check for win
function checkWin(player) {
  return winningCombos.some(combo => {
    return combo.every(idx => board[idx] === player);
  });
}

// End game UI
function endGame() {
  // disable remaining cells
  cells.forEach(cell => cell.classList.add('disabled'));
  resetBtn.classList.remove('hidden');
}

// Reset everything back to initial view
function resetAll() {
  // clear inputs and UI
  player1Input.value = '';
  player2Input.value = '';
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = false;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('disabled');
    cell.removeEventListener('click', onCellClick);
  });

  boardWrapper.classList.add('hidden');
  playerForm.classList.remove('hidden');
  resetBtn.classList.add('hidden');
  messageDiv.textContent = '';
}
