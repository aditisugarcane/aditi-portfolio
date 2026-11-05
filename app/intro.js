/* The intro: a printer prints the visitor a VIP guest pass.
   Built after printer-animation.vercel.app (same sizes, springs, timings and slider), with the payslip swapped
   for a guest pass. Once printed, the pass is real paper: grab it and it bends, swings and settles (WebGL cloth). */
(() => {
  const C = (window.COPY && window.COPY.intro) || {};
  const $ = (s, r = document) => r.querySelector(s);
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const sess = { get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };
  if (/[?&]skip/.test(location.search)) {   // the printer plays on every visit; ?skip is for testing
    document.documentElement.classList.add("in-site"); return; }

  /* ---------- the numbers from the original */
  const Ht = { printerDelay: .06, feedDelay: .2, feedDuration: 1.5, floatY: 8, floatDuration: 2 };
  const Ma = 460, Ju = Math.round(460 * 273 / 915), QP = Math.round(202 * 460 / 915), ZP = Math.round(88 * 460 / 915);
  const Cv = Math.round(742 * 460 / 915), kv = Math.round(1066 * 460 / 915), Qf = 741, Ev = 1065, Aa = -488;
  const JP = 300, DONE_MT = kv + QP - Ju + 30, Mv = 326, wr = 52, tc = 2, nc = Mv - tc * 2, iC = (nc - wr) * .82, Bp = "cubic-bezier(0.25, 0, 0.35, 1)";

  /* ---------- sound */
  const sfx = {};
  const snd = (k, vol = 1) => { try { const a = sfx[k] || (sfx[k] = new Audio(`media/sfx2/${k}.mp3`)); const b = a.cloneNode(); b.volume = vol; b.play().catch(() => {}); } catch (e) {} };
  ["print", "paper", "tick", "slide"].forEach(k => { try { sfx[k] = new Audio(`media/sfx2/${k}.mp3`); sfx[k].preload = "auto"; } catch (e) {} });

  /* ---------- markup */
  const root = document.createElement("div"); root.className = "pr"; root.setAttribute("role", "dialog"); root.setAttribute("aria-label", C.title || "Your guest pass");
  const chev = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6.5l3.5 3.5L6 13.5M10.5 6.5l3.5 3.5-3.5 3.5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const body = "M6.453 37.318C14.594 15.499 38.726 0.953984 61.536 0.895984C108.174 0.776984 154.813 0.878974 201.452 0.885974L480.59 0.896991L730.13 0.891986C771.31 0.888986 812.84 0.670002 854.03 0.959002C860.55 1.005 867.79 2.18498 873.9 4.43398C888.87 9.83798 900.99 21.132 907.42 35.692C915.2 47.969 914.97 85.885 913.63 100.47C913.68 113.99 914.87 170.736 912.15 180.64C910.61 203.777 911.67 245.055 894.29 261.033C879.54 274.596 856.57 272.256 837.84 272.04L837.83 256.793L837.82 245.209L79.047 245.216L79.05 256.901L79.092 272.008C66.206 272.223 52.641 273.578 40.869 268.495C13.146 256.739 13.016 222.537 8.55298 196.177C-2.92702 174.888 1.21802 120.221 1.30902 94.199C0.445022 78.162 -0.093996 51.577 6.453 37.318Z";
  root.innerHTML = `
    <div class="pr-col">
      <div class="pr-box" style="width:${Ma}px;height:${Ju}px">
        <div class="pr-mask"></div>
        <canvas class="pr-paper" aria-hidden="true"></canvas>
        <div class="pr-printer" style="width:${Ma}px;height:${Ju}px">
          <svg width="${Ma}" height="${Ju}" viewBox="0 0 915 273" fill="none" aria-hidden="true"><defs>
            <linearGradient id="prBody" x1="0" y1="0" x2="0" y2="273" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#e9e9ff"/><stop offset="38%" stop-color="#dde8fb"/><stop offset="100%" stop-color="#cce5f1"/></linearGradient>
            <radialGradient id="prSatin" cx="50%" cy="18%" rx="39%" ry="29%"><stop offset="0%" stop-color="rgba(255,255,255,0.60)"/><stop offset="36%" stop-color="rgba(255,255,255,0.26)"/><stop offset="68%" stop-color="rgba(255,255,255,0)"/></radialGradient>
            <linearGradient id="prEdge" x1="0" y1="0" x2="915" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="rgba(0,0,0,0.13)"/><stop offset="5%" stop-color="rgba(0,0,0,0)"/><stop offset="95%" stop-color="rgba(0,0,0,0)"/><stop offset="100%" stop-color="rgba(0,0,0,0.13)"/></linearGradient></defs>
            <path d="${body}" fill="url(#prBody)"/><path d="${body}" fill="url(#prSatin)"/><path d="${body}" fill="url(#prEdge)"/>
            <path d="M12.185 198.952C18.021 204.52 21.809 209.803 29 214.484C51.911 229.399 87.703 224.591 114.766 224.601L228.8 224.578L581.68 224.561L776.5 224.574L826.74 224.712C860.57 224.809 886.81 226.691 906.02 192.246C908.2 188.344 909.55 184.247 912.15 180.64C910.61 203.777 911.67 245.055 894.29 261.033C879.54 274.596 856.57 272.256 837.84 272.04L837.83 256.793L837.82 245.209L79.047 245.216L79.05 256.901L79.092 272.008C66.206 272.223 52.641 273.578 40.869 268.495C13.146 256.739 13.016 222.537 8.55298 196.177L10.074 195.805C11.138 197.159 11.572 197.418 12.185 198.952Z" fill="rgba(0,0,0,0.07)"/>
            <path d="M79.05 256.901C70.623 257.056 63.632 258.241 57.038 251.901C47.845 243.062 58.301 234.462 67.603 234.216C85.768 233.736 104.006 233.979 122.182 234.024L230.618 234.086L692.27 234.076L806.7 234.074C820.89 234.074 836.81 233.625 850.99 234.535C856.65 234.897 863.08 242.207 860.14 247.942C855.66 258.055 846.8 257.139 837.83 256.793L837.82 245.209L79.047 245.216L79.05 256.901Z" fill="#060614"/>
          </svg>
        </div>
      </div>
      <div class="pr-ui" style="margin-top:${JP}px">
        <div class="pr-idle">
          <div class="pr-words"><h1>${C.title || "You're on the guest list"}</h1><p>${C.sub || "Welcome to my side of the internet. Your pass is ready, let's print it."}</p></div>
          <div class="pr-slider" style="width:${Mv}px">
            <div class="pr-track"><i></i></div>
            <p class="pr-label">${C.slide || "Slide to print your pass"}</p>
            <div class="pr-knob" role="slider" tabindex="0" aria-label="${C.slide || "Slide to print your pass"}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">${chev.repeat(8)}<i></i></div>
          </div>
        </div>
        <div class="pr-done" hidden><p class="pr-hint">${C.hint || "It's real paper. Grab it."}</p><button class="pr-enter" type="button">${C.enter || "Enter"}<svg viewBox="0 0 16 10" aria-hidden="true"><path d="M1 5h13M10 1l4 4-4 4"/></svg></button></div>
      </div>
    </div>
    <button class="pr-skip" type="button">${C.skip || "Skip"}</button>`;
  document.body.appendChild(root); document.documentElement.classList.add("pr-on");
  const col = $(".pr-col", root), printer = $(".pr-printer", root), ui = $(".pr-ui", root), cv = $(".pr-paper", root);

  /* ---------- fit everything to the window, like the original at full size */
  function fitCol() {
    const need = 72 + QP + kv + Ht.floatY + 110, s = Math.min(1, (innerHeight - 8) / need, (innerWidth - 24) / (Ma + 20));
    col.style.transform = `scale(${s.toFixed(4)})`; col.style.marginBottom = `${((s - 1) * need).toFixed(1)}px`;
  }
  fitCol(); addEventListener("resize", fitCol);

  /* ---------- the printer drops in on a spring (stiffness 200, damping 22) */
  (function springIn() {
    const k = 200, c = 22; let x = 1, v = 0, t0 = null;
    if (calm) { printer.style.opacity = 1; return; }
    printer.style.opacity = 0;
    const step = now => {
      if (t0 == null) t0 = now; const el = (now - t0) / 1000;
      if (el < Ht.printerDelay) return requestAnimationFrame(step);
      for (let i = 0; i < 4; i++) { const a = -k * x - c * v; v += a / 240; x += v / 240; }
      printer.style.opacity = Math.max(0, Math.min(1, 1 - x)).toFixed(3);
      printer.style.transform = `translateY(${(28 * x).toFixed(2)}px) scale(${(1 - .12 * x).toFixed(4)})`;
      if (Math.abs(x) > .0005 || Math.abs(v) > .0005) requestAnimationFrame(step); else { printer.style.transform = ""; printer.style.opacity = 1; }
    };
    requestAnimationFrame(step);
  })();

  /* ---------- the pass, drawn on paper (741 x 1065 units, like the original receipt) */
  const no = (() => { const n = 1000000 + Math.floor(Math.random() * 8999999); return n.toLocaleString("en-US"); })();
  const now = new Date(), issued = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const P = C.pass || {};
  const TEX_W = 1024, TEX_H = 1472; // power-of-two-ish texture, the receipt is drawn at 1.38x
  const tex = document.createElement("canvas"); tex.width = TEX_W; tex.height = TEX_H;
  function scallopPath(x) {
    // the receipt outline: rounded corners, a row of half-circle bites along the top and bottom edges
    const W = 741, H = 1064.71, R = 24.55, br = 18.4, cy = 8.2, xs = Array.from({ length: 14 }, (_, i) => 60.6 + i * 47.95);
    x.beginPath(); x.moveTo(R, 0);
    xs.forEach(c => { const hw = Math.sqrt(br * br - cy * cy); x.lineTo(c - hw, 0); x.arc(c, cy, br, Math.PI + Math.asin(cy / br), -Math.asin(cy / br), true); });
    x.lineTo(W - R, 0); x.arcTo(W, 0, W, R, R); x.lineTo(W, H - R); x.arcTo(W, H, W - R, H, R);
    [...xs].reverse().forEach(c => { const hw = Math.sqrt(br * br - cy * cy); x.lineTo(c + hw, H); x.arc(c, H - cy, br, Math.asin(cy / br), Math.PI - Math.asin(cy / br), true); });
    x.lineTo(R, H); x.arcTo(0, H, 0, H - R, R); x.lineTo(0, R); x.arcTo(0, 0, R, 0, R); x.closePath();
  }
  function drawPass() {
    const x = tex.getContext("2d"), k = TEX_W / Qf; x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, TEX_W, TEX_H); x.setTransform(k, 0, 0, k, 0, 0);
    scallopPath(x); x.fillStyle = "#ffffff"; x.fill();
    const serif = "'Adobe Caslon', 'Caslon', Georgia, serif", disp = "'NY Irvin', 'Adobe Caslon', Georgia, serif", hand = "Belmonte, cursive";
    const ink = "#181b25", grey = "#525866", line = "#e1e4ea";
    const T = (s, px, py, font, col, align = "left", ls = 0) => { x.font = font; x.fillStyle = col; x.textAlign = align; x.textBaseline = "alphabetic"; if ("letterSpacing" in x) x.letterSpacing = ls + "px"; x.fillText(s, px, py); if ("letterSpacing" in x) x.letterSpacing = "0px"; };
    const rr = (px, py, w, h, r) => { x.beginPath(); x.roundRect ? x.roundRect(px, py, w, h, r) : x.rect(px, py, w, h); };
    const L = 24.55, Wd = 691.9;
    // header
    T(P.head || "VIP Guest Pass", L, 92, `400 31px ${disp}`, ink, "left", .2);
    const nt = `${P.noLabel || "No."} ${no}`; x.font = `600 18.4px ${serif}`; const nw = x.measureText(nt).width + 24.5;
    rr(L + Wd - nw, 62, nw, 37, 6); x.fillStyle = "#fff"; x.fill(); x.lineWidth = 1.53; x.strokeStyle = line; x.stroke();
    T(nt, L + Wd - nw / 2, 86.5, `600 18.4px ${serif}`, grey, "center");
    // guest / host card
    rr(L, 123.38, Wd, 184, 18.41); let g = x.createLinearGradient(0, 123, 0, 307); g.addColorStop(0, "rgba(233,233,255,0.2)"); g.addColorStop(1, "rgba(204,229,241,0.2)"); x.fillStyle = g; x.fill();
    const lab = (s, px, py, al) => T(s.toUpperCase(), px, py, `600 15px ${serif}`, grey, al, 2.2);
    lab(P.guestLabel || "Guest", L + 24.55, 166, "left"); lab(P.hostLabel || "Host", L + Wd - 24.55, 166, "right");
    T(P.guest || "You", L + 24.55, 205, `600 23px ${serif}`, ink); T(P.guestLine || "Honoured guest", L + 24.55, 236, `400 21.5px ${serif}`, grey); T(P.admit || "Admit one", L + 24.55, 266, `400 18.4px ${serif}`, grey);
    T(P.host || "Aditi Anupam", L + Wd - 24.55, 205, `600 23px ${serif}`, ink, "right"); T(P.hostLine || "Animator & motion designer", L + Wd - 24.55, 236, `400 21.5px ${serif}`, grey, "right"); T(P.hostCity || "Singapore", L + Wd - 24.55, 266, `400 18.4px ${serif}`, grey, "right");
    // two sections of rows
    const section = (top, title, rows, total) => {
      lab(title, L, top + 20, "left"); let y = top + 24.55 + 12.27;
      rows.forEach(([a, b]) => { T(a, L, y + 23, `400 21.5px ${serif}`, grey); T(b, L + Wd, y + 23, `600 21.5px ${serif}`, ink, "right"); y += 30.68 + 12.27; });
      x.fillStyle = line; x.fillRect(L, y, Wd, 1.53); y += 1.53 + 12.27;
      T(total[0], L, y + 23, `600 21.5px ${serif}`, ink); T(total[1], L + Wd, y + 23, `700 21.5px ${serif}`, ink, "right"); y += 30.68 + 12.27;
      x.fillStyle = line; x.fillRect(L, y, Wd, 1.53);
    };
    section(332, P.accessLabel || "Access", P.access || [["All access", "Included"], ["VIP lounge", "Included"], ["Films", "Front row"], ["Motion experiments", "Backstage"]], P.accessTotal || ["Pass type", "All access + VIP"]);
    section(620, P.detailsLabel || "Details", [[P.issuedLabel || "Issued", issued], [P.timeLabel || "Time", time], [P.validLabel || "Valid", P.valid || "Forever & always"], [P.dressLabel || "Dress code", P.dress || "Come as you are"]], P.detailsTotal || ["Seat", "Wherever you like"]);
    // the note
    rr(L, 921.14, Wd, 104, 18.41); g = x.createLinearGradient(L, 921, L + 40, 1025); g.addColorStop(.25, "rgba(93,208,231,0.15)"); g.addColorStop(1, "rgba(115,0,255,0.15)"); x.fillStyle = g; x.fill();
    const note = P.note || ["Welcome to my side of the internet,", "I'm glad you're here."];
    T(note[0], L + 24.55, 961, `italic 400 21px ${serif}`, ink); T(note[1], L + 24.55, 990, `italic 400 21px ${serif}`, ink);
    T(P.sign || "love, aditi", L + Wd - 26, 984, `400 34px ${hand}`, "#22379b", "right");
  }

  /* ---------- WebGL paper: a cloth of particles, pinned along the top inside the printer */
  const NX = 15, NY = 22, PADX = 240, PADT = 30, PADB = 300;
  const PW = Cv, PH = kv, dx = PW / (NX - 1), dy = PH / (NY - 1);
  const CW = PW + PADX * 2, CH = PH + PADT + PADB, OX = PADX, OY = PADT; // paper's rest corner inside the canvas
  cv.style.left = (ZP - PADX) + "px"; cv.style.top = (QP - PADT) + "px"; cv.style.width = CW + "px"; cv.style.height = CH + "px";
  const dpr = Math.min(2, devicePixelRatio || 1); cv.width = Math.round(CW * dpr); cv.height = Math.round(CH * dpr);
  const gl = cv.getContext("webgl", { premultipliedAlpha: true, antialias: true, alpha: true });
  const N = NX * NY, pos = new Float32Array(N * 3), prev = new Float32Array(N * 3), pin = new Uint8Array(N);
  let offY = Aa, free = false;
  for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) { const p = (j * NX + i) * 3; pos[p] = OX + i * dx; pos[p + 1] = OY + j * dy + offY; pos[p + 2] = 0; prev.set(pos.subarray(p, p + 3), p); if (j === 0) pin[j * NX + i] = 1; }
  const cons = [];
  const addC = (a, b) => { const pa = a * 3, pb = b * 3; cons.push(a, b, Math.hypot(pos[pa] - pos[pb], pos[pa + 1] - pos[pb + 1])); };
  for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
    const a = j * NX + i;
    if (i < NX - 1) addC(a, a + 1); if (j < NY - 1) addC(a, a + NX);
    if (i < NX - 1 && j < NY - 1) { addC(a, a + NX + 1); addC(a + 1, a + NX); }
    if (i < NX - 2) addC(a, a + 2); if (j < NY - 2) addC(a, a + NX * 2);
  }
  const consF = new Float32Array(cons);
  let prog, buf, ibuf, uvbuf, nbuf, nIdx, normals = new Float32Array(N * 3), texGL, uRes, ok = !!gl;
  function glInit() {
    if (!gl) return;
    const vs = `attribute vec3 p;attribute vec2 uv;attribute vec3 n;uniform vec2 res;varying vec2 vUv;varying vec3 vN;
      void main(){float f=1400.0/(1400.0-p.z);vec2 c=vec2(${(OX + PW / 2).toFixed(1)},${(OY + PH * .3).toFixed(1)});vec2 q=c+(p.xy-c)*f;
      gl_Position=vec4(q.x/res.x*2.0-1.0,1.0-q.y/res.y*2.0,0.0,1.0);vUv=uv;vN=n;}`;
    const fs = `precision mediump float;uniform sampler2D t;varying vec2 vUv;varying vec3 vN;
      void main(){vec4 c=texture2D(t,vUv);vec3 n=normalize(vN);float back=1.0;if(n.z<0.0){n=-n;back=0.93;}vec3 L=normalize(vec3(-0.35,-0.55,1.0));
      float d=dot(n,L)/L.z;float s=clamp(mix(1.0,d,0.9),0.62,1.0);
      gl_FragColor=vec4(c.rgb*s*back,c.a);}`;
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
    prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { ok = false; return; }
    gl.useProgram(prog);
    const uv = new Float32Array(N * 2), vH = 1065 / Qf * TEX_W / TEX_H; // the receipt fills the texture width, and this much of its height
    for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) { const k = j * NX + i; uv[k * 2] = i / (NX - 1); uv[k * 2 + 1] = j / (NY - 1) * vH; }
    const idx = []; for (let j = 0; j < NY - 1; j++) for (let i = 0; i < NX - 1; i++) { const a = j * NX + i; idx.push(a, a + 1, a + NX, a + 1, a + NX + 1, a + NX); }
    nIdx = idx.length;
    buf = gl.createBuffer(); nbuf = gl.createBuffer(); uvbuf = gl.createBuffer(); ibuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvbuf); gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibuf); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);
    texGL = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texGL);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    uRes = gl.getUniformLocation(prog, "res"); gl.uniform1i(gl.getUniformLocation(prog, "t"), 0);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  }
  function computeNormals() {
    normals.fill(0);
    for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
      const k = j * NX + i, l = j * NX + Math.max(0, i - 1), r = j * NX + Math.min(NX - 1, i + 1), u = Math.max(0, j - 1) * NX + i, d = Math.min(NY - 1, j + 1) * NX + i;
      const ax = pos[r * 3] - pos[l * 3], ay = pos[r * 3 + 1] - pos[l * 3 + 1], az = pos[r * 3 + 2] - pos[l * 3 + 2];
      const bx = pos[d * 3] - pos[u * 3], by = pos[d * 3 + 1] - pos[u * 3 + 1], bz = pos[d * 3 + 2] - pos[u * 3 + 2];
      // screen y points down, so this cross gives +z for a flat sheet facing us
      normals[k * 3] = ay * bz - az * by; normals[k * 3 + 1] = az * bx - ax * bz; normals[k * 3 + 2] = ax * by - ay * bx;
    }
  }
  function draw() {
    if (!ok) return;
    computeNormals();
    gl.viewport(0, 0, cv.width, cv.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uRes, CW, CH);
    const ap = gl.getAttribLocation(prog, "p"), an = gl.getAttribLocation(prog, "n"), au = gl.getAttribLocation(prog, "uv");
    gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW); gl.enableVertexAttribArray(ap); gl.vertexAttribPointer(ap, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, nbuf); gl.bufferData(gl.ARRAY_BUFFER, normals, gl.DYNAMIC_DRAW); gl.enableVertexAttribArray(an); gl.vertexAttribPointer(an, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, uvbuf); gl.enableVertexAttribArray(au); gl.vertexAttribPointer(au, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibuf); gl.drawElements(gl.TRIANGLES, nIdx, gl.UNSIGNED_SHORT, 0);
  }
  // a flat 2D fallback when WebGL isn't there
  const flat = !gl;
  if (flat) { cv.width = Math.round(CW * dpr); }
  function drawFlat() { const x = cv.getContext("2d"); x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, CW, CH); x.drawImage(tex, OX, OY + offY, PW, PW * TEX_H / TEX_W); }

  /* the sheet moves as one piece while printing, then turns into cloth */
  function setRigid(y) { offY = y; for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) { const p = (j * NX + i) * 3; pos[p] = OX + i * dx; pos[p + 1] = OY + j * dy + y; pos[p + 2] = 0; prev[p] = pos[p]; prev[p + 1] = pos[p + 1]; prev[p + 2] = 0; } }
  let grab = -1, gx = 0, gy = 0, last = 0, acc = 0, floatT0 = 0;
  function physics(h) {
    const g = 1700, damp = .985;
    for (let k = 0; k < N; k++) {
      const p = k * 3; if (pin[k] || k === grab) continue;
      const vx = (pos[p] - prev[p]) * damp, vy = (pos[p + 1] - prev[p + 1]) * damp, vz = (pos[p + 2] - prev[p + 2]) * damp;
      prev[p] = pos[p]; prev[p + 1] = pos[p + 1]; prev[p + 2] = pos[p + 2];
      pos[p] += vx; pos[p + 1] += vy + g * h * h; pos[p + 2] += vz - pos[p + 2] * .004; // paper wants to lie flat again
    }
    if (grab > -1) { const p = grab * 3; prev[p] = pos[p]; prev[p + 1] = pos[p + 1]; prev[p + 2] = pos[p + 2]; pos[p] += (gx - pos[p]) * .35; pos[p + 1] += (gy - pos[p + 1]) * .35; pos[p + 2] += (60 - pos[p + 2]) * .2; }
    for (let it = 0; it < 10; it++) for (let c = 0; c < consF.length; c += 3) {
      const a = consF[c], b = consF[c + 1], L = consF[c + 2], pa = a * 3, pb = b * 3;
      const ddx = pos[pb] - pos[pa], ddy = pos[pb + 1] - pos[pa + 1], ddz = pos[pb + 2] - pos[pa + 2], d = Math.hypot(ddx, ddy, ddz) || 1e-6;
      const wa = (pin[a] || a === grab) ? 0 : 1, wb = (pin[b] || b === grab) ? 0 : 1, w = wa + wb; if (!w) continue;
      const diff = (d - L) / d / w;
      pos[pa] += ddx * diff * wa; pos[pa + 1] += ddy * diff * wa; pos[pa + 2] += ddz * diff * wa;
      pos[pb] -= ddx * diff * wb; pos[pb + 1] -= ddy * diff * wb; pos[pb + 2] -= ddz * diff * wb;
    }
  }
  function loop(now) {
    if (!root.isConnected) return; requestAnimationFrame(loop);
    const dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
    if (free) {
      // the top edge bobs out of the printer like the original float (8px, 2s, ease in-out)
      const t = (now - floatT0) / 1000, yb = calm ? 0 : Ht.floatY * (.5 - .5 * Math.cos(Math.PI * t / Ht.floatDuration));
      for (let i = 0; i < NX; i++) { const p = i * 3; pos[p] = OX + i * dx; pos[p + 1] = OY + yb; pos[p + 2] = 0; }
      acc += dt; const h = 1 / 120; let n = 0; while (acc >= h && n < 6) { physics(h); acc -= h; n++; } if (n === 6) acc = 0;
    }
    flat ? drawFlat() : draw();
  }

  /* ---------- printing */
  const ease = { p2out: t => 1 - Math.pow(1 - t, 3) }; // GSAP power2.out
  function print() {
    snd("tick", .5); setTimeout(() => snd("print", .9), Ht.feedDelay * 1000 - 40);
    ui.style.transition = `margin-top ${Ht.feedDuration}s cubic-bezier(.25,0,.35,1) ${Ht.feedDelay}s`; ui.style.marginTop = DONE_MT + "px";
    $(".pr-idle", root).classList.add("out");
    const t0 = performance.now() + Ht.feedDelay * 1000;
    (function feed(now) {
      const t = Math.max(0, Math.min(1, (now - t0) / (Ht.feedDuration * 1000)));
      setRigid(Aa * (1 - ease.p2out(t)));
      if (t < 1) return requestAnimationFrame(feed);
      setTimeout(() => {
        free = true; floatT0 = performance.now(); cv.classList.add("live");
        // a tiny sideways nudge so the paper settles with a little life in it
        if (!calm) for (let j = NY - 6; j < NY; j++) for (let i = 0; i < NX; i++) prev[(j * NX + i) * 3 + 2] -= (j - NY + 7) * .6;
        $(".pr-idle", root).hidden = true; const d = $(".pr-done", root); d.hidden = false; requestAnimationFrame(() => d.classList.add("in"));
      }, 200);
    })(performance.now());
  }

  /* ---------- the slider, exactly like the original */
  (function slider() {
    const knob = $(".pr-knob", root), label = $(".pr-label", root);
    let w = wr, down = false, start = 0, w0 = wr, doneS = false;
    const set = (v, anim) => { w = v; knob.style.transition = anim ? `width ${anim}s ${Bp}` : "none"; knob.style.width = v + "px"; knob.setAttribute("aria-valuenow", Math.round((v - wr) / (nc - wr) * 100)); };
    set(wr, 0);
    const finish = () => { doneS = true; down = false; label.style.opacity = 0; knob.classList.add("full"); set(nc, .42); knob.style.cursor = "default"; setTimeout(print, 500); };
    knob.addEventListener("pointerdown", e => { if (doneS) return; down = true; start = e.clientX; w0 = w; knob.setPointerCapture(e.pointerId); });
    knob.addEventListener("pointermove", e => { if (!down || doneS) return; const sc = parseFloat((col.style.transform.match(/scale\(([\d.]+)/) || [0, 1])[1]); const v = Math.max(wr, Math.min(nc, w0 + (e.clientX - start) / sc)); set(v, 0); if (v - wr >= iC) finish(); });
    const up = () => { if (!down) return; down = false; if (!doneS) set(wr, .3); };
    knob.addEventListener("pointerup", up); knob.addEventListener("pointercancel", up);
    knob.addEventListener("keydown", e => { if (!doneS && (e.key === "Enter" || e.key === " " || e.key === "ArrowRight")) { e.preventDefault(); finish(); } });
  })();

  /* ---------- grabbing the paper */
  function pick(e) {
    const r = cv.getBoundingClientRect(), sx = CW / r.width, x = (e.clientX - r.left) * sx, y = (e.clientY - r.top) * sx;
    let best = -1, bd = 1e9; for (let k = NX; k < N; k++) { const d = Math.hypot(pos[k * 3] - x, pos[k * 3 + 1] - y); if (d < bd) { bd = d; best = k; } }
    return { k: bd < Math.max(dx, dy) * 1.1 ? best : -1, x, y };
  }
  // the canvas lets clicks through; the page decides whether the pointer is on the paper
  root.addEventListener("pointerdown", e => { if (!free || e.target.closest("button,.pr-ui")) return; const p = pick(e); if (p.k < 0) return; grab = p.k; gx = p.x; gy = p.y; root.setPointerCapture(e.pointerId); root.classList.add("grabbing"); snd("paper", .55); });
  root.addEventListener("pointermove", e => { if (grab < 0) { if (free) root.classList.toggle("over-paper", !e.target.closest("button") && pick(e).k > -1); return; } const p = pick(e); gx = p.x; gy = p.y; });
  const rel = () => { if (grab < 0) return; grab = -1; root.classList.remove("grabbing"); };
  root.addEventListener("pointerup", rel); root.addEventListener("pointercancel", rel);

  /* ---------- into the site */
  function enter() {
    sess.set("aa-in", "1"); snd("slide", .45);
    root.classList.add("leave"); document.documentElement.classList.add("in-site");
    document.dispatchEvent(new CustomEvent("intro:done"));
    setTimeout(() => { root.remove(); document.documentElement.classList.remove("pr-on"); }, 900);
  }
  $(".pr-enter", root).addEventListener("click", enter);
  $(".pr-skip", root).addEventListener("click", enter);

  /* ---------- start once the fonts are in, so the pass is drawn with them */
  const fonts = ["400 31px 'NY Irvin'", "400 20px 'Adobe Caslon'", "600 20px 'Adobe Caslon'", "italic 400 20px 'Adobe Caslon'", "700 20px 'Adobe Caslon'", "400 30px Belmonte"];
  Promise.race([Promise.all(fonts.map(f => document.fonts.load(f))), new Promise(r => setTimeout(r, 2500))]).then(() => {
    drawPass(); glInit(); setRigid(Aa); requestAnimationFrame(loop);
  });
})();
