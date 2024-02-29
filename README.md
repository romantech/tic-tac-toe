# Tic-Tac-Toe

![open-graph](https://github.com/romantech/tic-tac-toe/assets/8604840/a8340503-3d72-4096-b1b7-fd6ebe5af5cf)

- Customizable Tic-Tac-Toe game built with React
- Gameplay link: https://tictactoe.romantech.net

## Stack

- Core: React + TypeScript
- State Management: Constate (React Context API)
- Styling: Tailwind CSS + clsx
- Form Management: React Hook Form + Zod

## Features

- Adjustable Board Size
- Customizable Win Conditions
- Selection of Markers, Colors, and Turn Order
- Gameplay History Tracking and Review
- Option to Undo the Last Move

## Implementation Details

Tic-Tac-Toe is a classic two-player game where participants alternate marking spaces on a 3x3 grid with their respective symbols (X or O), aiming to align three of their marks in a horizontal, vertical, or diagonal row. Each grid space can hold only one symbol. A draw occurs if all spaces are filled without any player achieving this alignment.

### Win Condition Evaluation

#### Basic Approach

![Untitled](https://github.com/romantech/tic-tac-toe/assets/8604840/1e63145d-8f38-4d82-9c27-044b391583c7)

The basic method for determining win conditions involves storing potential winning combinations as indices in a two-dimensional array and matching these against the current board state. With a 3x3 grid, there are eight possible win scenarios—three rows, three columns, and two diagonals. This technique, as outlined in the [React official documentation's Tic-Tac-Toe tutorial](https://react.dev/learn/tutorial-tic-tac-toe#declaring-a-winner), is straightforward but limited to static board sizes and win conditions.

```tsx
function calculateWinner(board: number[]) {
  const lines = [
    [0, 1, 2], // horizontal row 1
    [3, 4, 5], // horizontal row 2
    [6, 7, 8], // horizontal row 3
    [0, 3, 6], // vertical column 1
    [1, 4, 7], // vertical column 2
    [2, 5, 8], // vertical column 3
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

#### Advanced Method

An advanced strategy dynamically checks for win conditions around the most recently placed symbol, accommodating variable board sizes and win conditions. It assesses potential wins in horizontal, vertical, and diagonal directions from the last move.

Consider a 4x4 board with a piece placed at index 10. The win can be checked around this position in all directions:

- Horizontal: [8, 9, 10, 11]
- Vertical: [2, 6, 10, 14]
- Diagonal 1: [0, 5, 10, 15]
- Diagonal 2: [3, 6, 9, 12]

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

## Screenshot

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
