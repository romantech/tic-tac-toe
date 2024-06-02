# Tic-Tac-Toe

![open-graph](https://github.com/romantech/tic-tac-toe/assets/8604840/a8340503-3d72-4096-b1b7-fd6ebe5af5cf)

> Customizable Tic-Tac-Toe game built with React

Tic-Tac-Toe, the classic board game, involves two players taking turns to place their symbols (X or O) on a 3x3 grid, with the goal of aligning three of their marks in a row, column, or diagonal. This project elevates the traditional Tic-Tac-Toe experience by introducing customizable features such as adjustable board sizes, customizable winning conditions, and the ability to undo the last move, thus offering a more tailored and engaging gaming experience.

- [Play Game](https://tictactoe.romantech.net)
- [Implementation Details Korean Ver.](https://romantech.net/1273)
- [Game Theory Korean Ver.](https://romantech.net/1274)

## TOC

- [Stack](#stack)
- [Features](#features)
- [Game Theory](#game-theory)
  - [Minimax Algorithm](#minimax-algorithm)
  - [Quick Win, Slow Loss](#quick-win-slow-loss)
  - [Alpha-Beta Pruning](#alpha-beta-pruning)
  - [Memoization](#memoization)
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

## Game Theory

### Minimax Algorithm

> [!NOTE]  
> A zero-sum game refers to a game where if one player gains, the other player loses an equal amount.

The minimax algorithm is the most widely used algorithm in zero-sum games for two players, like tic-tac-toe or chess, where it's assumed that all players play their best move. It considers all possible moves to derive a winning strategy. The X player aims to score the highest points for a win, while the O player tries to score the least points to avoid losing, finding the optimal solution in this situation.

<img width="3191" alt="minimax-01" src="https://github.com/romantech/tic-tac-toe/assets/8604840/9d51047c-b810-496e-82ed-2e6ebc0f74ec">

Assuming it's X player's turn and they can choose from indices 1, 4, 5 (zero-based). If X wins, they get +100 points; if O wins, they get -100 points. If all spaces are filled and it's a draw, it's 0 points.

1. If X player chooses index 1 → -100 points
   - Next turn, O player can choose from indices 4, 5
     - If O chooses index 4, O wins, scoring -100 points
     - If O chooses index 5, X wins, scoring +100 points
   - O player will choose index 4 for the least points
2. If X player chooses index 4 → +100 points
3. If X player chooses index 5 → -100 points
   - Next turn, O player can choose from indices 1, 4
     - If O chooses index 1, X wins, scoring +100 points
     - If O chooses index 4, O wins, scoring -100 points
   - O player will choose index 4 for the least points

Through this evaluation, X player concludes that choosing index 4 will maximize their score and secure a win. Thus, the minimax algorithm recursively repeats steps of maximizing one's score and minimizing the opponent's score, evaluating all possible moves to select the best position.

### Quick Win, Slow Loss

#### Quick Win

Let's assume player X can win by choosing either index 0 or 2. Since both indices 0 and 2 have scores of 100, it would ultimately select index 0, the one calculated first. However, choosing index 2 could lead to a victory in fewer turns, making it a better choice than index 0.

> Board illustration without reflecting turn count in the game score

<img width="2991" alt="minimax-02" src="https://github.com/romantech/tic-tac-toe/assets/8604840/f0999cbf-3ab6-44e9-aa0b-9f7127a8499e">

By reflecting turn count in the game score, it can encourage selecting moves that lead to a quick win. Since turn count is equivalent to search depth, the calculation during the maximizing phase can be 100 - depth, and during the minimizing phase, depth - 100. When turn count is considered, index 0 scores 97, and index 2 scores 99, leading the parent node to choose index 2 for the highest score.

> Board illustration with turn count reflected in the game score

<img width="3025" alt="minimax-03" src="https://github.com/romantech/tic-tac-toe/assets/8604840/9951f286-a85b-4a6d-a1cb-f8850e2ff451">

#### Slow Loss

Reflecting turn count in the game score also favors a slower loss. The image below depicts a situation where player X will lose regardless of their move. Without turn count consideration, the scores for indices 0, 2, 3, 4 would all be -100, leading to the selection of index 0, the first calculated. However, by considering turn count, as the game progresses, the opponent's score decreases proportionately, resulting in selecting an index that extends the game as much as possible, thus delaying the loss.

> Board illustration delaying loss by reflecting turn count in the score (omitting some possible moves)

<img width="3209" alt="minimax-04" src="https://github.com/romantech/tic-tac-toe/assets/8604840/3d46b1f9-3f9e-4d13-9b31-c2cb2cbba2a2">

In the image, the opponent's symbols O are consecutively placed at indices 5 and 8. A real human player would likely choose index 2 to block and prevent an immediate loss. Reflecting turn count in the score delays the opponent's victory as much as possible, mimicking how a real person strategizes and plays.

### Alpha-Beta Pruning

The minimax algorithm predicts the outcome by exploring every node of the game tree, but not all nodes need to be examined. Based on the image below, let's assume nodes A → B → C → C1 have been explored, with the C1 node evaluated at -98 points. Depending on the score of the C2 node, two scenarios are conceivable:

<img width="2184" alt="alpha-beta-pruning-01" src="https://github.com/romantech/tic-tac-toe/assets/8604840/c75d6782-fc1b-4178-90c3-772da1524e27">

1. If the C2 node scores (-100) less than C1 (-98):
   - The minimizing phase node C would choose the C2 (-100) node, making its score -100.
   - The maximizing phase root node would then select the child node B (99) with the highest score.
2. If the C2 node scores (100) more than C1 (-98):
   - The minimizing phase node C would choose the C1 (-98) node, making its score -98.
   - The maximizing phase root node would then select the child node B (99) with the highest score.

> Regardless of the C2 node's value, the root node always selects the B node

<img width="3781" alt="alpha-beta-pruning-02" src="https://github.com/romantech/tic-tac-toe/assets/8604840/6646f67b-601e-42d3-b423-0fc8631e357c">

Consequently, regardless of the C2 node's outcome, the root node will always choose the B node. This means the evaluation result of the C2 node has no impact on the selection of the B node. In such cases, exploring the C2 node becomes unnecessary.

Alpha-beta pruning utilizes this principle to enable the minimax algorithm to skip unnecessary explorations by using alpha (α) and beta (β) values to decide whether to explore remaining child nodes:

- α (Alpha): The maximum score the current player has found.
  - Initialized with the smallest number, $-\infty$.
  - Updated only in maximizer nodes.
- β (Beta): The minimum score the opponent player has found.
  - Initialized with the largest number, $+\infty$.
  - Updated only in minimizer nodes.

After evaluating the C1 node, the parent node C's minimum score (beta) becomes -98 points, and the maximizing phase root node will always choose the B node (99) if it cannot find a score higher than its current maximum score (alpha) of 99 points. That is, if the calculated beta value at node C (-98) is less than or equal to the alpha value (99), the root node will always choose the B node.

This implies that if the alpha value is greater than or equal to the beta value ($\alpha \geq \beta$) at any node, it can be considered that the optimal solution for the current node has been found, indicating no further exploration of child nodes is needed.

Alpha and beta values are updated while exploring child nodes as follows:

> Process of updating alpha and beta values while exploring child nodes

<img width="2225" alt="alpha-beta-pruning-03" src="https://github.com/romantech/tic-tac-toe/assets/8604840/ac6fe7d7-1a2f-422f-a99c-0d9737987d88">

1. Root Node: Set initial alpha and beta values → $[-\infty, +\infty]$.
2. Exploring Node A:
   - After exploring sub-nodes (omitted in the image) and returning a score of 97 (back to the root node).
   - The root node, being a maximizer, updates the alpha value from $[-\infty, +\infty]$ to $[97, +\infty]$.
3. Exploring Node B:
   - After exploring sub-nodes (omitted in the image) and returning a score of 99 (back to the root node).
   - The root node, being a maximizer, updates the alpha value from $[97, +\infty]$ to $[99, +\infty]$.
4. Exploring Node C: Receives alpha and beta values $[99, +\infty]$ from its parent.
   - After exploring Node C1 and returning a score of -98 (back to node C).
   - Node C, being a minimizer, updates the beta value from $[99, +\infty]$ to $[99, -98]$.
   - Since the alpha value (99) is greater than the beta value (-98), it skips exploring the next node (C2) — ✂️ Pruning

### Memoization

During a game of tic-tac-toe, it's common for players to reach the same board state through different sequences of moves (refer to the image below). Especially since the minimax algorithm explores all possible moves, it often re-evaluates board states that have been analyzed previously. By storing and reusing the results of previously computed board states, we can significantly reduce duplicate evaluations and thus greatly improve the algorithm's efficiency.

<img width="956" alt="memo" src="https://github.com/romantech/tic-tac-toe/assets/8604840/a9d7486e-e2f0-4b8a-a27c-78707721027c">

- Path A: X in the center → O in the top left → X in the bottom right
- Path B: X in the bottom right → O in the top left → X in the center

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
