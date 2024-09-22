// Get references to key DOM elements: main board, scoreboards, and reset button
const mainBoard = document.querySelector(".main-board");
const scoreBoardX = document.querySelector(".score-x");
const scoreBoardO = document.querySelector(".score-o");
const scoreBoardTies = document.querySelector(".score-ties");
const resetButton = document.getElementById("reset-button");

// Initialize variables: current player, score, and board states
let currentPlayer = randomPlayer();
// Initialize the scores object to track the number of wins for each player and ties
let scores = {
      X: 0,    // Number of wins for player X
      O: 0,    // Number of wins for player O
      ties: 0  // Number of ties in the game
};
// Initialize the main board state as an array with 9 empty strings
let mainBoardState = ["", "", "", "", "", "", "", "", ""];  // Represents the state of the main board (9 mini-boards)
// Initialize the states of all mini-boards as a 2D array
let miniBoardStates = Array(9).fill(null).map(() => Array(9).fill(""));
// This creates an array with 9 mini-boards, 
// each containing an array of 9 cells initialized to empty strings
// Example structure:
// [
//   ["", "", "", "", "", "", "", "", ""], // Mini-board 1
//   ["", "", "", "", "", "", "", "", ""], // Mini-board 2
//   ...
//   ["", "", "", "", "", "", "", "", ""]  // Mini-board 9
// ]

// Randomizes the first player
function randomPlayer() {
      if (Math.floor(Math.random() * 2) + 1 == 1) {
            return "X";
      } else return "O";
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
            // The ${} notation is part of a feature in JavaScript called template literals, which allow for easier string interpolation.

            // Template literals are enclosed by backticks (`) instead of single (') or double quotes (").
            // They allow for multi-line strings and string interpolation.
            // String Interpolation:

            // Inside a template literal, you can embed expressions using the ${} syntax.
            // The expression inside the ${} is evaluated, and its result is inserted into the string.

            // Backticks: The entire string is enclosed in backticks, allowing the use of interpolation.
            // Expression: ${boardIndex} is the expression being evaluated. It retrieves the value of boardIndex, which represents the index of the current mini-board being created.
            // Result: If, for example, boardIndex is 2, the resulting string would be "Mini Board 2".
            // Usage: This string is then set as the value for the aria-label attribute of the miniBoard, enhancing accessibility by providing a descriptive label for screen readers.
            // The ${} notation allows you to dynamically include values within a string, making it easier to construct strings that include variable data without needing cumbersome string concatenation.

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
                  document.querySelector(`.mini-board[data-board="${miniBoardIndex}"]`).classList.add("tie");
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
                  // Check if every cell in the main board is filled (not an empty string)
                  // The arrow function `state => state !== ""` is used to test each cell.
                  // `every` returns true only if the provided condition is true for all elements in the array.

                  // If all mini-boards are filled and no winner is found, it's a tie
                  alert("It's a tie!");  // Notify players about the tie
                  scores.ties++;         // Increment the tie score
                  updateScores();        // Update the scoreboard to reflect the current scores
                  resetGame();          // Reset the game for a new round
            }
            else {
                  // Switch the current player
                  currentPlayer = currentPlayer === "X" ? "O" : "X";
                  // This line uses the ternary operator to check the current player's symbol.
                  // If currentPlayer is "X", it assigns "O" to currentPlayer.
                  // If currentPlayer is not "X" (meaning it is "O"), it assigns "X" to currentPlayer.
                  // This effectively alternates the current player between "X" and "O".

                  // if (currentPlayer === "X") {
                  //       // If the current player is "X", change currentPlayer to "O"
                  //       currentPlayer = "O";
                  // } else {
                  //       // If the current player is not "X" (meaning it is "O"), change currentPlayer to "X"
                  //       currentPlayer = "X";
                  // }

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

                        // % 2: The modulo operator (%) returns the remainder of the division of the left operand by the right.
                        // When you divide any integer by 2, if the number is even, the remainder will be 0, and if it is odd, the remainder will be 1.

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

                  // Only re-enable cells in boards that are still playable (haven't been won)
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
            [0, 4, 8], [2, 4, 6]              // Diagonals
      ];

      for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (miniBoard[a] === player && miniBoard[b] === player && miniBoard[c] === player) {
                  return true;  // Return immediately if a winner is found
            }
      }
      return false;  // Return false if no winner is found
}

// Check if a player has won the main board
function checkMainBoardWinner(player) {
      const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
      ];

      for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (mainBoardState[a] === player && mainBoardState[b] === player && mainBoardState[c] === player) {
                  return true;  // Return immediately if a winner is found
            }
      }
      return false;  // Return false if no winner is found
}

// Update the displayed scores for both players and ties
function updateScores() {
      scoreBoardX.textContent = `Player X: ${scores.X}`;
      scoreBoardO.textContent = `Player O: ${scores.O}`;
      scoreBoardTies.textContent = `Ties: ${scores.ties}`;

      // The difference between innerHTML and textContent lies in how they handle content in an HTML element:
      // innerHTML
      // Definition: innerHTML allows you to get or set the HTML markup contained within an element.
      // Usage: When you assign a value to innerHTML, you can include HTML tags, and those tags will be interpreted and rendered by the browser.
      // Using innerHTML can introduce security risks, such as Cross-Site Scripting (XSS) attacks, if the content comes from user input. This is because any HTML or script tags will be executed
      // element.innerHTML = "<strong>Hello</strong>";  --> This will render "Hello" as bold text.

      // textContent
      // Definition: textContent gets or sets the text content of an element without any HTML markup.
      // Usage: When you assign a value to textContent, it treats the content as plain text. Any HTML tags will be displayed as text rather than being rendered as HTML.
      // textContent is safer when dealing with user input since it doesn't interpret HTML. This reduces the risk of XSS attacks
      // element.textContent = "<strong>Hello</strong>"; --> This will render the string "<strong>Hello</strong>" literally, showing the tags instead of applying any formatting.
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
