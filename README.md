# Paccoi Immobiliare – prototipo redesign

Prototipo statico (HTML/CSS/JS, nessun build) del sito di Paccoi Immobiliare, ispirato a wetag.ch.

## Pagine
- `index.html` – home: hero con barra di ricerca, selezione casuale di immobili, zone, servizi, contatti, team
- `immobili.html` – ricerca con filtri (contratto, zona/comune, quartiere, tipologia, budget, camere, superficie, giardino, codice o parola chiave); i filtri restano nell'indirizzo, quindi una ricerca si può condividere
- `immobile.html?cod=XXXXX` – scheda: galleria a schermo intero, dati principali, descrizione, caratteristiche, vicinanze, planimetrie, mappa, richiesta informazioni (telefono, WhatsApp, email con il codice già inserito)

## Dati
I dati degli immobili sono estratti dal sito ufficiale immobiliarepaccoi.it:
- `data/immobili.js` – indice leggero usato dalla ricerca
- `data/schede/<cod>.js` – dettaglio di ogni immobile

Per aggiornarli (serve Python 3):
```
python -I tools/scrape_paccoi.py immobili.json
python -I tools/build_data.py immobili.json .
```

Per provarlo in locale basta aprire `index.html` nel browser (funziona anche senza server).
I moduli di contatto sono dimostrativi e non inviano nulla.
