import type { APIRoute } from 'astro';
import { profile as p } from '../data/profile';

export const GET: APIRoute = () => new Response(`# ${p.name}

> ${p.name} is a New York-based ${p.role} at ${p.org}. He builds document AI and agents that cite their sources, wrote the open-source Python Token Killer (76% fewer LLM tokens on its benchmark suite), and runs a NixOS home lab where coding agents work in their own dev boxes.

## Portfolio

- [Portfolio in Markdown](${p.site}/index.md): Selected work with measured outcomes, career history (Squirro, LlamaIndex, The New York Public Library, NASA Goddard), education, a public tour of the home lab, and professional contact links.
- [Home lab configuration](${p.lab}): The public NixOS flake behind the server that hosts this site.
- [Python Token Killer](${p.ptk}): Dependency-free Python library that compresses objects before they reach a language model.
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
