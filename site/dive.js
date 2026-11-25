// The dive: depth instruments, scroll fallback and ambient water effects.
// Everything here is decoration. The page reads the same without it.
const html = document.documentElement;
html.classList.add('js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const sdt = CSS.supports('animation-timeline: view()');
if (!sdt && !reduce) html.classList.add('no-sdt');

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const fmt = new Intl.NumberFormat('en-US');

const zones = $$('.zone').map(el => {
  const [a, b] = el.dataset.depth.split(' ').map(Number);
  return { el, a, b, name: el.dataset.name };
});
const MAX = zones.at(-1).b;
const depthOut = $('.sounder b');
const nameOut = $('.zone-name');
const pips = $$('.pips i');
const ruler = $('.ruler');
const navLinks = $$('nav a');
const sub = $('.sub');
const surface = $('.surface');
const dockRange = $('.docking-range');
const fallback = [
  [$('.launch'), () => geo.launch],
  [$('.dock-approach'), () => geo.dock],
  [$('.berth'), () => geo.dock],
  [$('.progress'), () => geo.root],
];

// Hero name: letters bob independently, but assistive tech hears one word.
const h1 = $('h1.chroma');
if (h1 && !reduce) {
  const text = h1.firstChild;
  h1.setAttribute('aria-label', h1.textContent);
  const wrap = document.createElement('span');
  wrap.setAttribute('aria-hidden', 'true');
  let i = 0;
  text.textContent.split(' ').forEach((w, n) => {
    if (n) wrap.append(' ');
    const word = document.createElement('span');
    word.style.whiteSpace = 'nowrap';
    for (const c of w) {
      const s = document.createElement('span');
      s.className = 'ch'; s.style.setProperty('--i', i++); s.textContent = c;
      word.append(s);
    }
    wrap.append(word);
  });
  text.replaceWith(wrap);
}

let geo = {}, vh = innerHeight;
const top = el => el.getBoundingClientRect().top + scrollY;
function measure() {
  vh = innerHeight;
  const max = Math.max(1, document.documentElement.scrollHeight - vh);
  zones.forEach(z => { z.top = top(z.el); z.h = z.el.offsetHeight; });
  const sTop = top(surface), sBot = sTop + surface.offsetHeight;
  const dTop = top(dockRange), dH = dockRange.offsetHeight;
  geo = {
    max,
    root: y => y / max,
    launch: y => (y - sTop) / (sBot - 0.04 * vh - sTop),
    dock: y => (y - (dTop - vh)) / dH,
  };
  // Ruler ticks where each zone begins, plus the floor.
  $$('.tick', ruler).forEach(t => t.remove());
  const marks = zones.map(z => [z.a, z.top]).concat([[MAX, max + vh * 0.45]]);
  marks.slice(1).forEach(([m, y]) => {
    const t = document.createElement('span');
    t.className = 'tick';
    t.textContent = fmt.format(m) + ' m';
    t.style.top = clamp((y - vh * 0.45) / max) * 100 + '%';
    ruler.append(t);
  });
}

let depth = 0, zoneIndex = 0;
function update() {
  const y = scrollY, line = y + vh * 0.45;
  zoneIndex = 0;
  zones.forEach((z, i) => { if (line >= z.top) zoneIndex = i; });
  const z = zones[zoneIndex];
  depth = z.a + (z.b - z.a) * clamp((line - z.top) / z.h);
  if (y >= geo.max - 2) depth = MAX;
  depthOut.textContent = fmt.format(Math.round(depth)) + ' m';
  nameOut.textContent = z.name;
  pips.forEach((p, i) => { p.classList.toggle('on', i < zoneIndex); p.classList.toggle('here', i === zoneIndex); });
  html.style.setProperty('--depth-p', (depth / MAX).toFixed(3));
  ruler.style.setProperty('--ruler-y', clamp(geo.root(y)) * ruler.clientHeight + 'px');
  if (html.classList.contains('no-sdt')) {
    fallback.forEach(([el, f]) => el && el.style.setProperty('--p', clamp(f()(y)).toFixed(4)));
    zones.forEach(z => z.el.style.setProperty('--p', clamp((y + vh - z.top) / (z.h + vh)).toFixed(4)));
    const ids = ['', 'work', 'career', 'server'];
    navLinks.forEach(a => a.classList.toggle('here', a.hash === '#' + ids[zoneIndex]));
  }
}

let queued = false;
const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; update(); }); } };
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', () => { measure(); update(); resize(); });
addEventListener('load', () => { measure(); update(); });
measure(); update();

