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
});

test('all 29 articles have a unique heroImage and descriptive heroAlt', () => {
  assert.equal(current.length, 29);
  const heroImages = current.map((post) => post.heroImage);
  const uniqueImages = new Set(heroImages);
  assert.equal(uniqueImages.size, 29, `Expected 29 unique heroImage values, got ${uniqueImages.size}`);

  for (const post of current) {
    assert.ok(post.heroImage && post.heroImage.trim().length > 0, `Post ${post.slug} has empty heroImage`);
    assert.ok(post.heroAlt && post.heroAlt.trim().length > 20, `Post ${post.slug} has short or missing heroAlt`);
    assert.ok(!post.heroAlt.toLowerCase().includes('accutek solar site'), `Post ${post.slug} still has vague placeholder heroAlt`);

    if (post.heroImage.startsWith('/')) {
      const localPath = path.join(root, 'public', post.heroImage);
      assert.ok(fs.existsSync(localPath), `Local image does not exist: ${localPath} for post ${post.slug}`);
    } else {
      assert.ok(post.heroImage.startsWith('http://') || post.heroImage.startsWith('https://'), `Invalid heroImage format: ${post.heroImage}`);
    }
  }
});
