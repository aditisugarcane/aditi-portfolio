/* The Independent films page keeps its discs. In front of them now sits the same scrolling opening as the other
   pages: the TV animation on black, the words arriving one by one, the page turning white, a note from the
   director, and then the opening lifts away to show the discs. */
(() => {
  const LS = window.LS, F = window.COPY.ls.films, $ = (s, r = document) => r.querySelector(s);
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const ph = t => `<span class="ph">${t}</span>`;
  const root = document.createElement("section"); root.className = "ls-pg fi-pg"; root.setAttribute("aria-label", "Independent films, opening");
  root.innerHTML = `
    <div class="lp-hero">
      <div class="lp-stick">
        <div class="ls-in-k"><b>${F.kick}</b><span>${F.sub}</span></div>
        <figure class="ls-in-f big" style="--ar:.658">${LS.fig("tvs")}<i class="floor"></i></figure>
        <p class="ls-in-s">${F.side}</p>
      </div>
      <header class="lp-head">${LS.splash(6, "left:5vw;top:30vh", -4)}${LS.splash(1, "right:5vw;top:48vh", 5)}
        <h2 class="lp-title" data-r>${F.title}</h2>
        <div class="lp-body" data-r>${F.body.map(p => `<p>${p}</p>`).join("")}</div>
        ${LS.hint(F.hint)}
      </header>
    </div>
    ${LS.note(F.noteT, `<img src="media/reel/director.jpg" alt="Aditi, in a yellow bee headband, with two friends. A pink arrow and the word me point to her." loading="lazy">`, "Aditi Anupam<br><span>The director</span>", F.note)}
    <section class="fi-out" data-bg="#fff"><p class="fi-go" data-r>${F.go}</p></section>
    <button type="button" class="fi-skip ls-btn">${F.skip}</button>`;
  document.body.appendChild(root);
  root._hero = $(".lp-hero", root); root._stick = $(".lp-stick", root); root._head = $(".lp-head", root); root._k = $(".ls-in-k", root); root._s = $(".ls-in-s", root); root._blk = true;

  const out = $(".fi-out", root);
  let on = false, done = false;
  function finish() {
    if (done) return; done = true; root.classList.add("done");
    document.documentElement.classList.remove("ls-dark"); document.documentElement.style.setProperty("--ls-ink", "#000");
    window.FX.setPage("films", null, "films");
    setTimeout(() => { if (done) root.classList.remove("on"); }, calm ? 0 : 700);
  }
  root.addEventListener("scroll", () => {
    if (!on || done) return; LS.touch && LS.touch();
    LS.tone(root);
    // in the last screen the opening fades away and the discs show through
    const r = out.getBoundingClientRect(), vh = root.clientHeight, p = Math.max(0, Math.min(1, 1 - r.top / vh));
    root.style.setProperty("--fo", p.toFixed(3));
    if (p > .96) finish();
  }, { passive: true });
  $(".fi-skip", root).addEventListener("click", finish);
  // from the discs, scrolling up past the first one brings the opening back, near its end, to scroll up through
  document.addEventListener("films:back", () => {
    if (!document.body.classList.contains("proj") || !done) return;
    done = false; root.classList.remove("done"); root.classList.add("on", "play");
    root.scrollTop = Math.max(0, out.offsetTop - root.clientHeight * .9); root.style.setProperty("--fo", 0); root._bg = null;
    LS.tone(root); window.FX.setPage("films", root, "films");
  });

  function active(v) {
    on = v;
    if (v) {
      done = false; root.classList.remove("done", "play"); root.classList.add("on"); root.scrollTop = 0; root.style.setProperty("--fo", 0); root._bg = null;
      LS.tone(root); window.FX.setPage("films", root, "films"); LS.leavePages && LS.leavePages();
      requestAnimationFrame(() => { root.classList.add("play"); });
    } else { root.classList.remove("on"); }
  }
  // follow the router: the films page is on while the body has the "proj" class
  let was = false;
  new MutationObserver(() => { const now = document.body.classList.contains("proj"); if (now !== was) { was = now; active(now); } }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
})();
