/* The other pages, all in the layout of Longshot's "The Composer, the Madman and the Budapest Orchestra":
   motion experiments, I love music (with the vinyl), and two pages saved for later. About lives in about.js. */
(() => {
  const LS = window.LS, H = window.COPY.site.home, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const pad = n => String(n).padStart(2, "0");
  const roman = ["I", "II", "III", "IV", "V", "VI"];
  const ph = t => `<span class="ph">${t}</span>`;   // placeholder text, styled so it's easy to spot and replace

  /* ---------------- motion experiments */
  LS.page({ key: "motion", fig: "camera", slug: "motion_experiments", kick: "Motion experiments", sub: "Mixing effects to create insane loops", side: "Short experiments in motion. New ones go up as they are made.",
    title: "Small loops, big stories", body: ["Experiment 01 is up. Five more are on the way."], hint: "tap the sound bars for sound",
    splash: [[4, "right:5vw;top:30vh", 5], [25, "left:4vw;top:52vh", -4]],
    cta: ["Say hello", "info"], prev: "music", next: "world", html: `
    <section class="ls-sec lp-tls" data-bg="#fff">${LS.lamp(3, "position:absolute;left:3vw;bottom:2vh;height:min(30vh,260px)")}<div class="ls-tl">
      ${LS.row(LS.node("Experiment 01", "LOOP // 01"), LS.vid("media/home/motion.mp4", "media/home/motion.jpg", "big"), `<p class="tl-big">My first experiment</p><p class="tl-p">I made this as an advertisement for my own startup (which I'll start someday). A marriage of whoosh sounds and exquisite photographs. Perhaps one day it'll find its way into the world, land in front of the right eyes and become something more than a daydream. Until then, here's a little taste of what's to come.</p>`)}
      ${[2, 3, 4, 5, 6].map((n, i) => LS.row(LS.node(`Experiment ${pad(n)}`, `LOOP // ${pad(n)}`), i % 2 ? "" : `<div class="lp-soon">${H.soon}</div>`, i % 2 ? `<div class="lp-soon">${H.soon}</div>` : "")).join("")}
      <i class="tl-end" aria-hidden="true"></i>
    </div></section>` });

  /* ---------------- music, on record (after Longshot's "Razor Sharp Delights": a stack of words, then sleeves
     rise over it, the records slide out of them and float away spinning, and a second set follows) */
  const WORDS = ["Retuned", "432 Hz", "528 Hz", "Human Nature", "in a gymnasium", "Restored", "−14 LUFS", "Black or White", "remixed", "Beat It", "fact-checked", "Mashups", "made in CapCut"];
  const SOUNDCLOUD = "https://on.soundcloud.com/76dnuVgOqo923UqmPr";   // her Black or White mix
  const ACCENTS = "https://www.tiktok.com/@thrillernightheehee/playlist/accents%20of%20the%20world!-7667473105862544148?is_from_webapp=1&sender_device=pc";
  const MIX = "media/audio/cold-shoulder.mp3";   // the one track on the player: her mix of Cold Shoulder, with added drums and echo
  const il = n => `media/il/il-${String(n).padStart(2, "0")}.webp`;
  // records Aditi loves, as real sleeves and real discs: the shine stays put while the record turns under it
  const REC = { inv: "Invincible, Michael Jackson", jb: "Papa Don't Take No Mess, James Brown", titk: "Bashed Out, This Is the Kit", bel: "Greatest Songs, Harry Belafonte", wir: "The Promise, When in Rome", bow: "Black or White, Michael Jackson" };
  const sleeve = (k, cls = "") => `<div class="vn-sleeve rec ${cls}"><img src="media/vn/${k}-sleeve.webp" alt="${REC[k]}" loading="lazy" draggable="false"></div>`;
  const vinyl = (k, cls = "") => `<div class="vn-vinyl rec ${cls}"><i class="vd" style="background-image:url(media/vn/${k}-disc.webp)"></i><i class="gl"></i></div>`;
  // the real loudness of the mix, in 64 slices, so the bars match the song
  const wave = [35, 34, 43, 61, 58, 60, 60, 64, 59, 56, 54, 59, 62, 69, 81, 92, 88, 86, 85, 83, 89, 91, 85, 85, 79, 61, 57, 62, 63, 67, 88, 91, 91, 92, 91, 93, 100, 99, 97, 96, 90, 57, 52, 52, 54, 54, 79, 85, 89, 86, 86, 90, 82, 90, 92, 87, 85, 64, 39, 36, 47, 36, 30, 18];
  const music = LS.page({ key: "music", fig: "portrait", slug: "i_love_music", kick: "I love music", sub: "Retunings, restorations and research", side: "I'm a huge Michael Jackson fan, I admire the dedication he had to perfect his art.",
    heroExtra: vinyl("bow", "vn-head"),
    title: "Ben at 432 Hz, and other experiments", body: ["I've retuned Michael Jackson's Ben to 432 Hz and 528 Hz, rebuilt Human Nature as if it were played in a school gymnasium, and restored old tracks so they all sit at −14 LUFS, the loudness streaming apps play at. I fact-check music history too, like how the Beat It video was made."],
    hint: "scroll and the records slide out", splash: [[17, "left:4vw;top:28vh", -5], [21, "right:4vw;top:48vh", 4]], cta: ["Say hello", "info"], prev: "films", next: "motion", html: `
    <section class="ls-sec vn-stack" data-bg="#fff">
      <div class="vn-stage">
        <div class="vn-words">${WORDS.map((w, i) => `<span${i === 1 ? ' class="u"' : ""}>${w}</span>`).join("")}</div>
        <div class="vn-set" data-k="a">${vinyl("inv", "slide l")}${sleeve("inv")}</div>
        <div class="vn-set" data-k="b">${vinyl("jb", "slide r")}${sleeve("jb")}</div>
        <div class="vn-set gate" data-k="c">${sleeve("titk", "tl")}${sleeve("bel", "tr")}${vinyl("titk", "pile p1")}${vinyl("bel", "pile p2")}</div>
        <div class="vn-loose" data-k="1">${vinyl("wir")}</div><div class="vn-loose" data-k="2">${vinyl("bow")}</div><div class="vn-loose" data-k="3">${vinyl("inv")}</div>
      </div>
    </section>
    <section class="ls-sec vn-player" data-bg="#fff">
      ${LS.splash(7, "right:3vw;top:3vh", 4)}
      <div class="vn-card" data-r>
        <div class="vn-now"><button type="button" class="vn-play" aria-label="Play Cold Shoulder, my mix"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M3 2l5 3-5 3z"/></svg></button><div><span>My mix of Drake and Don Toliver</span><b>Cold Shoulder</b></div></div>
        <div class="vn-wave" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0">${wave.map(h => `<i style="height:${h.toFixed(0)}%"></i>`).join("")}</div>
        <p class="vn-tm"><span>0:00</span><span>2:36</span></p>
        <audio preload="metadata" src="${MIX}"></audio>
        <p class="vn-why">The song felt like it was missing drums and echo, so I added them.</p>
        <p class="vn-also">Also on this record</p>
        <ol class="vn-list still">${[["Ben, at 432 Hz", "A"], ["Ben, at 528 Hz", "A"], ["Human Nature, in a gymnasium", "B"], ["Restorations, at −14 LUFS", "C"]].map(([t, s]) => `<li><span class="sd">${s}</span><span>${t}</span></li>`).join("")}</ol>
      </div>
      <div class="vn-text" data-r>
        <h3 class="lp-cap">Aditi on record</h3>
        <p class="tl-meta">RETUNING / RESTORATION / MASHUPS / RESEARCH</p>
        <p class="lp-p">Most of what I know about music comes from taking songs apart. I retune them, move them into new rooms, clean them up, and make mixes and mashups.</p>
        <p class="lp-p">Each side of this record is one of those habits:</p>
        <p class="lp-p">A. Retunings<br>B. New rooms<br>C. Restorations</p>
        <p class="lp-p">The Michael Jackson thread runs through most of it, from the songs to the research behind his videos.</p>
      </div>
    </section>
    <section class="ls-sec vn-quote" data-bg="#efefef">
      ${LS.splash(22, "left:4vw;top:8vh", -4)}${LS.lamp(2, "position:absolute;right:4vw;bottom:0;height:min(40vh,360px)", false, "l")}${LS.phono("position:absolute;left:3vw;bottom:2vh;height:min(40vh,340px)")}
      <p class="vn-q" data-r>On repeat: “Dancing Machine”, The Jackson 5</p>
      <a class="vn-out" data-r href="${SOUNDCLOUD}" target="_blank" rel="noopener" aria-label="Listen to my mix of Black or White on SoundCloud">${sleeve("bow", "big")}${vinyl("bow", "out")}</a>
      <p class="vn-mix" data-r>My mix of Black or White</p>
      <p class="lh-endb vn-btns" data-r><a class="ls-btn" href="${ACCENTS}" target="_blank" rel="noopener">The accent trend</a><a class="ls-btn" href="${SOUNDCLOUD}" target="_blank" rel="noopener">Listen on SoundCloud</a></p>
    </section>`,
    onActive(on) { const a = !on && document.querySelector(".ls-music audio"); a && a.pause(); },
    onScroll(root) {
      const st = $(".vn-stack", root), vh = root.clientHeight; if (!st) return;
      const r = st.getBoundingClientRect(), p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh)));
      const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
      // the words go grey from the bottom up as the sleeves pass, then fade back
      const ws = $$(".vn-words span", st), N = ws.length;
      ws.forEach((w, i) => w.classList.toggle("g", p > .05 + (N - 1 - i) / N * .32));
      $(".vn-words", st).style.opacity = (1 - cl((p - .6) / .2) * .9).toFixed(3);
      // two sleeves rise; their records slide out sideways and turn
      const set = (k, y, ex) => { const el = $(`[data-k="${k}"]`, st); el.style.setProperty("--y", y.toFixed(2) + "vh"); el.style.setProperty("--ex", ex.toFixed(3)); el.style.setProperty("--rot", (p * 540).toFixed(1) + "deg"); };
      set("a", 92 - p * 170, cl((p - .14) / .26));
      set("b", 100 - p * 172, cl((p - .18) / .26));
      set("c", 205 - p * 225, cl((p - .62) / .25));
      [[1, 150, 260], [2, 190, 300], [3, 235, 330]].forEach(([k, a, b]) => set(k, a - p * b, 0));
      // the record rises out of his head as the page turns grey
      root.style.setProperty("--hp", cl(root.scrollTop / (vh * .7)).toFixed(4));
    } });

  /* ---------------- the music player: one track, her mix of Cold Shoulder */
  const card = $(".vn-card", music.root), au = $("audio", card), bars = $$(".vn-wave i", card), wv = $(".vn-wave", card), tm = $(".vn-tm span", card), pb = $(".vn-play", card);
  const PLAY = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M3 2l5 3-5 3z"/></svg>', PAUSE = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2.6 2h1.8v6H2.6zM5.6 2h1.8v6H5.6z"/></svg>';
  const mmss = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
  const paint = () => { const k = au.duration ? au.currentTime / au.duration : 0, n = Math.round(k * bars.length); bars.forEach((b, i) => b.classList.toggle("on", i < n)); tm.textContent = mmss(au.currentTime || 0); wv.setAttribute("aria-valuenow", Math.round(k * 100)); };
  pb.addEventListener("click", () => { if (au.paused) au.play().catch(() => {}); else au.pause(); });
  au.addEventListener("play", () => { pb.innerHTML = PAUSE; pb.setAttribute("aria-label", "Pause"); card.classList.add("playing"); });
  au.addEventListener("pause", () => { pb.innerHTML = PLAY; pb.setAttribute("aria-label", "Play"); card.classList.remove("playing"); });
  au.addEventListener("timeupdate", paint); au.addEventListener("ended", () => { au.currentTime = 0; paint(); });
  au.addEventListener("loadedmetadata", () => { $$(".vn-tm span", card)[1].textContent = mmss(au.duration); });
  wv.addEventListener("click", e => { if (!au.duration) { if (au.paused) au.play().catch(() => {}); return; } const r = wv.getBoundingClientRect(); au.currentTime = (e.clientX - r.left) / r.width * au.duration; paint(); });
  wv.addEventListener("keydown", e => { if (!au.duration || !/Arrow(Left|Right)/.test(e.key)) return; e.preventDefault(); au.currentTime = Math.max(0, Math.min(au.duration, au.currentTime + (e.key === "ArrowRight" ? 5 : -5))); paint(); });
  // the song stops when you leave the page or switch tabs
  document.addEventListener("visibilitychange", () => { if (document.hidden) au.pause(); });
})();
