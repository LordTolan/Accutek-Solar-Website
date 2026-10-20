// Run after `npm run build` with Playwright available through NODE_PATH or locally.
// PLAYWRIGHT_EXECUTABLE_PATH optionally selects an existing Chromium binary.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { chromium } = require('playwright');

const root = path.join(__dirname, '..');
const data = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root, 'src/lib/blog-data.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { module: data, exports: data.exports });
const slug = 'from-quote-to-power-on-how-a-solar-project-gets-approved-in-indiana-2026-09-07';
const expectedSources = Array.from(data.exports.getBlogPost(slug).sources);

test('approval article source URLs wrap without changing text or overflowing mobile/desktop', async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {}),
  });
  try {
    const page = await browser.newPage({ timezoneId: 'UTC' });
    await page.route('**/*', async (route) => {
      const url = new URL(route.request().url());
      // Keep this layout regression offline and independent of stock images/widgets.
      if (url.hostname !== 'blog.test') return route.abort();
      let file = path.join(root, 'out', decodeURIComponent(url.pathname));
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!fs.existsSync(file)) return route.fulfill({ status: 404, body: 'Not found' });
      const contentType = ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' })[path.extname(file)] || 'application/octet-stream';
      return route.fulfill({ body: fs.readFileSync(file), contentType });
    });
    for (const width of [320, 360, 375, 390, 414, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`http://blog.test/blog/${slug}/`, { waitUntil: 'networkidle' });
      const sources = page.locator('article ul').last();
      assert.deepEqual(await sources.locator('li').allTextContents(), expectedSources, `source text at ${width}px`);
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
      assert.ok(dimensions.document <= dimensions.viewport, `document overflow at ${width}px: ${JSON.stringify(dimensions)}`);
      const textBounds = await sources.locator('li').evaluateAll((items) => items.map((item) => {
        const range = document.createRange();
        range.selectNodeContents(item);
        return { right: Math.max(...Array.from(range.getClientRects(), (r) => r.right)), viewport: innerWidth };
      }));
      assert.ok(textBounds.every((bounds) => bounds.right <= bounds.viewport), `source text overflow at ${width}px`);
    }
  } finally {
    await browser.close();
  }
});
