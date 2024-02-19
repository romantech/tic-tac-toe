import { BasePlayer, defaultSquare } from '@/lib/constants';
import { selectRandomElement } from '@/lib/helpers';

import { Identifier, TBoard, TMark, TSequence, TSquareColor, Winner } from './types';

/* ==========================================================================================
 * ============================= Winning Condition Verification =============================
 * ========================================================================================== */

/**
 * 보드의 모든 위치를 검사하면 보드가 커질수록 비효율적이므로,
 * 마지막 놓았던 위치부터 가로, 세로, 대각선 방향으로 winCondition 만큼 검사
 * */
export const checkWinIndexes = (
  board: TBoard,
  size: number,
  winCondition: number,
  linearIndex: number,
  player: BasePlayer,
) => {
  const { row: lastRow, col: lastCol } = getCoordinates(linearIndex, size);

  const directions = [
    { deltaRow: 0, deltaCol: 1 }, // 가로
    { deltaRow: 1, deltaCol: 0 }, // 세로
    { deltaRow: 1, deltaCol: 1 }, // 우하 대각선
    { deltaRow: 1, deltaCol: -1 }, // 좌하 대각선
  ];

  for (const { deltaRow, deltaCol } of directions) {
    const winningIndexes = checkDirection(
      board,
      size,
      lastRow,
      lastCol,
      winCondition,
      player,
      deltaRow,
      deltaCol,
    );

    // 승리한 위치의 인덱스 배열 반환
    if (winningIndexes) return winningIndexes.map(({ row, col }) => getLinearIndex(row, col, size));
  }

  return null;
};

const checkDirection = (
  board: TBoard,
  size: number,
  lastRow: number,
  lastCol: number,
  winCondition: number,
  player: BasePlayer,
  deltaRow: number,
  deltaCol: number,
) => {
  const winningIndexes = [{ row: lastRow, col: lastCol }]; // 승리한 위치의 인덱스 저장

  // 한 방향으로 검사
  for (let i = 1; i < winCondition; i++) {
    /*
     * size = 5, row = 2, col = 2 라고 가정
     * 우측 가로 : row -> 2, 2 | col -> 3, 4
     * 하단 세로 : row -> 3, 4 | col -> 2, 2
     * 우측 하단 대각선 : row -> 3, 4 | col -> 3, 4
     * 좌측 하단 대각선 : row -> 3, 4 | col -> 1, 0
     * */
    const currentRow = lastRow + i * deltaRow;
    const currentCol = lastCol + i * deltaCol;
    if (getSquareIdentifier(board, size, currentRow, currentCol) !== player) break;

    winningIndexes.push({ row: currentRow, col: currentCol });
  }

  // 반대 방향으로 검사
  for (let i = 1; i < winCondition; i++) {
    /*
     * size = 5, row = 2, col = 2 라고 가정
     * 좌측 가로 : row -> 2, 2 | col -> 1, 0
     * 상단 세로 : row -> 1, 0 | col -> 2, 2
     * 좌측 상단 대각선 : row -> 1, 0 | col -> 1, 0
     * 우측 상단 대각선 : row -> 1, 0 | col -> 3, 4
     * */
    const currentRow = lastRow - i * deltaRow;
    const currentCol = lastCol - i * deltaCol;
    if (getSquareIdentifier(board, size, currentRow, currentCol) !== player) break;

    winningIndexes.push({ row: currentRow, col: currentCol });
  }

  return winningIndexes.length >= winCondition ? winningIndexes : null;
};

/* ==========================================================================================
 * ================================ Best Move Calculation ===================================
 * ========================================================================================== */

export const findBestMoveIdx = (
  board: TBoard,
  size: number,
  winCondition: number,
  player: BasePlayer,
) => {
  const opponent = getOpponent(player);

  // 승리할 수 있는 위치 탐색
  const bestMove = getFirstBestMoveIdx(board, size, winCondition, player);
  if (bestMove !== null) return bestMove;

  // 방어 해야하는 위치 탐색
  const defenseMove = getFirstBestMoveIdx(board, size, winCondition, opponent);
  if (defenseMove !== null) return defenseMove;

  // 중앙, 모서리, 빈칸 중 랜덤하게 반환. 모든 칸이 다 찼으면 null 반환
  return chooseStrategicPosition(board, size);
};

const getAvailableMoves = (board: TBoard) => {
  return board.reduce((moves, cell, i) => {
    if (cell.identifier === null) moves.add(i);
    return moves;
  }, new Set<number>());
};

const getFirstBestMoveIdx = (
  board: TBoard,
  size: number,
  winCondition: number,
  player: BasePlayer,
) => {
  const idx = board.findIndex((cell, i) => {
    if (cell.identifier === null) {
      const winningIndexes = checkWinIndexes(board, size, winCondition, i, player);
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

const getLinearIndex = (row: number, col: number, size: number) => row * size + col;

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
    (halfSize - 1) * size + halfSize - 1,
    (halfSize - 1) * size + halfSize,
    halfSize * size + halfSize - 1,
    halfSize * size + halfSize,
  ];
};

const getCornerIndexes = (size: number) => {
  const leftTop = 0;
  const rightTop = size - 1;
  const leftBottom = size * (size - 1);
  const rightBottom = size * size - 1;

  return [leftTop, rightTop, leftBottom, rightBottom];
};

/* ==========================================================================================
 * ================================== Board Utilities =======================================
 * ========================================================================================== */

/**
 * 2차원 보드를 기준으로한 row, col 값을 받아서 1차원 배열로 표현했을 때의 인덱스 반환
 * row * size = row 위치. e.g. 2(row) * 5(size) = 10 (3번째 행 첫번째 열)
 * 계산한 row 위치에서 col 더하면 해당 위치의 인덱스
 * */
const getSquareIdentifier = (board: TBoard, size: number, row: number, col: number) => {
  const linearIndex = getLinearIndex(row, col, size);
  if (row >= 0 && row < size && col >= 0 && col < size) return board[linearIndex].identifier;
  return null;
};

export const getInitialBoard = (size: number): TBoard => {
  return Array(size * size).fill(defaultSquare);
};

export const getOpponent = (player: BasePlayer) => {
  return player === BasePlayer.X ? BasePlayer.O : BasePlayer.X;
};

export const createSquare = (
  identifier: Identifier,
  mark: TMark,
  sequence: TSequence,
  color: TSquareColor,
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
