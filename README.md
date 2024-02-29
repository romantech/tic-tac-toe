# Tic-Tac-Toe

![open-graph](https://github.com/romantech/tic-tac-toe/assets/8604840/a8340503-3d72-4096-b1b7-fd6ebe5af5cf)

> Customizable Tic-Tac-Toe game built with React

Tic-Tac-Toe, the classic board game, involves two players taking turns to place their symbols (X or O) on a 3x3 grid, with the goal of aligning three of their marks in a row, column, or diagonal. This project elevates the traditional Tic-Tac-Toe experience by introducing customizable features such as adjustable board sizes, customizable winning conditions, and the ability to undo the last move, thus offering a more tailored and engaging gaming experience.

- [Play Game](https://tictactoe.romantech.net)
- [Implementation Details Korean Ver.](https://colorfilter.notion.site/TIL-Tic-Tac-Toe-47f5b86f257e484983c08e2fab68d286?pvs=4)

## TOC

- [Stack](#stack)
- [Features](#features)
- [Implementation Details](#implementation-details)
- [Screenshots](#screenshots)

## Stack

- Core: React + TypeScript
- State Management: Constate (React Context API)
- Styling: Tailwind CSS + clsx
- Form Management: React Hook Form + Zod

## Features

- Adjustable Board Size
- Customizable Winning Conditions
- Choice between Single or Dual Play Modes
- Selection of Markers, Colors, and Turn Sequencing
- Tracking and Review of Gameplay History
- Ability to Undo the Last Move

## Implementation Details

- [Win Condition Evaluation](#win-condition-evaluation)
  - [Basic](#basic)
  - [Advanced](#advanced)
- [Finding the Best Move](#finding-the-best-move)
  - [Searching for Winning Positions](#searching-for-winning-positions)
  - [Searching for Defensive Positions](#searching-for-defensive-positions)

### Win Condition Evaluation

#### Basic

![Untitled](https://github.com/romantech/tic-tac-toe/assets/8604840/1e63145d-8f38-4d82-9c27-044b391583c7)

The basic method for determining win conditions involves storing potential winning combinations as indices in a two-dimensional array and matching these against the current board state. With a 3x3 grid, there are eight possible win scenarios—three rows, three columns, and two diagonals. This technique, as outlined in the [React official documentation's Tic-Tac-Toe tutorial](https://react.dev/learn/tutorial-tic-tac-toe#declaring-a-winner), is straightforward but limited to static board sizes and win conditions.

```tsx
function calculateWinner(board: number[]) {
  const lines = [
    [0, 1, 2], // row 1
    [3, 4, 5], // row 2
    [6, 7, 8], // row 3
    [0, 3, 6], // column 1
    [1, 4, 7], // column 2
    [2, 5, 8], // column 3
    [0, 4, 8], // diagonal 1
    [2, 4, 6], // diagonal 2
  ];

  for (const [a, b, c] of lines) {
    const isLineMatch = board?.[a] === board?.[b] && board?.[a] === board?.[c];
    if (isLineMatch) return board[a]; // 'X' | 'O'
  }

  return null;
}
```

This static approach does not account for varying board sizes or dynamic win conditions, making it less versatile for different game configurations.

#### Advanced

An advanced strategy dynamically checks for win conditions around the most recently placed symbol, accommodating variable board sizes and win conditions. It assesses potential wins in horizontal, vertical, and diagonal directions from the last move.

Consider a 4x4 board with a piece placed at index 10. The win can be checked around this position in all directions:

- Horizontal: [8, 9, 10, 11]
- Vertical: [2, 6, 10, 14]
- Diagonal 1: [0, 5, 10, 15]
- Diagonal 2: [7, 10, 13]

![Untitled](https://github.com/romantech/tic-tac-toe/assets/8604840/d8c74755-b367-44e9-a4b0-f192ad7b7059)

This flexible approach does not require pre-defined win combinations, facilitating adaptation to various game designs.

First, define a `directions` array outlining the four directional checks needed on the board, each characterized by `deltaRow` and `deltaCol` values to indicate row and column changes when moving from one cell to another.

```tsx
const directions = [
  { deltaRow: 0, deltaCol: 1 }, // Horizontal
  { deltaRow: 1, deltaCol: 0 }, // Vertical
  { deltaRow: 1, deltaCol: 1 }, // Downward diagonal
  { deltaRow: 1, deltaCol: -1 }, // Upward diagonal
];
```

Using these directions, the game logic examines consecutive cells from the last placed symbol to determine a win, requiring a specified number of matching symbols in one direction to achieve victory.

```tsx
export const checkWinIndexes = (board: TBoard, winCondition: number, linearIndex: number, player: BasePlayer) => {
  // ...
  for (const { deltaRow, deltaCol } of directions) {
    const winningIndexes = checkDirection(/* ... */);
    // ...
  }
  return null;
};

const checkDirection = (/* ... */) => {
  const searchDirection = (deltaRow: number, deltaCol: number) => {
    const winningIndexes = [];

    // Start from i = 1 to exclude the last placed position
    for (let i = 1; i < winCondition; i++) {
      const currentRow = i * deltaRow + lastRow;
      const currentCol = i * deltaCol + lastCol;

      if (/* ... */) break; // Stop checking if it goes beyond board range or the symbols don't match
      winningIndexes.push({ row: currentRow, col: currentCol });
    }

    return winningIndexes;
  };

  // Check for consecutive marks in both directions
  const forwardWinningIndexes = searchDirection(deltaRow, deltaCol);
  const backwardWinningIndexes = searchDirection(-deltaRow, -deltaCol);
  // ...
};

```

This method calculates potential win paths from the last move, offering a scalable solution for various board configurations and win conditions.

### Finding the Best Move

#### Searching for Winning Positions

The simplest method to search for winning positions is to fill the empty spaces on the current board with the player's symbol and check whether this position meets the win conditions in horizontal, vertical, and diagonal directions based on that position. This approach is straightforward and has the advantage of being able to reuse the win condition check function written above (`checkWinIndexes` function considers the index it receives as the position where the last move was made).

```tsx
const getFirstBestMoveIdx = (board: TBoard, winCondition: number, player: BasePlayer) => {
  const idx = board.findIndex((cell, i) => {
    if (cell.identifier === null) {
      const winningIndexes = checkWinIndexes(board, winCondition, i, player);
      return winningIndexes !== null;
    }
    return false;
  });

  return idx !== -1 ? idx : null;
};

const findBestMoveIdx = (board: TBoard, winCondition: number, player: BasePlayer) => {
  // ...
  const bestMove = getFirstBestMoveIdx(board, winCondition, player);
  if (bestMove !== null) return bestMove;
  // ...
};
```

1. Traverse the board to check if the grid is empty.
2. If the grid is empty, call the `checkWinIndexes` function with the current index and player information.
3. If it meets the win condition, return the current index; otherwise, return `null`.

#### Searching for Defensive Positions

##### Basic

By simply changing the player information, existing logic such as `getFirstBestMoveIdx` can be reused to find defensive positions. Traverse the board using the opponent's symbol to search for places that meet the win conditions, and if a winning spot is found, set it as the defensive position.

```tsx
const findBestMoveIdx = (board: TBoard, winCondition: number, player: BasePlayer) => {
  const opponent = getOpponent(player); // player = 'O' | 'X'
  // ...
  const defenseMove = getFirstBestMoveIdx(board, winCondition, opponent);
  if (defenseMove !== null) return defenseMove;
};
```

##### Advanced

![Untitled](https://github.com/romantech/tic-tac-toe/assets/8604840/49cf7483-2412-4d9b-97ed-09578ecd6ac5)

If the win condition is smaller than the board size (the length of one side of the board), when there are `win condition - 2` consecutive symbols, one must defend one of the ends of this sequence. For example, if the board size is 6 and the win condition is 4, and symbols are placed consecutively at positions 20 and 21, then either position 19 or 22 must be defended. If not defended, the opponent can place their symbol in one of these positions on their next turn to meet the win condition.

```tsx
const findBestMoveIdx = (board: TBoard, winCondition: number, player: BasePlayer) => {
  // ...
  const minDefenseCondition = winCondition - 2;
  const defenseRange = winCondition - minDefenseCondition + 1;
  const defenseConditions = Array.from({ length: defenseRange }, (_, i) => winCondition - i);

  for (const condition of defenseConditions) {
    const defenseMove = getFirstBestMoveIdx(board, condition, opponent);
    if (defenseMove !== null) return defenseMove;
    if (condition === size) break; // If the board size is the same as the win condition, only check for that win condition
  }
  // ...
};
```

To defend against the above situation, an array composed of numbers from `win condition - 2` to the `win condition` is created and checked. Each element represents the length of the consecutive spaces that need to be defended. For example, if the win condition is 4, it checks whether placing a symbol in an empty space results in 4 consecutive symbols.

Moreover, to prioritize defending areas with a larger number of consecutive spaces, the conditions array should be created in descending order. If the board size is 6 and the win condition is 4, the `defenseConditions` array would be `[4, 3, 2]`.

If the board size and the win condition are the same, winning is only possible by filling the entire board. Therefore, it is unnecessary to check for win conditions smaller than the board size. Thus, the loop is stopped with the condition `if (condition === size) break;` to avoid unnecessary checks.

## Screenshots

#### Gameplay GIF

![gameplay](https://github.com/romantech/tic-tac-toe/assets/8604840/fe46607c-c8a3-4f05-9c1d-a0912f2f4577)

#### Home Screen

![mobile-1](https://github.com/romantech/tic-tac-toe/assets/8604840/51d8b01a-9768-4134-ad7b-2f5c52134d20)

#### Game Configuration

![mobile-2](https://github.com/romantech/tic-tac-toe/assets/8604840/ade907fd-b16a-417e-a1f1-207a8d84e84e)

#### Game Screen

![mobile-3](https://github.com/romantech/tic-tac-toe/assets/8604840/43bf3611-58cf-45f0-8f25-b42fc00cc126)

#### Match History

![mobile-4](https://github.com/romantech/tic-tac-toe/assets/8604840/03a30cfe-b1d6-4195-abfb-296b11ca741e)

> Source of game sound effects from [Neave Interactive](https://neave.com)
