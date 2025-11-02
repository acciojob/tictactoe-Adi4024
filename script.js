const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const submitBtn = document.getElementById('submit');
const message = document.querySelector('.message');
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'x';
let players = {};
let boardState = Array(9).fill('');

submitBtn.addEventListener('click', () => {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();

  if (!p1 || !p2) return;

  players = { x: p1, o: p2 };
  message.textContent = `${players[currentPlayer]}, you're up`;
  board.classList.remove('hidden');
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.dataset.index;
    if (boardState[index] !== '') return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      message.textContent = `${players[currentPlayer]} congratulations you won!`;
      disableBoard();
    } else {
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
      message.textContent = `${players[currentPlayer]}, you're up`;
    }
  });
});

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern =>
    pattern.every(i => boardState[i] === currentPlayer)
  );
}

function disableBoard() {
  cells.forEach(c => c.style.pointerEvents = 'none');
}
