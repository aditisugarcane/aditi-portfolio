/* Home: an editorial page after Longshot's "The Composer, the Madman and the Budapest Orchestra" and Atelier's
   "A Promise Broken": a split black and white title, cut-out drawings that fly apart as you scroll, a track list
   of films on black, the accent trend with a magnifier lens, motion experiments, and a way to say hello. */
(() => {
  const H = window.COPY.site.home, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const STILL = ["muji", "zoo", "pinterest", "brandy", "bluetooth"];
  const roman = ["I", "II", "III", "IV", "V"];
  const il = (n, cls, style, px = .1, rot = 0, alt = "") => `<div class="cut ${cls}" style="${style}"><img data-px="${px}" data-rot="${rot}" src="media/il/il-${String(n).padStart(2, "0")}.webp" alt="${alt}" loading="lazy" draggable="false"></div>`;
  const pts = (() => { // a smooth sparkline of total views, from the real daily numbers
    const v = [3,0,0,0,227,210,1551,28734,267287,282016,109472,60649,101261,314518,466741,372247,125496,86132,64541,71275,88836,55206,46658,43158,54701,97638,57869,32206,33433,28832,19622,20484,39170,28161,32172,89993,361018,2830178,2924769,1529326,1780375,2447848,2365167,2181636,1288151,1221590,1039277,1264787,1051852,918813,588868,519681,529073,496098,618384,444554,473056,447364,417479,303760,264129,189849,295571,272684,265686,301737,379928,953599,957375,558589,576136,296844,408303,474727,242596,172301,204492,344417,171615,136841,144238,138744,217207,177497,188636,221344,209148,459070,260433,203091,162123,131231,85890,96573,125869,88041,76818,77077,119139,66370,61596,63777,58875,54060,54588,54698,43516,40855,41766,43417,47776,54127,58027,51245,42115,41199,39469,41299,47174,44721,42025,35394,35281,33177,32159,28858,25708,19499,17740];
    let a = 0; const c = v.map(x => a += x); return c.map((y, i) => `${i ? "L" : "M"}${(i / (c.length - 1) * 600).toFixed(1)} ${(150 - y / 45e6 * 140).toFixed(1)}`).join("");
  })();

  const root = document.createElement("section"); root.className = "v-home"; root.setAttribute("aria-label", "Home");
  root.innerHTML = `
  <header class="h-hero">
    <div class="h-stick">
      <div class="h-black"></div>
      ${il(6, "h-c1", "", 0, 0)}${il(1, "h-c2", "", 0, 0)}${il(4, "h-c3", "", 0, 0)}${il(10, "h-c4", "", 0, 0)}
      <p class="h-kick xsc">${H.kicker}</p>
      <h1 class="h-title" aria-label="${H.title.join(" ")}"><span>${H.title[0]}</span><span>${H.title[1]}</span></h1>
      <p class="h-role"><em>${H.role}</em></p>
      <p class="h-scroll xsc"><span>${H.scroll}</span><i></i></p>
    </div>
  </header>

  <section class="h-films dark" id="films-sec">
    ${il(7, "h-fc", "", -.12, 4)}
    <div class="h-in">
      <p class="xsc" data-r>${H.filmsKicker}</p>
      <h2 class="disp" data-split data-r>${H.filmsTitle}</h2>
      <p class="h-note" data-r>${H.filmsNote}</p>
      <ol class="h-tracks">${H.films.map(([t, k, y], i) => `<li data-r style="--d:${i}"><a href="#films" data-film="${i}" data-hot><span class="xsc ft-s">${H.side[0]} <b>/</b> ${H.side[1]} ${roman[i]}.</span><span class="ft-t">${t.replace(" × ", ' <span class="xx">×</span> ')}</span><span class="ft-k">${k}, ${y}</span><i class="ft-a" aria-hidden="true"></i></a></li>`).join("")}</ol>
      <a class="pillbtn light" href="#films" data-go2="films" data-r>${H.allFilms}<svg viewBox="0 0 16 10" aria-hidden="true"><path d="M1 5h13M10 1l4 4-4 4"/></svg></a>
    </div>
    <figure class="h-peek" aria-hidden="true"><img alt=""></figure>
  </section>

  <section class="h-trend" id="trend-sec">
    ${il(3, "h-tc1", "", .14, -3)}${il(2, "h-tc2", "", -.1, 3)}
    <div class="h-in">
      <p class="xsc" data-r>${H.trendKicker}</p>
      <h2 class="disp" data-split data-r>${H.trendTitle}</h2>
      <div class="h-big" data-r><b>${H.trendBig}</b><span>${H.trendLine}</span></div>
      <svg class="h-spark" viewBox="0 0 600 160" preserveAspectRatio="none" aria-hidden="true" data-r><path d="${pts}"/></svg>
      <div class="h-lensline" data-r><p data-lens><span data-alt="(${H.trendAccent})">${H.trendPlain}</span></p></div>
      <p class="hintpill" data-r><i></i>${H.trendLensHint}</p>
      <a class="pillbtn" href="#accents" data-go2="accents" data-r>${H.trendCta}<svg viewBox="0 0 16 10" aria-hidden="true"><path d="M1 5h13M10 1l4 4-4 4"/></svg></a>
    </div>
  </section>

  <section class="h-motion dark" id="motion-sec">
    ${il(5, "h-mc", "", -.12, 3)}
    <div class="h-in">
      <p class="xsc" data-r>${H.motionKicker}</p>
      <h2 class="disp" data-split data-r>${H.motionTitle}</h2>
      <p class="h-note" data-r>${H.motionNote}</p>
      <div class="h-reel" data-r><video src="media/home/motion.mp4" poster="media/home/motion.jpg" muted loop playsinline preload="none"></video><span class="xsc">Experiment 01</span></div>
      <ul class="h-soon">${[2, 3, 4, 5, 6].map((n, i) => `<li data-r style="--d:${i}"><span class="xsc">Experiment 0${n}</span><em>${H.soon}</em></li>`).join("")}</ul>
    </div>
  </section>

  <section class="h-about" id="about">
    ${il(12, "h-ac1", "", .1, -2)}${il(16, "h-ac2", "", -.08, 2)}
    <div class="h-in">
      <p class="xsc" data-r>${H.aboutKicker}</p>
      <h2 class="disp" data-split data-r>${H.aboutTitle}</h2>
      <p class="h-bio" data-r>${H.about}</p>
      <ul class="h-links" data-r>${H.links.map(([k, v, u]) => `<li>${u ? `<a href="${u}" target="_blank" rel="noopener">` : "<div>"}<span class="xsc">${k}</span><span class="v">${v}</span>${u ? `<svg viewBox="0 0 16 10" aria-hidden="true"><path d="M1 5h13M10 1l4 4-4 4"/></svg></a>` : "</div>"}</li>`).join("")}</ul>
      <p class="h-city xsc" data-r>${H.city}</p>
    </div>
    <footer class="h-foot"><span>${H.credit}</span><button type="button" class="h-top">${H.top}<svg viewBox="0 0 10 16" aria-hidden="true"><path d="M5 15V2M1 6l4-4 4 4"/></svg></button></footer>
  </section>`;
  document.body.appendChild(root);

  /* the hero: the black half rises and the drawings fly apart as you scroll */
  const hero = $(".h-hero", root), black = $(".h-black", root), cuts = $$(".h-hero .cut", root), title = $(".h-title", root);
  const fly = [[-1.1, -.55, -24], [1.05, -.7, 18], [-1.0, -.8, 14], [1.1, .3, -20]];
  function heroTick() {
    const r = hero.getBoundingClientRect(), vh = root.clientHeight, p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh)));
    const e = calm ? p : p * p * (3 - 2 * p);
    black.style.transform = `translateY(${(50 - 50 * e).toFixed(2)}%)`;
    cuts.forEach((c, i) => { const [fx, fy, fr] = fly[i]; c.style.transform = `translate3d(${(fx * e * 45).toFixed(2)}vw,${(fy * e * 45).toFixed(2)}vh,0) rotate(${(fr * e).toFixed(2)}deg) scale(${(1 + e * .15).toFixed(3)})`; c.style.opacity = (1 - Math.max(0, e - .55) / .45).toFixed(3); });
    title.style.transform = `translateY(${(-e * 6).toFixed(2)}vh) scale(${(1 - e * .06).toFixed(3)})`;
    $(".h-scroll", root).style.opacity = (1 - p * 4).toFixed(2); $(".h-kick", root).style.opacity = (1 - p * 3).toFixed(2); $(".h-role", root).style.opacity = (1 - p * 2.2).toFixed(2);
  }
  root.addEventListener("scroll", () => requestAnimationFrame(heroTick), { passive: true });
  addEventListener("resize", heroTick);

  /* the film list: a still follows the pointer, a click puts the disc in */
  const peek = $(".h-peek", root), pimg = $("img", peek);
  let px = 0, py = 0, pxt = 0, pyt = 0, pOn = false;
  $(".h-tracks", root).addEventListener("pointermove", e => { pxt = e.clientX; pyt = e.clientY; const a = e.target.closest("[data-film]"); if (a) { const k = STILL[+a.dataset.film]; if (pimg.dataset.k !== k) { pimg.dataset.k = k; pimg.src = `media/cds/still-${k}.webp`; } if (!pOn) { px = pxt; py = pyt; } pOn = true; peek.classList.add("on"); } });
  $(".h-tracks", root).addEventListener("pointerleave", () => { pOn = false; peek.classList.remove("on"); });
  (function peekTick() { requestAnimationFrame(peekTick); if (!pOn && !peek.classList.contains("on")) return; px += (pxt - px) * .14; py += (pyt - py) * .14; peek.style.transform = `translate3d(${(px + 28).toFixed(1)}px,${(py - 90).toFixed(1)}px,0) rotate(${((pxt - px) * .05).toFixed(2)}deg)`; })();
  root.addEventListener("click", e => {
    const f = e.target.closest("[data-film]"); if (f) { e.preventDefault(); window.SITE.go("films"); setTimeout(() => window.CDS_PLAY && window.CDS_PLAY(+f.dataset.film), 380); return; }
    const g = e.target.closest("[data-go2]"); if (g) { e.preventDefault(); window.SITE.go(g.dataset.go2); return; }
    if (e.target.closest(".h-top")) root.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
  });

  /* the reel plays only while you can see it */
  const vid = $(".h-reel video", root);
  new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { vid.preload = "auto"; vid.play().catch(() => {}); } else vid.pause(); }), { root, threshold: .3 }).observe(vid);

  window.HOME2 = {
    active(on) { root.classList.toggle("on", on); if (on) { window.FX.setPage("home", root, "home"); heroTick(); } else vid.pause(); },
    root
  };
})();