console.log('%c amahi.dev %c you found the engine room. the sub, the sonar and this page: github.com/amahi2001/portfolio',
  'background:#ffd08b;color:#071b2d;font-weight:700', 'color:#a7f8dc');

// ── Ambient water, drawn as pixel art ───────────────────────────────────
// Effects render into a small buffer on the same grid as the scenery, then
// scale up with hard pixels. A colour pass holds bubbles, snow and plankton;
// a light pass is added on top with a screen blend. Fades and glows use
// ordered (Bayer) dithering and stepped falloff instead of alpha and blur.
// Buffer, dithering and glow approach adapted from Sprite Fusion's
// pixel-art-vfx (MIT, Copyright (c) 2026 Hugo Duprez; see /assets/licenses).
const hex = h => { const v = parseInt(h.slice(1), 16); return (255 << 24) | ((v & 255) << 16) | (v & 0xff00) | ((v >> 16) & 255); };
const C = {
  hi: hex('#f4fffb'), lit: hex('#bff8e8'), rim: hex('#67c9c4'), shade: hex('#2c7f92'),
  snow: ['#4f7f8c', '#6f9ea5', '#93bfbd'].map(hex),
  core: hex('#effffb'), glow: hex('#4de3ff'), dim: hex('#1e6e86'),
  sun: hex('#bff8e8'), warm: hex('#ffd08b'), dock: hex('#7dffc8'),
};
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const bayer = (x, y) => (BAYER[((y & 3) << 2) | (x & 3)] + 0.5) / 16;
const TAU = Math.PI * 2;

class Buf {
  constructor(cls) {
    this.cv = document.createElement('canvas');
    this.cv.className = 'fx ' + cls; this.cv.setAttribute('aria-hidden', 'true');
    this.ctx = this.cv.getContext('2d');
  }
  size(w, h, s) {
    this.w = this.cv.width = w; this.h = this.cv.height = h;
    this.cv.style.width = w * s + 'px'; this.cv.style.height = h * s + 'px';
    this.img = this.ctx.createImageData(w, h); this.d = new Uint32Array(this.img.data.buffer);
  }
  clear() { this.d.fill(0); }
  flush() { this.ctx.putImageData(this.img, 0, 0); }
  i(x, y) { x |= 0; y |= 0; return x < 0 || y < 0 || x >= this.w || y >= this.h ? -1 : y * this.w + x; }
  set(x, y, c) { const i = this.i(x, y); if (i >= 0) this.d[i] = c; }
  dot(x, y, c, a = 1) { const px = Math.floor(x), py = Math.floor(y); if (a >= 1 || a > bayer(px, py)) this.set(px, py, c); }
  add(x, y, c, k) {
    const i = this.i(x, y); if (i < 0) return;
    const d = this.d[i];
    const r = Math.min(255, (d & 255) + (c & 255) * k), g = Math.min(255, ((d >>> 8) & 255) + ((c >>> 8) & 255) * k), b = Math.min(255, ((d >>> 16) & 255) + ((c >>> 16) & 255) * k);
    this.d[i] = (255 << 24) | (b << 16) | (g << 8) | r;
  }
  // Quadratic falloff, quantised into four steps so the halo reads as bands.
  glow(cx, cy, r, c, k) {
    if (r < 1 || k <= 0.01) return;
    for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++)
      for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
        const dx = (x + 0.5 - cx) / r, dy = (y + 0.5 - cy) / r, q = dx * dx + dy * dy;
        if (q >= 1) continue;
        const f = 1 - Math.sqrt(q);
        this.add(x, y, c, Math.ceil(f * f * 4) / 4 * k);
      }
  }
}

const col = new Buf('color'), light = new Buf('light');
let S = 3, BW = 0, BH = 0;
function resize() {
  // One effect pixel ≈ one scenery pixel: the backgrounds are 512×341 art pixels.
  S = Math.min(6, Math.max(2, Math.round(Math.max(innerWidth / 512, innerHeight / 341))));
  BW = Math.ceil(innerWidth / S); BH = Math.ceil(innerHeight / S);
  col.size(BW, BH, S); light.size(BW, BH, S);
}

