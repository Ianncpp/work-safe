/* ==========================================================================
   WorkSafe — shared behaviour
   Nav, reading progress, table of contents, presentation mode, quiz engine
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var doc = document;
  var html = doc.documentElement;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  /* ---------- Reading progress ---------- */
  var progressBar = $('#progressBar');
  var toTop = $('#toTop');
  var ticking = false;

  function onScrollFrame() {
    var scrollTop = window.pageYOffset || html.scrollTop;
    var height = Math.max(1, doc.body.scrollHeight - window.innerHeight);
    if (progressBar) progressBar.style.width = Math.min(100, (scrollTop / height) * 100) + '%';
    if (toTop) toTop.classList.toggle('is-visible', scrollTop > 700);
    updateActiveSection(scrollTop);
    ticking = false;
  }

  function requestScrollFrame() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScrollFrame);
    }
  }

  window.addEventListener('scroll', requestScrollFrame, { passive: true });
  window.addEventListener('resize', requestScrollFrame, { passive: true });

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Table of contents ---------- */
  var sections = $$('main section[id][data-nav]');
  var toc = $('#toc');
  var tocList = $('#tocList');
  var tocBtn = $('#tocBtn');
  var tocClose = $('#tocClose');
  var tocOverlay = $('#tocOverlay');
  var tocLinks = [];

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  if (tocList && sections.length) {
    sections.forEach(function (section, i) {
      var li = doc.createElement('li');
      var a = doc.createElement('a');
      a.href = '#' + section.id;
      a.innerHTML = '<span>' + pad(i + 1) + '</span>' + section.getAttribute('data-nav');
      li.appendChild(a);
      tocList.appendChild(li);
      tocLinks.push({ link: a, section: section });
    });
  }

  function updateActiveSection(scrollTop) {
    if (!tocLinks.length) return;
    var probe = scrollTop + parseInt(getComputedStyle(html).getPropertyValue('--header-h') || '66', 10) + 140;
    var activeIndex = 0;
    for (var i = 0; i < tocLinks.length; i++) {
      var top = tocLinks[i].section.offsetTop;
      if (top <= probe) activeIndex = i;
    }
    if (scrollTop + window.innerHeight >= doc.body.scrollHeight - 4) {
      activeIndex = tocLinks.length - 1;
    }
    tocLinks.forEach(function (item, i) {
      var isActive = i === activeIndex;
      item.link.classList.toggle('is-active', isActive);
      if (isActive) item.link.setAttribute('aria-current', 'true');
      else item.link.removeAttribute('aria-current');
    });
  }

  var lastFocused = null;

  function openToc() {
    if (!toc) return;
    lastFocused = doc.activeElement;
    toc.classList.add('is-open');
    tocOverlay.classList.add('is-open');
    toc.setAttribute('aria-hidden', 'false');
    toc.inert = false;
    tocBtn.setAttribute('aria-expanded', 'true');
    doc.body.style.overflow = 'hidden';
    if (tocClose) tocClose.focus();
  }

  function closeToc() {
    if (!toc) return;
    toc.classList.remove('is-open');
    tocOverlay.classList.remove('is-open');
    toc.setAttribute('aria-hidden', 'true');
    toc.inert = true;
    tocBtn.setAttribute('aria-expanded', 'false');
    doc.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  if (tocBtn) {
    tocBtn.addEventListener('click', function () {
      if (toc.classList.contains('is-open')) closeToc();
      else openToc();
    });
  }
  if (tocClose) tocClose.addEventListener('click', closeToc);
  if (tocOverlay) tocOverlay.addEventListener('click', closeToc);

  if (tocList) {
    tocList.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeToc();
    });
  }

  /* ---------- Presentation mode ---------- */
  var presentBtn = $('#presentBtn');
  var PRESENT_KEY = 'worksafe-present';

  function setPresent(on, store) {
    html.classList.toggle('present', on);
    if (presentBtn) presentBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (store) {
      try { localStorage.setItem(PRESENT_KEY, on ? '1' : '0'); } catch (e) { /* ignore */ }
    }
  }

  if (presentBtn) {
    presentBtn.addEventListener('click', function () {
      setPresent(!html.classList.contains('present'), true);
    });
  }

  try {
    if (localStorage.getItem(PRESENT_KEY) === '1') setPresent(true, false);
  } catch (e) { /* ignore */ }

  /* ---------- Keyboard ---------- */
  doc.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (toc && toc.classList.contains('is-open')) { closeToc(); return; }
      if (html.classList.contains('present')) { setPresent(false, true); }
    }

    if ((event.key === 'p' || event.key === 'P') && !event.metaKey && !event.ctrlKey && !event.altKey) {
      var tag = (event.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (event.target.isContentEditable) return;
      setPresent(!html.classList.contains('present'), true);
    }

    if (event.key === 'Tab' && toc && toc.classList.contains('is-open')) {
      var focusables = $$('a[href], button:not([disabled])', toc);
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (event.shiftKey && doc.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && doc.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------- Reveal on scroll ---------- */
  var revealItems = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    revealItems.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add('is-in'); });
  }

  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Quiz engine ---------- */
  var LETTERS = ['A', 'B', 'C', 'D'];

  function initQuiz(data) {
    var box = $('#quizBox');
    if (!box || !data || !data.length) return;

    var body = $('[data-quiz-body]', box);
    var countEl = $('[data-quiz-count]', box);
    var progressEl = $('[data-quiz-progress]', box);
    var index = 0;
    var score = 0;
    var answered = false;

    function render() {
      var item = data[index];
      answered = false;
      countEl.textContent = 'Întrebarea ' + (index + 1) + ' / ' + data.length;
      progressEl.style.width = ((index + 1) / data.length) * 100 + '%';

      body.innerHTML = '';

      var q = doc.createElement('p');
      q.className = 'quiz__q';
      q.textContent = item.q;
      body.appendChild(q);

      var opts = doc.createElement('div');
      opts.className = 'quiz__opts';
      opts.setAttribute('role', 'group');
      opts.setAttribute('aria-label', 'Variante de răspuns');

      item.options.forEach(function (text, i) {
        var btn = doc.createElement('button');
        btn.type = 'button';
        btn.className = 'opt';
        btn.innerHTML = '<span class="opt__key" aria-hidden="true">' + LETTERS[i] + '</span><span>' + text + '</span>';
        btn.addEventListener('click', function () { choose(i); });
        opts.appendChild(btn);
      });
      body.appendChild(opts);

      var feedback = doc.createElement('div');
      feedback.className = 'quiz__feedback';
      feedback.hidden = true;
      feedback.setAttribute('role', 'status');
      feedback.setAttribute('aria-live', 'polite');
      body.appendChild(feedback);

      var actions = doc.createElement('div');
      actions.className = 'quiz__actions';
      actions.innerHTML =
        '<span class="quiz__score">Scor: ' + score + ' / ' + data.length + '</span>' +
        '<button class="btn btn--primary" type="button" data-next disabled>Următoarea întrebare</button>';
      body.appendChild(actions);

      var nextBtn = $('[data-next]', actions);
      nextBtn.addEventListener('click', function () {
        if (index < data.length - 1) {
          index++;
          render();
        } else {
          renderResult();
        }
      });
    }

    function choose(picked) {
      if (answered) return;
      answered = true;

      var item = data[index];
      var buttons = $$('.opt', body);
      var feedback = $('.quiz__feedback', body);
      var nextBtn = $('[data-next]', body);
      var isRight = picked === item.correct;

      buttons.forEach(function (btn, i) {
        btn.disabled = true;
        if (i === item.correct) btn.classList.add('is-correct');
        if (i === picked && !isRight) btn.classList.add('is-wrong');
      });

      if (isRight) score++;

      feedback.hidden = false;
      feedback.className = 'quiz__feedback ' + (isRight ? 'is-ok' : 'is-no');
      feedback.innerHTML =
        '<strong>' + (isRight ? 'Corect' : 'Nu chiar') + '</strong>' +
        item.explain;

      $('.quiz__score', body).textContent = 'Scor: ' + score + ' / ' + data.length;
      nextBtn.disabled = false;
      nextBtn.textContent = index < data.length - 1 ? 'Următoarea întrebare' : 'Vezi rezultatul';
      nextBtn.focus({ preventScroll: true });
    }

    function renderResult() {
      countEl.textContent = 'Rezultat final';
      progressEl.style.width = '100%';

      var pct = Math.round((score / data.length) * 100);
      var message = pct === 100
        ? 'Toate răspunsurile sunt corecte. Poți explica lecția mai departe.'
        : pct >= 60
          ? 'Ai reținut ideile principale. Recitește secțiunile marcate de întrebările greșite.'
          : 'Reia lecția pe secțiuni, apoi încearcă din nou — întrebările sunt aceleași.';

      body.innerHTML =
        '<div class="quiz__done">' +
          '<div class="quiz__ring" style="--pct:' + pct + '"><b>' + score + '/' + data.length + '</b></div>' +
          '<h3>' + (pct === 100 ? 'Felicitări!' : pct >= 60 ? 'Aproape acolo' : 'Mai exersează') + '</h3>' +
          '<p>' + message + '</p>' +
          '<button class="btn btn--ghost" type="button" data-restart style="margin-top:18px">Reîncearcă</button>' +
        '</div>';

      $('[data-restart]', body).addEventListener('click', function () {
        index = 0;
        score = 0;
        render();
      });
      $('[data-restart]', body).focus({ preventScroll: true });
    }

    render();
  }

  window.WS = { initQuiz: initQuiz };

  // First paint + active state
  requestScrollFrame();
})();
