const mainBoard = document.querySelector(".main-board");
const scoreBoardX = document.querySelector(".score-x");
const scoreBoardO = document.querySelector(".score-o");
const scoreBoardTies = document.querySelector(".score-ties");
const resetButton = document.getElementById("reset-button");

// Select all the HTML elements with the class 'cell' (representing each square in the Tic Tac Toe board)
const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let scores = { X: 0, O: 0, ties: 0 };
let mainBoardState = ["", "", "", "", "", "", "", "", ""];
let miniBoardStates = Array(9).fill(null).map(() => Array(9).fill(""));

document.addEventListener("DOMContentLoaded", function () {
      const mainBoard = document.getElementById("main-board");
      const numBoards = 9;
      const numCells = 9;

      // Generate 9 mini-boards dynamically
      for (let boardIndex = 0; boardIndex < numBoards; boardIndex++) {
            // Create a mini-board container
            const miniBoard = document.createElement("article");
            miniBoard.classList.add("mini-board");
            miniBoard.setAttribute("data-board", boardIndex);
            miniBoard.setAttribute("aria-label", `Mini Board ${boardIndex}`);

            // Generate 9 cells for each mini-board
            for (let cellIndex = 0; cellIndex < numCells; cellIndex++) {
                  const cell = document.createElement("button");
                  cell.classList.add("cell");
                  cell.setAttribute("data-cell", cellIndex);
                  cell.setAttribute("aria-label", `Cell ${cellIndex}`);
                  cell.addEventListener('click', handleCellClick);

                  miniBoard.appendChild(cell);
            }

            // Append the mini-board to the main board
            mainBoard.appendChild(miniBoard);
      }
});


function handleCellClick(event) {
      const cell = event.target;
      const miniBoardIndex = parseInt(cell.closest(".mini-board").dataset.board);
      const cellIndex = parseInt(cell.dataset.cell);

      if (miniBoardStates[miniBoardIndex][cellIndex] === "" && mainBoardState[miniBoardIndex] === "") {
            miniBoardStates[miniBoardIndex][cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;

            let miniBoardWinner = "";
            if (checkMiniBoardWinner(miniBoardIndex, currentPlayer)) {
                  miniBoardWinner = currentPlayer;
                  mainBoardState[miniBoardIndex] = currentPlayer;
                  document.querySelector(`.mini-board[data-board="${miniBoardIndex}"]`).classList.add("winner");
                  disableCells(miniBoardIndex);
                  displayLargeSymbol(miniBoardIndex, currentPlayer); // Display large symbol
            } else if (miniBoardStates[miniBoardIndex].every(cell => cell !== "")) {
                  mainBoardState[miniBoardIndex] = "T";
            }

            if (checkMainBoardWinner(currentPlayer)) {
                  alert(`Player ${currentPlayer} wins the game!`);
                  scores[currentPlayer]++;
                  updateScores();
                  resetGame();
            } else if (mainBoardState.every(state => state !== "")) {
                  alert("It's a tie!");
                  scores.ties++;
                  updateScores();
                  resetGame();
            } else {
                  currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
      }
}

function displayLargeSymbol(boardIndex, player) {
      const miniBoard = document.querySelector(`.mini-board[data-board="${boardIndex}"]`);
      // Remove any existing large symbol
      const existingLargeSymbol = miniBoard.querySelector(".large-symbol");
      if (existingLargeSymbol) {
            existingLargeSymbol.remove();
      }

      // Create and append the large symbol
      const largeSymbol = document.createElement("div");
      largeSymbol.classList.add("large-symbol");
      largeSymbol.textContent = player;
      miniBoard.appendChild(largeSymbol);
}

function disableCells(boardIndex) {
      const cells = document.querySelectorAll(`.mini-board[data-board="${boardIndex}"] .cell`);
      cells.forEach(cell => {
            cell.style.pointerEvents = "none";
            cell.style.cursor = "default";
      });
}

function checkMiniBoardWinner(boardIndex, player) {
      const miniBoard = miniBoardStates[boardIndex];
      const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
      ];
      return winConditions.some(condition => {
            const [a, b, c] = condition;
            return miniBoard[a] === player && miniBoard[b] === player && miniBoard[c] === player;
      });
}

function checkMainBoardWinner(player) {
      const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
      ];
      return winConditions.some(condition => {
            const [a, b, c] = condition;
            return mainBoardState[a] === player && mainBoardState[b] === player && mainBoardState[c] === player;
      });
}

function updateScores() {
      scoreBoardX.textContent = `Player X: ${scores.X}`;
      scoreBoardO.textContent = `Player O: ${scores.O}`;
      scoreBoardTies.textContent = `Ties: ${scores.ties}`;
}

function resetGame() {
      // Reset the game state
      currentPlayer = "X";
      mainBoardState = ["", "", "", "", "", "", "", "", ""];
      miniBoardStates = Array(9).fill(null).map(() => Array(9).fill(""));

      // Clear all cell text content
      document.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
            cell.style.pointerEvents = "auto"; // Re-enable click events
            cell.style.cursor = "pointer"; // Reset cursor to pointer
            cell.classList.remove("disabled"); // Remove any disabled class if applied
      });

      // Remove winner indication and large symbols
      document.querySelectorAll(".mini-board").forEach(board => {
            board.classList.remove("winner");

            // Remove any large symbols
            board.querySelectorAll(".large-symbol").forEach(symbol => symbol.remove());
      });

      // Update the scoreboard
      updateScores();
}



mainBoard.addEventListener("click", handleCellClick);
resetButton.addEventListener("click", resetGame);

updateScores();