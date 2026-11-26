/* =========================================================
   Paccoi Immobiliare — logica condivisa
   - header / menu / footer
   - barra di ricerca (zona, tipologia, budget, camere, codice…)
   - card immobile
   ========================================================= */
(function () {
  const P = (window.Paccoi = {});
  const IDX = window.PACCOI_INDEX || { items: [], cdn: "" };
  P.items = IDX.items;
  P.cdn = IDX.cdn;
  P.img = (path) => (path ? IDX.cdn + path : "");
  P.full = (path) => (path ? IDX.cdn + path.replace(/^thumb\//, "") : "");

  /* ---------- icone ---------- */
  const I = {
    tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    mq: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h6V3M21 15h-6v6"/></svg>',
    bagni: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM6 12V5a2 2 0 0 1 4 0M7 20l-1 2M17 20l1 2"/></svg>',
    camere: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 18V6M3 14h18v4M21 14v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11" r="1.5"/></svg>',
    locali: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21V9l9-6 9 6v12z"/><path d="M9 21v-7h6v7"/></svg>',
    energy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
    cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM12 0a12 12 0 0 0-10.3 18L0 24l6.2-1.6A12 12 0 1 0 12 0z"/></svg>',
    fb: '<svg viewBox="0 0 24 24"><path d="M14 8V6c0-.9.6-1 1-1h2V1h-3C10.7 1 10 3.4 10 5v3H7v4h3v11h4V12h3l.5-4H14z"/></svg>',
    yt: '<svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-4.8.5-4.8s0-3.2-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z"/></svg>',
    li: '<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6.1V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z"/></svg>',
    ig: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.2.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>',
  };
  P.icons = I;

  const LOGO_COL = "https://www.immobiliarepaccoi.it/img/logo_col.png";
  const LOGO_NEG = "https://www.immobiliarepaccoi.it/img/logo_neg.png";
  P.TEL = "+39 0735 780478";
  P.TEL_HREF = "tel:+390735780478";
  P.MAIL = "info@immobiliarepaccoi.it";
  P.WA = "393392816162";

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  P.esc = esc;

  /* ---------- tipologie raggruppate (più semplici da scegliere) ---------- */
  P.GROUPS = [
    ["appartamenti", "Appartamenti", (t) => /^Appartamento/i.test(t)],
    ["case", "Ville e case indipendenti", (t) => /Villa|Villino|Casa cielo/i.test(t)],
    ["casali", "Casali e rustici", (t) => /Casale|Rustic/i.test(t)],
    ["terreni", "Terreni", (t) => /^Terreno/i.test(t)],
    ["commerciale", "Negozi, uffici e attività", (t) => /Commercial|Ufficio|Attivit|Albergo|Balneare/i.test(t)],
    ["industriale", "Capannoni e laboratori", (t) => /Artigianal|Capannone|Industrial/i.test(t)],
    ["box", "Box e posti auto", (t) => /Posto auto|Garage|Box/i.test(t)],
    ["palazzi", "Palazzi e stabili", (t) => /Stabile|Palazzo/i.test(t)],
  ];
  P.groupOf = (t) => (P.GROUPS.find((g) => g[2](t)) || ["altro"])[0];

  const BUDGET = {
    V: [50000, 100000, 150000, 200000, 250000, 300000, 400000, 500000, 750000, 1000000],
    A: [400, 600, 800, 1000, 1500, 2000, 3000],
  };
  const euro = (n) => "€ " + Math.round(n).toLocaleString("it-IT");
  P.euro = euro;

  /* ---------- filtri ---------- */
  P.readFilters = (params = new URLSearchParams(location.search)) => ({
    contratto: params.get("contratto") === "A" ? "A" : "V",
    comune: params.get("comune") || "",
    zona: params.get("zona") || "",
    tipo: params.get("tipo") || "",
    min: +params.get("min") || 0,
    max: +params.get("max") || 0,
    camere: +params.get("camere") || 0,
    mq: +params.get("mq") || 0,
    q: params.get("q") || "",
    giardino: params.get("giardino") === "1",
    sort: params.get("sort") || "",
  });
  P.toQuery = (f) => {
    const p = new URLSearchParams();
    if (f.contratto === "A") p.set("contratto", "A");
    ["comune", "zona", "tipo", "q", "sort"].forEach((k) => f[k] && p.set(k, f[k]));
    ["min", "max", "camere", "mq"].forEach((k) => f[k] && p.set(k, f[k]));
    if (f.giardino) p.set("giardino", "1");
    return p.toString();
  };
  const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  P.filter = (f, items = P.items) => {
    const q = norm(f.q).replace(/^cod\.?\s*/, "").trim();
    return items.filter((x) => {
      if (q) {
        if (/^\d{3,6}$/.test(q)) return x.c.includes(q);
        const hay = norm([x.t, x.co, x.z, x.c].join(" "));
        if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
      }
      if (x.m !== f.contratto) return false;
      if (f.comune && x.co !== f.comune) return false;
      if (f.zona && x.z !== f.zona) return false;
      if (f.tipo && P.groupOf(x.t) !== f.tipo) return false;
      if (f.max && (x.p == null || x.p > f.max)) return false;
      if (f.min && (x.p == null || x.p < f.min)) return false;
      if (f.camere && (x.ca || 0) < f.camere) return false;
      if (f.mq && (x.mq || 0) < f.mq) return false;
      if (f.giardino && !x.g) return false;
      return true;
    });
  };
  P.sort = (list, how) => {
    const l = list.slice();
    const byNum = (k, dir) => (a, b) => (a[k] == null) - (b[k] == null) || dir * ((a[k] || 0) - (b[k] || 0));
    if (how === "prezzo-asc") l.sort(byNum("p", 1));
    else if (how === "prezzo-desc") l.sort(byNum("p", -1));
    else if (how === "mq-desc") l.sort(byNum("mq", -1));
    else l.sort((a, b) => (b.nf > 0) - (a.nf > 0) || +b.c - +a.c); // più recenti, prima quelli con foto
    return l;
  };

  /* ---------- card ---------- */
  P.title = (x) => `${x.t} in ${x.m === "A" ? "affitto" : "vendita"} a ${x.co}`;
  P.card = (x) => {
    const specs = [
      x.mq ? `<span>${I.mq}${x.mq.toLocaleString("it-IT")} mq</span>` : "",
      x.ca ? `<span>${I.camere}${x.ca} ${x.ca > 1 ? "camere" : "camera"}</span>` : "",
      x.b ? `<span>${I.bagni}${x.b} ${x.b > 1 ? "bagni" : "bagno"}</span>` : "",
    ].join("");
    return `<a class="prop" href="immobile.html?cod=${x.c}">
      <div class="media">
        ${x.img ? `<img src="${P.img(x.img)}" alt="${esc(P.title(x))}" loading="lazy">` : ""}
        <div class="badges"><span class="badge ${x.m === "A" ? "rent" : ""}">${x.m === "A" ? "In affitto" : "In vendita"}</span></div>
        ${x.nf > 1 ? `<span class="nphoto">${I.cam}${x.nf}</span>` : ""}
      </div>
      <div class="loc">${esc(x.co)}${x.z ? " · " + esc(x.z) : ""} <span class="cod">— Cod. ${x.c}</span></div>
      <h3>${esc(P.title(x))}</h3>
      <div class="price">${esc(x.ps)}</div>
      <div class="specs">${specs}</div>
    </a>`;
  };

  /* ---------- barra di ricerca ---------- */
  P.searchbar = (host, opts = {}) => {
    const f = Object.assign(P.readFilters(), opts.initial || {});
    host.innerHTML = `
    <form class="searchbar" role="search" aria-label="Cerca immobili" novalidate>
      <div class="sb-tabs" role="group" aria-label="Contratto">
        <button type="button" data-c="V">Comprare</button>
        <button type="button" data-c="A">Affittare</button>
      </div>
      <div class="sb-row">
        <div class="sb-field wide"><label for="sb-q">Codice o parola chiave</label>
          <input id="sb-q" name="q" type="search" placeholder="Es. 34276, mare, attico…" autocomplete="off"></div>
        <div class="sb-field sel"><label for="sb-comune">Zona / comune</label><select id="sb-comune" name="comune"></select></div>
        <div class="sb-field sel"><label for="sb-tipo">Tipo di immobile</label><select id="sb-tipo" name="tipo"></select></div>
        <div class="sb-field sel"><label for="sb-max">Budget massimo</label><select id="sb-max" name="max"></select></div>
        <div class="sb-field sel"><label for="sb-camere">Camere</label>
          <select id="sb-camere" name="camere"><option value="0">Qualsiasi</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></div>
        <div class="sb-submit"><button class="btn" type="submit">${I.search}<span class="sb-go">Cerca</span></button></div>
      </div>
      <div class="sb-extra" id="sb-extra">
        <div class="sb-field sel"><label for="sb-zona">Quartiere / località</label><select id="sb-zona" name="zona"></select></div>
        <div class="sb-field sel"><label for="sb-min">Budget minimo</label><select id="sb-min" name="min"></select></div>
        <div class="sb-field sel"><label for="sb-mq">Superficie minima</label>
          <select id="sb-mq" name="mq"><option value="0">Qualsiasi</option>${[40, 60, 80, 100, 130, 160, 200, 300].map((v) => `<option value="${v}">${v}+ mq</option>`).join("")}</select></div>
        <div class="sb-field sel"><label for="sb-g">Spazi esterni</label>
          <select id="sb-g" name="giardino"><option value="">Indifferente</option><option value="1">Con giardino</option></select></div>
      </div>
      <div class="sb-more">
        <button type="button" class="sb-toggle" aria-expanded="false" aria-controls="sb-extra">${I.filter} Altri filtri</button>
        <span class="sb-count" aria-live="polite"></span>
      </div>
    </form>`;
    const form = host.querySelector("form");
    const $ = (s) => form.querySelector(s);
    const opt = (v, label, sel) => `<option value="${esc(v)}"${sel ? " selected" : ""}>${esc(label)}</option>`;

    function fill() {
      const base = P.items.filter((x) => x.m === f.contratto);
      form.querySelectorAll(".sb-tabs button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.c === f.contratto));
      // comuni con conteggio, i più richiesti in alto
      const cnt = {};
      base.forEach((x) => (cnt[x.co] = (cnt[x.co] || 0) + 1));
      const comuni = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a] || a.localeCompare(b));
      $("#sb-comune").innerHTML = opt("", "Tutte le zone", !f.comune) + comuni.map((c) => opt(c, `${c} (${cnt[c]})`, c === f.comune)).join("");
      // quartieri del comune scelto
      const zc = {};
      base.filter((x) => !f.comune || x.co === f.comune).forEach((x) => x.z && (zc[x.z] = (zc[x.z] || 0) + 1));
      $("#sb-zona").innerHTML = opt("", f.comune ? "Tutto il comune" : "Scegli prima il comune", !f.zona) + Object.keys(zc).sort().map((z) => opt(z, `${z} (${zc[z]})`, z === f.zona)).join("");
      $("#sb-zona").disabled = !f.comune;
      // tipologie presenti
      const gc = {};
      base.forEach((x) => { const g = P.groupOf(x.t); gc[g] = (gc[g] || 0) + 1; });
      $("#sb-tipo").innerHTML = opt("", "Tutti i tipi", !f.tipo) + P.GROUPS.filter((g) => gc[g[0]]).map((g) => opt(g[0], `${g[1]} (${gc[g[0]]})`, g[0] === f.tipo)).join("");
      const steps = BUDGET[f.contratto];
      const suff = f.contratto === "A" ? "/mese" : "";
      $("#sb-max").innerHTML = opt(0, "Nessun limite", !f.max) + steps.map((v) => opt(v, `Fino a ${euro(v)}${suff}`, v === f.max)).join("");
      $("#sb-min").innerHTML = opt(0, "Nessun minimo", !f.min) + steps.map((v) => opt(v, `Da ${euro(v)}${suff}`, v === f.min)).join("");
      $("#sb-camere").value = f.camere || 0;
      $("#sb-mq").value = f.mq || 0;
      $("#sb-g").value = f.giardino ? "1" : "";
      $("#sb-q").value = f.q;
      count();
    }
    function count() {
      const n = P.filter(f).length;
      $(".sb-count").innerHTML = n ? `<strong>${n}</strong> ${n === 1 ? "immobile corrisponde" : "immobili corrispondono"} alla ricerca` : "Nessun immobile con questi filtri: prova ad allargare la ricerca";
      $(".sb-go").textContent = opts.live ? "Aggiorna" : n ? `Mostra ${n} immobili` : "Cerca";
      opts.onChange && opts.onChange(Object.assign({}, f));
    }
    form.querySelectorAll(".sb-tabs button").forEach((b) =>
      b.addEventListener("click", () => {
        f.contratto = b.dataset.c; f.max = 0; f.min = 0; f.comune = ""; f.zona = "";
        fill();
      }));
    form.addEventListener("change", (e) => {
      const n = e.target.name;
      if (!n) return;
      if (n === "giardino") f.giardino = e.target.value === "1";
      else if (["min", "max", "camere", "mq"].includes(n)) f[n] = +e.target.value;
      else f[n] = e.target.value;
      if (n === "comune") { f.zona = ""; fill(); } else count();
    });
    let t;
    $("#sb-q").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => { f.q = e.target.value.trim(); count(); }, 180); });
    $(".sb-toggle").addEventListener("click", (e) => {
      const ex = $("#sb-extra"); const open = !ex.classList.contains("open");
      ex.classList.toggle("open", open); e.currentTarget.setAttribute("aria-expanded", open);
    });
    if (f.zona || f.min || f.mq || f.giardino) { $("#sb-extra").classList.add("open"); $(".sb-toggle").setAttribute("aria-expanded", "true"); }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      f.q = $("#sb-q").value.trim();
      if (opts.onSubmit) return opts.onSubmit(Object.assign({}, f));
      location.href = "immobili.html" + (P.toQuery(f) ? "?" + P.toQuery(f) : "");
    });
    P.setFilters = (patch) => { Object.assign(f, patch); fill(); };
    fill();
    return f;
  };

  /* ---------- header, menu e footer ---------- */
  function header(page) {
    const cur = (p) => (p === page ? ' aria-current="page"' : "");
    return `
    <div class="topbar"><div class="wrap">
      <div class="contacts"><a href="${P.TEL_HREF}">Tel: ${P.TEL}</a><a class="mail" href="mailto:${P.MAIL}">Email: ${P.MAIL}</a></div>
      <div class="social" aria-label="Social">
        <a href="https://www.facebook.com/Immobiliare-Paccoi-898913020186003/" aria-label="Facebook" target="_blank" rel="noopener">${I.fb}</a>
        <a href="https://www.youtube.com/@ImmobiliarePaccoi" aria-label="YouTube" target="_blank" rel="noopener">${I.yt}</a>
        <a href="https://www.linkedin.com/in/paolo-paccoi-29182913/" aria-label="LinkedIn" target="_blank" rel="noopener">${I.li}</a>
        <a href="https://www.instagram.com/immobiliare_paccoi/" aria-label="Instagram" target="_blank" rel="noopener">${I.ig}</a>
        <a href="https://wa.me/+${P.WA}" aria-label="WhatsApp" target="_blank" rel="noopener">${I.wa}</a>
      </div></div></div>
    <header class="site"><div class="wrap">
      <nav class="main" aria-label="Menu principale"><ul>
        <li><a href="index.html"${cur("home")}>Home</a></li>
        <li><a href="index.html#chi-siamo">Chi siamo</a></li>
        <li class="has-sub"><a href="immobili.html"${cur("immobili")}>Immobili</a>
          <ul class="sub"><li><a href="immobili.html">In vendita</a></li><li><a href="immobili.html?contratto=A">In affitto</a></li></ul></li>
        <li class="has-sub"><a href="index.html#servizi">Servizi</a>
          <ul class="sub"><li><a href="index.html#servizi">Valutazione professionale</a></li><li><a href="index.html#servizi">Valore al tuo immobile</a></li><li><a href="index.html#servizi">Marketing immobiliare</a></li></ul></li>
        <li><a href="index.html#contatti">Contatti</a></li>
      </ul></nav>
      <button class="menu-btn" aria-expanded="false" aria-controls="drawer"><span></span>MENU</button>
      <a class="logo" href="index.html" aria-label="Immobiliare Paccoi — Home">
        <img class="col" src="${LOGO_COL}" alt="San Pietro di Paolo Pompilio Paccoi &amp; c. Snc">
        <img class="neg" src="${LOGO_NEG}" alt="" aria-hidden="true"></a>
      <div class="header-cta">
        <a class="tel" href="${P.TEL_HREF}">${I.tel}${P.TEL}</a>
        <a class="btn btn-primary" href="index.html#contatti">Contattaci</a>
      </div>
    </div></header>
    <div class="drawer" id="drawer" aria-hidden="true">
      <div class="top"><img src="${LOGO_NEG}" alt="Paccoi Immobiliare"><button class="close" aria-label="Chiudi menu">×</button></div>
      <nav aria-label="Menu">
        <a href="index.html">Home</a><a href="index.html#chi-siamo">Chi siamo</a>
        <a href="immobili.html">Immobili</a><a class="sub" href="immobili.html">In vendita</a><a class="sub" href="immobili.html?contratto=A">In affitto</a>
        <a href="index.html#servizi">Servizi</a><a href="index.html#contatti">Contatti</a>
      </nav>
      <div class="foot"><a href="${P.TEL_HREF}">${P.TEL}</a><a href="mailto:${P.MAIL}">${P.MAIL}</a><span>Via Alcide De Gasperi, 14 – San Benedetto del Tronto</span></div>
    </div>`;
  }
  function footer() {
    return `<footer><div class="wrap">
      <div class="top"><div>
        <img class="flogo" src="${LOGO_NEG}" alt="San Pietro di Paolo Pompilio Paccoi &amp; c. Snc">
        <address>San Pietro di Paolo Pompilio Paccoi &amp; c. Snc<br>Via Alcide De Gasperi, 14 - San Benedetto del Tronto 63074 - P.IVA 02048130443</address></div>
        <nav aria-label="Footer"><ul><li><a href="index.html">Home</a></li><li><a href="index.html#chi-siamo">Chi siamo</a></li><li><a href="immobili.html">Immobili</a></li><li><a href="index.html#servizi">Valutazione professionale</a></li><li><a href="index.html#contatti">Contatti</a></li></ul></nav>
      </div>
      <div class="bottom"><span>Copyright © 2026 - Powered by Gestim</span>
        <div class="links"><a href="#">Sitemap</a><a href="https://www.iubenda.com/privacy-policy/24308132" target="_blank" rel="noopener">Privacy Policy</a><a href="https://www.iubenda.com/privacy-policy/24308132/cookie-policy" target="_blank" rel="noopener">Cookie Policy</a><a href="#top" onclick="scrollTo(0,0);return false">Torna su ↑</a></div></div>
    </div></footer>
    <a class="wa-float" href="https://wa.me/+${P.WA}" target="_blank" rel="noopener" aria-label="Scrivici su WhatsApp">${I.wa}</a>`;
  }
  P.chrome = (page) => {
    document.getElementById("site-header").outerHTML = header(page);
    document.getElementById("site-footer").outerHTML = footer();
    const hdr = document.querySelector("header.site");
    const onScroll = () => hdr.classList.toggle("scrolled", scrollY > 40);
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    const drawer = document.getElementById("drawer");
    const btn = document.querySelector(".menu-btn");
    const toggle = (open) => {
      drawer.classList.toggle("open", open); drawer.setAttribute("aria-hidden", !open);
      btn.setAttribute("aria-expanded", open); document.body.style.overflow = open ? "hidden" : "";
    };
    btn.addEventListener("click", () => toggle(true));
    drawer.querySelector(".close").addEventListener("click", () => toggle(false));
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggle(false)));
    addEventListener("keydown", (e) => e.key === "Escape" && toggle(false));
  };

  P.reveal = (root = document) => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    root.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
  };
})();
