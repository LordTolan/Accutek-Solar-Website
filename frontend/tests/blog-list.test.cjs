const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

// Render the real component with controlled hook state and lightweight Next boundaries.
function loadTs(relative, imports = {}) {
  const filename = path.join(__dirname, '..', relative);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    fileName: filename,
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(source, {
    module, exports: module.exports,
    require: (name) => name in imports ? imports[name] : require(name),
  }, { filename });
  return module.exports;
}

const data = loadTs('src/lib/blog-data.ts');
const posts = data.getAllBlogPosts();
const newest = posts[0];

function harness(blogData = data) {
  const state = [];
  let cursor;
  const Component = loadTs('src/app/blog/BlogListClient.tsx', {
    react: { ...React, useState(initial) {
      const index = cursor++;
      if (!(index in state)) state[index] = initial;
      return [state[index], (value) => { state[index] = value; }];
    } },
    'next/link': { default: ({ children, ...props }) => React.createElement('a', props, children) },
    'next/image': { default: ({ fill, priority, ...props }) => React.createElement('img', props) },
    '@/lib/blog-data': blogData,
    '@/lib/utils': { HCP_BOOK_URL: 'https://example.test/book' },
  }).default;
  function render() { cursor = 0; return Component(); }
  function find(predicate, node = render()) {
    if (!node || typeof node !== 'object') return;
    if (predicate(node)) return node;
    for (const child of React.Children.toArray(node.props?.children)) {
      const result = find(predicate, child);
      if (result) return result;
    }
  }
  return {
    html: () => renderToStaticMarkup(render()),
    search: (value) => find((n) => n.type === 'input').props.onChange({ target: { value } }),
    category: (name) => find((n) => n.type === 'button' && n.props.children === name).props.onClick(),
  };
}

function cards(html) { return [...html.matchAll(/data-testid="post-card-([^"]+)"/g)].map((m) => m[1]); }

test('default: 1 featured + 28 cards, 29 unique articles', () => {
  const html = harness().html();
  assert.equal(posts.length, 29);
  assert.equal((html.match(/data-testid="featured-post"/g) || []).length, 1);
  assert.equal(cards(html).length, 28);
  assert.ok(!cards(html).includes(newest.slug));
  assert.equal(new Set([newest.slug, ...cards(html)]).size, 29);
});

test('search finds newest once, hides featured, and clearing restores default', () => {
  const view = harness();
  view.search(newest.title);
  assert.deepEqual(cards(view.html()), [newest.slug]);
  assert.ok(!view.html().includes('data-testid="featured-post"'));
  assert.ok(!view.html().includes('No articles match'));
  view.search('unmatched-term-xyz');
  assert.equal(cards(view.html()).length, 0);
  assert.ok(view.html().includes('No articles match'));
  view.search('');
  assert.equal(cards(view.html()).length, 28);
  assert.ok(view.html().includes('data-testid="featured-post"'));
});

test('categories filter all posts including newest; toggling and All Posts restore view', () => {
  const view = harness();
  for (const category of data.getBlogCategories()) {
    view.category(category);
    assert.deepEqual(cards(view.html()), Array.from(posts.filter((p) => p.category === category), (p) => p.slug));
    assert.ok(!view.html().includes('data-testid="featured-post"'));
    view.category(category);
    assert.equal(cards(view.html()).length, 28);
  }
  view.category(newest.category);
  view.search(newest.title.toUpperCase());
  assert.deepEqual(cards(view.html()), [newest.slug]);
  view.category('All Posts');
  assert.deepEqual(cards(view.html()), [newest.slug]);
  view.search('');
  assert.ok(view.html().includes('data-testid="featured-post"'));
});

test('single-post search has no false empty state', () => {
  const view = harness({ ...data, getAllBlogPosts: () => [newest] });
  view.search(newest.title);
  assert.deepEqual(cards(view.html()), [newest.slug]);
  assert.ok(!view.html().includes('No articles match'));
});
