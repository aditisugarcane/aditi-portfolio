/* Independent projects: a retro desk with a green cutting mat. Everything from the accent trend and the spec ads
   sits on the mat as a real object; click one and the camera dives in and it opens up.
   All words live in app/copy.js (COPY.desk) or in the data blocks right below. */
(() => {
  const C = window.COPY.desk, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const R = seed => { let s = (seed * 9301 + 49297) % 233280 || 1; return () => (s = (s * 9301 + 49297) % 233280) / 233280; };
  const wait = ms => new Promise(ok => setTimeout(ok, ms));

  /* ================= data ================= */
  const ACC = [
    { k: "australian", name: "australian", v: "9M", img: "media/tk/s-aussie-0.webp", pos: "50% 0%" },
    { k: "jamaican", name: "jamaican", v: "4.8M", img: "media/desk/st-jamaican.webp" },
    { k: "nigerian", name: "nigerian", v: "4.5M", img: "media/desk/st-nigerian.webp" },
    { k: "east-texan", name: "east texan", v: "3.5M", img: "media/desk/st-east-texan.webp" },
    { k: "french", name: "french", v: "2.2M", img: "media/desk/st-french.webp" },
    { k: "hong-kong", name: "hong kong", v: "2M", img: "media/desk/st-hong-kong.webp" },
    { k: "irish-cork", name: "irish (cork)", v: "972K", img: "media/desk/st-irish-cork.webp" },
    { k: "singaporean", name: "singaporean", v: "913.9K", img: "media/desk/st-singaporean.webp" },
    { k: "filipino", name: "filipino", v: "796.5K", img: "media/desk/st-filipino.webp" },
    { k: "kiwi", name: "kiwi", v: "651.3K", img: "media/desk/st-kiwi.webp" },
    { k: "new-york", name: "new york", v: "588.2K", img: "media/desk/st-new-york.webp" },
    { k: "russian", name: "russian", v: "", img: "media/desk/st-russian.webp" }
  ];
  const STAMPS = ["jamaican", "nigerian", "east-texan", "french", "hong-kong", "irish-cork", "singaporean", "filipino", "kiwi", "new-york", "russian", "brazilian", "japanese"];
  const SCRIPTS = {
    australian: { t: "The Haircut", l: [
      ["I told the hairdresser I just wanted a small trim.", "oi tauld tha heedressa oi jast wontid a smawl trim"],
      ["She nodded and started cutting, seemingly very confident.", "shee nodid an stahdid kadding, seeminglee verree confidint"],
      ["I closed my eyes for a moment to relax a little.", "oi claurzed moi oiz for a maurment ta relax a liddle"],
      ["When I opened them, half my hair was already gone.", "wen oi aurpened em, hahf moi hea wos awlreddee gawn"],
      ["I panicked but didn't want to seem rude, so I said nothing.", "oi panikt bat didn wonna seem rood, saur oi sed nathing"],
      ["I left the salon looking like a completely different person.", "oi left tha salon lookin loik a kumpleetlee difrint peeson"]] },
    "east-texan": { t: "The Nap", l: [
      ["I laid down for a ten minute nap after lunch.", "ah laid daown for a tin minit nap after lunch"],
      ["My alarm went off, and I turned it off in my sleep.", "mah uh-larm wint awf, an ah turned it awf in mah sleep"],
      ["When I woke up, the sun was going down.", "win ah woke up, thuh sun wuz goin daown"],
      ["I had missed two meetings and seventeen messages.", "ah had mist two meetins an seb'm-teen messidges"],
      ["I panicked and called my boss right away.", "ah panicked an cawled mah bawss raht away"],
      ["He said he thought I had quit three days ago.", "he sed he thawt ah had quit three days uh-go"]] },
    jamaican: { t: "The Bank", l: [
      ["The woman at the bank asked me three security questions.", "di wu-man at di bank ask mi tree si-kyu-ri-ti kwes-chan"],
      ["I answered all of them correctly and she still looked doubtful.", "ai an-sa aal av dem ko-rek-li an shi stil luk dout-ful"],
      ["She asked what my mother called me as a child.", "shi ask wat mai madda kaal mi az a chail"],
      ["I told her, and she laughed for a full minute.", "ai tol har, an shi laaf faa a ful mi-nit"],
      ["Then she approved everything without checking anything else.", "den shi a-pruuv ev-ri-ting wid-out chek-in els"],
      ["My mother's name for me is not something I will repeat here.", "mai madda niem faa mi iz not som-ting ai wil ri-piit hier"]] }
  };
  const FILMS = [
    { k: "muji", name: "MUJI", sub: "spec ad, 2026", src: "media/films/muji.mp4", box: "#c9a77c", ink: "#7f0019", lab: "#efe4d2" },
    { k: "zoo", name: "Australia Zoo", sub: "spec ad, 2026", src: "media/films/australia-zoo.mp4", box: "#8b7d4e", ink: "#2d3a1d", lab: "#d9cf9e" },
    { k: "pinterest", name: "Pinterest", sub: "spec ad, 2026", src: "media/films/pinterest.mp4", box: "#c8102e", ink: "#ffffff", lab: "#c8102e" },
    { k: "brandy", name: "Brandy Melville × Confident", sub: "spec ad, 2026", src: "media/films/brandy-confident.mp4", box: "#f1b9c6", ink: "#8a2341", lab: "#fbe3e8" },
    { k: "bluetooth", name: "Bluetooth", sub: "an etymology film, 2026", src: "media/films/bluetooth.mp4", box: "#1f6f78", ink: "#f2efe6", lab: "#2a8590" }
  ];
  const COM = [
    { h: "locals say it's accurate", bag: "blue", items: [
      { q: "This really is the Hong Kong accent, I'm impressed.", by: "on the hong kong post" },
      { q: "I'm from cork this is pretty accurate", by: "from Cork" },
      { q: "I'm East Texan and this is exactly how we sound! Need a different image though. It's all piney woods where we are from, not rocky hill county shown here.", by: "an East Texan", pic: "media/tk/pines.webp" },
      { q: "I'm from the BX and this was perfect", by: "from the Bronx" },
      { q: "i'm a bilingual french and english speaker. i did it with my best french accent without reading your transcriptions, then read the phonetic transcriptions you made. they are PERFECT!!!", by: "a bilingual French speaker" }] },
    { h: "and it's funny", bag: "red", items: [
      { q: "IM ACTUALLY CRACKING UP AT MYSELF", by: "12.6K likes", big: 1 },
      { q: "please I'm at school and alone here in the corner and I tried so hard to laugh", by: "a viewer" },
      { q: "woah this is actually so cool. I stopped after the \"milk tee\" because I was shocked at how I really sounded like them", by: "on the hong kong post" },
      { q: "these are great questions. if they're yours, then i love your brain!", by: "on the questions series" },
      { q: "make more this is so fun", by: "a viewer" }] },
    { h: "and it left the screen", bag: "brown", items: [
      { q: "My kids think these are the funniest things ever and laugh so hard. I save these for bedtime and reread them instead of stories lol", by: "a parent" },
      { q: "i used that pic as inspo for my bowl!!", by: "on the jamaican post", pic: "media/tk/bowl.webp" },
      { q: "As someone hoping to be a voice actor soon thank you", by: "a future voice actor" },
      { q: "my boyfriend and i love these, please post more, awesome work!!", by: "a viewer" },
      { q: "i just discovered your account from my fyp, and omg i love u, immediate follow", by: "a new follower" }] }
  ];
  const COUNTRIES = [["United States", 25.9], ["United Kingdom", 18.3], ["Philippines", 7.2], ["Canada", 3.4], ["Australia", 3.3], ["South Africa", 2.5], ["Ireland", 1.6], ["Singapore", 1.4], ["Germany", 1.3], ["Malaysia", 1.2]];
  const VIDS = [
    { t: "A History of the New Zealand Accent", ch: "New Zealand Stories", u: "https://youtu.be/5JbIGMh1gYg" },
    { t: "When Did Americans Lose the British Accent?", ch: "History Helms", u: "https://youtu.be/Ox-ws0ZMeHk" },
    { t: "Why Did the Transatlantic Accent Suddenly Vanish?", ch: "New York Post", u: "https://youtu.be/adDgO_g2p5E" }
  ];
  const SER = { start: "2026-06-14", views: [3,0,0,0,227,210,1551,28734,267287,282016,109472,60649,101261,314518,466741,372247,125496,86132,64541,71275,88836,55206,46658,43158,54701,97638,57869,32206,33433,28832,19622,20484,39170,28161,32172,89993,361018,2830178,2924769,1529326,1780375,2447848,2365167,2181636,1288151,1221590,1039277,1264787,1051852,918813,588868,519681,529073,496098,618384,444554,473056,447364,417479,303760,264129,189849,295571,272684,265686,301737,379928,953599,957375,558589,576136,296844,408303,474727,242596,172301,204492,344417,171615,136841,144238,138744,217207,177497,188636,221344,209148,459070,260433,203091,162123,131231,85890,96573,125869,88041,76818,77077,119139,66370,61596,63777,58875,54060,54588,54698,43516,40855,41766,43417,47776,54127,58027,51245,42115,41199,39469,41299,47174,44721,42025,35394,35281,33177,32159,28858,25708,19499,17740] };
  const CUM = []; SER.views.reduce((a, v, i) => (CUM[i] = a + v), 0);
  const STATS = [["43.1M", "views"], ["2.78M", "likes"], ["562.6K", "shares"], ["20.8K", "comments"], ["24K", "followers"], ["20.2M", "first-time viewers"]];

  /* ================= little drawing helpers (wobbly, like a pen) ================= */
  const ell = (cx, cy, rx, ry, seed = 1, turns = 1.12) => {
    const r = R(seed), n = Math.round(56 * turns), a0 = r() * 6.28; let d = "";
    for (let i = 0; i <= n; i++) { const u = i / n, a = a0 + u * turns * 6.283, w = 1 + (r() - .5) * .03 + .035 * Math.sin(a * 2 + seed) + (u - .5) * .07;
      d += (i ? "L" : "M") + (cx + Math.cos(a) * rx * w).toFixed(1) + " " + (cy + Math.sin(a) * ry * w).toFixed(1); }
    return d;
  };
  const arrow = (x1, y1, x2, y2, bend = .25, seed = 3, h = 9) => {
    const r = R(seed), mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
    const cx = mx - dy * bend + (r() - .5) * 5, cy = my + dx * bend + (r() - .5) * 5, a = Math.atan2(y2 - cy, x2 - cx);
    return `M${x1} ${y1}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}M${(x2 - h * Math.cos(a - .5)).toFixed(1)} ${(y2 - h * Math.sin(a - .5)).toFixed(1)}L${x2} ${y2}L${(x2 - h * Math.cos(a + .5)).toFixed(1)} ${(y2 - h * Math.sin(a + .5)).toFixed(1)}`;
  };
  const wline = (x1, y1, x2, y2, seed = 2, amp = 1.6) => { const r = R(seed), n = 10; let d = `M${x1} ${y1}`; for (let i = 1; i <= n; i++) d += `L${(x1 + (x2 - x1) * i / n).toFixed(1)} ${(y1 + (y2 - y1) * i / n + (i < n ? (r() - .5) * amp : 0)).toFixed(1)}`; return d; };
  const ink = (d, cls = "", extra = "") => `<path class="ink ${cls}" pathLength="1" d="${d}" ${extra}/>`;
  const tape = (x, y, w, rot, extra = "") => `<i class="nb-tape" style="left:${x}px;top:${y}px;width:${w}px;transform:rotate(${rot}deg);${extra}"></i>`;
  const svgPen = `<svg viewBox="0 0 200 18"><rect x="14" y="3" width="150" height="12" rx="6" fill="#1b1d22"/><rect x="40" y="1" width="70" height="3" rx="1.5" fill="#c9ccd1"/><path d="M164 4l26 5-26 5z" fill="#c9ccd1"/><path d="M186 8l6 1-6 1z" fill="#22379b"/><rect x="2" y="4" width="16" height="10" rx="3" fill="#2a2d33"/></svg>`;
  const svgClip = `<svg viewBox="0 0 30 70"><path d="M9 54V14a6 6 0 0 1 12 0v44a9 9 0 0 1-18 0V10a12 12 0 0 1 24 0v42" fill="none" stroke="#b9bdc2" stroke-width="2.6" stroke-linecap="round"/></svg>`;

  /* ================= the things on the mat ================= */
  // x, y, w, h, rotation for a landscape mat (1400 x 900) and a portrait one (900 x 1400); side = where the label sits
  const OB = [
    { k: "notebook", L: [90, 96, 240, 364, -5], P: [596, 52, 240, 364, 4], lab: { L: [112, 490, "u"], P: [600, 436, "u"] } },
    { k: "synth", L: [438, 70, 440, 252, 1.5], P: [52, 64, 440, 252, -1.5], lab: { L: [560, 350, "u"], P: [110, 340, "u"] } },
    { k: "matches", L: [984, 54, 330, 210, 0], P: [40, 420, 330, 210, 0], lab: { L: [970, 286, "u"], P: [40, 660, "u"] } },
    { k: "bags", L: [920, 352, 300, 300, 0], P: [432, 470, 300, 300, 0], lab: { L: [970, 682, "u"], P: [470, 790, "u"] } },
    { k: "receipt", L: [1250, 330, 104, 340, 5], P: [770, 520, 104, 340, -4], lab: { L: [1150, 712, "u"], P: [660, 890, "u"] } },
    { k: "letters", L: [440, 404, 300, 214, 0], P: [60, 720, 300, 214, 0], lab: { L: [500, 630, "u"], P: [90, 960, "u"] } },
    { k: "passport", L: [136, 586, 160, 226, -11], P: [450, 860, 160, 226, 9], lab: { L: [100, 546, "d"], P: [632, 960, "l"] } },
    { k: "stamps", L: [430, 676, 340, 196, 2.5], P: [60, 1060, 340, 196, -2], lab: { L: [794, 776, "l"], P: [80, 1282, "u"] } }
  ];
  const FILL = [
    { L: [800, 470, 200, 18, 64], P: [640, 1180, 200, 18, -30], html: `<span class="dk-svg">${svgPen}</span>` },
    { L: [360, 470, 24, 56, 18], P: [500, 1240, 24, 56, -40], html: `<span class="dk-svg">${svgClip}</span>` },
    { L: [1070, 800, 64, 30, -24], P: [700, 1300, 64, 30, 18], html: `<span class="dk-eraser"></span>` }
  ];
  function obHTML(k) {
    switch (k) {
      case "notebook": return `<span class="dk-nb"><img src="media/desk/notebook-cover.webp" alt="" draggable="false"><i class="lbl">accent research<b>no. 1</b></i></span>`;
      case "synth": return synthBody(false);
      case "matches": return `<span class="dk-mx">${FILMS.map((f, i) => `<i class="mb" style="--b:${f.box};--i:${f.ink};--l:${f.lab};left:${[0, 66, 134, 198, 250][i]}px;top:${[26, 4, 40, 10, 58][i]}px;transform:rotate(${[-14, 6, -3, 12, -8][i]}deg)"><b>${f.name.replace(" × ", "<br>× ")}</b></i>`).join("")}</span>`;
      case "bags": return `<span class="dk-bags"><img src="media/desk/bag-brown.webp" alt="" style="left:150px;top:44px;transform:rotate(16deg)"><img src="media/desk/bag-blue.webp" alt="" style="left:6px;top:20px;transform:rotate(-12deg)"><img src="media/desk/bag-red.webp" alt="" style="left:82px;top:70px;transform:rotate(4deg)"></span>`;
      case "receipt": return `<span class="dk-rc"><b>THE ACCENT TREND</b><i>21 JUN to 18 OCT 2026</i>${STATS.map(([n, l]) => `<s><u>${l}</u>${n}</s>`).join("")}<em>TOTAL<br>43.1M</em></span>`;
      case "letters": return `<span class="dk-env"><i class="e1"><b>to: aditi</b><s></s></i><i class="e2"><b>to: aditi</b><s></s></i></span>`;
      case "passport": return `<span class="dk-pp"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="22" fill="none" stroke="#d6b45a" stroke-width="2"/><ellipse cx="30" cy="30" rx="10" ry="22" fill="none" stroke="#d6b45a" stroke-width="1.6"/><path d="M8 30h44M12 19h36M12 41h36" stroke="#d6b45a" stroke-width="1.4"/></svg><b>PASSPORT</b><i>my audience</i></span>`;
      case "stamps": return `<span class="dk-sheet">${STAMPS.slice(0, 10).map(s => `<i style="background-image:url(media/desk/st-${s}.webp)"></i>`).join("")}</span>`;
    }
  }
  function synthBody(big) {
    const keys = ACC.map((a, i) => `<button class="sy-k${[0, 3, 7, 10].includes(i) ? " o" : [5, 9].includes(i) ? " g" : ""}" data-a="${i}" ${big ? "" : 'tabindex="-1"'} aria-label="${a.name} accent"><span>${a.name}</span></button>`).join("");
    return `<span class="sy${big ? " big" : ""}"><span class="sy-top"><b>AM-12</b><i>accent machine</i><span class="sy-knobs"><i style="--c:#ef6b2c"></i><i style="--c:#3d6fd8"></i><i style="--c:#e7e5df"></i><i style="--c:#1d1d1f"></i></span></span>
      <span class="sy-scr"><span class="sy-img"></span><span class="sy-txt"></span><span class="sy-idle">${C.synthIdle || "press a key"}</span><span class="sy-hud"><b></b><i></i></span></span>
      <span class="sy-keys">${keys}</span><span class="sy-grill"></span></span>`;
  }

  /* ================= build the scene ================= */
  const root = document.createElement("section"); root.className = "desk"; root.setAttribute("aria-label", C.title);
  root.innerHTML = `
    <div class="dk-stage"><div class="dk-cam"><div class="dk-table"><div class="dk-wood"></div><div class="dk-mat"><i class="dk-matedge"></i></div><div class="dk-things"></div></div></div></div>
    <header class="dk-head"><b>${C.title}</b><span>${C.sub}</span></header>
    <button class="dk-films" type="button">${C.filmsLink}<svg viewBox="0 0 16 10"><path d="M1 5h13M10 1l4 4-4 4"/></svg></button>
    <p class="dk-hint">${C.hint}</p>
    <div class="dk-bar"><button class="dk-back" type="button"><svg viewBox="0 0 16 10"><path d="M15 5H2M6 1L2 5l4 4"/></svg><span>${C.museum || "back to the museum"}</span></button><span class="dk-now">${C.deskName || "the desk"}</span><span class="dk-esc">${C.esc}</span></div>
    <div class="dk-insp" hidden><div class="dk-ibox"></div></div>
    <div class="dk-tip" aria-hidden="true"></div><div class="dk-player" hidden></div>`;
  document.body.appendChild(root);
  const cam = $(".dk-cam", root), table = $(".dk-table", root), things = $(".dk-things", root), insp = $(".dk-insp", root), ibox = $(".dk-ibox", root);
  let portrait = false, built = false;
  function place() {
    portrait = innerWidth < innerHeight * .9 && innerWidth < 900;
    const MW = portrait ? 900 : 1400, MH = portrait ? 1400 : 900;
    table.style.width = MW + "px"; table.style.height = MH + "px"; root.classList.toggle("portrait", portrait);
    const html = OB.map(o => { const [x, y, w, h, r] = portrait ? o.P : o.L;
      return `<div class="dk-ob" data-k="${o.k}" role="button" tabindex="0" aria-label="${C.labels[o.k]}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;--r:${r}deg">
        <i class="dk-sh"></i><div class="dk-lift"><div class="dk-tilt">${obHTML(o.k)}<i class="dk-shade"></i></div></div></div>`; }).join("")
      + FILL.map(f => { const [x, y, w, h, r] = portrait ? f.P : f.L; return `<div class="dk-ob filler" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;--r:${r}deg"><i class="dk-sh"></i><div class="dk-lift"><div class="dk-tilt">${f.html}</div></div></div>`; }).join("")
      + OB.map((o, i) => labHTML(o, i)).join("");
    things.innerHTML = html; built = true;
  }
  function labHTML(o, i) {
    const [lx, ly, dir] = o.lab[portrait ? "P" : "L"], t = C.labels[o.k], tw = Math.round(t.length * 10.6 + 8), b = i % 2 ? .3 : -.3;
    const a = dir === "u" ? arrow(tw * .3, -2, tw * .3 - 10, -26, b, i + 4) : dir === "d" ? arrow(tw * .5, 34, tw * .5 + 12, 58, b, i + 4) : dir === "l" ? arrow(-4, 14, -30, 2, b, i + 4) : arrow(tw + 4, 14, tw + 30, 2, b, i + 4);
    return `<div class="dk-lab" data-for="${o.k}" style="left:${lx}px;top:${ly}px;width:${tw}px"><span>${t}</span><svg width="1" height="1">${ink(a)}</svg></div>`;
  }

  /* ================= camera ================= */
  const camNow = { s: .5, ax: 34, rz: 0, fx: 700, fy: 450 }, camTo = { ...camNow };
  let active = false, sFit = .5, focus = null, px = .5, py = .5;
  function fit() {
    const W = innerWidth, H = innerHeight, MW = portrait ? 900 : 1400, MH = portrait ? 1400 : 900;
    sFit = Math.min(W * .9 / MW, (H - (W < 700 ? 130 : 170)) / (MH * .98));
    if (!focus) Object.assign(camTo, { s: sFit, ax: portrait ? 26 : 34, rz: 0, fx: MW / 2, fy: MH / 2 + (portrait ? 0 : 10) });
  }
  function aim(k) {
    const o = OB.find(q => q.k === k), [x, y, w, h] = portrait ? o.P : o.L;
    Object.assign(camTo, { s: sFit * Math.min(2.2, Math.max(1.4, 380 / Math.max(w, h))), ax: 12, rz: 0, fx: x + w / 2, fy: y + h / 2 });
  }
  let last = 0;
  function tick(now) {
    if (!active) return; requestAnimationFrame(tick);
    const dt = Math.min(.05, (now - (last || now)) / 1000); last = now; const k = calm ? 1 : 1 - Math.exp(-dt * 3.6);
    const par = focus || calm ? { ax: 0, rz: 0 } : { ax: (py - .5) * -3, rz: (px - .5) * -1.6 };
    camNow.s += (camTo.s - camNow.s) * k; camNow.fx += (camTo.fx - camNow.fx) * k; camNow.fy += (camTo.fy - camNow.fy) * k;
    camNow.ax += (camTo.ax + par.ax - camNow.ax) * k; camNow.rz += (camTo.rz + par.rz - camNow.rz) * k;
    cam.style.transform = `scale(${camNow.s.toFixed(4)}) rotateX(${camNow.ax.toFixed(3)}deg) rotateZ(${camNow.rz.toFixed(3)}deg) translate3d(${(-camNow.fx).toFixed(2)}px,${(-camNow.fy).toFixed(2)}px,0)`;
  }

  /* ================= hover: objects lift and tilt under the pointer ================= */
  const tip = $(".dk-tip", root);
  let hot = null;
  root.addEventListener("pointermove", e => {
    px = e.clientX / innerWidth; py = e.clientY / innerHeight;
    if (focus) return;
    const ob = e.target.closest && e.target.closest(".dk-ob:not(.filler)");
    if (ob !== hot) { if (hot) { hot.classList.remove("hot"); hot.style.removeProperty("--u"); hot.style.removeProperty("--v"); } hot = ob; if (ob) ob.classList.add("hot"); root.classList.toggle("hovering", !!ob); $$(".dk-lab", root).forEach(l => l.classList.toggle("on", !!ob && l.dataset.for === ob.dataset.k)); }
    if (ob) { const r = ob.getBoundingClientRect(); ob.style.setProperty("--u", (((e.clientX - r.left) / r.width - .5) * 2).toFixed(3)); ob.style.setProperty("--v", (((e.clientY - r.top) / r.height - .5) * 2).toFixed(3)); }
  });
  root.addEventListener("pointerleave", () => { if (hot) { hot.classList.remove("hot"); hot = null; root.classList.remove("hovering"); } });

  /* ================= opening and closing an object ================= */
  let openK = null, cleanup = [], kbd = false;
  addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " " || e.key === "Tab") kbd = true; }, true); addEventListener("pointerdown", () => { kbd = false; }, true);
  function inspect(k) {
    if (!OB.some(o => o.k === k)) return;
    if (openK) shut(true);
    openK = k; focus = k; aim(k); root.classList.add("diving");
    if (hot) { hot.classList.remove("hot"); hot = null; }
    $(".dk-now", root).textContent = C.labels[k]; $(".dk-back span", root).textContent = C.back;
    ibox.className = "dk-ibox k-" + k; ibox.innerHTML = "";
    setTimeout(() => {
      if (openK !== k) return;
      insp.hidden = false; root.classList.add("open"); ibox.innerHTML = BUILD[k]();
      requestAnimationFrame(() => { insp.classList.add("in"); (INIT[k] || (() => {}))(ibox); });
      if (kbd) { const f = ibox.querySelector("button,[tabindex],a"); if (f) f.focus({ preventScroll: true }); }
    }, calm ? 0 : 520);
  }
  function shut(quick) {
    if (!openK) return; const k = openK; openK = null; focus = null; fit();
    cleanup.forEach(f => f()); cleanup = []; closePlayer();
    root.classList.remove("open", "diving"); insp.classList.remove("in");
    $$("video", ibox).forEach(v => v.pause());
    setTimeout(() => { if (!openK) { insp.hidden = true; ibox.innerHTML = ""; } }, quick ? 0 : 380);
    $(".dk-now", root).textContent = C.deskName || "the desk"; $(".dk-back span", root).textContent = C.museum || "back to the museum";
    const ob = $(`.dk-ob[data-k="${k}"]`, root); if (ob && !quick) ob.focus({ preventScroll: true });
  }
  root.addEventListener("click", e => {
    const t = e.target;
    if (t.closest(".dk-back")) { if (openK) shut(); else window.SITE.go("drawer-projects"); return; }
    if (t.closest(".dk-films")) { window.SITE.go("films"); return; }
    if (openK) { if (t === insp || t.classList.contains("dk-ibox") || t.closest(".dk-close")) shut(); return; }
    const ob = t.closest(".dk-ob:not(.filler)"); if (ob) inspect(ob.dataset.k);
  });
  root.addEventListener("keydown", e => { const ob = e.target.closest && e.target.closest(".dk-ob:not(.filler)"); if (ob && !openK && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); inspect(ob.dataset.k); } });
  addEventListener("keydown", e => {
    if (!active || document.body.classList.contains("menu-open") || document.body.classList.contains("vp-open")) return;
    if (e.key === "Escape" && openK) { if ($(".dk-player:not([hidden])", root)) return closePlayer(); shut(); }
    if (openK === "notebook" && (e.key === "ArrowRight" || e.key === "ArrowLeft")) { e.preventDefault(); turn(e.key === "ArrowRight" ? 1 : -1); }
    if (openK === "synth") { const i = "1234567890-=".indexOf(e.key); if (i > -1) press(i); }
  });

  /* ================= 1. the research notebook ================= */
  const pg = (cls, html) => `<div class="pg ${cls}">${html}</div>`;
  const hw = (t, x, y, extra = "", cls = "") => `<p class="hw ${cls}" style="left:${x}px;top:${y}px;${extra}">${t}</p>`;
  function vowelChart() {
    const P = { i: [26, 30], "ɪ": [64, 62], e: [76, 100], "ɛ": [96, 144], "æ": [118, 192], a: [130, 222], "ɐ": [196, 222], "ɑ": [306, 222], "ɒ": [306, 196], "ɔ": [298, 140], o: [300, 90], "ʊ": [258, 62], u: [304, 30], "ʉ": [168, 30], "ə": [184, 128] };
    const trap = ink(wline(20, 20, 312, 20, 3) + wline(312, 20, 312, 230, 4).replace("M", "L") + wline(312, 230, 126, 230, 5).replace("M", "L") + wline(126, 230, 20, 20, 6).replace("M", "L"), "k");
    const grid = ink(wline(70, 90, 312, 90, 7, 1) + wline(98, 160, 312, 160, 8, 1) + wline(166, 20, 220, 230, 9, 1), "k thin");
    const sy = Object.entries(P).map(([s, [x, y]]) => `<text x="${x}" y="${y}" class="ipa">${s}</text>`).join("");
    const mv = [["ɑ", "e", "PRICE", "oi, moi, loik", "#c8312a", 210, 178], ["ə", "ʉ", "GOAT", "claurzed, maurment", "#22379b", 200, 94], ["æ", "ɪ", "FACE", "", "#22379b", 0, 0]];
    let arrows = "", tags = "";
    mv.forEach(([a, b, name, ex, col], j) => { const [x1, y1] = P[a], [x2, y2] = P[b]; arrows += `<path class="ink" pathLength="1" style="stroke:${col}" d="${arrow(x1 + 4, y1 - 8, x2 + 6, y2 - 4, j % 2 ? .25 : -.2, j + 30, 8)}"/>`; });
    tags = `<text x="236" y="252" class="ann" fill="#c8312a">PRICE: oi</text><text x="186" y="70" class="ann" fill="#22379b">GOAT: au</text><text x="36" y="252" class="ann" fill="#22379b">FACE</text>`;
    return `<svg class="nb-vc" viewBox="0 0 340 270">${grid}${trap}${sy}${arrows}${tags}<circle cx="196" cy="214" r="13" class="mk"/></svg>`;
  }
  function graph() {
    const N = CUM.length, X0 = 34, X1 = 384, Y0 = 380, Y1 = 120, x = i => X0 + (X1 - X0) * i / (N - 1), y = c => Y0 - (Y0 - Y1) * c / 45e6, r = R(9);
    const d = CUM.map((c, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${(y(c) + (r() - .5) * 1.2).toFixed(1)}`).join("");
    const ann = [[13, "1M, six days in", 14, -62], [38, "22 jul: 2.9M in one day", 26, 46], [57, "30M by 10 aug", -150, -36], [N - 1, "43.1M", -50, -30]];
    const months = [[0, "jun"], [17, "jul"], [48, "aug"], [79, "sep"], [109, "oct"]];
    return `<svg class="nb-graph" viewBox="0 0 420 560">
      ${ink(wline(X0, Y0, X1 + 8, Y0, 11), "k")}${ink(wline(X0, Y0, X0, Y1 - 20, 12), "k")}
      ${months.map(([i, m]) => `<text x="${x(i) + 2}" y="${Y0 + 22}" class="ax">${m}</text>`).join("")}
      ${[10, 20, 30, 40].map(m => `<text x="${X0 - 30}" y="${y(m * 1e6) + 5}" class="ax">${m}M</text>`).join("")}
      <path class="ink area" d="${d}L${X1} ${Y0}L${X0} ${Y0}Z"/>
      ${ink(d, "gl")}
      ${ann.map(([i, t, dx, dy], j) => { const ax = x(i), ay = y(CUM[i]); const tx = ax + dx, ty = ay + dy, sx = dx > 0 ? tx - 4 : tx + 40, sy = dy > 0 ? ty - 16 : ty + 4, ex = ax + (dx > 0 ? 6 : -6) * .7, ey = ay + (dy > 0 ? 8 : -8); return ink(ell(ax, ay, 8, 7, j + 40), "rd") + `<text x="${tx}" y="${ty}" class="an">${t}</text>` + ink(arrow(sx, sy, ex, ey, j % 2 ? .3 : -.3, j + 50, 7), "rd"); }).join("")}
    </svg>`;
  }
  const SCRIPT_PG = (k, notes) => { const s = SCRIPTS[k]; return `<h4 class="nb-h">"${s.t.toLowerCase()}"</h4>${s.l.slice(0, 4).map(([en, ac], j) => `<p class="nb-en">${en}</p><p class="nb-ac">${notes ? notes(ac, j) : ac}</p>`).join("")}`; };
  const mark = (t, w, cls = "hl") => `<mark class="${cls}">${t}</mark>`;
  const PAGES = () => [
    // spread 0: inside cover + title page
    [pg("cover-in", `<div class="nb-plate"><b>${C.nb.property}</b><span>${C.nb.owner}</span><i>${C.nb.ifFound}</i></div>`),
     pg("lined title", `<p class="nb-t1">${C.nb.title}</p><p class="nb-t2">${C.nb.subtitle}</p>${hw(C.nb.started, 70, 300, "font-size:22px")}
       <svg class="nb-doodle" viewBox="0 0 120 80" style="left:250px;top:390px;width:120px"><path class="ink" pathLength="1" d="M10 60c10-30 30-48 52-40s16 40 40 30M86 42l16 8-12 12" /></svg>${hw(C.nb.dontRead, 200, 470, "font-size:18px;color:#c8312a;transform:rotate(-6deg)")}`)],
    // spread 1: how a post is made
    [pg("lined", `<h4 class="nb-h">${C.nb.methodTitle}</h4>
       <div class="nb-flow">${C.nb.method.map((m, j) => `<div class="st" style="--d:${j}"><b>${j + 1}</b><span>${m}</span></div>`).join(`<svg viewBox="0 0 30 26" class="dn"><path class="ink" pathLength="1" d="M15 2c-2 8 2 14 0 22M8 16l7 8 7-8"/></svg>`)}</div>`),
     pg("lined", `<h4 class="nb-h">${C.nb.rulesTitle}</h4><ul class="nb-ul">${C.nb.rules.map(r => `<li>${r}</li>`).join("")}</ul>
       <figure class="nb-photo" style="left:214px;top:300px;transform:rotate(4deg)"><img src="media/tk/s-aussie-0.webp" alt="The cover of the Australian post"></figure>${tape(236, 290, 70, -8)}
       ${hw(C.nb.coverNote, 44, 360, "font-size:19px;width:160px")}<svg class="nb-abs" viewBox="0 0 80 40" style="left:150px;top:420px;width:80px">${ink(arrow(4, 8, 66, 24, -.3, 61))}</svg>`)],
    // spread 2: australian
    [pg("lined", `<p class="nb-tab" style="--c:#f1d64e">australian</p>${SCRIPT_PG("australian", (ac, j) => ac.replace(/\boi\b/g, mark("oi")).replace("tha", mark("tha", 0, "ul")).replace("heedressa", mark("heedressa", 0, "ul")).replace("liddle", mark("liddle", 0, "cr")).replace("claurzed", mark("claurzed")).replace("maurment", mark("maurment")))}
       ${hw(C.nb.aus.notes[0], 236, 470, "color:#c8312a;font-size:18px;width:170px;transform:rotate(-3deg)")}`),
     pg("grid", `<h4 class="nb-h">${C.nb.aus.chart}</h4>${vowelChart()}<ul class="nb-ul sm" style="top:360px">${C.nb.aus.list.map(r => `<li>${r}</li>`).join("")}</ul>`)],
    // spread 3: east texan
    [pg("lined", `<p class="nb-tab" style="--c:#f3a7c7">east texan</p><h4 class="nb-h">${C.nb.tex.title}</h4>
       <ol class="nb-ol">${C.nb.tex.list.map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join("")}</ol>`),
     pg("lined", `${SCRIPT_PG("east-texan", ac => ac.replace(/\bah\b/g, mark("ah")).replace(/\bmah\b/, mark("mah")).replace("tin", mark("tin", 0, "ul")).replace("wint", mark("wint", 0, "ul")).replace("daown", mark("daown", 0, "cr")).replace("awf", mark("awf")))}
       <figure class="nb-photo" style="left:226px;top:380px;width:150px;transform:rotate(-5deg)"><img src="media/tk/pines.webp" alt="Piney woods in East Texas"></figure>${tape(270, 370, 60, 6)}
       ${hw(C.nb.tex.pines, 30, 420, "font-size:18px;width:190px;color:#c8312a")}`)],
    // spread 4: jamaican
    [pg("lined", `<p class="nb-tab" style="--c:#63c57d">jamaican</p><h4 class="nb-h">${C.nb.jam.title}</h4>
       <ol class="nb-ol">${C.nb.jam.list.map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join("")}</ol>${hw(C.nb.jam.notPatois, 200, 470, "font-size:22px;color:#c8312a;transform:rotate(-5deg)")}`),
     pg("lined", `${SCRIPT_PG("jamaican", ac => ac.replace(/\bdi\b/g, mark("di")).replace("tree", mark("tree", 0, "ul")).replace("dem", mark("dem")).replace("an-sa", mark("an-sa", 0, "cr")).replace("madda", mark("madda", 0, "cr")))}
       <figure class="nb-photo" style="left:236px;top:370px;width:140px;transform:rotate(5deg)"><img src="media/tk/bowl.webp" alt="A bowl a viewer painted with the Jamaican cover"></figure>${tape(270, 360, 60, -5)}
       ${hw(C.nb.jam.bowl, 30, 420, "font-size:18px;width:190px")}`)],
    // spread 5: art research
    [pg("lined", `<h4 class="nb-h">${C.nb.art.title}</h4><ul class="nb-ul">${C.nb.art.rules.map(r => `<li>${r}</li>`).join("")}</ul>
       <div class="nb-stamps" style="top:330px">${["jamaican", "nigerian", "french"].map((s, j) => `<span style="transform:rotate(${[-6, 4, -2][j]}deg)"><img src="media/desk/st-${s}.webp" alt=""><em>${s}</em></span>`).join("")}</div>`),
     pg("lined", `<div class="nb-stamps" style="top:40px">${["east-texan", "hong-kong", "irish-cork", "kiwi", "new-york", "singaporean"].map((s, j) => `<span style="transform:rotate(${[3, -4, 5, -3, 2, -5][j]}deg)"><img src="media/desk/st-${s}.webp" alt=""><em>${s.replace("-", " ")}</em></span>`).join("")}</div>
       ${hw(C.nb.art.note, 40, 430, "font-size:19px;width:340px")}`)],
    // spread 6: references
    [pg("lined", `<h4 class="nb-h">${C.nb.refs.title}</h4>${C.nb.refs.why ? hw(C.nb.refs.why, 40, 92, "font-size:18px;width:330px") : ""}
       <div class="nb-cards">${VIDS.map((v, j) => `<a class="nb-card" href="${v.u}" target="_blank" rel="noopener" style="transform:rotate(${[-2, 1.5, -1][j]}deg)"><i class="play"></i><b>${v.t}</b><span>${v.ch}</span></a>`).join("")}</div>`),
     pg("lined", `<h4 class="nb-h">${C.nb.refs.title2}</h4><ul class="nb-ul">${C.nb.refs.notes.map(r => `<li>${r}</li>`).join("")}</ul>${hw(C.nb.refs.ps, 60, 440, "font-size:19px;color:#c8312a;width:300px")}`)],
    // spread 7: the graph + numbers
    [pg("grid", `<h4 class="nb-h">${C.nb.graphTitle}</h4>${graph()}${hw(C.nb.graphNote, 40, 470, "font-size:18px;width:330px")}`),
     pg("lined", `<h4 class="nb-h">${C.nb.numbersTitle}</h4><div class="nb-stats">${STATS.map(([n, l], j) => `<div><b>${n}</b><span>${l}</span>${j === 2 ? `<svg viewBox="0 0 140 70">${ink(ell(70, 35, 66, 28, 77, 1.16), "rd")}</svg>` : ""}</div>`).join("")}</div>
       ${hw(C.nb.shareNote, 200, 340, "color:#c8312a;font-size:20px;transform:rotate(-4deg)")}${hw(C.nb.audience, 40, 410, "font-size:19px;width:340px")}`)],
    // spread 8: what people said + inside back cover
    [pg("lined", `<h4 class="nb-h">${C.nb.saidTitle}</h4>${[COM[0].items[2], COM[1].items[0], COM[2].items[0]].map((c, j) => `<blockquote class="nb-q" style="transform:rotate(${[-1.5, 1, -.8][j]}deg)">${c.q}<cite>${c.by}</cite></blockquote>`).join("")}`),
     pg("cover-in back", `<div class="nb-pocket"><span>${C.nb.thanks}</span></div>`)]
  ];
  let spread = 0, turning = false, pages = [], single = false;
  function bookHTML() {
    single = innerWidth < 760;
    pages = single ? PAGES().flat().map(p => ["", p]) : PAGES();
    return `<div class="nb-wrap${single ? " single" : ""}"><div class="nb-book"><div class="nb-l"></div><div class="nb-r"></div><div class="nb-spine"></div></div>
      <div class="nb-ctl"><button class="nb-p" type="button" aria-label="Previous page"><svg viewBox="0 0 16 10"><path d="M15 5H2M6 1L2 5l4 4"/></svg></button><span class="nb-n"></span><button class="nb-nx" type="button" aria-label="Next page"><svg viewBox="0 0 16 10"><path d="M1 5h13M10 1l4 4-4 4"/></svg></button></div></div>`;
  }
  function showSpread(i) {
    spread = Math.max(0, Math.min(pages.length - 1, i));
    const b = $(".nb-book", ibox); if (!b) return;
    $(".nb-l", b).innerHTML = pages[spread][0]; $(".nb-r", b).innerHTML = pages[spread][1];
    $(".nb-n", ibox).textContent = `${spread + 1} / ${pages.length}`;
    $(".nb-p", ibox).disabled = spread === 0; $(".nb-nx", ibox).disabled = spread === pages.length - 1;
    requestAnimationFrame(() => $$(".pg", b).forEach(p => p.classList.add("in")));
  }
  function turn(d) {
    const n = spread + d; if (turning || n < 0 || n >= pages.length) return;
    const b = $(".nb-book", ibox); if (!b) return;
    if (calm || (single && d < 0)) return showSpread(n);
    turning = true;
    const leaf = document.createElement("div"); leaf.className = "nb-leaf " + (d > 0 ? "fwd" : "bwd");
    leaf.innerHTML = `<div class="f">${d > 0 ? pages[spread][1] : pages[spread][0]}</div><div class="bk">${single ? '<div class="pg blank"></div>' : d > 0 ? pages[n][0] : pages[n][1]}</div>`;
    $$(".pg", leaf).forEach(p => p.classList.add("in", "now"));
    // under the leaf: the page that will be revealed
    if (d > 0) $(".nb-r", b).innerHTML = pages[n][1]; else $(".nb-l", b).innerHTML = pages[n][0];
    $$(".pg", b).forEach(p => p.classList.add("in", "now"));
    b.appendChild(leaf); leaf.offsetWidth; leaf.classList.add("go");
    setTimeout(() => { leaf.remove(); turning = false; showSpread(n); }, 900);
  }
  function fitBook() {
    const w = $(".nb-wrap", ibox); if (!w) return;
    const s = single ? Math.min((innerWidth - 20) / 440, (innerHeight - 140) / 580, 1.25) : Math.min((innerWidth - 32) / 860, (innerHeight - 150) / 580, 1.25);
    w.style.setProperty("--s", s.toFixed(3));
  }

  /* ================= 2. the accent machine ================= */
  let typing = 0;
  async function press(i) {
    const a = ACC[i], dev = $(".sy.big", ibox); if (!dev) return;
    const key = $(`.sy-k[data-a="${i}"]`, dev); key.classList.remove("down"); key.offsetWidth; key.classList.add("down"); setTimeout(() => key.classList.remove("down"), 220);
    $$(".sy-k", dev).forEach(k => k.classList.toggle("on", k === key));
    const run = ++typing, scr = $(".sy-scr", dev), img = $(".sy-img", scr), txt = $(".sy-txt", scr);
    scr.classList.add("live"); scr.classList.remove("flash"); scr.offsetWidth; scr.classList.add("flash");
    img.style.backgroundImage = `url(${a.img})`; img.style.backgroundPosition = a.pos || "50% 35%";
    $(".sy-hud b", scr).textContent = a.name; $(".sy-hud i", scr).textContent = a.v ? a.v + " " + C.viewsWord : "";
    txt.innerHTML = ""; const s = SCRIPTS[a.k]; if (!s) return;
    txt.innerHTML = `<b>"${s.t.toLowerCase()}"</b>`;
    for (const [, ac] of s.l.slice(0, 3)) {
      const p = document.createElement("p"); txt.appendChild(p); const ps = txt.querySelectorAll("p"); if (ps.length > 2) ps[0].remove();
      for (let j = 1; j <= ac.length; j++) { if (run !== typing || openK !== "synth") return; p.textContent = "(" + ac.slice(0, j) + (j === ac.length ? ")" : ""); await wait(calm ? 0 : 30); }
      await wait(280);
    }
  }

  /* ================= 3. matchboxes ================= */
  function playFilm(i) {
    const f = FILMS[i], pl = $(".dk-player", root); if (!pl) return;
    $$(".mbx", ibox).forEach((m, j) => m.classList.toggle("open", j === i));
    setTimeout(() => {
      if (openK !== "matches") return;
      pl.hidden = false; pl.innerHTML = `<div class="pv"><video src="${f.src}" controls autoplay playsinline></video><p><b>${f.name}</b><span>${f.sub}</span></p><button class="pl-x" type="button" aria-label="Close the film"></button></div>`;
      $(".pl-x", pl).addEventListener("click", e => { e.stopPropagation(); closePlayer(); });
      pl.addEventListener("click", e => { if (e.target === pl) closePlayer(); });
    }, calm ? 0 : 520);
  }
  function closePlayer() {
    const pl = $(".dk-player", root); if (!pl || pl.hidden) return;
    $$("video", pl).forEach(v => v.pause()); pl.hidden = true; pl.innerHTML = ""; $$(".mbx", ibox).forEach(m => m.classList.remove("open"));
  }

  /* ================= 4. thank-you bags full of comments ================= */
  let slips = [];
  function torn(seed) { const r = R(seed); let t = [], b = []; for (let i = 0; i <= 12; i++) { t.push(`${(i / 12 * 100).toFixed(1)}% ${(r() * 4).toFixed(1)}px`); b.push(`${(100 - i / 12 * 100).toFixed(1)}% calc(100% - ${(r() * 5).toFixed(1)}px)`); } return `polygon(${t.join(",")},${b.join(",")})`; }
  function spill(gi) {
    const box = $(".bg-slips", ibox), bags = $$(".bg", ibox); if (!box) return;
    bags.forEach((b, j) => b.classList.toggle("on", j === gi));
    slips.forEach(s => { s.classList.add("back"); setTimeout(() => s.remove(), 420); }); slips = [];
    const g = COM[gi], W = box.clientWidth, H = box.clientHeight, src = bags[gi].getBoundingClientRect(), br = box.getBoundingClientRect();
    const n = g.items.length, cols = W > 700 ? 3 : 1;
    g.items.forEach((c, j) => {
      const el = document.createElement("div"); el.className = "slip" + (c.big ? " big" : "");
      el.innerHTML = `<div class="pap" style="clip-path:${torn(gi * 10 + j + 3)}"><q>${c.q}</q>${c.pic ? `<img src="${c.pic}" alt="" draggable="false">` : ""}<span>${c.by}</span></div>`;
      box.appendChild(el);
      const w = Math.min(W - 20, cols === 1 ? W - 30 : W / 3.4), col = cols === 1 ? 0 : j % 3, row = cols === 1 ? j : Math.floor(j / 3);
      const tx = cols === 1 ? 10 + (j % 2) * 10 : 20 + col * (W - 40 - w) / 2 + (row ? (W - 40 - w) / 4 : 0), ty = cols === 1 ? j * Math.min(110, (H - 160) / (n - 1)) : row * (H * .48) + (col % 2 ? 26 : 0), rot = (R(j + gi * 7)() - .5) * 9;
      el.style.width = w + "px";
      const sx = src.left + src.width / 2 - br.left - w / 2, sy = src.top + src.height * .3 - br.top;
      el.animate([{ transform: `translate(${sx}px,${sy}px) rotate(${rot * 3}deg) scale(.2)`, opacity: 0 }, { transform: `translate(${tx}px,${ty}px) rotate(${rot}deg) scale(1)`, opacity: 1 }],
        { duration: calm ? 1 : 760, delay: calm ? 0 : j * 90, easing: "cubic-bezier(.2,1.2,.3,1)", fill: "backwards" });
      el.style.transform = `translate(${tx}px,${ty}px) rotate(${rot}deg)`; el._x = tx; el._y = ty; el._r = rot;
      drag(el); slips.push(el);
    });
    $(".bg-h", ibox).textContent = g.h;
  }
  let zTop = 10;
  function drag(el) {
    let st = null;
    el.addEventListener("pointerdown", e => { st = { x: e.clientX - el._x, y: e.clientY - el._y }; el.setPointerCapture(e.pointerId); el.style.zIndex = ++zTop; el.classList.add("drag"); });
    el.addEventListener("pointermove", e => { if (!st) return; el._x = e.clientX - st.x; el._y = e.clientY - st.y; el.style.transform = `translate(${el._x}px,${el._y}px) rotate(${el._r * .4}deg) scale(1.03)`; });
    const end = () => { if (!st) return; st = null; el.classList.remove("drag"); el.style.transform = `translate(${el._x}px,${el._y}px) rotate(${el._r}deg)`; };
    el.addEventListener("pointerup", end); el.addEventListener("pointercancel", end);
  }

  /* ================= 6. letters ================= */
  function openLetter(i) { $$(".lt", ibox).forEach((l, j) => l.classList.toggle("open", j === i)); }

  /* ================= what each object opens into ================= */
  const close = `<button class="dk-close" type="button" aria-label="${C.back}"></button>`;
  const BUILD = {
    notebook: () => bookHTML(),
    synth: () => `<div class="sy-wrap">${synthBody(true)}<p class="dk-cap">${C.synthCap}</p></div>`,
    matches: () => `<div class="mx-wrap"><div class="mx-row">${FILMS.map((f, i) => `<button class="mbx" type="button" data-i="${i}" style="--b:${f.box};--i:${f.ink};--l:${f.lab};--d:${i}" aria-label="Play ${f.name}">
        <span class="tray"><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="lid"><span class="lab"><b>${f.name.replace(" × ", "<br>× ")}</b><small>${f.sub}</small></span><span class="strk"></span></span></button>`).join("")}</div>
        <p class="dk-cap">${C.matchCap}</p></div>`,
    bags: () => `<div class="bg-wrap"><div class="bg-row">${COM.map((g, i) => `<button class="bg" type="button" data-g="${i}" aria-label="${g.h}"><img src="media/desk/bag-${g.bag}.webp" alt="" draggable="false"><span>${g.h}</span></button>`).join("")}</div>
        <p class="bg-h hw-line">${C.bagCap}</p><div class="bg-slips"></div><p class="dk-cap sm">${C.bagNote}</p></div>`,
    receipt: () => `<div class="rc-wrap"><div class="rc-slot"></div><div class="rc"><div class="rc-in">
        <b class="rc-hd">THE ACCENT TREND</b><p class="rc-sub">${C.receipt.sub}</p><p class="rc-dt"><span>21 JUN 2026</span><span>18 OCT 2026</span></p><hr>
        ${ACC.filter(a => a.v).map(a => `<p class="rc-ln"><span>${a.name} accent</span><span>${a.v}</span></p>`).join("")}<hr>
        ${STATS.map(([n, l]) => `<p class="rc-ln"><span>${l}</span><span>${n}</span></p>`).join("")}<hr>
        <p class="rc-ln tot"><span>TOTAL VIEWS</span><span>43.1M</span></p><p class="rc-ln"><span>1 share every</span><span>77 views</span></p><hr>
        <p class="rc-ft">${C.receipt.foot}</p><svg class="rc-bc" viewBox="0 0 200 40" preserveAspectRatio="none">${Array.from({ length: 46 }, (_, j) => `<rect x="${j * 4.3}" y="0" width="${[1, 2, 1, 3, 1, 2][j % 6]}" height="40"/>`).join("")}</svg></div></div></div>`,
    letters: () => `<div class="lt-wrap">${C.letters.map((l, i) => `<div class="lt" data-i="${i}" style="--d:${i}"><button class="lt-env" type="button" aria-label="Open the letter from ${l.from}"><i class="fl"></i><span class="to">to: aditi</span><span class="stp">${l.from.slice(0, 1)}</span></button>
        <div class="lt-paper"><p class="lt-from">${l.from}</p><p class="lt-date">${l.date}</p><h5>${l.head}</h5><p class="lt-body">${l.body}</p></div></div>`).join("")}<p class="dk-cap">${C.lettersCap}</p></div>`,
    passport: () => `<div class="pp-wrap"><div class="pp-book"><div class="pp-pg l"><p class="pp-k">PASSPORT</p><div class="pp-ph"><span>?</span></div>
        <dl>${C.passport.fields.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("")}</dl><p class="pp-mrz">P&lt;AUDIENCE&lt;&lt;OF&lt;&lt;ADITI&lt;ANUPAM&lt;&lt;&lt;&lt;&lt;&lt;</p></div>
        <div class="pp-pg r"><p class="pp-k">${C.passport.visas}</p><div class="pp-stamps">${COUNTRIES.map(([c, p], j) => { const r = R(j + 3), shape = ["c", "r", "o", "c", "r"][j % 5], col = ["#22379b", "#c8312a", "#1f6f50", "#6a2a8a", "#b0561a"][j % 5];
          return `<span class="ps ${shape}" style="--c:${col};--r:${((r() - .5) * 24).toFixed(1)}deg;--d:${j}"><b>${c}</b><i>${p}%</i><small>${C.passport.stampWord}</small></span>`; }).join("")}</div></div></div>
        <p class="dk-cap">${C.passport.cap}</p></div>`,
    stamps: () => `<div class="sh-wrap"><div class="sh-sheet">${STAMPS.map(s => { const a = ACC.find(x => x.k === s); return `<button class="sh-st" type="button"><span class="im" style="background-image:url(media/desk/st-${s}.webp)"></span><span class="ht" style="background-image:url(media/desk/sh-${s}.webp)"></span><span class="nm">${s.replace("-", " ")}${a && a.v ? `<b>${a.v}</b>` : ""}</span></button>`; }).join("")}</div><p class="dk-cap">${C.stampsCap}</p></div>`
  };
  const INIT = {
    notebook: box => {
      showSpread(0); fitBook(); addEventListener("resize", fitBook); cleanup.push(() => removeEventListener("resize", fitBook));
      $(".nb-p", box).addEventListener("click", () => turn(-1)); $(".nb-nx", box).addEventListener("click", () => turn(1));
      $(".nb-book", box).addEventListener("click", e => { if (e.target.closest("a")) return; const r = $(".nb-book", box).getBoundingClientRect(); turn(e.clientX > r.left + r.width / 2 ? 1 : -1); });
      let sx = null; $(".nb-book", box).addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
      $(".nb-book", box).addEventListener("touchend", e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) turn(dx < 0 ? 1 : -1); sx = null; });
    },
    synth: box => { $$(".sy-k", box).forEach(k => k.addEventListener("click", () => press(+k.dataset.a))); cleanup.push(() => typing++); setTimeout(() => openK === "synth" && press(0), 700); },
    matches: box => $$(".mbx", box).forEach(m => m.addEventListener("click", () => playFilm(+m.dataset.i))),
    bags: box => { $$(".bg", box).forEach(b => b.addEventListener("click", () => spill(+b.dataset.g))); setTimeout(() => openK === "bags" && spill(0), 500); },
    receipt: box => { const rc = $(".rc", box); rc.style.setProperty("--h", $(".rc-in", box).offsetHeight + "px"); requestAnimationFrame(() => rc.classList.add("print")); },
    letters: box => { $$(".lt-env", box).forEach((b, i) => b.addEventListener("click", () => openLetter(i))); setTimeout(() => openK === "letters" && openLetter(0), 500); },
    passport: box => setTimeout(() => { const b = $(".pp-book", box); if (b) b.classList.add("in"); }, 100),
    stamps: () => {}
  };

  /* ================= router hooks ================= */
  window.DESK = {
    active(on) {
      if (on && !active) { active = true; if (!built) place(); fit(); Object.assign(camNow, camTo, { s: camTo.s * .82, ax: camTo.ax + 14 }); last = 0; requestAnimationFrame(tick); root.classList.add("show"); }
      if (!on && active) { active = false; shut(true); root.classList.remove("show"); }
    },
    inspect(k) { if (!active) return; setTimeout(() => inspect(k), 350); }
  };
  addEventListener("resize", () => { if (!active) return; const was = portrait; portrait = innerWidth < innerHeight * .9 && innerWidth < 900; if (was !== portrait) place(); fit(); if (focus) aim(focus); });
})();
