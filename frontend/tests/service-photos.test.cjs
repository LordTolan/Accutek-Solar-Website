const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const ts = require('typescript');

test('residential field photos do not repeat identical media under different filenames', () => {
  const root = path.join(__dirname, '..');
  const module = { exports: {} };
  vm.runInNewContext(ts.transpileModule(
    fs.readFileSync(path.join(root, 'src/lib/services-data.ts'), 'utf8'),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText, { module, exports: module.exports });
  const service = module.exports.getServiceBySlug('residential-solar');
  assert.ok(service && service.photos.length > 0);
  const seen = new Map();
  for (const photo of service.photos) {
    const bytes = fs.readFileSync(path.join(root, 'public', photo.src));
    const hash = createHash('sha256').update(bytes).digest('hex');
    assert.ok(!seen.has(hash), `${photo.src} duplicates ${seen.get(hash)}`);
    seen.set(hash, photo.src);
  }
});