const rand = (a, b) => a + Math.random() * (b - a);
const box = el => { const r = el.getBoundingClientRect(); return { x: r.left / S, y: r.top / S, w: r.width / S, h: r.height / S, on: r.bottom > 0 && r.top < innerHeight }; };
const angler = $('.abyss .creature'), berth = $('.berth img');
const snow = Array.from({ length: 170 }, () => ({ x: Math.random(), y: Math.random(), z: Math.random() < 0.3 ? 1 : Math.random() < 0.5 ? 0.6 : 0.35, seed: rand(0, 100), c: Math.floor(rand(0, 3)) }));
const plankton = Array.from({ length: 30 }, () => ({ x: Math.random(), y: Math.random(), per: rand(1.8, 3.6), ph: Math.random(), seed: rand(0, 100) }));
let bubbles = [], pops = [], rings = [], litUntil = new Map();
let pointer = { x: -1e4, y: -1e4 }, lastY = scrollY, vel = 0, t = 0, t0 = performance.now(), docked = false, spawnAcc = 0;

function drawBubble(b) {
  const r = b.r, cx = b.x, cy = b.y;
  if (r < 0.9) return col.set(cx, cy, r < 0.7 ? C.rim : C.lit);
  if (r < 1.5) {
    const x = Math.floor(cx), y = Math.floor(cy);
    col.set(x, y, C.hi); col.set(x + 1, y, C.lit); col.set(x, y + 1, C.rim); col.set(x + 1, y + 1, C.shade);
    return light.glow(cx + 0.5, cy + 0.5, 3, C.lit, 0.12);
  }
  const sq = 0.1 * Math.sin(b.ph * 2) + b.wob * 0.25, rx = r * (1 + sq), ry = r * (1 - sq);
  for (let y = Math.floor(cy - ry - 1); y <= Math.ceil(cy + ry + 1); y++)
    for (let x = Math.floor(cx - rx - 1); x <= Math.ceil(cx + rx + 1); x++) {
      const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry, d = Math.hypot(dx, dy) * r;
      if (d > r + 0.5) continue;
      const lit = (-dx - dy) / Math.SQRT2 / Math.max(0.01, d / r);
      if (d > r - 0.6) col.set(x, y, lit > 0.45 ? C.lit : lit < -0.55 ? C.shade : C.rim);
      else if (bayer(x, y) < 0.12) col.set(x, y, C.shade);
    }
  col.set(Math.round(cx - rx * 0.45), Math.round(cy - ry * 0.45), C.hi);
  if (r >= 2.5) col.set(Math.round(cx - rx * 0.45) + 1, Math.round(cy - ry * 0.45), C.lit);
  light.glow(cx, cy, r * 2.4 + 2, C.rim, 0.14);
}

// Slanted shafts: a 1-D intensity along the slant, dithered against the grid.
const shaftRow = new Float32Array(4096);
function drawShafts(sun, top) {
  const n = BW + BH;
  for (let u = 0; u < n; u++) {
    const v = Math.sin(u * 0.045 + t * 0.35) + Math.sin(u * 0.019 - t * 0.21 + 1.7) * 0.8 + Math.sin(u * 0.11 + t * 0.6) * 0.25;
    shaftRow[u] = Math.max(0, v - 0.55) * 0.9;
  }
  const y0 = Math.max(0, Math.ceil(top)), yMax = Math.floor(BH * 0.95);
  for (let y = y0; y < yMax; y++) {
    const fall = sun * (1 - (y - y0) / Math.max(1, yMax - y0));
    for (let x = 0; x < BW; x++) {
      // Three flat bands, dithered only where one band meets the next.
      const k = shaftRow[x + Math.floor((y - y0) * 0.42)] * fall * 2.2, b = bayer(x, y) * 0.22;
      if (k > 0.66 + b) light.add(x, y, C.sun, 0.13);
      else if (k > 0.36 + b) light.add(x, y, C.sun, 0.08);
      else if (k > 0.12 + b) light.add(x, y, C.sun, 0.04);
    }
  }
}

function ping() {
  const s = box(sub);
  rings.push({ x: s.x + s.w * 0.5, y: s.y + s.h * 0.5, r: 2, k: 0 });
  $$('.creature, .berth img').filter(el => box(el).on).forEach((el, i) => setTimeout(() => {
    el.classList.add('lit'); litUntil.set(el, t + 0.9); setTimeout(() => el.classList.remove('lit'), 900);
  }, 180 + i * 140));
}
addEventListener('pointerdown', e => {
  const r = sub.getBoundingClientRect();
  if (e.clientX > r.left - 12 && e.clientX < r.right + 12 && e.clientY > r.top - 12 && e.clientY < r.bottom + 12) ping();
});
addEventListener('pointermove', e => { pointer = { x: e.clientX / S, y: e.clientY / S }; }, { passive: true });
addEventListener('keydown', e => { if ((e.key === 'p' || e.key === 'P') && !e.metaKey && !e.ctrlKey && !e.altKey && !/input|textarea/i.test(e.target.tagName)) ping(); });

