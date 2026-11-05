/* Two pages after motion experiments.
   Illustrating the world, after Longshot's sketches page: the drawing on black, then a dense sketchbook mosaic
   whose columns drift at slightly different speeds, a sticky "Open gallery" button, and a dark gallery.
   Personal projects, after the product slider in Aditi's reference: a header with a row of little icons, and
   one project per screen that slides across as you scroll (pictures on the left with dots, words on the right). */
(() => {
  const LS = window.LS, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const pad = n => String(n).padStart(2, "0");
  const ph = t => `<span class="ph">${t}</span>`;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ================= Illustrating the world ================= */
  // her paintings go here when she sends them: ["media/paint/name.webp", width, height]. Until then the wall shows
  // empty frames, and her brushes lie about.
  const SKETCH = [];
  const FRAMES = [[4, 5], [1, 1], [3, 4], [5, 4], [4, 5], [3, 4], [1, 1], [4, 3], [3, 4], [4, 5], [5, 4], [1, 1]];
  const sketchPage = LS.page({ key: "world", fig: "puppet", figBig: 1, slug: "illustrating_the_world", kick: "Sketchbook", sub: "Illustrating the world",
    side: "Drawings and paintings, from sketchbooks and from the places I go.",
    title: "Illustrating the world", body: ["My paintings, from sketchbooks and from the places I go.", "They're being photographed now, and will hang on this wall soon."],
    hint: "scroll down", prev: "motion", next: "projects", cta: ["Say hello", "info"],
    onScroll: root => drift(root),
    html: `
    <section class="ls-sec sk-sec" data-bg="#fff">
      <img class="sk-deco pal" src="media/notes/palette.webp" alt="" draggable="false" data-px="-.05" data-rot="-2">
      <img class="sk-deco jar" src="media/notes/brush-jar.webp" alt="" draggable="false" data-px=".06" data-rot="1">
      <div class="sk-mos" aria-label="Paintings"></div>
      ${SKETCH.length ? `<div class="sk-bar"><button type="button" class="sk-open">Open gallery <span>${pad(SKETCH.length)}</span></button></div>` : `<p class="sk-soon">( the paintings are on their way )</p>`}
    </section>` });
  const sRoot = sketchPage.root; sRoot._blk = true;
  const mos = $(".sk-mos", sRoot);
  // lay the drawings into columns, shortest column first, so the wall stays even
  let cols = 0;
  function layout() {
    const n = innerWidth < 560 ? 2 : innerWidth < 980 ? 3 : 4; if (n === cols) return; cols = n;
    const hs = Array(n).fill(0), out = Array.from({ length: n }, () => []);
    const list = SKETCH.length ? SKETCH : FRAMES.map(([w, h]) => [null, w, h]);
    list.forEach(([src, w, h], i) => { const c = hs.indexOf(Math.min(...hs)); hs[c] += h / w; out[c].push(i); });
    mos.innerHTML = out.map((ids, c) => `<div class="sk-col" data-c="${c}">${ids.map(i => list[i][0]
      ? `<button type="button" class="sk-it" data-i="${i}" style="aspect-ratio:${list[i][1]}/${list[i][2]}" aria-label="Open painting ${i + 1} of ${list.length}"><img src="${list[i][0]}" alt="" loading="lazy" draggable="false"></button>`
      : `<div class="sk-it sk-ph" style="aspect-ratio:${list[i][1]}/${list[i][2]}"><span>Painting ${pad(i + 1)}</span></div>`).join("")}</div>`).join("");
    sIO();
  }
  // each picture fades and settles in as it reaches the screen
  let io;
  function sIO() {
    io && io.disconnect();
    io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { root: sRoot, rootMargin: "0px 0px -6% 0px" });
    $$(".sk-it", mos).forEach((el, i) => { el.style.setProperty("--d", (i % cols)); io.observe(el); });
  }
  // the columns travel at slightly different speeds, so the wall feels loose, like pages pinned up
  const SP = [0, -.07, .04, -.11];
  function drift(root) {
    if (calm) return;
    const r = mos.getBoundingClientRect(), y = -r.top;
    $$(".sk-col", mos).forEach((c, i) => { c.style.transform = `translate3d(0,${(y * SP[i % 4]).toFixed(1)}px,0)`; });
  }
  layout(); addEventListener("resize", layout);

  // the gallery: a dark room, one drawing at a time
  const lb = document.createElement("div"); lb.className = "sk-lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Gallery");
  lb.innerHTML = `<div class="sk-lb-in"><img alt="" draggable="false"><img class="nx" alt="" draggable="false"></div>
    <button type="button" class="sk-x" aria-label="Close the gallery"><svg viewBox="0 0 20 20"><path d="M3 3l14 14M17 3L3 17"/></svg></button>
    <button type="button" class="sk-ar l" aria-label="Previous drawing"><svg viewBox="0 0 24 14"><path d="M23 7H2M8 1L2 7l6 6"/></svg></button>
    <button type="button" class="sk-ar r" aria-label="Next drawing"><svg viewBox="0 0 24 14"><path d="M1 7h21M16 1l6 6-6 6"/></svg></button>
    <p class="sk-ct"><b>01</b> / ${pad(SKETCH.length)}</p><p class="sk-cap">Illustrating the world</p>
    <div class="sk-th">${SKETCH.map(([s], i) => `<button type="button" data-i="${i}" aria-label="Drawing ${i + 1}"><img src="${s}" alt="" loading="lazy"></button>`).join("")}</div>`;
  document.body.appendChild(lb);
  const img = $(".sk-lb-in img", lb), ct = $(".sk-ct b", lb);
  let at = 0, last = null;
  function show(i, dir = 0) {
    at = (i + SKETCH.length) % SKETCH.length;
    img.classList.remove("in"); img.style.setProperty("--dx", dir * 40 + "px"); void img.offsetWidth;
    img.src = SKETCH[at][0]; img.classList.add("in");
    ct.textContent = pad(at + 1);
    $$(".sk-th button", lb).forEach((b, j) => b.classList.toggle("on", j === at));
    const t = $(`.sk-th button[data-i="${at}"]`, lb); t && t.scrollIntoView({ block: "nearest", inline: "center", behavior: calm ? "auto" : "smooth" });
  }
  function open(i) { last = document.activeElement; lb.classList.add("on"); document.documentElement.classList.add("sk-lock"); show(i); $(".sk-x", lb).focus({ preventScroll: true }); }
  function close() { lb.classList.remove("on"); document.documentElement.classList.remove("sk-lock"); last && last.focus && last.focus({ preventScroll: true }); }
  sRoot.addEventListener("click", e => { const it = e.target.closest("button.sk-it"); if (it) return open(+it.dataset.i); if (e.target.closest(".sk-open")) open(0); });
  lb.addEventListener("click", e => {
    if (e.target.closest(".sk-x") || e.target === lb) return close();
    if (e.target.closest(".sk-ar.l")) return show(at - 1, -1);
    if (e.target.closest(".sk-ar.r")) return show(at + 1, 1);
    const t = e.target.closest(".sk-th button"); if (t) show(+t.dataset.i, +t.dataset.i > at ? 1 : -1);
  });
  addEventListener("keydown", e => {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") show(at - 1, -1); else if (e.key === "ArrowRight") show(at + 1, 1);
  });
  let sx = null;
  lb.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => { if (sx == null) return; const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) show(at + (d < 0 ? 1 : -1), d < 0 ? 1 : -1); sx = null; });

  /* ================= Personal projects ================= */
  const ICON = {
    site: `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 9h18M6 7h.01M8.5 7h.01"/></svg>`,
    pen: `<svg viewBox="0 0 24 24"><path d="M4 20l1-5L15.5 4.5a2.1 2.1 0 013 3L8 18z"/><path d="M13.5 6.5l3 3"/></svg>`,
    star: `<svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>`
  };
  // the three slots wait for her projects: visitors see that they're on the way, with no notes-to-self showing
  const PROJ = [
    { icon: "pen", t: "Project 01", meta: [], d: "On its way. This one is still being made.", btn: ["Coming soon"], im: [0, 0, 0] },
    { icon: "star", t: "Project 02", meta: [], d: "On its way.", btn: ["Coming soon"], im: [0, 0] },
    { icon: "bolt", t: "Project 03", meta: [], d: "On its way.", btn: ["Coming soon"], im: [0, 0] }
  ];
  const N = PROJ.length;
  const slide = (p, i) => `<article class="pp-sl" data-i="${i}" aria-label="${p.t}">
      <div class="pp-l"><div class="pp-im">${p.im.map((s, j) => s ? `<img src="${s}" alt="" loading="lazy" draggable="false" class="${j ? "" : "on"}">` : `<i class="pp-ph${j ? "" : " on"}"><span>${p.t} / ${pad(j + 1)}</span></i>`).join("")}</div>
        <div class="pp-dots">${p.im.map((_, j) => `<button type="button" class="${j ? "" : "on"}" data-j="${j}" aria-label="Picture ${j + 1}"></button>`).join("")}</div></div>
      <div class="pp-r"><p class="pp-n">${pad(i + 1)} / ${pad(N)}</p><h3 class="pp-t">${p.t}</h3>
        ${p.meta.length ? `<p class="pp-m">${p.meta.join("<i>/</i>")}</p>` : ""}
        <p class="pp-d">${p.d}</p>
        ${p.btn[1] ? `<a class="ls-btn pp-b" href="#${p.btn[1]}" data-ls="${p.btn[1]}">${p.btn[0]}</a>` : `<span class="ls-btn pp-b off">${p.btn[0]}</span>`}</div>
    </article>`;
  const projPage = LS.page({ key: "projects", fig: "gorilla", figBig: 1, slug: "personal_projects", kick: "Personal projects", sub: "Made because I wanted to",
    side: "Websites and things I make for myself, when nobody asked.",
    title: "Personal projects", body: ["Websites, experiments and things I build for myself.", "They are on the way."],
    hint: "keep scrolling, the projects slide across", prev: "world", next: "info", cta: ["Say hello", "info"],
    onScroll: root => slideTo(root),
    html: `
    <section class="ls-sec pp-sec" data-bg="#fff" style="--n:${N}">
      <div class="pp-stage">
        <header class="pp-hd"><p class="pp-k">SELECTED // PERSONAL PROJECTS</p>
          <nav class="pp-ic" aria-label="Projects">${PROJ.map((p, i) => `<button type="button" data-i="${i}" aria-label="${p.t}" class="${i ? "" : "on"}">${ICON[p.icon]}</button>`).join("")}</nav>
          <p class="pp-ct"><b>01</b> / ${pad(N)}</p></header>
        <div class="pp-track">${PROJ.map(slide).join("")}</div>
      </div>
    </section>` });
  const pRoot = projPage.root, sec = $(".pp-sec", pRoot), track = $(".pp-track", pRoot), slides = $$(".pp-sl", pRoot), pct = $(".pp-ct b", pRoot);
  const ease = f => { const k = clamp((f - .18) / .64, 0, 1); return k * k * (3 - 2 * k); };   // each project holds, then slides
  let cur = -1;
  function slideTo(root) {
    if (innerWidth < 760) return;   // on phones the projects stack
    const r = sec.getBoundingClientRect(), span = Math.max(1, sec.offsetHeight - root.clientHeight);
    const p = clamp(-r.top / span, 0, 1) * (N - 1), i = Math.floor(p), f = p - i, x = Math.min(N - 1, i + (calm ? Math.round(f) : ease(f)));
    track.style.transform = `translate3d(${(-x * 100 / N).toFixed(3)}%,0,0)`;
    slides.forEach((s, j) => { const d = j - x, a = Math.abs(d); s.style.setProperty("--d", d.toFixed(3)); s.style.setProperty("--o", Math.max(0, 1 - a * .9).toFixed(3)); s.style.setProperty("--o2", Math.max(0, 1 - a * 1.4).toFixed(3)); });
    const c = Math.round(x); if (c !== cur) { cur = c; pct.textContent = pad(c + 1); $$(".pp-ic button", pRoot).forEach((b, j) => b.classList.toggle("on", j === c)); }
  }
  pRoot.addEventListener("click", e => {
    const ic = e.target.closest(".pp-ic button");
    if (ic) { const span = sec.offsetHeight - pRoot.clientHeight; pRoot.scrollTo({ top: sec.offsetTop + span * (+ic.dataset.i / (N - 1)), behavior: calm ? "auto" : "smooth" }); return; }
    const d = e.target.closest(".pp-dots button"); if (!d) return;
    const sl = d.closest(".pp-sl"), j = +d.dataset.j;
    $$(".pp-im > *", sl).forEach((el, k) => el.classList.toggle("on", k === j)); $$(".pp-dots button", sl).forEach((b, k) => b.classList.toggle("on", k === j));
  });
  // the pictures change on their own every few seconds, like the reference
  setInterval(() => {
    if (!pRoot.classList.contains("on") || document.hidden) return;
    const sl = slides[Math.max(0, cur)]; if (!sl) return; const ds = $$(".pp-dots button", sl), j = ds.findIndex(b => b.classList.contains("on"));
    ds[(j + 1) % ds.length].click();
  }, 3600);
})();
