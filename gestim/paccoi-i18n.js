/* =========================================================
   Paccoi Immobiliare — versione inglese del sito
   Si carica solo quando il visitatore sceglie "EN".
   Traduce i testi fissi del sito (menu, pagine, filtri, schede,
   mappa, pagina dell'annuncio) con un dizionario curato a mano.
   Le descrizioni libere degli annunci, scritte nel gestionale,
   si traducono con il traduttore integrato nel browser, se c'è,
   altrimenti con un link alla traduzione di Google.
   ========================================================= */
(function () {
  "use strict";
  if (window.PKI18N) return;

  var D = {
    // menu, intestazione, piè di pagina
    "Home": "Home", "Chi siamo": "About us", "Immobili": "Properties", "In vendita": "For sale", "In affitto": "For rent",
    "Mappa": "Map", "Servizi": "Services", "Valutazione professionale": "Professional valuation",
    "Valore al tuo immobile": "Adding value to your property", "Marketing immobiliare": "Property marketing",
    "Contatti": "Contact", "Contattaci": "Contact us", "Torna su": "Back to top", "Sitemap": "Sitemap",
    "Menu": "Menu", "Ricerca": "Search", "Chiamaci": "Call us", "Scrivici": "Write to us", "Whatsapp": "WhatsApp",
    "Ti trovi in:": "You are here:", "Risultati della ricerca": "Search results",
    "Le tue preferenze relative al consenso per le tecnologie di tracciamento": "Your consent preferences for tracking technologies",
    "Musica": "Music", "Musica on": "Music on", "Musica off": "Music off",
    "Disattiva la musica di sottofondo": "Turn off the background music", "Attiva la musica di sottofondo": "Turn on the background music",
    "Visualizza i preferiti": "View favourites", "Preferiti": "Favourites", "Stampa": "Print", "Condividi": "Share",
    "Agenzia immobiliare · San Benedetto del Tronto": "Real estate agency · San Benedetto del Tronto",
    "Email: Agenzia immobiliare a San Benedetto del Tronto": "Email: real estate agency in San Benedetto del Tronto",
    "Powered by": "Powered by",

    // barra dei filtri
    "Codice": "Code", "Prezzo da": "Min price", "Prezzo a": "Max price", "Comune": "Town", "Zone": "Areas",
    "Qualsiasi": "Any", "Vendita": "Sale", "Affitto": "Rent", "Tipologia": "Type", "Tipologia -": "Type -",
    "Cerca": "Search", "CERCA": "SEARCH", "Cerca!": "Search!", "ALTRO": "MORE", "altro": "more",
    "Camere minime": "Min. bedrooms", "Bagni minimi": "Min. bathrooms", "Locali minimi": "Min. rooms",
    "Arredato": "Furnished", "Nuova costruzione": "New build", "Giardino": "Garden", "Posto auto/Box": "Parking / garage",
    "Lusso": "Luxury", "Balcone/Terrazzo": "Balcony / terrace", "Ascensore": "Lift", "Solo foto": "With photos only",
    "Mq da": "m² from", "Mq a": "m² to", "da": "from", "a": "to", "Contratto": "Contract",
    "Scegli dove cercare": "Choose where to search", "Provincia": "Province", "multiscelta": "multiple choice",
    "Residenziali": "Residential", "Commerciali": "Commercial", "Industriali": "Industrial", "Terreni": "Land",
    "Prezzo": "Price", "Totale mq": "Total m²", "Altre opzioni -": "More options -",

    // tipologie
    "Appartamento": "Apartment", "Casa cielo - terra": "Independent house", "Casale Colonico Rustico": "Farmhouse / country house",
    "Garage / Autorimessa / Box": "Garage", "Posto auto": "Parking space", "Stabile / Palazzo": "Building / palazzo",
    "Villa singola": "Detached villa", "Villino a schiera / bifamiliare": "Terraced / semi-detached house",
    "Albergo / Residence / Struttura Ricettiva": "Hotel / residence / guest accommodation", "Attività commerciale": "Business for sale",
    "Edificio Commerciale": "Commercial building", "Locale Commerciale": "Commercial premises", "Stabilimento Balneare": "Beach club",
    "Ufficio / Studio Professionale": "Office", "Capannone": "Warehouse", "Edificio Industriale / Artigianale": "Industrial building",
    "Locale Artigianale / Deposito": "Workshop / storage", "Terreno Agricolo": "Agricultural land",
    "Terreno Agricolo (con / Senza Piccolo Prefabbricato)": "Agricultural land (with / without small outbuilding)",
    "Terreno Edificabile Artigianale / Industriale": "Industrial building land", "Terreno Edificabile Residenziale": "Residential building land",
    "Terreno Edificabile Solo Commerciale / Altre Destinazioni": "Commercial building land / other uses",
    "Villa": "Villa", "Attico": "Penthouse", "Loft": "Loft", "Rustico": "Country house", "Magazzino": "Warehouse", "Negozio": "Shop",

    // home
    "Accompagniamo i clienti nella ricerca del loro futuro": "We guide our clients in the search for their future",
    "Il gruppo “PACCOI IMMOBILIARE” nasce per occuparsi dell'intermediazione e vendita di immobili residenziali e commerciali, collocati su tutto il territorio italiano.":
      "“PACCOI IMMOBILIARE” was founded to handle the brokerage and sale of residential and commercial properties throughout Italy.",
    "La totale trasparenza e integrità nella gestione dei processi di intermediazione e l’estrema cura del Cliente rappresentano il Codice Etico della “PACCOI IMMOBILIARE”.":
      "Complete transparency and integrity in every sale, and the utmost care for our clients, are the code of ethics of “PACCOI IMMOBILIARE”.",
    "Selezionati per te": "Selected for you", "Vedi tutti gli immobili": "See all properties", "in Vendita": "for Sale", "in Affitto": "for Rent",
    "Dettagli": "Details", "Bagni": "Bathrooms", "Camere": "Bedrooms", "Locali": "Rooms", "Visto": "Viewed", "VISTO": "VIEWED",
    "Tratt. riservata": "Price on request", "Trattativa riservata": "Price on request", "Tratt.": "On request",
    "Tutte le zone": "All areas", "Cerca nella tua zona": "Search your area", "Vedi gli immobili →": "See the properties →",
    "Perché sceglierci": "Why choose us", "Le nostre sedi": "Our offices", "Scopri di più": "Find out more",
    "Compravendite immobiliari": "Property sales", "Residenziali e commerciali": "Residential and commercial",
    "Stime e consulenza": "Valuations and advice", "Stime professionali": "Professional valuations",
    "Parliamo della tua casa": "Let's talk about your home", "Compila il modulo": "Fill in the form",
    "* Nome": "* First name", "Nome": "First name", "Cognome": "Last name", "* Telefono": "* Phone", "Telefono": "Phone",
    "* Email": "* Email", "* Di quali informazioni hai bisogno?": "* What information do you need?",
    "Compilando ed inviando questo modulo di richiesta, autorizzo il trattamento dei miei dati personali ai sensi dell'attuale normativa e confermo di aver preso visione dell'informativa privacy.":
      "By filling in and sending this form, I consent to the processing of my personal data under current law and confirm that I have read the privacy policy.",
    "Invia": "Send", "Il nostro staff": "Our staff", "Scopri il nostro TEAM!": "Meet our TEAM!",
    "Una squadra completa al tuo servizio!": "A complete team at your service!", "Titolare agenzia": "Agency owner",
    "vai alla scheda": "view profile", "Collaboratore": "Associate",

    // chi siamo, contatti
    "Nei 20 anni di attività, la Società ha raggiunto grandi traguardi e costruito importanti relazionali con Clienti venditori, Acquirenti ed Investitori.":
      "In 20 years of business the company has reached important milestones and built strong relationships with sellers, buyers and investors.",
    "Il gruppo “PACCOI IMMOBILIARE” è da sempre guidato nel suo lavoro dai principi di professionalità, fiducia ed efficienza.":
      "“PACCOI IMMOBILIARE” has always been guided by professionalism, trust and efficiency.",
    "L'accurata selezione delle proprietà, effettuata dai professionisti di “PACCOI IMMOBILIARE” è finalizzata alla migliore collocazione dei beni all'interno del target prescelto. Per questo motivo la Società investe in modo importante nella realizzazione di shooting fotografici, di campagne marketing e di strategie di comunicazione integrata, così da ottimizzare richieste e offerte del mercato di riferimento.":
      "The careful selection of properties by the professionals of “PACCOI IMMOBILIARE” aims to place each property in front of the right buyers. That is why the company invests heavily in photo shoots, marketing campaigns and integrated communication, to attract the right enquiries and offers.",
    "Tel.": "Tel.", "tel.": "tel.",

    // servizi
    "Valutazione professionale per Vendere al prezzo giusto": "Professional valuation to sell at the right price",
    "Oltre 20 anni di esperienza al servizio di chi vuole vendere il proprio immobile.": "Over 20 years of experience helping owners sell their property.",
    "Valutiamo la tua casa GRATUITAMENTE servendoci dei migliori strumenti che ci offre la tecnologia. Realizziamo accurate analisi di mercato e del territorio specifico.":
      "We value your home FREE OF CHARGE using the best tools technology offers, with accurate analysis of the market and the local area.",
    "Verifichiamo la correttezza della documentazione e guidiamo i clienti nel complesso mondo burocratico.":
      "We check that all documents are in order and guide our clients through the paperwork.",
    "Siamo parte attiva della comunità, ne conosciamo le dinamiche sociali e commerciali. Viviamo immersi nel mercato immobiliare, motivo per il quale individuiamo l’esatto valore di mercato degli immobili.":
      "We are an active part of the community and know its social and commercial life. We live and breathe the property market, which is why we can find the exact market value of every property.",
    "Valorizziamo il tuo immobile": "We bring out the best in your property",
    "Investiamo nel vostro immobile con la realizzazione di shooting fotografici, di campagne marketing e di strategie di comunicazione integrata, così da ottimizzare richieste e offerte del mercato di riferimento.":
      "We invest in your property with professional photo shoots, marketing campaigns and integrated communication, to attract the right enquiries and offers.",
    "Realizziamo planimetrie di altissima qualità, virtual tour e servizi con il drone.": "We produce top-quality floor plans, virtual tours and drone footage.",
    "Promuoviamo al meglio il tuo immobile": "We promote your property at its best",
    "Negli anni abbiamo messo insieme una serie di strumenti e di azioni che ci consentono di promuovere al meglio il vostro immobile.":
      "Over the years we have built a set of tools and actions that let us promote your property at its best.",
    "Oltre alle pubblicazioni sui siti vetrina, creiamo un piano di marketing che ci consente di proporre il tuo immobile al giusto target di riferimento.":
      "Besides listing on property portals, we create a marketing plan that puts your property in front of the right buyers.",
    "Investiamo quotidianamente in campagne pubblicitarie sui social e su tutti i motori di ricerca.": "Every day we invest in advertising on social media and on all search engines.",
    "Queste combinazioni ci portano ad avere ogni anno oltre 20.000 richieste di informazioni per immobili specifici, dandoci la possibilità di vendere velocemente e al giusto prezzo!":
      "This brings us more than 20,000 enquiries a year for specific properties, so we can sell quickly and at the right price!",

    // elenco risultati
    "Ordina per:": "Sort by:", "Ordina per": "Sort by", "Ordina": "Sort", "Più rilevanti": "Most relevant", "Metri quadri": "Square metres",
    "Data aggiornamento": "Last updated", "cambia vista:": "change view:", "Schede": "Cards", "Lista": "List", "Zona": "Area",
    "IN VENDITA": "FOR SALE", "IN AFFITTO": "FOR RENT", "mq": "m²",

    // mappa
    "Torna all'elenco": "Back to the list", "Tutti": "All", "Tutte": "All", "Prezzo fino a": "Max price", "Azzera filtri": "Clear filters",
    "Mostra solo gli immobili nell'area visibile sulla mappa": "Only show properties in the visible map area",
    "Nessun immobile in quest'area con questi filtri. Sposta la mappa o allarga i filtri.": "No properties in this area with these filters. Move the map or widen the filters.",
    "Posizioni indicative": "Approximate locations", "Cerca in quest'area": "Search this area", "Mostra la mappa": "Show the map",
    "Mostra l'elenco": "Show the list", "nell'area della mappa": "in the map area", "in elenco": "listed",
    "La mappa non si è caricata. Riprova tra poco.": "The map did not load. Please try again shortly.",
    "Mappa degli immobili": "Property map", "Avvicina": "Zoom in", "Allontana": "Zoom out",

    // pagine "Perché sceglierci"
    "Perché sceglierci": "Why choose us", "Sede principale": "Main office", "Indirizzo": "Address", "Responsabile": "Manager",
    "Orari di apertura": "Opening hours", "Orario invernale": "Winter hours", "Orario estivo": "Summer hours", "Indicazioni": "Directions",
    "Siamo aperti tutti i giorni tranne il sabato pomeriggio e l’intera domenica.": "We are open every day except Saturday afternoon and all day Sunday.",
    "Al tuo fianco": "By your side", "Ogni fase, con i professionisti giusti": "Every step, with the right professionals",
    "Notaio di tua fiducia o da noi suggerito": "A notary of your choice, or one we recommend", "Periti esperti del settore edile e immobiliare": "Expert building and property surveyors",
    "Principali banche per mutui e prestiti": "Leading banks for mortgages and loans", "Tecnici per il certificato energetico": "Certified energy assessors",
    "La provvigione è dovuta solo ad affare concluso.": "Our fee is only due once the sale is completed.",
    "Mercato sempre aggiornato": "Up-to-date market knowledge", "Dalla proposta al rogito": "From offer to completion",
    "Prima di comprare casa": "Before you buy", "Sei controlli da fare, insieme a noi": "Six checks to make, together with us",
    "La zona": "The area", "Lo stato dell'immobile": "The condition of the property", "Ipoteche": "Mortgages and charges", "Condoni edilizi": "Planning amnesties",
    "Certificazioni degli impianti": "System certificates", "Parliamone": "Let's talk",
    "Vuoi sapere quanto vale la tua casa?": "Want to know what your home is worth?", "Ti richiamiamo noi, senza impegno.": "We'll call you back, with no obligation.",
    "La valutazione è gratuita e senza impegno.": "The valuation is free and with no obligation.", "Valutazione gratuita": "Free valuation",
    "Oggi vendere un bene immobile non può più limitarsi ad una semplice messa in contatto della domanda con l’offerta.":
      "Today, selling a property can no longer be just a matter of putting buyers and sellers in touch.",
    "Occorre sempre più organizzare tutta una serie di servizi integrativi e complementari per assicurare il completo successo di ogni transazione. La nostra agenzia garatisce la transazione immobiliare accompagnandovi in tutte le fasi dell’acquisto e della vendita, in collaborazione con un notaio di vostra fiducia (o da noi suggerito), esperti periti del settore edile/immobiliare e principali istituti bancari per quanto riguarda mutui e prestiti, tecnici abilitati a produrre il certificato di prestazione energetica, perché il nostro guadagno è legato ad un obbligo di risultato, pertanto la mediazione, è dovuta solamente all’effettiva conclusione dell’affare.":
      "More and more, a whole range of additional services is needed to make every transaction a complete success. Our agency looks after the whole transaction and supports you through every stage of buying and selling, working with a notary of your choice (or one we recommend), expert building and property surveyors, the main banks for mortgages and loans, and certified assessors for the energy performance certificate. Our fee is tied to results: commission is only due once the deal is actually completed.",
    "Partiamo da una conoscenza sempre aggiornata dei mercati immobiliari in cui operiamo, sia in termini di conoscenza dei bisogni della domanda sia per quanto riguarda la giusta determinazione dei prezzi.":
      "We start from an always up-to-date knowledge of the property markets we work in, both in understanding what buyers need and in setting the right price.",
    "Seguiamo ogni negoziazione in tutte le sue fasi fino alla completa definizione dell’operazione, dalla proposta di acquisto al rogito notarile.":
      "We follow every negotiation through all its stages until the deal is fully completed, from the purchase offer to the signing at the notary.",
    "L’ acquisto di una casa, soprattutto della prima casa, è un passo fondamentale nella vita di un uomo.":
      "Buying a home, especially your first home, is one of the most important steps in life.",
    "Il possederla infonde sicurezza e tranquillità. E’ un traguardo, una meta che trascende il puro investimento economico e coinvolge il nostro atavico bisogno di protezione.":
      "Owning it brings security and peace of mind. It is a milestone, a goal that goes beyond a financial investment and touches our age-old need for shelter.",
    "Dopo l’acquisto possiamo modificarla, ristrutturarla sino a quando non assumerà quelle caratteristiche volute o addirittura sognate precedentemente: è nostra. Ma l’eccitazione legata a questo importante acquisto deve essere necessariamente accompagnata da una serie di informazioni preliminari.":
      "Once bought, we can change it and renovate it until it becomes the home we wanted, or even dreamed of: it is ours. But the excitement of such an important purchase must go hand in hand with some careful preliminary checks.",
    "Ponete attenzione alla zona in cui l’immobile si trova. Valutatene la rumorosità, l’esistenza di aree verdi, di scuole, di parcheggi, negozi, della vicinanza di fermate di mezzi pubblici.":
      "Pay attention to the area where the property is located. Consider the noise, green spaces, schools, parking, shops and how close public transport stops are.",
    "Attenzione allo stato di conservazione sia dello stabile che dell’appartamento. Verificatene la luminosità e l’esposizione ed eventuali ristrutturazioni da effettuare.":
      "Check the condition of both the building and the apartment. Look at the natural light, the aspect and any renovation work needed.",
    "Assicuratevi che sulla casa non gravino ipoteche. Questo controllo può essere effettuato presso la conservatoria dei registri avendo a disposizione i dati anagrafici del venditore.":
      "Make sure there are no mortgages or charges on the property. This can be checked at the land registry with the seller's personal details.",
    "Verificate se presso il Comune siano state presentate domande di condono edilizio e a che punto siano le pratiche. Il venditore è comunque tenuto a dichiarare, al momento del rogito, l’inesistenza di opere abusive inerenti l’appartamento.":
      "Check with the town council whether any planning amnesty applications have been filed and how far they have progressed. In any case, at completion the seller must declare that there is no unauthorised building work on the property.",
    "Richiedete un estratto conto, all’amministratore di condominio, per verificare la regolarità dei pagamenti da parte del venditore. Chiedete se sono in previsione spese condominiali straordinarie e per quale importo. Verificate che nel compromesso sia inserita la clausola attestante che sino al momento del rogito le spese condominiali saranno a carico del venditore.":
      "Ask the building manager for a statement to check that the seller is up to date with payments. Ask whether any extraordinary service charges are planned, and how much they will be. Make sure the preliminary contract states that service charges are paid by the seller until completion.",
    "Fatevi consegnare, laddove già eseguiti, la certificazione di conformità redatta da un tecnico abilitato, di tutti gli impianti elettrici, del gas e termici. Dal 31/12/98 tutti questi impianti devono essere adeguati, infatti, alle normative sulla sicurezza previste dalla legge 46/1990 e successive modificazioni ed integrazioni.":
      "Where available, ask for the compliance certificates issued by a qualified technician for all electrical, gas and heating systems. Since 31/12/98 all these systems must meet the safety standards of Law 46/1990 and later amendments.",
    // "Quanto vale la tua casa?"
    "Quanto vale la tua casa?": "What is your home worth?", "Quanto vale casa?": "Home valuation",
    "Una stima professionale, gratuita e senza impegno, da chi conosce il mercato della costa e dell'entroterra da oltre 20 anni.":
      "A professional valuation, free and with no obligation, from people who have known the coastal and inland market for over 20 years.",
    "Valuta ora": "Get a valuation", "Continua": "Continue", "Scegli…": "Choose…", "Es. Grottammare": "E.g. Grottammare", "Es. 90": "E.g. 90",
    "Via o quartiere (facoltativo)": "Street or area (optional)", "Indirizzo o zona": "Address or area",
    "Villa / casa indipendente": "Villa / detached house", "Casale / rustico": "Farmhouse / country house", "Terreno": "Land",
    "Locale commerciale / ufficio": "Shop / office", "Altro": "Other", "Buono / abitabile": "Good / habitable", "Nuovo o ristrutturato": "New or renovated",
    "Raccontaci il tuo immobile in pochi secondi: ti ricontattiamo noi per una valutazione professionale, gratuita e senza impegno.":
      "Tell us about your property in a few seconds: we will get back to you for a professional valuation, free and with no obligation.",
    "Gratuita e senza impegno": "Free and with no obligation", "Analisi accurata del mercato e della zona": "Careful analysis of the market and the area",
    "Verifica dei documenti dell'immobile": "Check of the property documents", "Oltre 20 anni di esperienza sul territorio": "Over 20 years of local experience",
    "Passo 1 di 2 · Il tuo immobile": "Step 1 of 2 · Your property",
    "Al passo successivo inserisci nome e recapiti e invii la richiesta.": "In the next step, add your name and contact details and send the request.",
    "Ultimo passo per la tua valutazione gratuita": "Last step for your free valuation",
    "Abbiamo già scritto i dati del tuo immobile nel messaggio: aggiungi nome e recapiti, accetta la privacy e premi Invia.":
      "We have already added your property details to the message: add your name and contact details, accept the privacy policy and press Send.",
    // pagina dell'annuncio
    "Descrizione": "Description", "Caratteristiche": "Features", "Scopri le caratteristiche di questo immobile": "Discover the features of this property",
    "Nelle vicinanze": "Nearby", "Servizi e infrastrutture della zona": "Local services and amenities", "Ubicazione immobile": "Property location",
    "Classe energetica": "Energy class", "IPe": "EPI", "Dettagli ↓": "Details ↓", "Foto principale": "Main photo",
    "Foto precedente": "Previous photo", "Foto successiva": "Next photo",
    "Vorrei essere contattato per avere maggiori informazioni su questo immobile, Grazie!": "I would like to be contacted with more information about this property. Thank you!",
    "Alcuni immobili che potrebbero interessarti": "Other properties you may like",
    // caratteristiche: nomi
    "Piano": "Floor", "Piani totali": "Total floors", "Riscaldamento": "Heating", "Assenza barriere architettoniche": "Step-free access",
    "Anno di costruzione": "Year built", "Stato attuale": "Current status", "Cucina": "Kitchen", "Box": "Garage", "Posizione": "Position",
    "Impianto Elettrico": "Electrical system", "Conformazione": "Layout", "Tipo ristrutturazione": "Renovation",
    "Qualità e pregio dell'immobile": "Property quality", "Finiture interne": "Interior finishes", "Qualità contesto e luogo": "Quality of the surroundings",
    "Bagno principale con": "Main bathroom with", "Pavim. Reparto Giorno": "Living area floors", "Pavim. Reparto Notte": "Bedroom floors",
    "Tipo serranda garage": "Garage door", "Allestimento del giardino o del terreno": "Garden / grounds",
    "Immobile idoneo per più nuclei familiari": "Suitable for more than one household", "Esposizione": "Aspect", "Condizionatore": "Air conditioning",
    "Climatizzazione": "Air conditioning", "Stato immobile": "Condition", "Stato": "Condition", "Spese condominiali": "Service charges",
    "Spese condominiali mensili": "Monthly service charges", "Terrazzo": "Terrace", "Balcone": "Balcony", "Balconi": "Balconies", "Cantina": "Cellar",
    "Soffitta": "Attic", "Mansarda": "Attic room", "Taverna": "Basement living room", "Vista mare": "Sea view", "Distanza dal mare": "Distance from the sea",
    "Superficie": "Floor area", "Superficie commerciale": "Gross floor area", "Indirizzo": "Address", "Disponibilità": "Availability",
    "Infissi": "Windows", "Infissi esterni": "Windows", "Porta blindata": "Security door", "Allarme": "Alarm", "Impianto d'allarme": "Alarm system",
    "Videocitofono": "Video intercom", "Pannelli solari": "Solar panels", "Fotovoltaico": "Solar PV", "Impianto fotovoltaico": "Solar PV system",
    "Piscina": "Swimming pool", "Riscaldamento a pavimento": "Underfloor heating", "Caminetto": "Fireplace", "Camino": "Fireplace",
    "Tipo di riscaldamento": "Heating type", "Alimentazione riscaldamento": "Heating fuel", "Ingresso": "Entrance", "Soggiorno": "Living room",
    "Ripostiglio": "Storage room", "Lavanderia": "Utility room", "Arredamento": "Furnishing", "Accessori": "Extras", "Pavimenti": "Floors",
    "Classe": "Class", "Destinazione d'uso": "Use", "Categoria catastale": "Land registry category", "Rendita catastale": "Cadastral income",
    "Superficie terreno": "Land area", "Superficie giardino": "Garden area", "Numero di locali": "Number of rooms", "Numero camere": "Bedrooms",
    "Numero bagni": "Bathrooms", "Posti auto": "Parking spaces", "Garage": "Garage", "Piscina privata": "Private pool", "Ascensore condominiale": "Shared lift",
    // caratteristiche: valori
    "Edificio": "Whole building", "Autonomo": "Independent", "Centralizzato": "Central", "Scoperto": "Open-air", "Coperto": "Covered",
    "Si": "Yes", "Sì": "Yes", "No": "No", "Libero al rogito": "Vacant on completion", "Libero": "Vacant", "Affittato": "Let", "Occupato": "Occupied",
    "Abitabile": "Eat-in", "Angolo cottura": "Kitchenette", "Cucinotto": "Small kitchen", "Semi abitabile": "Semi eat-in", "A vista": "Open-plan",
    "Privato": "Private", "Condominiale": "Shared", "Singolo": "Single", "Doppio": "Double", "Triplo": "Triple", "Quadruplo": "Quadruple",
    "Zona agricola": "Agricultural area", "Zona residenziale": "Residential area", "Zona centrale": "Central area", "Zona collinare": "Hillside area",
    "Zona mare": "Seaside area", "Periferia": "Outskirts", "Centro": "Centre", "Non disponibile": "Not available", "Non presente": "None",
    "Libera su tutti i lati": "Detached on all sides", "Libera su tre lati": "Free on three sides", "Libera su due lati": "Free on two sides",
    "Totale ( pari al nuovo )": "Full (as new)", "Parziale": "Partial", "Monocottura / gres porcellanato": "Ceramic / porcelain tiles",
    "Parquet": "Parquet", "Marmo": "Marble", "Ceramica": "Ceramic", "Cotto": "Terracotta", "Graniglia": "Terrazzo",
    "Camino o canna fumaria": "Fireplace or flue", "Verde allestito": "Landscaped", "Pozzo privato": "Private well", "Vista panoramica": "Panoramic view",
    "per 1 famiglia": "for 1 family", "per 2 famiglie": "for 2 families", "per 3 famiglie": "for 3 families",
    "Impianto di riscaldamento a norma": "Heating system up to code", "Impianto elettrico a norma": "Electrical system up to code",
    "Si valutano permute": "Part-exchange considered", "Doccia": "Shower", "Vasca": "Bathtub", "Vasca e doccia": "Bath and shower",
    "Piano terra": "Ground floor", "Terra": "Ground", "Rialzato": "Raised ground floor", "Seminterrato": "Semi-basement", "Interrato": "Basement",
    "Ultimo": "Top floor", "Ultimo piano": "Top floor", "Primo": "First", "Secondo": "Second", "Terzo": "Third", "Quarto": "Fourth",
    "Ottimo": "Excellent", "Buono": "Good", "Discreto": "Fair", "Da ristrutturare": "To renovate", "Ristrutturato": "Renovated",
    "Nuovo": "New", "Nuovo / In costruzione": "New / under construction",
    "Nord": "North", "Sud": "South", "Est": "East", "Ovest": "West", "Nord-Est": "North-east", "Nord-Ovest": "North-west",
    "Sud-Est": "South-east", "Sud-Ovest": "South-west", "Metano": "Natural gas", "Gas": "Gas", "Gasolio": "Heating oil", "GPL": "LPG",
    "Pompa di calore": "Heat pump", "Elettrico": "Electric", "Legna": "Wood", "Pellet": "Pellet", "Termosifoni": "Radiators",
    "Non arredato": "Unfurnished", "Parzialmente arredato": "Partly furnished", "Elettrica": "Electric",
    "Manuale": "Manual", "Basculante": "Up-and-over", "Sezionale": "Sectional", "Doppi vetri": "Double glazing", "Legno": "Wood",
    "Alluminio": "Aluminium", "PVC": "PVC",
    // nelle vicinanze
    "Casello autostradale": "Motorway exit", "Campi da Tennis": "Tennis courts", "Pista ciclabile": "Cycle path", "Scuole": "Schools",
    "Scuola": "School", "Supermercato": "Supermarket", "Supermercati": "Supermarkets", "Farmacia": "Pharmacy", "Ospedale": "Hospital",
    "Spiaggia": "Beach", "Stazione ferroviaria": "Train station", "Stazione": "Station", "Fermata autobus": "Bus stop", "Autobus": "Bus",
    "Ristoranti": "Restaurants", "Bar": "Cafés", "Parco": "Park", "Parchi": "Parks", "Mare": "Sea", "Centro commerciale": "Shopping centre",
    "Negozi": "Shops", "Banca": "Bank", "Banche": "Banks", "Ufficio postale": "Post office", "Posta": "Post office", "Palestra": "Gym",
    "Aeroporto": "Airport", "Porto": "Harbour", "Chiesa": "Church", "Asilo": "Nursery", "Università": "University", "Campi da calcio": "Football pitches",
    "Piscina comunale": "Public pool", "Centro storico": "Historic centre", "Golf": "Golf", "Spiaggia libera": "Public beach",
    // altre caratteristiche viste negli annunci
    "Bagno secondario con": "Second bathroom with", "Tipologia di proprietà": "Type of ownership", "Pannelli solari termici": "Solar thermal panels",
    "Distanza mare/lago": "Distance to sea/lake", "Aria condizionata": "Air conditioning", "Impianto di pannelli fotovoltaici": "Solar PV system",
    "Batteria di accumulo per fotovoltaico": "Solar battery storage", "Animali ammessi": "Pets allowed", "Adatto per studenti": "Suitable for students",
    "Presente": "Yes", "Presenti": "Yes", "Non presenti": "None", "Mai ristrutturato": "Never renovated", "Verde + pavimentato": "Garden and paving",
    "normale proprietà": "freehold", "Dato in locazione": "Let", "Lungomare": "Seafront", "Su due livelli": "On two levels", "Centrale": "Central",
    "A norma": "Up to code", "Presente e funzionante su tutto l'alloggio": "Working throughout the property", "Semicentrale": "Semi-central",
    "di piccole parti": "small areas", "di molte parti": "many areas", "Semitotale": "Extensive", "Basculante manuale": "Manual up-and-over",
    "Corte pavimentata": "Paved courtyard", "Presente solo in una/qualche stanza": "Only in some rooms", "Marmettoni": "Marble-chip tiles",
    "Climatizzato": "Air-conditioned", "condominiale": "shared", "Multipiano": "Multi-level", "Basculante elettrica": "Electric up-and-over",
    "Semiabitabile": "Semi eat-in", "Vasca Idromassaggio": "Whirlpool bath", "Periferica": "Outskirts", "altro / a scelta": "other / to choose",
    "In costruzione": "Under construction", "Rimessa": "Outbuilding", "Marmo di qualità": "Quality marble", "stato grezzo": "unfinished shell",
    "Avvolgibile elettrica": "Electric roller door", "Isolata": "Isolated", "Turistica": "Tourist area", "Parzialmente arredato di cucina": "Kitchen furnished only",
    "Presente solo nelle camere": "Only in the bedrooms", "Terreno agricolo": "Agricultural land", "Strada ad alto traffico": "Busy road",
    "Zona industriale": "Industrial area", "Sanitari Standard": "Standard fittings", "Zona in forte espansione": "Fast-growing area",
    "Solo predisposta": "Pre-wired only", "Balcone abitabile": "Large balcony", "Altri immobili disponibili nel fabbricato": "Other units available in the building",
    "Ingresso autonomo": "Private entrance", "Portone Blindato": "Security front door", "Cappotto termico esterno": "External thermal insulation",
    "Domotica in casa": "Home automation", "Adatto ad operazioni immobiliari d'impresa": "Suitable for property development", "Sottocosto": "Below market price",
    "tutti i lati": "all sides", "Palestre": "Gyms", "Ospedale Civile": "Hospital", "Complessi Sportivi": "Sports facilities", "Parco giochi": "Playground",
    "Stazione Ferroviaria": "Train station", "Scuole Elementari": "Primary schools", "Scuole Medie": "Middle schools", "Scuole Superiori": "Secondary schools",
    "Palazzetto dello sport / stadio Riviera delle Palme": "Sports arena / Riviera delle Palme stadium",
    "Palazzetto dello sport / stadio Riviera delle Palm": "Sports arena / Riviera delle Palme stadium", "Ufficio Postale": "Post office",
    "Uffici comunali": "Town hall offices", "Fermata autobus di linea": "Bus stop", "Porto turistico": "Marina", "Pista da pattinaggio a rotelle": "Roller rink",
    "Cinema": "Cinema", "Teatro": "Theatre", "Pista d'atletica": "Athletics track", "Negozi e shopping": "Shops", "Biblioteca Comunale": "Public library",
    "Asilo nido": "Nursery", "Scuola materna": "Nursery school", "Scuola dell'infanzia": "Nursery school", "Musei": "Museums", "Museo": "Museum",
    "Centro benessere": "Spa", "Discoteca": "Nightclub", "Impianti sciistici": "Ski lifts", "Terme": "Thermal baths", "Maneggio": "Riding stables",
    "Campo da golf": "Golf course", "Parcheggio": "Car park", "Parcheggi": "Car parks", "Pronto soccorso": "A&E", "Guardia medica": "Out-of-hours doctor",
    "Superstrada": "Dual carriageway", "Ferrovia": "Railway", "Ospedali": "Hospitals", "Centro sportivo": "Sports centre"
  };
  var UP = {}; Object.keys(D).forEach(function (k) { var u = k.toUpperCase(); if (!(u in D) && u !== k) UP[u] = D[k].toUpperCase(); });
  var TYPES = Object.keys(D);

  function plural(n, one, many) { return n + " " + (+n === 1 ? one : many); }
  var LOW = {}; Object.keys(D).forEach(function (k) { var l = k.toLowerCase(); if (!(l in LOW)) LOW[l] = D[k]; });
  function word(t) { return D.hasOwnProperty(t) ? D[t] : (UP.hasOwnProperty(t) ? UP[t] : (LOW.hasOwnProperty(t.toLowerCase()) && t.length > 3 ? LOW[t.toLowerCase()] : null)); }
  var COMPASS = { nord: "North", sud: "South", est: "East", ovest: "West" };
  // valore di una caratteristica: "Sud - Est", "Presente, 12 mq", "per 2 famiglie", "In aderenza su 1 lato"...
  function val(v) {
    var w = word(v); if (w != null) return w;
    var x;
    if ((x = v.match(/^per (\d+) famigli[ae]$/i))) return "for " + plural(x[1], "family", "families");
    if ((x = v.match(/^In aderenza su (\d+) lat[oi]$/i))) return "Attached on " + plural(x[1], "side", "sides");
    if ((x = v.match(/^maggiore di (.+)$/i))) return "more than " + x[1];
    if ((x = v.match(/^(.*)\bcirca$/i))) return x[1] + "approx.";
    if ((x = v.match(/^([\d.,]+) ?mt\.?$/i))) return x[1] + " m";
    if ((x = v.match(/^([\d.,]+) ?mq$/i))) return x[1] + " m²";
    if (/^(prevalente(mente)? a )?((nord|sud|est|ovest)[\s\-\/,]*)+$/i.test(v)) return v.replace(/^prevalente(mente)? a /i, "mainly ").replace(/\b(nord|sud|est|ovest)\b/gi, function (m) { return COMPASS[m.toLowerCase()]; });
    if (/,/.test(v)) { var parts = v.split(/\s*,\s*/); var out = parts.map(function (p) { return val(p) || p; }); if (out.join(", ") !== v) return out.join(", "); }
    return null;
  }
  function type(t) { var w = word(t); return w || t; }

  var RULES = [
    [/^(.+?) in (vendita|affitto) a (.+)$/i, function (m) { return type(m[1]) + (/vendita/i.test(m[2]) ? " for sale in " : " for rent in ") + m[3]; }],
    [/^(\d+) (Bagni|Bagno)$/i, function (m) { return plural(m[1], "Bathroom", "Bathrooms"); }],
    [/^(\d+) (Camere|Camera)$/i, function (m) { return plural(m[1], "Bedroom", "Bedrooms"); }],
    [/^(\d+) (Locali|Locale)$/i, function (m) { return plural(m[1], "Room", "Rooms"); }],
    [/^Cod\.\s*(\S+)$/, function (m) { return "Ref. " + m[1]; }],
    [/^([\d.]+) trovat[io]!?$/i, function (m) { return m[1] + " found!"; }],
    [/^(Vendita|Affitto) · Cod\.\s*(\S+)$/, function (m) { return (m[1] === "Vendita" ? "For sale" : "For rent") + " · Ref. " + m[2]; }],
    [/^Guarda le foto(?: \((\d+)\))?$/, function (m) { return "View photos" + (m[1] ? " (" + m[1] + ")" : ""); }],
    [/^Ultimo aggiornamento (.+)$/, function (m) { return "Last updated " + m[1]; }],
    [/^Preferiti: Cod\.\s*(.+)$/, function (m) { return "Favourites: Ref. " + m[1]; }],
    [/^Stampa: Cod\.\s*(.+)$/, function (m) { return "Print: Ref. " + m[1]; }],
    [/^(.+) - (Titolare agenzia|Collaboratore)$/, function (m) { return m[1] + " - " + D[m[2]]; }],
    [/^(.*)P\.IVA:? ?(\d+)$/, function (m) { return m[1] + "VAT no. " + m[2]; }],
    [/^Foto (\d+)$/, function (m) { return "Photo " + m[1]; }],
    [/^(\d+) immobil[ei]$/i, function (m) { return plural(m[1], "property", "properties"); }],
    [/^· carico (\d+) di (\d+)…$/, function (m) { return "· loading " + m[1] + " of " + m[2] + "…"; }],
    [/^· carico (\d+)…$/, function (m) { return "· loading " + m[1] + "…"; }],
    [/^([\d.,]+) mq$/i, function (m) { return m[1] + " m²"; }],
    [/^€ (\d+),(\d) mln$/, function (m) { return "€ " + m[1] + "." + m[2] + "m"; }],
    [/^€ (\d+) mln$/, function (m) { return "€ " + m[1] + "m"; }],
    [/^(.+) \((\d+)\)$/, function (m) { var w = word(m[1]); return w ? w + " (" + m[2] + ")" : null; }],
    [/^(.+?)\s*:\s*(.+)$/, function (m) { var k = word(m[1].trim()); if (!k) return null; var v = val(m[2].trim()); return k + ": " + (v || m[2].trim()); }],
    [/^(.+?)\s*:$/, function (m) { var k = word(m[1].trim()); return k ? k + ":" : null; }],
    // "200 mq · 4 camere · 2 bagni" (schede della mappa)
    [/^\d[\d.]* mq( · .+)?$|^\d+ camer[ae]( · .+)?$|^\d+ bagn[io]$/i, function (m) {
      return m[0].split(" · ").map(function (p) {
        var x;
        if ((x = p.match(/^([\d.]+) mq$/i))) return x[1] + " m²";
        if ((x = p.match(/^(\d+) camer[ae]$/i))) return plural(x[1], "bedroom", "bedrooms");
        if ((x = p.match(/^(\d+) bagn[io]$/i))) return plural(x[1], "bathroom", "bathrooms");
        return p;
      }).join(" · ");
    }]
  ];

  function tr(s) {
    var t = s.replace(/\s+/g, " ").trim(); if (!t) return null;
    var w = word(t); if (w != null) return w === t ? null : w;
    for (var i = 0; i < RULES.length; i++) { var m = t.match(RULES[i][0]); if (m) { var r = RULES[i][1](m); if (r != null && r !== t) return r; } }
    return null;
  }
  function trNode(n) {
    var v = n.nodeValue; if (!v || !/[A-Za-zÀ-ú]/.test(v)) return;
    var r = tr(v); if (r == null) return;
    var lead = v.match(/^\s*/)[0], tail = v.match(/\s*$/)[0];
    n.nodeValue = (lead ? " " : "") + r + (tail ? " " : "");
  }
  var ATTRS = ["placeholder", "title", "aria-label"];
  function trEl(e) {
    for (var i = 0; i < ATTRS.length; i++) { var v = e.getAttribute && e.getAttribute(ATTRS[i]); if (v) { var r = tr(v); if (r != null) e.setAttribute(ATTRS[i], r); } }
    if (e.tagName === "INPUT" && (e.type === "submit" || e.type === "button") && e.value) { var r2 = tr(e.value); if (r2 != null) e.value = r2; }
  }
  var SKIP = /^(SCRIPT|STYLE|NOSCRIPT|CODE|PRE)$/;
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { if (!skipText(root)) trNode(root); return; }
    if (root.nodeType !== 1 || SKIP.test(root.tagName) || isFree(root)) return;
    trEl(root);
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (n.nodeType === 1) return (SKIP.test(n.tagName) || isFree(n)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }), n;
    while ((n = tw.nextNode())) { if (n.nodeType === 1) trEl(n); else trNode(n); }
  }
  // testi liberi scritti nel gestionale: non si traducono parola per parola
  function isFree(e) { return e.classList && (e.classList.contains("pk-free") || (e.classList.contains("testo") && e.closest(".dettaglio"))); }
  function skipText(n) { var p = n.parentElement; return !p || SKIP.test(p.tagName) || !!(p.closest && p.closest(".pk-free, .dettaglio .testo")); }

  /* ---------- titolo della home ---------- */
  function hero() {
    var t = document.querySelector(".pk-hero-title"); if (!t || t.getAttribute("data-en")) return;
    t.setAttribute("data-en", "1"); t.textContent = "";
    var n = 0;
    [["It's time for", 0], ["a new home!", 1]].forEach(function (pt, i) {
      if (i) t.appendChild(document.createTextNode(" "));
      var host = pt[1] ? t.appendChild(document.createElement("em")) : t;
      pt[0].split(" ").forEach(function (w, j) {
        if (j) host.appendChild(document.createTextNode(" "));
        var s = document.createElement("span"); s.className = "w"; s.textContent = w; s.style.animationDelay = (0.25 + n++ * 0.08) + "s"; host.appendChild(s);
      });
    });
  }

  /* ---------- descrizione dell'annuncio ---------- */
  function description() {
    var box = [].slice.call(document.querySelectorAll(".dettaglio")).filter(function (d) { var h = d.querySelector(".titolo_sez"); return h && /Descri/.test(h.textContent); })[0];
    var testo = box && box.querySelector(".testo"); if (!testo || box.querySelector(".pk-tr")) return;
    var bar = document.createElement("div"); bar.className = "pk-tr";
    var note = document.createElement("span"); note.textContent = "The description was written in Italian.";
    var btn = document.createElement("button"); btn.type = "button"; btn.className = "pk-tr-btn"; btn.textContent = "Translate into English";
    bar.appendChild(note); bar.appendChild(btn);
    testo.parentNode.insertBefore(bar, testo);
    var gt = "https://" + location.hostname.replace(/-/g, "--").replace(/\./g, "-") + ".translate.goog" + location.pathname + "?_x_tr_sl=it&_x_tr_tl=en&_x_tr_hl=en";
    function google() { location.href = gt; }
    function done() { note.textContent = "Automatic translation of the Italian description."; btn.remove(); }
    function run(T) {
      btn.disabled = true; btn.textContent = "Translating…";
      // blocchi di testo: paragrafi, voci di elenco e testo sciolto tra un blocco e l'altro
      var blocks = [], group = [];
      function flushGroup(parent, before) {
        if (!group.length) return;
        var txt = group.map(function (n) { return n.nodeName === "BR" ? "\n" : n.textContent; }).join("").replace(/[ \t]+/g, " ").trim();
        if (txt) { var sp = document.createElement("div"); parent.insertBefore(sp, before || null); group.forEach(function (n) { sp.appendChild(n); }); blocks.push(sp); }
        group = [];
      }
      function collect(el) {
        [].slice.call(el.childNodes).forEach(function (n) {
          if (n.nodeType === 1 && /^(UL|OL|DIV|BLOCKQUOTE|TABLE|TBODY|TR)$/.test(n.tagName)) { flushGroup(el, n); collect(n); }
          else if (n.nodeType === 1 && /^(P|LI|H\d|TD)$/.test(n.tagName)) { flushGroup(el, n); if (n.textContent.trim()) blocks.push(n); }
          else group.push(n);
        });
        flushGroup(el, null);
      }
      collect(testo);
      var chain = Promise.resolve();
      blocks.forEach(function (p) {
        chain = chain.then(function () {
          var src = (p.innerText || p.textContent).trim(); if (!src) return;
          return T.translate(src).then(function (out) { p.textContent = out; p.style.whiteSpace = "pre-line"; });
        });
      });
      return chain.then(done, function () { btn.disabled = false; btn.textContent = "Translate with Google"; btn.onclick = google; });
    }
    var hasT = "Translator" in window, opts = { sourceLanguage: "it", targetLanguage: "en" };
    if (!hasT) { btn.textContent = "Translate with Google"; btn.onclick = google; return; }
    Translator.availability(opts).then(function (a) {
      if (a === "unavailable") { btn.textContent = "Translate with Google"; btn.onclick = google; return; }
      if (a === "available") { Translator.create(opts).then(run, function () { btn.onclick = google; btn.textContent = "Translate with Google"; }); return; }
      // il traduttore va scaricato: serve un clic del visitatore
      btn.onclick = function () {
        btn.disabled = true; btn.textContent = "Preparing the translator…";
        Translator.create(opts).then(run, function () { btn.disabled = false; btn.textContent = "Translate with Google"; btn.onclick = google; });
      };
    }, function () { btn.textContent = "Translate with Google"; btn.onclick = google; });
  }

  /* ---------- avvio ---------- */
  var busy = false, queue = [], scheduled = false;
  function flush() {
    scheduled = false; busy = true;
    var q = queue; queue = [];
    try { q.forEach(function (n) { if (n.isConnected) walk(n); }); hero(); } catch (e) { if (window.console) console.warn("[paccoi en]", e); }
    obs.takeRecords(); busy = false;
  }
  var obs = new MutationObserver(function (list) {
    if (busy) return;
    list.forEach(function (m) {
      if (m.type === "childList") [].forEach.call(m.addedNodes, function (n) { queue.push(n); });
      else if (m.type === "characterData") queue.push(m.target);
      else if (m.type === "attributes") queue.push(m.target);
    });
    if (queue.length && !scheduled) { scheduled = true; requestAnimationFrame(flush); }
  });
  function trTitle() {
    document.title = document.title.replace(/agenzia immobiliare San benedetto del Tronto/i, "real estate agency in San Benedetto del Tronto"); var r = tr(document.title.split(" | ")[0]); if (r) document.title = document.title.replace(document.title.split(" | ")[0], r); }

  function apply() {
    document.documentElement.lang = "en";
    busy = true;
    try { walk(document.body); hero(); trTitle(); description(); } catch (e) { if (window.console) console.warn("[paccoi en]", e); }
    busy = false;
    obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    document.documentElement.classList.add("pk-en-done");
  }
  window.PKI18N = { apply: apply, tr: tr };
})();