function step(dt) {
  t += dt;
  const y = scrollY; vel = vel * 0.9 + ((y - lastY) / S) * 0.1; lastY = y;
  const s = box(sub), tail = { x: s.x + s.w * 0.06, y: s.y + s.h * 0.56 };

  // Bubbles: a steady trickle from the propeller, more when the sub moves.
  spawnAcc += dt * (4 + Math.min(16, Math.abs(vel) * 0.9));
  for (; spawnAcc > 1; spawnAcc--) {
    const r = Math.random() < 0.6 ? rand(0.6, 1.5) : rand(1.5, 2.8);
    bubbles.push({ x0: tail.x + rand(-1, 1), x: tail.x, y: tail.y + rand(-1, 1), r, vy: -(8 + 6 * r), ph: rand(0, TAU), wob: 0, top: Math.max(waterline() + 1, tail.y - rand(24, 90)) });
  }
  for (let i = bubbles.length - 1; i >= 0; i--) {
    const b = bubbles[i];
    b.vy += (-(10 + 7 * b.r) - b.vy) * Math.min(1, dt * 3);
    b.y += b.vy * dt - vel * 0.15;
    b.ph += dt * (4 + 2 / b.r);
    b.x0 -= dt * 3;
    b.x = b.x0 + Math.sin(b.ph) * (0.5 + b.r * 0.8);
    b.r = Math.min(3.5, b.r + dt * 0.15);
    b.wob *= 1 - Math.min(1, dt * 4);
    b.top = Math.max(b.top, waterline() + 1);
    if (b.y < b.top || b.y < -4) { pops.push({ x: b.x, y: b.y, r: b.r, k: 0 }); bubbles.splice(i, 1); }
  }
  for (let i = 0; i < bubbles.length; i++) {
    const a = bubbles[i]; if (a.r < 1) continue;
    for (let j = i + 1; j < bubbles.length; j++) {
      const b = bubbles[j];
      if (b.r < 1 || Math.hypot(a.x - b.x, a.y - b.y) > (a.r + b.r) * 0.75) continue;
      a.r = Math.cbrt(a.r ** 3 + b.r ** 3); a.wob = 1; bubbles.splice(j--, 1);
    }
  }
  pops = pops.filter(p => (p.k += dt / 0.22) < 1);
  rings = rings.filter(r => { r.r += dt * 150; r.k += dt / 1.5; return r.k < 1; });
  for (const p of snow) { p.y += dt * (0.004 + 0.004 * p.z); p.x += Math.sin(t * 0.3 + p.seed) * 0.00004; }
  for (const p of plankton) { p.y -= dt * 0.002; p.x += Math.sin(t * 0.2 + p.seed) * 0.00005; }
  if (!docked && depth >= MAX - 1) { docked = true; setTimeout(ping, 500); }
  if (depth < MAX - 200) docked = false;
}

