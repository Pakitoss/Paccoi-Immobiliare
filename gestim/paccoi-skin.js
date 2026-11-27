/* =========================================================
   PACCOI — piccoli ritocchi al sito Gestim
   - barra di ricerca sotto lo slider, sovrapposta (come nel prototipo)
   - comparsa morbida delle sezioni
   - musica di sottofondo bossa nova (assets/music.js)
   Se qualcosa non trova l'elemento atteso, non fa nulla.
   ========================================================= */
(function () {
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/gestim\/paccoi-skin\.js.*$/, "");

  function ready(fn) { document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn(); }

  ready(function () {
    document.documentElement.classList.add("pk-skin");

    // home: la ricerca va sotto lo slider, a cavallo tra foto e contenuti
    var slide = document.querySelector("main > .homeslide"), cerca = document.querySelector("main > .cercaHome");
    if (slide && cerca && window.innerWidth > 991) {
      slide.after(cerca);
      cerca.style.cssText += ";position:relative;z-index:5;margin-top:-70px;margin-bottom:-20px";
    }

    // comparsa morbida delle sezioni principali
    if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var els = document.querySelectorAll(".benvenuto .text, .immobilihome h2, .immobili_listhome, .homeBox3 h2, .homeBox3 .card, .staffhome h3, .contattacihome .contentbox, .immobili_listgriglia, .dettaglio");
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("pk-in"); io.unobserve(e.target); } });
      }, { threshold: 0.08 });
      els.forEach(function (el) {
        if (el.getBoundingClientRect().top > innerHeight) { el.classList.add("pk-reveal"); io.observe(el); }
      });
    }

    // musica di sottofondo
    if (BASE && !document.querySelector(".music-btn")) {
      var s = document.createElement("script");
      s.src = BASE + "assets/music.js";
      s.defer = true;
      document.body.appendChild(s);
    }
  });
})();

/* =========================================================
   V2 — più vicino al prototipo. Ogni passo è protetto:
   se Gestim cambia la pagina e un elemento manca, si salta.
   ========================================================= */
