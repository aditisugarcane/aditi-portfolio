/* Site-wide pieces: paper grain, the bug cursor (a different bug on every page), the worm scroller,
   the magnifier lens, the top navigation, scroll reveals and parallax, and a small sound helper. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const S = (window.COPY && window.COPY.site) || {};
  const fine = matchMedia("(pointer:fine)").matches, calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const FX = window.FX = { page: "home", scroller: null };

  /* ---------- sound: only a few, quiet, and only after the visitor has touched the page */
  const bank = {};
  FX.sfx = (k, vol = .5) => { try { const a = bank[k] || (bank[k] = new Audio(`media/sfx2/${k}.mp3`)); const b = a.cloneNode(); b.volume = vol; b.play().catch(() => {}); } catch (e) {} };

  /* ---------- grain, like the Atelier pages: a fine noise tile that jitters a few times a second */
  (function grain() {
    const c = document.createElement("canvas"); c.width = c.height = 220; const x = c.getContext("2d"), d = x.createImageData(220, 220);
    for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255 | 0; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 26; }
    x.putImageData(d, 0, 0);
    const g = document.createElement("div"); g.className = "fx-grain"; g.setAttribute("aria-hidden", "true"); g.style.backgroundImage = `url(${c.toDataURL()})`;
    document.body.appendChild(g);
  })();

  /* ---------- the bug cursor */
  const BUGS = { intro: "spotted", home: "calligrapher", films: "scarab", accents: "ladybird", other: "gold" };
  const bug = document.createElement("div"); bug.className = "fx-bug"; bug.setAttribute("aria-hidden", "true"); bug.innerHTML = `<img alt="" draggable="false">`;
  const bugImg = bug.querySelector("img");
  let bx = -100, by = -100, tx = -100, ty = -100, ang = 0, angT = 0, seen = false, hot = false, lastMove = 0;
  function setBug(page) { const k = BUGS[page] || BUGS.other; if (bugImg.dataset.k !== k) { bugImg.dataset.k = k; bugImg.src = `media/bugs/${k}.webp`; bug.classList.remove("swap"); void bug.offsetWidth; bug.classList.add("swap"); } }
  if (false && fine) {   // the bug cursor is retired; app/extras.js draws the flower trail
    document.body.appendChild(bug); document.documentElement.classList.add("fx-bug-on");
    addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; lastMove = performance.now(); if (!seen) { bx = tx; by = ty; seen = true; bug.classList.add("on"); } }, { passive: true });
    document.addEventListener("pointerover", e => { const h = !!(e.target.closest && e.target.closest("a,button,[role=button],[role=slider],input,label,.cd,[data-hot]")); if (h !== hot) { hot = h; bug.classList.toggle("hot", h); } });
    document.addEventListener("mouseout", e => { if (!e.relatedTarget) bug.classList.remove("on"), seen = false; });
    addEventListener("pointerdown", () => bug.classList.add("down")); addEventListener("pointerup", () => bug.classList.remove("down"));
    (function crawl(now) {
      requestAnimationFrame(crawl);
      const k = calm ? 1 : .32, vx = tx - bx, vy = ty - by; bx += vx * k; by += vy * k;
      const sp = Math.hypot(vx, vy);
      if (sp > 1.2) angT = Math.atan2(vx, -vy) * 57.2958; // the head points where it's going
      let da = ((angT - ang + 540) % 360) - 180; ang += da * (calm ? 1 : .16);
      const idle = now - lastMove > 900, wig = idle && !calm ? Math.sin(now / 140) * 2.2 * (Math.sin(now / 1700) > .6 ? 1 : 0) : 0;
      bug.style.transform = `translate3d(${bx.toFixed(1)}px,${by.toFixed(1)}px,0) rotate(${(ang + wig).toFixed(1)}deg)`;
    })(0);
  }

  /* ---------- the top navigation: one clean bar, the logo always goes home */
  const nav = document.createElement("nav"); nav.className = "fx-nav"; nav.setAttribute("aria-label", "Pages");
  nav.innerHTML = `<i class="fx-pill" aria-hidden="true"></i>`; // the portrait menu in ls.js does the navigating now
  const pill = $(".fx-pill", nav);
  function navOn(k) {
    const a = $(`[data-nav="${k}"]`, nav); $$("a", nav).forEach(x => x.toggleAttribute("aria-current", x === a));
    if (!a) { pill.style.opacity = 0; return; }
    pill.style.opacity = 1; pill.style.width = a.offsetWidth + "px"; pill.style.transform = `translateX(${a.offsetLeft}px)`;
  }
  nav.addEventListener("click", e => {
    const a = e.target.closest("[data-nav]"); if (!a) return; e.preventDefault(); const k = a.dataset.nav;
    if (k === "about") { window.SITE.go("home"); setTimeout(() => FX.scrollTo("#about"), 60); navOn("about"); return; }
    window.SITE.go(k);
  });
  addEventListener("resize", () => navOn(FX.navKey));

  /* ---------- the worm scroller: an extra scroller you can drag, which wiggles while it moves */
  const worm = document.createElement("div"); worm.className = "fx-worm"; worm.setAttribute("aria-hidden", "true");
  worm.innerHTML = `<i class="tr"></i><div class="fx-w" title="${S.worm || ""}"><svg viewBox="0 0 26 78"><path class="bd"/><path class="hl"/><circle class="ey" r="1.5"/></svg></div>`;
  document.body.appendChild(worm);
  const wEl = $(".fx-w", worm), wBody = $(".bd", worm), wHl = $(".hl", worm), wEye = $(".ey", worm);
  let wDrag = null, wAmp = 0, wPhase = 0, lastTop = 0, wVel = 0;
  function wormPath(amp, ph) {
    const n = 18, pts = [];
    for (let i = 0; i <= n; i++) { const s = i / n, y = 6 + s * 66, x = 13 + amp * Math.sin(s * Math.PI * 2.2 - ph) * Math.sin(s * Math.PI); pts.push([x, y]); }
    let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`; for (let i = 1; i < pts.length; i++) d += `L${pts[i][0].toFixed(2)} ${pts[i][1].toFixed(2)}`;
    return { d, head: pts[0] };
  }
  wEl.addEventListener("pointerdown", e => { const sc = FX.scroller; if (!sc) return; e.preventDefault(); wEl.setPointerCapture(e.pointerId); wDrag = { y: e.clientY, top: sc.scrollTop }; worm.classList.add("drag"); });
  wEl.addEventListener("pointermove", e => { if (!wDrag) return; const sc = FX.scroller, tr = $(".tr", worm).getBoundingClientRect(), max = sc.scrollHeight - sc.clientHeight; sc.scrollTop = wDrag.top + (e.clientY - wDrag.y) / Math.max(1, tr.height - 78) * max; });
  const wUp = () => { wDrag = null; worm.classList.remove("drag"); }; wEl.addEventListener("pointerup", wUp); wEl.addEventListener("pointercancel", wUp);

  /* ---------- the magnifier lens: a glass circle that shows what's underneath a line */
  const lens = document.createElement("div"); lens.className = "fx-lens"; lens.setAttribute("aria-hidden", "true"); lens.innerHTML = `<i class="rim"></i><i class="glint"></i>`;
  document.body.appendChild(lens);
  let lensBox = null, lx = 0, ly = 0, ltx = 0, lty = 0, lr = 0, lrT = 0;
  const LR = 92;
  function lensify(root) {
    $$("[data-lens]", root).forEach(box => {
      if (box._lens) return; box._lens = true;
      const alt = box.cloneNode(true); alt.removeAttribute("data-lens"); alt.classList.add("lens-alt"); alt.setAttribute("aria-hidden", "true");
      $$("[data-alt]", alt).forEach(el => { el.textContent = el.dataset.alt; el.classList.add("alt"); });
      box.classList.add("lens-base"); box.style.position = box.style.position || "relative";
      const wrap = document.createElement("div"); wrap.className = "lens-wrap"; box.parentNode.insertBefore(wrap, box); wrap.appendChild(box); wrap.appendChild(alt);
      wrap.addEventListener("pointerenter", () => { lensBox = wrap; lrT = LR; lens.classList.add("on"); });
      wrap.addEventListener("pointerleave", () => { lrT = 0; lens.classList.remove("on"); });
    });
  }
  FX.lensify = lensify;
  addEventListener("pointermove", e => { ltx = e.clientX; lty = e.clientY; }, { passive: true });

  /* ---------- reveals and parallax inside the active page */
  let io = null;
  function watch(root) {
    if (io) io.disconnect();
    io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { root: FX.scroller, threshold: .18, rootMargin: "0px 0px -6% 0px" });
    $$("[data-r]:not(.in)", root).forEach(el => io.observe(el));
  }
  FX.splitLines = root => $$("[data-split]", root).forEach(h => {
    if (h._split) return; h._split = true;
    const words = h.innerHTML.split(/(<br>|\s+)/).filter(w => w && w.trim() !== "" || w === "<br>");
    let i = 0; h.innerHTML = words.map(w => w === "<br>" ? "<br>" : `<span class="xw"><span style="--i:${i++}">${w}</span></span>`).join(" ");
  });

  /* ---------- page switching (called by the router) */
  FX.setPage = (page, scroller, navKey) => {
    FX.page = page; FX.scroller = scroller || null; FX.navKey = navKey || page;
    setBug(page); navOn(FX.navKey);
    document.documentElement.classList.toggle("fx-has-scroll", !!scroller);
    if (scroller) { FX.splitLines(scroller); lensify(scroller); requestAnimationFrame(() => watch(scroller)); lastTop = scroller.scrollTop; }
  };
  FX.scrollTo = sel => { const sc = FX.scroller, el = typeof sel === "string" ? $(sel, sc || document) : sel; if (!sc || !el) return; sc.scrollTo({ top: el.offsetTop - 70, behavior: calm ? "auto" : "smooth" }); };
  setBug("intro");

  /* ---------- one loop for the worm, the lens and the parallax */
  let lastT = 0;
  (function tick(now) {
    requestAnimationFrame(tick);
    const dt = Math.min(.05, (now - (lastT || now)) / 1000); lastT = now;
    const sc = FX.scroller;
    // worm
    if (sc) {
      const max = sc.scrollHeight - sc.clientHeight, p = max > 0 ? sc.scrollTop / max : 0, trH = worm.clientHeight || 1;
      const v = (sc.scrollTop - lastTop) / Math.max(dt, .001); lastTop = sc.scrollTop; wVel += (v - wVel) * .2;
      worm.classList.toggle("none", max < 40);
      const moving = Math.abs(wVel) > 40 || wDrag;
      worm.classList.toggle("live", !!moving);
      wAmp += ((moving && !calm ? Math.min(6.5, 2.5 + Math.abs(wVel) / 500) : 0) - wAmp) * .12; wPhase += dt * (6 + Math.min(14, Math.abs(wVel) / 300)) * (wVel < 0 ? -1 : 1);
      const { d, head } = wormPath(wAmp, wPhase); wBody.setAttribute("d", d); wHl.setAttribute("d", d); wEye.setAttribute("cx", head[0] + .6); wEye.setAttribute("cy", head[1] + 2.4);
      wEl.style.transform = `translateY(${(p * (trH - 78)).toFixed(1)}px)`;
      // parallax: [data-px] drift against the scroll, [data-rot] turn a little
      const vh = sc.clientHeight;
      $$("[data-px]", sc).forEach(el => {
        const r = el._r || (el._r = { top: 0 }); const box = el.parentElement.getBoundingClientRect(), mid = box.top + box.height / 2 - vh / 2;
        const sp = +el.dataset.px, ro = +(el.dataset.rot || 0);
        el.style.transform = `translate3d(0,${(mid * sp).toFixed(1)}px,0) rotate(${(mid * ro / 100).toFixed(2)}deg)`;
      });
    }
    // lens
    if (lensBox) {
      lx += (ltx - lx) * (calm ? 1 : .2); ly += (lty - ly) * (calm ? 1 : .2); lr += (lrT - lr) * (calm ? 1 : .16);
      if (lr < .5 && lrT === 0) { lr = 0; lensBox.style.setProperty("--lr", "0px"); lensBox = null; }
      else {
        const b = lensBox.getBoundingClientRect(), rx = lx - b.left, ry = ly - b.top;
        lensBox.style.setProperty("--lx", rx.toFixed(1) + "px"); lensBox.style.setProperty("--ly", ry.toFixed(1) + "px"); lensBox.style.setProperty("--lr", lr.toFixed(1) + "px");
        lens.style.transform = `translate3d(${(lx - LR).toFixed(1)}px,${(ly - LR).toFixed(1)}px,0) scale(${(lr / LR).toFixed(3)})`;
      }
    }
  })(0);
})();
