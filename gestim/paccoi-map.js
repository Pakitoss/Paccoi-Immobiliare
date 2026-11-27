/* =========================================================
   Paccoi Immobiliare — mappa degli immobili (stile Airbnb)
   Si apre nella pagina dei risultati (/immobili/) con il pulsante "Mappa".
   I dati arrivano dalle stesse pagine dei risultati del gestionale
   (posizione, prezzo, foto), quindi sono sempre aggiornati e rispettano
   la ricerca fatta con la barra dei filtri.
   Sulla mappa ogni immobile è mostrato in una posizione indicativa
   (spostata di qualche centinaio di metri), mai sul punto esatto.
   ========================================================= */
(function () {
  "use strict";
  if (window.PKMap) return;
  var BASE = (document.querySelector('script[src*="gestim/paccoi-skin.js"]') || {}).src || "";
  var LEAFLET = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/";
  var CLUSTER = "https://cdn.jsdelivr.net/npm/leaflet.markercluster@1.5.3/dist/";

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function css(href) { return new Promise(function (ok) { if (document.querySelector('link[href="' + href + '"]')) return ok(); var l = el("link"); l.rel = "stylesheet"; l.href = href; l.onload = ok; l.onerror = ok; document.head.appendChild(l); }); }
  function js(src) { return new Promise(function (ok, ko) { var s = el("script"); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); }); }
  function libs() {
    var p = [css(LEAFLET + "leaflet.css"), css(CLUSTER + "MarkerCluster.css")];
    var l = (window.L && window.L.map) ? Promise.resolve() : js(LEAFLET + "leaflet.js");
    return Promise.all(p.concat([l.then(function () { return (window.L && L.markerClusterGroup) ? null : js(CLUSTER + "leaflet.markercluster.js"); })]));
  }

  var LIBS = null; function libsOnce() { return LIBS || (LIBS = libs()); }
  if (document.documentElement.classList.contains("pk-wantmap")) libsOnce();

  /* ---------- dati ---------- */
  function num(s) { var m = String(s || "").replace(/\./g, "").replace(",", ".").match(/\d+(\.\d+)?/); return m ? parseFloat(m[0]) : null; }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967295; }
  // posizione indicativa: spostata di 150-350 m in una direzione fissa per ogni immobile
  function blur(lat, lng, id) {
    var a = hash(id + "a") * Math.PI * 2, d = 150 + hash(id + "d") * 200;
    return [lat + (d * Math.cos(a)) / 111320, lng + (d * Math.sin(a)) / (111320 * Math.cos(lat * Math.PI / 180))];
  }
  function dove(c) {
    var d = c.querySelector(".dove"); if (!d) return "";
    var parts = [];
    [].slice.call(d.childNodes).forEach(function (n) { var t = (n.textContent || "").replace(/\s+/g, " ").trim(); if (t) parts.push(t); });
    return parts.join(" · ");
  }
  function town(it) { return String(it.place || "").split(" · ")[0]; }
  function inZona(it, v) { return v.slice(0, 2) === "c:" ? town(it) === v.slice(2) : it.place === v.slice(2); }
  function parse(html) {
    var d = new DOMParser().parseFromString(html, "text/html"), out = [];
    [].slice.call(d.querySelectorAll(".immobili_listgriglia, .immobili_listlista")).forEach(function (c) {
      var g = function (s) { var x = c.querySelector(s); return x ? x.textContent.replace(/\s+/g, " ").trim() : ""; };
      var m = function (p) { var x = c.querySelector('meta[itemprop="' + p + '"]'); return x ? x.getAttribute("content") : ""; };
      var a = c.querySelector("figure a[href], a.dettagli[href]"), img = c.querySelector("figure img");
      var lat = parseFloat(m("latitude")), lng = parseFloat(m("longitude"));
      var title = g(".titolo") || m("name");
      var it = { id: c.getAttribute("data-idimmobile") || (a && a.href) || title, url: a ? a.href : "", img: img ? (img.getAttribute("src") || img.getAttribute("data-src") || "") : "",
        title: title, place: dove(c) || m("addressLocality"), priceTxt: g("figure .prezzo") || g(".prezzo"), contract: /affitt/i.test(g(".motivazione") + " " + title) ? "Affitto" : "Vendita",
        code: g(".codice").replace(/^Cod\.?\s*/i, ""), type: title.split(/\s+in\s+(vendita|affitto)/i)[0], mq: null, bagni: null, camere: null, lat: lat, lng: lng };
      it.price = /\d/.test(it.priceTxt) ? num(it.priceTxt) : null;
      [].slice.call(c.querySelectorAll(".icone .ico")).forEach(function (x) { var t = x.textContent.replace(/\s+/g, " ").trim(), v = num(t); if (/mq/i.test(t)) it.mq = v; else if (/bagn/i.test(t)) it.bagni = v; else if (/camer|local/i.test(t)) it.camere = v; });
      if (isFinite(lat) && isFinite(lng) && (lat || lng)) { it.pos = blur(lat, lng, String(it.id)); }
      delete it.lat; delete it.lng;   // il punto esatto non viene conservato
      out.push(it);
    });
    var pages = 1;
    [].slice.call(d.querySelectorAll("[onclick*='business3']")).forEach(function (x) { var p = (x.getAttribute("onclick").match(/[?&]p=(\d+)/) || [])[1]; if (p) pages = Math.max(pages, +p); });
    var tot = (d.body.textContent.match(/(\d+)\s*trovat/i) || [])[1];
    return { items: out, pages: pages, total: tot ? +tot : null };
  }
  var URL1 = "/immobili/business3/";
  function page(p) { return fetch(URL1 + (p > 1 ? "?p=" + p : ""), { credentials: "same-origin" }).then(function (r) { return r.text(); }).then(parse); }
  function load(onChunk) {
    var key = "pk-mappa2:" + location.search, cached = null;
    try { cached = JSON.parse(sessionStorage.getItem(key) || "null"); } catch (e) {}
    if (cached && Date.now() - cached.at < 10 * 60 * 1000) { onChunk(cached.items, cached.items.length, cached.items.length); return Promise.resolve(cached.items); }
    var all = [];
    return page(1).then(function (first) {
      all = all.concat(first.items);
      var est = first.total || first.pages * first.items.length;
      onChunk(first.items, all.length, est);
      var todo = []; for (var p = 2; p <= first.pages; p++) todo.push(p);
      function worker() { if (!todo.length) return Promise.resolve(); var p = todo.shift(); return page(p).then(function (r) { all = all.concat(r.items); onChunk(r.items, all.length, est); }, function () {}).then(worker); }
      return Promise.all([worker(), worker(), worker(), worker()]);
    }).then(function () {
      var seen = {}; all = all.filter(function (x) { if (seen[x.id]) return false; seen[x.id] = 1; return true; });
      try { sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), items: all })); } catch (e) {}
      return all;
    });
  }

  /* ---------- formati ---------- */
  function short(it) {
    if (it.price == null) return "Tratt.";
    var p = it.price;
    if (p >= 1e6) return "€ " + (Math.round(p / 1e5) / 10).toString().replace(".", ",") + " mln";
    if (p >= 1e4) return "€ " + Math.round(p / 1e3) + "k";
    return "€ " + p.toLocaleString("it-IT");
  }
  function specs(it) {
    var s = [];
    if (it.mq) s.push(it.mq + " mq");
    if (it.camere) s.push(it.camere + (it.camere == 1 ? " camera" : " camere"));
    if (it.bagni) s.push(it.bagni + (it.bagni == 1 ? " bagno" : " bagni"));
    return s.join(" · ");
  }
  function card(it, cls) {
    var a = el("a", cls || "pk-mcard"); a.href = it.url; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("data-id", it.id);
    var f = el("div", "pk-mcard-ph"); if (it.img) { var im = el("img"); im.loading = "lazy"; im.alt = it.title; im.src = it.img; f.appendChild(im); }
    f.appendChild(el("span", "pk-mcard-tag", it.contract)); a.appendChild(f);
    var b = el("div", "pk-mcard-body");
    b.appendChild(el("div", "pk-mcard-price", it.price == null ? (it.priceTxt || "Trattativa riservata") : it.priceTxt));
    b.appendChild(el("div", "pk-mcard-title", it.title));
    if (it.place) b.appendChild(el("div", "pk-mcard-place", it.place));
    var sp = specs(it); if (sp) b.appendChild(el("div", "pk-mcard-specs", sp));
    a.appendChild(b);
    return a;
  }

  /* ---------- interfaccia ---------- */
  var S = null; // stato della vista mappa
  function build(host) {
    var w = el("section", "pk-mapview"); w.setAttribute("aria-label", "Mappa degli immobili");
    w.innerHTML =
      '<div class="pk-mv-list">' +
        '<div class="pk-mv-head">' +
          '<div class="pk-mv-count" aria-live="polite">Carico gli immobili…</div>' +
          '<button type="button" class="pk-mv-close">Torna all\'elenco</button>' +
        '</div>' +
        '<div class="pk-mv-filters">' +
          '<div class="pk-seg" role="group" aria-label="Contratto"><button type="button" data-c="" class="on">Tutti</button><button type="button" data-c="Vendita">Vendita</button><button type="button" data-c="Affitto">Affitto</button></div>' +
          '<label class="pk-fsel"><span>Zona</span><select data-f="zona"><option value="">Tutte le zone</option></select></label>' +
          '<label class="pk-fsel"><span>Tipologia</span><select data-f="tipo"><option value="">Tutte</option></select></label>' +
          '<label class="pk-fsel"><span>Prezzo fino a</span><select data-f="max"><option value="">Qualsiasi</option><option>100000</option><option>150000</option><option>200000</option><option>300000</option><option>500000</option><option>750000</option><option>1000000</option><option>2000000</option></select></label>' +
          '<label class="pk-fsel"><span>Camere</span><select data-f="cam"><option value="">Qualsiasi</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label>' +
          '<button type="button" class="pk-mv-reset" hidden>Azzera filtri</button>' +
        '</div>' +
        '<label class="pk-mv-area"><input type="checkbox" checked> Mostra solo gli immobili nell\'area visibile sulla mappa</label>' +
        '<div class="pk-mv-grid"></div>' +
        '<div class="pk-mv-empty" hidden>Nessun immobile in quest\'area con questi filtri. Sposta la mappa o allarga i filtri.</div>' +
      '</div>' +
      '<div class="pk-mv-mapbox"><div class="pk-mv-map"></div><div class="pk-mv-note">Posizioni indicative</div><button type="button" class="pk-mv-here" hidden>Cerca in quest\'area</button></div>' +
      '<button type="button" class="pk-mv-switch">Mostra la mappa</button>';
    w.querySelectorAll('select[data-f="max"] option').forEach(function (o) { if (o.value === "" ) return; o.textContent = "€ " + (+o.textContent).toLocaleString("it-IT"); });
    host.parentNode.insertBefore(w, host);
    return w;
  }

  function open() {
    var host = document.getElementById("listImmobili"); if (!host) return;
    document.body.classList.add("pk-mapmode"); document.documentElement.classList.remove("pk-wantmap");
    try { sessionStorage.setItem("pk-vista", "mappa"); } catch (e) {}
    if (location.hash !== "#mappa") history.replaceState(null, "", location.pathname + location.search + "#mappa");
    if (S) { setTimeout(function () { S.map.invalidateSize(); }, 50); return; }
    var w = build(host);
    S = { w: w, items: [], markers: {}, f: { c: "", zona: "", tipo: "", max: "", cam: "" }, area: true, fitted: false };
    w.querySelector(".pk-mv-close").addEventListener("click", close);
    libsOnce().then(function () { init(w); }).catch(function () { w.querySelector(".pk-mv-count").textContent = "La mappa non si è caricata. Riprova tra poco."; });
  }
  function close() {
    document.body.classList.remove("pk-mapmode", "pk-mv-showmap");
    try { sessionStorage.setItem("pk-vista", "elenco"); } catch (e) {}
    if (location.hash === "#mappa") history.replaceState(null, "", location.pathname + location.search);
    var tb = document.querySelector(".pk-mapbtn"); if (tb) tb.classList.remove("on");
  }

  function init(w) {
    var mapEl = w.querySelector(".pk-mv-map");
    var map = L.map(mapEl, { zoomControl: false, scrollWheelZoom: true, worldCopyJump: true, minZoom: 5, maxZoom: 17 }).setView([42.95, 13.85], 10);
    L.control.zoom({ position: "topright", zoomInTitle: "Avvicina", zoomOutTitle: "Allontana" }).addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\" rel=\"noopener\">OpenStreetMap</a>" }).addTo(map);
    var cl = L.markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 48, spiderfyOnMaxZoom: true, chunkedLoading: true,
      iconCreateFunction: function (c) { var n = c.getChildCount(); return L.divIcon({ html: "<span>" + n + "</span>", className: "pk-cluster" + (n > 25 ? " big" : ""), iconSize: [44, 44] }); } });
    map.addLayer(cl);
    S.map = map; S.cl = cl;

    var grid = w.querySelector(".pk-mv-grid"), count = w.querySelector(".pk-mv-count"), empty = w.querySelector(".pk-mv-empty");
    var areaBox = w.querySelector(".pk-mv-area input"), here = w.querySelector(".pk-mv-here"), reset = w.querySelector(".pk-mv-reset");
    var loading = true, total = 0;

    function icon(it, on) { return L.divIcon({ className: "pk-pin" + (on ? " on" : "") + (it.contract === "Affitto" ? " aff" : ""), html: "<span>" + short(it) + "</span>", iconSize: null, iconAnchor: [0, 0] }); }
    function popup(it) { var box = el("div"); box.appendChild(card(it, "pk-mcard pk-pop")); return box; }
    function addItems(list) {
      var ms = [];
      list.forEach(function (it) {
        S.items.push(it);
        if (!it.pos) return;
        var mk = L.marker(it.pos, { icon: icon(it), riseOnHover: true, title: it.title, keyboard: true });
        mk.bindPopup(popup(it), { className: "pk-popup", maxWidth: 300, minWidth: 260, autoPanPadding: [30, 30], closeButton: true });
        mk.on("click", function () { highlight(it.id); });
        mk.__it = it; S.markers[it.id] = mk; ms.push(mk);
      });
      markersDirty = true;
      fillSelects();
    }
    function fillSelects() {
      var zs = {}, ts = {};
      S.items.forEach(function (it) {
        if (it.place && it.pos) { var t = town(it); zs[t] = zs[t] || { n: 0, z: {} }; zs[t].n++; if (it.place !== t) zs[t].z[it.place] = (zs[t].z[it.place] || 0) + 1; }
        if (it.type) ts[it.type] = (ts[it.type] || 0) + 1;
      });
      fillZone(w.querySelector('select[data-f="zona"]'), zs);
      fill(w.querySelector('select[data-f="tipo"]'), ts, "Tutte");
    }
    function fillZone(sel, zs) {
      var cur = sel.value, towns = Object.keys(zs).sort(function (a, b) { return a.localeCompare(b, "it"); }), n = 0;
      towns.forEach(function (t) { n += 1 + Object.keys(zs[t].z).length; });
      if (sel.__n === n) return; sel.__n = n;
      sel.innerHTML = ""; var o0 = el("option", null, "Tutte le zone"); o0.value = ""; sel.appendChild(o0);
      towns.forEach(function (t) {
        var zk = Object.keys(zs[t].z).sort(function (a, b) { return a.localeCompare(b, "it"); });
        var o = el("option", null, t + " (" + zs[t].n + ")"); o.value = "c:" + t; sel.appendChild(o);
        zk.forEach(function (k) { var oz = el("option", null, "\u00a0\u00a0\u00a0· " + k.slice(t.length + 3) + " (" + zs[t].z[k] + ")"); oz.value = "z:" + k; sel.appendChild(oz); });
      });
      sel.value = cur;
    }
    function fill(sel, obj, first) {
      var cur = sel.value, keys = Object.keys(obj).sort(function (a, b) { return a.localeCompare(b, "it"); });
      if (sel.__n === keys.length) return; sel.__n = keys.length;
      sel.innerHTML = ""; var o0 = el("option", null, first); o0.value = ""; sel.appendChild(o0);
      keys.forEach(function (k) { var o = el("option", null, k + " (" + obj[k] + ")"); o.value = k; sel.appendChild(o); });
      sel.value = cur;
    }
    function pass(it) {
      var f = S.f;
      if (f.c && it.contract !== f.c) return false;
      if (f.zona && !inZona(it, f.zona)) return false;
      if (f.tipo && it.type !== f.tipo) return false;
      if (f.max && (it.price == null || it.price > +f.max)) return false;
      if (f.cam && (it.camere || 0) < +f.cam) return false;
      return true;
    }
    var drawT = 0, markersDirty = true, lastSig = null, cards = {};
    function draw(markersToo) { if (markersToo) markersDirty = true; clearTimeout(drawT); drawT = setTimeout(drawNow, 60); }
    function drawNow() {
      // sul telefono, finché la mappa è nascosta, l'elenco mostra tutti gli immobili filtrati
      var vis = map.getContainer().offsetWidth > 0, useArea = S.area && vis;
      var b = vis ? map.getBounds().pad(0.02) : null, shown = [], inMap = [];
      S.items.forEach(function (it) {
        if (!pass(it)) return;
        var mk = S.markers[it.id];
        if (mk) inMap.push(mk);
        if (!useArea || (it.pos && b.contains(it.pos))) shown.push(it);
      });
      // i segnaposto si ridisegnano solo quando cambiano i filtri (non quando si sposta la mappa)
      if (markersDirty) { markersDirty = false; map.closePopup(); cl.clearLayers(); cl.addLayers(inMap); }
      // le schede già create si riusano: niente foto che spariscono e ricompaiono
      var sig = shown.map(function (it) { return it.id; }).join(",");
      if (sig !== lastSig) {
        lastSig = sig;
        var frag = document.createDocumentFragment();
        shown.forEach(function (it) {
          var c = cards[it.id];
          if (!c) { c = cards[it.id] = card(it); c.addEventListener("mouseenter", function () { highlight(it.id); }); c.addEventListener("mouseleave", function () { highlight(null); }); }
          c.classList.toggle("on", it.id === hl); frag.appendChild(c);
        });
        grid.textContent = ""; grid.appendChild(frag);
      }
      var any = S.f.c || S.f.zona || S.f.tipo || S.f.max || S.f.cam; reset.hidden = !any;
      var n = shown.length;
      count.innerHTML = "";
      count.appendChild(el("strong", null, n === 1 ? "1 immobile" : n + " immobili"));
      count.appendChild(document.createTextNode(useArea ? " nell'area della mappa" : " in elenco"));
      if (loading) count.appendChild(el("span", "pk-mv-load", " · carico " + S.items.length + (total ? " di " + total : "") + "…"));
      empty.hidden = !!n || loading;
    }
    var hl = null;
    function highlight(id) {
      if (hl && S.markers[hl]) { S.markers[hl].setIcon(icon(S.markers[hl].__it, false)); S.markers[hl].setZIndexOffset(0); }
      [].slice.call(grid.querySelectorAll(".pk-mcard.on")).forEach(function (c) { c.classList.remove("on"); });
      [].slice.call(w.querySelectorAll(".pk-cluster.on")).forEach(function (c) { c.classList.remove("on"); });
      hl = id; if (!id) return;
      var mk = S.markers[id]; if (mk) { mk.setIcon(icon(mk.__it, true)); mk.setZIndexOffset(1000);
        var vp = cl.getVisibleParent ? cl.getVisibleParent(mk) : null; if (vp && vp !== mk && vp._icon) vp._icon.classList.add("on"); }
      var c = grid.querySelector('.pk-mcard[data-id="' + (window.CSS && CSS.escape ? CSS.escape(String(id)) : id) + '"]');
      if (c) c.classList.add("on");
    }
    function fitAll() {
      var pts = S.items.filter(function (it) { return it.pos && pass(it); }).map(function (it) { return it.pos; });
      if (!pts.length) return;
      // si inquadra la zona dove sono quasi tutti gli immobili (gli eventuali immobili lontani restano sulla mappa)
      var la = pts.map(function (p) { return p[0]; }).sort(function (a, b) { return a - b; }), lo = pts.map(function (p) { return p[1]; }).sort(function (a, b) { return a - b; });
      var mla = la[Math.floor(la.length / 2)], mlo = lo[Math.floor(lo.length / 2)];
      var near = pts.filter(function (p) { return Math.abs(p[0] - mla) < 1.2 && Math.abs(p[1] - mlo) < 1.6; });
      map.fitBounds(L.latLngBounds(near.length ? near : pts), { padding: [40, 40], maxZoom: 14 });
    }

    function zoomZona(v) { var pts = S.items.filter(function (it) { return it.pos && inZona(it, v); }).map(function (it) { return it.pos; }); if (pts.length) map.fitBounds(L.latLngBounds(pts), { padding: [60, 60], maxZoom: 15 }); }
    // filtri
    w.querySelectorAll(".pk-seg button").forEach(function (b) { b.addEventListener("click", function () { w.querySelectorAll(".pk-seg button").forEach(function (x) { x.classList.toggle("on", x === b); }); S.f.c = b.getAttribute("data-c"); draw(true); }); });
    w.querySelectorAll("select[data-f]").forEach(function (s) { s.addEventListener("change", function () {
      S.f[s.getAttribute("data-f")] = s.value; if (!map.getContainer().offsetWidth) S.seen = false;
      if (s.getAttribute("data-f") === "zona") { if (s.value) zoomZona(s.value); else fitAll(); }
      draw(true);
    }); });
    reset.addEventListener("click", function () { if (!map.getContainer().offsetWidth) S.seen = false; S.f = { c: "", zona: "", tipo: "", max: "", cam: "" }; w.querySelectorAll("select[data-f]").forEach(function (s) { s.value = ""; }); w.querySelectorAll(".pk-seg button").forEach(function (x, i) { x.classList.toggle("on", i === 0); }); fitAll(); draw(true); });
    areaBox.addEventListener("change", function () { S.area = areaBox.checked; here.hidden = true; draw(); });
    here.addEventListener("click", function () { here.hidden = true; areaBox.checked = true; S.area = true; draw(); });
    map.on("moveend", function () { if (S.area) draw(); else if (!loading) here.hidden = false; });
    map.on("popupclose", function () { highlight(null); });
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');

    // telefono: un pulsante passa dall'elenco alla mappa e viceversa
    var sw = w.querySelector(".pk-mv-switch");
    function tb() { var t = document.querySelector(".mobile_toolbar"), h = 0; if (t && t.offsetHeight) h = Math.max(0, Math.round(innerHeight - t.getBoundingClientRect().top)); document.body.style.setProperty("--pk-tb", h + "px"); }
    tb(); addEventListener("resize", tb); setTimeout(tb, 1500);
    sw.addEventListener("click", function () {
      var on = document.body.classList.toggle("pk-mv-showmap");
      sw.textContent = on ? "Mostra l'elenco" : "Mostra la mappa";
      if (on) setTimeout(function () { map.invalidateSize(); if (!S.seen) { S.seen = true; if (S.f.zona) zoomZona(S.f.zona); else fitAll(); } draw(); }, 30);
      else { draw(); scrollTo({ top: w.getBoundingClientRect().top + scrollY - 80, behavior: "instant" }); }
    });

    load(function (chunk, n, est) {
      total = est; addItems(chunk);
      if (!S.fitted && S.items.some(function (it) { return it.pos; }) && n >= Math.min(est || 12, 36)) { S.fitted = true; fitAll(); }
      draw();
    }).then(function () { loading = false; if (!S.fitted) { S.fitted = true; fitAll(); } draw(); }, function () { loading = false; draw(); });
    setTimeout(function () { map.invalidateSize(); }, 200);
    addEventListener("resize", function () { map.invalidateSize(); });
  }

  window.PKMap = { open: open, close: close };
})();
