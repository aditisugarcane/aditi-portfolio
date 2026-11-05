/* Little extras: the flower-trail cursor (pink flowers that bloom behind the pointer and drift away), and
   Aditi's lamps, which switch on and off when you pull their chains. */
(() => {
  const LS = window.LS, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fine = matchMedia("(pointer:fine)").matches, calm = matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ---------------- the flower trail ---------------- */
  if (fine) {
    document.documentElement.classList.add("fl-cursor");
    const cv = document.createElement("canvas"); cv.className = "fl-trail"; cv.setAttribute("aria-hidden", "true"); document.body.appendChild(cv);
    const x = cv.getContext("2d"); let dpr = 1;
    const fit = () => { dpr = Math.min(2, devicePixelRatio || 1); cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; };
    fit(); addEventListener("resize", fit);
    // one flower drawn once, then stamped
    const sprite = (() => {
      const s = document.createElement("canvas"), R = 32; s.width = s.height = R * 2; const c = s.getContext("2d"); c.translate(R, R);
      for (let i = 0; i < 6; i++) { c.save(); c.rotate(i * Math.PI / 3); c.beginPath(); c.ellipse(0, -R * .48, R * .26, R * .44, 0, 0, Math.PI * 2);
        const g = c.createLinearGradient(0, -R * .9, 0, 0); g.addColorStop(0, "#ff7ad6"); g.addColorStop(1, "#ff2fb4"); c.fillStyle = g; c.fill(); c.restore(); }
      c.beginPath(); c.arc(0, 0, R * .22, 0, Math.PI * 2); c.fillStyle = "#ffe36b"; c.fill();
      c.beginPath(); c.arc(-R * .05, -R * .05, R * .09, 0, Math.PI * 2); c.fillStyle = "#fff6c2"; c.fill();
      return s;
    })();
    const P = []; let lx = null, ly = null, glow = 0, gx = 0, gy = 0;
    addEventListener("pointermove", e => {
      gx = e.clientX; gy = e.clientY;
      if (lx === null) { lx = gx; ly = gy; return; }
      const d = Math.hypot(gx - lx, gy - ly), n = Math.min(10, Math.floor(d / 7));
      for (let i = 0; i < n; i++) {
        const t = (i + 1) / n, px = lx + (gx - lx) * t, py = ly + (gy - ly) * t;
        P.push({ x: px + (Math.random() - .5) * 14, y: py + (Math.random() - .5) * 14, vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5 + .12,
          s: 2.2 + Math.random() * 3.6, r: Math.random() * 6.28, vr: (Math.random() - .5) * .04, life: 0, max: 900 + Math.random() * 1500, big: Math.random() < .08 });
      }
      if (n) { lx = gx; ly = gy; glow = Math.min(1, glow + d / 160); }
      if (P.length > 420) P.splice(0, P.length - 420);
    }, { passive: true });
    document.addEventListener("mouseleave", () => { lx = null; });
    let last = performance.now();
    (function loop(now) {
      requestAnimationFrame(loop);
      const dt = Math.min(50, now - last); last = now;
      x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, innerWidth, innerHeight);
      if (!P.length && glow < .01) return;
      // the soft pink glow right behind the pointer
      glow *= .94;
      if (glow > .02) { const g = x.createRadialGradient(gx, gy, 0, gx, gy, 46); g.addColorStop(0, `rgba(255,60,200,${(.42 * glow).toFixed(3)})`); g.addColorStop(1, "rgba(255,60,200,0)"); x.fillStyle = g; x.fillRect(gx - 50, gy - 50, 100, 100); }
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i]; p.life += dt; if (p.life > p.max) { P.splice(i, 1); continue; }
        if (!calm) { p.x += p.vx; p.y += p.vy; p.r += p.vr; }
        const k = p.life / p.max, a = k < .08 ? k / .08 : 1 - Math.pow((k - .08) / .92, 1.6), sz = p.s * (p.big ? 1.7 : 1) * (.6 + .4 * Math.min(1, k * 6));
        x.globalAlpha = Math.max(0, a) * .95;
        if (k < .35) { x.globalAlpha *= 1; const g = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 2.4); g.addColorStop(0, "rgba(255,70,205,.35)"); g.addColorStop(1, "rgba(255,70,205,0)"); x.fillStyle = g; x.fillRect(p.x - sz * 2.4, p.y - sz * 2.4, sz * 4.8, sz * 4.8); }
        x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.drawImage(sprite, -sz, -sz, sz * 2, sz * 2); x.restore();
      }
      x.globalAlpha = 1;
    })(last);
  }

  /* ---------------- the lamps ---------------- */
  const M = { 1: { w: 227, h: 525, cords: [[15.42, 47.05, 13.66, 24.38]], shade: "26.4% 5.7%,73.6% 5.7%,98.7% 44.4%,0.9% 44.4%", glow: [49.3, 34] },
    2: { w: 313, h: 447, cords: [[27.16, 40.94, 7.03, 20.36], [66.45, 40.94, 6.39, 20.36]], shade: "45.7% 3%,60.1% 3%,98.4% 38%,1% 38%", glow: [49.8, 26] },
    3: { w: 275, h: 350, cords: [[72.73, 30, 5.82, 29.71]], shade: "10.9% 1.4%,96.4% 5.7%,97.5% 24.3%,10.9% 35.7%", glow: [52.7, 28] },
    4: { w: 235, h: 910, cords: [], shade: "19.1% 0.8%,70.2% 0.8%,97.9% 22.7%,2.1% 22.7%", glow: [49.8, 15] } };
  LS.lamp = (n, pos, on = false, side) => {
    const m = M[n];
    const cords = m.cords.map(([l, t, w, h], i) => `<span class="lp-cord" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%"><img src="media/lamp/lamp${n}-cord${i}.webp" alt="" draggable="false"></span>`).join("")
      || `<span class="lp-cord drawn" style="left:86%;top:21.6%;width:6%;height:11%"><svg viewBox="0 0 14 100" preserveAspectRatio="none"><path d="M7 0 C 6.4 30 7.6 60 7 86" fill="none" stroke="#5b4636" stroke-width="1.1"/><path d="M4.2 86 Q7 82 9.8 86 L 8.4 99 Q7 100.6 5.6 99 Z" fill="#c9a36a" stroke="#5b4636" stroke-width=".8"/></svg></span>`;
    // a little note in her handwriting, pointing at the chain, until the lamp has been switched on once
    const cs = m.cords.length ? m.cords : [[86, 21.6, 6, 11]], c0 = side === "l" ? cs[0] : cs[cs.length - 1], right = side ? side === "r" : c0[0] > 45;
    const hint = `<img class="lp-hint ${right ? "r" : "l"}" src="media/notes/hint-pull-${right ? "l" : "r"}.webp" alt="" draggable="false" style="top:${(c0[1] + c0[3] * .55).toFixed(1)}%;${right ? `left:${(c0[0] + c0[2] + 3).toFixed(1)}%` : `right:${(100 - c0[0] + 3).toFixed(1)}%`}">`;
    return `<div class="lamp l${n}${on ? " on" : ""}" style="aspect-ratio:${m.w}/${m.h};${pos}" data-lamp>${hint}
      <i class="lp-halo" style="left:${m.glow[0]}%;top:${m.glow[1]}%"></i>
      <img class="lp-base" src="media/lamp/lamp${n}.webp" alt="A lamp, drawn by Aditi. Pull the chain to switch it on." draggable="false">
      <span class="lp-lit" style="clip-path:polygon(${m.shade});-webkit-mask-image:url(media/lamp/lamp${n}.webp);mask-image:url(media/lamp/lamp${n}.webp)"><img src="media/lamp/lamp${n}.webp" alt="" draggable="false"></span>
      ${cords}</div>`;
  };
  // pulling a chain: it stretches as you drag, springs back when you let go, and the lamp clicks
  let drag = null;
  const set = (c, pull, sway) => { c.style.setProperty("--pull", pull.toFixed(2)); c.style.setProperty("--sway", sway.toFixed(2) + "deg"); };
  function toggle(lamp) {
    const on = !lamp.classList.contains("on");
    lamp.classList.toggle("on", on); lamp.classList.add("used"); lamp.classList.remove("flick"); void lamp.offsetWidth; if (on) lamp.classList.add("flick");
    window.FX.sfx("tick", .35);
  }
  function release(c, lamp, pull) {
    if (pull > .28) toggle(lamp);
    // spring back with a little bounce and a sway
    let p = pull, v = 0, s = (Math.random() - .5) * 10, vs = 0;
    (function spring() {
      v += (0 - p) * .2; v *= .72; p += v; vs += (0 - s) * .08; vs *= .9; s += vs;
      set(c, Math.max(-.08, p), s);
      if (Math.abs(p) + Math.abs(v) + Math.abs(s) + Math.abs(vs) > .01) requestAnimationFrame(spring); else set(c, 0, 0);
    })();
  }
  document.addEventListener("pointerdown", e => {
    const c = e.target.closest(".lp-cord"); if (!c) return; e.preventDefault();
    c.setPointerCapture && c.setPointerCapture(e.pointerId);
    drag = { c, lamp: c.closest(".lamp"), y: e.clientY, x: e.clientX, h: c.getBoundingClientRect().height, moved: false };
    c.classList.add("held");
  });
  addEventListener("pointermove", e => {
    if (!drag) return; const dy = Math.max(0, e.clientY - drag.y), dx = e.clientX - drag.x;
    if (dy > 3) drag.moved = true;
    const pull = Math.min(.7, dy / (dy + drag.h * .8)); set(drag.c, pull, Math.max(-14, Math.min(14, dx * .4)));
    drag.pull = pull;
  });
  const up = () => {
    if (!drag) return; const { c, lamp, moved } = drag; c.classList.remove("held");
    if (!moved) { // a tap pulls the chain for you
      let t = 0; (function down() { t += .16; set(c, Math.min(.55, t), 0); if (t < .55) requestAnimationFrame(down); else release(c, lamp, .55); })();
    } else release(c, lamp, drag.pull || 0);
    drag = null;
  };
  addEventListener("pointerup", up); addEventListener("pointercancel", up);
  // keyboard: focus a chain and press Enter
  document.addEventListener("keydown", e => { const c = e.target.closest && e.target.closest(".lp-cord"); if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); release(c, c.closest(".lamp"), .55); } });
  new MutationObserver(() => $$(".lp-cord:not([tabindex])").forEach(c => { c.tabIndex = 0; c.setAttribute("role", "switch"); c.setAttribute("aria-label", "Pull the lamp chain"); })).observe(document.body, { childList: true, subtree: true });
})();

