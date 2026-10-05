import assert from 'node:assert/strict';
import test from 'node:test';
import { zodResolver } from '@hookform/resolvers/zod';
import { createServer } from 'vite';

test('settings defaults, validation, and nested form errors remain compatible', async () => {
  const server = await createServer({
    logLevel: 'silent',
    server: { middlewareMode: true, hmr: false },
  });

  try {
    const { defaultGameOption, gameOptionSchema, findFirstErrorPath, GameMode } =
      await server.ssrLoadModule('/src/lib/index.ts');
    assert.deepEqual(gameOptionSchema.parse({}), defaultGameOption);

    for (const size of [3, 4, 5, 6]) {
      for (const gameMode of Object.values(GameMode)) {
        const options = {
          ...defaultGameOption,
          size,
          winCondition: size,
          gameMode,
          firstPlayer: 'O',
        };
        assert.deepEqual(gameOptionSchema.parse(options), options);
      }
    }

    const resolve = (options) =>
      zodResolver(gameOptionSchema)(options, {}, { fields: {}, shouldUseNativeValidation: false });
    assert.deepEqual(await resolve(defaultGameOption), { values: defaultGameOption, errors: {} });

    for (const [field, value, message] of [
      ['mark', '', 'Mark is required'],
      ['mark', ' ', 'Only letters, numbers, or symbols are allowed'],
      ['mark', 'O', 'Each player must have a unique mark'],
      ['color', defaultGameOption.playerConfigs.O.color, 'Each player must have a unique color'],
    ]) {
      const options = structuredClone(defaultGameOption);
      options.playerConfigs.X[field] = value;
      const result = await resolve(options);
      assert.deepEqual(result.values, {});
      assert.equal(result.errors.playerConfigs.X[field].message, message);
      assert.equal(
        findFirstErrorPath(result.errors, [`playerConfigs.X.${field}`]),
        `playerConfigs.X.${field}`,
      );
    }

    for (const mark of ['가', '7', '★']) {
      const options = structuredClone(defaultGameOption);
      options.playerConfigs.X.mark = mark;
      assert.equal(gameOptionSchema.safeParse(options).success, true);
    }

    assert.equal(
      gameOptionSchema.safeParse({ ...defaultGameOption, winCondition: 4 }).success,
      false,
    );
    assert.equal(gameOptionSchema.safeParse({ ...defaultGameOption, size: 2 }).success, false);
    assert.equal(
      gameOptionSchema.safeParse({ ...defaultGameOption, gameMode: 'INVALID' }).success,
      false,
    );
    assert.equal(
      gameOptionSchema.safeParse({
        ...defaultGameOption,
        playerConfigs: { X: defaultGameOption.playerConfigs.X },
      }).success,
      false,
    );
    const invalidColor = structuredClone(defaultGameOption);
    invalidColor.playerConfigs.X.color = 'red';
    assert.equal(gameOptionSchema.safeParse(invalidColor).success, false);
  } finally {
    await server.close();
  }
});
