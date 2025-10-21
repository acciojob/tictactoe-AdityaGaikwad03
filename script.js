const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");

const playerInputSection = document.getElementById("player-input");
const gameBoardSection = document.getElementById("game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1, player2;
let currentPlayer;
let currentSymbol = "X";
let board = Array(9).fill("");
let gameOver = false;

// Start game when players enter names
submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim() || "Player 1";
  player2 = player2Input.value.trim() || "Player 2";
  currentPlayer = player1;

  playerInputSection.style.display = "none";
  gameBoardSection.style.display = "block";
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

// Handle cell clicks
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (gameOver) return;

    const index = parseInt(cell.id) - 1;
    if (board[index] !== "") return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    const winningCombo = checkWinner();
    if (winningCombo) {
      highlightWinner(winningCombo);
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameOver = true;
      return;
    }

    // Check for draw
    if (board.every((x) => x !== "")) {
      messageDiv.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    // Switch turns
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentSymbol = currentSymbol === "X" ? "O" : "X";
    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

// Function to check for winner
function checkWinner() {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of wins) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [a, b, c]; // return the winning cells
    }
  }
  return null;
}

// Function to highlight winning cells
function highlightWinner(combo) {
  combo.forEach((index) => {
    const cell = document.getElementById((index + 1).toString());
    cell.style.backgroundColor = "#90EE90"; // light green highlight
    cell.style.transition = "background-color 0.3s ease";
  });
}
