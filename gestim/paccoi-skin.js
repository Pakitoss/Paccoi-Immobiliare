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
