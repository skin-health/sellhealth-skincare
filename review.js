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
          ans.style.maxHeight = ans.scrollHeight + "px";
        } else {
          btn.setAttribute("aria-expanded", "false");
          ans.setAttribute("hidden", "");
          ans.style.maxHeight = "0px";
        }
      }

      btn.addEventListener("click", function () {
        var answer = btn.nextElementSibling;
        if (!answer || !answer.classList.contains("faq-answer")) return;
        var expanded = btn.getAttribute("aria-expanded") === "true";
        if (expanded) {
          btn.setAttribute("aria-expanded", "false");
          answer.style.maxHeight = "0px";
          answer.setAttribute("hidden", "");
        } else {
          btn.setAttribute("aria-expanded", "true");
          answer.removeAttribute("hidden");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- MOBILE BUY BAR ---------- */
  function initBuyBar() {
    var bar = document.querySelector(".mobile-buy-bar");
    if (!bar) return;

    var target = document.querySelector(".cta-band") || document.querySelector(".product-hero");
    if (!target) {
      bar.classList.add("is-visible");
      return;
    }

    if (!("IntersectionObserver" in window)) {
      bar.classList.add("is-visible");
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          bar.classList.remove("is-visible");
        } else {
          bar.classList.add("is-visible");
        }
      });
    }, { rootMargin: "0px" });

    observer.observe(target);
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
      return;
    }
    var el = document.getElementById("clock");
    if (el) {
      var update = function () {
        el.textContent = new Date().toISOString().slice(11, 19) + " UTC";
      };
      update();
      setInterval(update, 1000);
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
