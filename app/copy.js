/* Every word on the new parts of the site lives here, so changing text never means hunting through code.
   Fonts are set in app/site.css under ":root" (--f-hand, --f-head, --f-text). */
window.COPY = {
  vip: {
    big: "VIP",
    bars: ["ALL ACCESS", "+ VIP LOUNGE"],
    noLabel: "PASS NO.",
    photo: "frontal view",
    drawHint: "draw yourself",
    fields: [["name", "your name"], ["issued", ""], ["valid", "forever & always"], ["access", "everywhere, even the lounge"]],
    fine: "THE HOLDER OF THIS PASS IS AN HONOURED GUEST OF ADITI ANUPAM",
    mrz: "VIP<<HONOURED<GUEST<<OF<<ADITI<ANUPAM<<<<<<<<",
    defaultName: "honoured guest",
    mysteryName: "mystery guest",
    back: ["welcome to my side", "of the internet,", "i'm glad you're here."],
    sign: "love, aditi",
    ps: "p.s. hold on to this, it opens the vip lounge.",
    topLeft: "you're on the list.",
    topRight: "aditi anupam, museum of drawers",
    behind: "aditi anupam",
    notes: { yours: "this one's yours", draw: "draw yourself in here", sign: "sign it (or don't)", flip: "now flip it over", back: "welcome back!" },
    buttons: { clear: "clear", done: "done, flip it", skip: "skip, surprise me", enter: "enter the museum", flipBack: "flip back", flipOver: "flip it over", redo: "make a new pass", skipIntro: "skip intro" }
  },

  museum: {
    title: "The Museum of Drawers",
    by: "by Aditi Anupam",
    plate: "ADITI ANUPAM",
    nav: ["Front view", "Drawers", "Index"],
    drawer: "Drawer",
    hover: "open",
    hint: "Click a drawer to pull it out",
    soon: "coming soon",
    loungeLocked: "the lounge is still being decorated. your pass will open it the day it's ready.",
    motionSoon: "this experiment is still in the oven. check back soon.",
    artSoon: "the art is on its way.",
    aboutTitle: "about me",
    aboutBody: "Aditi Anupam is an animator and motion designer who makes films that viewers can experience, not just watch. She lives in the small moves that make a frame come alive.",
    aboutNote: "(this letter is being rewritten. a better one is on its way.)",
    card: { name: "Aditi Anupam", role: "animator & motion designer", city: "Singapore", backTitle: "find me", links: [["email", "aditisugarcane@gmail.com"], ["tiktok", "@thrillernightheehee"]] },
    email: "",
    emailSoon: "my email address is going in here soon.",
    drawers: [
      { key: "films", name: "Films", line: "four spec ads and a film about a viking king" },
      { key: "projects", name: "Independent projects", line: "spec ads and the accent trend, on one desk" },
      { key: "motion", name: "Motion experiments", line: "small loops and big ideas" },
      { key: "art", name: "Art", line: "coming soon" },
      { key: "lounge", name: "VIP Lounge", line: "members only" },
      { key: "contact", name: "Contact", line: "say hello" }
    ]
  },

  desk: {
    title: "Independent projects",
    sub: "spec ads and the accent trend",
    filmsLink: "see the films on discs",
    hint: "click anything on the mat",
    back: "back to the mat",
    esc: "Esc or click outside to go back",
    museum: "back to the museum",
    deskName: "the desk",
    synthIdle: "press a key",
    viewsWord: "views",
    synthCap: "twelve accents, one key each. press one (or 1 to = on your keyboard) to see its painting and script.",
    matchCap: "five spec ads, one per matchbox. click one to play it.",
    bagCap: "pick a bag",
    bagNote: "comments are quoted as written, without names. drag them around.",
    receipt: { sub: "views, itemised", foot: "THANK YOU FOR WATCHING" },
    letters: [
      { from: "Teashell SG", date: "15 October 2026", head: "an invitation to collaborate", body: "Teashell SG reached out about working together on a collaboration." },
      { from: "Kissport", date: "28 September 2026", head: "an invitation to collaborate", body: "Kissport reached out about working together on a collaboration." }
    ],
    lettersCap: "brands came knocking. click an envelope to open it.",
    passport: { fields: [["holder", "my audience"], ["followers", "24K"], ["women", "73%"], ["age", "mostly 18 to 24"], ["first-time viewers", "20.2M"]], visas: "where they live", stampWord: "of followers", cap: "my followers, by country" },
    stampsCap: "one painting per accent. hover to see it in halftone.",
    nb: {
      property: "property of", owner: "aditi anupam", ifFound: "if found, please return. the trend depends on it.",
      title: "accent research", subtitle: "notebook no. 1", started: "started 21 june 2026", dontRead: "(no reading ahead)",
      methodTitle: "how a post is made",
      method: ["pick an accent people keep asking for", "find an old painting from that place", "write a tiny everyday story, six lines", "respell every line the way it sounds", "post it, then read every comment"],
      rulesTitle: "rules for myself",
      rules: ["a story anyone can picture", "short enough to read out loud", "the accent changes, the format doesn't", "lowercase caption on the cover", "locals get the last word"],
      coverNote: "cover: a face from the place and one line",
      aus: { chart: "australian vowels, roughly", notes: ["t between vowels goes soft: liddle"],
        list: ["I becomes oi (the vowel starts further back)", "o becomes aur (it starts in the middle)", "no r after vowels: heedressa, peeson", "t between vowels becomes d: liddle, stahdid", "a long y at the end: verree"] },
      tex: { title: "east texan, what to listen for",
        list: [["I becomes ah", "ah, mah, raht: the glide disappears"], ["pin sounds like pen", "ten is tin, went is wint, when is win"], ["ow becomes aow", "down is daown"], ["aw gets a glide", "off is awf, boss is bawss"], ["-ing becomes -in", "meetin, goin"]],
        pines: "an east texan said: piney woods, not hill country. next time, pines." },
      jam: { title: "jamaican english, what to listen for",
        list: [["th becomes d or t", "the is di, three is tree, them is dem"], ["no r after vowels", "answer is an-sa, mother is madda"], ["a long open a", "all is aal, called is kaal, laughed is laaf"], ["ay becomes ie", "name is niem"], ["the past stays simple", "asked is ask, looked is luk"]],
        notPatois: "(not patois!)", bowl: "someone painted my cover onto a bowl" },
      art: { title: "picking the paintings", rules: ["painted in, or of, the place", "old enough to be free to use", "a face or a scene that sounds like the voice", "it has to read at phone size"],
        note: "one painting per accent. the stamps are how i keep track." },
      refs: { title: "videos i learned from", why: "", title2: "what i took from them",
        notes: ["accents drift, they are never fixed", "the british accent changed too, not just the american one", "an accent can be taught, and it can disappear", "history makes the best hook"], ps: "watch, take notes, then write" },
      graphTitle: "views, all added up", graphNote: "first post on 21 june. one million views six days later.",
      numbersTitle: "the numbers", shareNote: "1 share every 77 views!", audience: "73% women, mostly 18 to 24. most of them in the us and the uk.",
      saidTitle: "what people said", thanks: "thank you for reading my notes."
    },
    labels: {
      notebook: "my research notebook",
      synth: "the accent machine, press a key",
      matches: "the spec ads, one per matchbox",
      bags: "comments, bagged",
      receipt: "43.1M views, itemised",
      letters: "brands came knocking",
      passport: "where my viewers live",
      stamps: "the paintings I picked"
    }
  }
};

