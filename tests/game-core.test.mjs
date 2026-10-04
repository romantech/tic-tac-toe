import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

test('minimax preserves the board and handles cached draw scores', async () => {
  const server = await createServer({
    logLevel: 'silent',
    server: { middlewareMode: true, hmr: false },
  });

  try {
    const { BasePlayer, createSquare, findBestMoveIdxMiniMax, getInitialBoard, isNumber } =
      await server.ssrLoadModule('/src/lib/index.ts');
    const board = getInitialBoard(3);
    const initialBoard = structuredClone(board);

    assert.equal(findBestMoveIdxMiniMax(board, 3, BasePlayer.X), 4);
    assert.deepEqual(board, initialBoard);

    board[0] = createSquare(BasePlayer.O);
    board[1] = createSquare(BasePlayer.O);
    board[3] = createSquare(BasePlayer.X);
    board[4] = createSquare(BasePlayer.X);
    const beforeWinningMove = structuredClone(board);

    assert.equal(findBestMoveIdxMiniMax(board, 3, BasePlayer.O), 2);
    assert.deepEqual(board, beforeWinningMove);
    assert.equal(isNumber(0), true);
    assert.equal(isNumber(Number.NaN), false);
    assert.equal(isNumber('0'), false);
  } finally {
    await server.close();
  }
});
