// Get references to key DOM elements: main board, scoreboards, and reset button
const mainBoard = document.querySelector(".main-board");
const scoreBoardX = document.querySelector(".score-x");
const scoreBoardO = document.querySelector(".score-o");
const scoreBoardTies = document.querySelector(".score-ties");
const resetButton = document.getElementById("reset-button");

// Initialize variables: current player, score, and board states
let currentPlayer = randomPlayer();
let scores = { X: 0, O: 0, ties: 0 };  // Track wins and ties
let mainBoardState = ["", "", "", "", "", "", "", "", ""];  // Main board state
let miniBoardStates = Array(9).fill(null).map(() => Array(9).fill(""));  // Mini-board states (9 mini boards, each with 9 cells)

// Randomizes the first player
function randomPlayer() {
      if (Math.floor(Math.random() * 2) + 1 == 1) {
            return "X";
      } else return "O"
}

// When the page loads, dynamically generate 9 mini boards
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
                  cell.addEventListener('click', handleCellClick);  // Attach click event listener to each cell
                  miniBoard.appendChild(cell);
            }

            // Append the mini-board to the main board
            mainBoard.appendChild(miniBoard);
      }
});

// Function to handle cell clicks
function handleCellClick(event) {
      const cell = event.target;  // Get the clicked cell
      const miniBoardIndex = parseInt(cell.closest(".mini-board").dataset.board);  // Get the mini-board index
      const cellIndex = parseInt(cell.dataset.cell);  // Get the clicked cell index

      // Check if the cell is empty and the mini-board is still playable
      if (miniBoardStates[miniBoardIndex][cellIndex] === "" && mainBoardState[miniBoardIndex] === "") {
            miniBoardStates[miniBoardIndex][cellIndex] = currentPlayer;  // Update mini-board state
            cell.textContent = currentPlayer;  // Set the cell's text to the current player's symbol

            // Disable all other mini-boards when a cell in this board is clicked
            disableOtherMiniBoards(miniBoardIndex);

            // Check for a winner on the mini-board
            let miniBoardWinner = "";
            if (checkMiniBoardWinner(miniBoardIndex, currentPlayer)) {
                  miniBoardWinner = currentPlayer;
                  mainBoardState[miniBoardIndex] = currentPlayer;  // Update main board state if mini-board is won
                  document.querySelector(`.mini-board[data-board="${miniBoardIndex}"]`).classList.add("winner");
                  disableCells(miniBoardIndex);  // Disable further clicks on the mini-board
                  displayLargeSymbol(miniBoardIndex, currentPlayer);  // Display large symbol on the mini-board
                  enableAllMiniBoards();  // Re-enable all other mini-boards
            } else if (miniBoardStates[miniBoardIndex].every(cell => cell !== "")) {
                  // If no winner and all cells are filled, mark the mini-board as a tie
                  mainBoardState[miniBoardIndex] = "T";
                  resetMiniBoard(miniBoardIndex);  // Reset the mini-board
                  enableAllMiniBoards();  // Re-enable all other mini-boards
            }

            // Check for a winner on the main board
            if (checkMainBoardWinner(currentPlayer)) {
                  alert(`Player ${currentPlayer} wins the game!`);
                  scores[currentPlayer]++;  // Update score for the winner
                  updateScores();
                  resetGame();  // Reset the entire game
            } else if (mainBoardState.every(state => state !== "")) {
                  // If all mini-boards are filled and no winner, it's a tie
                  alert("It's a tie!");
                  scores.ties++;
                  updateScores();
                  resetGame();
            } else {
                  // Switch to the next player
                  currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
      }
}


// Function to disable all other mini-boards except the one currently in play
function disableOtherMiniBoards(activeBoardIndex) {
      const allMiniBoards = document.querySelectorAll(".mini-board");
      allMiniBoards.forEach((miniBoard, index) => {
            const cells = miniBoard.querySelectorAll(".cell");

            // Disable cells in all mini-boards except the active one
            if (index !== activeBoardIndex && !miniBoard.classList.contains("winner")) {
                  cells.forEach(cell => {
                        cell.style.pointerEvents = "none"; // Disable click events
                        cell.style.cursor = "default"; // Change cursor to default

                        // Check if the mini-board is odd-numbered (nth-child(2n + 1))
                        if ((index + 1) % 2 === 1) {
                              // Apply a different background color for odd mini-boards
                              cell.style.backgroundColor = "var(--odd-bg-color)"; // Custom color for odd mini-boards
                        } else {
                              // Apply the default background color for even mini-boards
                              cell.style.backgroundColor = "var(--default-bg-color)"; // Default background color
                        }
                  });
            } else {
                  // For the active mini-board, reset the cells' background color
                  cells.forEach(cell => {
                        cell.style.pointerEvents = "auto"; // Re-enable click events for the active mini-board
                        cell.style.cursor = "pointer"; // Change cursor back to pointer
                        cell.style.backgroundColor = ""; // Reset background color to default
                  });
            }
      });
}

// Function to enable all mini-boards once a mini-board is finished
function enableAllMiniBoards() {
      const allMiniBoards = document.querySelectorAll(".mini-board");
      allMiniBoards.forEach(miniBoard => {
            const cells = miniBoard.querySelectorAll(".cell");
            cells.forEach(cell => {
                  cell.style.backgroundColor = ""; // Reset background color to default

                  // Only re-enable cells in boards that are still playable (haven't been won or tied)
                  if (!miniBoard.classList.contains("winner")) {
                        cell.style.pointerEvents = "auto"; // Re-enable click events
                        cell.style.cursor = "pointer"; // Set cursor to pointer
                  }
            });
            miniBoard.classList.remove("disabled");  // Remove any visual indicator of disablement
      });
}


// Display a large symbol for the winner of a mini-board
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

// Disable further clicks on a mini-board when it's won or tied
function disableCells(boardIndex) {
      const cells = document.querySelectorAll(`.mini-board[data-board="${boardIndex}"] .cell`);
      cells.forEach(cell => {
            cell.style.pointerEvents = "none";  // Disable click events
            cell.style.cursor = "default";  // Change cursor to default
      });
}

// Check if a player has won a mini-board
function checkMiniBoardWinner(boardIndex, player) {
      const miniBoard = miniBoardStates[boardIndex];  // Get the mini-board state
      const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
      ];
      // Check if the player satisfies any win condition
      return winConditions.some(condition => {
            const [a, b, c] = condition;
            return miniBoard[a] === player && miniBoard[b] === player && miniBoard[c] === player;
      });
}