(function () {
  function ready(fn) { document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn(); }
  function safe(fn) { try { fn(); } catch (e) { if (window.console) console.warn("paccoi-skin", e); } }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function eyebrow(txt) { return el("div", "pk-eyebrow", txt); }
  var BASE = location.origin;

  ready(function () {
    document.body.classList.add("pk-v2");

    // header: bottone "Contattaci" accanto al telefono
    safe(function () {
      var lt = document.querySelector("header#headerPage .contentbox .langtel");
      if (lt && !lt.querySelector(".pk-cta")) {
        var a = el("a", "pk-cta", "Contattaci");
        var c = document.querySelector(".contattacihome");
        a.href = c ? "#" + (c.id || (c.id = "pk-contatti")) : BASE + "/contatti/";
        lt.appendChild(a);
      }
    });

    // hero: "cambiare casa!" in corsivo dorato
    safe(function () {
      document.querySelectorAll(".homeslide .carousel-caption .title").forEach(function (t) {
        if (!t.querySelector("em")) t.innerHTML = t.innerHTML.trim().replace(/(cambiare casa!?)/i, "<em>$1</em>").replace(/^E'\s*/, "È ");
      });
    });

    // chi siamo
    safe(function () {
      var tx = document.querySelector(".benvenuto .text"), h = tx && tx.querySelector("h1");
      if (!h || tx.querySelector(".pk-col")) return;
      var left = el("div", "pk-col pk-col-l"), right = el("div", "pk-col pk-col-r");
      [].slice.call(tx.children).forEach(function (c) { if (c !== h && !c.classList.contains("clear")) right.appendChild(c); });
      left.appendChild(eyebrow("Chi siamo")); left.appendChild(h);
      tx.insertBefore(right, tx.firstChild); tx.insertBefore(left, right);
    });

    // selezionati per te: etichetta + link a destra, prezzo sotto il titolo
    safe(function () {
      var sec = document.querySelector(".immobilihome"), h = sec && sec.querySelector("h2");
      if (h && !sec.querySelector(".pk-head")) {
        var head = el("div", "pk-head"), left = el("div");
        left.appendChild(eyebrow("Immobili"));
        h.parentNode.insertBefore(head, h); left.appendChild(h); head.appendChild(left);
        var l = el("a", "pk-link", "Vedi tutti gli immobili <span aria-hidden=\"true\">→</span>"); l.href = BASE + "/immobili/";
        head.appendChild(l);
      }
      document.querySelectorAll(".immobili_listhome").forEach(function (c) {
        var p = c.querySelector("figure .prezzo"), t = c.querySelector(".boxdettagli .titolo");
        if (p && t && !c.querySelector(".pk-price")) { var d = el("div", "pk-price"); d.textContent = p.textContent.trim(); t.after(d); }
      });
    });

    // cerca nella tua zona (nuova sezione, porta alla ricerca Gestim per comune)
    safe(function () {
      var after = document.querySelector("main > .immobilihome");
      if (!after || document.querySelector(".pk-zone")) return;
      // foto: un immobile di quel comune (se un giorno sparisce, resta il riquadro senza foto)
      var C = "https://cdn4.gestim.biz/custom/01700/foto/";
      var towns = [
        ["San Benedetto del Tronto", 6278, "2026/10/2026102401457-60.jpeg"],
        ["Grottammare", 3344, "2026/03/20260311171508-5.jpg"],
        ["Ripatransone", 5910, "20221027105957-1.jpg"],
        ["Acquaviva Picena", 307, "G1522260501922473.jpg"],
        ["Monteprandone", 4529, "2026/10/2026101290031-46.jpeg"],
        ["Cupra Marittima", 2536, "2024071214555499.jpg"]
      ];
      var sec = el("section", "pk-zone");
      sec.innerHTML = '<div class="pk-head"><div><div class="pk-eyebrow">Zone</div><h2>Cerca nella tua zona</h2></div><a class="pk-link" href="' + BASE + '/immobili/">Tutte le zone <span aria-hidden="true">→</span></a></div><div class="pk-towns"></div>';
      var grid = sec.querySelector(".pk-towns");
      towns.forEach(function (t) {
        var a = el("a", "pk-town"); a.href = BASE + "/immobili/?Comune%5B%5D=" + t[1] + "&cf=yes";
        var i = el("img"); i.alt = ""; i.loading = "lazy"; i.src = C + t[2]; i.onerror = function () { i.remove(); };
        a.appendChild(i); a.appendChild(el("b")); a.appendChild(el("span", null, "Vedi gli immobili →"));
        a.querySelector("b").textContent = t[0];
        grid.appendChild(a);
      });
      after.after(sec);
    });

    // perché sceglierci: etichetta e numeri
    safe(function () {
      var sec = document.querySelector(".homeBox3"), h = sec && sec.querySelector("h2");
      if (h && !sec.querySelector(".pk-eyebrow")) h.parentNode.insertBefore(eyebrow("Servizi"), h);
      if (sec) sec.querySelectorAll(".card").forEach(function (c, i) { if (!c.querySelector(".pk-num")) c.appendChild(el("span", "pk-num", "0" + (i + 1))); });
    });

    // contatti: etichetta e titolo come nel prototipo (il modulo Gestim resta quello vero)
    safe(function () {
      var sec = document.querySelector(".contattacihome");
      if (!sec) return;
      sec.id = sec.id || "pk-contatti";
      var box = sec.querySelector(".txtdati");
      if (box && !box.querySelector(".pk-eyebrow")) {
        var h = el("h2", "pk-h2", "Parliamo della tua casa");
        box.insertBefore(h, box.firstChild); box.insertBefore(eyebrow("Contattaci"), h);
        // il vecchio titolo "Contattaci" ora è l'etichetta sopra
        box.querySelectorAll("h3").forEach(function (x) { if (/^\s*contattaci\s*$/i.test(x.textContent)) x.classList.add("pk-hide"); });
      }
    });

    // staff
    safe(function () {
      var h = document.querySelector(".staffhome h3");
      var prev = h && h.previousElementSibling;
      if (h && !(prev && prev.classList.contains("pk-eyebrow"))) h.parentNode.insertBefore(eyebrow("Il nostro staff"), h);
    });
  });
})();

/* =========================================================
   V3 — hero di giorno, scheda con foto a schermo intero
   ========================================================= */
(function () {
  function ready(fn) { document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn(); }
  function safe(fn) { try { fn(); } catch (e) { if (window.console) console.warn("paccoi-skin v3", e); } }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  var calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  ready(function () {
    // ---------- home: foto di giorno con movimento ----------
    safe(function () {
      var hs = document.querySelector("main > .homeslide");
      if (!hs || hs.querySelector(".pk-hero")) return;
      var U = "https://images.unsplash.com/", Q = "?auto=format&fit=crop&q=80&w=" + (innerWidth > 1600 ? 2600 : innerWidth > 900 ? 2000 : 1100);
      var photos = ["photo-1600596542815-ffad4c1539a9", "photo-1613490493576-7fde63acd811", "photo-1580587771525-78b9dba3b914", "photo-1564013799919-ab600027ffc6", "photo-1512917774080-9991f1c4c750"];
      var cap = hs.querySelector(".carousel-caption .title");
      var txt = cap ? cap.textContent.trim().replace(/^E'\s*/, "È ") : "È il momento di cambiare casa!";
      var hero = el("div", "pk-hero"), media = el("div", "pk-hero-media");
      var slides = photos.map(function (p, i) { var s = el("div", "pk-hero-slide kb" + (i % 4)); s.dataset.src = U + p + Q; media.appendChild(s); return s; });
      hero.appendChild(media);
      hero.appendChild(el("div", "pk-hero-shade"));
      var text = el("div", "pk-hero-text");
      text.appendChild(el("div", "pk-eyebrow", "Agenzia immobiliare · San Benedetto del Tronto"));
      var title = el("div", "pk-hero-title");
      // parola per parola, "cambiare casa!" in corsivo dorato
      var m = txt.match(/^(.*?)(cambiare casa!?)(.*)$/i), parts = m ? [[m[1], 0], [m[2], 1], [m[3], 0]] : [[txt, 0]], n = 0;
      parts.forEach(function (pt) {
        var host = pt[1] ? title.appendChild(el("em")) : title;
        pt[0].split(/(\s+)/).forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) { host.appendChild(document.createTextNode(" ")); return; }
          var s = el("span", "w"); s.textContent = w; s.style.animationDelay = (0.25 + n++ * 0.08) + "s"; host.appendChild(s);
        });
      });
      text.appendChild(title);
      hero.appendChild(text);
      var dots = el("div", "pk-hero-dots"), bar = el("div", "pk-hero-bar");
      slides.forEach(function (s, i) { var b = el("button"); b.type = "button"; b.setAttribute("aria-label", "Foto " + (i + 1)); b.onclick = function () { go(i, true); }; dots.appendChild(b); });
      hero.appendChild(dots); hero.appendChild(bar);

      var cur = -1, timer = null;
      function load(s, cb) { if (s.dataset.ok) return cb && cb(); var im = new Image(); im.onload = function () { s.style.backgroundImage = "url('" + s.dataset.src + "')"; s.dataset.ok = 1; cb && cb(); }; im.onerror = function () { cb && cb(true); }; im.src = s.dataset.src; }
      function go(i, user) {
        if (i === cur) return;
        load(slides[i], function (err) {
          if (err) return;
          if (cur >= 0) { slides[cur].classList.remove("on"); dots.children[cur].classList.remove("on"); }
          var s = slides[i]; s.classList.remove("on"); void s.offsetWidth; s.classList.add("on"); dots.children[i].classList.add("on"); cur = i;
          bar.classList.remove("run"); void bar.offsetWidth; if (!calm) bar.classList.add("run");
          load(slides[(i + 1) % slides.length]);
          clearTimeout(timer); if (!calm) timer = setTimeout(function () { go((cur + 1) % slides.length); }, 5500);
        });
      }
      // si sostituisce lo slider originale solo quando la prima foto è pronta
      load(slides[0], function (err) {
        if (err) return;
        hs.insertBefore(hero, hs.firstChild); hs.classList.add("pk-has-hero"); go(0);
      });
      document.addEventListener("visibilitychange", function () { if (document.hidden) clearTimeout(timer); else if (cur >= 0 && !calm) timer = setTimeout(function () { go((cur + 1) % slides.length); }, 3000); });
      // leggero effetto profondità scorrendo
      if (!calm) {
        var tick = false;
        addEventListener("scroll", function () {
          if (tick) return; tick = true;
          requestAnimationFrame(function () { var y = Math.min(scrollY, innerHeight); media.style.transform = "translateY(" + (y * 0.22) + "px)"; text.style.transform = "translateY(" + (y * 0.1) + "px)"; tick = false; });
        }, { passive: true });
      }
    });

    // ---------- scheda immobile: prima la foto grande ----------
    safe(function () {
      var sec = document.querySelector("main > .sectionpage"), sup = sec && sec.querySelector(".sup"), gal = sec && sec.querySelector(".gallery");
      if (!sup || !gal || document.querySelector(".pk-ph")) return;
      var first = gal.querySelector(".carousel-item") , pic = first && first.querySelector("picture");
      var src = "";
      if (pic) pic.querySelectorAll("source").forEach(function (s) { if (!s.media && !src) src = (s.getAttribute("srcset") || "").split(" ")[0]; });
      if (!src) { var im0 = gal.querySelector("img"); src = im0 ? (im0.getAttribute("data-src") || im0.getAttribute("src") || "") : ""; }
      src = src.replace("/thumb/", "/");
      if (!src) return;
      var h1 = sup.querySelector("h1"), price = sup.querySelector(".seconda"), cod = sup.querySelector(".codice_top"), mot = sup.querySelector(".motivazione_top");
      var nFoto = gal.querySelectorAll(".carousel-inner > .carousel-item").length || gal.querySelectorAll(".carousel-item").length;
      var ph = el("section", "pk-ph"); ph.setAttribute("aria-label", "Foto principale");
      var bg = el("div", "pk-ph-bg"); bg.style.backgroundImage = "url('" + src + "')";
      var img = el("img", "pk-ph-img"); img.alt = h1 ? h1.textContent.trim() : "";
      var capEl = el("div", "pk-ph-cap");
      var left = el("div", "pk-ph-box"), right = el("div", "pk-ph-box pk-ph-right");
      left.appendChild(el("div", "pk-eyebrow")).textContent = [mot && mot.textContent.trim(), cod && cod.textContent.trim()].filter(Boolean).join(" · ");
      left.appendChild(el("div", "pk-ph-title")).textContent = h1 ? h1.textContent.trim() : "";
      if (price && price.textContent.trim()) right.appendChild(el("div", "pk-ph-price")).textContent = price.textContent.trim();
      var btns = el("div", "pk-ph-btns");
      var all = el("button", "pk-ph-all", "Guarda le foto" + (nFoto > 1 ? " (" + nFoto + ")" : "")); all.type = "button";
      var more = el("a", "pk-ph-more", "Dettagli ↓"); more.href = "#pk-dettagli";
      btns.appendChild(all); btns.appendChild(more); right.appendChild(btns);
      capEl.appendChild(left); capEl.appendChild(right);
      ph.appendChild(bg); ph.appendChild(img); ph.appendChild(capEl); ph.appendChild(el("span", "pk-ph-cue"));
      sec.id = sec.id || "pk-dettagli";
      more.href = "#" + sec.id;
      sec.parentNode.insertBefore(ph, sec);
      document.body.classList.add("pk-scheda");

      // la foto non viene mai ingrandita oltre la sua risoluzione: se non basta per riempire lo schermo, si vede intera sullo sfondo sfocato
      function fit() {
        var nw = img.naturalWidth, nh = img.naturalHeight; if (!nw) return;
        var dpr = Math.min(window.devicePixelRatio || 1, 2), W = ph.clientWidth, H = ph.clientHeight;
        var need = Math.max(W / nw, H / nh) * dpr;
        ph.classList.toggle("contain", need > 1.15);
        if (need > 1.15) { var k = Math.min(W / nw, H / nh, 1.1 / dpr); img.style.width = Math.round(nw * k) + "px"; img.style.height = Math.round(nh * k) + "px"; }
        else { img.style.width = ""; img.style.height = ""; }
      }
      img.onload = function () { fit(); ph.classList.add("ready"); };
      img.onerror = function () { ph.remove(); document.body.classList.remove("pk-scheda"); };
      img.src = src;
      addEventListener("resize", fit);

      function openGallery() { var it = gal.querySelector(".carousel-item.active") || first; if (it) it.click(); }
      all.addEventListener("click", function (e) { e.stopPropagation(); openGallery(); });
      more.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); scrollTo({ top: sec.getBoundingClientRect().top + scrollY - 10, behavior: calm ? "auto" : "smooth" }); });
      ph.addEventListener("click", function (e) { if (!capEl.contains(e.target) || e.target === capEl) openGallery(); });
    });
  });
})();

