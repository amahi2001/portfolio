import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const html = readFileSync('out/index.html', 'utf8');
const md = readFileSync('out/index.md', 'utf8');
const llms = readFileSync('out/llms.txt', 'utf8');
assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length);
for (const [, ref] of html.matchAll(/(?:href|src)="([/#][^"]*)"/g)) {
  if (ref.startsWith('#')) assert(ids.includes(ref.slice(1)), ref);
  else assert(existsSync('out' + new URL(ref, 'https://amahi.dev').pathname), ref);
}
const sheets = [...html.matchAll(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)"/g)].map(m => m[1]);
assert.equal(sheets.length, 1, 'Expected one external stylesheet');
const css = readFileSync('out' + sheets[0], 'utf8');
for (const [, asset] of css.matchAll(/url\("?(\/assets\/[^")]+)"?\)/g)) {
  assert(existsSync('out' + asset), asset);
}
assert.doesNotMatch(css, /animation:[^;}]*--[\w-]+/, 'A scroll timeline was folded into an animation shorthand');
assert.doesNotMatch(md, /!\[.*?\]\(.*?\.webp\)/, 'Decorative scenery leaked into Markdown');
const profile = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
assert.equal(profile.mainEntity.name, 'Abrar Mahi');
const role = profile.mainEntity.jobTitle + ' at ' + profile.mainEntity.worksFor.name;
for (const source of [md, llms, html]) assert(source.includes(role), 'Current role mismatch');
for (const name of ['LlamaIndex', 'Python Token Killer', 'Graph RAG', 'Jun – Oct 2026', 'abrar-homeserver', 'Squirro', 'NASA Goddard', 'Hunter College', 'Nextcloud', 'Jellyfin', 'AdGuard Home', 'NixOS']) {
  assert(md.includes(name), name);
}
assert(md.startsWith('# Abrar Mahi'));
assert(md.includes('flood_coverage: true'));
assert(llms.startsWith('# Abrar Mahi\n\n> '));
assert(llms.includes('https://amahi.dev/index.md'));
assert.deepEqual(readdirSync('out').sort(), ['_astro', 'assets', 'index.html', 'index.md', 'llms.txt', 'robots.txt', 'sitemap.xml']);
assert.match(html, /<script type="module" src="\/_astro\/[^"]+\.js"><\/script>/, 'dive.js must ship as an external module');
assert.doesNotMatch(html, /<style[\s>]/, 'Inline <style> breaks the server CSP');
assert.doesNotMatch(html + md + llms, /https?:\/\/(?:[\w.-]+\.amahi\.dev|localhost|127\.0\.0\.1)\b/i);
assert.doesNotMatch(html, /\sstyle="/, 'Inline style attributes break the server CSP');
assert.doesNotMatch(html, /<script(?![^>]*(?:type="application\/ld\+json"|src=))/, 'Inline scripts break the server CSP');
console.log('Verified public files, local links, fragments, structured data and Markdown content.');
