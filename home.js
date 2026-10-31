(function () {
  'use strict';
  var sc = ScrollCraft.mount(document.body);
  var reduce = ScrollCraft.reduce;
  var clamp01 = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
  var smooth = function (a, b, x) { x = clamp01((x - a) / (b - a)); return x * x * (3 - 2 * x); };
  var vh = innerHeight;
  addEventListener('resize', function () { vh = innerHeight; }, { passive: true });

  function pinned(el) {
    var r = el.getBoundingClientRect();
    return clamp01(-r.top / Math.max(1, r.height - vh));
  }

  /* ---------------- Gateway planes ---------------- */
  var gate = document.getElementById('gate');
  function gateFrame() {
    var p = pinned(gate);
    var s = gate.style;
    s.setProperty('--g-city', p.toFixed(4));
    s.setProperty('--g-title', smooth(0, 0.55, p).toFixed(4));
    s.setProperty('--g-titlefade', smooth(0.28, 0.5, p).toFixed(4));
    var a = smooth(0.05, 0.9, p);
    s.setProperty('--g-arch', (a * a).toFixed(4));
    s.setProperty('--g-archfade', smooth(0.62, 0.86, p).toFixed(4));
    s.setProperty('--g-dust', p.toFixed(4));
    s.setProperty('--g-final', smooth(0.86, 0.94, p).toFixed(4));
    s.setProperty('--g-second', smooth(0.8, 0.95, p).toFixed(4));
    s.setProperty('--g-logo', smooth(0.45, 0.7, p).toFixed(4));
    gateP = p;
    seqDraw(clamp01((p - 0.5) / 0.36));
  }

  /* Logo frame sequence, scrubbed by scroll (frames 1-21; later generated frames show a wrong logo). */
  var gateP = 0, SEQ_N = 21, seqImgs = [], seqIdx = -1, seqCv = document.getElementById('logoSeq'), seqCtx = seqCv.getContext('2d');
  for (var fi = 1; fi <= SEQ_N; fi++) { var im = new Image(); im.onload = function () { seqIdx = -1; }; im.src = 'assets/frames/f' + (fi < 10 ? '0' : '') + fi + '.webp'; seqImgs.push(im); }
  function seqDraw(t) {
    var i = Math.min(SEQ_N - 1, Math.round(t * (SEQ_N - 1)));
    var d = Math.min(devicePixelRatio || 1, 2), w = Math.round(innerWidth * d), h = Math.round(innerHeight * d);
    var resized = seqCv.width !== w || seqCv.height !== h;
    if (resized) { seqCv.width = w; seqCv.height = h; }
    if (i === seqIdx && !resized) return;
    var im = seqImgs[i]; if (!im || !im.complete || !im.naturalWidth) return;
    seqIdx = i;
    seqCtx.fillStyle = '#fff'; seqCtx.fillRect(0, 0, w, h);
    var kc = Math.min(w / im.naturalWidth, h / im.naturalHeight), k = kc;
    if (w < h) { k = Math.max(kc, Math.min(0.82 * w / (0.41 * im.naturalWidth), 0.6 * h / (0.74 * im.naturalHeight))); }
    var iw = im.naturalWidth * k, ih = im.naturalHeight * k;
    gate.style.setProperty('--seq-w', (0.41 * iw / d).toFixed(1) + 'px');
    seqCtx.drawImage(im, (w - iw) / 2, (h - ih) / 2, iw, ih);
  }

  /* Dust: warm motes in the foreground plane, paused offscreen. */
  var dust = document.getElementById('dust'), dctx = dust.getContext('2d'), motes = [], dustOn = true;
  function sizeDust() {
    var d = Math.min(devicePixelRatio || 1, 2);
    dust.width = innerWidth * d; dust.height = innerHeight * d; dctx.setTransform(d, 0, 0, d, 0, 0);
    motes = [];
    var n = Math.round(innerWidth / 22);
    for (var i = 0; i < n; i++) motes.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: 0.6 + Math.random() * 2.2, v: 0.08 + Math.random() * 0.3, w: Math.random() * 6.28, a: 0.15 + Math.random() * 0.5 });
  }
  function drawDust(t) {
    dctx.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < motes.length; i++) {
      var m = motes[i];
      if (!reduce) { m.y -= m.v; m.x += Math.sin(t / 2400 + m.w) * 0.2; if (m.y < -10) { m.y = innerHeight + 10; m.x = Math.random() * innerWidth; } }
      dctx.beginPath(); dctx.arc(m.x, m.y, m.r, 0, 6.283);
      dctx.fillStyle = 'rgba(218,185,110,' + m.a + ')'; dctx.fill();
    }
  }
  sizeDust(); addEventListener('resize', sizeDust, { passive: true });
  new IntersectionObserver(function (e) { dustOn = e[0].isIntersecting; }).observe(gate);

  /* ---------------- Contact arch line ---------------- */
  var homeBox = document.querySelector('.home__arch'), arches = document.querySelectorAll('.home-arch'), archMax = 0;
  arches.forEach(function (a) { a.style.strokeDasharray = '1 1'; a.style.strokeDashoffset = reduce ? 0 : 1; });
  function buildArch() {
    var w = homeBox.clientWidth, h = homeBox.clientHeight, svg = homeBox.querySelector('svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var x0 = 2, x1 = w - 2, mid = w / 2, top = 2, spring = Math.min(h * 0.42, w * 0.5), base = h;
    arches[0].setAttribute('d', 'M' + x0 + ' ' + base + ' V' + spring + ' C' + x0 + ' ' + (spring * 0.55) + ' ' + (w * 0.3) + ' ' + (spring * 0.3) + ' ' + mid + ' ' + top);
    arches[1].setAttribute('d', 'M' + x1 + ' ' + base + ' V' + spring + ' C' + x1 + ' ' + (spring * 0.55) + ' ' + (w * 0.7) + ' ' + (spring * 0.3) + ' ' + mid + ' ' + top);
  }
  buildArch(); addEventListener('resize', buildArch, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(buildArch);
  function homeFrame() {
    if (reduce) return;
    var r = homeBox.getBoundingClientRect();
    var p = clamp01((vh * 0.92 - r.top) / (r.height * 0.75));
    if (p <= archMax && archMax >= 1) return;
    archMax = Math.max(archMax, p);
    var off = (1 - smooth(0, 1, archMax)).toFixed(3);
    arches.forEach(function (a) { a.style.strokeDashoffset = off; });
  }

  /* ---------------- Folio: which chapter are we in ---------------- */
  var folio = document.getElementById('folio');
  var links = folio.querySelectorAll('[data-folio]');
  var chapters = document.querySelectorAll('[data-chapter]');
  function folioFrame() {
    var probe = 60, cur = null;
    for (var i = 0; i < chapters.length; i++) {
      var r = chapters[i].getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) cur = chapters[i];
    }
    if (!cur) return;
    folio.classList.toggle('is-paper', cur.getAttribute('data-ground') === 'paper' || (cur === gate && gateP > 0.6));
    var id = cur.getAttribute('data-chapter');
    for (var k = 0; k < links.length; k++) links[k].setAttribute('aria-current', links[k].getAttribute('data-folio') === id ? 'true' : 'false');
  }

  function frame(t) {
    gateFrame(); homeFrame(); folioFrame();
    if (dustOn) drawDust(t || 0);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------------- Namaz times (Mumbai, Jafari method, via Aladhan) ---------------- */
  (function () {
    var box = document.getElementById('namaz'); if (!box) return;
    var dateEl = document.getElementById('namazDate');
    var key = 'ksij-namaz-' + new Date().toDateString();
    function fmt(t) { var m = /(\d+):(\d+)/.exec(t || ''); if (!m) return '--:--'; var h = +m[1], ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + m[2] + ' ' + ap; }
    function show(d) {
      box.querySelectorAll('[data-t]').forEach(function (e) { e.textContent = fmt(d[e.getAttribute('data-t')]); });
      dateEl.textContent = 'Mumbai · ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    }
    try { var c = JSON.parse(localStorage.getItem(key) || 'null'); if (c) { show(c); return; } } catch (e) {}
    fetch('https://api.aladhan.com/v1/timingsByCity?city=Mumbai&country=India&method=0')
      .then(function (r) { return r.json(); })
      .then(function (j) { var t = j.data.timings; show(t); try { localStorage.setItem(key, JSON.stringify(t)); } catch (e) {} })
      .catch(function () { dateEl.textContent = 'Mumbai · times unavailable'; });
  })();

  /* ---------------- Announcements slider ---------------- */
  (function () {
    var track = document.getElementById('sliderTrack'); if (!track) return;
    var slides = track.children, dots = document.getElementById('sliderDots'), n = slides.length, cur = 0, timer;
    for (var i = 0; i < n; i++) (function (k) { var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Go to announcement ' + (k + 1)); b.addEventListener('click', function () { go(k); }); dots.appendChild(b); })(i);
    function mark() { for (var i = 0; i < n; i++) dots.children[i].setAttribute('aria-current', i === cur ? 'true' : 'false'); }
    function go(k) { cur = (k + n) % n; track.scrollTo({ left: slides[cur].offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' }); mark(); restart(); }
    function restart() { clearInterval(timer); if (!reduce) timer = setInterval(function () { go(cur + 1); }, 5500); }
    document.getElementById('sliderPrev').addEventListener('click', function () { go(cur - 1); });
    document.getElementById('sliderNext').addEventListener('click', function () { go(cur + 1); });
    track.addEventListener('scroll', function () { var k = Math.round(track.scrollLeft / Math.max(1, slides[0].offsetWidth + 16)); if (k !== cur && k >= 0 && k < n) { cur = k; mark(); } }, { passive: true });
    track.addEventListener('pointerenter', function () { clearInterval(timer); });
    track.addEventListener('pointerleave', restart);
    mark(); restart();
  })();

  /* ---------------- Phone sheet ---------------- */
  var sheet = document.getElementById('sheet'), open = folio.querySelector('.menu-btn'), close = sheet.querySelector('.close');
  function setSheet(on) { sheet.classList.toggle('is-open', on); open.setAttribute('aria-expanded', on); if (on) close.focus(); else open.focus(); }
  open.addEventListener('click', function () { setSheet(true); });
  close.addEventListener('click', function () { setSheet(false); });
  sheet.addEventListener('click', function (e) { if (e.target.closest('a')) sheet.classList.remove('is-open'); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && sheet.classList.contains('is-open')) setSheet(false); });

  /* ---------------- Motion layer ---------------- */
  var M = window.Motion, root = document.documentElement;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var EASE = [0.23, 1, 0.32, 1];
  var springy = { type: 'spring', stiffness: 320, damping: 26 };

  /* Arrival: kicker, headline lines and subline rise in sequence. */
  var intro = [document.querySelector('.gate__mark'), document.querySelector('.gate__kicker')]
    .concat([].slice.call(document.querySelectorAll('.gate__title .ln')))
    .concat([document.querySelector('.gate__title p')]);
  if (M && !reduce) {
    intro.forEach(function (e) { e.style.opacity = 0; });
    root.classList.remove('js-intro');
    M.animate(intro, { opacity: [0, 1], y: [30, 0] }, { delay: M.stagger(0.13, { startDelay: 0.3 }), duration: 1, ease: EASE });
    M.animate('.gate__arch img', { scale: [1.09, 1] }, { duration: 2.2, ease: EASE });
    M.animate('.gate__city img', { opacity: [0.2, 1], scale: [1.04, 1] }, { duration: 2.4, ease: EASE });

    if (fine) {
      document.querySelectorAll('.plate').forEach(function (el) {
        el.addEventListener('pointerenter', function () { M.animate(el, { y: -8, scale: 1.012 }, springy); });
        el.addEventListener('pointerleave', function () { M.animate(el, { y: 0, scale: 1 }, { type: 'spring', stiffness: 240, damping: 24 }); });
      });
      document.querySelectorAll('.btn').forEach(function (b) {
        b.addEventListener('pointermove', function (e) {
          var r = b.getBoundingClientRect();
          M.animate(b, { x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.28 }, { type: 'spring', stiffness: 380, damping: 22 });
        });
        b.addEventListener('pointerleave', function () { M.animate(b, { x: 0, y: 0, scale: 1 }, { type: 'spring', stiffness: 300, damping: 18 }); });
      });
    }
    document.querySelectorAll('.btn, .menu-btn').forEach(function (b) {
      b.addEventListener('pointerdown', function () { M.animate(b, { scale: 0.96 }, { duration: 0.1 }); });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
        b.addEventListener(ev, function () { M.animate(b, { scale: 1 }, { type: 'spring', stiffness: 500, damping: 20 }); });
      });
    });
    document.querySelector('.folio .menu-btn').addEventListener('click', function () {
      M.animate(sheet.querySelectorAll('li, .btn'), { opacity: [0, 1], y: [18, 0] }, { delay: M.stagger(0.045, { startDelay: 0.05 }), duration: 0.45, ease: EASE });
    });
  } else {
    root.classList.remove('js-intro');
  }
})();