const waterline = () => (innerHeight * 0.47 - scrollY) / S;
function draw() {
  col.clear(); light.clear();
  const d = depth / MAX, sY = scrollY / S, wl = waterline();

  const sun = clamp(1 - depth / 200);
  if (sun > 0) drawShafts(sun, wl + 1);

  // Marine snow sinks; nearer flakes drift faster with the scroll.
  const snowShow = 0.35 + d * 0.5;
  for (const p of snow) {
    const x = Math.floor((((p.x % 1) + 1) % 1) * BW), y = Math.floor(((((p.y - sY * 0.35 * p.z / BH) % 1) + 1) % 1) * BH);
    const tw = Math.sin(t * 1.3 + p.seed);
    if (y < wl + 2) continue;
    if (bayer(x, y) > snowShow * (0.55 + 0.3 * tw) * (0.5 + p.z * 0.5)) continue;
    col.set(x, y, tw > 0.9 ? C.lit : C.snow[p.c]);
    if (p.z === 1 && tw > 0.3) col.set(x, y + 1, C.snow[0]);
  }

  for (const b of bubbles) drawBubble(b);
  for (const p of pops) {
    const r = p.r + 1 + p.k * 3;
    for (let a = 0; a < TAU; a += 0.5 / r) if (Math.sin(a) < 0.2) col.dot(p.x + Math.cos(a) * r, p.y + Math.sin(a) * r * 0.5, p.k < 0.5 ? C.hi : C.lit, 1 - p.k);
  }

  // Bioluminescence below 900 m: pulses, a four-point flare at the peak,
  // brighter near the pointer.
  const bio = clamp((depth - 900) / 600);
  if (bio > 0) {
    const x0 = innerWidth < 760 ? 0 : 0.52;
    for (const p of plankton) {
      const x = (x0 + (((p.x % 1) + 1) % 1) * (1 - x0)) * BW, y = ((((p.y - sY * 0.12 / BH) % 1) + 1) % 1) * BH;
      const u = (t / p.per + p.ph) % 1, near = clamp(1 - Math.hypot(x - pointer.x, y - pointer.y) / 40);
      const pulse = Math.min(1, ((u < 0.6 ? Math.pow(Math.sin((u / 0.6) * Math.PI), 0.7) : 0) + near) * bio);
      const px = Math.round(x), py = Math.round(y);
      col.dot(px, py, pulse > 0.25 ? C.core : C.dim, 0.4 + bio * 0.6);
      if (pulse > 0.5) col.set(px + 1, py, C.glow);
      if (pulse > 0.6) { const a = (pulse - 0.6) * 2.5; col.dot(px, py - 2, C.glow, a); col.dot(px, py + 2, C.glow, a); col.dot(px - 2, py, C.glow, a); col.dot(px + 2, py, C.glow, a); }
      if (pulse > 0.3) light.glow(x, y, 3 + pulse * 3, C.glow, 0.45 * pulse);
    }
  }

  // Lamps: the sub's porthole warms up with depth, the lure and the
  // station glow when in view.
  const s = box(sub);
  if (d > 0.05) light.glow(s.x + s.w * 0.78, s.y + s.h * 0.5, s.w * 0.45 + 6 * d, C.glow, 0.18 * d);
  if (angler) { const a = box(angler); if (a.on) { const k = 0.35 + 0.25 * Math.sin(t * 2.1); light.glow(a.x + a.w * 0.928, a.y + a.h * 0.235, 10, C.warm, k); light.glow(a.x + a.w * 0.928, a.y + a.h * 0.235, 3, C.hi, k); } }
  if (berth) {
    const b = box(berth);
    if (b.on) {
      light.glow(b.x + b.w * 0.74, b.y + b.h * 0.52, b.w * 0.16, C.warm, 0.16);
      if (docked) light.glow(b.x + b.w * 0.905, b.y + b.h * 0.05, 8, C.dock, 0.45 + 0.15 * Math.sin(t * 3));
    }
  }
  for (const [el, until] of litUntil) {
    if (t > until) { litUntil.delete(el); continue; }
    const b = box(el), k = clamp((until - t) / 0.9);
    light.glow(b.x + b.w / 2, b.y + b.h / 2, Math.max(b.w, b.h) * 0.6, C.rim, 0.3 * k);
  }

  // Sonar: a dithered ring with a trailing echo, sparks along the front.
  for (const r of rings) {
    const fade = 1 - r.k;
    for (let a = 0; a < TAU; a += 0.7 / r.r) {
      const x = r.x + Math.cos(a) * r.r, y = r.y + Math.sin(a) * r.r;
      col.dot(x, y, r.k < 0.3 ? C.hi : C.lit, fade);
      const ex = r.x + Math.cos(a) * (r.r - 4), ey = r.y + Math.sin(a) * (r.r - 4);
      col.dot(ex, ey, C.rim, fade * 0.45);
    }
    for (let a = (t * 0.7) % 0.6; a < TAU; a += 0.6) light.glow(r.x + Math.cos(a) * r.r, r.y + Math.sin(a) * r.r, 4, C.lit, 0.35 * fade);
  }

  col.flush(); light.flush();
}

let running = false;
function frame(now) {
  step(Math.min(0.05, (now - t0) / 1000)); t0 = now;
  draw();
  running = !document.hidden && requestAnimationFrame(frame);
}
if (!reduce) {
  resize();
  document.body.append(col.cv, light.cv);
  const start = () => { if (!running && !document.hidden) { t0 = performance.now(); running = requestAnimationFrame(frame); } };
  document.addEventListener('visibilitychange', start);
  start();
}
