/* About Aditi, after the opening of Atelier's "A Promise Broken": her name set big, and in front of it a house
   of cards that builds itself card by card when the page opens. Scrolling knocks it down: the cards burst out and
   tumble away in 3D, catching the light as they turn, while the name fades to grey. The cards have designed faces
   (rank and suit in the corners, flourishes, her drawings in the middle) and vintage backs, and they lean and
   shine under the pointer like bencho's tilt card. Then a short hello, and her contact details in an envelope:
   click it, the wax seal pops, the flap opens, the letter slides out and pencil flowers and confetti burst. */
(() => {
  const LS = window.LS, H = window.COPY.site.home, A = window.COPY.ls.about, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches, fine = matchMedia("(pointer:fine)").matches;
  const ph = t => `<span class="ph">${t}</span>`;
  const pad = n => String(n).padStart(2, "0");
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rnd = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };

  /* ---------------- the deck ---------------- */
  /* The faces, after the deck in Aditi's video: the rank and suit in two corners, a little gold swash or a dotted
     rose curl in the others, and in the middle a motif for each suit that multiplies with the rank. Spades are
     coiled snakes, hearts a red-flowered vine, diamonds little flower plants, clubs her lamps. Aces are vintage
     floral wreaths. Hover a card and it shuffles through ranks, the motifs blurring from one to the next. */
  const SUITS = [["s", "♠"], ["h", "♥"], ["d", "♦"], ["c", "♣"]];
  const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const INK = "#151515", RED = "#d3262b", GREEN = "#2f9e46", GOLD = "#c49a2c";
  const LAY = {
    1: [[.5, .5]], 2: [[.5, .2], [.5, .8]], 3: [[.5, .16], [.5, .5], [.5, .84]],
    4: [[.27, .2], [.73, .2], [.27, .8], [.73, .8]], 5: [[.27, .18], [.73, .18], [.5, .5], [.27, .82], [.73, .82]],
    6: [[.27, .16], [.73, .16], [.27, .5], [.73, .5], [.27, .84], [.73, .84]],
    7: [[.27, .14], [.73, .14], [.5, .32], [.27, .5], [.73, .5], [.27, .86], [.73, .86]],
    8: [[.27, .13], [.73, .13], [.5, .31], [.27, .49], [.73, .49], [.5, .67], [.27, .87], [.73, .87]],
    9: [[.27, .12], [.73, .12], [.27, .37], [.73, .37], [.5, .5], [.27, .63], [.73, .63], [.27, .88], [.73, .88]],
    10: [[.27, .11], [.73, .11], [.5, .26], [.27, .39], [.73, .39], [.27, .61], [.73, .61], [.5, .74], [.27, .89], [.73, .89]] };
  // one motif, drawn around 0,0 about 20 units tall
  const UNIT = {
    s: () => `<path d="M-1 9c-8 1-11-7-6-11s12-1 10 6-10 6-11-1 5-8 8-3" fill="none" stroke="${INK}" stroke-width="3.1" stroke-linecap="round"/><path d="M-1 9c4 0 9-2 10-6" fill="none" stroke="${INK}" stroke-width="3.1" stroke-linecap="round"/><ellipse cx="9.5" cy="2.2" rx="3" ry="2.3" fill="${INK}"/><circle cx="10.4" cy="1.6" r=".6" fill="#fff"/>`,
    h: () => `<path d="M0 10c-3-4 3-7 0-11" fill="none" stroke="${GREEN}" stroke-width="1.8" stroke-linecap="round"/><path d="M0 4c-4-1-6 1-7 3 3 1 5 0 7-3zM0 2c4-1 6 1 7 3-3 1-5 0-7-3z" fill="${GREEN}"/>${[0, 72, 144, 216, 288].map(r => `<ellipse cx="0" cy="-4.2" rx="3.1" ry="4.2" fill="${RED}" transform="translate(0 -6) rotate(${r})"/>`).join("")}<circle cx="0" cy="-6" r="2" fill="#f5c542"/>`,
    d: () => `<path d="M0 11V-2" stroke="${GREEN}" stroke-width="1.9" stroke-linecap="round"/><path d="M0 7c-5-1-8-4-8-8 4 1 7 4 8 8zM0 4c5-1 8-4 8-8-4 1-7 4-8 8z" fill="${GREEN}"/><path d="M-5-4c0-5 2-7 5-8 3 1 5 3 5 8-2 2-8 2-10 0z" fill="${RED}"/><path d="M-2-11l2 4 2-4" fill="none" stroke="${RED}" stroke-width="1.6" stroke-linejoin="round"/>`,
    c: () => `<path d="M-7-3L-4.5-12h9L7-3z" fill="${INK}"/><path d="M-1-3h2v10h-2z" fill="${INK}"/><path d="M-5 11c0-3 2-4 5-4s5 1 5 4z" fill="${INK}"/><path d="M5-3v5" stroke="${INK}" stroke-width=".8"/><circle cx="5" cy="3" r="1.2" fill="${INK}"/><path d="M-4.5-12c2-1.5 7-1.5 9 0" fill="none" stroke="${GOLD}" stroke-width="1"/>` };
  // hearts grow along one vine per column
  const vine = (pts, k) => { const cols = {}; pts.forEach(([x, y]) => (cols[x] = cols[x] || []).push(y));
    return Object.entries(cols).filter(([, ys]) => ys.length > 1).map(([x, ys]) => { const X = 18 + x * 64, y0 = 24 + Math.min(...ys) * 92, y1 = 24 + Math.max(...ys) * 92;
      let d = `M${X} ${y0}`; for (let y = y0; y < y1; y += 10) d += ` q${(y / 10) % 2 ? 4 : -4} 5 0 10`; return `<path d="${d}" fill="none" stroke="${GREEN}" stroke-width="1.4" opacity=".85"/>`; }).join(""); };
  function motif(sk, r) {
    const n = r === "A" ? 1 : r === "J" || r === "Q" || r === "K" ? 0 : +r;
    if (r === "A") {   // a vintage wreath: leaves, a few blooms, the suit in the middle
      const bloom = sk === "s" || sk === "c" ? "#9a7cc4" : "#e690a8";
      const leaves = Array.from({ length: 22 }, (_, i) => { const a = i / 22 * 6.283, x = 50 + Math.cos(a) * 25, y = 70 + Math.sin(a) * 31; return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="4.6" ry="1.8" fill="${i % 3 ? "#8c8a3e" : "#6f9a52"}" transform="rotate(${(a * 57.3 + 70).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }).join("");
      const blooms = [[50, 38], [50, 102], [24, 64], [76, 76]].map(([x, y]) => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map(q => `<ellipse cy="-2.6" rx="2.4" ry="3" fill="${bloom}" transform="rotate(${q})"/>`).join("")}<circle r="1.6" fill="#f5d36b"/></g>`).join("");
      return `<ellipse cx="50" cy="70" rx="22" ry="28" fill="#fffdf6"/>${leaves}${blooms}<text x="50" y="81" text-anchor="middle" font-family="Adobe Caslon,Georgia,serif" font-size="34" fill="${sk === "h" || sk === "d" ? RED : INK}">${SUITS.find(q => q[0] === sk)[1]}</text>`;
    }
    if (!n) {   // court cards: a framed pattern, the top half mirrored in the bottom like a real court card
      const big = { J: [[.3, .27], [.7, .27]], Q: [[.3, .22], [.7, .22], [.5, .4]], K: [[.27, .2], [.73, .2], [.27, .4], [.73, .4]] }[r];
      const half = big.map(([x, y]) => `<g transform="translate(${(18 + x * 64).toFixed(1)} ${(24 + y * 92).toFixed(1)}) scale(1.45)">${UNIT[sk]()}</g>`).join("");
      return `<rect x="16" y="22" width="68" height="96" rx="3" fill="none" stroke="${GOLD}" stroke-width=".9"/><rect x="19" y="25" width="62" height="90" rx="2" fill="none" stroke="${GOLD}" stroke-width=".4"/>
        ${half}<g transform="rotate(180 50 70)">${half}</g><path d="M22 70h56" stroke="${GOLD}" stroke-width=".7"/>
        <text x="50" y="74" text-anchor="middle" font-family="Adobe Caslon,Georgia,serif" font-style="italic" font-size="8.5" fill="${GOLD}" paint-order="stroke" stroke="#fbf8f0" stroke-width="5">${{ J: "valet", Q: "reine", K: "roi" }[r]}</text>`;
    }
    const pts = LAY[n], sc = n <= 3 ? 1.55 : n <= 6 ? 1.2 : .98;
    return (sk === "h" ? vine(pts) : "") + pts.map(([x, y]) => `<g transform="translate(${(18 + x * 64).toFixed(1)} ${(24 + y * 92).toFixed(1)}) scale(${sc})${y > .55 ? " rotate(180)" : ""}">${UNIT[sk]()}</g>`).join("");
  }
  const swash = sk => sk === "h" || sk === "d"
    ? `<path d="M0 4c4-5 9 2 5 4s-4-5 2-6 9 3 13 0" fill="none" stroke="${RED}" stroke-width="1.1" stroke-dasharray=".1 2.2" stroke-linecap="round"/>`
    : `<path d="M0 6c5-6 9 3 14-1s6-5 6-5" fill="none" stroke="${GOLD}" stroke-width="2.2" stroke-linecap="round"/>`;
  function faceSVG(sk, r) {
    const sg = SUITS.find(q => q[0] === sk)[1], col = sk === "h" || sk === "d" ? RED : INK;
    const corner = `<text x="0" y="0" font-family="Adobe Caslon,Georgia,serif" font-size="${r === "10" ? 12 : 13}" fill="${col}" text-anchor="middle">${r}</text><text x="0" y="12" font-size="10" text-anchor="middle" fill="${col}">${sg}</text>`;
    return `<svg viewBox="0 0 100 140" class="cf-svg" aria-hidden="true">
      <g transform="translate(10 15)">${corner}</g><g transform="rotate(180 50 70) translate(10 15)">${corner}</g>
      <g transform="translate(70 8)">${swash(sk)}</g><g transform="rotate(180 50 70) translate(70 8)">${swash(sk)}</g>
      <g class="cf-m">${motif(sk, r)}</g></svg>`;
  }
  const face = c => `<div class="ab-face s-${c.sk}"><div class="cf-l on">${faceSVG(c.sk, RANKS[c.r])}</div><i class="cf-gl"></i></div>`;
  function shuffleTo(c, r) {
    c.r = r; const f = $(".ab-face", c.el), old = $(".cf-l.on", f);
    const nu = document.createElement("div"); nu.className = "cf-l"; nu.innerHTML = faceSVG(c.sk, RANKS[r]); f.insertBefore(nu, $(".cf-gl", f));
    requestAnimationFrame(() => { nu.classList.add("on"); if (old) { old.classList.remove("on"); old.classList.add("off"); setTimeout(() => old.remove(), 600); } });
  }
  function shuffle(c, steps = 3) {
    if (c.busy) return; c.busy = true; let k = 0;
    (function step() { shuffleTo(c, (c.r + 1 + Math.floor(Math.random() * 4)) % 13); if (++k < steps) setTimeout(step, 230); else setTimeout(() => { c.busy = false; }, 500); })();
  }

  /* the house: four floors of leaning pairs, with flat cards laid across the tops */
  const TH = 23 * Math.PI / 180, LV = 4;
  const CARDS = [];
  for (let lv = 0; lv < LV; lv++) {
    const pairs = LV - lv;
    for (let p = 0; p < pairs; p++) {
      const ax = (p - (pairs - 1) / 2);   // apex position, in card widths
      CARDS.push({ kind: "l", lv, ax, s: 1 }, { kind: "l", lv, ax, s: -1 });
      if (p < pairs - 1) CARDS.push({ kind: "f", lv, ax: ax + .5 });
    }
  }
  // build from the bottom up, left to right; the flats go on after their floor
  CARDS.forEach((c, i) => {
    c.i = i; c.ord = c.lv * 10 + (c.kind === "f" ? 6 + c.ax : c.ax + 3) + (c.s < 0 ? .3 : 0);
    c.back = c.kind === "f" ? rnd(i, 1) < .7 : rnd(i, 1) < .3; c.bk = Math.floor(rnd(i, 2) * 11); c.sk = SUITS[i % 4][0]; c.r = (i * 5 + 1) % 13;
    const out = Math.sign(c.ax || (rnd(i, 3) - .5));
    c.vx = out * (.25 + rnd(i, 4) * .9) + (rnd(i, 5) - .5) * .5; c.vy = -.25 - rnd(i, 6) * .95; c.vz = (rnd(i, 7) - .25) * 900;
    c.RX = (rnd(i, 8) - .5) * 640; c.RY = (rnd(i, 9) - .5) * 720; c.RZ = (rnd(i, 10) - .5) * 300;
    c.fl = rnd(i, 11) * 6.28; c.drop = .55 + rnd(i, 12) * .5; c.spin = (rnd(i, 13) - .5) * 70;
    c.hx = c.hy = c.hl = 0; c.hvx = c.hvy = c.hvl = 0; c.tx = c.ty = c.tl = 0;
  });
  const order = [...CARDS].sort((a, b) => a.ord - b.ord); order.forEach((c, k) => { c.k = k; });

  const card = c => `<div class="ab-card${c.kind === "f" ? " flat" : ""}" data-i="${c.i}"><div class="ab-in">
      ${face(c)}
      <div class="ab-back"><img src="media/cards/back${c.bk}.webp" alt="" draggable="false"><i class="cf-gl"></i></div>
    </div></div>`;

  /* ---------------- the envelope, drawn in pencil ---------------- */
  const hatch = (x0, y0, x1, y1, step, ang) => { let d = ""; for (let t = -400; t < 800; t += step) d += `M${t} ${y0}l${(y1 - y0) / Math.tan(ang)} ${y1 - y0}`; return d; };
  const DEFS = `<svg class="ev-defs" width="0" height="0" aria-hidden="true"><defs>
      <filter id="pncl" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.6"/></filter>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 .25  0 0 0 0 .22  0 0 0 0 .2  0 0 0 -1.1 .62"/><feComposite in2="SourceGraphic" operator="in"/></filter>
      <clipPath id="ev-tri-l"><path d="M2 4L200 140 2 246z"/></clipPath><clipPath id="ev-tri-b"><path d="M2 246L200 120 398 246z"/></clipPath><clipPath id="ev-flap-c"><path d="M2 2h396L200 150z"/></clipPath>
    </defs></svg>`;
  const back = `<svg viewBox="0 0 400 250" preserveAspectRatio="none"><g filter="url(#pncl)"><rect x="2" y="2" width="396" height="246" rx="4" fill="#efe7d6" stroke="#3d3a36" stroke-width="1.6"/><path d="M8 8L200 150 392 8" fill="none" stroke="#3d3a36" stroke-width=".8" opacity=".5"/><path d="${hatch(0, 10, 400, 240, 9, 1)}" stroke="#3d3a36" stroke-width=".45" opacity=".22" clip-path="url(#ev-flap-c)"/></g><rect x="2" y="2" width="396" height="246" filter="url(#grain)" opacity=".5"/></svg>`;
  const front = `<svg viewBox="0 0 400 250" preserveAspectRatio="none"><g filter="url(#pncl)">
      <path d="M2 4L196 138Q200 141 204 138L398 4V246H2z" fill="#f6f0e2"/>
      <path d="${hatch(0, 0, 400, 250, 7, .9)}" stroke="#3d3a36" stroke-width=".5" opacity=".28" clip-path="url(#ev-tri-l)"/>
      <path d="${hatch(0, 120, 400, 250, 8, 2.3)}" stroke="#3d3a36" stroke-width=".45" opacity=".16" clip-path="url(#ev-tri-b)"/>
      <path d="M2 246L184 128M398 246L216 128M2 4L196 138M398 4L204 138" fill="none" stroke="#3d3a36" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M3 245L185 129" fill="none" stroke="#3d3a36" stroke-width=".7" opacity=".6" transform="translate(1 2)"/>
      <path d="M2 4V246H398V4" fill="none" stroke="#3d3a36" stroke-width="1.7" stroke-linejoin="round"/>
      <path d="M1 6V244M399 8V243" fill="none" stroke="#3d3a36" stroke-width=".6" opacity=".55"/>
      <path d="M38 200c40-2 70 1 92-3M44 212c30 0 46 1 64-1" fill="none" stroke="#3d3a36" stroke-width=".9" opacity=".55" stroke-linecap="round"/>
      <path d="M318 26h44v54h-44z" fill="none" stroke="#3d3a36" stroke-width="1" stroke-dasharray="3 2"/><path d="M324 34c8 14 20 18 32 10M330 64c10-6 18-6 26 2" fill="none" stroke="#b3261e" stroke-width=".9" opacity=".7"/>
    </g><path d="M2 4L196 138Q200 141 204 138L398 4V246H2z" filter="url(#grain)" opacity=".5"/></svg>`;
  const flap = `<svg viewBox="0 0 400 156" preserveAspectRatio="none"><g filter="url(#pncl)"><path d="M2 2H398L206 150Q200 155 194 150z" fill="#f3ecdc" stroke="#3d3a36" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="${hatch(0, 0, 400, 156, 6, .75)}" stroke="#3d3a36" stroke-width=".45" opacity=".24" clip-path="url(#ev-flap-c)"/>
      <path d="M10 6L198 146" fill="none" stroke="#3d3a36" stroke-width=".6" opacity=".5"/></g><path d="M2 2H398L206 150Q200 155 194 150z" filter="url(#grain)" opacity=".5"/></svg>`;
  const seal = `<svg viewBox="0 0 100 100"><g filter="url(#pncl)"><path d="M50 6c9 0 12 6 20 7s13 8 15 15 9 12 8 21-6 12-6 20-8 13-15 16-11 9-21 8-14-5-22-7-12-10-15-17-8-11-7-20 5-14 8-21 6-13 14-16S41 6 50 6z" fill="#a8231b"/>
      <circle cx="50" cy="51" r="27" fill="none" stroke="#6e130e" stroke-width="2.4"/><circle cx="50" cy="51" r="22" fill="none" stroke="#d65a4c" stroke-width="1" opacity=".7"/>
      <text x="50" y="62" text-anchor="middle" font-family="Adobe Caslon,Georgia,serif" font-size="32" font-style="italic" fill="#6e130e">A</text><text x="49" y="61" text-anchor="middle" font-family="Adobe Caslon,Georgia,serif" font-size="32" font-style="italic" fill="#e0776a" opacity=".55">A</text>
      <path d="M26 26c6-6 14-9 22-9" fill="none" stroke="#f0a196" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>
      <path d="${hatch(0, 0, 100, 100, 5, 2.2)}" stroke="#4d0c08" stroke-width=".5" opacity=".3"/></g></svg>`;
  const link = ([k, v, u]) => `<li><span class="k">${k}</span>${u ? `<a href="${u}" target="_blank" rel="noopener">${v}</a>` : `<span>${ph(v)}</span>`}</li>`;
  const letter = `<div class="ev-letter"><div class="ev-paper">
      <p class="ev-hi">Hello you,</p>
      <p class="ev-p">Thank you for coming all the way down here. If you'd like to make something together, or just say hi, this is where to find me:</p>
      <ul class="ev-ul">${H.links.map(link).join("")}</ul>
      <p class="ev-sig">love, Aditi</p></div></div>`;

  const root = document.createElement("section"); root.className = "ls-pg ls-info ab-pg"; root.setAttribute("aria-label", "About Aditi");
  root.innerHTML = `
    <div class="ab-run">
      <div class="ab-stage">
        <p class="ab-part">${A.part}</p>
        <h1 class="ab-name"><span>${A.name[0]}</span><span>${A.name[1]}</span></h1>
        <div class="ab-deck" aria-hidden="true">${CARDS.map(card).join("")}</div>
        <p class="ab-hint">( ${A.hint} )</p>
      </div>
    </div>
    <section class="ab-ch">
      <p class="ab-k" data-r>${A.chapter}</p>
      <h2 class="ab-t" data-r>${A.title}</h2>
      <p class="ab-lede" data-r>${A.lede}</p>
      <div class="ab-cols${A.pull ? "" : " one"}">
        <div class="ab-body" data-r>${A.body.map(p => `<p>${p}</p>`).join("")}</div>
        ${A.pull ? `<blockquote class="ab-pull" data-r>${A.pull}</blockquote>` : ""}
      </div>
    </section>
    <section class="ab-ch ab-find">
      ${LS.lamp(4, "position:absolute;left:4vw;bottom:4vh;height:min(72vh,600px)")}
      <p class="ab-k" data-r>${A.findK}</p>
      <h2 class="ab-t sm" data-r>${A.findT}</h2>
      <p class="ab-tap" data-r>( click the envelope )</p>
      ${DEFS}
      <div class="ev" data-r role="button" tabindex="0" aria-label="Open the envelope to see how to reach Aditi" aria-expanded="false">
        <div class="ev-art" aria-hidden="true"></div>
        <div class="ev-slot">${letter}</div>
        <div class="ev-art ev-front" aria-hidden="true"></div>
        <div class="ev-fly" aria-hidden="true"><img class="o" src="media/env/bfly-open.webp" alt="" draggable="false"><img class="s" src="media/env/bfly-side.webp" alt="" draggable="false"></div>
      </div>
      <div class="ab-av" data-r><i></i><div><b>${A.availK}</b><p>${A.avail}</p></div></div>
    </section>
    ${LS.footer("projects", "home")}`;
  document.body.appendChild(root);

  const els = $$(".ab-card", root), stage = $(".ab-stage", root), run = $(".ab-run", root), name = $(".ab-name", root), deck = $(".ab-deck", root);
  CARDS.forEach((c, i) => { c.el = els[i]; c.gl = $$(".cf-gl", els[i]); });

  // the name fills the width without ever being cut off
  function fitName() {
    const w = stage.clientWidth, h = stage.clientHeight; if (!w) return;
    name.style.fontSize = "100px"; const spans = $$("span", name), nat = Math.max(...spans.map(s => s.scrollWidth)) || 1;
    const fs = Math.min(100 * (w * .9) / nat, h * .36);
    name.style.fontSize = fs.toFixed(1) + "px";
  }
  let W = 100;
  function size() {
    const w = stage.clientWidth, h = stage.clientHeight;
    W = Math.min(w * .19, h * .125, 124); stage.style.setProperty("--cw", W.toFixed(1) + "px"); fitName();
  }
  addEventListener("resize", size); document.fonts && document.fonts.ready.then(size);

  /* where each card sits in the house (centre of the card, in px from the base centre) */
  const CH = 1.4, sin = Math.sin(TH), cos = Math.cos(TH), FLOOR = () => CH * cos * W + W * .16;
  function home(c) {
    const ay = -(c.lv + 1) * FLOOR() + W * .16, ax = c.ax * W * 1.16;
    if (c.kind === "f") return { x: ax, y: ay - W * .08, z: 0, rx: 78, ry: 0, rz: (rnd(c.i, 14) - .5) * 2 };
    return { x: ax - c.s * sin * CH * W / 2, y: ay + cos * CH * W / 2, z: c.s * W * .17, rx: 0, ry: -c.s * 12, rz: c.s * 23 };
  }

  let on = false, t0 = 0, P = 0, sp = 0, mx = 0, my = 0, pmx = 0, pmy = 0;
  function frame(now) {
    if (!on) return; requestAnimationFrame(frame);
    const t = (now - t0) / 1000, vw = stage.clientWidth, vh = stage.clientHeight, s = Math.min(vw, vh * 1.4);
    sp += (P - sp) * .14;   // the scroll, smoothed a little so the cards don't jitter
    pmx += (mx - pmx) * .06; pmy += (my - pmy) * .06;
    deck.style.transform = `translate3d(-50%,0,0) rotateX(${(-4 - pmy * 5).toFixed(2)}deg) rotateY(${((calm ? 0 : Math.sin(t * .35) * 5) + pmx * 9).toFixed(2)}deg)`;
    for (const c of CARDS) {
      const h = home(c);
      // the build: each card drops into place, in order, with a little settle
      const st = .25 + c.k * (calm ? 0 : .055), k = calm ? 1 : clamp((t - st) / c.drop, 0, 1);
      const eb = k === 1 ? 1 : 1 + 2.2 * Math.pow(k - 1, 3) + 1.2 * Math.pow(k - 1, 2);
      const fy = (1 - eb) * -(vh * .75), fr = (1 - k) * c.spin;
      // the knock-down: top floors go first
      const e = clamp(sp * 1.6 - (LV - 1 - c.lv) * .07, 0, 1.6), e2 = e * e;
      // hover: the card leans toward the pointer and catches the light (only while the house stands)
      for (const [p, v, g] of [["hx", "hvx", "tx"], ["hy", "hvy", "ty"], ["hl", "hvl", "tl"]]) { c[v] += (c[g] * (e < .02 ? 1 : 0) - c[p]) * .16; c[v] *= .72; c[p] += c[v]; }
      const bob = calm ? 0 : Math.sin(t * 1.1 + c.fl) * .6 * (1 - Math.min(1, e * 4));
      const x = h.x + c.vx * e * s, y = h.y + fy + bob + (c.vy * e + .7 * e2) * vh, z = h.z + c.vz * e + c.hl * 14;
      const rx = h.rx + c.RX * e - c.hy * 14, ry = h.ry + c.RY * e + c.hx * 14 + (c.back ? 180 : 0), rz = h.rz + fr + c.RZ * e;
      c.el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${z.toFixed(1)}px) rotateZ(${rz.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) rotateX(${rx.toFixed(1)}deg)`;
      c.el.style.opacity = Math.min(1, k * 5).toFixed(2);
      // the shine follows the card's turn as it tumbles, and the pointer when you hover
      const gx = 50 + Math.sin((ry + pmx * 9) * Math.PI / 180) * 60 + c.hx * 40, gy = 50 - Math.sin(rx * Math.PI / 180) * 60 + c.hy * 40, gl = .18 + Math.min(.5, e * .6) + c.hl * .45;
      c.el.style.setProperty("--gx", gx.toFixed(1) + "%"); c.el.style.setProperty("--gy", gy.toFixed(1) + "%"); c.el.style.setProperty("--gl", gl.toFixed(3));
    }
    const g = Math.round(Math.min(1, sp * 2.2) * 186);
    name.style.color = `rgb(${g},${g},${g})`; name.style.translate = `0 ${(-sp * 10).toFixed(2)}vh`;
  }
  root.addEventListener("scroll", () => {
    LS.touch && LS.touch();
    const r = run.getBoundingClientRect(); P = clamp(-r.top / Math.max(1, r.height - root.clientHeight), 0, 1);
  }, { passive: true });
  let lastHover = null;
  stage.addEventListener("click", e => { const el = e.target.closest(".ab-card"); if (el) shuffle(CARDS[+el.dataset.i], 1); });
  if (fine && !calm) {
    stage.addEventListener("pointermove", e => {
      const r = stage.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width * 2 - 1; my = (e.clientY - r.top) / r.height * 2 - 1;
      const el = e.target.closest(".ab-card"); CARDS.forEach(c => { if (c.el !== el) c.tx = c.ty = c.tl = 0; });
      if (el && el !== lastHover) { lastHover = el; shuffle(CARDS[+el.dataset.i]); }
      if (!el) lastHover = null;
      if (el) { const c = CARDS[+el.dataset.i], b = el.getBoundingClientRect(); c.tx = clamp((e.clientX - b.left) / b.width * 2 - 1, -1, 1); c.ty = clamp((e.clientY - b.top) / b.height * 2 - 1, -1, 1); c.tl = 1; }
    }, { passive: true });
    stage.addEventListener("pointerleave", () => { mx = my = 0; CARDS.forEach(c => { c.tx = c.ty = c.tl = 0; }); });
  }

  /* ---------------- opening the envelope ---------------- */
  const ev = $(".ev", root), burst = $(".ev-burst", root);
  const PET = ["#f4a6c0", "#f7d26a", "#b9d7f0", "#f2b48e", "#c9b6e8"];
  const flower = (c, n) => `<svg viewBox="-30 -30 60 90" class="pf"><g filter="url(#pncl)"><path d="M0 8C-2 30 3 44 -1 58M0 34c8-8 16-8 20-4-6 6-14 7-20 4M-1 44c-8-6-14-5-17-1 5 4 12 5 17 1" fill="none" stroke="#5d6b3b" stroke-width="1.6" stroke-linecap="round"/>
      ${Array.from({ length: n }, (_, i) => `<ellipse rx="7.5" ry="13" cy="-11" fill="${c}" fill-opacity=".72" stroke="#3d3a36" stroke-width="1.1" transform="rotate(${(i * 360 / n).toFixed(0)})"/>`).join("")}
      ${Array.from({ length: n }, (_, i) => `<path d="M0 -4L${(Math.sin(i * 6.28 / n + .3) * 12).toFixed(1)} ${(-Math.cos(i * 6.28 / n + .3) * 12).toFixed(1)}" stroke="#3d3a36" stroke-width=".5" opacity=".5"/>`).join("")}
      <circle r="5" fill="#f2c94c" stroke="#3d3a36" stroke-width="1.1"/><path d="M-3 -1l2 2M1 -3l2 2M-1 2l2 1" stroke="#3d3a36" stroke-width=".7"/></g></svg>`;
  const conf = (c, k) => [
    `<svg viewBox="0 0 20 10" class="pc"><path d="M1 2l17-1 1 7-17 1z" fill="${c}" fill-opacity=".75" stroke="#3d3a36" stroke-width=".9"/><path d="M4 2l-1 6M9 2l-1 6M14 1l-1 6" stroke="#3d3a36" stroke-width=".4" opacity=".6"/></svg>`,
    `<svg viewBox="0 0 24 12" class="pc"><path d="M1 8c3-6 6-6 8 0s5 6 7 0 5-6 7 0" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/><path d="M1 8c3-6 6-6 8 0s5 6 7 0 5-6 7 0" fill="none" stroke="#3d3a36" stroke-width=".7"/></svg>`,
    `<svg viewBox="0 0 12 12" class="pc"><circle cx="6" cy="6" r="4.6" fill="${c}" fill-opacity=".75" stroke="#3d3a36" stroke-width=".9"/></svg>`,
    `<svg viewBox="0 0 14 14" class="pc"><path d="M7 1l1.8 4 4.2.4-3.2 2.8 1 4.2L7 10.2 3.2 12.4l1-4.2L1 5.4l4.2-.4z" fill="${c}" fill-opacity=".75" stroke="#3d3a36" stroke-width=".9" stroke-linejoin="round"/></svg>`][k];
  function pop() {
    burst.innerHTML = ""; const bits = [], W0 = ev.clientWidth;
    for (let i = 0; i < 46; i++) {
      const fl = i < 11, el = document.createElement("i"); el.className = fl ? "eb fl" : "eb";
      el.innerHTML = fl ? flower(PET[i % 5], 5 + (i % 3)) : conf(PET[(i * 3) % 5], i % 4); burst.appendChild(el);
      const a = (-90 + (Math.random() - .5) * (fl ? 150 : 170)) * Math.PI / 180, v = (fl ? 9 : 11) + Math.random() * (fl ? 6 : 9);
      bits.push({ el, fl, x: (Math.random() - .5) * W0 * .3, y: 0, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: (Math.random() - .5) * 60, vr: (Math.random() - .5) * (fl ? 6 : 22), s: fl ? .7 + Math.random() * .5 : .8 + Math.random() * .6, life: 0, max: fl ? 3.4 : 2.2 + Math.random() });
    }
    let last = performance.now();
    (function step(now) {
      const dt = Math.min(.05, (now - last) / 1000) * 60; last = now; let alive = 0;
      for (const b of bits) {
        b.life += dt / 60; if (b.life > b.max) { b.el.style.opacity = 0; continue; } alive++;
        b.vy += (b.fl ? .26 : .22) * dt; b.vx *= Math.pow(.985, dt); b.vy *= Math.pow(b.fl ? .97 : .985, dt);
        if (!b.fl) b.x += Math.sin(b.life * 6 + b.r) * .6 * dt;
        b.x += b.vx * dt; b.y += b.vy * dt; b.r += b.vr * dt;
        const f = b.life > b.max - .6 ? (b.max - b.life) / .6 : 1;
        b.el.style.transform = `translate3d(${b.x.toFixed(1)}px,${b.y.toFixed(1)}px,0) rotate(${b.r.toFixed(1)}deg) scale(${b.s.toFixed(2)})`; b.el.style.opacity = f.toFixed(2);
      }
      if (alive) requestAnimationFrame(step); else burst.innerHTML = "";
    })(last);
  }
  // Maori Sakai's envelope, frame by frame: the seal lifts, the flap opens and the flowers grow out of it
  const arts = $$(".ev-art", root), FR = 29, COLS = 6, ROWS = 5;
  const evFrame = i => { const p = `${(i % COLS) * 100 / (COLS - 1)}% ${Math.floor(i / COLS) * 100 / (ROWS - 1)}%`; arts.forEach(a => a.style.backgroundPosition = p); };
  const sheet = new Image(); sheet.src = "media/env/sheet.webp";
  let opened = false;
  function openEnv() {
    if (opened) return; opened = true; ev.setAttribute("aria-expanded", "true"); ev.removeAttribute("role"); ev.removeAttribute("tabindex");
    window.FX.sfx && window.FX.sfx("tick", .4);
    $(".ab-tap", root).classList.add("gone");
    const go = () => {
      arts.forEach(a => a.classList.add("ev-run")); let i = calm ? FR - 1 : 0; evFrame(i); ev.classList.add("s1");
      setTimeout(() => ev.classList.add("s3"), calm ? 0 : 650);
      setTimeout(butterfly, calm ? 0 : 2300);
      if (calm) return;
      // play the opening once, then let the bloom sway (the butterfly keeps visiting)
      const tick = () => { i = i < FR - 1 ? i + 1 : 10; evFrame(i); setTimeout(tick, 100); };
      setTimeout(tick, 100);
    };
    sheet.complete ? go() : (sheet.onload = go);
  }
  /* the envelope's own butterfly (her drawing, in the two wing poses she drew it in) comes out of the envelope once the
     letter is up, flutters around the outside of the letter and settles on its top corner, clear of the writing */
  const fly = $(".ev-fly", root), paper = $(".ev-paper", root);
  function butterfly() {
    let P = null, perch = null;
    const measure = () => {
      const e = ev.getBoundingClientRect(), p = paper.getBoundingClientRect(), B = fly.offsetWidth, bh = B * .9;
      const l = p.left - e.left, r = p.right - e.left, t = p.top - e.top, w = r - l, my = e.height * .53, d = my - t;
      perch = [r - B * .52, t - bh * .32];
      P = {
        // every point keeps her outside the letter, or above its top edge, so the writing is never covered
        start: [[l - B * .1, my + bh * .4], [l - B * .55, t + d * .62], [l - B * .58, t + d * .22], [l - B * .4, t - bh * .75], [l + w * .3, t - bh * 1.1], [l + w * .66, t - bh * .95], perch],
        loop: [perch, [r + B * .4, t - bh * .25], [r + B * .58, t + d * .3], [r + B * .6, t + d * .72], [r + B * .45, my + bh * .35], [r + B * .62, t + d * .4], [r + B * .4, t - bh * .7], [l + w * .5, t - bh * 1.25],
          [l - B * .4, t - bh * .7], [l - B * .58, t + d * .3], [l - B * .6, t + d * .66], [l - B * .55, t + d * .14], [l - B * .4, t - bh * .75], [l + w * .34, t - bh * 1.05], perch]
      };
    };
    const place = (x, y, a) => { fly.style.transform = `translate3d(${(x - fly.offsetWidth / 2).toFixed(1)}px,${(y - fly.offsetHeight / 2).toFixed(1)}px,0) rotate(${a.toFixed(1)}deg)`; };
    const wings = shut => fly.classList.toggle("shut", shut);
    measure(); addEventListener("resize", measure);
    fly.classList.add("on");
    if (calm) { place(perch[0], perch[1], 0); return; }
    // a smooth curve through the waypoints
    const cr = (a, b, c, d, t) => { const t2 = t * t, t3 = t2 * t; return .5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3); };
    const at = (pts, u) => { const n = pts.length - 1, k = Math.min(n - 1, Math.floor(u * n)), t = u * n - k, g = i => pts[Math.max(0, Math.min(n, i))]; return [0, 1].map(j => cr(g(k - 1)[j], g(k)[j], g(k + 1)[j], g(k + 2)[j], t)); };
    let phase = "start", t0 = performance.now(), last = null, ang = 0;
    (function step(now) {
      requestAnimationFrame(step);
      if (!root.classList.contains("on") || document.hidden) { t0 += 16; return; }
      const el = (now - t0) / 1000;
      if (phase === "perch") {
        // resting on the corner: wings open, folding now and then
        place(perch[0], perch[1] + Math.sin(el * 2.2) * 1.2, -4); wings(el % 1.7 > 1.45);
        if (el > 3.8) { measure(); phase = "loop"; t0 = now; }
        return;
      }
      const pts = P[phase], T = (pts.length - 1) * (phase === "start" ? .95 : .85), u = Math.min(1, el / T);
      const e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;   // ease in and out of each flight
      const [x, y] = at(pts, e), bob = Math.sin(el * 9) * 3 * (1 - u * u);
      if (last) { const dx = x - last[0]; ang += (Math.max(-16, Math.min(16, dx * 2.4)) - ang) * .15; }
      last = [x, y]; place(x, y + bob, ang); wings(Math.floor(el * 8.5) % 2 === 1);
      fly.style.opacity = phase === "start" ? Math.min(1, el / .5).toFixed(2) : 1;
      if (u >= 1) { phase = "perch"; t0 = now; last = null; }
    })(t0);
  }
  ev.addEventListener("click", e => { if (!e.target.closest("a")) openEnv(); });
  ev.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnv(); } });

  window.PAGES = window.PAGES || {};
  window.PAGES.info = {
    root,
    active(v) {
      on = v; root.classList.toggle("on", v);
      if (v) {
        root.scrollTop = 0; P = sp = 0; t0 = performance.now(); size(); requestAnimationFrame(frame);
        root.style.backgroundColor = "#efefef"; document.documentElement.classList.remove("ls-dark"); document.documentElement.style.setProperty("--ls-ink", "#000");
        window.FX.setPage("info", root, "info"); LS.leavePages && LS.leavePages(); LS.wireVids && LS.wireVids(root);
      }
    },
    reveal() { t0 = performance.now(); root.classList.remove("play"); void root.offsetWidth; root.classList.add("play"); }
  };
})();
