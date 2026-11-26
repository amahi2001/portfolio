# amahi.dev

Abrar Mahi’s portfolio, built with [Astro](https://docs.astro.build) and served as static files from his NixOS server.

## Edit

- Projects, career and lab services live in `src/data/*.yaml`. Each entry is validated by the schemas in `src/content.config.ts`, and `order` sets its position on the page.
- Name, role, contact links and the page’s prose live in `src/data/profile.ts`. The HTML, `/index.md` and `/llms.txt` are all generated from it, so the current role stays in sync everywhere.
- Layout is `src/pages/index.astro`, with `Zone`, `WorkCard` and `Head` in `src/components/`.
- Styles are `src/styles/global.css`; the depth instruments and pixel effects are `src/scripts/dive.js`.
- Scenery, sprites and fonts are static files in `public/assets/`. New art goes through `scripts/pixelize.py`.

The server sends a strict Content-Security-Policy (`script-src 'self'; style-src 'self'`). The build keeps every script and stylesheet external, and `npm test` fails on inline styles or scripts. CSS minification is off because the minifier folds `animation-timeline` into the `animation` shorthand, which browsers reject.

## Develop

Run these in the portfolio devbox with Node 24.

```sh
npm ci
npm test        # astro build + scripts/check.mjs
npm run dev     # live reload on port 3000
```

`npm test` writes `out/`, containing only public files.

## Agent skills

Project skills live in `.agents/skills/` and are pinned in `skills-lock.json`. Each was installed with `bunx skills add` and audited file by file before it was committed (Markdown guidance only; no scripts, hooks or runtime fetching).

- Build: `astro`, `web-perf`
- Design and motion: `frontend-design`, `web-design-guidelines`, `animate`, `animation-performance`, `choreograph`, `game-feel`, `pixel-art-sprites`, plus the project-local Impeccable bundle
- Motion review: `review-animations` (strict pass over existing motion), `find-animation-opportunities` (read-only, mostly says no)
- Writing: `no-ai-slop` to edit copy in your own voice, `stop-slop` as a final check

Update with `bunx skills update -p`, and re-audit the diff before committing. Restore the Claude Code links with `bunx skills experimental_install`.

## Publish on the server

Run `npm test` in the devbox from a clean release commit. On the host, install the verified `out/` into a new root-owned directory under `/srv/www/portfolio/releases/`. Point `/srv/www/portfolio/current` to that release with an atomic symlink rename. Preserve the preceding release for rollback. Nginx serves the release directly, so the devbox can be stopped.

The host configuration is in [the NixOS web module](https://github.com/amahi2001/abrar-homeserver/blob/main/web.nix). It owns HTTPS, certificate renewal, and the canonical www redirect. The public directory contains editorial descriptions of services. The dashboard and service hosts have their own access controls.

The legacy Vercel configuration builds a redirect to the canonical domain when deployed. The homepage and its assets are served by the home server.

## Impeccable for Codex

Run `make design-tools` from the project root to install the upstream CLI 4.11.0 project bundle and Codex hook manifest. Restart Codex, then review and approve the project hook in `/hooks`. The project-scoped installation is local to the checkout. `PRODUCT.md` and `DESIGN.md` contain the portfolio’s context.

Run `.agents/skills/impeccable/scripts/impeccable hooks status` to inspect the wiring. Run `npx impeccable detect http://127.0.0.1:3000` against the preview. Use `npx impeccable update --scope=project` for updates and review changed hooks again. To uninstall, run `.agents/skills/impeccable/scripts/impeccable hooks reset`, then remove the project-local `.agents/skills/impeccable` directory.

[Impeccable setup](https://impeccable.style/docs) · [llms.txt proposal](https://llmstxt.org/)
