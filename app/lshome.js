/* Home, after the Longshot Features front page: one long black strip of animations that moves right as you
   scroll down. The animations sit in the same order Longshot uses, at Longshot's sizes (measured on their
   page, where the strip is 717 units tall: 1u here = 1% of the screen's height). Point at one and it sinks
   under the pointer and says where it goes; click it to open that page. The strip ends with a letter. */
(() => {
  const C = window.COPY.ls, H = C.home, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const fig = window.LS.fig;
  const AR = Object.assign({ stars: 4.056, gate: 1.62, launch: 1.71, a24: 1.86, club: .683, lens: 1.113, house: .562 }, window.LS.AR);
  const LAB = Object.assign({}, H.scenes, H.scenesExtra, {
    reel: ["Films on the timeline", "Five films, side by side", "The same films, laid out like a record."],
    press: ["What they're saying", "Comments, press and messages", "A page waiting for your best reviews."],
    next: ["Your next project", "A page saved for later", "The same layout, ready for whatever comes next."],
    world: ["Coming soon", "Illustrating the world", "Sketches and paintings."],
    projects: ["Coming soon", "Personal projects", "Websites and things I make for myself."]
  });
  /* the strip, left to right: [animation, left (u from the end of the first screen), height (u), where it goes, options]
     options: top (u from the top; otherwise it stands on the floor), z (stacking), d (parallax), lab ("top" puts the label inside) */
  const STRIP = [
    ["lizard", 4, 55, "accents"],
    ["marquee", 34, 66, "films", { top: 0, z: 0 }],
    ["bridge", 112, 62, "films", { top: 20, z: 0, d: .05, blend: 1 }],
    ["skeletons", 128, 48.5, "music", { z: 2 }],
    ["camera", 232, 61, "motion"],
    ["singer", 300, 34, "accents", { top: 22 }],
    ["house", 362, 86, "info", { z: 0, blend: 1 }],
    ["portrait", 398, 60, "music", { z: 2 }],
    ["barber", 474, 54, "info"],
    ["puppet", 590, 71, "motion"],
    ["cinema", 640, 81, "films", { blend: 1 }],
    ["stars", 722, 22, null, { top: 3, z: 0, blend: 1, d: .08 }],
    ["lens", 724, 70, "accents", { blend: 1 }],
    ["launch", 810, 75, "world", { blend: 1 }],
    ["stars", 866, 19, null, { top: 2, z: 0, blend: 1, d: .1 }],
    ["club", 940, 74, "music", { blend: 1 }],
    ["gorilla", 996, 82, "projects"],
    ["jars", 1052, 42, "accents"],
    ["tvs", 1138, 64, "films"],
    ["gate", 1192, 72, "accents", { blend: 1 }],
    ["cowgirl", 1320, 69, "motion"],
    ["a24", 1480, 41, "films"]
  ];
  const END = 1562;   // where the last screen (the letter) begins
  const item = ([g, x, h, go, o = {}]) => {
    const pos = `left:calc(100vw + ${x} * var(--u));height:calc(${h} * var(--u));${o.top != null ? `top:calc(${o.top} * var(--u))` : "bottom:0"};z-index:${o.z != null ? o.z : 1}`;
    const cls = `lh-f${o.blend ? " blend" : ""}${o.top != null ? " fl" : ""}`;
    if (!go) return `<span class="${cls}" style="${pos}" data-d="${o.d || 0}" aria-hidden="true">${fig(g)}</span>`;
    const [kick, title] = LAB[go];
    return `<a class="${cls}" style="${pos}" data-d="${o.d || 0}" href="#${go}" data-ls="${go}" aria-label="${title}">${fig(g)}<span class="lh-tag"><b>${kick}</b><span>${title}</span></span></a>`;
  };

  const root = document.createElement("section"); root.className = "ls-home"; root.setAttribute("aria-label", "Home");
  root.innerHTML = `
  <div class="lh-stage">
    <div class="lh-track" style="width:calc(100vw + ${END} * var(--u) + max(100vw, 80 * var(--u) + 560px))">
      <p class="lh-hint"><span>&lt;${H.hint[0]}&gt;</span><span>${H.hint[1]}</span></p>
      <h1 class="lh-word" aria-label="${H.word}">${[..."ADITI ANUPAM"].map((c, i) => c === " " ? `<i class="sp"> </i>` : `<i style="--i:${i}">${c}</i>`).join("")}</h1>
      <p class="lh-role">${H.role}</p>
      <span class="lh-hero">${fig("smoker")}</span>
      ${STRIP.map(item).join("")}
      <div class="lh-end" style="left:calc(100vw + ${END} * var(--u))">
        <a class="lh-endf" href="#info" data-ls="info" aria-label="${LAB.info[1]}">${fig("toilet")}</a>
        <div class="lh-letter">
          ${H.letter.map(p => `<p>${p}</p>`).join("")}
          <p class="sig">${H.sign.join("<br>")}</p>
          <p class="lh-endb"><button type="button" class="ls-btn" data-menu>${H.end[1]}</button><button type="button" class="ls-btn" data-start>${H.end[2]}</button></p>
        </div>
      </div>
    </div>
  </div>
  <div class="lh-run" aria-hidden="true"></div>`;
  document.body.appendChild(root);

  const track = $(".lh-track", root), run = $(".lh-run", root), word = $(".lh-word", root);
  const deep = $$("[data-d]", root).filter(el => +el.dataset.d).map(el => ({ el, d: +el.dataset.d }));
  let X = 0, XT = 0, on = false;

  // the name sits in the middle of the first screen, a little narrower than the screen, behind the lady
  function fitWord() {
    word.style.fontSize = "100px";
    const w = word.scrollWidth, vw = innerWidth;
    word.style.fontSize = (100 * vw * (vw < 760 ? .9 : .7) / Math.max(1, w)).toFixed(2) + "px";
    const role = $(".lh-role", root); role.style.top = (word.offsetTop - 26) + "px";
  }
  function measure() {
    fitWord();
    const end = $(".lh-end", root), letter = $(".lh-letter", root);
    end.style.width = Math.max(innerWidth, letter.offsetLeft + letter.offsetWidth + innerWidth * .06) + "px";
    track.style.width = (end.offsetLeft + end.offsetWidth) + "px";
    const W = track.offsetWidth;
    run.style.height = Math.max(0, W - innerWidth) + "px"; // scrolling down this far moves the strip all the way
    XT = Math.min(root.scrollTop, Math.max(0, W - innerWidth));
  }
  addEventListener("resize", () => { if (on) measure(); });
  if (document.fonts) document.fonts.ready.then(() => on && measure());

  root.addEventListener("scroll", () => { XT = root.scrollTop; window.LS.touch(); }, { passive: true });
  root.addEventListener("wheel", e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { root.scrollTop += e.deltaX; e.preventDefault(); } }, { passive: false });
  addEventListener("keydown", e => {
    if (!on || document.documentElement.classList.contains("ls-menu-on")) return;
    if (e.key === "ArrowRight") { root.scrollBy({ top: innerWidth * .4, behavior: "smooth" }); e.preventDefault(); }
    if (e.key === "ArrowLeft") { root.scrollBy({ top: -innerWidth * .4, behavior: "smooth" }); e.preventDefault(); }
  });
  root.addEventListener("click", e => {
    if (e.target.closest("[data-menu]")) window.LS.menu(true);
    if (e.target.closest("[data-start]")) root.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
    const c = e.target.closest(".lh-letter [data-card]"); if (c) { e.preventDefault(); window.LS.card(c.dataset.card); }
  });

  (function loop() {
    requestAnimationFrame(loop);
    if (!on) return;
    X += (XT - X) * (calm ? 1 : .1); if (Math.abs(XT - X) < .1) X = XT;
    track.style.transform = `translate3d(${(-X).toFixed(2)}px,0,0)`;
    const vw = innerWidth;
    for (const f of deep) { const mid = f.el.offsetLeft + f.el.offsetWidth / 2 - X - vw / 2; f.el.style.translate = `${(-mid * f.d).toFixed(1)}px 0`; }
  })();

  window.PAGES = window.PAGES || {};
  window.PAGES.home = {
    root,
    active(v) {
      on = v; root.classList.toggle("on", v);
      if (v) { root.scrollTop = 0; X = XT = 0; measure(); window.FX.setPage("home", root, "home"); document.documentElement.classList.add("ls-dark"); document.documentElement.style.setProperty("--ls-ink", "#fff"); }
    },
    reveal() { root.classList.remove("play"); void root.offsetWidth; root.classList.add("play"); }
  };
})();