/* =========================================================
   V3.1 — "Le nostre sedi": solo le foto 1, 2, 4 e 3 della sede attuale (la 7 era di un'altra agenzia),
   e la 1 sempre per prima (Gestim le mescola a ogni visita)
   ========================================================= */
(function () {
  function ready(fn) { document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn(); }
  ready(function () {
    try {
      var KEEP = ["20241002121244765096380", "20241002121323502901260", "20241002121423501270100", "20241002121356385313010"];
      document.querySelectorAll("main .carousel").forEach(function (c) {
        var inner = c.querySelector(".carousel-inner"); if (!inner) return;
        var items = [].slice.call(inner.querySelectorAll(":scope > .carousel-item"));
        var keyOf = function (it) { var h = it.innerHTML; for (var k = 0; k < KEEP.length; k++) if (h.indexOf(KEEP[k]) > -1) return k; return -1; };
        if (!items.some(function (it) { return keyOf(it) === 0; })) return; // non è il carosello delle sedi
        var keep = items.filter(function (it) { return keyOf(it) > -1; }).sort(function (a, b) { return keyOf(a) - keyOf(b); });
        items.forEach(function (it) { if (keep.indexOf(it) < 0) it.remove(); });
        keep.forEach(function (it, i) { it.classList.toggle("active", i === 0); inner.appendChild(it); });
        var ind = c.querySelector(".carousel-indicators");
        if (ind) {
          ind.innerHTML = "";
          keep.forEach(function (it, i) {
            var b = document.createElement("button"); b.type = "button";
            b.setAttribute("data-bs-target", "#" + c.id); b.setAttribute("data-bs-slide-to", String(i)); b.setAttribute("aria-label", "Foto " + (i + 1));
            if (i === 0) { b.className = "active"; b.setAttribute("aria-current", "true"); }
            ind.appendChild(b);
          });
        }
        var B = window.bootstrap && window.bootstrap.Carousel, inst = B && B.getInstance && B.getInstance(c);
        if (inst) { inst.dispose(); new B(c, { interval: +(c.getAttribute("data-bs-interval") || 5000), ride: "carousel" }).cycle(); }
      });
    } catch (e) { if (window.console) console.warn("paccoi-skin v3.1", e); }
  });
})();