/* ---------------- the new site (Nov 2026): intro printer, home, the accent trend ---------------- */
window.COPY.intro = {
  title: "You're on the guest list",
  sub: "Welcome to my side of the internet. Your VIP pass is ready, let's print it.",
  slide: "Slide to print your pass",
  hint: "It's real paper. Grab it and give it a swing.",
  enter: "Enter",
  skip: "Skip",
  pass: {
    head: "VIP Guest Pass", noLabel: "No.",
    guestLabel: "Guest", guest: "You", guestLine: "Honoured guest", admit: "Admit one",
    hostLabel: "Host", host: "Aditi Anupam", hostLine: "Animator & motion designer", hostCity: "Singapore",
    accessLabel: "Access", access: [["All access", "Included"], ["VIP lounge", "Included"], ["Films", "Front row"], ["Motion experiments", "Backstage"]], accessTotal: ["Pass type", "All access + VIP"],
    detailsLabel: "Details", issuedLabel: "Issued", timeLabel: "Time", validLabel: "Valid", valid: "Forever & always", dressLabel: "Dress code", dress: "Come as you are", detailsTotal: ["Seat", "Wherever you like"],
    note: ["Welcome to my side of the internet,", "I'm glad you're here."], sign: "love, aditi"
  }
};
window.COPY.site = {
  nav: [["home", "Home"], ["films", "Films"], ["accents", "The accent trend"], ["about", "About"]],
  worm: "Drag the worm to scroll",
  home: {
    kicker: "Portfolio, 2026",
    title: ["Aditi", "Anupam"],
    role: "Animator & motion designer",
    lede: "I make films you can experience, not just watch. Small moves, big feelings, and a lot of frames drawn by hand.",
    scroll: "Scroll",
    filmsKicker: "Selected work",
    filmsTitle: "Films",
    filmsNote: "Four spec ads and a film about a Viking king. Click one to put the disc in.",
    films: [["MUJI", "Spec ad", "2026"], ["Australia Zoo", "Spec ad", "2026"], ["Pinterest", "Spec ad", "2026"], ["Brandy Melville × Confident", "Spec ad", "2026"], ["Bluetooth", "An etymology film", "2026"]],
    side: ["Side A", "Track"],
    allFilms: "See all the discs",
    trendKicker: "Independent project",
    trendTitle: "The accent trend",
    trendBig: "43.1M",
    trendLine: "views on an account I started on 21 June 2026.",
    trendLensHint: "Hover the line to see it in an Australian accent",
    trendPlain: "I told the hairdresser I just wanted a small trim.",
    trendAccent: "oi tauld tha heedressa oi jast wontid a smawl trim",
    trendCta: "Read the whole story",
    motionKicker: "Motion experiments",
    motionTitle: "Small loops, big ideas",
    motionNote: "Experiment 01 is up. More are on their way.",
    soon: "Coming soon",
    aboutKicker: "About",
    aboutTitle: "Say hello",
    about: "I'm Aditi, an animator and motion designer based in Singapore. I draw, I animate, and I can't stop listening to how people talk.",
    links: [["Email", "aditisugarcane@gmail.com", "mailto:aditisugarcane@gmail.com"], ["TikTok", "@thrillernightheehee", "https://www.tiktok.com/@thrillernightheehee"]],
    city: "Based in Singapore",
    top: "Back to the top",
    credit: "Drawings and films by Aditi Anupam"
  },
  story: {
    part: "Independent project",
    title: ["The accent", "trend"],
    lede: "How tongue twisters, an old painting and a six-line story turned into 43.1 million views in four months.",
    scroll: "Scroll to read",
    chapter: "Chapter",
    of: "of",
    ch: [
      { t: "How it started", big: "“Is it better to speak or to die?” is a question posed in <em>The Heptaméron</em> (1558) by Marguerite de Navarre.",
        body: ["To speak is to surrender yourself to the possibility of rejection, or the irreversible unravelling of a relationship. To remain silent, however, is to become a prisoner of your own imagination. I say speak. Speak clumsily, speak with a trembling voice and an earnest heart. Ask the stupid question. Make a confession. Be misunderstood. There is something rather magnificent about being so thoroughly, unapologetically human.", "I've done accents on YouTube since I was a little girl, intrigued by how our environments can shape speech patterns. They're tiny fingerprints of the places we come from, carrying histories, habits and entire worlds in the way we shape a word. Through this series, I hope to celebrate that rather than reduce it to a handful of tired stereotypes. Every accent I do is researched and listened to before I put pen to paper, crafting little stories that let people step into its sounds and rhythms. It's my small love letter to the way the world speaks."] },
      { t: "The rise", big: "One million views came six days after the first post. By 10 August it was thirty million.",
        body: ["The line below adds up every single view, day by day, from the first post to mid October."], chart: "Total views, June to October 2026", ann: [[13, "1M, six days in"], [38, "2.9M views in one day"], [57, "30M by 10 August"], [126, "43.1M in total"]] },
      { t: "Read it out loud", big: "Hover any line, and a lens shows you how it sounds.",
        body: ["These are three of the stories, line by line. The lens reveals the respelling underneath."] },
      { t: "What people said", big: "Over twenty thousand comments, and the locals were the toughest critics.",
        body: ["Native speakers checked every post. I read the comments, took the corrections, and carried them into the next one."] },
      { t: "Who watched", big: "Mostly women, mostly 18 to 24, and mostly in the US and the UK.",
        body: ["Share of followers by country."], women: "73% women" }
    ],
    stats: [["43.1M", "views"], ["2.78M", "likes"], ["562.6K", "shares"], ["20.8K", "comments"], ["24K", "followers"], ["20.2M", "first-time viewers"]],
    shareNote: "That's one share for every 77 views.",
    brandsTitle: "Brands came knocking",
    brands: [["Teashell SG", "15 October 2026"], ["Kissport", "28 September 2026"]],
    brandsNote: "Multiple brands reach out to me for collaborations.",
    end: "Back to the home page",
    films: "See the films"
  }
};

