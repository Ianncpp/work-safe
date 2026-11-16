# WorkSafe — Mediul de muncă explicat vizual

Site educațional static, cu două pagini, pentru prezentare în clasă și studiu individual.

- **Pagina 1** (`index.html`) — Tema 10. Iluminarea de producere
- **Pagina 2** (`microclimat.html`) — Tema 8. Igiena muncii și sanitația de producție

## Cum se deschide

Deschide `index.html` cu dublu clic (funcționează direct din folder, fără server).
Nu sunt necesare instalări, conturi sau conexiune la internet.

## Structura folderului

```
worksafe/
├── index.html               # Tema 10 — Iluminarea de producere
├── microclimat.html         # Tema 8 — Igiena muncii și microclimatul
├── README.md
└── assets/
    ├── css/style.css        # design system, layout, componente
    ├── js/
    │   ├── site.js          # navigare, cuprins, mod prezentare, quiz
    │   ├── iluminare.js     # selector de iluminare, plan interactiv, quiz
    │   └── microclimat.js   # simulator de microclimat, quiz
    ├── svg/                 # 13 ilustrații (folosite pe pagini)
    └── png/                 # aceleași ilustrații, pentru proiectoare/documente
```

## Funcționalități

- **Cuprins** cu evidențierea secțiunii active și **bară de progres** la lectură.
- **Mod Prezentare** (butonul din header sau tasta `P`): mărește textul și ascunde detaliile
  secundare. Ieșire cu `Esc`.
- **Pagina 1:** selector Naturală / Artificială / Mixtă, plan interactiv al unui etaj
  administrativ (7 încăperi), tabel de repere în lux, studiu de caz, quiz de 5 întrebări.
- **Pagina 2:** simulator cu trei glisoare și selector de sezon, cu intervalele de referință
  marcate pe scală, tabel de instrumente, studiu de caz, quiz de 5 întrebări.
- Navigare completă de la tastatură, `alt` la imagini, contrast ridicat, suport pentru
  `prefers-reduced-motion`.

## Despre valori

- Reperele de iluminare (500 lx birou etc.) provin din **EN 12464-1:2021** și sunt trecute
  ca atare, împreună cu sursa, nu ca măsurări ale unei clădiri reale.
- Intervalele de microclimat provin din **HG nr. 353/2010, anexa nr. 2, punctul 11**, pentru
  categoria de birouri menționată.
- Simulatoarele sunt didactice: explică fenomene, dar nu calculează valori normative.

Fonturile Manrope și Inter se încarcă de pe Google Fonts; fără internet, site-ul folosește
fonturile de sistem, iar tot conținutul rămâne funcțional.

**Autori:** Luchian Gabriel, Onoico Ianuș, Stog Cătălin.
