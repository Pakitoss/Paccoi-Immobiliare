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