/* the Longshot-style site: menu, home panorama, page intros and footers */
window.COPY.ls = {
  menu: [["home", "Back home", ""], ["accents", "TikTok famous", "story"], ["films", "Independent films", "discs"], ["music", "I love music", "vinyl"], ["motion", "Motion experiments", "motion"], ["world", "Illustrating the world", "coming soon"], ["projects", "Personal projects", "coming soon"], ["info", "About Aditi", "info"]],
  open: "Open the menu", close: "Close the menu",
  cards: {
    info: ["ADITI ANUPAM is an animator and motion designer.",
      "This is a visual index of my work. There's sound in the bottom left too :)",
      "I &lt;draw&gt; &lt;animate&gt; &lt;direct&gt; &lt;edit&gt; &lt;write&gt; films that invite you to step inside.",
      "I am available to create for you or your company.",
      "I'm based in Singapore."],
    contact: [["General", "aditisugarcane@gmail.com", "mailto:aditisugarcane@gmail.com"], ["TikTok", "@thrillernightheehee", "https://www.tiktok.com/@thrillernightheehee"], ["Collaborations", "aditisugarcane@gmail.com", "mailto:aditisugarcane@gmail.com"]]
  },
  sound: ["Sound on", "Sound off"],
  info: "info", contact: "contact",
  // the moving headlines live in app/news.js, which is refreshed on a schedule
  ticker: (window.NEWS && window.NEWS.items) || [],
  home: {
    hint: ["scroll down", "to move right"],
    word: "Aditi Anupam",
    role: "Animator & motion designer",
    scenes: {
      films: ["Independent films", "Five films on disc", "Four spec ads and a film about a Viking king."],
      accents: ["Independent project", "TikTok famous", "43.1 million views from a six-line story."],
      motion: ["Motion experiments", "Small loops, big ideas", "Experiment 01 is up. More are on the way."],
      info: ["About", "Who made all this", "An animator in Singapore. Say hello."]
    },
    end: ["That's the whole reel.", "Open the menu", "Back to the start"],
    letter: ["Aditi Anupam is made of a great many things: an artist, a researcher, a hiker, a visionary, a hoarder, an appellation for a unique method of creating, a girl whose work spans everything from intricate spec advertisements to bird paintings and brutalist animations.",
      "But at her core, Aditi is just a human who creates from the belief that a slow-bake approach, one brewed and broiled by a passionate cook through a deeply researched, curatorial process, can yield something special.",
      "I built this website as a &lt;visual index&gt; to showcase my ideas, both big and small. It'll be continuously updated with whatever strange new ideas spill out of my collective mania.",
      "To build something awesome together, give me a <a href=\"#contact\" data-card=\"contact\">shout</a> and I'll be at your service."],
    sign: ["Sincerely,", "Aditi"],
    scenesExtra: { music: ["I love music", "Retunings and restorations", "Ben at 432 Hz, Human Nature in a gymnasium."] }
  },
  about: {
    part: "ABOUT // 01",
    name: ["ADITI", "ANUPAM"],
    hint: "scroll down",
    chapter: "CHAPTER 01 // 01",
    title: "Hi, I'm Aditi",
    lede: "An animator and motion designer in Singapore.",
    body: ["I can build a movie from a set of random cutouts and that's my biggest skill. I work with tools such as CapCut, Adobe Creative Cloud, DaVinci Resolve, Are.na (Pinterest who?) and whatever else the experiment calls for. Always collecting, always creating, always curious.", "Open to work, collaborations and wonderfully strange ideas."],
    pull: "",
    findK: "FIND ME",
    findT: "Say hello",
    availK: "Availability",
    avail: "I'm open to on-site (Singapore) and remote work, starting today (5 November 2026)."
  },
  films: {
    kick: "Independent films", sub: "Five films on disc", side: "Four spec ads and a film about a Viking king. Keep scrolling and the discs come out.",
    title: "A cauldron of motion design, soundscapes, products and a vision.", body: ["I dream up spec ads for brands whose work I admire. The films usually begin as little scenes playing out in my head. I collect these fragments and slowly piece them together digitally."], hint: "scroll down to get to the discs",
    noteT: "A note from the director",
    note: ["Big, lush, spine-tinglingly epic scores made me want to make movies as much as any performance or direction or cinematography did growing up. The very best musical passages have haunted me for decades, even as the films they came from grow murkier in my recollection. I return to those scores when I'm writing, to conjure something words and images can't. These mini films are just the building blocks of what I'm teaching myself to create."],
    go: "( the discs are ready )", skip: "Skip to the discs"
  },
  bruh: "scroll down bruh",
  loading: "Loading",
  credit: "Website and films by Aditi Anupam.",
  copy: "Copyright © Aditi Anupam 2026.",
  pages: {
    accents: { kick: "TikTok famous", sub: "The accent trend, 43.1 million views", side: "A tiny format, an old painting and a six-line story, written twice. Scroll for the whole story.",
      head: "From tongue twisters to 43.1 million views", body: "On 21 June 2026 I posted a set of tongue twisters because I wanted to help people improve their speech (stuttering is not fun). A month later came a six-line story spelled the way an Australian would say it, and the accent series took off. Four months in, the account had been watched 43.1 million times.", body2: "My accent series is loved by millions. Here is how it grew, chapter by chapter.", note: "( five chapters, scroll through them )" },
    motion: { kick: "Motion experiments", sub: "Small loops, big ideas", side: "Short experiments in motion. New ones go up as they are made.",
      head: "Small loops, big ideas", body: "Experiment 01 is up. Five more are on the way." },
    info: { kick: "About", sub: "An animator in Singapore", side: "Drawings, films and a lot of listening to how people talk.",
      head: "Hi, I'm Aditi", body: "I'm an animator and motion designer based in Singapore. I draw, I animate, and I can't stop listening to how people talk. I make films you can experience, not just watch: small moves, big feelings, and a lot of frames drawn by hand.",
      linksHead: "Say hello" }
  }
};
