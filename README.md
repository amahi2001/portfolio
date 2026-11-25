# amahi.dev

Abrar Mahi’s portfolio runs as static files on his NixOS server. Edit the page and service descriptions in `site/index.html`. The build derives `index.md` from the same copy. Keep `llms.txt`, page metadata, and the profile schema in sync when the current role changes.

## Develop

Run these in the portfolio devbox with Node 24 and Python 3.

```sh
npm ci
npm test
npm run dev
```

Open port 3000. Rebuild after editing. The build writes `out/`, containing only public files. Fonts and artwork are served locally. Font licenses ship alongside the assets.

## Publish on the server

Run `npm test` in the devbox from a clean release commit. On the host, install the verified `out/` into a new root-owned directory under `/srv/www/portfolio/releases/`. Point `/srv/www/portfolio/current` to that release with an atomic symlink rename. Preserve the preceding release for rollback. Nginx serves the release directly, so the devbox can be stopped.

The host configuration is in [the NixOS web module](https://github.com/amahi2001/abrar-homeserver/blob/main/web.nix). It owns HTTPS, certificate renewal, and the canonical www redirect. The public directory contains editorial descriptions of services. The dashboard and service hosts have their own access controls.

The legacy Vercel configuration builds a redirect to the canonical domain when deployed. The homepage and its assets are served by the home server.

## Impeccable for Codex

Run `make design-tools` from the project root to install the upstream CLI 4.11.0 project bundle and Codex hook manifest. Restart Codex, then review and approve the project hook in `/hooks`. The project-scoped installation is local to the checkout. `PRODUCT.md` and `DESIGN.md` contain the portfolio’s context.

Run `.agents/skills/impeccable/scripts/impeccable hooks status` to inspect the wiring. Run `npx impeccable detect http://127.0.0.1:3000` against the preview. Use `npx impeccable update --scope=project` for updates and review changed hooks again. To uninstall, run `.agents/skills/impeccable/scripts/impeccable hooks reset`, then remove the project-local `.agents/skills/impeccable` directory.

[Impeccable setup](https://impeccable.style/docs) · [llms.txt proposal](https://llmstxt.org/)