/* =========================================================
   V3.3 — "Selezionati per te": sempre 6 immobili
   (Gestim ne manda 5: il sesto si prende da un'altra selezione della home)
   ========================================================= */
(function () {
  function ready(fn) { document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn(); }
  ready(function () {
    try {
      var row = document.querySelector(".immobilihome .contentbox > .row");
      if (!row) return;
      var cols = [].slice.call(row.children);
      var linkOf = function (c) { var a = c.querySelector("figure a[href]"); return a ? a.href : ""; };
      var addPrice = function (c) { var p = c.querySelector("figure .prezzo"), t = c.querySelector(".boxdettagli .titolo"); if (p && t && !c.querySelector(".pk-price")) { var d = document.createElement("div"); d.className = "pk-price"; d.textContent = p.textContent.trim(); t.after(d); } };
      cols.forEach(function (c, i) { c.className = "col-12 col-md-6 col-lg-4"; if (i >= 6) c.classList.add("pk-hide6"); });
      if (cols.length >= 6 || !window.fetch || !window.DOMParser) return;
      var have = cols.map(linkOf);
      fetch("/", { credentials: "same-origin" }).then(function (r) { return r.text(); }).then(function (h) {
        var d = new DOMParser().parseFromString(h, "text/html");
        var extra = [].slice.call(d.querySelectorAll(".immobilihome .contentbox > .row > div")).filter(function (c) { var l = linkOf(c); return l && have.indexOf(l) < 0; });
        extra.slice(0, 6 - cols.length).forEach(function (c) {
          c.className = "col-12 col-md-6 col-lg-4";
          c.querySelectorAll(".pk-reveal,[data-aos]").forEach(function (x) { x.classList.remove("pk-reveal"); x.removeAttribute("data-aos"); });
          c.querySelectorAll("img").forEach(function (im) { im.loading = "lazy"; });
          addPrice(c);
          row.appendChild(document.importNode(c, true));
        });
      }).catch(function () {});
    } catch (e) { if (window.console) console.warn("paccoi-skin v3.3", e); }
  });
})();

