/* Home: a museum of drawers, after Herbert Distel's Schubladenmuseum. A white cabinet built in CSS 3D;
   click a drawer and it slides out while the camera moves above it, so you look down into the compartments.
   Every object sinks under the pointer like a tilt card and leads somewhere. */
(() => {
  const M = window.COPY.museum, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const CW = 660, S = 26, IW = CW - S * 2, HD = 150, FH = 92, R = 12, ND = 6, DD = 520, CD = 560, CUP = 330, PL = 36;
  const DRW = ND * FH + (ND + 1) * R, TOT = HD + DRW + CUP + PL, CELLW = IW / 5, CELLD = DD / 5, HDV = 30;
  const yTop = i => HD + R + i * (FH + R);
  const pass = () => (window.PASS && window.PASS.data()) || {};

  /* ---------- small objects, drawn in CSS and SVG */
  const svgPencil = `<svg viewBox="0 0 160 16"><path d="M8 3h118v10H8z" fill="#e8b33a"/><path d="M8 3h118v3.3H8z" fill="#f2c95a"/><path d="M126 3l22 5-22 5z" fill="#e9d2a8"/><path d="M142 6.6l6 1.4-6 1.4z" fill="#333"/><rect x="0" y="3" width="10" height="10" rx="1.5" fill="#e48a92"/><rect x="8" y="2.5" width="6" height="11" fill="#c9cbce"/></svg>`;
  const svgClip = `<svg viewBox="0 0 30 70"><path d="M9 54V14a6 6 0 0 1 12 0v44a9 9 0 0 1-18 0V10a12 12 0 0 1 24 0v42" fill="none" stroke="#a7abb1" stroke-width="2.6" stroke-linecap="round"/></svg>`;
  const svgKey = `<svg viewBox="0 0 120 44"><circle cx="20" cy="22" r="16" fill="none" stroke="#b8923a" stroke-width="7"/><path d="M36 22h76v8h-8v6h-8v-6h-6v8h-8v-8H36z" fill="#c9a24a"/><circle cx="20" cy="22" r="16" fill="none" stroke="#e8cc84" stroke-width="2" stroke-dasharray="20 80"/></svg>`;
  const svgPen = `<svg viewBox="0 0 200 18"><rect x="14" y="3" width="150" height="12" rx="6" fill="#1b1d22"/><rect x="40" y="1" width="70" height="3" rx="1.5" fill="#c9ccd1"/><path d="M164 4l26 5-26 5z" fill="#c9ccd1"/><path d="M186 8l6 1-6 1z" fill="#22379b"/><rect x="2" y="4" width="16" height="10" rx="3" fill="#2a2d33"/></svg>`;
  const svgBrush = `<svg viewBox="0 0 220 22"><rect x="0" y="7" width="130" height="8" rx="4" fill="#8a4b2a"/><rect x="126" y="5" width="40" height="12" rx="2" fill="#c3c6cb"/><path d="M166 5c20 0 40 3 52 6-12 3-32 6-52 6z" fill="#2c2420"/></svg>`;
  const OBJ = {
    disc: o => `<span class="ob-disc" style="background-image:url(media/cds/disc-${o.k}.webp)"></span>`,
    print: o => `<span class="ob-print"><img src="${o.img}" alt="" loading="lazy" style="object-position:${o.pos || "50% 50%"}"></span>`,
    stamp: o => `<span class="ob-stamp"><img src="media/desk/st-${o.k}.webp" alt="" loading="lazy"></span>`,
    note: o => `<span class="ob-note">${o.text}</span>`,
    ticket: o => `<span class="ob-ticket"><b>ADMIT ONE</b><i>${o.text}</i><s>No. ${String(pass().no || "452593").slice(-4)}</s></span>`,
    notebook: () => `<span class="ob-nb"></span>`,
    match: o => `<span class="ob-match" style="--c:${o.color};--t:${o.tc}"><i>${o.text}</i></span>`,
    bag: o => `<img class="ob-bag" src="media/desk/bag-${o.k}.webp" alt="" loading="lazy">`,
    receipt: () => `<span class="ob-rc">${["VIEWS", "LIKES", "SHARES", "FOLLOWERS"].map(x => `<i>${x}</i>`).join("")}<b>43.1M</b></span>`,
    synth: () => `<span class="ob-sy"><i></i>${"<b></b>".repeat(12)}</span>`,
    passport: () => `<span class="ob-pp"><i>PASSPORT</i><b></b></span>`,
    screen: o => `<span class="ob-scr"><span class="in">${o.video ? `<video src="${o.video}" poster="${o.poster}" muted loop playsinline preload="none"></video>` : `<i class="noise"></i><em>${o.text}</em>`}</span></span>`,
    strip: () => `<span class="ob-strip">${"<i></i>".repeat(6)}</span>`,
    canvas: () => `<span class="ob-canvas"></span>`,
    tube: o => `<span class="ob-tube" style="--c:${o.color}"><i></i></span>`,
    tent: o => `<span class="ob-tent">${o.text}</span>`,
    rope: () => `<span class="ob-rope"><i></i><i></i><svg viewBox="0 0 200 60"><path d="M14 14Q100 70 186 14" fill="none" stroke="#7d1420" stroke-width="9" stroke-linecap="round"/><path d="M14 14Q100 70 186 14" fill="none" stroke="#b33242" stroke-width="3" stroke-linecap="round" transform="translate(0,-2)"/></svg></span>`,
    coat: () => `<span class="ob-coat"><b>COAT CHECK</b><i>${String(pass().no || "452593").replace(/(\d{3})(\d{3})/, "$1 $2")}</i></span>`,
    napkin: () => `<span class="ob-napkin">VIP</span>`,
    biz: () => `<span class="ob-biz"><span class="f"><b>${M.card.name}</b><i>${M.card.role}</i><s>${M.card.city}</s></span><span class="bk"><b>${M.card.backTitle}</b>${M.card.links.map(([a, b]) => `<i><u>${a}</u>${b}</i>`).join("")}</span></span>`,
    env: () => `<span class="ob-env"><i></i><b>to: you</b></span>`,
    letter: () => `<span class="ob-letter"><b>${M.aboutTitle}</b></span>`,
    post: () => `<span class="ob-post"><b>greetings from</b><i>Singapore</i></span>`,
    pencil: () => `<span class="ob-svg ob-pencil">${svgPencil}</span>`,
    clip: () => `<span class="ob-svg ob-clip">${svgClip}</span>`,
    key: () => `<span class="ob-svg ob-key">${svgKey}</span>`,
    pen: () => `<span class="ob-svg ob-pen">${svgPen}</span>`,
    brush: () => `<span class="ob-svg ob-brush">${svgBrush}</span>`,
    eraser: () => `<span class="ob-eraser"></span>`,
    lock: () => `<span class="ob-lock"></span>`
  };
  const SIZE = { disc: [96, 96], print: [96, 68], stamp: [62, 78], note: [104, 74], ticket: [108, 54], notebook: [86, 132], match: [64, 92], bag: [112, 160], receipt: [46, 168],
    synth: [150, 92], passport: [70, 98], screen: [102, 80], strip: [210, 46], canvas: [86, 72], tube: [90, 26], tent: [150, 62], rope: [300, 120], coat: [56, 96], napkin: [84, 84],
    biz: [190, 108], env: [190, 124], letter: [180, 120], post: [170, 78], pencil: [160, 16], clip: [20, 50], key: [96, 36], pen: [200, 18], brush: [210, 22], eraser: [46, 22] };
  // c,r = column/row of the compartment (row 0 is at the back); w = how many columns it spans; lean = stands up against the back of its cell
  const D = [
    { key: "films", items: [
      ...[["muji", "MUJI"], ["zoo", "Australia Zoo"], ["pinterest", "Pinterest"], ["brandy", "Brandy Melville × Confident"], ["bluetooth", "Bluetooth"]].map(([k, t], i) => ({ type: "print", img: `media/cds/still-${k}.webp`, c: i, r: 0, lean: 1, t, s: i === 4 ? "an etymology film" : "spec ad", y: "2026", act: { film: i } })),
      ...[["muji", "MUJI"], ["zoo", "Australia Zoo"], ["pinterest", "Pinterest"], ["brandy", "Brandy Melville × Confident"], ["bluetooth", "Bluetooth"]].map(([k, t], i) => ({ type: "disc", k, c: i, r: 1, rot: [8, -14, 22, -4, 12][i], t, s: "the disc", y: "2026", act: { film: i } })),
      { type: "ticket", text: "the films", c: 0, r: 2, w: 2, rot: -6, t: "Films", s: "all five, on discs", act: { go: "films" } },
      { type: "clip", c: 3, r: 2, rot: 70, filler: 1 }, { type: "pencil", c: 3, r: 3, w: 2, rot: -12, filler: 1 },
      { type: "note", text: "made by hand,<br>frame by frame", c: 1, r: 3, w: 2, rot: 4, t: "a note", s: "from aditi", act: { go: "films" } },
      { type: "eraser", c: 4, r: 4, rot: 30, filler: 1 }
    ] },
    { key: "projects", items: [
      ...["jamaican", "nigerian", "east-texan", "french", "hong-kong"].map((k, i) => ({ type: "stamp", k, c: i, r: 0, lean: 1, t: k.replace("-", " ") + " accent", s: "a painting I picked", y: "2026", act: { desk: "stamps" } })),
      { type: "notebook", c: 0, r: 1, h: 2, rot: -4, t: "research notebook", s: "how the accents are made", y: "2026", act: { desk: "notebook" } },
      { type: "match", c: 1, r: 1, rot: 10, text: "MUJI", t: "the spec ads", s: "one per matchbox", act: { desk: "matches" }, color: "#b38a5c", tc: "#7f0019" },
      { type: "bag", k: "red", c: 2, r: 1, w: 2, h: 2, rot: -8, t: "thank-you bag", s: "full of comments", act: { desk: "bags" } },
      { type: "receipt", c: 4, r: 1, h: 2, rot: 6, t: "the receipt", s: "43.1M views, itemised", act: { desk: "receipt" } },
      { type: "synth", c: 0, r: 3, w: 2, rot: -3, t: "the accent machine", s: "press a key", act: { desk: "synth" } },
      { type: "passport", c: 2, r: 3, rot: 12, t: "passport", s: "where my viewers live", act: { desk: "passport" } },
      { type: "stamp", k: "kiwi", c: 3, r: 3, rot: -14, t: "kiwi accent", s: "a painting I picked", act: { desk: "stamps" } },
      { type: "note", text: "the accent trend,<br>43.1M views", c: 0, r: 4, w: 2, rot: -3, t: "a note", s: "from aditi", act: { go: "projects" } },
      { type: "eraser", c: 4, r: 4, rot: -20, filler: 1 }
    ] },
    { key: "motion", items: [
      { type: "screen", video: "media/home/motion.mp4", poster: "media/home/motion.jpg", c: 0, r: 0, lean: 1, t: "Put your ideas in motion", s: "experiment 01", y: "2026", act: { video: "media/home/motion.mp4" } },
      ...[2, 3, 4, 5].map((n, i) => ({ type: "screen", text: `exp. 0${n}`, c: i + 1, r: 0, lean: 1, t: `experiment 0${n}`, s: M.soon, act: { soon: "motion" } })),
      { type: "strip", c: 0, r: 2, w: 2, rot: -5, filler: 1 },
      { type: "screen", text: "exp. 06", c: 3, r: 2, rot: 7, t: "experiment 06", s: M.soon, act: { soon: "motion" } },
      { type: "note", text: "more loops<br>coming soon", c: 1, r: 3, w: 2, rot: 5, t: "a note", s: "from aditi", act: { soon: "motion" } },
      { type: "pencil", c: 3, r: 4, w: 2, rot: 8, filler: 1 }
    ] },
    { key: "art", items: [
      ...[0, 1, 2, 3, 4].map(i => ({ type: "canvas", c: i, r: 0, lean: 1, t: "a blank canvas", s: M.soon, act: { soon: "art" } })),
      { type: "tube", c: 0, r: 2, rot: 14, color: "#1f3fa8", filler: 1 }, { type: "tube", c: 1, r: 2, rot: -22, color: "#c8312a", filler: 1 },
      { type: "brush", c: 2, r: 2, w: 3, rot: -6, filler: 1 },
      { type: "note", text: "art arriving<br>soon", c: 1, r: 3, w: 2, rot: -4, t: "a note", s: "from aditi", act: { soon: "art" } },
      { type: "clip", c: 4, r: 4, rot: 20, filler: 1 }
    ] },
    { key: "lounge", items: [
      { type: "tent", text: "reserved<br>for you", c: 1, r: 0, w: 2, lean: 1, t: "reserved", s: "for VIP pass holders", act: { soon: "lounge" } },
      { type: "rope", c: 1, r: 1, w: 3, h: 2, t: "the velvet rope", s: "lifts when the lounge opens", act: { soon: "lounge" } },
      { type: "key", c: 0, r: 3, rot: -18, t: "a brass key", s: "for the lounge", act: { soon: "lounge" } },
      { type: "coat", c: 4, r: 3, rot: 9, t: "your coat check", s: "your pass number", act: { soon: "lounge" } },
      { type: "napkin", c: 3, r: 0, lean: 1, t: "a cocktail napkin", s: "from the lounge", act: { soon: "lounge" } },
      { type: "ticket", text: "the vip lounge", c: 4, r: 0, lean: 1, t: "a ticket", s: "for the lounge", act: { soon: "lounge" } }
    ] },
    { key: "contact", items: [
      { type: "post", c: 0, r: 0, w: 2, lean: 1, t: "a postcard", s: "based in Singapore", act: { card: 1 } },
      { type: "biz", c: 0, r: 1, w: 2, h: 2, rot: -4, t: "my card", s: "click to flip it", act: { flip: 1 } },
      { type: "env", c: 3, r: 1, w: 2, h: 2, rot: 6, t: "an envelope", s: "write to me", act: { mail: 1 } },
      { type: "letter", c: 2, r: 3, w: 2, rot: -8, t: M.aboutTitle, s: "a letter", act: { about: 1 } },
      { type: "pen", c: 0, r: 4, w: 2, rot: -10, filler: 1 },
      { type: "stamp", k: "singaporean", c: 4, r: 0, lean: 1, t: "a stamp", s: "from home", act: { card: 1 } }
    ] }
  ];
  D.forEach((d, i) => Object.assign(d, M.drawers[i]));
  // the things standing up sit in the front row, right behind the glass, like the real museum; everything else moves one row back
  D.forEach(d => d.items.forEach(o => { if (o.lean && o.r === 0) o.r = 4; else o.r = Math.max(0, o.r - 1); }));

  /* ---------- build the cabinet */
  const root = document.createElement("section"); root.className = "mu"; root.setAttribute("aria-label", "Museum of drawers");
  const face = (cls, x, y, z, w, h, tf = "", extra = "") => `<div class="mu-f ${cls}" style="width:${w}px;height:${h}px;transform:translate3d(${x}px,${y}px,${z}px) ${tf}"${extra}></div>`;
  function objHTML(o, di, oi) {
    const [w0, d0] = SIZE[o.type]; const cw = CELLW * (o.w || 1), cd = CELLD * (o.h || 1);
    const cx = (o.c + (o.w || 1) / 2) * CELLW, cy = (o.r + (o.h || 1) / 2) * CELLD;
    const pose = o.lean ? `translate3d(${(cx - w0 / 2).toFixed(1)}px,${(o.r * CELLD + CELLD * .56 - d0).toFixed(1)}px,0) rotateX(-66deg)` : `translate3d(${(cx - w0 / 2).toFixed(1)}px,${(cy - d0 / 2).toFixed(1)}px,3px) rotateZ(${o.rot || 0}deg)`;
    const lab = o.filler ? "" : ` data-d="${di}" data-o="${oi}" tabindex="-1" role="button" aria-label="${(o.t || "").replace(/"/g, "")}${o.s ? ", " + o.s : ""}"`;
    return `<div class="mu-ob${o.lean ? " lean" : ""}${o.filler ? " filler" : ""}" style="width:${w0}px;height:${d0}px;transform:${pose}"${lab}>${o.lean ? `<i class="ob-sh"></i>` : ""}<div class="mu-tilt">${OBJ[o.type](o)}<i class="mu-shade"></i></div></div>`;
  }
  function drawerHTML(d, i) {
    const y = yTop(i), floorBg = "";
    let h = `<div class="mu-dw" data-i="${i}" style="transform:translate3d(${S}px,${y}px,0)">`;
    // floor, walls, dividers
    h += `<div class="dw-items dw-floor" style="width:${IW}px;height:${DD}px;transform:translate3d(0,${FH}px,${-DD}px) rotateX(90deg)">${d.items.map((o, j) => objHTML(o, i, j)).join("")}</div>`;
    h += face("dw-side", 0, 4, 0, DD, FH - 4, "rotateY(90deg)") + face("dw-side r", IW, 4, 0, DD, FH - 4, "rotateY(90deg)");
    h += face("dw-back", 0, 4, -DD, IW, FH - 4);
    // compartments: an object bigger than one cell gets the walls between its cells taken out
    const cov = (c, r) => d.items.findIndex(o => !o.filler && c >= o.c && c < o.c + (o.w || 1) && r >= o.r && r < o.r + (o.h || 1));
    const joined = (c1, r1, c2, r2) => { const a = cov(c1, r1); return a > -1 && a === cov(c2, r2); };
    for (let j = 1; j < 5; j++) for (let r = 0; r < 5; r++) {
      if (joined(j - 1, r, j, r)) continue;
      h += face("dw-div l", CELLW * j, FH - HDV, -(4 - r) * CELLD, CELLD, HDV, "rotateY(90deg)");
      h += face("dw-cap", CELLW * j - 2.5, FH - HDV, -(4 - r) * CELLD, 5, CELLD, "rotateX(-90deg)");
    }
    for (let i = 1; i < 5; i++) for (let c = 0; c < 5; c++) {
      if (joined(c, i - 1, c, i)) continue;
      h += face("dw-div", c * CELLW, FH - HDV, i * CELLD - DD, CELLW, HDV);
      h += face("dw-cap", c * CELLW, FH - HDV, i * CELLD - DD, CELLW, 5, "rotateX(-90deg)");
    }
    h += face("dw-cap side", 0, 4, 0, 6, DD, "rotateX(-90deg)") + face("dw-cap side", IW - 6, 4, 0, 6, DD, "rotateX(-90deg)");
    h += face("dw-shadow", -30, FH + 8, -DD - 30, IW + 60, DD + 60, "rotateX(90deg)");
    // the front: a painted frame around a glass window, a chrome handle on the bottom rail
    h += face("dw-ftop", 0, 0, 0, IW, 20, "rotateX(-90deg)");
    h += `<button class="dw-front" aria-label="${M.drawer} ${i + 1}: ${d.name}" style="width:${IW}px;height:${FH}px">
      <i class="r t"></i><i class="r b"></i><i class="r l"></i><i class="r rr"></i><i class="glass"></i>
      <span class="hdl"><i></i><i></i><b></b></span>${d.key === "lounge" ? `<span class="lock"></span>` : ""}<span class="num">${i + 1}</span></button>`;
    return h + `</div>`;
  }
  let shell = "";
  shell += face("cab-top", 0, 0, 0, CW, CD, "rotateX(-90deg)");
  shell += face("cab-side", 0, 0, 0, CD, TOT - PL, "rotateY(90deg)") + face("cab-side r", CW, 0, 0, CD, TOT - PL, "rotateY(90deg)");
  shell += `<div class="mu-f cab-plate" style="width:${CW}px;height:${HD}px;transform:translate3d(0,0,0)"><span class="plate">${M.plate}</span></div>`;
  shell += face("cab-stile", 0, HD, 0, S, DRW) + face("cab-stile", CW - S, HD, 0, S, DRW);
  for (let i = 0; i <= ND; i++) shell += face("cab-rail", S, HD + i * (FH + R), 0, IW, R);
  for (let i = 0; i < ND; i++) shell += face("cab-hole", S, yTop(i), -DD - 4, IW, FH);
  shell += `<div class="mu-f cab-cup" style="width:${CW}px;height:${CUP}px;transform:translate3d(0,${HD + DRW}px,0)"><i class="door"></i><i class="knob"></i></div>`;
  shell += face("cab-plinth", 14, TOT - PL, -16, CW - 28, PL) + face("cab-floor", -260, TOT, -CD - 200, CW + 520, CD + 520, "rotateX(90deg)");
  root.innerHTML = `
    <div class="mu-head"><b>${M.title}</b><span>${M.by}</span></div>
    <nav class="mu-nav" aria-label="Museum">${M.nav.map((n, i) => `<button data-v="${i}"${i ? "" : ' class="on"'}>${n}</button>`).join("")}</nav>
    <div class="mu-stage"><div class="mu-cam"><div class="mu-cab"><div class="mu-shell">${shell}</div>${D.map(drawerHTML).join("")}</div></div></div>
    <p class="mu-hint">${M.hint}</p>
    <div class="mu-open" aria-live="polite">
      <div class="mu-otitle"><b></b><span></span></div>
      <button class="mu-x" aria-label="Close the drawer"></button>
      <ol class="mu-list"></ol>
      <div class="mu-strip"><button class="mu-arr p" aria-label="Previous drawer"></button>
        <button class="mu-th cab" aria-label="Front view"><i></i></button>${D.map((d, i) => `<button class="mu-th" data-i="${i}" aria-label="${M.drawer} ${i + 1}"><i></i><span>${i + 1}</span></button>`).join("")}
        <button class="mu-arr n" aria-label="Next drawer"></button></div>
    </div>
    <div class="mu-lab" aria-hidden="true"><b></b><span></span></div>
    <div class="mu-index" hidden><div class="mu-ix">${D.map((d, i) => `<section><h3><button data-i="${i}">${M.drawer} ${i + 1}</button> <span>${d.name}</span></h3><p>${d.line}</p><ol>${d.items.filter(o => !o.filler).map(o => `<li><button data-i="${i}" data-o="${d.items.indexOf(o)}">${o.t}</button> <span>${o.s || ""}</span></li>`).join("")}</ol></section>`).join("")}</div></div>
    <div class="mu-modal" hidden><div class="mu-mbox"></div><button class="mu-x" aria-label="Close"></button></div>`;
  document.body.appendChild(root);
  const stage = $(".mu-stage", root), cam = $(".mu-cam", root), shellEl = $(".mu-shell", root), drawers = $$(".mu-dw", root), lab = $(".mu-lab", root), openUI = $(".mu-open", root);

  /* ---------- camera */
  let W = innerWidth, H = innerHeight, sFront = 1, scrollY0 = 0, active = false;
  const camNow = { s: 1, ax: -5, fx: CW / 2, fy: 400, fz: 0 }, camTo = { ...camNow };
  const pull = drawers.map(() => ({ v: 0, to: 0 }));
  let openI = -1, fade = 0, fadeTo = 0;
  function sizes() {
    W = innerWidth; H = innerHeight;
    sFront = Math.min(1.3, (W * (W < 700 ? .92 : .54)) / CW);
    if (openI < 0) frontCam(); else openCam(openI);
  }
  const minY = () => H / 2 / sFront - (W < 700 ? 116 : 92), maxY = () => Math.max(minY(), TOT - H / 2 / sFront + 60);
  function frontCam() { Object.assign(camTo, { s: sFront, ax: -5, fx: CW / 2, fy: Math.max(minY(), Math.min(maxY(), scrollY0 || minY())), fz: 0 }); }
  function openCam(i) {
    const s = Math.min(W * (W < 700 ? .94 : .6) / IW, (H - 220) / (DD * .8 + FH * .6 + 40));
    Object.assign(camTo, { s, ax: -66, fx: S + IW / 2, fy: yTop(i) + FH - 10, fz: DD * .9 - DD / 2 + 30 });
  }
  const ease = (a, b, k) => a + (b - a) * k;
  let last = 0;
  function tick(now) {
    if (!active) return; requestAnimationFrame(tick);
    const dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
    const k = calm ? 1 : 1 - Math.exp(-dt * 4.2), kp = calm ? 1 : 1 - Math.exp(-dt * 6);
    for (const p in camNow) camNow[p] = ease(camNow[p], camTo[p], k);
    cam.style.transform = `scale(${camNow.s.toFixed(4)}) rotateX(${camNow.ax.toFixed(3)}deg) translate3d(${(-camNow.fx).toFixed(2)}px,${(-camNow.fy).toFixed(2)}px,${(-camNow.fz).toFixed(2)}px)`;
    pull.forEach((p, i) => { const v = ease(p.v, p.to, kp); if (Math.abs(v - p.v) > .01) { p.v = v; drawers[i].style.transform = `translate3d(${S}px,${yTop(i)}px,${v.toFixed(2)}px)`; } });
    fade = ease(fade, fadeTo, calm ? 1 : 1 - Math.exp(-dt * 5)); shellEl.style.opacity = (1 - fade).toFixed(3);
    drawers.forEach((d, i) => { if (i !== openI) d.style.opacity = (1 - fade).toFixed(3); });
  }

  /* ---------- open and close */
  function open(i, focusItem) {
    if (i < 0 || i >= ND) return;
    const prev = openI; openI = i; root.classList.add("is-open"); hideLab();
    pull.forEach((p, j) => p.to = j === i ? DD * .9 : 0);
    drawers.forEach((d, j) => { d.classList.toggle("on", j === i); d.style.opacity = j === i ? 1 : d.style.opacity; });
    fadeTo = 1; openCam(i);
    const d = D[i];
    $(".mu-otitle b", root).textContent = `${M.drawer} ${i + 1}`; $(".mu-otitle span", root).textContent = d.name;
    $(".mu-list", root).innerHTML = d.items.filter(o => !o.filler).map(o => `<li><button data-o="${d.items.indexOf(o)}">${o.t}</button><span>${o.s || ""}${o.y ? ", " + o.y : ""}</span></li>`).join("");
    $$(".mu-th", root).forEach(t => t.classList.toggle("on", +t.dataset.i === i));
    $$(".mu-ob[data-o]", drawers[i]).forEach(o => o.tabIndex = 0); if (prev > -1 && prev !== i) $$(".mu-ob[data-o]", drawers[prev]).forEach(o => o.tabIndex = -1);
    $$(".mu-dw:not(.on) video", root).forEach(v => v.pause());
    if (d.key === "motion") setTimeout(() => $$("video", drawers[i]).forEach(v => { v.preload = "auto"; v.play().catch(() => {}); }), 700);
    navOn(1); try { history.replaceState(null, "", "#" + (d.key === "projects" ? "drawer-projects" : d.key === "films" ? "drawer-films" : d.key)); } catch (e) {}
    if (focusItem != null) setTimeout(() => { const el = $(`.mu-ob[data-o="${focusItem}"]`, drawers[i]); if (el) { el.classList.add("ping"); setTimeout(() => el.classList.remove("ping"), 1600); } }, 900);
  }
  function close() {
    if (openI < 0) return; const i = openI; openI = -1; root.classList.remove("is-open");
    pull.forEach(p => p.to = 0); fadeTo = 0; frontCam(); drawers.forEach(d => d.classList.remove("on"));
    $$("video", root).forEach(v => v.pause()); hideLab(); navOn(0);
    try { history.replaceState(null, "", "#home"); } catch (e) {}
    setTimeout(() => drawers[i].querySelector(".dw-front").focus({ preventScroll: true }), 50);
  }
  function navOn(n) { $$(".mu-nav button", root).forEach((b, j) => b.classList.toggle("on", j === n)); }

  /* ---------- labels and the tilt */
  function showLab(e, t, s) { lab.querySelector("b").textContent = t; lab.querySelector("span").textContent = s || ""; lab.classList.add("on"); moveLab(e); }
  function moveLab(e) { lab.style.transform = `translate3d(${Math.min(W - 230, e.clientX + 16)}px,${e.clientY + 18}px,0)`; }
  function hideLab() { lab.classList.remove("on"); }
  let hotDw = -1, hotOb = null;
  root.addEventListener("pointermove", e => {
    if (!active) return;
    const ob = e.target.closest(".mu-ob[data-o]"), dw = e.target.closest(".mu-dw");
    if (openI < 0) {
      const i = dw ? +dw.dataset.i : -1;
      if (i !== hotDw) { if (hotDw > -1) pull[hotDw].to = 0; hotDw = i; if (i > -1) pull[i].to = 26; }
      if (i > -1) showLab(e, `${M.drawer} ${i + 1}`, D[i].name); else hideLab();
      return;
    }
    if (ob && +ob.dataset.d === openI) {
      if (hotOb !== ob) { if (hotOb) untilt(hotOb); hotOb = ob; }
      const r = ob.getBoundingClientRect(), u = ((e.clientX - r.left) / r.width - .5) * 2, v = ((e.clientY - r.top) / r.height - .5) * 2;
      const t = ob.querySelector(".mu-tilt"); t.style.setProperty("--u", u.toFixed(3)); t.style.setProperty("--v", v.toFixed(3)); ob.classList.add("hot");
      const o = D[openI].items[+ob.dataset.o]; showLab(e, o.t, [o.s, o.y].filter(Boolean).join(", "));
    } else { if (hotOb) { untilt(hotOb); hotOb = null; } hideLab(); }
  });
  const untilt = ob => { ob.classList.remove("hot"); const t = ob.querySelector(".mu-tilt"); t.style.setProperty("--u", 0); t.style.setProperty("--v", 0); };
  root.addEventListener("pointerleave", () => { hideLab(); if (hotDw > -1 && openI < 0) { pull[hotDw].to = 0; hotDw = -1; } });

  /* ---------- clicks */
  root.addEventListener("click", e => {
    const t = e.target;
    if (t.closest(".mu-modal")) { if (t.closest(".mu-x") || t === $(".mu-modal", root)) modal(null); return; }
    if (t.closest(".mu-index")) { const b = t.closest("button[data-i]"); if (b) { index(false); open(+b.dataset.i, b.dataset.o != null ? +b.dataset.o : null); } else if (!t.closest(".mu-ix")) index(false); return; }
    const nav = t.closest(".mu-nav button"); if (nav) { const v = +nav.dataset.v; if (v === 0) { index(false); close(); } else if (v === 1) { index(false); open(openI < 0 ? 0 : openI); } else index(true); return; }
    if (t.closest(".mu-open .mu-x")) return close();
    const th = t.closest(".mu-th"); if (th) { if (th.classList.contains("cab")) close(); else open(+th.dataset.i); return; }
    const ar = t.closest(".mu-arr"); if (ar) { open((openI + (ar.classList.contains("n") ? 1 : ND - 1)) % ND); return; }
    const li = t.closest(".mu-list button"); if (li) { act(openI, +li.dataset.o); return; }
    const ob = t.closest(".mu-ob[data-o]"); if (ob && +ob.dataset.d === openI) { act(openI, +ob.dataset.o, ob); return; }
    const front = t.closest(".dw-front"); if (front) { const i = +front.closest(".mu-dw").dataset.i; if (openI !== i) open(i); return; }
  });
  root.addEventListener("keydown", e => {
    const ob = e.target.closest && e.target.closest(".mu-ob[data-o]");
    if (ob && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); act(+ob.dataset.d, +ob.dataset.o, ob); }
  });
  addEventListener("keydown", e => {
    if (!active || document.body.classList.contains("menu-open") || document.body.classList.contains("vp-open")) return;
    if (e.key === "Escape") { if (!$(".mu-modal", root).hidden) modal(null); else if (!$(".mu-index", root).hidden) index(false); else close(); }
    if (openI > -1 && (e.key === "ArrowRight" || e.key === "ArrowLeft")) open((openI + (e.key === "ArrowRight" ? 1 : ND - 1)) % ND);
  });
  function act(di, oi, el) {
    const o = D[di].items[oi], a = o.act || {};
    if (a.film != null) return window.SITE.go("films"), setTimeout(() => window.CDS_PLAY && window.CDS_PLAY(a.film), 350);
    if (a.go) return window.SITE.go(a.go);
    if (a.desk) return window.SITE.go("projects"), setTimeout(() => window.DESK && window.DESK.inspect(a.desk), 700);
    if (a.video) return modal(`<video src="${a.video}" controls autoplay playsinline></video><p class="cap">${o.t}<span>${o.s}</span></p>`, "vid");
    if (a.soon) return modal(`<p class="hnote">${a.soon === "lounge" ? M.loungeLocked : a.soon === "art" ? M.artSoon : M.motionSoon}</p><p class="sig">aditi</p>`, "note");
    if (a.flip) { const b = el && el.querySelector(".ob-biz"); if (b) b.classList.toggle("flip"); return; }
    if (a.card) return modal(`<div class="bigcard"><b>${M.card.name}</b><i>${M.card.role}</i><s>${M.card.city}</s><hr>${M.card.links.map(([x, y]) => `<p><u>${x}</u>${y}</p>`).join("")}</div>`, "note");
    if (a.mail) { if (M.email) location.href = "mailto:" + M.email; else modal(`<p class="hnote">${M.emailSoon}</p><p class="sig">aditi</p>`, "note"); return; }
    if (a.about) return modal(`<div class="letter"><h3>${M.aboutTitle}</h3><p>${M.aboutBody}</p><p class="ps">${M.aboutNote}</p><p class="sig">love, aditi</p></div>`, "note");
  }
  function modal(html, kind) {
    const m = $(".mu-modal", root);
    if (!html) { m.hidden = true; $$("video", m).forEach(v => v.pause()); $(".mu-mbox", m).innerHTML = ""; return; }
    m.className = "mu-modal " + (kind || ""); $(".mu-mbox", m).innerHTML = html; m.hidden = false; hideLab();
  }
  function index(on) { $(".mu-index", root).hidden = !on; if (on) { navOn(2); hideLab(); } else navOn(openI < 0 ? 0 : 1); }

  /* ---------- scrolling down the cabinet in front view */
  root.addEventListener("wheel", e => {
    if (!active || openI > -1 || !$(".mu-index", root).hidden || !$(".mu-modal", root).hidden) return; e.preventDefault();
    scrollY0 = Math.max(minY(), Math.min(maxY(), camTo.fy + e.deltaY / camTo.s * .8)); camTo.fy = scrollY0;
  }, { passive: false });
  let ty = null; root.addEventListener("touchstart", e => { ty = e.touches[0].clientY; }, { passive: true });
  root.addEventListener("touchmove", e => { if (ty == null || openI > -1) return; const y = e.touches[0].clientY; scrollY0 = Math.max(minY(), Math.min(maxY(), camTo.fy + (ty - y) / camTo.s)); camTo.fy = scrollY0; ty = y; }, { passive: true });

  /* ---------- the router talks to us */
  window.MUSEUM = {
    active(on, drawerKey) {
      if (on && !active) { active = true; last = 0; sizes(); for (const p in camTo) camNow[p] = camTo[p]; if (!drawerKey) { camNow.fy -= 140; camNow.s *= .94; } requestAnimationFrame(tick); }
      if (!on && active) { active = false; $$("video", root).forEach(v => v.pause()); hideLab(); }
      if (on) { const i = drawerKey ? D.findIndex(d => d.key === drawerKey) : -1; if (i > -1) setTimeout(() => open(i), 250); else if (openI > -1 && !drawerKey) close(); }
    },
    keys: D.map(d => d.key)
  };
  addEventListener("resize", () => { if (active) sizes(); });
})();
