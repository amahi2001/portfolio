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
const css = readFileSync('out/style.css', 'utf8');
for (const [, asset] of css.matchAll(/url\("(\/assets\/[^"]+)"\)/g)) {
  assert(existsSync('out' + asset), asset);
}
assert.doesNotMatch(md, /!\[.*?\]\(.*?\.webp\)/, 'Decorative scenery leaked into Markdown');
const profile = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
assert.equal(profile.mainEntity.name, 'Abrar Mahi');
const role = profile.mainEntity.jobTitle + ' at ' + profile.mainEntity.worksFor.name;
for (const source of [md, llms, html]) assert(source.includes(role), 'Current role mismatch');
for (const name of ['LlamaIndex', 'Python Token Killer', 'Squirro', 'NASA Goddard', 'Hunter College', 'Nextcloud', 'Jellyfin', 'AdGuard Home', 'NixOS']) {
  assert(md.includes(name), name);
}
assert(llms.startsWith('# Abrar Mahi\n\n> '));
assert(llms.includes('https://amahi.dev/index.md'));
assert.deepEqual(readdirSync('out').sort(), ['assets', 'index.html', 'index.md', 'llms.txt', 'robots.txt', 'sitemap.xml', 'style.css']);
assert.doesNotMatch(html + md + llms, /https?:\/\/(?:[\w.-]+\.amahi\.dev|localhost|127\.0\.0\.1)\b/i);
console.log('Verified public files, local links, fragments, structured data and Markdown content.');
