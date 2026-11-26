"""Estrae tutti gli immobili (vendita + affitto) dal sito immobiliarepaccoi.it.

Uso: python -I scrape_paccoi.py <output.json>
"""
import codecs, html, http.cookiejar, json, re, sys, time, urllib.request
from concurrent.futures import ThreadPoolExecutor

BASE = "https://www.immobiliarepaccoi.it"
CDN = "https://cdn4.gestim.biz/custom/01700/foto/"
UA = "Mozilla/5.0 (prototipo redesign)"

# alcune pagine dichiarano UTF-8 ma contengono byte cp1252: li recuperiamo carattere per carattere
def _mixed(err):
    bad = err.object[err.start:err.end]
    return (bad.decode("cp1252", errors="replace"), err.end)
codecs.register_error("mixedcp", _mixed)

def opener():
    cj = http.cookiejar.CookieJar()
    op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    op.addheaders = [("User-Agent", UA)]
    return op

def get(op, url, tries=3):
    for i in range(tries):
        try:
            return op.open(url, timeout=40).read().decode("utf-8", errors="mixedcp")
        except Exception as e:
            if i == tries - 1:
                print("ERRORE", url, e, file=sys.stderr)
                return ""
            time.sleep(2 + i * 3)

def text(s):
    s = re.sub(r"<br\s*/?>", "\n", s)
    s = re.sub(r"</p>", "\n\n", s)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s)
    s = re.sub(r"[ \t\r\f\v]+", " ", s)
    s = re.sub(r"\n\s*\n\s*\n+", "\n\n", s)
    return s.strip()

def short(url):
    return url.replace(CDN, "") if url else url

def num(s):
    s = (s or "").replace(".", "").replace(",", ".")
    m = re.search(r"\d+(?:\.\d+)?", s)
    return float(m.group()) if m else None

CARD_RE = re.compile(r'<div class="immobili_listgriglia[^"]*"[^>]*>(.*?)(?=<div class="immobili_listgriglia|<nav|<ul class="pagination|$)', re.S)

def parse_cards(h, motivo):
    out = []
    for b in CARD_RE.findall(h):
        href = re.search(r'<a href="([^"]+)"', b)
        cod = re.findall(r"Cod\.\s*(\d+)", b)
        if not href or not cod:
            continue
        def cls(c):
            m = re.search(r'class="%s"[^>]*>(.*?)</div>' % c, b, re.S)
            return text(m.group(1)) if m else ""
        dove = re.search(r'class="dove"[^>]*>(.*?)<i', b, re.S)
        comune, zona = "", ""
        if dove:
            parts = [p.strip() for p in text(dove.group(1).replace("<small>", "\n")).split("\n") if p.strip()]
            comune = parts[0] if parts else ""
            zona = parts[1] if len(parts) > 1 else ""
        ic = re.search(r'class="icone[^"]*"(.*?)(?:Cod\.|class="row g-0 action")', b, re.S)
        icons = re.sub(r"\s+", " ", text("<x " + ic.group(1))) if ic else ""
        mq = re.search(r"([\d.]+)\s*mq", icons)
        bagni = re.search(r"(\d+)\s*Bagni", icons)
        camere = re.search(r"(\d+)\s*Camere", icons)
        locali = re.search(r"(\d+)\s*Locali", icons)
        img = re.search(r'<img[^>]*class="foto"[^>]*src="([^"]+)"', b) or re.search(r'class="foto"[^>]*>', b)
        img = re.search(r'src="(https://cdn4[^"]+)"', b)
        title = cls("titolo")
        price = cls("prezzo")
        out.append({
            "cod": cod[-1], "url": href.group(1), "motivo": motivo,
            "titolo": title, "tipologia": re.split(r"\s+in (?:vendita|affitto)", title)[0].strip(),
            "comune": comune, "zona": zona, "prezzo": price, "prezzoNum": num(price) if "€" in price else None,
            "mq": num(mq.group(1)) if mq else None, "bagni": int(bagni.group(1)) if bagni else None,
            "camere": int(camere.group(1)) if camere else None, "locali": int(locali.group(1)) if locali else None,
            "cover": short(img.group(1)) if img else None,
        })
    return out

def list_all(path, motivo):
    op = opener()
    get(op, BASE + path)  # imposta la ricerca in sessione
    items, seen = [], set()
    for p in range(0, 80):
        h = get(op, BASE + "/immobili/business3/" + (f"?p={p}" if p else ""))
        cards = [c for c in parse_cards(h, motivo) if c["cod"] not in seen]
        if not cards:
            break
        for c in cards:
            seen.add(c["cod"])
        items += cards
        time.sleep(0.3)
    return items

def detail(item):
    op = opener()
    h = get(op, item["url"])
    if not h:
        return item
    body = re.sub(r"<script.*?</script>|<style.*?</style>", "", h, flags=re.S)
    h1 = re.search(r"<h1>(.*?)</h1>", body, re.S)
    item["titoloCompleto"] = text(h1.group(1)) if h1 else item["titolo"]
    d = re.search(r'Descrizione\s*</div>.*?<div class="testo">(.*?)</div>', body, re.S)
    item["descrizione"] = text(d.group(1)) if d else ""
    feats = []
    for f in re.findall(r'caratteristichelinee"[^>]*>.*?<div class="col-12 border-bottom">(.*?)</div>', body, re.S):
        t = text(f)
        if ":" in t:
            k, v = t.split(":", 1)
            feats.append([k.strip(), v.strip()])
    item["caratteristiche"] = feats
    zone = re.search(r'id="collapse_zone"(.*?)<div class="clear">', body, re.S)
    item["vicinanze"] = [text(x) for x in re.findall(r'<span class="border-bottom">(.*?)</span>', zone.group(1))] if zone else []
    gal = re.search(r'class="gallery thumb_bottom"(.*?)(?:col-lg-3\s+dx|Descrizione)', h, re.S)
    photos = []
    if gal:
        for src in re.findall(r'<source srcset="(https://cdn4[^"]+)"', gal.group(1)):
            if "/thumb/" not in src and src not in photos:
                photos.append(src)
    item["foto"] = [short(p) for p in photos]
    pl = re.search(r'class="planimetrie"(.*?)class="modal fade', body, re.S)
    item["planimetrie"] = [short(p) for p in dict.fromkeys(re.findall(r'srcset="(https://cdn4[^"]+)"', pl.group(1)))] if pl else []
    ce = re.search(r'class="liv_classe[^"]*">([^<]+)<', body)
    item["classeEnergetica"] = ce.group(1).strip() if ce else None
    ll = re.search(r'var lat = "([\d.]+)";\s*var lgt = "([\d.]+)"', h)
    item["coord"] = [float(ll.group(1)), float(ll.group(2))] if ll else None
    return item

def main(out):
    items = list_all("/immobili-in-vendita/", "Vendita") + list_all("/immobili-in-affitto/", "Affitto")
    print("schede in elenco:", len(items), file=sys.stderr)
    done = []
    with ThreadPoolExecutor(max_workers=4) as ex:
        for i, it in enumerate(ex.map(detail, items)):
            done.append(it)
            if i % 50 == 0:
                print("dettagli:", i, file=sys.stderr)
    data = {"aggiornato": time.strftime("%Y-%m-%d"), "cdn": CDN, "immobili": done}
    with open(out, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    print("salvati", len(done), "immobili in", out, file=sys.stderr)

if __name__ == "__main__":
    main(sys.argv[1])
