import { BasePlayer, Score } from '@/lib/constants';
import { selectRandomElement } from '@/lib/helpers';

import {
  BestOutcome,
  CutBounds,
  Identifier,
  Memo,
  Roles,
  RowColPair,
  TBoard,
  TMark,
  TSequence,
  TSquareColor,
  Winner,
} from './types';

/* ==========================================================================================
 * ============================= Winning Condition Verification =============================
 * ========================================================================================== */

/**
 * 보드의 모든 위치를 검사하면 보드가 커질수록 비효율적이므로,
 * 마지막 놓았던 위치부터 가로, 세로, 대각선 방향으로 winCondition 만큼 검사
 * */
export const evaluateWinning = (
  board: TBoard,
  winCondition: number,
  lastIndex: number,
  identifier: BasePlayer | null = null,
  resultType: 'position' | 'winner' = 'position',
) => {
  const player = identifier ?? board[lastIndex].identifier;
  if (!player) return null;

  const size = getBoardSize(board);
  const { row: lastRow, col: lastCol } = getCoordinates(lastIndex, size);

  const directions = [
    { deltaRow: 0, deltaCol: 1 }, // 가로
    { deltaRow: 1, deltaCol: 0 }, // 세로
    { deltaRow: 1, deltaCol: 1 }, // 우하 대각선
    { deltaRow: 1, deltaCol: -1 }, // 좌하 대각선
  ];

  for (const { deltaRow, deltaCol } of directions) {
    const winningIndexes = checkDirection(
      board,
      winCondition,
      player,
      size,
      { lastRow, lastCol },
      { deltaRow, deltaCol },
    );

    // 승리한 위치의 인덱스 배열 반환
    if (winningIndexes) {
      if (resultType === 'winner') return player;
      else return winningIndexes.map(({ row, col }) => getLinearIndex(row, col, size));
    }
  }

  return null;
};

const checkDirection = (
  board: TBoard,
  winCondition: number,
  identifier: BasePlayer,
  size: number,
  { lastRow, lastCol }: RowColPair<'lastRow' | 'lastCol'>,
  { deltaRow, deltaCol }: RowColPair<'deltaRow' | 'deltaCol'>,
) => {
  const searchDirection = (deltaRow: number, deltaCol: number) => {
    const winningIndexes = [];

    // 마지막 놓았던 위치는 제외하기 위해 i = 1 부터 시작
    for (let i = 1; i < winCondition; i++) {
      const curRow = i * deltaRow + lastRow;
      const curCol = i * deltaCol + lastCol;

      // 보드 범위를 벗어났으면 검사 중지
      if (!isWithinBounds(size, curRow, curCol)) break;
      // 기호가 일치하지 않으면 검사 중지
      if (getIdentifierFromRowCol(board, size, curRow, curCol) !== identifier) break;

      winningIndexes.push({ row: curRow, col: curCol });
    }

    return winningIndexes;
  };

  // 양쪽 방향으로 연속된 마크 검사
  const forwardWinningIndexes = searchDirection(deltaRow, deltaCol);
  const backwardWinningIndexes = searchDirection(-deltaRow, -deltaCol);

  const combinedIndexes = [{ row: lastRow, col: lastCol }]; // 마지막 놓았던 위치 저장
  combinedIndexes.push(...forwardWinningIndexes, ...backwardWinningIndexes);

  return combinedIndexes.length >= winCondition ? combinedIndexes : null;
};

/* ==========================================================================================
 * ================================ Best Move Calculation ===================================
 * ========================================================================================== */

export const findBestMoveIdx = (board: TBoard, winCondition: number, player: BasePlayer) => {
  const opponent = getOpponent(player);
  const size = getBoardSize(board);

  // 승리 위치 탐색
  const bestMove = getFirstBestMoveIdx(board, winCondition, player);
  if (bestMove !== null) return bestMove;

  // 방어 위치 탐색
  const minDefenseCondition = winCondition - 2;
  // 연속된 기호가 배열될 수 있는 최소 길이부터 승리 조건까지의 범위. e.g. 승리 조건 4, 최소 방어 조건 2 -> 범위는 3 (2, 3, 4)
  const defenseRange = winCondition - minDefenseCondition + 1;
  // 계산된 범위에 따라 내림차순으로 방어 조건 배열 생성. e.g. 승리 조건 4 -> [4, 3, 2]
  const defenseConditions = Array.from({ length: defenseRange }, (_, i) => winCondition - i);

  for (const condition of defenseConditions) {
    const defenseMove = getFirstBestMoveIdx(board, condition, opponent);
    if (defenseMove !== null) return defenseMove;
    // 보드 크기와 승리 조건이 같다면 보드 전체를 채워야만 승리할 수 있으므로 이보다 작은 승리조건은 검사할 필요가 없다
    if (condition === size) break;
  }

  // 중앙, 모서리, 빈칸 중 임의 선택. 모든 칸이 다 찼으면 null 반환
  return chooseStrategicPosition(board, size);
};

