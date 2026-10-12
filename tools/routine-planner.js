/*
 * Derm Audit Journal, routine planner (Phase D, v1).
 * Script: /tools/routine-planner.js
 *
 * Rules:
 * - Editorial guidance, not medical advice.
 * - Warnings use only the 42 explicit pairwise rules (no pH fallback).
 * - The planner does not assign AM or PM timing. The user places each active.
 * - DOM is built with createElement and textContent only. No innerHTML.
 * - URL and storage input are untrusted. parse() rejects invalid input.
 */
(function () {
  'use strict';

  var root = document.getElementById('routine-planner');
  var rules = window.DERM_ROUTINE_RULES;
  if (!root || !rules) { return; }

  var DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  var SLOTS = ['am', 'pm'];
  var MAX_ACTIVES = 6;
  var MAX_PLAN_LENGTH = 600;
  var ID_PATTERN = /^[a-z0-9-]{1,60}$/;
  var STORAGE_KEY = 'da.routine.v1';
  var PLAN_PARAM = 'plan';

  var DICT = {
    en: {
      title: 'Build your weekly routine',
      intro: 'Pick up to 6 actives, then build a 7-day plan. Warnings use the same explicit rules as the matrix above.',
      disclaimer: 'Editorial guidance, not medical advice. The planner does not assign AM or PM timing. You place each active.',
      pick: 'Choose actives (up to 6)',
      build: 'Build my weekly routine',
      limit: 'You can select up to 6 actives.',
      unplaced: 'Not placed yet',
      moveTo: 'Move to',
      unplacedOpt: 'Not placed',
      am: 'AM', pm: 'PM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      save: 'Save plan', share: 'Copy share link',
      saved: 'Plan saved on this device.', copied: 'Link copied.',
      copyFail: 'Copy failed. Copy the address from the browser bar instead.',
      noConflicts: 'No conflicts found between actives in the same slot.',
      conflictIn: 'Conflict in {slot}: {a} and {b}. {title}.',
      prev: 'Previous day', next: 'Next day',
      empty: 'Select actives, then build the routine.',
      invalid: 'The saved or shared plan was not valid and was ignored.'
    },
    es: {
      title: 'Crea tu rutina semanal',
      intro: 'Elige hasta 6 activos y crea un plan de 7 días. Las advertencias usan las mismas reglas explícitas de la matriz de arriba.',
      disclaimer: 'Orientación editorial, no consejo médico. El planificador no asigna horario de mañana o noche. Tú colocas cada activo.',
      pick: 'Elige activos (hasta 6)',
      build: 'Crear mi rutina semanal',
      limit: 'Puedes seleccionar hasta 6 activos.',
      unplaced: 'Sin colocar',
      moveTo: 'Mover a',
      unplacedOpt: 'Sin colocar',
      am: 'Mañana', pm: 'Noche',
      days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      save: 'Guardar plan', share: 'Copiar enlace',
      saved: 'Plan guardado en este dispositivo.', copied: 'Enlace copiado.',
      copyFail: 'No se pudo copiar. Copia la dirección desde la barra del navegador.',
      noConflicts: 'No hay conflictos entre activos en el mismo horario.',
      conflictIn: 'Conflicto en {slot}: {a} y {b}. {title}.',
      prev: 'Día anterior', next: 'Día siguiente',
      empty: 'Elige activos y luego crea la rutina.',
      invalid: 'El plan guardado o compartido no era válido y se ignoró.'
    },
    de: {
      title: 'Erstelle deine Wochenroutine',
      intro: 'Wähle bis zu 6 Wirkstoffe und erstelle einen 7-Tage-Plan. Hinweise verwenden dieselben expliziten Regeln wie die Matrix oben.',
      disclaimer: 'Redaktionelle Orientierung, keine medizinische Beratung. Der Planer legt keine Morgen- oder Abendzeiten fest. Du ordnest jeden Wirkstoff selbst zu.',
      pick: 'Wirkstoffe wählen (bis zu 6)',
      build: 'Meine Wochenroutine erstellen',
      limit: 'Du kannst bis zu 6 Wirkstoffe auswählen.',
      unplaced: 'Noch nicht zugeordnet',
      moveTo: 'Verschieben nach',
      unplacedOpt: 'Nicht zugeordnet',
      am: 'Morgens', pm: 'Abends',
      days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      save: 'Plan speichern', share: 'Teilen-Link kopieren',
      saved: 'Plan auf diesem Gerät gespeichert.', copied: 'Link kopiert.',
      copyFail: 'Kopieren fehlgeschlagen. Kopiere die Adresse aus der Browserleiste.',
      noConflicts: 'Keine Konflikte zwischen Wirkstoffen im selben Zeitfenster.',
      conflictIn: 'Konflikt bei {slot}: {a} und {b}. {title}.',
      prev: 'Vorheriger Tag', next: 'Nächster Tag',
      empty: 'Wähle Wirkstoffe und erstelle dann die Routine.',
      invalid: 'Der gespeicherte oder geteilte Plan war ungültig und wurde ignoriert.'
    },
    fr: {
      title: 'Construisez votre routine hebdomadaire',
      intro: 'Choisissez jusqu’à 6 actifs, puis créez un plan sur 7 jours. Les alertes utilisent les mêmes règles explicites que la matrice ci-dessus.',
      disclaimer: 'Conseil éditorial, non médical. Le planificateur n’attribue pas de moment matin ou soir. Vous placez chaque actif.',
      pick: 'Choisir des actifs (jusqu’à 6)',
      build: 'Créer ma routine hebdomadaire',
      limit: 'Vous pouvez sélectionner jusqu’à 6 actifs.',
      unplaced: 'Pas encore placé',
      moveTo: 'Déplacer vers',
      unplacedOpt: 'Non placé',
      am: 'Matin', pm: 'Soir',
      days: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      save: 'Enregistrer le plan', share: 'Copier le lien de partage',
      saved: 'Plan enregistré sur cet appareil.', copied: 'Lien copié.',
      copyFail: 'Échec de la copie. Copiez l’adresse depuis la barre du navigateur.',
      noConflicts: 'Aucun conflit entre les actifs du même créneau.',
      conflictIn: 'Conflit au {slot} : {a} et {b}. {title}.',
      prev: 'Jour précédent', next: 'Jour suivant',
      empty: 'Choisissez des actifs, puis créez la routine.',
      invalid: 'Le plan enregistré ou partagé n’était pas valide et a été ignoré.'
    }
  };

  var lang = (document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
  if (!DICT[lang]) { lang = 'en'; }
  var T = DICT[lang];

  function emptyState() {
    var slots = {};
    DAYS.forEach(function (d) { slots[d] = { am: [], pm: [] }; });
    return { v: 1, actives: [], slots: slots };
  }

  function isValidId(id) {
    return typeof id === 'string' && ID_PATTERN.test(id) && rules.ids.indexOf(id) !== -1;
  }

  // Returns explicit rules for every pair inside one slot. Pairs without a rule are skipped.
  function checkSlot(ids, useLang) {
    var out = [];
    for (var i = 0; i < ids.length; i++) {
      for (var j = i + 1; j < ids.length; j++) {
        var rule = rules.rule(ids[i], ids[j], useLang);
        if (rule) { out.push({ a: ids[i], b: ids[j], rule: rule }); }
      }
    }
    return out;
  }

  function serialize(state) {
    var parts = [];
    if (state.actives.length) { parts.push('a=' + state.actives.join(',')); }
    DAYS.forEach(function (d) {
      SLOTS.forEach(function (s) {
        var ids = state.slots[d][s];
        if (ids.length) { parts.push(d + '.' + s + '=' + ids.join(',')); }
      });
    });
    return parts.join(';');
  }

  // Strict parser for untrusted input (URL or storage). Returns null on any defect.
  function parse(str) {
    if (typeof str !== 'string' || str.length === 0 || str.length > MAX_PLAN_LENGTH) { return null; }
    var parts = str.split(';');
    if (parts.length > 1 + DAYS.length * SLOTS.length) { return null; }
    var state = emptyState();
    var placedOnce = {};     // an active may sit in at most one slot
    var placed = [];
    var sawActives = false;
    for (var k = 0; k < parts.length; k++) {
      var eq = parts[k].indexOf('=');
      if (eq < 1) { return null; }
      var key = parts[k].slice(0, eq);
      var ids = parts[k].slice(eq + 1).split(',');
      var uniqIds = {};
      for (var n = 0; n < ids.length; n++) {
        if (!isValidId(ids[n]) || uniqIds[ids[n]]) { return null; }
        uniqIds[ids[n]] = true;
      }
      if (key === 'a') {
        if (sawActives || ids.length > MAX_ACTIVES) { return null; }
        sawActives = true;
        state.actives = ids;
        continue;
      }
      var dot = key.split('.');
      if (dot.length !== 2 || DAYS.indexOf(dot[0]) < 0 || SLOTS.indexOf(dot[1]) < 0) { return null; }
      if (state.slots[dot[0]][dot[1]].length) { return null; }   // duplicate slot key
      state.slots[dot[0]][dot[1]] = ids;
      for (var m = 0; m < ids.length; m++) {
        if (placedOnce[ids[m]]) { return null; }
        placedOnce[ids[m]] = true;
        placed.push(ids[m]);
      }
    }
    // Every placed active must be in the actives list. Unplaced actives are allowed.
    for (var p = 0; p < placed.length; p++) {
      if (state.actives.indexOf(placed[p]) < 0) { return null; }
    }
    return state;
  }

  function loadSaved() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? parse(raw) : null;
    } catch (e) { return null; }
  }

  function saveState(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, serialize(state));
      return true;
    } catch (e) { return false; }
  }

  function readUrlPlan() {
    try {
      var raw = new URLSearchParams(window.location.search).get(PLAN_PARAM);
      if (raw === null) { return { state: null, invalid: false }; }
      var parsed = parse(raw);
      return { state: parsed, invalid: parsed === null };
    } catch (e) { return { state: null, invalid: true }; }
  }

  function writeUrlPlan(state) {
    try {
      var u = new URL(window.location.href);
      var s = serialize(state);
      if (s) { u.searchParams.set(PLAN_PARAM, s); } else { u.searchParams.delete(PLAN_PARAM); }
      window.history.replaceState(null, '', u.toString());
    } catch (e) { /* URL update is optional */ }
  }

  // Analytics: event names only, no personal data.
  function track(name, props) {
    if (typeof window.plausible === 'function') {
      try { window.plausible(name, props ? { props: props } : undefined); } catch (e) { /* ignore */ }
    }
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text !== undefined && text !== null) { n.textContent = text; }
    return n;
  }

  function nameOf(id) { return rules.name(id, lang); }

  function slotLabel(day, slot) {
    return T.days[DAYS.indexOf(day)] + ' ' + (slot === 'am' ? T.am : T.pm);
  }

  function fill(template, vars) {
    return template.replace(/\{(\w+)\}/g, function (m, key) { return vars[key] !== undefined ? vars[key] : m; });
  }

  var state = emptyState();
  var ui = { built: false, pending: [], day: 0, msg: '', msgIsError: false, smallMq: null };

  function setMessage(text, isError) {
    ui.msg = text || '';
    ui.msgIsError = !!isError;
  }

  // Move one active to a slot ('' for not placed). Keeps the state valid.
  function move(id, target) {
    DAYS.forEach(function (d) {
      SLOTS.forEach(function (s) {
        state.slots[d][s] = state.slots[d][s].filter(function (x) { return x !== id; });
      });
    });
    if (target) {
      var dot = target.split('.');
      if (dot.length === 2 && DAYS.indexOf(dot[0]) >= 0 && SLOTS.indexOf(dot[1]) >= 0) {
        state.slots[dot[0]][dot[1]].push(id);
      }
    }
    writeUrlPlan(state);
    render();
  }

  function applyBuild() {
    var picked = ui.pending.slice(0, MAX_ACTIVES);
    state.actives = picked;
    DAYS.forEach(function (d) {
      SLOTS.forEach(function (s) {
        state.slots[d][s] = state.slots[d][s].filter(function (x) { return picked.indexOf(x) >= 0; });
      });
    });
    ui.built = picked.length > 0;
    writeUrlPlan(state);
    track('routine_built', { actives: String(picked.length) });
    setMessage(ui.built ? '' : T.empty, false);
    render();
  }

  function renderPicker(parent) {
    var fs = el('fieldset', 'planner-picker');
    fs.appendChild(el('legend', '', T.pick));
    var list = el('div', 'planner-picker-list');
    rules.ids.forEach(function (id, i) {
      var label = el('label', 'planner-pick');
      var box = document.createElement('input');
      box.type = 'checkbox';
      box.value = id;
      box.id = 'planner-pick-' + i;
      box.checked = ui.pending.indexOf(id) >= 0;
      box.addEventListener('change', function () {
        if (box.checked) {
          if (ui.pending.length >= MAX_ACTIVES) {
            box.checked = false;
            setMessage(T.limit, true);
            render();
            return;
          }
          ui.pending.push(id);
        } else {
          ui.pending = ui.pending.filter(function (x) { return x !== id; });
        }
        setMessage('', false);
      });
      label.appendChild(box);
      label.appendChild(el('span', '', nameOf(id)));
      list.appendChild(label);
    });
    fs.appendChild(list);
    var build = el('button', 'btn btn-gold planner-build', T.build);
    build.type = 'button';
    build.addEventListener('click', applyBuild);
    fs.appendChild(build);
    parent.appendChild(fs);
  }

  function moveSelect(id, current) {
    var sel = el('select', 'planner-move');
    sel.setAttribute('aria-label', T.moveTo + ': ' + nameOf(id));
    var none = document.createElement('option');
    none.value = '';
    none.textContent = T.unplacedOpt;
    sel.appendChild(none);
    DAYS.forEach(function (d) {
      SLOTS.forEach(function (s) {
        var o = document.createElement('option');
        o.value = d + '.' + s;
        o.textContent = slotLabel(d, s);
        sel.appendChild(o);
      });
    });
    sel.value = current || '';
    sel.addEventListener('change', function () { move(id, sel.value); });
    return sel;
  }

  function renderBoard(parent) {
    var unplaced = state.actives.filter(function (id) {
      return !DAYS.some(function (d) {
        return SLOTS.some(function (s) { return state.slots[d][s].indexOf(id) >= 0; });
      });
    });
    var tray = el('div', 'planner-tray');
    tray.appendChild(el('h3', '', T.unplaced));
    var trayList = el('ul', 'planner-chips');
    unplaced.forEach(function (id) {
      var li = el('li', 'planner-chip');
      li.appendChild(el('span', 'planner-chip-name', nameOf(id)));
      li.appendChild(moveSelect(id, ''));
      trayList.appendChild(li);
    });
    tray.appendChild(trayList);
    parent.appendChild(tray);

    var grid = el('div', 'planner-grid');
    var small = !!(ui.smallMq && ui.smallMq.matches);
    DAYS.forEach(function (d, di) {
      var col = el('div', 'planner-day');
      col.setAttribute('data-day', d);
      if (small && di !== ui.day) { col.hidden = true; }
      col.appendChild(el('h3', 'planner-day-title', T.days[di]));
      SLOTS.forEach(function (s) {
        var block = el('div', 'planner-slot');
        block.appendChild(el('h4', 'planner-slot-title', s === 'am' ? T.am : T.pm));
        var ul = el('ul', 'planner-chips');
        state.slots[d][s].forEach(function (id) {
          var li = el('li', 'planner-chip');
          li.appendChild(el('span', 'planner-chip-name', nameOf(id)));
          li.appendChild(moveSelect(id, d + '.' + s));
          ul.appendChild(li);
        });
        block.appendChild(ul);
        col.appendChild(block);
      });
      grid.appendChild(col);
    });
    parent.appendChild(grid);

    var nav = el('div', 'planner-nav');
    var prev = el('button', 'btn planner-prev', T.prev);
    prev.type = 'button';
    prev.disabled = ui.day === 0;
    prev.addEventListener('click', function () { ui.day = Math.max(0, ui.day - 1); render(); });
    var next = el('button', 'btn planner-next', T.next);
    next.type = 'button';
    next.disabled = ui.day === DAYS.length - 1;
    next.addEventListener('click', function () { ui.day = Math.min(DAYS.length - 1, ui.day + 1); render(); });
    nav.appendChild(prev);
    nav.appendChild(next);
    parent.appendChild(nav);

    var actions = el('div', 'planner-actions');
    var save = el('button', 'btn btn-gold btn-sm', T.save);
    save.type = 'button';
    save.addEventListener('click', function () {
      if (saveState(state)) { setMessage(T.saved, false); track('routine_saved'); }
      else { setMessage(T.invalid, true); }
      render();
    });
    var share = el('button', 'btn btn-sm', T.share);
    share.type = 'button';
    share.addEventListener('click', function () {
      writeUrlPlan(state);
      var url = window.location.href;
      var done = function () { setMessage(T.copied, false); track('routine_shared'); render(); };
      var fail = function () { setMessage(T.copyFail, true); render(); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, fail);
      } else { fail(); }
    });
    actions.appendChild(save);
    actions.appendChild(share);
    parent.appendChild(actions);
  }

  function renderWarnings(parent) {
    var box = el('div', 'planner-warning');
    box.setAttribute('role', 'status');
    box.setAttribute('aria-live', 'polite');
    var lines = [];
    DAYS.forEach(function (d) {
      SLOTS.forEach(function (s) {
        checkSlot(state.slots[d][s], lang).forEach(function (c) {
          lines.push(fill(T.conflictIn, {
            slot: slotLabel(d, s), a: nameOf(c.a), b: nameOf(c.b), title: c.rule.title
          }));
        });
      });
    });
    if (ui.msg) { box.appendChild(el('p', ui.msgIsError ? 'planner-error' : '', ui.msg)); }
    if (ui.built) {
      if (lines.length === 0) { box.appendChild(el('p', '', T.noConflicts)); }
      lines.forEach(function (text) { box.appendChild(el('p', 'planner-conflict', text)); });
    }
    parent.appendChild(box);
  }

  function render() {
    while (root.firstChild) { root.removeChild(root.firstChild); }
    root.appendChild(el('h2', 'planner-title', T.title));
    root.appendChild(el('p', 'planner-intro', T.intro));
    root.appendChild(el('p', 'planner-disclaimer', T.disclaimer));
    renderPicker(root);
    renderWarnings(root);
    if (ui.built && state.actives.length) { renderBoard(root); }
  }

  function init() {
    var fromUrl = readUrlPlan();
    var saved = loadSaved();
    var source = fromUrl.state || saved;
    if (source) {
      state = source;
      ui.pending = state.actives.slice();
      ui.built = state.actives.length > 0;
    }
    if (fromUrl.invalid || (fromUrl.state === null && window.location.search.indexOf(PLAN_PARAM + '=') >= 0)) {
      setMessage(T.invalid, true);
    } else if (!ui.built) {
      setMessage(T.empty, false);
    }
    ui.smallMq = window.matchMedia ? window.matchMedia('(max-width: 599px)') : null;
    if (ui.smallMq && ui.smallMq.addEventListener) {
      ui.smallMq.addEventListener('change', render);
    }
    render();
  }

  // Exposed for automated tests and for the owner's review. Not used by the page itself.
  window.DERM_ROUTINE_PLANNER = Object.freeze({
    DAYS: DAYS, MAX_ACTIVES: MAX_ACTIVES, emptyState: emptyState,
    parse: parse, serialize: serialize, checkSlot: checkSlot, isValidId: isValidId
  });

  init();
})();
