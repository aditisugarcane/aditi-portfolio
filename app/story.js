/* The accent trend, as a Longshot project page: a black intro with a drawing, then white pages with a
   timeline down the middle (one stop per chapter), the views line drawing itself, the stories you read
   through a magnifier lens, a grey wall of brand messages, and the footer. */
(() => {
  const T = window.COPY.site.story, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const P = window.COPY.ls.pages.accents;
  const V = [3,0,0,0,227,210,1551,28734,267287,282016,109472,60649,101261,314518,466741,372247,125496,86132,64541,71275,88836,55206,46658,43158,54701,97638,57869,32206,33433,28832,19622,20484,39170,28161,32172,89993,361018,2830178,2924769,1529326,1780375,2447848,2365167,2181636,1288151,1221590,1039277,1264787,1051852,918813,588868,519681,529073,496098,618384,444554,473056,447364,417479,303760,264129,189849,295571,272684,265686,301737,379928,953599,957375,558589,576136,296844,408303,474727,242596,172301,204492,344417,171615,136841,144238,138744,217207,177497,188636,221344,209148,459070,260433,203091,162123,131231,85890,96573,125869,88041,76818,77077,119139,66370,61596,63777,58875,54060,54588,54698,43516,40855,41766,43417,47776,54127,58027,51245,42115,41199,39469,41299,47174,44721,42025,35394,35281,33177,32159,28858,25708,19499,17740];
  const CUM = []; V.reduce((a, v, i) => (CUM[i] = a + v), 0);
  const SCRIPTS = [
    { name: "Australian", t: "The Haircut", img: "media/tk/s-aussie-0.webp", v: "9M", l: [
      ["I told the hairdresser I just wanted a small trim.", "oi tauld tha heedressa oi jast wontid a smawl trim"],
      ["She nodded and started cutting, seemingly very confident.", "shee nodid an stahdid kadding, seeminglee verree confidint"],
      ["I closed my eyes for a moment to relax a little.", "oi claurzed moi oiz for a maurment ta relax a liddle"],
      ["When I opened them, half my hair was already gone.", "wen oi aurpened em, hahf moi hea wos awlreddee gawn"]] },
    { name: "East Texan", t: "The Nap", img: "media/desk/st-east-texan.webp", v: "3.5M", l: [
      ["I laid down for a ten minute nap after lunch.", "ah laid daown for a tin minit nap after lunch"],
      ["My alarm went off, and I turned it off in my sleep.", "mah uh-larm wint awf, an ah turned it awf in mah sleep"],
      ["When I woke up, the sun was going down.", "win ah woke up, thuh sun wuz goin daown"],
      ["I panicked and called my boss right away.", "ah panicked an cawled mah bawss raht away"]] },
    { name: "Jamaican", t: "The Bank", img: "media/desk/st-jamaican.webp", v: "4.8M", l: [
      ["The woman at the bank asked me three security questions.", "di wu-man at di bank ask mi tree si-kyu-ri-ti kwes-chan"],
      ["She asked what my mother called me as a child.", "shi ask wat mai madda kaal mi az a chail"],
      ["I told her, and she laughed for a full minute.", "ai tol har, an shi laaf faa a ful mi-nit"],
      ["Then she approved everything without checking anything else.", "den shi a-pruuv ev-ri-ting wid-out chek-in els"]] }
  ];
  const QUOTES = [
    { q: "I'm East Texan and this is exactly how we sound! Need a different image though. It's all piney woods where we are from.", by: "An East Texan", img: "media/tk/pines.webp" },
    { q: "IM ACTUALLY CRACKING UP AT MYSELF", by: "12.6K likes", big: 1 },
    { q: "i'm a bilingual french and english speaker. i did it with my best french accent without reading your transcriptions, then read the phonetic transcriptions you made. they are PERFECT!!!", by: "A bilingual French speaker" },
    { q: "i used that pic as inspo for my bowl!!", by: "On the Jamaican post", img: "media/tk/bowl.webp" },
    { q: "My kids think these are the funniest things ever. I save these for bedtime and reread them instead of stories lol", by: "A parent" }
  ];
  const COUNTRIES = [["United States", 25.9], ["United Kingdom", 18.3], ["Philippines", 7.2], ["Canada", 3.4], ["Australia", 3.3], ["South Africa", 2.5], ["Ireland", 1.6], ["Singapore", 1.4], ["Germany", 1.3], ["Malaysia", 1.2]];
  const pad = n => String(n).padStart(2, "0"), CH = T.ch, N = CH.length;
  const node = i => window.LS.node(CH[i].t, `CHAPTER ${pad(i + 1)} // OF ${pad(N)}`);

  // the chart, drawn in SVG units
  const W = 1000, Hh = 420, X0 = 70, X1 = 970, Y0 = 360, Y1 = 30, xi = i => X0 + (X1 - X0) * i / (CUM.length - 1), yv = c => Y0 - (Y0 - Y1) * c / 45e6;
  const linePath = CUM.map((c, i) => `${i ? "L" : "M"}${xi(i).toFixed(1)} ${yv(c).toFixed(1)}`).join("");
  const months = [[0, "Jun"], [17, "Jul"], [48, "Aug"], [79, "Sep"], [109, "Oct"]];
  const chart = `<figure class="s-chart" data-r><figcaption><b>${CH[1].chart}</b><span>Views, added up</span></figcaption>
    <svg viewBox="0 0 ${W} ${Hh}" role="img" aria-label="${CH[1].chart}">
      ${[10, 20, 30, 40].map(m => `<line x1="${X0}" x2="${X1}" y1="${yv(m * 1e6)}" y2="${yv(m * 1e6)}" class="gl"/><text x="${X0 - 14}" y="${yv(m * 1e6) + 5}" class="s-ax" text-anchor="end">${m}M</text>`).join("")}
      <line x1="${X0}" x2="${X1}" y1="${Y0}" y2="${Y0}" class="base"/>
      ${months.map(([i, m]) => `<text x="${xi(i)}" y="${Y0 + 30}" class="s-ax">${m}</text>`).join("")}
      <path class="s-ln" d="${linePath}" pathLength="1"/>
      ${CH[1].ann.map(([i, t], k) => `<g class="an" data-i="${i}"><circle cx="${xi(i)}" cy="${yv(CUM[i])}" r="6"/><text x="${xi(i) + (k === 3 ? -14 : 14)}" y="${yv(CUM[i]) + (k === 3 ? -16 : k % 2 ? 26 : -14)}" text-anchor="${k === 3 ? "end" : "start"}">${t}</text></g>`).join("")}
    </svg></figure>`;
  const text = i => `<p class="tl-big">${CH[i].big}</p>${(CH[i].body || []).map(b => `<p class="tl-p">${b}</p>`).join("")}`;
  const script = (s, side) => `<div class="tl-row"><div class="tl-${side}"><article class="s-script" data-r>
      <div class="s-stamp"><img src="${s.img}" alt="" loading="lazy"></div>
      <p class="ls-k">${s.name}, ${s.v} views</p><h3>${s.t}</h3>
      <div data-lens class="s-lines">${s.l.map(([en, ac]) => `<p><span data-alt="(${ac})">${en}</span></p>`).join("")}</div></article></div></div>`;
  const quote = (q, i) => `<div class="tl-row"><div class="tl-${i % 2 ? "r" : "l"}"><blockquote class="s-q${q.big ? " q-big" : ""}" data-r>${q.img ? `<img src="${q.img}" alt="" loading="lazy">` : ""}<p>${q.q}</p><cite>${q.by}</cite></blockquote></div></div>`;

  const LS = window.LS;
  /* the posts, inside a phone that scrolls with the page, with likes floating around it */
  // her posts, and the photos viewers sent back as comments
  const POSTS = [
    { img: "media/tk/p-songs.webp", by: "thrillernightheehee", cap: "Songs to dance to at 3:33 AM." },
    { img: "media/tk/c-australian.webp", by: "9M views", cap: "The Haircut, in an Australian accent." },
    { img: "media/tk/s-aussie-1.webp", by: "The Haircut", cap: "Slide two: the story, written twice." },
    { img: "media/tk/r-nailed.webp", who: "chadsdumbtok", by: "chadsdumbtok", cap: "Nailed it", reply: "39 likes" },
    { img: "media/tk/p-words.webp", by: "thrillernightheehee", cap: "Cool words to casually throw into a daily conversation and flex your vocab." },
    { img: "media/tk/c-texan.webp", by: "3.5M views", cap: "The Nap, in an East Texan accent." },
    { img: "media/tk/r-skyline.webp", who: "Jack", by: "Jack", cap: "sent a photo in the comments", reply: "<b>thrillernightheehee</b> MADE MY DAY" },
    { img: "media/tk/c-jamaican.webp", by: "4.8M views", cap: "The Bank, in a Jamaican accent." },
    { img: "media/tk/bowl.webp", who: "a viewer", by: "On the Jamaican post", cap: "“i used that pic as inspo for my bowl!!”" }
  ];

  const heart = `<svg viewBox="0 0 24 22"><path d="M12 21.2C5.6 16.4 1 12.6 1 7.4 1 4 3.6 1.4 6.8 1.4c2.1 0 3.9 1.1 5.2 2.9 1.3-1.8 3.1-2.9 5.2-2.9C20.4 1.4 23 4 23 7.4c0 5.2-4.6 9-11 13.8z"/></svg>`;
  const thumb = `<svg viewBox="0 0 24 24"><path d="M2 10h4v12H2zM8 21.5V10.4l5.2-8.2c.9-1.3 3-.6 2.8 1l-.7 5.3H21c1.4 0 2.4 1.3 2 2.6l-2.6 8.4c-.3 1.1-1.3 1.9-2.4 1.9H9.5c-.8 0-1.5-.7-1.5-1.5z"/></svg>`;
  const FLOAT = Array.from({ length: 18 }, (_, i) => { const a = (i * 137.5) % 360, r = 22 + (i * 29 % 23); return { x: 50 + Math.cos(a * Math.PI / 180) * r * 1.5, y: 8 + (i * 53 % 88), s: 16 + (i * 7 % 22), k: i % 3 === 0 ? "t" : "h", sp: .4 + (i * 13 % 10) / 10, rot: (i * 47 % 50) - 25 }; }).filter(f => Math.abs(f.x - 50) > 17);
  const phone = `<section class="ls-sec ph-sec" data-bg="#fff">
    <div class="ph-in"><p class="lp-p" data-r>These are a few of the posts as they went out, and the photos people sent back in the comments.</p></div>
    <div class="ph-run"><div class="ph-stage">
      ${FLOAT.map(f => `<i class="ph-ico ${f.k}" style="left:${f.x.toFixed(1)}%;top:${f.y}%;--s:${f.s}px;--sp:${f.sp};--r:${f.rot}deg">${f.k === "t" ? thumb : heart}</i>`).join("")}
      <div class="ph-phone"><div class="ph-screen"><div class="ph-feed">
        ${POSTS.map(({ img, cap, by, who, reply }) => `<article class="ph-post${who ? " re" : ""}"><header><i></i><b>${who || "thrillernightheehee"}</b><span>•••</span></header><img src="${img}" alt="" decoding="async"><div class="ph-act">${heart}<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2-5.5A8.4 8.4 0 1 1 21 11.5z"/></svg><svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg></div><p><b>${by}</b> ${cap}</p>${reply ? `<p class="ph-re">${reply}</p>` : ""}</article>`).join("")}
      </div></div><img class="ph-frame" src="media/ld/phone.webp" alt="" draggable="false"></div>
    </div></div>
  </section>`;

  /* the research, as Aditi's own notebook pages: handwritten notes, circled sounds, arrows and a taped-in tweet.
     Each note is a list of lines; markup inside a line: [u]underlined[/u], [c]circled[/c], [h]highlighted[/h], [x]crossed out[/x], [r]red pen[/r] */
  /* Aditi's notes, in her own handwriting: every letter and word on these pages was cut from a page she wrote by
     hand, laid onto a real open notebook. The full text is here too, for screen readers and search. */
  const SPREADS = [
    { src: "media/notes/spread1.webp", tilt: -1.6, alt: "Notebook pages. How I research an accent: pick one variety and name it, East Texan, not Southern. A specific name stops the 'there are many accents' comments. Find a real speaker: Georgie in Young Sheldon; Montana Jordan is from Longview. Use features linguists have written about. The accent lives in the brackets, the grammar stays standard. No stage versions: no howdy, no oi, no r and l swaps. East Texan, findings: fully rhotic, every r is said. I and my become ah, even before t and k: raht, lahk. Pin and pen merge before n and m: ten = tin. The drawl: vowels stretch, consonants stay quick. Seven = seb'm. Cake slides up from low; once per text." },
    { src: "media/notes/spread2.webp", tilt: 1.3, alt: "Notebook pages. Hong Kong English: the most mocked accent online, and most of the mockery is wrong. th becomes f: three = free. Cockney does this too! l at the end becomes w: milk = miwk. End clusters drop about half the time: just = jus. Never r and l swaps, never broken grammar. Thai: no s clusters at the start, so a vowel slips in: street = sa-treet. Only 8 sounds can end a syllable: half = hap, school = sa-koon. th becomes t, not f; this is where Thai and Cantonese split. There's no sh sound, so it becomes ch. Stress falls on the last syllable. Every swap follows a rule: that's my comment armour." },
    { src: "media/notes/spread3.webp", tilt: -.8, alt: "Notebook pages. Irish is 3 accents. Name it: southern supraregional, the modern Dublin-based standard. th becomes a dental t and d: three = tree; a different consonant, not a mistake. The soft t: water = wath-er, the clearest Irish feature. Film = fil-um; Irish people joke about it themselves. Every r is said. Cork and Belfast: Cork is a melody, the pitch climbs and drops every line. about = a-boat, top = tahp, phone = fawn. Belfast breaks the rules: th is a real th there. bag = beg, fish = fash. Statements rise at the end. Derry Girls is Derry, not Belfast!" }
  ];
  const spread = (p, i) => `<button type="button" class="nz-sp nz-${i + 1}" data-r data-i="${i}" style="--tilt:${p.tilt}deg" aria-label="Read these notes up close"><img src="${p.src}" alt="${p.alt}" loading="lazy" draggable="false"></button>`;
  const desk = `<div class="nz-desk">
      ${spread(SPREADS[0], 0)}
      ${spread(SPREADS[1], 1)}
      ${spread(SPREADS[2], 2)}
      <div class="nz-books" data-r>
        <figure class="nz-book b1"><img src="media/notes/book-accent-code.webp" alt="The Accent Code by Erik Singer"><img class="nz-tape" src="media/notes/tape_kraft.webp" alt=""></figure>
        <figure class="nz-book b2"><img src="media/notes/book-thinking.webp" alt="Thinking with an Accent, edited by Pooja Rangan, Akshya Saxena, Ragini Tharoor Srinivasan and Pavitra Sundar"><img class="nz-clip" src="media/notes/clip_pink.webp" alt=""></figure>
      </div>
      ${LS.lamp(1, "position:absolute;right:0;bottom:-2vh;height:min(44vh,400px)")}
      <p class="nz-tip"><img src="media/notes/hint-read.webp" alt="Click a page to read it up close" draggable="false"></p>
    </div>`;
  // up close: the page fills the screen; on a phone it can be dragged around
  const zoom = document.createElement("div"); zoom.className = "nz-zoom"; zoom.setAttribute("role", "dialog"); zoom.setAttribute("aria-label", "Notes up close");
  zoom.innerHTML = `<div class="nz-z-in"><img alt=""></div><button type="button" class="sk-x nz-x" aria-label="Close"><svg viewBox="0 0 20 20"><path d="M3 3l14 14M17 3L3 17"/></svg></button>`;
  document.body.appendChild(zoom);
  document.addEventListener("click", e => {
    const b = e.target.closest(".nz-sp");
    if (b) { const im = $("img", zoom); im.src = SPREADS[+b.dataset.i].src; im.alt = SPREADS[+b.dataset.i].alt; zoom.classList.add("on"); $(".nz-z-in", zoom).scrollLeft = 0; $(".nz-x", zoom).focus({ preventScroll: true }); return; }
    if (zoom.classList.contains("on") && (e.target.closest(".nz-x") || e.target === zoom || e.target.classList.contains("nz-z-in"))) zoom.classList.remove("on");
  });
  addEventListener("keydown", e => { if (e.key === "Escape") zoom.classList.remove("on"); });
  let zTop = 5;
  // the computer: the screen opens the tweet up close; the tab pulls the note out (and pushes it back)
  document.addEventListener("click", e => {
    const t = e.target.closest(".rc-tab, .rc-x, .rc-scr, .rc-gif"); if (!t) return;
    const w = t.closest(".rc-wrap"), k = t.dataset.k || (t.classList.contains("rc-gif") ? "idea" : "tweet"), win = $(`.rc-win[data-k="${k}"]`, w);
    const open = t.classList.contains("rc-x") ? false : !win.classList.contains("open");
    win.classList.toggle("open", open); win.setAttribute("aria-hidden", !open); if (open) win.style.zIndex = ++zTop;
    const tab = $(`.rc-tab[data-k="${k}"]`, w); tab.classList.toggle("out", open); tab.setAttribute("aria-expanded", open);
    window.FX.sfx && window.FX.sfx("tick", .3);
  });
  const research = `<section class="ls-sec rs-sec" data-bg="#efefef">
    <header class="rs-hd"><p class="rs-k" data-r>THE RESEARCH // BEHIND THE ACCENTS</p><h2 class="rs-t" data-r>Where accents come from</h2></header>
    <div class="rc-wrap" data-r>
      <div class="rc-win rc-tw" data-k="tweet" id="rc-tweet" aria-hidden="true">
        <div class="rc-bar"><span>tweet.png</span><button type="button" class="rc-x" data-k="tweet" aria-label="Put the tweet back">x</button></div>
        <div class="rc-body"><img src="media/rs/cavalli.webp" alt="A tweet by Roberto Cavalli, 21 April 2012: I cannot speak with you anymore. Many silly fashion site... Wont to close my mouth. I dont want to be part of this mafia fashion system!" draggable="false"></div>
      </div>
      <div class="rc-win rc-note" data-k="idea" id="rc-note" aria-hidden="true">
        <div class="rc-bar"><span>idea.txt</span><button type="button" class="rc-x" data-k="idea" aria-label="Put the note back">x</button></div>
        <div class="rc-body">
          <p class="rc-h">how it started</p>
          <p>I'm a fan of Roberto Cavalli's work. One night I was reading his Twitter rants and realised I was reading them in his Italian accent subconsciously. So I thought: what if you spell words the way they sound? Then anyone could do an accent just by reading.</p>
          <p>That became the series. For each edition, I go down a rabbit hole researching the speech, the people, and their slang.</p>
          <p>I look for old paintings that capture something of its artistic heritage to use as the cover. Then, I carefully put together a mini story that brings out the accent's rhythms and sounds.</p>
          <p class="rc-k">I keep the format familiar so the regulars know their way around, while adding little surprises to the table.</p>
        </div>
      </div>
      <button type="button" class="rc-tab t1" data-k="tweet" aria-controls="rc-tweet" aria-expanded="false"><span>tweet.png</span><b>click to pull out</b></button>
      <button type="button" class="rc-tab t2" data-k="idea" aria-controls="rc-note" aria-expanded="false"><span>idea.txt</span><b>click to pull out</b></button>
      <div class="rc">
        <img class="rc-gif" src="media/notes/computer.webp" alt="An old computer, showing a tweet by Roberto Cavalli from 21 April 2012: I cannot speak with you anymore. Many silly fashion site... Wont to close my mouth. I dont want to be part of this mafia fashion system!" draggable="false">
        <button type="button" class="rc-scr" data-k="tweet" aria-label="Pull out the tweet"><span class="rc-page"><i class="rc-url"></i><img src="media/rs/cavalli.webp" alt="" draggable="false"></span></button>
      </div>
    </div>
    <p class="rs-lede" data-r>These are my notes from working each accent out, sound by sound.</p>
    ${desk}
  </section>`;

  /* what people said, as cards scattered on black (after Longshot's castro_sing_along wall) */
  const ME = `<i class="cw-av me">A</i>`;
  const CARDS = [
    { who: "A viewer", on: "the Australian post", t: "i don’t know why but i became irish", foot: "167.1K likes" },
    { who: "An actor", on: "the French post", t: "This is really useful as an actor" },
    { who: "An East Texan", on: "the East Texan post", t: QUOTES[0].q, img: QUOTES[0].img },
    { who: "A Texan", on: "the East Texan post", t: "i’m from texas and this was so funny because i read the normal version first and i sounded the exact same.", foot: "12K likes" },
    { who: "A theatre major", on: "the tongue twisters", t: "My tip is to speak with a smile and maybe in a sing songy voice and it makes it easier lol! *learned this as a theater major*" },
    { who: "A bilingual French speaker", on: "the French post", t: QUOTES[2].q },
    { who: "A student", on: "the Australian post", t: "gang I reposted this yesterday and then the next day at school my drama teacher put this on our poetry notes and said “I made it myself”" },
    { who: "A voice actor", on: "the Thai post", t: "I'm making a video of voice acting this." },
    { who: "A viewer", on: "the East Texan post", t: "had me sounding like Tom Hanks in Forrest Gump", foot: "54.8K likes" },
    { who: "A viewer", on: "the Jamaican post", t: QUOTES[3].q, img: QUOTES[3].img },
    { who: "A Hong Konger in New Zealand", on: "the Hong Kong post", t: "As a hongkee living in nz, this made me feel so represented. We do speak English like that where i am from thank you!" },
    { who: "A viewer", on: "the French post", t: "Tried to mock the french accent. Ended up speaking scottish", foot: "37.2K likes" },
    { who: "A viewer", on: "the East Texan post", t: "fun fact if you visit Texas and you don't sound like this you get executed and turned to brisket to be served at buc-ees", foot: "41.5K likes" },
    { who: "An Australian", on: "the Australian post", t: "The funniest thing about being Australian is reading the original sentence out loud and then seeing the translated version and realising it's the exact same f***ing thing I just said", foot: "31.1K likes" },
    { who: "A viewer", on: "the French post", t: "Once when my mom was in Paris the waiter asked her if she would like water wiz or wiz out fizz and she was listening so intently she accidentally said “wizout”, copying his accent", foot: "1.2K likes" },
    { who: "A parent", on: "an accent post", t: QUOTES[4].q },
    { who: "A viewer", on: "the East Texan post", t: "spoke this out loud and i sounded like i was going to tell jenny i would be a good husband", foot: "1.1K likes" }
  ];

  const wall = `<section class="ls-sec cw-sec" data-bg="#000">
    <header class="cw-hd"><p class="rs-k" data-r>WHAT PEOPLE SAID</p><h2 class="cw-t" data-r>Over twenty thousand comments</h2></header>
    <div class="cw-wall cw-cols">${CARDS.map((c, i) => `<article class="cw-c" data-r style="--d:${i % 3};--tilt:${[-1.2, .8, -.4, 1.1, -.9, .5][i % 6]}deg">
      <header><i class="cw-av">${c.who.replace(/^(A|An) /, "").slice(0, 1).toUpperCase()}</i><span><b>${c.who}</b><em>Comment on ${c.on}</em></span></header>
      <p>${c.t}</p>${c.img ? `<img src="${c.img}" alt="" loading="lazy">` : ""}${c.foot ? `<footer>${c.foot}</footer>` : ""}</article>`).join("")}</div>
  </section>`;

  const html = `
  <section class="ls-sec lp-tls" data-bg="#fff">
    <div class="ls-tl">
      ${LS.row(node(0), text(0), `<figure class="s-cover ls-tiltable"><img src="media/tk/s-aussie-1.webp" alt="The Haircut, the story slide of the Australian post" loading="lazy"><figcaption>The Haircut, slide two</figcaption></figure>`)}
      ${LS.row(node(1), text(1), "")}
      <div class="tl-wide">${chart}
        <div class="s-stats" data-r>${T.stats.map(([n, l], i) => `<div style="--d:${i}"><b>${n}</b><span>${l}</span></div>`).join("")}</div>
        <p class="s-note" data-r>${T.shareNote}</p>
      </div>
      ${LS.row(node(2), "", text(2))}
      ${SCRIPTS.map((s, i) => script(s, i % 2 ? "r" : "l")).join("")}
      ${LS.row(node(3), text(3), "")}
      ${LS.row(node(4), text(4) + `<ol class="s-bars">${COUNTRIES.map(([c, p], i) => `<li style="--w:${(p / 25.9 * 100).toFixed(1)}%;--d:${i}"><span>${c}</span><i></i><b>${p}%</b></li>`).join("")}</ol>`, `<div class="s-women"><b>73%</b><span>women</span><b class="sm">18 to 24</b><span>most of them</span></div>`)}
      <i class="tl-end" aria-hidden="true"></i>
    </div>
  </section>
  ${research}
  ${wall}
  ${phone}
  ${LS.note("A note from Aditi", `<img class="lp-comic" src="media/notes/comic-gday.webp" alt="A comic by Aditi: someone says G'day mate, how's it going? and the other replies: ew... don't" loading="lazy">`, "Aditi Anupam<br><span>The writer</span>", ["I built this little corner of the internet on the belief that everyone has something to say. Anyone who wanders into this world must leave having spoken something, be it an accent borrowed from another country, a tongue twister that ties the tongue in knots, or a question that keeps a conversation wandering long after it should have ended.", "My art takes a lot of work and precision but I love what I do, and judging by the people who find their way here, they love it too."])}
  <section class="ls-sec ls-grey" data-bg="#efefef">${LS.splash(13, "left:4vw;top:6vh", -4)}
    <h2 class="ls-h" data-r>${T.brandsTitle}</h2>
    <p class="lp-p" data-r>${T.brandsNote}</p>
    <div class="ls-msgs">${T.brands.map(([b, d], i) => `<div class="ls-msg${i % 2 ? " r" : ""}" data-r style="--d:${i}"><img src="media/rs/dm-${i ? "kissport" : "teashell"}.webp" alt="The message from ${b}" loading="lazy"><span class="ls-k">${d}</span><b>${b}</b><em>Sent a message about a collaboration.</em></div>`).join("")}</div>
  </section>`;

  function onScroll(root) {
    const run = $(".ph-run", root);
    if (run) {
      const vh = root.clientHeight, r = run.getBoundingClientRect(), p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh)));
      const feed = $(".ph-feed", root), scr = $(".ph-screen", root);
      feed.style.transform = `translateY(${(-p * Math.max(0, feed.scrollHeight - scr.clientHeight)).toFixed(1)}px)`;
      run.style.setProperty("--pp", p.toFixed(4));
    }
    const ch = $(".s-chart", root); if (!ch) return;
    const vh = root.clientHeight, b = ch.getBoundingClientRect(), q = Math.max(0, Math.min(1, (vh * .85 - b.top) / (b.height + vh * .25)));
    $(".s-ln", ch).style.strokeDashoffset = (1 - q).toFixed(4);
    $$(".an", ch).forEach(a => a.classList.toggle("on", q >= +a.dataset.i / (CUM.length - 1) - .01));
  }
  const PA = window.COPY.ls.pages.accents;
  LS.page({ key: "accents", fig: "gate", figBig: 1, slug: "tiktok_famous", splash: [[3, "left:4vw;top:30vh", -4], [19, "right:4vw;top:46vh", 5]], kick: PA.kick, sub: PA.sub, side: PA.side, title: PA.head, body: [PA.body, PA.body2],
    hint: matchMedia("(pointer:coarse)").matches ? "tap a line in the stories to see it in its accent" : "hover a line in the stories to see it in its accent",
    cta: ["See the films", "films"], html, prev: "home", next: "films", onScroll });
})();