const getFirstBestMoveIdx = (board: TBoard, winCondition: number, player: BasePlayer) => {
  const idx = board.findIndex((cell, i) => {
    if (cell.identifier === null) {
      const winningIndexes = evaluateWinning(board, winCondition, i, player);
      return winningIndexes !== null;
    }
    return false;
  });

  return idx !== -1 ? idx : null;
};

const chooseStrategicPosition = (board: TBoard, size: number) => {
  const availableMoves = getAvailableMoves(board);

  if (availableMoves.size === 0) return null;

  // 3x3 보드는 중앙, 모서리를 먼저 선점하는게 게임 승리에 유리함
  if (size === 3) {
    const centerIdx = getCenterIndexes(size);
    const cornerIndexes = getCornerIndexes(size);
    const filtered = [...centerIdx, ...cornerIndexes].filter((idx) => availableMoves.has(idx));
    if (filtered.length > 0) return selectRandomElement(filtered);
  }

  return selectRandomElement([...availableMoves]);
};

/* ==========================================================================================
 * =================================== Index Utilities ======================================
 * ========================================================================================== */

/**
 * 2차원 보드의 row, col 좌표 값을 받아 1차원 보드의 인덱스 반환
 * row * size = row 위치. e.g. 2(row) * 5(size) = 10 (3번째 행 첫번째 열)
 * 계산한 row 위치에서 col 더하면 해당 위치의 인덱스
 * */
const getLinearIndex = (row: number, col: number, size: number) => row * size + col;

/** 1차원 보드의 인덱스를 받아 2차원 보드의 row, col 좌표값 반환 */
export const getCoordinates = (i: number, size: number) => {
  const row = Math.floor(i / size);
  const col = i % size; // 항상 0 ~ (size - 1) 값 반환
  return { row, col };
};

const getCenterIndexes = (size: number) => {
  // 홀수 size 보드
  if (size % 2 !== 0) return [Math.floor((size * size) / 2)];

  // 짝수 size 보드
  const halfSize = size / 2;
  return [
    (halfSize - 1) * size + halfSize - 1, // 중앙 격자 왼쪽 상단
    (halfSize - 1) * size + halfSize, // 중앙 격자 오른쪽 상단
    halfSize * size + halfSize - 1, // 중앙 격자 왼쪽 하단
    halfSize * size + halfSize, // 중앙 격자 오른쪽 하단
  ];
};

const getCornerIndexes = (size: number) => {
  const leftTop = 0;
  const rightTop = size - 1;
  const leftBottom = size * (size - 1);
  const rightBottom = size * size - 1;

  return [leftTop, rightTop, leftBottom, rightBottom];
};

/** row, col 좌표값이 보드 범위 안에 있는지 검사 */
const isWithinBounds = (size: number, row: number, col: number) => {
  return row >= 0 && row < size && col >= 0 && col < size;
};

/* ==========================================================================================
 * ================================== Board Utilities =======================================
 * ========================================================================================== */

/** 1차원 보드에서 row, col 좌표값에 해당하는 기호 조회 */
const getIdentifierFromRowCol = (board: TBoard, size: number, row: number, col: number) => {
  const idx = getLinearIndex(row, col, size);
  return board[idx].identifier;
};

export const getInitialBoard = (size: number): TBoard => {
  return Array.from({ length: size * size }, () => createSquare());
};

export const getOpponent = (player: BasePlayer) => {
  return player === BasePlayer.X ? BasePlayer.O : BasePlayer.X;
};

export const createSquare = (
  identifier: Identifier = null,
  mark: TMark = null,
  sequence: TSequence = null,
  color: TSquareColor = 'transparent',
) => ({
  identifier,
  mark,
  sequence,
  color,
});

export type TGameHistory = ReturnType<typeof createHistory>;
export const createHistory = (board: TBoard, winner: Winner) => ({
  board,
  winner,
  createdAt: new Date().toISOString(),
});

/** 보드 사이즈 조회(row.length) */
export const getBoardSize = (board: TBoard) => {
  const size = Math.sqrt(board.length);
  if (!Number.isInteger(size)) throw new Error('Board is not a perfect square.');

  return size;
};

const getAvailableMoves = (board: TBoard) => {
  return board.reduce((moves, cell, i) => {
    if (cell.identifier === null) moves.add(i);
    return moves;
  }, new Set<number>());
};

const hasAvailableMove = (board: TBoard) => {
  return board.some(({ identifier }) => identifier === null);
};

/* ==========================================================================================
 * ============================== MiniMax, Alpha-Beta Pruning ===============================
 * ========================================================================================== */

/** 자식 노드 평가 결과인 score를 인자로 받아 알파/베타 값 업데이트 */
const updateCutBounds = (cutBounds: CutBounds, score: number, isMaximizing: boolean) => {
  if (isMaximizing) cutBounds.alpha = Math.max(cutBounds.alpha, score);
  else cutBounds.beta = Math.min(cutBounds.beta, score);
};

const isMaximizing = (depth: number) => depth % 2 === 0;