// Check if a player has won the main board
function checkMainBoardWinner(player) {
      const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
      ];
      // Check if the player satisfies any main board win condition
      return winConditions.some(condition => {
            const [a, b, c] = condition;
            return mainBoardState[a] === player && mainBoardState[b] === player && mainBoardState[c] === player;
      });
}

// Update the displayed scores for both players and ties
function updateScores() {
      scoreBoardX.textContent = `Player X: ${scores.X}`;
      scoreBoardO.textContent = `Player O: ${scores.O}`;
      scoreBoardTies.textContent = `Ties: ${scores.ties}`;
}

// Reset the entire game state and UI
function resetGame() {
      currentPlayer = "X";  // Reset to player X
      mainBoardState = ["", "", "", "", "", "", "", "", ""];  // Clear main board state
      miniBoardStates = Array(9).fill(null).map(() => Array(9).fill(""));  // Clear all mini-board states

      // Clear all cell text content and re-enable clicks
      document.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
            cell.style.pointerEvents = "auto";  // Enable click events
            cell.style.cursor = "pointer";  // Reset cursor
      });

      // Remove winner indications and large symbols
      document.querySelectorAll(".mini-board").forEach(board => {
            board.classList.remove("winner");

            // Remove any large symbols
            board.querySelectorAll(".large-symbol").forEach(symbol => symbol.remove());
      });

      // Update the scoreboard
      updateScores();
}

// Reset a mini-board in case of a tie
function resetMiniBoard(boardIndex) {
      // Clear the mini-board's state
      miniBoardStates[boardIndex] = Array(9).fill("");

      // Clear the mini-board's cells
      const miniBoardCells = document.querySelectorAll(`.mini-board[data-board="${boardIndex}"] .cell`);
      miniBoardCells.forEach(cell => {
            cell.textContent = "";  // Clear text content
            cell.style.pointerEvents = "auto";  // Enable clicks
            cell.style.cursor = "pointer";  // Set cursor to pointer
      });
}

// Attach event listener for the reset button
resetButton.addEventListener("click", resetGame);

// Update scores initially when the page loads
updateScores();
