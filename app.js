(function () {
  "use strict";

  /* ---------- REUSABLE HELPERS ---------- */
  var $ = function (id) {
    return document.getElementById(id);
  };

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function key(a, b) {
    return [a, b].sort().join("|");
  }

  /* ---------- CLOCK ---------- */
  function clock() {
    var el = $("clock");
    if (!el || (document.visibilityState && document.visibilityState === "hidden") || window.innerWidth <= 960) {
      return;
    }
    el.textContent = new Date().toISOString().slice(11, 19) + " UTC";
  }

  /* ---------- SPOTLIGHT & TILT SYSTEM ----------
     Only place these cursor effects are bound. Pages that render .rev or
     .post cards after DOMContentLoaded can re-call initTilt safely. */
  var spotlightBound = false;
  function initSpotlight() {
    if (spotlightBound || reduce || !window.matchMedia("(hover: hover)").matches) return;
    spotlightBound = true;
    document.addEventListener("pointermove", function (e) {
      var g = e.target.closest && e.target.closest(".glass");
      if (!g) return;
      var r = g.getBoundingClientRect(),
        x = e.clientX - r.left,
        y = e.clientY - r.top;
      g.style.setProperty("--mx", x + "px");
      g.style.setProperty("--my", y + "px");
    });
  }

  var tiltBound = false;
  function initTilt() {
    if (tiltBound || reduce || !window.matchMedia("(hover: hover)").matches) return;
    tiltBound = true;
    document.addEventListener("pointermove", function (e) {
      var g = e.target.closest && e.target.closest(".rev,.post");
      if (!g) return;
      var r = g.getBoundingClientRect(),
        x = e.clientX - r.left,
        y = e.clientY - r.top;
      g.style.setProperty("--ry", ((x / r.width - 0.5) * 7).toFixed(2) + "deg");
      g.style.setProperty("--rx", ((0.5 - y / r.height) * 7).toFixed(2) + "deg");
    });
    document.addEventListener("pointerout", function (e) {
      var g = e.target.closest && e.target.closest(".rev,.post");
      if (g && !g.contains(e.relatedTarget)) {
        g.style.setProperty("--rx", "0deg");
        g.style.setProperty("--ry", "0deg");
      }
    });
  }

  /* ---------- LANGUAGE SWITCHER ---------- */
  var langSwitcherBound = false;
  function initLangSwitcher() {
    var switcher = document.querySelector(".lang-switcher");
    if (!switcher || langSwitcherBound) return;
    var btn = switcher.querySelector(".lang-btn") || switcher.querySelector("button[aria-controls='lang-menu']");
    var menu = switcher.querySelector("#lang-menu") || document.getElementById("lang-menu");
    if (!btn || !menu) return;
    langSwitcherBound = true;

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isHidden = menu.hasAttribute("hidden");
      if (isHidden) {
        menu.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
      } else {
        menu.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("click", function (e) {
      if (!switcher.contains(e.target)) {
        menu.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hasAttribute("hidden")) {
        menu.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  /* ---------- AUTO-INITIALIZATION ---------- */
  initSpotlight();
  initTilt();
  function onReady() {
    clock();
    initLangSwitcher();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
  setInterval(clock, 1000);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") clock();
  });

  /* ---------- EXPORT ---------- */
  window.DermAudit = {
    $: $,
    key: key,
    reduce: reduce,
    clock: clock,
    initSpotlight: initSpotlight,
    initTilt: initTilt,
    initLangSwitcher: initLangSwitcher
  };
})();
