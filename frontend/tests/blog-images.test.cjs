const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { execFileSync } = require('node:child_process');

function posts(source) {
  const module = { exports: {} };
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, { module, exports: module.exports });
  return JSON.parse(JSON.stringify(module.exports.BLOG_POSTS));
}
const root = path.join(__dirname, '..');
const current = posts(fs.readFileSync(path.join(root, 'src/lib/blog-data.ts'), 'utf8'));

test('all 29 articles preserve content, URLs and every non-image field against the base commit', () => {
  const original = posts(execFileSync('git', ['show', '2e90dacd98088729a2e6106b8273bed89fb542a3:frontend/src/lib/blog-data.ts'], { cwd: root, encoding: 'utf8' }));
  const withoutImages = (items) => items.map(({ heroImage, heroAlt, ...rest }) => rest);
  assert.equal(current.length, 29);
  assert.deepEqual(withoutImages(current), withoutImages(original));
  const changed = current.filter((post, i) => post.heroImage !== original[i].heroImage);
  assert.equal(changed.length, 6);
  assert.equal(new Set(changed.map((post) => post.heroImage)).size, 6);
  for (const post of changed) {
    assert.ok(fs.existsSync(path.join(root, 'public', post.heroImage)));
    assert.ok(post.heroAlt.length > 40);
  }
});