/* =========================================================
   V3.5 — foto principale a carosello, Paccoi Paolo primo nel team, contatti ordinati
   ========================================================= */
(function () {
  function ready(fn) { document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn(); }
  function safe(fn) { try { fn(); } catch (e) { if (window.console) console.warn("[paccoi v3.5]", e); } }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  ready(function () {
    // ---------- scheda: la foto principale diventa un carosello di tutte le foto ----------
    safe(function () {
      var tries = 0;
      (function wait() {
        var ph = document.querySelector(".pk-ph"), gal = document.querySelector("main > .sectionpage .gallery");
        if (!ph || !gal) { if (++tries < 40) setTimeout(wait, 150); return; }
        if (ph.querySelector(".pk-ph-nav")) return;
        var sk = gal.querySelector("[id^=sk-immo]") || gal;
        var urls = [], items = [];
        [].slice.call(sk.querySelectorAll(".carousel-inner > .carousel-item")).forEach(function (it) {
          var u = "";
          [].slice.call(it.querySelectorAll("source")).forEach(function (s) { if (!s.media && !u) u = (s.getAttribute("srcset") || "").split(" ")[0]; });
          if (!u) { var i = it.querySelector("img"); u = i ? (i.getAttribute("data-src") || i.getAttribute("src") || "") : ""; }
          u = u.replace("/thumb/", "/");
          if (u && urls.indexOf(u) < 0) { urls.push(u); items.push(it); }
        });
        if (urls.length < 2) return;
        var cur = 0, busy = false, timer = null, DELAY = 5000;
        var prev = el("button", "pk-ph-nav pk-ph-prev"), next = el("button", "pk-ph-nav pk-ph-next");
        prev.type = next.type = "button"; prev.setAttribute("aria-label", "Foto precedente"); next.setAttribute("aria-label", "Foto successiva");
        var count = el("div", "pk-ph-count", "1 / " + urls.length);
        ph.appendChild(prev); ph.appendChild(next); ph.appendChild(count);
        var cache = {};
        function preload(i) { var u = urls[(i + urls.length) % urls.length]; if (!cache[u]) { cache[u] = new Image(); cache[u].src = u; } return cache[u]; }
        preload(1);
        function show(i) {
          if (busy) return; i = (i + urls.length) % urls.length; if (i === cur) return;
          busy = true;
          var im = preload(i);
          function go() {
            var old = ph.querySelectorAll(".pk-ph-img");
            var n = el("img", "pk-ph-img pk-ph-in"); n.alt = old[0] ? old[0].alt : ""; n.src = im.src;
            var last = old[old.length - 1]; last.parentNode.insertBefore(n, last.nextSibling);
            requestAnimationFrame(function () { requestAnimationFrame(function () { n.classList.remove("pk-ph-in"); }); });
            setTimeout(function () { [].slice.call(old).forEach(function (o) { o.remove(); }); busy = false; }, 900);
            cur = i; count.textContent = (i + 1) + " / " + urls.length;
            preload(i + 1); preload(i - 1);
          }
          if (im.complete && im.naturalWidth) go(); else { im.onload = go; im.onerror = function () { busy = false; urls.splice(i, 1); items.splice(i, 1); }; }
        }
        function restart() { clearInterval(timer); timer = setInterval(function () { if (!document.hidden) show(cur + 1); }, DELAY); }
        prev.addEventListener("click", function (e) { e.stopPropagation(); show(cur - 1); restart(); });
        next.addEventListener("click", function (e) { e.stopPropagation(); show(cur + 1); restart(); });
        // apre la galleria sulla foto che si sta guardando
        ph.addEventListener("click", function (e) {
          if (e.target.closest(".pk-ph-nav")) return;
          var it = items[cur];
          if (it) { e.stopImmediatePropagation(); (it.querySelector("picture") || it).click(); }
        }, true);
        var x0 = null;
        ph.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
        ph.addEventListener("touchend", function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 45) { show(cur + (dx < 0 ? 1 : -1)); restart(); } }, { passive: true });
        document.addEventListener("keydown", function (e) { if (scrollY > ph.offsetHeight / 2) return; if (e.key === "ArrowRight") { show(cur + 1); restart(); } if (e.key === "ArrowLeft") { show(cur - 1); restart(); } });
        restart();
      })();
    });

    // ---------- team: Paccoi Paolo per primo ----------
    safe(function () {
      var inner = document.querySelector(".staffhome .carousel-inner"); if (!inner) return;
      var items = [].slice.call(inner.querySelectorAll(":scope > .carousel-item"));
      var p = items.filter(function (it) { var t = it.querySelector(".titolo"); return t && /paccoi\s+paolo/i.test(t.textContent); })[0];
      if (!p || items[0] === p) return;
      inner.insertBefore(p, items[0]);
    });

    // ---------- contatti: una riga ordinata per ogni recapito ----------
    safe(function () {
      var d = document.querySelector(".contattacihome .dettagli"); if (!d || d.querySelector(".pk-clist")) return;
      var p = [].slice.call(d.querySelectorAll("p")).filter(function (x) { return x.querySelector("i[class*=la-]"); })[0]; if (!p) return;
      var list = el("ul", "pk-clist"), li = null;
      [].slice.call(p.childNodes).forEach(function (n) {
        if (n.nodeType === 1 && n.tagName === "I") { li = el("li", "pk-crow"); li.appendChild(n.cloneNode(true)); li.appendChild(el("div", "pk-ctxt")); list.appendChild(li); return; }
        if (!li || (n.nodeType === 1 && n.tagName === "BR")) return;
        if (n.nodeType === 3 && !n.textContent.trim()) return;
        li.lastChild.appendChild(n.cloneNode(true));
      });
      if (!list.children.length) return;
      p.parentNode.insertBefore(list, p); p.style.display = "none";
      d.classList.add("pk-dettagli-ok");
    });
  });
})();