const getMinimaxContext = (depth: number) => {
  const isMax = isMaximizing(depth);
  return {
    isMaximizing: isMax,
    bestScore: isMax ? -Infinity : Infinity,
    compareFn: isMax ? Math.max : Math.min,
  };
};

const getStateKey = (board: TBoard, depth: number) => {
  return `${board.map(({ identifier }) => identifier ?? '-').join('')}:${depth}`;
};

const evaluateMove = (
  board: TBoard,
  winCondition: number,
  depth: number,
  lastIndex: number,
  roles: Roles,
  cutBounds: CutBounds,
  memo: Memo,
): number => {
  board[lastIndex].identifier = isMaximizing(depth) ? roles.player : roles.opponent;
  // minimax 함수를 호출할 때마다 다음 턴으로 넘어가므로 현재 depth 값에 1을 더한다
  // 최대화/최소화 단계에 따라 잘못된 가지치기로 이어지는 것을 방지하기 위해 객체를 복사해서 독립적인 로컬 알파/베타 값 유지
  const score = minimax(board, winCondition, depth + 1, lastIndex, roles, { ...cutBounds }, memo); // Evaluate the board
  board[lastIndex].identifier = null;

  return score;
};

/**
 * The minimax algorithm for determining the best possible move in a game.
 *
 * @param {TBoard} board - the game board
 * @param {number} winCondition - the number of consecutive pieces needed to win (e.g., 3 for a 3x3 board)
 * @param {number} depth - the current depth in the search tree
 * @param {number} lastIndex - the index of the last move made
 * @param {Roles} roles - the roles of the players
 * @param {CutBounds} cutBounds - alpha-beta pruning values
 * @param {Memo} memo - Memoization object to store calculated values
 * @return {number} the best score for the current player
 */
const minimax = (
  board: TBoard,
  winCondition: number,
  depth: number,
  lastIndex: number,
  roles: Roles,
  cutBounds: CutBounds,
  memo: Memo,
): number => {
  const key = getStateKey(board, depth);
  if (memo.has(key)) return memo.get(key)!; // 이미 계산된 상태인지 확인}

  // Check if there is a winner
  const winner = evaluateWinning(board, winCondition, lastIndex, null, 'winner');
  // Return score for winning, losing, or draw (Prefer early wins or late losses)
  if (winner) return winner === roles.player ? Score.Win - depth : Score.Lose + depth;
  if (!hasAvailableMove(board)) return Score.Draw;

  // Initialize bestScore and compare function
  // eslint-disable-next-line prefer-const
  let { isMaximizing, bestScore, compareFn } = getMinimaxContext(depth);

  // Iterate through available moves and calculate scores
  for (let i = 0; i < board.length; i++) {
    if (board[i].identifier === null) {
      const score = evaluateMove(board, winCondition, depth, i, roles, cutBounds, memo);
      bestScore = compareFn(score, bestScore);
      // 자식 노드 평가 결과를 알파/베타 값에 반영
      updateCutBounds(cutBounds, score, isMaximizing);
      // 현재 노드의 최적해를 찾았는지 검사하고, 찾았다면 자식 노드 탐색 중지
      if (cutBounds.alpha >= cutBounds.beta) break;
    }
  }

  memo.set(key, bestScore);
  return bestScore;
};

/**
 * Find the best move index using the MiniMax algorithm.
 *
 * @param {TBoard} board - the game board
 * @param {number} winCondition - the number of consecutive pieces required to win
 * @param {BasePlayer} player - the current player
 * @return {number | null} the index of the best move or null if no move is available
 */
export const findBestMoveIdxMiniMax = (
  board: TBoard,
  winCondition: number,
  player: BasePlayer,
): number | null => {
  // 미니맥스 알고리즘은 일반적으로 최대화 단계부터 시작한다. 함수를 호출하면 최대화 단계가 시작된다
  // 최대화 단계에선 가장 큰 값을 찾기 위해 가장 작은 수(-Infinity)를 기본값으로 설정한다
  const bestOutcome: BestOutcome = { score: -Infinity, move: null };
  const cutBounds = { alpha: -Infinity, beta: Infinity }; // 알파/베타 초기값 설정

  const roles = { player, opponent: getOpponent(player) };
  const depth = 0; // 최대화 단계부터 시작

  const memo: Memo = new Map(); // 메모이제이션 객체 초기화

  for (let i = 0; i < board.length; i++) {
    if (board[i].identifier === null) {
      // 빈 칸을 현재 플레이어 기호로 채운 후 계산된 점수 중 가장 큰 곳의 인덱스를 bestMove 값으로 설정한다
      const score = evaluateMove(board, winCondition, depth, i, roles, cutBounds, memo);

      if (score > bestOutcome.score) {
        bestOutcome.score = score;
        bestOutcome.move = i;
        // 자식 노드 평가 결과를 알파/베타 값에 반영 (업데이트된 값을 자식 노드로 전달해야 하므로)
        updateCutBounds(cutBounds, score, true);
      }
    }
  }

  return bestOutcome.move;
};