/* A phonograph, drawn for the music page in pencil and paint. Click it: the horn wobbles, a little music-box tune
   plays and notes drift out of the horn. */
(() => {
  const LS = window.LS, calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const hatch = (n, x0, y0, len, ang, gap) => Array.from({ length: n }, (_, i) => `M${x0 + i * gap} ${y0}l${(Math.cos(ang) * len).toFixed(1)} ${(Math.sin(ang) * len).toFixed(1)}`).join("");
  // the horn: petals from the neck out to the mouth, then the dark opening and a scalloped rim on top
  const NECK = [214, 154], MC = [100, 98], RX = 80, RY = 60, ROT = -0.62, NP = 9;
  const E = (a, k = 1) => [MC[0] + (Math.cos(a) * RX * Math.cos(ROT) - Math.sin(a) * RY * Math.sin(ROT)) * k, MC[1] + (Math.cos(a) * RX * Math.sin(ROT) + Math.sin(a) * RY * Math.cos(ROT)) * k];
  const SH = ["#e7bf47", "#f3d567", "#d8ab35", "#f5dc78", "#dcb03a", "#efcf5e", "#e2b842", "#f1d36a", "#d6a832"];
  const petals = Array.from({ length: NP }, (_, i) => { const a0 = i / NP * 6.283, a1 = (i + 1) / NP * 6.283, p = E(a0), q = E(a1), m = E((a0 + a1) / 2, 1.1);
    return `<path d="M${NECK[0]} ${NECK[1]}L${p[0].toFixed(1)} ${p[1].toFixed(1)}Q${m[0].toFixed(1)} ${m[1].toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}z" fill="${SH[i]}" stroke="#5a4520" stroke-width="1.2" stroke-linejoin="round"/>`; }).join("");
  const rim = Array.from({ length: NP }, (_, i) => { const a0 = i / NP * 6.283, a1 = (i + 1) / NP * 6.283, p = E(a0), q = E(a1), m = E((a0 + a1) / 2, 1.1);
    return `${i ? "" : `M${p[0].toFixed(1)} ${p[1].toFixed(1)}`}Q${m[0].toFixed(1)} ${m[1].toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`; }).join("");
  const throat = Array.from({ length: 40 }, (_, i) => { const p = E(i / 40 * 6.283, .86); return `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`; }).join("") + "z";
  const seams = Array.from({ length: NP }, (_, i) => { const p = E(i / NP * 6.283, .86), q = E(i / NP * 6.283, .3); return `M${p[0].toFixed(1)} ${p[1].toFixed(1)}L${q[0].toFixed(1)} ${q[1].toFixed(1)}`; }).join("");
  const svg = `<svg viewBox="0 0 300 330" class="ph-svg" aria-hidden="true">
    <defs><filter id="ph-pn" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.4"/></filter>
      <filter id="ph-wc"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="2" result="g"/><feColorMatrix in="g" values="0 0 0 0 .3  0 0 0 0 .25  0 0 0 0 .15  0 0 0 -1.3 .7"/><feComposite in2="SourceGraphic" operator="in"/></filter>
      <radialGradient id="ph-in" cx=".62" cy=".62" r=".7"><stop offset="0" stop-color="#2a1d08"/><stop offset=".35" stop-color="#6b4f1a"/><stop offset=".8" stop-color="#c9a03e"/><stop offset="1" stop-color="#e8c55a"/></radialGradient></defs>
    <g filter="url(#ph-pn)">
      <ellipse cx="150" cy="318" rx="112" ry="7" fill="#000" opacity=".08"/>
      <path d="M78 302l-4 12h10l2-12zM222 302l4 12h-10l-2-12z" fill="#3d5a3a" stroke="#22301f" stroke-width="1"/>
      <rect x="70" y="236" width="160" height="68" rx="3" fill="#5f8a5b" stroke="#22301f" stroke-width="1.5"/>
      <path d="${hatch(30, 60, 240, 70, 1.25, 6)}" stroke="#22301f" stroke-width=".5" opacity=".28"/>
      <rect x="82" y="248" width="136" height="44" rx="2" fill="#26304a" stroke="#141a2a" stroke-width="1.2"/>
      <path d="M96 262c20-6 88-6 108 0l-4 9 4 9c-20-6-88-6-108 0l4-9z" fill="#e9e1cf" stroke="#141a2a" stroke-width="1"/>
      <text x="150" y="274" text-anchor="middle" font-family="Adobe Caslon,Georgia,serif" font-style="italic" font-size="12" fill="#26304a">a.a. records</text>
      <rect x="62" y="226" width="176" height="12" rx="2" fill="#4a7046" stroke="#22301f" stroke-width="1.4"/>
      <path d="M238 254h14v-14" fill="none" stroke="#6a5326" stroke-width="3.5" stroke-linecap="round"/><circle cx="252" cy="238" r="4" fill="#3b2a10"/>
      <g class="ph-rec"><ellipse cx="150" cy="223" rx="64" ry="8" fill="#1d1d1d" stroke="#000" stroke-width="1"/><ellipse cx="150" cy="222.5" rx="18" ry="2.6" fill="#c8483a"/>
        <ellipse class="ph-shine" cx="150" cy="222" rx="10" ry="3" fill="#fff" opacity=".22"/></g>
      <path d="M212 152c14 10 22 26 18 46-2 10-10 16-22 18" fill="none" stroke="#c99b35" stroke-width="7" stroke-linecap="round"/>
      <path d="M212 152c14 10 22 26 18 46-2 10-10 16-22 18" fill="none" stroke="#5a4520" stroke-width="1.2" stroke-dasharray="1 0" opacity=".7"/>
      <circle cx="205" cy="216" r="7" fill="#9a9a9a" stroke="#3d3d3d" stroke-width="1.2"/>
      <g class="ph-horn">${petals}
        <path d="${rim}" fill="#f2d266" stroke="#5a4520" stroke-width="1.4" stroke-linejoin="round"/>
        <path d="${throat}" fill="url(#ph-in)" stroke="#7a5c22" stroke-width="1"/>
        <path d="${seams}" stroke="#4a3510" stroke-width=".9" opacity=".55"/>
        <path d="M206 146l14 10" stroke="#5a4520" stroke-width="2"/>
        </g>
    </g>
  </svg>`;
  const NOTE = [`<path d="M6 2v14" stroke="#2a2a2a" stroke-width="1.6"/><ellipse cx="3.6" cy="16.5" rx="3.6" ry="2.6" fill="#2a2a2a" transform="rotate(-20 3.6 16.5)"/><path d="M6 2c3 2 6 3 6 7" fill="none" stroke="#2a2a2a" stroke-width="1.6"/>`,
    `<path d="M5 3v13M15 1v13M5 3l10-2v3L5 6" stroke="#2a2a2a" stroke-width="1.5" fill="#2a2a2a"/><ellipse cx="3" cy="16.5" rx="3" ry="2.3" fill="#2a2a2a"/><ellipse cx="13" cy="14.5" rx="3" ry="2.3" fill="#2a2a2a"/>`];
  LS.phono = pos => `<div class="phono" style="${pos}" role="button" tabindex="0" aria-label="A phonograph, drawn by Maori Sakai. Click to play a little tune."><img class="ph-img" src="media/notes/phonograph.webp" alt="" draggable="false"><div class="ph-notes"></div>
    <img class="ph-hint" src="media/notes/hint-play.webp" alt="" draggable="false"></div>`;
  // a music-box tune: the opening of a simple waltz, synthesised so there's nothing to download
  let ac = null;
  function tune() {
    try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    const t0 = ac.currentTime + .05, seq = [[76, 0], [79, .3], [84, .6], [83, .9], [79, 1.2], [76, 1.5], [77, 1.8], [79, 2.1], [72, 2.55]];
    seq.forEach(([m, t]) => { const f = 440 * Math.pow(2, (m - 69) / 12);
      [1, 2.01, 3.98].forEach((h, k) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = "sine"; o.frequency.value = f * h;
        g.gain.setValueAtTime(0, t0 + t); g.gain.linearRampToValueAtTime([.12, .05, .02][k], t0 + t + .008); g.gain.exponentialRampToValueAtTime(.0001, t0 + t + 1.3);
        o.connect(g).connect(ac.destination); o.start(t0 + t); o.stop(t0 + t + 1.4); }); });
  }
  function play(p) {
    if (p._on) return; p._on = true; p.classList.add("play", "used"); tune();
    const box = p.querySelector(".ph-notes");
    if (!calm) for (let i = 0; i < 9; i++) setTimeout(() => {
      const n = document.createElement("i"); n.className = "ph-n"; n.innerHTML = `<svg viewBox="0 0 18 20">${NOTE[i % 2]}</svg>`;
      n.style.setProperty("--dx", (-40 - Math.random() * 70).toFixed(0) + "px"); n.style.setProperty("--dy", (-60 - Math.random() * 70).toFixed(0) + "px"); n.style.setProperty("--r", ((Math.random() - .5) * 50).toFixed(0) + "deg");
      box.appendChild(n); setTimeout(() => n.remove(), 2600);
    }, i * 300);
    setTimeout(() => { p.classList.remove("play"); p._on = false; }, 3200);
  }
  document.addEventListener("click", e => { const p = e.target.closest(".phono"); if (p) play(p); });
  document.addEventListener("keydown", e => { const p = e.target.closest && e.target.closest(".phono"); if (p && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); play(p); } });
})();
