/* =========================================================
   Paccoi Immobiliare — musica di sottofondo bossa nova / jazz
   Generata dal vivo con la Web Audio API: nessun file audio,
   nessun diritto d'autore. Piano elettrico con accordi jazz,
   contrabbasso, shaker, rim click e vibrafono che improvvisa.
   ========================================================= */
(function () {
  const KEY = "paccoi-musica";
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;

  const BPM = 126;
  const S16 = 60 / BPM / 4;              // durata di un sedicesimo
  const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

  // giro armonico di 8 battute (fa maggiore): [basso, voicing piano]
  const PROG = [
    [41, [57, 60, 64, 67]], // Fmaj9
    [41, [57, 60, 64, 67]],
    [43, [59, 62, 65, 69]], // G9
    [43, [59, 62, 65, 69]],
    [43, [58, 62, 65, 69]], // Gm9
    [36, [58, 62, 64, 69]], // C13
    [45, [55, 60, 64, 67]], // Am7
    [38, [57, 60, 63, 66]], // D7(b9) -> torna a Gm
  ];
  const PROG2 = [ // seconda parte, per non ripetere sempre uguale
    [46, [57, 60, 62, 65]], // Bbmaj7(9)
    [46, [57, 60, 62, 65]],
    [39, [55, 58, 62, 65]], // Eb9
    [39, [55, 58, 62, 65]],
    [45, [55, 60, 64, 67]], // Am7
    [38, [57, 60, 63, 66]], // D7b9
    [43, [58, 62, 65, 69]], // Gm9
    [36, [58, 62, 64, 70]], // C7(9,13)
  ];
  // ritmo "chitarra" bossa su due battute (posizioni in sedicesimi)
  const COMP = new Set([0, 3, 6, 10, 12, 18, 22, 24, 28]);
  const CLAVE = new Set([0, 6, 12, 20, 26]);
  // basso: [posizione, intervallo, durata in sedicesimi]
  const BASS = [[0, 0, 5], [6, 7, 2], [8, 7, 5], [14, 0, 2]];

  let ctx, master, dry, wet, noise, timer, step = 0, nextT = 0, playing = false;

  function init() {
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.ratio.value = 3;
    const tone = ctx.createBiquadFilter(); tone.type = "lowshelf"; tone.frequency.value = 220; tone.gain.value = 2;
    master.connect(tone).connect(comp).connect(ctx.destination);
    dry = ctx.createGain(); dry.connect(master);
    // riverbero: risposta all'impulso generata (stanza morbida)
    const rev = ctx.createConvolver();
    const len = ctx.sampleRate * 2.4, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
    }
    rev.buffer = ir;
    wet = ctx.createGain(); wet.gain.value = 0.32;
    wet.connect(rev).connect(master);
    // rumore bianco per le percussioni
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const nd = noise.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  }

  const out = (node, send = 0.3) => { node.connect(dry); if (send) { const g = ctx.createGain(); g.gain.value = send; node.connect(g).connect(wet); } };
  const hum = () => (Math.random() - 0.5) * 0.012;   // piccola imprecisione "umana"

  // piano elettrico morbido (tipo Rhodes)
  function ep(t, n, dur, vel) {
    const f = midi(n), g = ctx.createGain(), lp = ctx.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 1900; lp.Q.value = 0.4;
    const o1 = ctx.createOscillator(); o1.type = "sine"; o1.frequency.value = f;
    const o2 = ctx.createOscillator(); o2.type = "triangle"; o2.frequency.value = f; o2.detune.value = 4;
    const o3 = ctx.createOscillator(); o3.type = "sine"; o3.frequency.value = f * 4.01; // "campanella" del Rhodes
    const g3 = ctx.createGain(); g3.gain.setValueAtTime(vel * 0.05, t); g3.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    const g2 = ctx.createGain(); g2.gain.value = 0.35;
    o1.connect(g); o2.connect(g2).connect(g); o3.connect(g3).connect(g);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vel * 0.09, t + 0.006);
    g.gain.exponentialRampToValueAtTime(vel * 0.04, t + 0.18);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.45);
    g.connect(lp); out(lp, 0.35);
    [o1, o2, o3].forEach((o) => { o.start(t); o.stop(t + dur + 0.5); });
  }
  // contrabbasso
  function bass(t, n, dur) {
    const f = midi(n), g = ctx.createGain(), lp = ctx.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 520;
    const o = ctx.createOscillator(); o.type = "triangle"; o.frequency.value = f;
    const s = ctx.createOscillator(); s.type = "sine"; s.frequency.value = f;
    o.connect(g); s.connect(g);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.22, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.11, t + 0.15);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.12);
    g.connect(lp); out(lp, 0.08);
    o.start(t); s.start(t); o.stop(t + dur + 0.2); s.stop(t + dur + 0.2);
  }
  function noiseHit(t, type, freq, q, vol, dec, send = 0.15) {
    const src = ctx.createBufferSource(); src.buffer = noise;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dec);
    src.connect(f).connect(g); out(g, send);
    src.start(t, Math.random() * 0.5); src.stop(t + dec + 0.02);
  }
  const shaker = (t, v) => noiseHit(t, "highpass", 7000, 0.7, 0.05 * v, 0.06, 0.1);
  function rim(t) {
    noiseHit(t, "bandpass", 2600, 9, 0.12, 0.035, 0.2);
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = 1750; g.gain.setValueAtTime(0.025, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    o.connect(g); out(g, 0.2); o.start(t); o.stop(t + 0.04);
  }
  function kick(t) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(95, t); o.frequency.exponentialRampToValueAtTime(48, t + 0.12);
    g.gain.setValueAtTime(0.16, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    o.connect(g); out(g, 0); o.start(t); o.stop(t + 0.25);
  }
  // vibrafono che improvvisa sulle note dell'accordo
  function vibes(t, n, dur) {
    const o = ctx.createOscillator(), g = ctx.createGain(), trem = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
    o.type = "sine"; o.frequency.value = midi(n);
    lfo.frequency.value = 5.2; lg.gain.value = 0.35; lfo.connect(lg).connect(trem.gain); trem.gain.value = 0.65;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.05, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 1.2);
    o.connect(trem).connect(g); out(g, 0.5);
    o.start(t); lfo.start(t); o.stop(t + dur + 1.3); lfo.stop(t + dur + 1.3);
  }

  let lastVib = 72;
  function play(i, t) {
    const part = Math.floor(i / 128) % 2 ? PROG2 : PROG;
    const bar = Math.floor(i / 16) % 8, p16 = i % 16, p32 = i % 32;
    const [root, chord] = part[bar];
    if (p16 % 2 === 0) shaker(t + hum(), p16 % 4 === 2 ? 1 : 0.6);
    else if (Math.random() < 0.35) shaker(t + hum(), 0.35);
    if (p16 === 0 || p16 === 8) kick(t);
    if (CLAVE.has(p32)) rim(t + hum());
    if (COMP.has(p32)) {
      const vel = 0.75 + Math.random() * 0.25;
      chord.forEach((n, k) => ep(t + hum() + k * 0.004, n, S16 * 2.2, vel));
    }
    BASS.forEach(([pos, iv, len]) => { if (pos === p16) bass(t, root + iv, S16 * len); });
    // frase di vibrafono: note vicine tra loro, con pause
    if ((p16 % 2 === 0) && Math.random() < (p16 % 4 === 0 ? 0.3 : 0.14)) {
      const pool = chord.map((n) => n + 12).concat(chord.map((n) => n + 24)).filter((n) => Math.abs(n - lastVib) <= 7);
      const n = pool.length ? pool[Math.floor(Math.random() * pool.length)] : chord[1] + 12;
      lastVib = n; vibes(t + hum(), n, S16 * 2);
    }
  }

  function tick() {
    while (nextT < ctx.currentTime + 0.15) { play(step, nextT); step++; nextT += S16; }
  }
  function start() {
    if (!ctx) init();
    ctx.resume();
    if (!timer) { nextT = ctx.currentTime + 0.08; timer = setInterval(tick, 25); }
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 2.5);
    playing = true; ui();
  }
  function stop() {
    if (!ctx) return;
    playing = false; ui();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    setTimeout(() => { if (!playing) { clearInterval(timer); timer = null; ctx.suspend(); } }, 900);
  }

  /* ---------- pulsante ---------- */
  // la scelta "musica spenta" vale solo per la visita in corso:
  // a ogni nuova apertura del sito la musica è di nuovo attiva
  const pref = () => sessionStorage.getItem(KEY);
  const btn = document.createElement("button");
  btn.type = "button"; btn.className = "music-btn";
  btn.innerHTML = '<span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="lbl">Musica</span>';
  function ui() {
    btn.classList.toggle("on", playing);
    btn.setAttribute("aria-pressed", playing);
    btn.setAttribute("aria-label", playing ? "Disattiva la musica di sottofondo" : "Attiva la musica di sottofondo");
    btn.querySelector(".lbl").textContent = playing ? "Musica on" : "Musica off";
  }
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (playing && ctx && ctx.state === "running") { stop(); sessionStorage.setItem(KEY, "off"); }
    else { start(); sessionStorage.setItem(KEY, "on"); }
  });
  document.body.appendChild(btn); ui();

  // se il browser blocca l'audio, riparte al primo clic/tocco/tasto sulla pagina
  const GESTURES = ["pointerdown", "keydown", "touchend"];
  function armGesture() {
    const go = (e) => {
      GESTURES.forEach((ev) => removeEventListener(ev, go, true));
      btn.classList.remove("hint");
      if (btn.contains(e.target)) return;            // il pulsante gestisce da sé il clic
      if (pref() !== "off") start();
    };
    GESTURES.forEach((ev) => addEventListener(ev, go, { capture: true, passive: true }));
    btn.classList.add("hint");
  }

  // all'apertura: proviamo subito a suonare; se il browser blocca l'audio
  // (regola di tutti i browser), la musica parte al primo clic, tocco o tasto
  if (pref() !== "off") {
    start();
    setTimeout(() => { if (ctx.state !== "running") armGesture(); }, 350);
  }
  // pausa quando la scheda non è visibile
  document.addEventListener("visibilitychange", () => {
    if (!ctx || !playing) return;
    if (document.hidden) ctx.suspend(); else ctx.resume();
  });
})();