/* =========================================================
   V3.6 — tendine della barra filtri: si aprono sempre verso il basso
   ========================================================= */
(function () {
  function ready(fn) { document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn(); }
  function patch(sel) {
    var $ = window.jQuery; if (!$) return;
    var inst = $(sel).data("select2"); if (!inst || !inst.dropdown || inst.dropdown.__pkDown) return;
    var dd = inst.dropdown, orig = dd._positionDropdown;
    if (typeof orig !== "function") return;
    dd.__pkDown = true;
    dd._positionDropdown = function () {
      orig.apply(this, arguments);
      try {
        var $d = this.$dropdown, $c = this.$container, $w = this.$dropdownContainer;
        if (!$d || !$c || !$w) return;
        $d.removeClass("select2-dropdown--above").addClass("select2-dropdown--below");
        $c.removeClass("select2-container--above").addClass("select2-container--below");
        var want = $c[0].getBoundingClientRect().bottom + 6, now = $d[0].getBoundingClientRect().top;
        var top = parseFloat($w.css("top")) || 0;
        if (Math.abs(want - now) > 1) $w.css("top", top + (want - now) + "px");
      } catch (e) {}
    };
  }
  ready(function () {
    var $ = window.jQuery; if (!$) return;
    var boxes = "#motoreRicerca select, #motoreRicercaInterno select";
    $(document).on("select2:opening", boxes, function () { patch(this); });
    setTimeout(function () { $(boxes).each(function () { patch(this); }); }, 600);
  });
})();
/* se la tendina finirebbe sotto lo schermo, la pagina scorre quanto basta per vederla */
(function () {
  var $ = window.jQuery; if (!$) return;
  $(document).on("select2:open", "#motoreRicerca select, #motoreRicercaInterno select", function () {
    var c = $(this).next(".select2-container")[0]; if (!c) return;
    setTimeout(function () {
      var d = document.querySelector(".select2-container--open .select2-dropdown"); if (!d) return;
      var over = d.getBoundingClientRect().bottom + 16 - window.innerHeight;
      if (over > 0) window.scrollBy({ top: over, behavior: "smooth" });
    }, 30);
  });
})();

