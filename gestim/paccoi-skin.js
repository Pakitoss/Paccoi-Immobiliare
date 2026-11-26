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
