# WorkSafe — Mediul de muncă explicat vizual

Site educațional static, cu **exact două pagini**, gândit pentru prezentare la proiector în clasă
și pentru studiu individual acasă. Conținutul este în limba română, iar ilustrațiile sunt materiale
originale livrate împreună cu proiectul.

| Pagina | Fișier | Tema |
|---|---|---|
| 1 | `index.html` | **Tema 10** — Iluminarea de producere |
| 2 | `microclimat.html` | **Tema 8** — Igiena muncii și sanitația de producție |

**Autori:** Luchian Gabriel · Onoico Ianuș · Stog Cătălin

---

## Cuprins

- [Despre proiect](#despre-proiect)
- [Cum se rulează](#cum-se-rulează)
- [Structura proiectului](#structura-proiectului)
- [Pagina 1 — Iluminarea de producere](#pagina-1--iluminarea-de-producere)
- [Pagina 2 — Igiena muncii și microclimatul](#pagina-2--igiena-muncii-și-microclimatul)
- [Funcționalități](#funcționalități)
- [Design și identitate vizuală](#design-și-identitate-vizuală)
- [Accesibilitate](#accesibilitate)
- [Tehnologii și decizii tehnice](#tehnologii-și-decizii-tehnice)
- [Surse și rigoare științifică](#surse-și-rigoare-științifică)
- [Personalizare](#personalizare)
- [Limitări cunoscute](#limitări-cunoscute)
- [Compatibilitate](#compatibilitate)

---

## Despre proiect

WorkSafe explică vizual două teme de securitate și sănătate în muncă, fără slide-uri externe:
totul se parcurge prin scroll, direct în pagină.

**Obiectivele lecției 1:** elevul poate defini iluminarea de producere, poate identifica tipurile
după sursă și după rol, cunoaște principalii parametri ai iluminării și poate descrie organizarea
iluminatului într-un bloc administrativ.

**Obiectivele lecției 2:** elevul poate explica igiena muncii și sanitația de producție, poate
identifica factorii de risc, poate defini microclimatul și numi cei patru parametri principali,
instrumentele de măsurare și măsurile preventive.

**Principiul editorial** urmat în fiecare secțiune: definiție simplă → explicație → exemplu
concret → imagine → consecință practică. Detaliile suplimentare stau în carduri expandabile, ca
pagina să rămână aerisită la proiector.

Proiectul este **complet static**: nu are conturi, autentificare, formulare, bază de date, server
sau colectare de date. Funcționează direct din folder, inclusiv fără conexiune la internet.

---

## Cum se rulează

### Varianta simplă

Deschide `index.html` cu dublu clic. Funcționează în orice browser modern, direct de pe disc
(`file://`), fără instalări.

### Varianta cu server local (opțional)

Dacă preferi un server, din folderul proiectului:

```bash
python -m http.server 8000
# apoi deschide http://localhost:8000
```

Nu este necesar niciun build, nicio instalare de pachete și niciun pas de compilare.

---

## Structura proiectului

```
worksafe/
├── index.html               # Pagina 1 — Tema 10, Iluminarea de producere
├── microclimat.html         # Pagina 2 — Tema 8, Igiena muncii și microclimatul
├── README.md
└── assets/
    ├── css/
    │   └── style.css        # design system: tokens, layout, componente, responsive, print
    ├── js/
    │   ├── site.js          # comportament comun: progres, cuprins, mod prezentare, quiz
    │   ├── iluminare.js     # selector de iluminare, plan interactiv, întrebările lecției 1
    │   └── microclimat.js   # simulator de microclimat, întrebările lecției 2
    ├── svg/                 # 13 ilustrații vectoriale, folosite efectiv în pagini
    └── png/                 # aceleași 13 ilustrații, pentru proiectoare sau documente
```

Ilustrațiile SVG au fost decupate (s-a eliminat titlul și footerul tipărite în interiorul lor),
astfel încât să se integreze în pagină. Versiunile PNG păstrează aspectul original și pot fi
folosite în prezentări sau documente tipărite. Pe pagină se încarcă **doar SVG**, niciodată ambele
formate pentru aceeași imagine.

---

## Pagina 1 — Iluminarea de producere

`index.html` · titlu: „Iluminarea de producere” · subtitlu: „Tipuri de iluminare și organizarea
iluminatului într-un bloc administrativ”.

| # | Secțiune | Ce conține |
|---|---|---|
| 01 | Ce este iluminarea de producere | definiție, card „De ce contează?”, ideea de reținut, termen-cheie |
| 02 | Tipurile de iluminare după sursă | **selector interactiv** Naturală / Artificială / Mixtă, ilustrația cu trei încăperi, carduri cu exemple |
| 03 | Tipurile de iluminare după rol | generală, locală, combinată, de securitate și urgență + avertismentul „mixtă ≠ combinată” |
| 04 | Parametrii principali | tabel cu iluminanță (lx), flux luminos (lm), temperatură de culoare (K), uniformitate, orbire |
| 05 | Organizarea într-un bloc administrativ | **plan interactiv cu 7 încăperi**, tabel de repere în lux (EN 12464-1), cei 7 pași de organizare |
| 06 | Cum se măsoară iluminanța | luxmetrul, exemplul didactic de 500 lx |
| 07 | Greșeli frecvente | comparația „necorespunzător / corect” + tabel problemă–efect–soluție |
| 08 | Studiu de caz | birou cu patru angajați: situație, analiză, măsuri, rezultat urmărit |
| 09 | Concluzie | sinteza lecției |
| 10 | Test de verificare | quiz cu 5 întrebări |

### Planul interactiv

Planul schematic al etajului conține **7 încăperi** — Birou A, Sală de ședințe, Recepție,
Coridor, Arhivă, Scări și Birou B. Fiecare este un buton: la click (sau cu tastele-săgeți) panoul
lateral afișează destinația, tipul iluminării, nivelul de referință, motivul și greșeala de evitat.
Planul este declarat explicit schematic, nu proiect tehnic. Ilustrația-plan din materialul original
este disponibilă într-un card expandabil, ca referință vizuală.

---

## Pagina 2 — Igiena muncii și microclimatul

`microclimat.html` · titlu: „Igiena muncii și sanitația de producție” · subtitlu: „Noțiuni
esențiale și parametrii microclimatului la locul de muncă”.

| # | Secțiune | Ce conține |
|---|---|---|
| 01 | Ce este igiena muncii | definiție, obiective, exemplu într-un birou |
| 02 | Sanitația de producție | exemple concrete, diferența igienă ↔ sanitație |
| 03 | Factorii mediului de muncă | patru familii: fizici, chimici, biologici, ergonomici și organizatorici |
| 04 | Microclimatul și cei patru parametri | temperatură, umiditate relativă, viteza aerului, radiație termică |
| 05 | Instrumente și unități | termometru, higrometru/psihrometru, anemometru, termometru cu glob |
| 06 | Valori normative | tabel pentru perioada caldă și rece, cu sursa HG nr. 353/2010 |
| 07 | Confortul termic | convecție, radiație, evaporare, conducție |
| 08 | Ventilația și calitatea aerului | naturală, mecanică, mixtă + distincția ventilație ↔ climatizare |
| 09 | Efecte și măsuri | tabel problemă–efect–măsuri preventive |
| 10 | Simulator de microclimat | **simulator cu 3 glisoare și selector de sezon** |
| 11 | Studiu de caz | birou cu șase angajați, 29 °C: situație, analiză, măsuri, rezultat |
| 12 | Concluzie | sinteza lecției |
| 13 | Test de verificare | quiz cu 5 întrebări |

### Simulatorul de microclimat

| Comandă | Interval | Valoare inițială |
|---|---|---|
| Temperatura aerului | 14–34 °C | 22 °C |
| Umiditatea relativă | 20–80 % | 45 % |
| Viteza aerului | 0–1 m/s | 0,15 m/s |
| Perioada anului | caldă (16 apr–15 oct) / rece (16 oct–15 apr) | caldă |

Pe fiecare scală este evidențiat intervalul de referință pentru birourile menționate în **HG
nr. 353/2010, anexa nr. 2, punctul 11**: 23–26 °C vara, 20–24 °C iarna, umiditate 30–70 %,
curenți 0,1–0,3 m/s. La fiecare modificare, panoul din dreapta afișează starea condițiilor și un
text explicativ (de exemplu „29 °C depășește reperul de temperatură pentru perioada caldă”).

Simulatorul este **demonstrativ**: nu calculează confort termic validat, pentru că lipsesc
temperatura radiantă, îmbrăcămintea și metabolismul. Acest lucru este scris explicit sub simulator.

---

## Funcționalități

### Navigare și lectură

- **Header lipit** cu logo, două linkuri către lecții (pagina activă este evidențiată) și butoane
  pentru „Cuprins” și „Prezentare”. Pe mobil, linkurile devin taburi pe un rând separat.
- **Cuprins glisant** generat automat din secțiuni, cu numerotare, evidențierea secțiunii active la
  scroll și închidere cu `Esc`, click pe fundal sau pe un link.
- **Bară de progres** subțire în partea de sus, care arată cât din lecție a fost parcurs.
- **Buton „Înapoi sus”** care apare după primele ecrane parcurse.
- **Ancore** pentru fiecare secțiune (`#ce-este`, `#organizare`, `#simulator` etc.), deci linkuri
  directe către o secțiune anume.
- **Tranziție între lecții** prin cardul „Continuă cu tema următoare” / „Înapoi la tema anterioară”.

### Elemente interactive

| Element | Pagina | Comportament |
|---|---|---|
| Selector de iluminare | 1 | schimbă scena dintre naturală, artificială și mixtă; panourile LED și razele de soare se aprind/sting, textul explicativ se actualizează |
| Planul etajului | 1 | 7 încăperi clicabile; panoul afișează destinație, tip de iluminare, reper, motiv, greșeală de evitat |
| Simulatorul de microclimat | 2 | 3 glisoare + selector de sezon; intervale de referință marcate pe scală; feedback text în timp real |
| Quiz | 1 și 2 | 5 întrebări cu variante multiple, feedback imediat, explicație, progres, scor, buton „Reîncearcă” |

Ambele componente interactive sunt complet utilizabile de la tastatură: selectorul și planul
acceptă tastele-săgeți, iar opțiunile de quiz sunt butoane normale.

### Modul Prezentare

Butonul „Prezentare” din header (sau tasta `P`) transformă pagina într-o versiune pentru
proiector: mărește titlurile și textul, mărește spațierea dintre secțiuni, ascunde detaliile
secundare (cardurile expandabile) și dezactivează cuprinsul. Ieșirea se face cu `Esc` sau cu
aceeași tastă. Preferința este reținută local, în `localStorage`, și nu implică niciun server.

### Printare

Există un stil dedicat pentru tipar: header-ul, cuprinsul și butoanele dispar, cardurile și
tabelele nu se rup între pagini, iar imaginile rămân lizibile. Paginile pot fi salvate ca PDF
direct din browser.

---

## Design și identitate vizuală

- **Stil:** minimalist, academic-profesional: spații albe, carduri curate, colțuri rotunjite
  (10–22 px), umbre discrete, fără gradiente excesive și fără animații decorative.
- **Culori de bază:** fundal `#F6F8FB`, text `#101E30`, text secundar `#52677D`, navy `#132338`.
- **Accent pagina 1 (Iluminare):** cyan `#1789B4` / `#24A7D6`, cu accent cald `#E0A03A`.
- **Accent pagina 2 (Microclimat):** teal `#128F83` / `#19A89A`.
- **Fonturi:** Manrope pentru titluri, Inter pentru text, cu fallback pe fonturile de sistem.
- **Coloana de lectură:** 720–800 px; layout-ul general urcă până la ~1128 px pentru diagrame.
- **Responsive:** trei praguri principale — 1080 px (hero pe o coloană, planul sub hartă),
  860 px (griluri pe 2 coloane), 720 px (o coloană, header compact, plan rearanjat pe 2 coloane).

Tema paginii se schimbă printr-un singur atribut pe `<body>` (`data-theme="light"` sau
`"micro"`), iar toate componentele folosesc variabilele CSS definite în `:root`.

---

## Accesibilitate

- Un singur `<h1>` pe pagină și ierarhie corectă a titlurilor.
- **Link „Sari la conținut”** vizibil la focus.
- `alt` descriptiv pentru fiecare ilustrație, `aria-hidden` pentru elementele decorative.
- Focus vizibil pe toate elementele interactive; contur de focus consistent.
- Etichete `aria-label`, `aria-pressed`, `aria-expanded`, `aria-current` și regiuni `aria-live`
  pentru panoul planului și feedback-ul quiz-ului.
- Cuprinsul închis este `inert`, ca să nu poată fi parcurs accidental cu Tab.
- Contrast text–fundal peste recomandările WCAG AA pentru textul de lectură.
- Respectă `prefers-reduced-motion`: animațiile și tranzițiile sunt eliminate, conținutul apare
  direct.
- Funcționează fără mouse; tastele-săgeți navighează în selector și în plan.

---

## Tehnologii și decizii tehnice

- **HTML5 + CSS3 + JavaScript vanilla**, fără framework, fără dependențe, fără build.
- **Fără backend:** nicio cerere către server, niciun formular, nicio colectare de date. Quiz-ul
  nu salvează răspunsuri.
- **Ilustrații locale:** SVG-urile sunt scrise inline în pagină doar acolo unde trebuie controlate
  din CSS (scena selectorului de iluminare); restul sunt fișiere `<img>` cu `loading="lazy"`.
- **Progressive enhancement:** fără JavaScript, conținutul și ilustrațiile rămân vizibile; doar
  elementele interactive și cuprinsul necesită JS.
- **Fără tracking, fără cookie-uri, fără analytics.** Singura resursă externă este foaia de stil
  Google Fonts (Manrope + Inter), care nu blochează funcționarea: fără internet se folosesc
  fonturile de sistem.
- **Fără imagini bitmap pe pagină** — SVG-urile rămân clare la orice rezoluție și la zoom.

---

## Surse și rigoare științifică

- **EN 12464-1:2021** — *Light and lighting. Lighting of work places. Part 1: Indoor work places*:
  reperele de iluminare menținută (500 lx birou, 300 lx recepție, 200 lx arhivă, 100 lx coridor,
  150 lx scări). Sunt prezentate ca repere de proiectare, **nu** ca măsurări ale unei clădiri reale.
- **HG nr. 353 din 05.05.2010** — *Cerințe minime de securitate și sănătate la locul de muncă*:
  anexa nr. 2, punctul 11 (microclimat, birouri) și anexa nr. 3 (iluminare).
- **EU-OSHA / OSHwiki — Lighting**, **HSE — Thermal comfort**, **ILO — Occupational hygiene**:
  surse de context, linkuite în footer.

Fiecare valoare numerică este însoțită de sursa și contextul ei. Simulatoarele explică fenomene,
dar nu pretind calcule normative sau metrologice exacte. Studiile de caz sunt didactice, iar
scenariul „după” din ilustrația de microclimat este marcat ca ilustrativ.

---

## Personalizare

- **Culori și spațiere:** toate în `assets/css/style.css`, în blocul `:root` (`--accent`,
  `--accent-bright`, `--bg`, `--ink`, `--radius` etc.). Pentru pagina 2, tema se aplică prin
  `body[data-theme="micro"]`.
- **Întrebările de quiz:** array-ul `quiz` din `assets/js/iluminare.js` sau
  `assets/js/microclimat.js` — fiecare întrebare are `q`, `options`, `correct` (index) și `explain`.
- **Încăperile din plan:** obiectul `rooms` din `assets/js/iluminare.js`.
- **Valorile de referință ale simulatorului:** obiectele `REF`, `HUM`, `AIR` din
  `assets/js/microclimat.js`.
- **Secțiunile din cuprins:** cuprinsul se generează automat din `<section id="…" data-nav="…">`;
  schimbarea lui `data-nav` schimbă eticheta din cuprins.

---

## Limitări cunoscute

- Valorile în lux și intervalele termice sunt **repere**, nu măsurători; pentru proiecte reale
  trebuie verificate standardul aplicabil și legislația în vigoare.
- Simulatorul nu modelează temperatura radiantă, îmbrăcămintea sau metabolismul, deci nu poate
  estima un indice de confort termic.
- Quiz-ul nu păstrează scorul după reîncărcarea paginii (intenționat: fără date personale).
- Tipografia exactă (Manrope/Inter) necesită internet; altfel se folosesc fonturile de sistem.

---

## Compatibilitate

Testat în browsere bazate pe Chromium (Chrome, Edge) la 1440 px și 390 px. Folosește proprietăți
CSS moderne (`grid`, variabile CSS, `clamp`, `backdrop-filter`, `inert`) și `IntersectionObserver`.
Versiunile recente de Chrome, Edge, Firefox și Safari sunt acceptate. În browsere foarte vechi,
layout-ul rămâne lizibil, dar fără efectele de blur și fără animații.