/* =========================================================
   V3.9 — mostra la pagina solo quando il restyling è applicato
   (questo blocco gira per ultimo, dopo tutti gli altri)
   ========================================================= */
(function () {
  var root = document.documentElement;
  function show() { root.classList.add("pk-ready"); }
  function ready(fn) { document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn(); }
  ready(function () { requestAnimationFrame(function () { requestAnimationFrame(show); }); });
  setTimeout(show, 2500);
  addEventListener("pageshow", show);
})();

/* =========================================================
   V3.11 — mappa degli immobili (stile Airbnb)
   Pulsante "Mappa" accanto a Schede / Lista nei risultati e voce "Mappa" nel menu.
   Il codice della mappa (gestim/paccoi-map.js) si carica solo quando serve.
   ========================================================= */
(function () {
  function ready(fn) { document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn(); }
  function safe(fn) { try { fn(); } catch (e) { if (window.console) console.warn("[paccoi mappa]", e); } }
  var me = document.querySelector('script[src*="gestim/paccoi-skin.js"]');
  var MAPJS = me ? me.src.replace(/paccoi-skin\.js.*$/, "paccoi-map.js") : "";
  var MAPURL = "/immobili/?cf=yes#mappa";
  var loading = null;
  // se si arriva per aprire la mappa, l'elenco non si mostra nemmeno per un istante
  // e il codice della mappa si scarica subito, senza aspettare il resto della pagina
  var WANT = false;
  try { WANT = /^\/immobili\/?$/.test(location.pathname) && (location.hash === "#mappa" || sessionStorage.getItem("pk-vista") === "mappa"); } catch (e) {}
  if (WANT && MAPJS) {
    document.documentElement.classList.add("pk-wantmap");
    loading = new Promise(function (ok, ko) { var s = document.createElement("script"); s.src = MAPJS; s.onload = ok; s.onerror = ko; document.head.appendChild(s); });
    loading.catch(function () { document.documentElement.classList.remove("pk-wantmap"); });
    setTimeout(function () { if (!document.body || !document.body.classList.contains("pk-mapmode")) document.documentElement.classList.remove("pk-wantmap"); }, 8000);
  }
  function withMap(fn) {
    if (window.PKMap) return fn(window.PKMap);
    if (!loading) loading = new Promise(function (ok, ko) { var s = document.createElement("script"); s.src = MAPJS; s.onload = ok; s.onerror = ko; document.head.appendChild(s); });
    loading.then(function () { window.PKMap && fn(window.PKMap); });
  }
  ready(function () {
    // voce "Mappa" nel menu (in alto, nella barra che compare scorrendo e nel menu del telefono)
    safe(function () {
      document.querySelectorAll("header .navbar-nav, .intestazione_scroll .navbar-nav, #menuNav .navbar-nav, #menuNav ul").forEach(function (nav) {
        if (nav.querySelector(".pk-nav-mappa")) return;
        var items = [].slice.call(nav.children).filter(function (x) { return x.tagName === "LI"; });
        var after = items.filter(function (li) { return /immobili/i.test((li.querySelector("a") || {}).textContent || ""); })[0];
        if (!after) return;
        var li = document.createElement("li"); li.className = (after.className || "nav-item").replace(/\bdropdown\b|\bactive\b/g, "").trim() + " pk-nav-mappa";
        var a = document.createElement("a"); a.className = ((after.querySelector("a") || {}).className || "nav-link").replace(/\bdropdown-toggle\b|\bactive\b/g, "").trim(); a.href = MAPURL; a.textContent = "Mappa";
        li.appendChild(a); after.parentNode.insertBefore(li, after.nextSibling);
      });
    });
    // pulsante dorato "Mappa" in alto a destra, accanto a "Contattaci"
    safe(function () {
      var lt = document.querySelector("header#headerPage .contentbox .langtel");
      if (!lt || lt.querySelector(".pk-cta-mappa")) return;
      var a = document.createElement("a"); a.className = "pk-cta pk-cta-mappa"; a.href = MAPURL;
      a.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Zm0 0v13m6-10.5v13"/></svg>Mappa';
      a.addEventListener("click", function (e) { if (document.getElementById("listImmobili") && window.location.pathname.indexOf("/immobili") === 0) { e.preventDefault(); withMap(function (M) { M.open(); scrollTo({ top: 0, behavior: "smooth" }); }); } });
      var c = lt.querySelector(".pk-cta"); lt.insertBefore(a, c || null);
      document.body.classList.add("pk-has-ctamappa");
    });
    // pagina dei risultati
    safe(function () {
      var list = document.getElementById("listImmobili"); if (!list || !MAPJS) return;
      document.body.classList.add("pk-risultati");
      function addBtn() {
        var lista = [].slice.call(list.querySelectorAll("a")).filter(function (a) { return /^\s*Lista\s*$/.test(a.textContent); })[0];
        if (!lista || lista.parentNode.querySelector(".pk-mapbtn")) return;
        var b = document.createElement("a"); b.href = "#mappa"; b.className = "pk-mapbtn" + (document.body.classList.contains("pk-mapmode") ? " on" : "");
        b.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Zm0 0v13m6-10.5v13"/></svg> Mappa';
        b.addEventListener("click", function (e) { e.preventDefault(); b.classList.add("on"); withMap(function (M) { M.open(); }); });
        lista.parentNode.insertBefore(b, lista.nextSibling);
        [].slice.call(lista.parentNode.querySelectorAll("a")).forEach(function (a) { if (a !== b && /Schede|Lista/.test(a.textContent)) a.addEventListener("click", function () { if (window.PKMap) window.PKMap.close(); }); });
      }
      addBtn();
      new MutationObserver(addBtn).observe(list, { childList: true, subtree: false });
      var want = location.hash === "#mappa"; try { if (!want && sessionStorage.getItem("pk-vista") === "mappa") want = true; } catch (e) {}
      if (want) withMap(function (M) { M.open(); });
      addEventListener("hashchange", function () { if (location.hash === "#mappa") withMap(function (M) { M.open(); }); });
    });
  });
})();
