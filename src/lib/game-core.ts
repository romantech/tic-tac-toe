import { BasePlayer, Score } from '@/lib/constants';
import { selectRandomElement } from '@/lib/helpers';

import { Identifier, RowColPair, TBoard, TMark, TSequence, TSquareColor, Winner } from './types';

/* ==========================================================================================
 * ============================= Winning Condition Verification =============================
 * ========================================================================================== */

/**
 * 보드의 모든 위치를 검사하면 보드가 커질수록 비효율적이므로,
 * 마지막 놓았던 위치부터 가로, 세로, 대각선 방향으로 winCondition 만큼 검사
 * */
export const checkWinIndexes = (
  board: TBoard,
  winCondition: number,
  lastIndex: number,
  player: BasePlayer,
) => {
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
    if (winningIndexes) return winningIndexes.map(({ row, col }) => getLinearIndex(row, col, size));
  }

  return null;
};

const checkDirection = (
  board: TBoard,
  winCondition: number,
  player: BasePlayer,
  size: number,
  { lastRow, lastCol }: RowColPair<'lastRow' | 'lastCol'>,
  { deltaRow, deltaCol }: RowColPair<'deltaRow' | 'deltaCol'>,
) => {
  const searchDirection = (deltaRow: number, deltaCol: number) => {
    const winningIndexes = [];

    // 마지막 놓았던 위치는 제외하기 위해 i = 1 부터 시작
    for (let i = 1; i < winCondition; i++) {
      const currentRow = i * deltaRow + lastRow;
      const currentCol = i * deltaCol + lastCol;

      // 보드 범위를 벗어났으면 검사 중지
      if (!isWithinBounds(size, currentRow, currentCol)) break;
      // 기호가 일치하지 않으면 검사 중지
      if (getCellIdentifier(board, currentRow, currentCol) !== player) break;

      winningIndexes.push({ row: currentRow, col: currentCol });
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
      const winningIndexes = checkWinIndexes(board, winCondition, i, player);
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
const getCellIdentifier = (board: TBoard, row: number, col: number) => {
  const size = getBoardSize(board);
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
 * ================================== MiniMax Algorithm =====================================
 * ========================================================================================== */

const minimax = (
  board: TBoard,
  winCondition: number,
  depth: number,
  isMaximizing: boolean,
  lastIndex: number,
  player: BasePlayer,
  opponent: BasePlayer,
): number => {
  const evaluatingPlayer = !isMaximizing ? player : opponent;
  const winnerIndices = checkWinIndexes(board, winCondition, lastIndex, evaluatingPlayer);

  // 빠른 승리 혹은 늦은 패배 선호
  if (winnerIndices) return evaluatingPlayer === player ? Score.Win - depth : Score.Lose + depth;
  if (!hasAvailableMove(board)) return Score.Draw;

  let bestScore = isMaximizing ? -Infinity : Infinity;
  const compareFn = isMaximizing ? Math.max : Math.min;
  const nextPlayer = isMaximizing ? player : opponent;

  for (let i = 0; i < board.length; i++) {
    if (board[i].identifier === null) {
      board[i].identifier = nextPlayer;
      const score = minimax(board, winCondition, depth + 1, !isMaximizing, i, player, opponent);
      board[i].identifier = null;
      bestScore = compareFn(score, bestScore);
    }
  }
  return bestScore;
};

export const findBestMoveIdxMiniMax = (
  board: TBoard,
  winCondition: number,
  player: BasePlayer,
): number | null => {
  let bestScore = -Infinity;
  let bestMove = null;
  const opponent = getOpponent(player);

  for (let i = 0; i < board.length; i++) {
    if (board[i].identifier === null) {
      board[i].identifier = player;
      const score = minimax(board, winCondition, 1, false, i, player, opponent);
      board[i].identifier = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
};
