"""Converte immobili.json nei file dati del sito.

Uso: python -I build_data.py <immobili.json> <cartella repo>
Crea:
  data/immobili.js         -> indice leggero per la ricerca (window.PACCOI_INDEX)
  data/schede/<cod>.js     -> dettaglio di ogni immobile (window.PACCOI_SCHEDA)
"""
import json, os, sys, urllib.parse, importlib.util

src, repo = sys.argv[1], sys.argv[2]
here = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("s", os.path.join(here, "scrape_paccoi.py"))
s = importlib.util.module_from_spec(spec); spec.loader.exec_module(s)

data = json.load(open(src, encoding="utf-8"))
items = data["immobili"]

# recupera le schede fallite (URL con caratteri non ASCII)
for it in items:
    if "descrizione" not in it:
        parts = urllib.parse.urlsplit(it["url"])
        it["url"] = urllib.parse.urlunsplit(parts._replace(path=urllib.parse.quote(parts.path)))
        s.detail(it)
        print("recuperato", it["cod"], "foto:", len(it.get("foto", [])), file=sys.stderr)

# niente doppioni
seen, uniq = set(), []
for it in items:
    if it["cod"] in seen:
        continue
    seen.add(it["cod"]); uniq.append(it)

os.makedirs(os.path.join(repo, "data", "schede"), exist_ok=True)
index = []
for it in uniq:
    feats = dict(it.get("caratteristiche") or [])
    index.append({
        "c": it["cod"], "m": "A" if it["motivo"] == "Affitto" else "V",
        "t": it["tipologia"], "co": it["comune"], "z": it["zona"],
        "p": it["prezzoNum"], "ps": it["prezzo"],
        "mq": it["mq"], "b": it["bagni"], "ca": it["camere"], "l": it["locali"],
        "img": it["cover"], "nf": len(it.get("foto") or []),
        "ce": it.get("classeEnergetica"),
        "g": 1 if feats.get("Giardino") and feats.get("Giardino") not in ("No", "Nessuno") else 0,
    })
    scheda = {k: it.get(k) for k in ("cod", "motivo", "titolo", "titoloCompleto", "tipologia", "comune", "zona",
                                     "prezzo", "prezzoNum", "mq", "bagni", "camere", "locali", "cover", "foto",
                                     "planimetrie", "descrizione", "caratteristiche", "vicinanze",
                                     "classeEnergetica", "coord", "url")}
    with open(os.path.join(repo, "data", "schede", it["cod"] + ".js"), "w", encoding="utf-8") as f:
        f.write("window.PACCOI_SCHEDA=" + json.dumps(scheda, ensure_ascii=False, separators=(",", ":")) + ";\n")

with open(os.path.join(repo, "data", "immobili.js"), "w", encoding="utf-8") as f:
    f.write("/* Dati estratti da immobiliarepaccoi.it il " + data["aggiornato"] + " */\n")
    f.write("window.PACCOI_INDEX=" + json.dumps({"cdn": data["cdn"], "aggiornato": data["aggiornato"], "items": index},
                                                ensure_ascii=False, separators=(",", ":")) + ";\n")
print("indice:", len(index), "immobili", file=sys.stderr)
