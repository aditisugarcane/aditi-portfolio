/* The frame around every page, after Longshot Features: the logo that opens the menu, the full-screen
   list of titles, the split black and white title card between pages, the little bug that crawls while a
   page loads, the page slug and the sticky button, "scroll down bruh", the page colour that fades from
   black through grey to white, the tilt on every animation, the video players, and the page template
   (after "The Composer, the Madman and the Budapest Orchestra"). */
(() => {
  const C = window.COPY.ls, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches, fine = matchMedia("(pointer:fine)").matches;
  const LS = window.LS = { busy: false };
  const PAGES = window.PAGES = window.PAGES || {};
  const titleOf = k => (C.menu.find(m => m[0] === k) || [k, k])[1];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), mix = (a, b, t) => a + (b - a) * t;

  /* ---------- sound, with an on/off switch that's remembered */
  let muted = false; try { muted = localStorage.getItem("aa-mute") === "1"; } catch (e) {}
  const rawSfx = window.FX.sfx; window.FX.sfx = (k, v) => { if (!muted) rawSfx(k, v); };

  /* ---------- the frame: close button, ticker, sound, links, page slug and the sticky button */
  const fr = document.createElement("div"); fr.className = "ls-frame";
  // each headline appears once per loop; the speed follows the length, so a longer list never looks rushed or repetitive
  const tick = C.ticker.map((t, i) => i ? `<span>${t}</span><b>//</b>` : `<span class="tk-hd">${t}</span><b class="tk-ln"></b>`).join("");
  const tickSecs = Math.max(40, C.ticker.join(" ").length * .32);
  fr.innerHTML = `
    <button class="ls-av" type="button" aria-label="${C.close}"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6"/></svg></button>
    <div class="ls-tick" aria-hidden="true"><div class="ls-tick-in" style="animation-duration:${tickSecs.toFixed(0)}s"><div>${tick}</div><div>${tick}</div></div></div>
    <p class="ls-slug" aria-hidden="true"></p>
    <a class="ls-cta ls-btn" href="#"></a>
    <div class="ls-foot"><button class="ls-snd" type="button" aria-label="${muted ? C.sound[0] : C.sound[1]}"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10"/><path class="sp" d="M5.5 8.2h2.2l3-2.4v8.4l-3-2.4H5.5z"/><path class="wv" d="M12.6 7.6c.9 1.3.9 3.5 0 4.8"/><path class="sl" d="M12.2 7.6l3.4 4.8M15.6 7.6l-3.4 4.8"/></svg></button><button type="button" class="ls-fl" data-card="info">${C.info}</button><button type="button" class="ls-fl" data-card="contact">${C.contact}</button></div>`;
  document.body.appendChild(fr);
  const av = $(".ls-av", fr), snd = $(".ls-snd", fr), slug = $(".ls-slug", fr), cta = $(".ls-cta", fr);
  const setSnd = () => { fr.classList.toggle("muted", muted); snd.setAttribute("aria-label", muted ? C.sound[0] : C.sound[1]); };
  setSnd();
  snd.addEventListener("click", () => { muted = !muted; try { localStorage.setItem("aa-mute", muted ? "1" : "0"); } catch (e) {} setSnd(); if (!muted) window.FX.sfx("tick", .25); });

  /* ---------- the menu: big titles on black, the one under the pointer turns white */
  const menu = document.createElement("nav"); menu.className = "ls-menu"; menu.setAttribute("aria-label", "Pages"); menu.hidden = true;
  menu.innerHTML = `<ul>${C.menu.map(([k, t, tag]) => `<li><a href="#${k}" data-ls="${k}"><span class="t">${t}</span>${tag ? `<em>&lt;${tag}&gt;</em>` : ""}</a></li>`).join("")}</ul>`;
  document.body.appendChild(menu);
  let menuOn = false;
  const mark = $(".mark");
  function setMenu(on) {
    if (on === menuOn) return; menuOn = on;
    mark && mark.setAttribute("aria-expanded", on);
    document.documentElement.classList.toggle("ls-menu-on", on);
    if (on) { menu.hidden = false; menu.scrollTop = 0; requestAnimationFrame(() => menu.classList.add("on")); window.FX.sfx("tick", .2); setTimeout(() => { const a = $("a", menu); a && a.focus({ preventScroll: true }); }, 60); }
    else { menu.classList.remove("on"); setTimeout(() => { if (!menuOn) menu.hidden = true; }, 420); }
  }
  LS.menu = setMenu;
  av.addEventListener("click", () => { setMenu(false); mark && mark.focus(); });
  if (mark) {   // the logo opens the menu; the menu's first line takes you home
    mark.setAttribute("aria-label", C.open); mark.setAttribute("aria-haspopup", "true"); mark.setAttribute("aria-expanded", "false");
    mark.addEventListener("click", e => { e.preventDefault(); e.stopPropagation(); if (!LS.busy) setMenu(true); }, true);
  }
  addEventListener("keydown", e => { if (e.key === "Escape" && menuOn) { setMenu(false); mark && mark.focus(); } });
  // the menu's titles drift a little toward the pointer
  if (fine && !calm) menu.addEventListener("pointermove", e => { const a = e.target.closest("a"); $$("a", menu).forEach(x => { x.style.transform = x === a ? `translateX(${((e.clientX / innerWidth) - .5) * 18}px)` : ""; }); });

  /* ---------- the title card between pages: white above, black below, the title sitting on the seam */
  const card = document.createElement("div"); card.className = "ls-card"; card.setAttribute("aria-hidden", "true");
  card.innerHTML = `<div class="ly lyb"><p class="ls-tt"></p></div><div class="ly lyw"><p class="ls-tt"></p></div><div class="ls-load"><img src="media/bugs/calligrapher.webp" alt="" draggable="false"></div>`;
  document.body.appendChild(card);
  const wait = ms => new Promise(r => setTimeout(r, calm ? Math.min(ms, 120) : ms));
  LS.current = "";
  LS.open = async (name, anchor) => {
    if (LS.busy) return;
    if (name === LS.current && !anchor) { setMenu(false); return; }
    if (name === LS.current && anchor) { setMenu(false); window.FX.scrollTo(anchor); return; }
    LS.busy = true;
    const t = name === "home" ? C.home.word : titleOf(name);
    $$(".ls-tt", card).forEach(p => p.textContent = t);
    card.className = "ls-card on"; window.FX.sfx("slide", .22);
    await wait(40); card.classList.add("s1");          // the white half drops in
    await wait(820);
    setMenu(false); menu.hidden = true; menu.classList.remove("on");
    window.SITE.go(name);                               // the page changes behind the card
    if (anchor) setTimeout(() => window.FX.scrollTo(anchor), 60);
    card.classList.add("s2");                          // white fades through grey to black, the bug crawls
    await wait(900);
    card.classList.add("s3"); LS.reveal(name);         // the card lifts away and the page plays in
    await wait(520);
    card.className = "ls-card"; LS.busy = false;
  };
  LS.reveal = name => { const p = PAGES[name]; if (p && p.reveal) p.reveal(); };
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-ls]"); if (!a) return; e.preventDefault();
    LS.open(a.dataset.ls, a.dataset.anchor || null);
  });

  /* ---------- the info and contact cards (after Longshot's): a white card opens over the page */
  const IC = C.cards;
  const cardEl = document.createElement("div"); cardEl.className = "ls-ic"; cardEl.hidden = true; cardEl.setAttribute("role", "dialog"); cardEl.setAttribute("aria-modal", "false");
  cardEl.innerHTML = `<div class="ls-ic-in"><button type="button" class="ls-ic-x" aria-label="Close"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6"/></svg></button><div class="ls-ic-body"></div></div>`;
  document.body.appendChild(cardEl);
  const icBody = $(".ls-ic-body", cardEl);
  const cardHTML = {
    info: () => `<p class="ls-ic-logo" aria-hidden="true">ADITI<br>ANUPAM</p>${IC.info.map(p => `<p>${p}</p>`).join("")}`,
    contact: () => IC.contact.map(([h, v, u]) => `<h4>${h}</h4><p>${u ? `<a href="${u}" target="_blank" rel="noopener">${v}</a>` : v}</p>`).join("")
  };
  let cardOn = null;
  function setCard(k) {
    if (k === cardOn) k = null;
    $$(".ls-fl", fr).forEach(b => b.classList.toggle("on", b.dataset.card === k));
    if (!k) { cardOn = null; cardEl.classList.remove("on"); setTimeout(() => { if (!cardOn) cardEl.hidden = true; }, 260); return; }
    const swap = !!cardOn; cardOn = k;
    const fill = () => { icBody.innerHTML = cardHTML[k](); cardEl.dataset.k = k; };
    if (swap) { cardEl.classList.remove("on"); setTimeout(() => { fill(); cardEl.classList.add("on"); }, 160); }
    else { fill(); cardEl.hidden = false; requestAnimationFrame(() => cardEl.classList.add("on")); }
    window.FX.sfx("tick", .18);
  }
  LS.card = setCard;
  fr.addEventListener("click", e => { const b = e.target.closest("[data-card]"); if (b) setCard(b.dataset.card); });
  $(".ls-ic-x", cardEl).addEventListener("click", () => setCard(null));
  document.addEventListener("pointerdown", e => { if (cardOn && !e.target.closest(".ls-ic-in,[data-card]")) setCard(null); });
  addEventListener("keydown", e => { if (e.key === "Escape" && cardOn) setCard(null); });

  /* ---------- "scroll down bruh": he peeks while you scroll, and pops up when you stop */
  const bruh = document.createElement("div"); bruh.className = "ls-bruh hide"; bruh.setAttribute("aria-hidden", "true");
  bruh.innerHTML = `<img src="media/ld/lizard.gif" alt="" draggable="false"><svg viewBox="0 0 120 90"><path d="M4 18 C 46 2, 92 14, 100 70" pathLength="1"/></svg><span>${C.bruh}</span>`;
  document.body.appendChild(bruh);
  let lastScroll = performance.now(), bruhState = "hide";
  const setBruh = s => { if (s !== bruhState) { bruhState = s; bruh.className = "ls-bruh " + s; } };
  LS.touch = () => { lastScroll = performance.now(); };

  /* ---------- page colour: black under the opening drawing, through grey, to white; then each section names its own */
  const setInk = (root, bg, dark) => {
    root.style.backgroundColor = bg; root.classList.toggle("is-dark", dark);
    document.documentElement.style.setProperty("--ls-ink", dark ? "#fff" : "#000");
    document.documentElement.classList.toggle("ls-dark", dark);
  };
  function tone(root) {
    const vh = root.clientHeight, y = root.scrollTop, hero = root._hero;
    if (hero) {
      const p = y / vh, g = p < .12 ? 0 : p < .62 ? (p - .12) / .5 * 232 : 232 + clamp((p - .62) / .38, 0, 1) * 23;
      const stick = root._stick, head = root._head;
      stick.style.opacity = (1 - clamp((p - .16) / .5, 0, 1) * (root._blk ? 1 : .9)).toFixed(3);
      // as on Longshot, only the drawing is there at first; the words arrive one at a time as you scroll
      root._k.style.opacity = clamp((p - .015) / .06, 0, 1).toFixed(3); root._s.style.opacity = clamp((p - .08) / .06, 0, 1).toFixed(3);
      head.style.opacity = clamp((p - .22) / .3, 0, 1).toFixed(3);
      if (y < hero.offsetHeight - vh * .4) { const c = Math.round(g); root._bg = null; setInk(root, `rgb(${c},${c},${c})`, c < 120); return; }
    }
    const secs = root._secs || (root._secs = $$(":scope > [data-bg]", root)); const mid = vh * .55;
    let bg = "#fff";
    for (const s of secs) { const r = s.getBoundingClientRect(); if (r.top <= mid) bg = s.dataset.bg; else break; }
    if (root._bg !== bg) { root._bg = bg; setInk(root, bg, bg === "#000"); }
  }
  LS.tone = tone;

  /* ---------- the tilt on every animation (after bencho's tilt card): the drawing sinks under the pointer,
     a soft shadow pools where it's pressed and a little light catches the far edge */
  const nbImg = (k, cls = "") => `<span class="ls-fig ${cls}"><span class="tf"><img src="media/ld/${k}.gif" alt="" draggable="false"><i class="sh" style="-webkit-mask-image:url(media/ld/${k}.gif);mask-image:url(media/ld/${k}.gif)"></i></span></span>`;
  LS.BLACK = ["gate", "launch", "tvs", "house", "lens", "stars", "cinema", "club", "marquee"];
  LS.AR = { gate: 1.62, launch: 1.71, house: .562, club: .683, lens: 1.113, a24: 1.86, barber: 1.994, bridge: 2.115, camera: 1.081, cinema: .859, cowgirl: 2.2, gorilla: .563, hand: 1, jars: 1.846, lizard: .695, marquee: 1.227, portrait: 1.068, puppet: .587, singer: 1.556, skeletons: 1.65, smoker: 1.154, toilet: .917, tvs: .658 };
  LS.fig = nbImg;   // the animations are Mattis Dovier's, used with his permission
  const tilts = new Set();
  const TK = .16, TD = .72, MAX = 10, SINK = 14;
  function tiltOf(el) {
    if (el._t) return el._t;
    const t = el._t = { el, tf: $(".tf", el), sh: $(".sh", el), x: 0, y: 0, l: 0, vx: 0, vy: 0, vl: 0, tx: 0, ty: 0, tl: 0 };
    return t;
  }
  document.addEventListener("pointermove", e => {
    const f = e.target.closest && e.target.closest(".ls-fig"); if (!f || calm) return;
    const t = tiltOf(f), r = f.getBoundingClientRect();
    t.tx = clamp((e.clientX - r.left) / r.width * 2 - 1, -1, 1); t.ty = clamp((e.clientY - r.top) / r.height * 2 - 1, -1, 1); t.tl = 1;
    tilts.add(t);
  }, { passive: true });
  document.addEventListener("pointerout", e => {
    const f = e.target.closest && e.target.closest(".ls-fig"); if (!f || (e.relatedTarget && f.contains(e.relatedTarget))) return;
    const t = tiltOf(f); t.tx = t.ty = t.tl = 0;
  });
  function stepTilt() {
    for (const t of tilts) {
      for (const [p, v, g] of [["x", "vx", "tx"], ["y", "vy", "ty"], ["l", "vl", "tl"]]) { t[v] += (t[g] - t[p]) * TK; t[v] *= TD; t[p] += t[v]; }
      const rx = -t.y * MAX, ry = t.x * MAX, px = (t.x + 1) * 50, py = (t.y + 1) * 50;
      t.tf.style.transform = `translateZ(${(-SINK * t.l).toFixed(2)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      t.sh.style.background = `radial-gradient(42% 34% at ${px}% ${py}%, rgba(0,0,0,${(.33 * t.l).toFixed(3)}), rgba(0,0,0,0) 100%), radial-gradient(52% 42% at ${100 - px}% ${100 - py}%, rgba(255,255,255,${(.2 * t.l).toFixed(3)}), rgba(255,255,255,0) 100%)`;
      t.el.classList.toggle("tilting", t.l > .02);
      if (!t.tl && Math.abs(t.x) + Math.abs(t.y) + t.l < .004 && Math.abs(t.vx) + Math.abs(t.vy) + Math.abs(t.vl) < .004) { t.x = t.y = t.l = 0; t.tf.style.transform = ""; t.sh.style.background = ""; t.el.classList.remove("tilting"); tilts.delete(t); }
    }
  }

  /* ---------- the video players: muted loops that play while you can see them; the sound bars unmute */
  LS.vid = (src, poster, cls = "") => `<figure class="ls-vid ${cls}"><video src="${src}" poster="${poster}" muted loop playsinline preload="none"></video>
    <button type="button" class="lv-snd" aria-label="Turn the sound on"><i></i><i></i><i></i></button>
    <div class="lv-bar"><button type="button" class="lv-pp" aria-label="Pause"><svg viewBox="0 0 10 10" aria-hidden="true"><path class="pa" d="M2.5 1.5v7M7.5 1.5v7"/><path class="pl" d="M2.5 1.2l6 3.8-6 3.8z"/></svg></button><span class="lv-t">00:00</span><i class="lv-pr"><b></b></i></div></figure>`;
  const vio = new IntersectionObserver(es => es.forEach(en => { const v = en.target; if (en.isIntersecting && !v._paused) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause(); }), { threshold: .25 });
  LS.wireVids = root => $$(".ls-vid video", root).forEach(v => {
    if (v._w) return; v._w = 1; vio.observe(v); const f = v.closest(".ls-vid"), b = $(".lv-pr b", f), t = $(".lv-t", f);
    v.addEventListener("timeupdate", () => { b.style.transform = `scaleX(${(v.currentTime / (v.duration || 1)).toFixed(3)})`; const s = Math.floor(v.currentTime); t.textContent = `00:${String(s).padStart(2, "0")}`; });
    v.addEventListener("play", () => f.classList.remove("paused")); v.addEventListener("pause", () => f.classList.add("paused"));
  });
  document.addEventListener("click", e => {
    const s = e.target.closest(".lv-snd"); if (s) { const f = s.closest(".ls-vid"), v = $("video", f); $$(".ls-vid video").forEach(o => { if (o !== v) { o.muted = true; o.closest(".ls-vid").classList.remove("loud"); } }); v.muted = !v.muted; f.classList.toggle("loud", !v.muted); if (!v.muted) v.play().catch(() => {}); return; }
    const p = e.target.closest(".lv-pp, .ls-vid video"); if (p) { const v = $("video", p.closest(".ls-vid")); if (v.paused) { v._paused = false; v.play().catch(() => {}); } else { v._paused = true; v.pause(); } }
  });

  /* ---------- building blocks for the pages */
  const bars = `<svg class="lp-bars" viewBox="0 0 14 12" aria-hidden="true"><path d="M1 12V7M5 12V2M9 12V5M13 12V8"/></svg>`;
  LS.hint = text => `<div class="lp-hint" data-r>${bars}<p>( ${text} )</p><svg class="lp-arr" viewBox="0 0 60 22" aria-hidden="true"><path d="M20 3c-2 8-6 12-12 14M8 17l1-5M8 17l5-1M40 3c2 8 6 12 12 14M52 17l-1-5M52 17l-5-1"/></svg></div>`;
  LS.node = (t, s) => `<div class="tl-node" data-r><b>${t}</b><span>${s}</span></div>`;
  LS.row = (node, l, r) => `<div class="tl-row">${node || ""}${l ? `<div class="tl-l" data-r>${l}</div>` : ""}${r ? `<div class="tl-r" data-r>${r}</div>` : ""}</div>`;
  LS.pair = (a, b) => `<div class="tl-pair">${a}${b}</div>`;
  LS.note = (title, photo, cap, body, dark) => `<section class="ls-sec lp-note" data-bg="${dark ? "#000" : "#fff"}">
      <figure class="lp-pol" data-r>${photo}<figcaption>${cap}</figcaption></figure>
      <div class="lp-note-t"><h3 class="lp-cap" data-r>${title}</h3>${body.map(p => `<p class="lp-p" data-r>${p}</p>`).join("")}</div></section>`;
  /* her own drawings, in colour, tucked into the pages: small, drifting a little as you scroll */
  LS.splash = (n, pos, rot = 0) => `<img class="ls-splash" src="media/il/il-${String(n).padStart(2, "0")}.webp" alt="" loading="lazy" draggable="false" style="${pos}" data-px=".08" data-rot="${rot}">`;
  LS.credits = (rows, extra = "") => `<section class="ls-sec lp-cred" data-bg="#000"><div><h3 class="lp-cap" data-r>Credits</h3><ul data-r>${rows.map(([a, b]) => `<li><span>${a}</span><span>${b}</span></li>`).join("")}</ul></div>${extra}</section>`;
  LS.footer = (prev, next) => `<footer class="ls-ft"><div class="ls-ft-row"><a href="#${prev}" data-ls="${prev}">${titleOf(prev)}</a><a href="#${next}" data-ls="${next}">${titleOf(next)}</a></div><div class="ls-ft-cr"><span>${C.copy}</span><span>${C.credit}</span></div></footer>`;

  /* ---------- the page template */
  LS.page = o => {
    const root = document.createElement("section"); root.className = "ls-pg ls-" + o.key; root.setAttribute("aria-label", titleOf(o.key));
    root.innerHTML = `
      <div class="lp-hero">
        <div class="lp-stick">
          <div class="ls-in-k"><b>${o.kick}</b><span>${o.sub}</span></div>
          <figure class="ls-in-f${o.figBig ? " big" : ""}" style="--ar:${LS.AR[o.fig] || 1}">${nbImg(o.fig)}<i class="floor"></i>${o.heroExtra || ""}</figure>
          <p class="ls-in-s">${o.side}</p>
        </div>
        <header class="lp-head">${(o.splash || []).map(a => LS.splash(...a)).join("")}
          <h2 class="lp-title" data-r>${o.title}</h2>
          <div class="lp-body" data-r>${o.body.map(p => `<p>${p}</p>`).join("")}</div>
          ${o.hint ? LS.hint(o.hint) : ""}
        </header>
      </div>
      ${o.html}
      ${LS.footer(o.prev, o.next)}`;
    document.body.appendChild(root);
    root._hero = $(".lp-hero", root); root._stick = $(".lp-stick", root); root._head = $(".lp-head", root); root._k = $(".ls-in-k", root); root._s = $(".ls-in-s", root); root._blk = LS.BLACK.includes(o.fig);
    let raf = 0;
    const onS = () => { raf = 0; tone(root); o.onScroll && o.onScroll(root); const past = root.scrollTop > root.clientHeight * 1.05; cta.classList.toggle("on", !!o.cta && past && LS.current === o.key); };
    root.addEventListener("scroll", () => { LS.touch(); if (!raf) raf = requestAnimationFrame(onS); }, { passive: true });
    const page = PAGES[o.key] = {
      root,
      active(on) {
        root.classList.toggle("on", on);
        if (on) {
          root.scrollTop = 0; root.classList.remove("play"); root._bg = null; tone(root); window.FX.setPage(o.key, root, o.key); LS.wireVids(root); o.onScroll && o.onScroll(root);
          slug.textContent = "aditi_anupam / " + o.slug; fr.classList.add("on-pg");
          if (o.cta) { cta.textContent = o.cta[0]; cta.dataset.ls = o.cta[1]; cta.href = "#" + o.cta[1]; } cta.classList.remove("on");
          if (!LS.busy) requestAnimationFrame(() => page.reveal());
        }
        o.onActive && o.onActive(on);
      },
      reveal() { root.classList.remove("play"); void root.offsetWidth; root.classList.add("play"); }
    };
    return page;
  };
  LS.leavePages = () => { fr.classList.remove("on-pg"); cta.classList.remove("on"); };

  /* ---------- buttons lean toward the pointer a touch */
  if (fine && !calm) {
    document.addEventListener("pointermove", e => { const b = e.target.closest && e.target.closest(".ls-btn"); if (!b) return; const r = b.getBoundingClientRect(); b.style.translate = `${((e.clientX - r.left) / r.width - .5) * 8}px ${((e.clientY - r.top) / r.height - .5) * 6}px`; }, { passive: true });
    document.addEventListener("pointerout", e => { const b = e.target.closest && e.target.closest(".ls-btn"); if (b && !(e.relatedTarget && b.contains(e.relatedTarget))) b.style.translate = ""; });
  }

  const narrow = matchMedia("(max-width:760px)"); let headSc = null, headY = 0, headOff = false;
  const setHead = off => { if (off !== headOff) { headOff = off; document.documentElement.classList.toggle("ls-head-off", off); } };
  /* ---------- one loop: the tilt springs and the bruh helper */
  (function loop(now) {
    requestAnimationFrame(loop);
    if (tilts.size) stepTilt();
    const sc = window.FX.scroller, pg = sc && sc.classList.contains("ls-pg") && sc.classList.contains("on");
    // on a phone, the logo, the page name and the button slide away while you read down the page, and come back when you scroll up
    if (narrow.matches && pg && !menuOn) {
      const y = sc.scrollTop, end = sc.scrollHeight - sc.clientHeight - y < sc.clientHeight * .4;
      if (sc !== headSc) { headSc = sc; headY = y; }
      if (y < 140) setHead(false); else if (end || y > headY + 8) setHead(true); else if (y < headY - 8) setHead(false);
      if (Math.abs(y - headY) > 8) headY = y;
    } else setHead(false);
    if (!pg || menuOn || LS.busy || sc.classList.contains("ls-world") || sc.classList.contains("ls-projects")) { setBruh("hide"); return; }
    const vh = sc.clientHeight, left = sc.scrollHeight - sc.clientHeight - sc.scrollTop;
    if (sc.scrollTop < vh * 1.3 || left < vh * 1.1) { setBruh("hide"); return; }
    // on a phone he only peeks while you scroll, and ducks out of the way when you stop to read
    setBruh(narrow.matches ? (now - lastScroll > 1400 ? "hide" : "peek") : now - lastScroll > 1400 ? "up" : "peek");
  })(0);

  /* ---------- after the printer: the home page plays in */
  document.addEventListener("intro:done", () => setTimeout(() => LS.reveal(LS.current || "home"), 250));
})();
