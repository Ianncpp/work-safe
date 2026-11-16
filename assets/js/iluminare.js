/* ==========================================================================
   WorkSafe — Iluminarea de producere
   Lighting type selector, interactive floor plan, quiz data
   ========================================================================== */
(function () {
  'use strict';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Lighting type selector ---------- */
  var demo = $('#lightingDemo');

  if (demo) {
    var scene = $('#lightScene', demo);
    var titleEl = $('#lightTitle', demo);
    var textEl = $('#lightText', demo);
    var buttons = $$('[data-mode]', demo);

    var copy = {
      natural: {
        title: 'Iluminare naturală',
        text: 'Lumina zilei pătrunde prin ferestre și luminatoare. Poate fi laterală, superioară sau combinată, însă variază cu vremea, anotimpul, ora și orientarea clădirii. Reflexiile și supraîncălzirea se controlează cu jaluzele.'
      },
      artificial: {
        title: 'Iluminare artificială',
        text: 'Lumina este produsă de corpuri electrice — panouri LED, plafoniere, lămpi de birou. Intensitatea poate fi controlată și programată, însă distribuția trebuie gândită ca să nu apară umbre dure sau orbire.'
      },
      mixt: {
        title: 'Iluminare mixtă',
        text: 'Cele două surse lucrează împreună: fereastra aduce lumina zilei, iar instalația LED completează doar diferența. Nivelurile rămân mai constante, iar consumul poate scădea prin senzori și reglare.'
      }
    };

    function setMode(mode) {
      if (!copy[mode]) return;
      scene.setAttribute('data-mode', mode);
      buttons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-mode') === mode ? 'true' : 'false');
      });
      titleEl.textContent = copy[mode].title;
      textEl.textContent = copy[mode].text;
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setMode(btn.getAttribute('data-mode'));
      });
    });

    // Arrow-key navigation inside the segmented control
    var group = $('.segmented', demo);
    group.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      var current = buttons.indexOf(document.activeElement);
      if (current === -1) return;
      event.preventDefault();
      var next = event.key === 'ArrowRight'
        ? (current + 1) % buttons.length
        : (current - 1 + buttons.length) % buttons.length;
      buttons[next].focus();
      setMode(buttons[next].getAttribute('data-mode'));
    });
  }

  /* ---------- Interactive floor plan ---------- */
  var rooms = {
    'birou-a': {
      name: 'Birou A',
      lux: '500',
      dest: 'Citire, scriere, tastare, prelucrare de date.',
      tip: 'Iluminare generală LED + lumină naturală controlată prin jaluzele.',
      motiv: 'Activitate vizuală prelungită pe documente și ecran.',
      evita: 'Reflexiile pe monitor și lumina directă în câmpul vizual.'
    },
    'sala': {
      name: 'Sală de ședințe',
      lux: '500',
      dest: 'Prezentări, note scrise, videoconferințe.',
      tip: 'Panouri LED uniform distribuite, reglabile pe scenarii.',
      motiv: 'Participanții citesc documente și privesc simultan ecranul sau proiectorul.',
      evita: 'Lumină excesivă pe ecran și umbre dure pe mese.'
    },
    'receptie': {
      name: 'Recepție',
      lux: '300',
      dest: 'Primirea vizitatorilor, citirea documentelor la ghișeu.',
      tip: 'Iluminare generală + accent local pe suprafața ghișeului.',
      motiv: 'Sarcini vizuale de durată medie, cu contact direct cu publicul.',
      evita: 'Contralumina de la fereastră și reflexiile pe ecranul de la recepție.'
    },
    'coridor': {
      name: 'Coridor',
      lux: '100',
      dest: 'Circulație între încăperi.',
      tip: 'Iluminare generală, eventual cu senzori de prezență.',
      motiv: 'Orientare și deplasare în siguranță, fără sarcini vizuale fine.',
      evita: 'Zone întunecate între corpuri și întrerupătoare greu accesibile.'
    },
    'arhiva': {
      name: 'Arhivă',
      lux: '200',
      dest: 'Depozitare și consultare de documente, căutare pe rafturi.',
      tip: 'Iluminare generală, cu surse orientate spre rafturi dacă este nevoie.',
      motiv: 'Sarcini vizuale ocazionale, în spații de depozitare.',
      evita: 'Iluminare insuficientă pe rafturile de jos.'
    },
    'scari': {
      name: 'Scări',
      lux: '150',
      dest: 'Circulație pe verticală și evacuare.',
      tip: 'Iluminare generală + iluminare de evacuare cu corpuri autonome.',
      motiv: 'Riscul de cădere cere vizibilitatea clară a treptelor.',
      evita: 'Trepte în umbră și lipsa marcării căii de evacuare.'
    },
    'birou-b': {
      name: 'Birou B',
      lux: '500',
      dest: 'Citire, scriere, lucru la calculator.',
      tip: 'Iluminare generală + lampă locală orientabilă.',
      motiv: 'Posturi de lucru cu ecrane și sarcini repetitive.',
      evita: 'Corpuri murdare sau ecran orientat față în față cu fereastra.'
    }
  };

  var plan = $('#plan');

  if (plan) {
    var roomButtons = $$('[data-room]', plan);
    var panel = $('#roomPanel', plan);
    var panelLux = $('.room-panel__lux b', panel);
    var panelName = $('h3', panel);
    var fieldDest = $('[data-field="dest"]', panel);
    var fieldTip = $('[data-field="tip"]', panel);
    var fieldMotiv = $('[data-field="motiv"]', panel);
    var fieldEvita = $('[data-field="evita"]', panel);

    function selectRoom(key) {
      var room = rooms[key];
      if (!room) return;

      panelLux.textContent = room.lux;
      panelName.textContent = room.name;
      fieldDest.textContent = room.dest;
      fieldTip.textContent = room.tip;
      fieldMotiv.textContent = room.motiv;
      fieldEvita.textContent = room.evita;

      roomButtons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-room') === key ? 'true' : 'false');
      });
    }

    roomButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectRoom(btn.getAttribute('data-room'));
      });
    });

    // Arrow-key navigation through the rooms
    var grid = $('.plan__grid', plan);
    grid.addEventListener('keydown', function (event) {
      var keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'];
      if (keys.indexOf(event.key) === -1) return;
      var current = roomButtons.indexOf(document.activeElement);
      if (current === -1) return;
      event.preventDefault();
      var next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        next = (current + 1) % roomButtons.length;
      } else {
        next = (current - 1 + roomButtons.length) % roomButtons.length;
      }
      roomButtons[next].focus();
      selectRoom(roomButtons[next].getAttribute('data-room'));
    });
  }

  /* ---------- Quiz ---------- */
  var quiz = [
    {
      q: 'Care sunt tipurile de iluminare după proveniența luminii?',
      options: [
        'Naturală, artificială, mixtă',
        'Generală, locală, combinată',
        'Directă, difuză, reflectată',
        'De lucru, de securitate, decorativă'
      ],
      correct: 0,
      explain: 'Clasificarea după sursă urmărește proveniența luminii: soarele, corpurile electrice sau ambele. Generală, locală și combinată este o clasificare după rol, nu după sursă.'
    },
    {
      q: 'Ce înseamnă iluminare locală?',
      options: [
        'Lumină destinată unei zone sau unei sarcini determinate',
        'Lumină care acoperă toată încăperea',
        'Lumină folosită exclusiv la evacuare',
        'Lumină naturală care intră lateral prin fereastră'
      ],
      correct: 0,
      explain: 'Iluminarea locală se concentrează pe o suprafață sau o sarcină: o lampă orientată spre documente. Iluminarea generală, dimpotrivă, acoperă încăperea în ansamblu.'
    },
    {
      q: 'Ce măsoară luxmetrul?',
      options: [
        'Iluminanța, în lux',
        'Fluxul luminos, în lumeni',
        'Temperatura de culoare, în kelvin',
        'Consumul de energie, în wați'
      ],
      correct: 0,
      explain: 'Luxmetrul are un senzor sensibil la lumină și indică iluminanța din punctul în care este așezat, în lux (lx). Fluxul luminos al sursei este o altă mărime, exprimată în lumeni.'
    },
    {
      q: 'Ce valoare de referință este folosită pentru citire și scriere la birou?',
      options: [
        '500 lx',
        '100 lx',
        '200 lx',
        '2000 lx'
      ],
      correct: 0,
      explain: '500 lx este reperul de iluminare menținută din EN 12464-1:2021 pentru birouri. Este un reper de proiectare, nu o măsurare a unei clădiri reale.'
    },
    {
      q: 'De ce se controlează poziția ferestrelor față de monitoare?',
      options: [
        'Pentru a diminua reflexiile și orbirea',
        'Pentru a reduce consumul de apă',
        'Pentru a crește temperatura de culoare a becurilor',
        'Pentru a elimina nevoia de întreținere a corpurilor'
      ],
      correct: 0,
      explain: 'Ferestrele aflate în spatele sau în fața monitorului produc reflexii și contralumină. Așezarea biroului astfel încât fereastra să fie lateral, împreună cu jaluzelele, reduce disconfortul vizual.'
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    if (window.WS) window.WS.initQuiz(quiz);
  });
})();
