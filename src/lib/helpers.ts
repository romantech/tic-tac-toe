import { Player, TBoard } from './types';

export const getLastMove = (i: number, size: number) => {
  const row = Math.floor(i / size);
  const col = i % size; // 항상 0 ~ (size - 1) 값 반환
  return { row, col };
};

export const getPlayerMark = (xIsNext: boolean) => {
  return xIsNext ? Player.X : Player.O;
};

/**
 * 보드의 모든 위치를 검사하면 보드가 커질수록 비효율적이므로,
 * 마지막 놓았던 위치부터 가로, 세로, 대각선 방향으로 winCondition 만큼 검사
 * */
export const checkWin = (
  board: TBoard,
  size: number,
  winCondition: number,
  lastRow: number,
  lastCol: number,
  player: Player,
) => {
  const directions = [
    { deltaRow: 0, deltaCol: 1 }, // 가로
    { deltaRow: 1, deltaCol: 0 }, // 세로
    { deltaRow: 1, deltaCol: 1 }, // 우하 대각선
    { deltaRow: 1, deltaCol: -1 }, // 좌하 대각선
  ];

  return directions.some(({ deltaRow, deltaCol }) => {
    return checkDirection(board, size, lastRow, lastCol, winCondition, player, deltaRow, deltaCol);
  });
};

const checkDirection = (
  board: TBoard,
  size: number,
  row: number,
  col: number,
  winCondition: number,
  player: Player,
  deltaRow: number,
  deltaCol: number,
) => {
  let count = 1; // 현재 위치 포함

  // 한 방향으로 검사
  for (let i = 1; i < winCondition; i++) {
    /*
     * size = 5, row = 2, col = 2 라고 가정
     * 우측 가로 : row -> 2, 2 | col -> 3, 4
     * 하단 세로 : row -> 3, 4 | col -> 2, 2
     * 우측 하단 대각선 : row -> 3, 4 | col -> 3, 4
     * 좌측 하단 대각선 : row -> 3, 4 | col -> 1, 0
     * */
    if (getCell(board, size, row + i * deltaRow, col + i * deltaCol) !== player) break;
    count++;
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
    if (getCell(board, size, row - i * deltaRow, col - i * deltaCol) !== player) break;
    count++;
  }

  return count >= winCondition;
};

/**
 * 2차원 보드를 기준으로한 row, col 값을 받아서 1차원 배열로 표현했을 때의 인덱스 반환
 * row * size = row 위치. e.g. 2(row) * 5(size) = 10 (3번째 행 첫번째 열)
 * 계산한 row 위치에서 col 더하면 해당 위치의 인덱스
 * */
const getCell = (board: TBoard, size: number, row: number, col: number) => {
  if (row >= 0 && row < size && col >= 0 && col < size) return board[row * size + col];
  return null;
};
