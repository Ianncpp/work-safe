/* ==========================================================================
   WorkSafe — Igiena muncii și microclimatul
   Microclimate simulator, quiz data
   ========================================================================== */
(function () {
  'use strict';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }

  var nf = new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* ---------- Reference values (HG nr. 353/2010, anexa 2, pct. 11) ---------- */
  var REF = {
    cald: { min: 23, max: 26, label: 'perioada caldă', range: '23–26 °C' },
    rece: { min: 20, max: 24, label: 'perioada rece', range: '20–24 °C' }
  };
  var HUM = { min: 30, max: 70 };
  var AIR = { min: 0.1, max: 0.3 };

  var sim = $('#sim');

  if (sim) {
    var temp = $('#simTemp');
    var hum = $('#simHum');
    var air = $('#simAir');
    var tempOut = $('#simTempOut');
    var humOut = $('#simHumOut');
    var airOut = $('#simAirOut');
    var outTemp = $('#outTemp');
    var outHum = $('#outHum');
    var outAir = $('#outAir');
    var outRef = $('#outRef');
    var status = $('#simStatus');
    var msg = $('#simMsg');
    var tempBand = $('#tempBand');
    var seasonGroup = $('#seasonGroup');
    var seasonButtons = Array.prototype.slice.call(seasonGroup.querySelectorAll('[data-season]'));
    var season = 'cald';

    function pct(value, min, max) {
      return ((value - min) / (max - min)) * 100;
    }

    function placeBand(el, min, max, lo, hi) {
      el.style.left = pct(lo, min, max) + '%';
      el.style.width = (pct(hi, min, max) - pct(lo, min, max)) + '%';
    }

    function updateBands() {
      var ref = REF[season];
      placeBand(tempBand, 14, 34, ref.min, ref.max);
      placeBand($('#humBand'), 20, 80, HUM.min, HUM.max);
      placeBand($('#airBand'), 0, 1, AIR.min, AIR.max);
    }

    function airText(value) {
      return value.toFixed(2).replace('.', ',');
    }

    function update() {
      var t = Number(temp.value);
      var h = Number(hum.value);
      var v = Number(air.value);
      var ref = REF[season];

      tempOut.textContent = t + ' °C';
      humOut.textContent = h + ' %';
      airOut.textContent = airText(v) + ' m/s';

      outTemp.innerHTML = t + '<em>°C</em>';
      outHum.innerHTML = h + '<em>%</em>';
      outAir.innerHTML = airText(v) + '<em>m/s</em>';
      outRef.textContent = ref.range;

      temp.setAttribute('aria-valuetext', t + ' grade Celsius, reper ' + ref.range);
      hum.setAttribute('aria-valuetext', h + ' procente, reper 30–70%');
      air.setAttribute('aria-valuetext', airText(v) + ' metri pe secundă, reper 0,1–0,3');

      var tempState = t > ref.max ? 'over' : t < ref.min ? 'under' : 'in';
      var humOutRange = h > HUM.max || h < HUM.min;
      var airOutRange = v > AIR.max || v < AIR.min;
      var problems = (tempState !== 'in' ? 1 : 0) + (humOutRange ? 1 : 0) + (airOutRange ? 1 : 0);

      var sentences = [];

      if (tempState === 'over') {
        sentences.push(t + ' °C depășește reperul de temperatură pentru birourile menționate în HG nr. 353/2010 în ' + ref.label + ' (' + ref.range + ').');
      } else if (tempState === 'under') {
        sentences.push(t + ' °C este sub reperul de temperatură pentru ' + ref.label + ' (' + ref.range + ').');
      } else {
        sentences.push('Temperatura se află în intervalul de referință pentru ' + ref.label + ' (' + ref.range + ').');
      }

      if (humOutRange) {
        sentences.push(h > HUM.max
          ? 'Umiditatea de ' + h + '% depășește reperul de 30–70%: poate favoriza condensul și disconfortul.'
          : 'Umiditatea de ' + h + '% este sub reperul de 30–70%: aerul uscat poate irita ochii și mucoasele.');
      }

      if (v > AIR.max) {
        sentences.push('Curenții de ' + airText(v) + ' m/s depășesc reperul de 0,1–0,3 m/s și pot produce disconfort.');
      } else if (v < AIR.min) {
        sentences.push('Aerul aproape nu se mișcă (' + airText(v) + ' m/s): ventilația poate fi insuficientă.');
      }

      if (!humOutRange && !airOutRange) {
        sentences.push('Umiditatea și viteza aerului sunt în intervalele de referință.');
      }

      msg.textContent = sentences.join(' ');

      if (tempState === 'over') {
        status.setAttribute('data-state', 'over');
        status.textContent = 'Peste reper';
      } else if (tempState === 'under') {
        status.setAttribute('data-state', 'under');
        status.textContent = 'Sub reper';
      } else if (problems > 0) {
        status.setAttribute('data-state', 'warn');
        status.textContent = 'Atenție';
      } else {
        status.setAttribute('data-state', 'in');
        status.textContent = 'În interval';
      }
    }

    [temp, hum, air].forEach(function (input) {
      input.addEventListener('input', update);
    });

    seasonButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        season = btn.getAttribute('data-season');
        seasonButtons.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        updateBands();
        update();
      });
    });

    updateBands();
    update();
  }

  /* ---------- Quiz ---------- */
  var quiz = [
    {
      q: 'Ce studiază igiena muncii?',
      options: [
        'Factorii profesionali care pot afecta sănătatea și metodele de control al expunerii',
        'Doar bolile infecțioase apărute în timpul concediului',
        'Numai organizarea programului de lucru',
        'Structura și estetica clădirilor de birouri'
      ],
      correct: 0,
      explain: 'Igiena muncii anticipează, recunoaște, evaluează și controlează factorii din mediul profesional care pot afecta sănătatea. Scopul este prevenirea îmbolnăvirilor profesionale.'
    },
    {
      q: 'Care sunt cei patru parametri principali ai microclimatului?',
      options: [
        'Temperatura, umiditatea relativă, viteza aerului, radiația termică',
        'Temperatura, CO₂, praful, zgomotul',
        'Umiditatea, iluminarea, vibrațiile, curenții de aer',
        'Presiunea, oxigenul, CO₂, umezeala'
      ],
      correct: 0,
      explain: 'Cei patru parametri termici sunt temperatura aerului, umiditatea relativă, viteza curenților de aer și radiația termică. CO₂ și praful țin de calitatea aerului, nu de microclimatul termic.'
    },
    {
      q: 'Ce instrument măsoară umiditatea relativă?',
      options: [
        'Higrometru / psihrometru',
        'Anemometru',
        'Luxmetru',
        'Termometru cu glob'
      ],
      correct: 0,
      explain: 'Higrometrul (sau psihrometrul) măsoară umiditatea relativă, în procente. Anemometrul măsoară viteza aerului, iar termometrul cu glob ajută la evaluarea temperaturii radiante.'
    },
    {
      q: 'De ce un curent de aer este uneori util, alteori deranjant?',
      options: [
        'Schimbul de căldură cu corpul depinde de temperatura mediului și de viteza curentului',
        'Pentru că aerul are întotdeauna aceeași temperatură',
        'Pentru că anemometrul indică valori diferite de la o zi la alta',
        'Pentru că ventilația oprește automat încălzirea'
      ],
      correct: 0,
      explain: 'La temperaturi ridicate, un curent de aer accentuează răcirea prin evaporare și convecție. La temperaturi scăzute, același curent poate produce senzație de frig și disconfort local.'
    },
    {
      q: 'Ventilația și climatizarea sunt sinonime?',
      options: [
        'Nu. Climatizarea poate controla temperatura aerului fără aport de aer exterior',
        'Da, ambele introduc obligatoriu aer proaspăt',
        'Da, ambele filtrează aerul în același mod',
        'Nu, pentru că ventilația răcește aerul, iar climatizarea îl încălzește'
      ],
      correct: 0,
      explain: 'Un aparat de aer condiționat poate răci aer recirculat fără să introducă aer exterior. Ventilația asigură aport de aer proaspăt și evacuarea ori diluarea poluanților — de aceea sunt noțiuni diferite.'
    }
  ];

  document.addEventListener('DOMContentLoaded', function () {
    if (window.WS) window.WS.initQuiz(quiz);
  });
})();
