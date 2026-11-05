/* The VIP pass: handed to every visitor before the museum opens. It hangs on a real lanyard (verlet physics),
   the visitor draws their own photo and signs it, flips it to read the note, and it shrinks into their cursor. */
(() => {
  const C = window.COPY.vip, $ = (s, r = document) => r.querySelector(s);
  const fine = matchMedia("(pointer:fine)").matches, calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const store = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  const sess = { get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };

  /* ---------- the cursor: a tiny acrylic keychain pass with the visitor's own doodle in its photo spot */
  const PK = (() => {
    const el = document.createElement("div"); el.className = "pk"; el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<div class="pk-sw"><span class="pk-ring"></span><span class="pk-link"></span><span class="pk-tag"><span class="pk-in"><b>VIP</b><i></i><s></s><u></u></span></span></div><i class="pk-dot"></i>`;
    let on = false, x = -99, y = -99, lx = -99, a = 0, va = 0, vx = 0, last = 0;
    const HOT = "a,button,[role=button],input,label,[data-go],.mu-dw,.mu-ob,.dk-ob,.cd,.nb-leaf,.sy-k";
    function loop(now) {
      requestAnimationFrame(loop);
      const dt = Math.min(.05, (now - (last || now)) / 1000); last = now; if (!dt) return;
      vx += ((x - lx) / dt - vx) * .3; lx = x;
      va += (-55 * Math.sin(a) - 6 * va - vx * .014) * dt; a += va * dt; a = Math.max(-1.2, Math.min(1.2, a));
      el.style.transform = `translate3d(${x}px,${y}px,0)`; el.firstChild.style.transform = `rotate(${(a * 57.3).toFixed(2)}deg)`;
    }
    function photo(src) { const i = el.querySelector(".pk-in i"); if (src) i.style.backgroundImage = `url(${src})`; }
    function enable(src, px, py) {
      photo(src); if (!fine || on) return; on = true;
      document.body.appendChild(el); document.documentElement.classList.add("pk-on");
      if (px != null) { x = lx = px; y = py; el.classList.add("on"); }
      addEventListener("pointermove", e => { x = e.clientX; y = e.clientY; if (!el.classList.contains("on")) { lx = x; el.classList.add("on"); } }, { passive: true });
      document.addEventListener("pointerover", e => el.classList.toggle("hot", !!(e.target.closest && e.target.closest(HOT))));
      document.addEventListener("mouseout", e => { if (!e.relatedTarget) el.classList.remove("on"); });
      addEventListener("pointerdown", () => el.classList.add("down")); addEventListener("pointerup", () => el.classList.remove("down"));
      requestAnimationFrame(loop);
    }
    return { enable, photo, el };
  })();
  window.PASS = { cursor: PK, data: () => store.get("aa-vip") };

  /* already came in this session: no intro, just the cursor */
  const saved = store.get("aa-vip");
  if (sess.get("aa-vip-in") && saved) { PK.enable(saved.img); return; }

  /* ---------- the pass */
  const no = (saved && saved.no) || String(100000 + Math.floor(Math.random() * 899999));
  const issued = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }).toLowerCase();
  const fmtNo = no.replace(/(\d{3})(\d{3})/, "$1 $2");
  const heartPath = (cx, cy, s, rot, tail) => {
    let d = "", n = 90; const c = Math.cos(rot), si = Math.sin(rot);
    for (let i = 0; i <= n; i++) {
      const t = -Math.PI + (i / n) * Math.PI * 2 * (tail ? 1.08 : 1);
      let x = 16 * Math.sin(t) ** 3, y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      x *= s * (1 + .03 * Math.sin(i * .7)); y *= s;
      d += (i ? "L" : "M") + (cx + x * c - y * si).toFixed(1) + " " + (cy + x * si + y * c).toFixed(1);
    }
    if (tail) d += `Q${cx + 40 * s} ${cy + 26 * s} ${cx + 30 * s} ${cy + 8 * s}`;
    return d;
  };
  const vp = document.createElement("div"); vp.className = "vp"; vp.setAttribute("role", "dialog"); vp.setAttribute("aria-label", "Your VIP pass");
  vp.innerHTML = `
    <svg class="vp-hearts" viewBox="0 0 780 780" aria-hidden="true"><path pathLength="1" d="${heartPath(676, 150, 5, .32, 0)}"/><path pathLength="1" d="${heartPath(104, 650, 4.4, -.25, 0)}" style="transition-delay:.5s"/></svg>
    <div class="vp-behind" aria-hidden="true">${C.behind}</div>
    <div class="vp-top"><span>${C.topLeft}</span><span>${C.topRight}</span><button class="vp-skip" type="button">${C.buttons.skipIntro}</button></div>
    <canvas class="vp-rope" aria-hidden="true"></canvas>
    <div class="vp-shadow" aria-hidden="true"></div>
    <div class="vp-card" aria-label="Your VIP pass">
      <svg class="vp-clip" viewBox="0 0 24 46" aria-hidden="true"><defs><linearGradient id="vpMetal" x1="0" x2="1"><stop offset="0" stop-color="#8b8f95"/><stop offset=".35" stop-color="#f1f3f5"/><stop offset=".6" stop-color="#b7bbc1"/><stop offset="1" stop-color="#6f7378"/></linearGradient></defs>
        <circle cx="12" cy="5" r="4" fill="none" stroke="url(#vpMetal)" stroke-width="2.2"/><rect x="9.5" y="8" width="5" height="7" rx="1.5" fill="url(#vpMetal)"/>
        <path d="M7 16h10v12c0 3-2 5-5 5s-5-2-5-5z" fill="url(#vpMetal)"/><rect x="6" y="31" width="12" height="14" rx="1.8" fill="url(#vpMetal)"/><rect x="8.5" y="35" width="7" height="3" rx="1" fill="#55595e"/></svg>
      <div class="vp-flip">
        <div class="vp-face vp-front"><div class="vp-paper">
          <span class="vp-slot"></span>
          <div class="vp-hd"><h2 class="vp-big">${C.big}</h2><div class="vp-no">${C.noLabel}<b>${fmtNo}</b></div></div>
          <div class="vp-bars">${C.bars.map(b => `<span>${b}</span>`).join("")}</div>
          <div class="vp-mid">
            <div><div class="vp-photo" title="${C.drawHint}"><canvas width="312" height="396"></canvas>
              <div class="vp-ph"><svg viewBox="0 0 84 124"><path d="M42 18c-11 0-18 9-18 21 0 13 8 23 18 23s18-10 18-23c0-12-7-21-18-21zM8 124c2-24 16-38 34-38s32 14 34 38"/></svg><span>${C.drawHint}</span></div></div>
              <span class="vp-cap">${C.photo}</span></div>
            <div class="vp-fields">
              <div class="vp-f"><input class="vp-name" maxlength="20" placeholder="${C.fields[0][1]}" aria-label="Your name" autocomplete="off" spellcheck="false"><span class="l">${C.fields[0][0]}</span></div>
              <div class="vp-f"><span class="v">${issued}</span><span class="l">${C.fields[1][0]}</span></div>
              <div class="vp-f"><span class="v">${C.fields[2][1]}</span><span class="l">${C.fields[2][0]}</span></div>
              <div class="vp-f"><span class="v">${C.fields[3][1]}</span><span class="l">${C.fields[3][0]}</span></div>
            </div>
          </div>
          <div class="vp-foot"><div class="vp-fine">${C.fine}<span class="vp-mrz">${C.mrz}${no}</span></div>
            <svg class="vp-stamp" viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="30" cy="30" r="21" fill="none" stroke="currentColor" stroke-width=".8"/><text x="30" y="38" text-anchor="middle" font-family="Belmonte, cursive" font-size="22" fill="currentColor">aa</text></svg></div>
        </div><span class="vp-sleeve"></span></div>
        <div class="vp-face vp-back"><div class="vp-paper"><span class="vp-slot"></span>
          <div class="vp-note">${C.back.map(l => `<span class="ln">${l}</span>`).join("")}<span class="ln sg">${C.sign}<svg class="vp-heart" viewBox="0 0 30 26"><path pathLength="1" d="M15 24C8 18 2 13 3 7c1-4 6-6 9-3l3 3 3-3c3-3 8-1 9 3 1 6-5 11-12 17"/></svg></span></div>
          <p class="vp-ps">${C.ps}</p>
        </div><span class="vp-sleeve"></span></div>
      </div>
    </div>
    <p class="vp-n" data-n="yours"><span>${C.notes.yours}</span><svg width="1" height="1"><path pathLength="1"/></svg></p>
    <p class="vp-n" data-n="draw"><span>${C.notes.draw}</span><svg width="1" height="1"><path pathLength="1"/></svg></p>
    <p class="vp-n" data-n="sign"><span>${C.notes.sign}</span><svg width="1" height="1"><path pathLength="1"/></svg></p>
    <div class="vp-ctl">
      <button type="button" data-b="clear">${C.buttons.clear}</button>
      <button type="button" data-b="skip">${C.buttons.skip}</button>
      <button type="button" class="main" data-b="done">${C.buttons.done}</button>
      <button type="button" data-b="flip" hidden>${C.buttons.flipBack}</button>
      <button type="button" data-b="redo" hidden>${C.buttons.redo}</button>
      <button type="button" class="main" data-b="enter" hidden>${C.buttons.enter}</button>
    </div>`;
  document.body.appendChild(vp); document.body.classList.add("vp-open");
  const cv = $(".vp-rope", vp), ctx = cv.getContext("2d"), card = $(".vp-card", vp), flipEl = $(".vp-flip", vp), shadow = $(".vp-shadow", vp);
  const sleeves = [...vp.querySelectorAll(".vp-sleeve")], photo = $(".vp-photo", vp), pc = $(".vp-photo canvas", vp), pctx = pc.getContext("2d"), nameIn = $(".vp-name", vp);
  const btn = k => $(`[data-b="${k}"]`, vp);

  /* ---------- physics: two strap strands from the ceiling meet at the clip; the card hangs from the clip */
  const N = 13, DW = 290, DH = 410, CLIP = 38;
  let W = 0, H = 0, k = 1, dpr = 1, L = 0, seg = 0, L1 = 0, P = [], anchorY = 0, anchorV = 0, anchorT = 0;
  const pt = (x, y, inv = 1) => ({ x, y, px: x, py: y, inv });
  let chains = [[], []], p0, p1, mode = "drop", drag = null, drawing = null, flip = 0, flipT = 0, flipV = 0, tw = 0, twV = 0, t0 = performance.now(), alive = true;
  function layout(first) {
    W = innerWidth; H = innerHeight; dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    k = Math.max(.62, Math.min(1.15, (H - 170) / (DH + CLIP + 120), (W - 40) / (DW + 60)));
    const cy = H * .47, clipY = cy - (CLIP + DH / 2) * k;
    L = Math.hypot(30 * k, clipY + 40); seg = L / (N - 1); L1 = (CLIP + DH / 2) * k;
    if (first) {
      const off = -H * 1.25; anchorY = off; anchorT = -40;
      p0 = pt(W / 2, clipY + off); p1 = pt(W / 2, clipY + L1 + off, .3);
      chains = [-1, 1].map(s => { const c = []; for (let i = 0; i < N - 1; i++) { const u = i / (N - 1); c.push(pt(W / 2 + s * 30 * k * (1 - u), off - 40 + (clipY + 40) * u, i ? 1 : 0)); } c.push(p0); return c; });
    }
    card.style.width = DW + "px"; card.style.height = DH + "px"; shadow.style.width = DW + "px"; shadow.style.height = DH + "px";
    placeNotes();
  }
  function step(dt) {
    // the ceiling end eases down on a soft spring, so the pass drops in and swings
    anchorV += (-(anchorY - anchorT) * 28 - anchorV * 7.5) * dt; anchorY += anchorV * dt;
    chains.forEach((c, s) => { c[0].x = W / 2 + (s ? 1 : -1) * 30 * k; c[0].y = anchorY; });
    const g = 2400, all = [...chains[0].slice(1, -1), ...chains[1].slice(1, -1), p0, p1];
    for (const q of all) {
      if (!q.inv) continue; const vx = (q.x - q.px) * .992, vy = (q.y - q.py) * .992;
      q.px = q.x; q.py = q.y; q.x += vx; q.y += vy + g * dt * dt;
    }
    for (let it = 0; it < 14; it++) {
      for (const c of chains) for (let i = 0; i < c.length - 1; i++) link(c[i], c[i + 1], seg);
      link(p0, p1, L1);
    }
  }
  function link(a, b, len) {
    const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1e-6, w = a.inv + b.inv; if (!w) return;
    const diff = (d - len) / d / w; a.x += dx * diff * a.inv; a.y += dy * diff * a.inv; b.x -= dx * diff * b.inv; b.y -= dy * diff * b.inv;
  }
  const ang = () => Math.atan2(p1.x - p0.x, p1.y - p0.y);
  function topOf() { const a = ang(); return { x: p0.x + Math.sin(a) * CLIP * k, y: p0.y + Math.cos(a) * CLIP * k, a }; }

  function render(now) {
    if (!alive) return;
    const { x, y, a } = topOf(), vx = (p1.x - p1.px) * 60, deg = -a * 57.296;
    // the card twists a little on its strap as it swings, then settles
    twV += (-(tw - Math.max(-28, Math.min(28, vx * .05))) * 20 - twV * 4) * .016; tw += twV * .016;
    flipV += (-(flip - flipT) * 90 - flipV * 13) * .016; flip += flipV * .016;
    const amb = calm ? 0 : Math.sin((now - t0) / 1400) * 5 * Math.exp(-(now - t0) / 12000);
    const ry = flip + tw + amb;
    card.style.transform = `translate3d(${(x - DW / 2).toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${deg.toFixed(3)}deg) scale(${k})`;
    flipEl.style.transform = `rotateY(${ry.toFixed(2)}deg)`;
    const sx = (50 - ((ry % 360) + 360) % 180 * .9).toFixed(1) + "%"; sleeves.forEach(s => s.style.setProperty("--sx", sx));
    const sk = Math.abs(Math.cos(ry / 57.296));
    shadow.style.transform = `translate3d(${(x - DW / 2 + 20 * k).toFixed(1)}px,${(y + 30 * k).toFixed(1)}px,0) rotate(${deg.toFixed(2)}deg) scale(${(k * Math.max(.08, sk)).toFixed(3)},${k})`;
    drawRope();
  }
  function strand(c, ox, oy) {
    ctx.beginPath(); ctx.moveTo(c[0].x + ox, c[0].y + oy);
    for (let i = 1; i < c.length - 1; i++) { const mx = (c[i].x + c[i + 1].x) / 2, my = (c[i].y + c[i + 1].y) / 2; ctx.quadraticCurveTo(c[i].x + ox, c[i].y + oy, mx + ox, my + oy); }
    const e = c[c.length - 1]; ctx.lineTo(e.x + ox, e.y + oy); ctx.stroke();
  }
  function drawRope() {
    ctx.clearRect(0, 0, W, H); ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.save(); ctx.filter = `blur(${(6 * k).toFixed(1)}px)`; ctx.strokeStyle = "rgba(10,12,16,.17)"; ctx.lineWidth = 9 * k; chains.forEach(c => strand(c, 18 * k, 28 * k)); ctx.restore();
    ctx.strokeStyle = "#151516"; ctx.lineWidth = 9 * k; chains.forEach(c => strand(c, 0, 0));
    ctx.strokeStyle = "rgba(255,255,255,.1)"; ctx.lineWidth = 1.4 * k; chains.forEach(c => strand(c, -2.2 * k, 0));
    // "all access" printed along each strap
    ctx.fillStyle = "rgba(255,255,255,.62)"; ctx.font = `700 ${(6.4 * k).toFixed(1)}px Archivo, Arial, sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    chains.forEach((c, s) => {
      let acc = 0;
      for (let i = 1; i < c.length - 2; i++) {
        const a = c[i], b = c[i + 1], d = Math.hypot(b.x - a.x, b.y - a.y); acc += d;
        if (a.y < 0 || acc < 70 * k) continue; acc = 0;
        ctx.save(); ctx.translate((a.x + b.x) / 2, (a.y + b.y) / 2); ctx.rotate(Math.atan2(b.y - a.y, b.x - a.x)); ctx.fillText("ALL ACCESS", 0, .3); ctx.restore();
      }
    });
  }
  let last = 0, accT = 0;
  function frame(now) {
    if (!alive) return; requestAnimationFrame(frame);
    const dt = Math.min(.05, (now - (last || now)) / 1000); last = now; accT += dt;
    const h = 1 / 240; while (accT >= h) { holdPins(); step(h); accT -= h; }
    render(now);
    if (!vp.classList.contains("in") && anchorY > -60) { vp.classList.add("in"); setTimeout(() => showNotes(mode === "back" ? [] : saved ? [] : ["yours", "draw", "sign"]), 500); }
  }
  function holdPins() {
    const target = drag || drawing;
    if (target) { p1.inv = 0; p1.px = p1.x; p1.py = p1.y; p1.x += (target.tx - p1.x) * .5; p1.y += (target.ty - p1.y) * .5; }
    else if (!p1.inv) p1.inv = .3;
  }

  /* ---------- dragging the pass */
  const local = (cx, cy) => { // pointer -> card design coordinates
    const { x, y, a } = topOf(), dx = cx - x, dy = cy - y, c = Math.cos(a), s = Math.sin(a);
    return { x: (dx * c - dy * s) / k + DW / 2, y: (dx * s + dy * c) / k };
  };
  card.addEventListener("pointerdown", e => {
    if (mode === "fly" || e.target.closest("input,button")) return;
    if (e.target.closest(".vp-photo") && Math.abs(flip) < 30) return startDraw(e);
    e.preventDefault(); card.setPointerCapture(e.pointerId); card.classList.add("grab");
    drag = { ox: p1.x - e.clientX, oy: p1.y - e.clientY, tx: p1.x, ty: p1.y };
  });
  card.addEventListener("pointermove", e => {
    if (drag) { drag.tx = e.clientX + drag.ox; drag.ty = e.clientY + drag.oy; }
    else if (drawing) moveDraw(e);
  });
  const up = () => { if (drag) { drag = null; card.classList.remove("grab"); } if (drawing) endDraw(); };
  card.addEventListener("pointerup", up); card.addEventListener("pointercancel", up);

  /* ---------- drawing yourself into the photo box */
  let strokes = [], drawn = false;
  const PX = { x: 0, y: 0 }, SC = 3;
  function photoOrigin() { let x = 0, y = 0, n = photo; while (n && n !== card) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } PX.x = x; PX.y = y; }
  const toCanvas = e => { const l = local(e.clientX, e.clientY); return { x: (l.x - PX.x) * SC, y: (l.y - PX.y) * SC }; };
  function startDraw(e) {
    e.preventDefault(); card.setPointerCapture(e.pointerId); photoOrigin();
    drawing = { tx: p1.x, ty: p1.y, pts: [toCanvas(e)] }; strokes.push(drawing.pts); paint();
    if (!drawn) { drawn = true; photo.classList.add("drawn"); }
  }
  function moveDraw(e) { drawing.pts.push(toCanvas(e)); paint(); }
  function endDraw() { drawing = null; }
  function paint(prog) {
    pctx.clearRect(0, 0, pc.width, pc.height); pctx.lineCap = "round"; pctx.lineJoin = "round"; pctx.strokeStyle = "#1c2a72"; pctx.lineWidth = 2 * SC * .85;
    strokes.forEach((s, si) => {
      let n = s.length; if (prog != null) { const lim = prog * strokes.length - si; if (lim <= 0) return; n = Math.max(1, Math.floor(s.length * Math.min(1, lim))); }
      pctx.beginPath(); pctx.moveTo(s[0].x, s[0].y);
      if (n === 1) pctx.lineTo(s[0].x + .5, s[0].y + .5);
      for (let i = 1; i < n - 1; i++) pctx.quadraticCurveTo(s[i].x, s[i].y, (s[i].x + s[i + 1].x) / 2, (s[i].y + s[i + 1].y) / 2);
      if (n > 1) pctx.lineTo(s[n - 1].x, s[n - 1].y);
      pctx.stroke();
    });
  }
  function mystery() { // a little self-portrait for anyone who skips: a stranger with a question mark
    const S = (pts) => pts.map(([x, y]) => ({ x: x * SC, y: y * SC }));
    const ring = (cx, cy, rx, ry, a0 = 0, a1 = 6.3, n = 36) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + Math.cos(a) * rx * (1 + .03 * Math.sin(i)), cy + Math.sin(a) * ry]; });
    strokes = [S(ring(52, 58, 23, 29)), S([[30, 46], [36, 30], [46, 26], [52, 34], [58, 25], [68, 30], [74, 44]]), S([[43, 55], [44, 56]]), S([[61, 55], [62, 56]]),
      S([[52, 58], [49, 68], [53, 69]]), S(ring(52, 72, 9, 5, .3, 2.8, 14)), S([[40, 86], [38, 98]]), S([[64, 86], [66, 98]]), S([[10, 132], [16, 112], [34, 100], [52, 97], [70, 100], [88, 112], [94, 132]]),
      S([[82, 18], [86, 10], [94, 10], [96, 18], [90, 24], [89, 30]]), S([[89, 36], [89, 37]])];
    drawn = true; photo.classList.add("drawn");
    const t = performance.now(), dur = calm ? 1 : 1400;
    (function go(now) { const p = Math.min(1, (now - t) / dur); paint(p); if (p < 1) requestAnimationFrame(go); })(t);
    return new Promise(ok => setTimeout(ok, dur + 150));
  }
  const exportImg = () => { const c = document.createElement("canvas"); c.width = 104; c.height = 132; const x = c.getContext("2d"); x.fillStyle = "#cdd5dc"; x.fillRect(0, 0, 104, 132); x.drawImage(pc, 0, 0, 104, 132); return c.toDataURL("image/png"); };

  /* ---------- notes on the wall */
  function arrowPath(x1, y1, x2, y2, bend) {
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, cx = mx - dy * bend, cy = my + dx * bend, a = Math.atan2(y2 - cy, x2 - cx), h = 10;
    return `M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}M${(x2 - h * Math.cos(a - .5)).toFixed(1)} ${(y2 - h * Math.sin(a - .5)).toFixed(1)}L${x2} ${y2}L${(x2 - h * Math.cos(a + .5)).toFixed(1)} ${(y2 - h * Math.sin(a + .5)).toFixed(1)}`;
  }
  function placeNotes() {
    const cx = W / 2, cy = H * .47, cw = DW * k, ch = DH * k, wide = W > 900;
    const set = (n, left, top, ax1, ay1, ax2, ay2, bend, right) => {
      const el = $(`.vp-n[data-n="${n}"]`, vp); if (!el) return;
      el.style.display = wide ? "" : "none"; el.style.left = left + "px"; el.style.top = top + "px"; el.style.textAlign = right ? "right" : "left";
      if (right) el.style.transform = "translateX(-100%)"; else el.style.transform = "";
      el.querySelector("path").setAttribute("d", arrowPath(ax1, ay1, ax2, ay2, bend));
    };
    const L0 = cx - cw / 2, T0 = cy - ch / 2;
    set("yours", L0 - 70, T0 + ch * .05, 6, 14, 52, 26, -.3, true);
    set("draw", L0 - 60, T0 + ch * .58, 4, -4, 60 + 26 * k, -50, .25, true);
    set("sign", L0 + cw + 60, T0 + ch * .55, -6, 10, -40 - 70 * k, -6, -.3, false);
  }
  function showNotes(list) { vp.querySelectorAll(".vp-n").forEach(n => n.classList.toggle("on", list.includes(n.dataset.n))); }

  /* ---------- the flow */
  function setButtons(list) { ["clear", "skip", "done", "flip", "redo", "enter"].forEach(b => btn(b).hidden = !list.includes(b)); }
  function writeBack() {
    const lines = [...vp.querySelectorAll(".vp-note .ln")]; let t = 350;
    lines.forEach(l => { l.classList.remove("on"); const d = Math.max(.6, l.textContent.length * .055); l.style.setProperty("--d", d + "s"); setTimeout(() => l.classList.add("on"), t); t += d * 1000 + 120; });
    setTimeout(() => $(".vp-ps", vp).classList.add("on"), t);
  }
  async function done(skip) {
    if (skip && !drawn) await mystery();
    if (!nameIn.value.trim()) nameIn.value = skip && !strokes.length ? C.mysteryName : (skip ? C.mysteryName : C.defaultName);
    store.set("aa-vip", { no, name: nameIn.value.trim(), img: exportImg() });
    mode = "back"; flipT = 180; showNotes([]); setButtons(["flip", "enter"]); writeBack();
    setTimeout(() => btn("enter").focus({ preventScroll: true }), 300);
  }
  btn("clear").addEventListener("click", () => { strokes = []; drawn = false; photo.classList.remove("drawn"); paint(); });
  btn("skip").addEventListener("click", () => done(true));
  btn("done").addEventListener("click", () => done(false));
  btn("flip").addEventListener("click", () => { flipT = flipT ? 0 : 180; btn("flip").textContent = flipT ? C.buttons.flipBack : C.buttons.flipOver; });
  btn("redo").addEventListener("click", () => { strokes = []; drawn = false; photo.classList.remove("drawn"); paint(); nameIn.value = ""; flipT = 0; mode = "draw"; setButtons(["clear", "skip", "done"]); showNotes(["draw", "sign"]); });
  btn("enter").addEventListener("click", e => enter(e.clientX || W - 60, e.clientY || H - 60));
  $(".vp-skip", vp).addEventListener("click", () => { if (!store.get("aa-vip")) { mystery(); nameIn.value = C.mysteryName; store.set("aa-vip", { no, name: C.mysteryName, img: exportImg() }); } enter(W / 2, H / 2, true); });
  nameIn.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); nameIn.blur(); } });

  let px = W / 2, py = H / 2; addEventListener("pointermove", e => { px = e.clientX; py = e.clientY; }, { passive: true });
  function enter(x, y, quick) {
    if (mode === "fly") return; mode = "fly";
    const data = store.get("aa-vip") || { no, name: nameIn.value || C.defaultName, img: exportImg() }; store.set("aa-vip", data);
    sess.set("aa-vip-in", "1");
    const tx = fine ? px : W - 50, ty = fine ? py + 14 : H - 60;
    const t = topOf(), deg = -t.a * 57.296;
    alive = false; showNotes([]);
    card.style.transition = "none";
    card.animate([
      { transform: card.style.transform },
      { transform: `translate3d(${t.x - DW / 2}px,${t.y - 30}px,0) rotate(${deg * .4}deg) scale(${k * 1.04})`, offset: .2 },
      { transform: `translate3d(${tx - DW / 2}px,${ty}px,0) rotate(-8deg) scale(${24 / DW})` }
    ], { duration: quick ? 600 : 1100, easing: "cubic-bezier(.55,0,.2,1)", fill: "forwards" });
    shadow.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
    cv.animate([{ transform: "none" }, { transform: `translateY(${-H}px)` }], { duration: 700, delay: 100, easing: "cubic-bezier(.6,0,.8,.3)", fill: "forwards" });
    setTimeout(() => vp.classList.add("out"), quick ? 250 : 650);
    setTimeout(() => { PK.enable(data.img, fine ? px : null, fine ? py : null); vp.remove(); document.body.classList.remove("vp-open"); document.dispatchEvent(new CustomEvent("vip:in")); }, quick ? 900 : 1300);
  }

  /* returning visitors get their own pass back */
  if (saved) {
    nameIn.value = saved.name || ""; const im = new Image(); im.onload = () => { pctx.drawImage(im, 0, 0, pc.width, pc.height); }; im.src = saved.img;
    drawn = true; photo.classList.add("drawn"); setButtons(["redo", "enter"]);
    const n = $(`.vp-n[data-n="yours"] span`, vp); n.textContent = C.notes.back + (saved.name && saved.name !== C.defaultName && saved.name !== C.mysteryName ? ", " + saved.name : "");
    setTimeout(() => showNotes(["yours"]), 1200);
  } else setButtons(["clear", "skip", "done"]);
  layout(true); addEventListener("resize", () => layout(false));
  requestAnimationFrame(frame);
})();
