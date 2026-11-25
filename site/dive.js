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

// ── Ambient water: snow, light shafts, bubbles, plankton, sonar ─────────
const cv = document.createElement('canvas');
cv.className = 'fx'; cv.setAttribute('aria-hidden', 'true');
const ctx = cv.getContext('2d');
let W = 0, H = 0, dpr = 1, px = 3;
function resize() {
  dpr = Math.min(2, devicePixelRatio || 1);
  W = cv.width = Math.round(innerWidth * dpr);
  H = cv.height = Math.round(innerHeight * dpr);
  px = Math.max(2, Math.round(3 * dpr));
}

const rand = (a, b) => a + Math.random() * (b - a);
const snow = Array.from({ length: 110 }, () => ({ x: Math.random(), y: Math.random(), z: [0.35, 0.6, 1][Math.floor(Math.random() * 3)], s: rand(0.4, 1) }));
const plankton = Array.from({ length: 46 }, () => ({ x: rand(0.5, 1), y: Math.random(), ph: rand(0, 6.3), sp: rand(0.2, 0.6) }));
let bubbles = [], rings = [];
let pointer = { x: -1e4, y: -1e4 };
let lastY = scrollY, vel = 0, t0 = performance.now(), docked = false;

const snap = v => Math.round(v / px) * px;
const block = (x, y, s, color) => { ctx.fillStyle = color; ctx.fillRect(snap(x), snap(y), s * px, s * px); };

function subNose() {
  const r = sub.getBoundingClientRect();
  return { r, tail: { x: (r.left + r.width * 0.08) * dpr, y: (r.top + r.height * 0.55) * dpr }, mid: { x: (r.left + r.width / 2) * dpr, y: (r.top + r.height / 2) * dpr } };
}

function ping() {
  const { mid } = subNose();
  rings.push({ x: mid.x, y: mid.y, r: 0, life: 1 });
  const lit = $$('.creature, .berth img').filter(el => { const b = el.getBoundingClientRect(); return b.bottom > 0 && b.top < innerHeight; });
  lit.forEach((el, i) => setTimeout(() => { el.classList.add('lit'); setTimeout(() => el.classList.remove('lit'), 900); }, 180 + i * 140));
}
addEventListener('pointerdown', e => {
  const r = sub.getBoundingClientRect();
  if (e.clientX > r.left - 12 && e.clientX < r.right + 12 && e.clientY > r.top - 12 && e.clientY < r.bottom + 12) ping();
});
addEventListener('pointermove', e => { pointer = { x: e.clientX * dpr, y: e.clientY * dpr }; }, { passive: true });
addEventListener('keydown', e => { if ((e.key === 'p' || e.key === 'P') && !e.metaKey && !e.ctrlKey && !e.altKey && !/input|textarea/i.test(e.target.tagName)) ping(); });

function frame(now) {
  const dt = Math.min(0.05, (now - t0) / 1000); t0 = now;
  const y = scrollY; vel = vel * 0.9 + (y - lastY) * 0.1; lastY = y;
  const d = depth / MAX;
  ctx.clearRect(0, 0, W, H);

  // Light shafts fade out before the twilight zone.
  const sun = clamp(1 - depth / 180);
  if (sun > 0) {
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 5; i++) {
      const x = W * (0.12 + i * 0.2) + Math.sin(now / 2600 + i) * W * 0.03;
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, `rgba(190,255,235,${0.07 * sun})`); g.addColorStop(1, 'rgba(190,255,235,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + W * 0.05, 0); ctx.lineTo(x + W * 0.16, H); ctx.lineTo(x + W * 0.06, H); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  // Marine snow in three parallax depths, thicker as the light goes.
  const snowA = 0.18 + d * 0.35;
  for (const p of snow) {
    p.y -= dt * 0.006 * p.z;
    const yy = ((p.y - (y / innerHeight) * 0.25 * p.z) % 1 + 1) % 1;
    p.x += Math.sin(now / 3000 + p.s * 9) * 0.00006;
    block(((p.x % 1) + 1) % 1 * W, yy * H, p.z === 1 ? 1 : 1, `rgba(220,245,240,${snowA * p.z * p.s})`);
  }

  // Bubbles from the propeller, more when the sub is moving.
  const { tail } = subNose();
  if (Math.random() < 0.06 + Math.min(0.6, Math.abs(vel) * 0.02)) bubbles.push({ x: tail.x + rand(-4, 4) * dpr, y: tail.y, s: Math.random() < 0.3 ? 2 : 1, life: 1, w: rand(0, 6) });
  bubbles = bubbles.filter(b => (b.life -= dt * 0.45) > 0);
  for (const b of bubbles) {
    b.y -= dt * 70 * dpr * (1 + b.s * 0.4); b.x += Math.sin(now / 240 + b.w) * 0.6 * dpr;
    ctx.strokeStyle = `rgba(210,250,245,${0.75 * b.life})`; ctx.lineWidth = Math.max(1, dpr);
    const s = (b.s + 1) * px;
    ctx.strokeRect(snap(b.x), snap(b.y), s, s);
  }

  // Bioluminescence below 1,000 m, brighter near the pointer.
  const glow = clamp((depth - 900) / 600);
  if (glow > 0) {
    const narrow = innerWidth < 760;
    for (const p of plankton) {
      p.ph += dt * p.sp;
      const x = (narrow ? p.x - 0.5 : p.x) * (narrow ? 2 : 1) * W, yy = ((p.y + Math.sin(p.ph) * 0.02 - (y / innerHeight) * 0.08) % 1 + 1) % 1 * H;
      const near = clamp(1 - Math.hypot(x - pointer.x, yy - pointer.y) / (160 * dpr));
      const a = glow * (0.25 + 0.35 * (Math.sin(p.ph * 3) * 0.5 + 0.5) + near * 0.6);
      block(x - px, yy - px, 3, `rgba(77,227,255,${a * 0.18})`);
      block(x, yy, 1, `rgba(167,248,220,${a})`);
    }
  }

  // Sonar rings.
  rings = rings.filter(r => (r.life -= dt * 0.7) > 0);
  for (const r of rings) {
    r.r += dt * Math.max(W, H) * 0.75;
    ctx.strokeStyle = `rgba(167,248,220,${0.55 * r.life})`; ctx.lineWidth = px;
    ctx.setLineDash([px * 2, px * 2]);
    ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
  }

  // One courtesy ping when the hull settles into the berth.
  if (!docked && depth >= MAX - 1) { docked = true; setTimeout(ping, 500); }
  if (depth < MAX - 200) docked = false;

  running = !document.hidden && requestAnimationFrame(frame);
}

let running = false;
if (!reduce) {
  resize();
  document.body.append(cv);
  const start = () => { if (!running && !document.hidden) { t0 = performance.now(); running = requestAnimationFrame(frame); } };
  document.addEventListener('visibilitychange', start);
  start();
}
