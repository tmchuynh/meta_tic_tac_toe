<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Projects" />

&#xa0;

  <!-- <a href="https://projects.netlify.app">Demo</a> -->
</div>

<h1 align="center">Projects</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/tmchuynh/projects?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/tmchuynh/projects?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/tmchuynh/projects?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/tmchuynh/projects?color=56BEB8">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/tmchuynh/projects?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/tmchuynh/projects?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/tmchuynh/projects?color=56BEB8" /> -->
</p>

<!-- Status -->

<!-- <h4 align="center">
	🚧  Projects 🚀 Under construction...  🚧
</h4>

<hr> -->

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/tmchuynh" target="_blank">Author</a>
</p>

<br>

## :dart: About

**Goal:** Win the game by achieving three mini-Tic Tac Toe victories in a row, column, or diagonal on the main board.

---

### Game Setup

- **Main Board:** Contains 9 mini-Tic Tac Toe boards arranged in a 3x3 grid.
- **Mini-Boards:** Each mini-board is a standard Tic Tac Toe game with 9 cells.

---

### Rules

#### Turn Order

- The game begins with **Player X**.
- Players alternate turns, marking their symbol (**"X"** or **"O"**) in the cells of the mini-boards.

#### Playing a Cell

- **Click a Cell:** Choose a cell in one of the mini-boards to place your symbol.
- **Effect on Main Board:** Your move determines which mini-board your opponent must play in next.

#### Winning a Mini-Board

- **Objective:** Get three of your symbols in a row, column, or diagonal in a mini-board.
- **Effect:** If you win a mini-board, that board on the main board will display your symbol in a large size. The mini-board will no longer accept moves.

#### Winning the Main Board

- **Objective:** Get three of your mini-board victories in a row, column, or diagonal on the main board.
- **Effect:** Winning three mini-boards in a row, column, or diagonal completes the game, and you win overall.

#### Ties

- **Mini-Board Tie:** If all cells in a mini-board are filled without a winner, that mini-board is marked as a tie.
- **Game Tie:** If all mini-boards are filled and there is no overall winner, the game is a tie.

#### Resetting the Game

- **End of Round:** After a win or tie, the game resets for a new round.
- **Scores:** The scoreboard updates to reflect the results.

---

### Strategy Tips

- **Plan Ahead:** Think about not only where you place your symbol but also where you send your opponent to play next.
- **Block Opponents:** Try to place your symbol in cells that will block your opponent from winning a mini-board.
- **Control the Main Board:** Winning mini-boards strategically will help you control the main board and increase your chances of winning the overall game.

---

### Summary

✅ **Make a Move:** Click on a cell to place your symbol and direct your opponent’s next move.
✅ **Win Mini-Boards:** Achieve three in a row in any mini-board to claim it.
✅ **Win the Game:** Align three mini-board victories in a row, column, or diagonal on the main board.
✅ **Reset:** The game restarts after a win or tie, with updated scores.

## :sparkles: Features

:heavy_check_mark: Feature 1;\
:heavy_check_mark: Feature 2;\
:heavy_check_mark: Feature 3;

## :rocket: Technologies

The following tools were used in this project:

- [Expo](https://expo.io/)
- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting

```bash
# Clone this project
$ git clone https://github.com/tmchuynh/projects

# Access
$ cd projects

# Install dependencies
$ yarn

# Run the project
$ yarn start

# The server will initialize in the <http://localhost:3000>
```

## :memo: License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.

Made with :heart: by <a href="https://github.com/tmchuynh" target="_blank">Tina Huynh</a>

&#xa0;

<a href="#top">Back to top</a>
