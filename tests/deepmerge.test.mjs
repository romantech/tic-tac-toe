import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const pwaRequire = createRequire(require.resolve('vite-plugin-pwa'));
const workboxRequire = createRequire(pwaRequire.resolve('workbox-build'));
const rollupRequire = createRequire(workboxRequire.resolve('@rollup/plugin-node-resolve'));

for (const entry of ['deepmerge', 'deepmerge/dist/umd.js']) {
  const merge = rollupRequire(entry);

  test(`${entry} blocks prototype poisoning in source and target objects`, () => {
    const malicious = JSON.parse('{"__proto__":{"admin":true}}');
    for (const target of [Object.create(null), malicious]) {
      const result = merge(target, malicious);
      assert.equal(Object.getPrototypeOf(result), Object.prototype);
      assert.equal(result.admin, undefined);
      assert.equal(Object.hasOwn(result, '__proto__'), false);
    }
    assert.equal(merge(malicious, {}).admin, undefined);

    for (const value of [null, undefined, false, 0, '']) {
      const result = merge({ session: value }, { session: malicious });
      assert.equal(Object.getPrototypeOf(result.session), Object.prototype);
      assert.equal(result.session.admin, undefined);
    }
    assert.equal(merge({}, { items: [malicious] }).items[0].admin, undefined);
    assert.equal(merge.all([malicious, {}]).admin, undefined);
    assert.equal({}.admin, undefined);
  });

  test(`${entry} preserves nested options, arrays, symbols, and input objects`, () => {
    const symbol = Symbol('option');
    const target = { nested: { enabled: true }, extensions: ['.js'], [symbol]: 'kept' };
    const source = { nested: { mode: 'test' }, extensions: ['.ts'] };
    assert.deepEqual(merge(target, source), {
      nested: { enabled: true, mode: 'test' },
      extensions: ['.js', '.ts'],
      [symbol]: 'kept',
    });
    assert.deepEqual(target.nested, { enabled: true });
    assert.deepEqual(source.nested, { mode: 'test' });
  });
}
