# **Meta Tic Tac Toe**

Meta Tic Tac Toe is an advanced and strategic variation of the classic Tic Tac Toe game, where each move affects not just a single board but the entire game. Players must think several steps ahead, control multiple boards, and anticipate their opponent’s strategy. This README provides details on how to play, game rules, features, and installation instructions.

---

## **Features & Use Cases**
✅ **Multi-Board Gameplay:** Play across **9 mini-Tic Tac Toe boards** within a **larger main board**.  
✅ **Dynamic Move System:** Your move determines where your opponent plays next.  
✅ **Strategic Depth:** Think beyond a single board—plan for **both local and global wins**.  
✅ **Winning Streaks:** Win **three mini-boards in a row, column, or diagonal** to claim victory.  
✅ **Interactive UI:** Easy-to-use interface with responsive design for seamless gameplay.  
✅ **Score Tracking:** Keep track of wins, ties, and game history.  
✅ **Playable with Friends:** Enjoy head-to-head competitive play with a friend.  

---

## **How to Play Meta Tic Tac Toe**

### **Objective**
The goal of Meta Tic Tac Toe is to **win the main board** by securing **three mini-board victories** in a row, column, or diagonal.

---

### **Game Setup**
- **Main Board:** The game consists of a **3x3 grid of mini-Tic Tac Toe boards**, totaling **9 smaller Tic Tac Toe games**.
- **Mini-Boards:** Each mini-board is a **standard Tic Tac Toe board** with **9 individual cells** where players place their moves.
- **Player Symbols:** Players take turns placing their respective marks (**"X"** or **"O"**) on the mini-boards.

---

## **Rules and Gameplay**

### **Turn Order**
- The game begins with **Player X** making the first move.
- Players take turns alternately, marking their symbol (**"X"** or **"O"**) on the cells of the mini-boards.

### **Playing a Cell**
- **Choose a Cell:** Click on a cell in an active mini-board to place your symbol.
- **Effect on the Main Board:** The cell you choose **dictates which mini-board your opponent must play in next**.
  - Example: If Player X places their mark in the **top-right** cell of a mini-board, **Player O must play in the top-right mini-board** on their turn.
- **Locked Mini-Boards:** If the designated mini-board is **already won or filled**, the opponent can choose any open mini-board to play in.

### **Winning a Mini-Board**
- **Objective:** A player wins a mini-board by getting **three of their marks in a row, column, or diagonal**.
- **Effect on the Main Board:**
  - The **entire mini-board is claimed** by the winning player and represented by a **large "X" or "O"** on the main board.
  - Once won, the mini-board is **locked** and no further moves can be made within it.

### **Winning the Main Board**
- **Objective:** The first player to **win three mini-boards in a row, column, or diagonal** on the **main board** wins the game.
- **Victory Condition:** Once three mini-boards are aligned in a straight line, the game **immediately ends**, and the winning player is declared.

### **Ties**
- **Mini-Board Tie:** If all **9 cells in a mini-board** are filled without a winner, that mini-board is **marked as a tie** and is left blank on the main board.
- **Game Tie:** If **all 9 mini-boards** are either won or tied and no player has aligned three wins in a row, the **game ends in a draw**.

### **Resetting the Game**
- **End of Round:** Once a player wins or the game ends in a tie, the board resets for a new round.
- **Score Updates:** The scoreboard tracks **the number of wins** for each player throughout multiple rounds.

---

## **Strategy Tips**
To excel at Meta Tic Tac Toe, you need to think strategically and plan several moves ahead.

- **Plan Ahead:** Always consider how your move will affect your opponent’s next move.
  - Example: If you place your move in a specific cell, your opponent will be forced to play in the corresponding mini-board—use this to your advantage.
  
- **Block Your Opponent:** Prevent your opponent from securing three mini-boards in a row by **strategically placing your moves** in contested areas.

- **Control Key Mini-Boards:** Some mini-boards are more valuable than others—focus on winning **center and corner mini-boards**, as they contribute to multiple winning lines.

- **Force Your Opponent into Bad Positions:** Make moves that **limit their options**, directing them toward a mini-board that puts them at a disadvantage.

- **Adapt to the Game’s Progress:** If your strategy is failing, adjust your approach. **Flexibility** is key to outmaneuvering your opponent.

---

## **Installation**
You can install Chessboard.js using **npm, yarn, or CDN**.

### **Using npm**
```sh
npm install @chrisoakman/chessboardjs
```
### **Using yarn**
```sh
yarn add @chrisoakman/chessboardjs
```
### **Using CDN**
Add the following link in your HTML file:
```html
<link rel="stylesheet"
      href="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css"
      integrity="sha384-q94+BZtLrkL1/ohfjR8c6L+A6qzNH9R2hBLwyoAfu3i/WCvQjzL2RQJ3uNHDISdU"
      crossorigin="anonymous">
```

---

## **Conclusion**
Meta Tic Tac Toe adds a fascinating layer of strategy to a timeless classic. Mastering this game requires **both tactical awareness and forward-thinking**, making it a perfect challenge for those who love strategy-based games. Think ahead, control the board, and outplay your opponent! 🎯♟️

---
Made with ❤️ by [Tina Huynh](https://github.com/tmchuynh)  
[Back to top](#top)
