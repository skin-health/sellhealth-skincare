(function () {
  "use strict";

  function getLang() {
    var lang = (document.documentElement.lang || "").toLowerCase().slice(0, 2);
    if (["en", "es", "de", "fr"].indexOf(lang) !== -1) return lang;
    var path = window.location.pathname;
    if (path.indexOf("/es/") !== -1 || path === "/es" || path.indexOf("/es") === 0) return "es";
    if (path.indexOf("/de/") !== -1 || path === "/de" || path.indexOf("/de") === 0) return "de";
    if (path.indexOf("/fr/") !== -1 || path === "/fr" || path.indexOf("/fr") === 0) return "fr";
    return "en";
  }

  var FAQS_BY_LANG = {
  "en": [
    {
      "q": "How long before I start seeing results across these formulas?",
      "a": "Most users report noticeable hydration and plumping within 7 to 14 days with topical peptides like Kollagen Intensiv. For deep wrinkle reduction, dark spot fading with Illuminatural 6i, and scar remodeling with Dermefface FX7, maximum clinical results occur between 30 and 90 days as skin cellular renewal cycles complete."
    },
    {
      "q": "Can I combine topical anti-aging creams with targeted spot or eye treatments?",
      "a": "Yes. Combining targeted topical serums with specialized eye or scar therapies is an evidence-based layering strategy. For instance, applying Illuminatural 6i on localized dark spots and following with Kollagen Intensiv provides dual brightening and collagen support, while Dermefface FX7 targets surface scarring and textural recovery."
    },
    {
      "q": "What are the Money-Back Guarantees on these products?",
      "a": "All 5 featured solutions carry satisfaction guarantees. Skinception products (Kollagen Intensiv, Illuminatural 6i, Dermefface FX7) include a 90-day money-back guarantee. Eyelasticity includes a 67-day guarantee, and Synevra UltraLift is backed by a 60-day money-back policy directly through its official merchant portal."
    },
    {
      "q": "Are these formulas safe for sensitive skin types?",
      "a": "Yes. All featured formulations avoid harsh bleaching agents like hydroquinone, mercury, steroids, and parabens. However, we always advise performing a standard 24-hour patch test on your inner wrist before starting any new topical routine."
    }
  ],
  "es": [
    {
      "q": "¿En cuánto tiempo se observan los primeros resultados?",
      "a": "La mayoría de los usuarios reporta mayor hidratación y firmeza en 7 a 14 días con péptidos tópicos como Kollagen Intensiv. Para arrugas profundas, manchas con Illuminatural 6i y cicatrices con Dermefface FX7, los resultados máximos ocurren entre 30 y 90 días conforme se completa el ciclo celular."
    },
    {
      "q": "¿Puedo combinar cremas antiedad tópicas con tratamientos específicos para manchas o contorno de ojos?",
      "a": "Sí. Combinar sérums tópicos específicos con tratamientos para ojos o cicatrices es una estrategia de aplicación por capas basada en evidencia. Por ejemplo, aplicar Illuminatural 6i en manchas y Kollagen Intensiv en el rostro ofrece doble soporte de luminosidad y colágeno, mientras Dermefface FX7 trata cicatrices y textura dérmica."
    },
    {
      "q": "¿Qué garantías de devolución ofrecen estos productos?",
      "a": "Las 5 fórmulas evaluadas cuentan con garantías completas de satisfacción. Los productos de Skinception (Kollagen Intensiv, Illuminatural 6i, Dermefface FX7) incluyen 90 días de garantía. Eyelasticity incluye 67 días de garantía y Synevra UltraLift ofrece 60 días de devolución total a través de su portal oficial."
    },
    {
      "q": "¿Son seguras estas fórmulas para pieles sensibles?",
      "a": "Sí. Todas las fórmulas evitan agentes abrasivos como hidroquinona, mercurio, esteroides y parabenos. Recomendamos realizar una prueba de parche en el antebrazo durante 24 horas antes de comenzar cualquier rutina nueva."
    }
  ],
  "de": [
    {
      "q": "Wie schnell sind erste Ergebnisse sichtbar?",
      "a": "Die meisten Anwender bemerken eine verbesserte Hydratation und Glätte innerhalb von 7 bis 14 Tagen mit Kollagen Intensiv. Bei tieferen Falten, Pigmentflecken mit Illuminatural 6i und Narben mit Dermefface FX7 werden maximale Ergebnisse nach 30 bis 90 Tagen erreicht."
    },
    {
      "q": "Kann man topische Anti-Aging-Cremes mit gezielten Aufhellern oder Augenpflege kombinieren?",
      "a": "Ja. Die Kombination aus gezielten topischen Seren und Augen- oder Narbenbehandlungen ist eine evidenzbasierte Schichtungsstrategie. So ergänzen sich Illuminatural 6i auf Pigmentflecken und Kollagen Intensiv für die Kollagensynthese ideal, während Dermefface FX7 Narbengewebe und Hauttextur glättet."
    },
    {
      "q": "Welche Garantien gelten für diese Produkte?",
      "a": "Alle 5 vorgestellten Lösungen bieten Zufriedenheitsgarantien. Skinception (Kollagen Intensiv, Illuminatural 6i, Dermefface FX7) gewährt 90 Tage volle Erstattung. Eyelasticity bietet 67 Tage Garantie, und Synevra UltraLift gewährt 60 Tage Geld-zurück-Garantie direkt über den Hersteller."
    },
    {
      "q": "Sind die Formeln für sensible Haut geeignet?",
      "a": "Ja. Alle Rezepturen verzichten auf reizende Bleichmittel wie Hydrochinon, Quecksilber, Steroide und Parabene. Wir empfehlen vor der Erstanwendung einen 24-Stunden-Patch-Test am Handgelenk."
    }
  ],
  "fr": [
    {
      "q": "En combien de temps observe-t-on les premiers résultats ?",
      "a": "La plupart des utilisateurs constatent une hydratation et une douceur améliorées en 7 à 14 jours avec Kollagen Intensiv. Pour les rides profondes, les taches avec Illuminatural 6i et les cicatrices avec Dermefface FX7, les résultats maximaux se manifestent entre 30 et 90 jours."
    },
    {
      "q": "Peut-on associer des crèmes anti-âge topiques avec des soins anti-taches ?",
      "a": "Oui. Associer des crèmes raffermissantes et des sérums ciblés est une approche de superposition fondée sur des données probantes. Par exemple, appliquer Illuminatural 6i sur les taches et Kollagen Intensiv sur l'ensemble du visage assure une synergie totale."
    },
    {
      "q": "Quelles sont les garanties de remboursement ?",
      "a": "Les 5 solutions disposent de garanties de satisfaction complètes. Les soins Skinception (Kollagen Intensiv, Illuminatural 6i, Dermefface FX7) incluent 90 jours de garantie de remboursement. Eyelasticity offre 67 jours de garantie, et Synevra UltraLift propose 60 jours de garantie fabricant."
    },
    {
      "q": "Ces formules conviennent-elles aux peaux sensibles ?",
      "a": "Oui. Toutes nos formules évitent les substances irritantes comme l'hydroquinone, le mercure, les stéroïdes et les parabènes. Nous conseillons de faire un test préalable de 24h sur l'intérieur du poignet."
    }
  ]
};

  function initAccordion() {
    var list = document.getElementById("faq-list");
    if (!list) return;

    var curLang = getLang();
    var faqs = FAQS_BY_LANG[curLang] || FAQS_BY_LANG.en;

    // If empty in DOM, render from FAQS array
    if (!list.children.length) {
      list.innerHTML = faqs.map(function (f, i) {
        var qId = "faq-q" + (i + 1);
        var aId = "faq-a" + (i + 1);
        return '<div class="faq-item">' +
          '<button class="faq-question" type="button" aria-expanded="false" id="' + qId + '" aria-controls="' + aId + '">' +
          '<span>' + f.q + '</span>' +
          '<i class="fa-solid fa-chevron-down" aria-hidden="true"></i>' +
          '</button>' +
          '<div class="faq-answer" id="' + aId + '" role="region" aria-labelledby="' + qId + '">' +
          '<p>' + f.a + '</p>' +
          '</div>' +
          '</div>';
      }).join("");
    }

    list.addEventListener("click", function (e) {
      var btn = e.target.closest(".faq-question");
      if (!btn) return;
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
    });
  }

  /* ---------- TELEMETRY CLOCK ---------- */
  function startClock() {
    var clk = document.getElementById("clock");
    if (!clk) return;
    function update() {
      clk.textContent = new Date().toISOString().slice(11, 19) + " UTC";
    }
    update();
    setInterval(update, 1000);
  }

  /* ---------- LANGUAGE SWITCHER ---------- */
  function initLangSwitcher() {
    var switcher = document.querySelector(".lang-switcher");
    if (!switcher) return;
    var btn = switcher.querySelector(".lang-btn");
    var menu = switcher.querySelector("#lang-menu");
    if (!btn || !menu) return;

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

  function init() {
    initAccordion();
    initLangSwitcher();
    startClock();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
