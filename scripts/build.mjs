import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import TurndownService from 'turndown';

const html = await readFile('site/index.html', 'utf8');
const content = html.match(/<main\b[\s\S]+?<\/footer>/);
if (!content) throw new Error('Missing portfolio content');

const markdown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
markdown.remove(node => node.nodeName === 'FIGURE' || node.getAttribute('aria-hidden') === 'true' || node.classList.contains('actions') || node.classList.contains('depth-tag'));
markdown.addRule('serviceName', { filter: 'dt', replacement: text => '\n\n### ' + text + '\n\n' });
markdown.addRule('serviceDescription', { filter: 'dd', replacement: text => '\n\n' + text + '\n\n' });
const text = markdown.turndown(content[0]).replace('](/llms.txt)', '](https://amahi.dev/llms.txt)');

await rm('out', { recursive: true, force: true });
await mkdir('out');
await cp('site', 'out', { recursive: true });
await writeFile('out/index.md', text + '\n');
