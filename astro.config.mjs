import { defineConfig } from 'astro/config';

// Static output served by nginx under a strict CSP (script-src 'self';
// style-src 'self'), so nothing may be inlined into the HTML.
export default defineConfig({
  site: 'https://amahi.dev',
  outDir: 'out',
  build: { inlineStylesheets: 'never', assets: '_astro' },
  // cssMinify is off: esbuild folds animation-timeline into the animation
  // shorthand, which browsers reject, silently killing every scroll-driven
  // animation. nginx gzips the stylesheet instead.
  vite: { build: { assetsInlineLimit: 0, cssMinify: false } },
  devToolbar: { enabled: false },
});
