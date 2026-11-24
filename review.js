(function () {
  "use strict";

  /* ---------- FAQ ACCORDION ---------- */
  function initFaq() {
    var questions = document.querySelectorAll(".faq-question");
    if (!questions || !questions.length) return;

    questions.forEach(function (btn) {
      if (!btn.getAttribute("type")) {
        btn.setAttribute("type", "button");
      }
      var ans = btn.nextElementSibling;
      if (ans && ans.classList.contains("faq-answer")) {
        var isExpanded = btn.getAttribute("aria-expanded") === "true";
        if (isExpanded) {
          ans.removeAttribute("hidden");
        } else {
          btn.setAttribute("aria-expanded", "false");
          ans.setAttribute("hidden", "");
        }
      }

      btn.addEventListener("click", function () {
        var answer = btn.nextElementSibling;
        if (!answer || !answer.classList.contains("faq-answer")) return;
        var expanded = btn.getAttribute("aria-expanded") === "true";
        if (expanded) {
          btn.setAttribute("aria-expanded", "false");
          answer.setAttribute("hidden", "");
        } else {
          btn.setAttribute("aria-expanded", "true");
          answer.removeAttribute("hidden");
        }
      });
    });
  }

  /* ---------- MOBILE BUY BAR ---------- */
  function initBuyBar() {
    var bar = document.querySelector(".mobile-buy-bar");
    if (!bar) return;

    var hero = document.querySelector(".product-hero");
    var cta = document.querySelector(".cta-band");
    var footer = document.querySelector("footer");
    if (!hero && !cta) {
      bar.classList.add("is-visible");
      return;
    }

    if (!("IntersectionObserver" in window)) {
      bar.classList.add("is-visible");
      return;
    }

    var state = { heroVisible: !!hero, ctaVisible: false, footerVisible: false };
    function sync() {
      var pastHero = !hero || hero.getBoundingClientRect().bottom <= 0;
      var show = pastHero && !state.ctaVisible && !state.footerVisible;
      bar.classList.toggle("is-visible", show);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === hero) state.heroVisible = entry.isIntersecting;
        else if (entry.target === cta) state.ctaVisible = entry.isIntersecting;
        else if (entry.target === footer) state.footerVisible = entry.isIntersecting;
      });
      sync();
    }, { rootMargin: "0px" });

    if (hero) observer.observe(hero);
    if (cta) observer.observe(cta);
    if (footer) observer.observe(footer);
    window.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  /* ---------- LANGUAGE SWITCHER ---------- */
  function initLang() {
    if (window.DermAudit && typeof window.DermAudit.initLangSwitcher === "function") {
      window.DermAudit.initLangSwitcher();
    }
  }

  /* ---------- TELEMETRY CLOCK ---------- */
  function initClock() {
    if (window.DermAudit && typeof window.DermAudit.clock === "function") {
      window.DermAudit.clock();
    }
  }

  /* ---------- INITIALIZATION ---------- */
  function init() {
    initFaq();
    initBuyBar();
    initLang();
    initClock();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* ---------- EXPORT ---------- */
  window.DermAuditReview = {
    initFaq: initFaq,
    initBuyBar: initBuyBar,
    initLang: initLang
  };
})();
