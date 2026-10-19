/* ==========================================================================
   DERM AUDIT JOURNAL - INTERACTIVE LOGIC & AFFILIATE MANAGEMENT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAffiliateLinks();
  initFAQ();
  initNavigation();
  initScrollReveal();
  initEmbedWidgets();
  initArticleBadges();
  initMobileBuyBar();
});

/* ==========================================================================
   1. AFFILIATE LINK MANAGEMENT & STORAGE
   ========================================================================== */

// Default Affiliate Links (SellHealth, ClickBank, NHS) - Immutable
const DEFAULT_LINKS = Object.freeze({
  kollagen: 'https://www.kollagenintensiv.com/ct/282956',
  illuminatural: 'https://www.illuminatural6i.com/ct/282956',
  dermefface: 'https://www.dermeffacefx7.com/ct/282956',
  synevra: 'https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net',
  eyelasticity: 'https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=282956'
});

function sanitizeAndValidateAffiliateLink(rawUrl, productKey) {
  if (!rawUrl) return DEFAULT_LINKS[productKey];

  const cleanVal = rawUrl.trim();

  // If it is just a numeric string, build the proper merchant URL
  if (/^\d+$/.test(cleanVal)) {
    if (productKey === 'kollagen') {
      return `https://www.kollagenintensiv.com/ct/${cleanVal}`;
    } else if (productKey === 'illuminatural') {
      return `https://www.illuminatural6i.com/ct/${cleanVal}`;
    } else if (productKey === 'dermefface') {
      return `https://www.dermeffacefx7.com/ct/${cleanVal}`;
    } else if (productKey === 'eyelasticity') {
      return `https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=${cleanVal}`;
    }
  }

  // If it is a full URL, validate it
  try {
    const parsed = new URL(cleanVal);
    if (parsed.protocol !== 'https:') {
      return DEFAULT_LINKS[productKey];
    }

    if (productKey === 'synevra') {
      const isClickBankHost = /^(?:[a-z0-9_-]+\.)?hop\.clickbank\.net$/i.test(parsed.hostname) ||
                              parsed.hostname === 'clickbank.net' ||
                              parsed.hostname === 'www.clickbank.net';
      if (isClickBankHost) {
        return cleanVal;
      }
      return DEFAULT_LINKS[productKey];
    }

    if (productKey === 'eyelasticity') {
      const isNhsHost = parsed.hostname === 'www.naturalhealthsource.com' || parsed.hostname === 'naturalhealthsource.com';
      const isValidPath = parsed.pathname.startsWith('/products/eyelasticity-age-defying-eye-therapy');
      const aidVal = parsed.searchParams.get('aid');
      const isValidAid = aidVal !== null && /^\d+$/.test(aidVal);

      if (isNhsHost && isValidPath && isValidAid) {
        return `https://www.naturalhealthsource.com/products/eyelasticity-age-defying-eye-therapy/?aid=${aidVal}`;
      }
      return DEFAULT_LINKS[productKey];
    }

    let expectedHost, expectedHostAlt;
    if (productKey === 'kollagen') {
      expectedHost = 'www.kollagenintensiv.com';
      expectedHostAlt = 'kollagenintensiv.com';
    } else if (productKey === 'illuminatural') {
      expectedHost = 'www.illuminatural6i.com';
      expectedHostAlt = 'illuminatural6i.com';
    } else if (productKey === 'dermefface') {
      expectedHost = 'www.dermeffacefx7.com';
      expectedHostAlt = 'dermeffacefx7.com';
    } else {
      return DEFAULT_LINKS[productKey];
    }

    if (parsed.hostname !== expectedHost && parsed.hostname !== expectedHostAlt) {
      return DEFAULT_LINKS[productKey];
    }

    const cleanPath = parsed.pathname.replace(/\/+$/, '');
    const pathParts = cleanPath.split('/');
    if (pathParts.length === 3 && pathParts[1] === 'ct' && /^\d+$/.test(pathParts[2])) {
      const searchString = parsed.search || '';
      return `https://www.${expectedHostAlt}/ct/${pathParts[2]}${searchString}`;
    }
  } catch (e) {
    // Return default URL if parsing fails
  }

  return DEFAULT_LINKS[productKey];
}

function getAffiliateLinks() {
  let savedKollagen = null;
  let savedIlluminatural = null;
  let savedDermefface = null;
  let savedSynevra = null;
  let savedEyelasticity = null;

  try {
    savedKollagen = localStorage.getItem('sellhealth_kollagen_link');
    savedIlluminatural = localStorage.getItem('sellhealth_illuminatural_link');
    savedDermefface = localStorage.getItem('sellhealth_dermefface_link');
    savedSynevra = localStorage.getItem('affiliate_synevra_link');
    savedEyelasticity = localStorage.getItem('sellhealth_eyelasticity_link');
  } catch (e) {
    /* Silent fallback — default affiliate links are used automatically. */
  }

  return {
    kollagen: sanitizeAndValidateAffiliateLink(savedKollagen, 'kollagen'),
    illuminatural: sanitizeAndValidateAffiliateLink(savedIlluminatural, 'illuminatural'),
    dermefface: sanitizeAndValidateAffiliateLink(savedDermefface, 'dermefface'),
    synevra: sanitizeAndValidateAffiliateLink(savedSynevra, 'synevra'),
    eyelasticity: sanitizeAndValidateAffiliateLink(savedEyelasticity, 'eyelasticity')
  };
}

function applyAffiliateLinks() {
  const links = getAffiliateLinks();
  const affiliateElements = document.querySelectorAll('.affiliate-link');

  affiliateElements.forEach(el => {
    const productKey = el.getAttribute('data-product');
    if (productKey && links[productKey]) {
      el.setAttribute('href', links[productKey]);
    }
  });
}

function initAffiliateLinks() {
  applyAffiliateLinks();

  document.addEventListener('click', (e) => {
    const link = e.target.closest('.affiliate-link');
    if (!link) return;

    if (typeof window.plausible === 'function') {
      const productKey = link.getAttribute('data-product') || 'unknown';
      const placement = link.closest('#skin-quiz') ? 'quiz' :
                        link.closest('.hero') ? 'hero' :
                        link.closest('.product-card-vertical') ? 'product-card' :
                        link.closest('.mobile-buy-bar') ? 'mobile-bar' :
                        link.closest('.collision-table') ? 'conflict-table' : 'other';
      window.plausible('Affiliate Click', {
        props: {
          product: productKey,
          placement: placement
        }
      });
    }
  });
}

/* ==========================================================================
   2. INTERACTIVE SKIN QUIZ LOGIC (EVENT-DRIVEN, ARIA-PRESSED, BACK NAVIGATION)
   ========================================================================== */

/* ==========================================================================
   3. FAQ ACCORDION
   ========================================================================== */
function initFAQ() {
  const faqContainers = document.querySelectorAll('.faq-accordion, .faq-container');
  if (!faqContainers.length) return;

  faqContainers.forEach(container => {
    if (container.dataset.faqBound === 'true') return;
    container.dataset.faqBound = 'true';
    container.addEventListener('click', (e) => {
      const question = e.target.closest('.faq-question');
      if (!question) return;

      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      container.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        const q = el.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
        const ans = el.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      if (!isActive && answer) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   4. NAVIGATION CONTROLS
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    const updateIconState = (isOpen) => {
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    };

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive.toString());
      updateIconState(isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        updateIconState(false);
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        updateIconState(false);
        document.body.style.overflow = '';
        menuToggle.focus();
      }
    });
  }

  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentDropdown = toggle.closest('.nav-item-dropdown');
      if (!parentDropdown) return;
      const isOpen = parentDropdown.classList.contains('dropdown-open');

      document.querySelectorAll('.nav-item-dropdown').forEach(d => {
        if (d !== parentDropdown) {
          d.classList.remove('dropdown-open');
          const t = d.querySelector('.dropdown-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        parentDropdown.classList.remove('dropdown-open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        parentDropdown.classList.add('dropdown-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      document.querySelectorAll('.nav-item-dropdown').forEach(d => {
        d.classList.remove('dropdown-open');
        const t = d.querySelector('.dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-item-dropdown').forEach(d => {
        d.classList.remove('dropdown-open');
        const t = d.querySelector('.dropdown-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* ==========================================================================
   5. SCROLL-TRIGGERED REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  document.documentElement.classList.add('js-reveal-ready');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.05
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. HERO CATEGORY DIAGNOSTIC SELECTOR
   ========================================================================== */

/* ==========================================================================
   7. INFOGRAPHIC EMBED WIDGET (ONE-CLICK COPY CONTROLLER)
   ========================================================================== */
function initEmbedWidgets() {
  const embedBoxes = document.querySelectorAll('.infographic-embed-box');
  if (!embedBoxes.length) return;

  const docLang = (document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
  const I18N_EMBED = {
    en: { copied: 'Copied to Clipboard!', spoken: 'Embed code copied to clipboard.' },
    es: { copied: '¡Copiado al Portapapeles!', spoken: 'Código insertable copiado al portapapeles.' },
    de: { copied: 'In Zwischenablage Kopiert!', spoken: 'Einbettungscode in die Zwischenablage kopiert.' },
    fr: { copied: 'Copié dans le Presse-Papier !', spoken: 'Code d\'intégration copié dans le presse-papier.' }
  };
  const embedText = I18N_EMBED[docLang] || I18N_EMBED.en;

  embedBoxes.forEach((box) => {
    if (box.dataset.embedBound === 'true') return;
    box.dataset.embedBound = 'true';
    const btn = box.querySelector('.btn-copy-embed');
    const textarea = box.querySelector('.infographic-embed-code');
    if (!btn || !textarea) return;

    const defaultSpan = btn.querySelector('span:not(.sr-only)');
    const originalText = defaultSpan ? defaultSpan.textContent : 'Copy Embed Code';
    const originalAria = btn.getAttribute('aria-label');
    let resetTimer = null;

    btn.addEventListener('click', async () => {
      const code = textarea.value;
      let copied = false;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(code);
          copied = true;
        } catch (err) {
          // Fallback to execCommand below
        }
      }

      if (!copied) {
        textarea.select();
        try {
          document.execCommand('copy');
          copied = true;
        } catch (err) {
          // Browser prevented copy
        }
      }

      if (copied) {
        btn.classList.add('is-copied');
        const textSpan = btn.querySelector('span:not(.sr-only)');
        const icon = btn.querySelector('i');
        const liveRegion = box.querySelector('.sr-only');
        if (resetTimer) clearTimeout(resetTimer);

        if (textSpan) textSpan.textContent = embedText.copied;
        btn.setAttribute('aria-label', embedText.copied);
        if (icon) icon.className = 'fa-solid fa-check';
        if (liveRegion) liveRegion.textContent = embedText.spoken;

        resetTimer = setTimeout(() => {
          resetTimer = null;
          btn.classList.remove('is-copied');
          if (textSpan) textSpan.textContent = originalText;
          if (originalAria) {
            btn.setAttribute('aria-label', originalAria);
          } else {
            btn.removeAttribute('aria-label');
          }
          if (icon) icon.className = 'fa-solid fa-clipboard-check';
          if (liveRegion) liveRegion.textContent = '';
        }, 2500);
      }
    });

    textarea.addEventListener('click', () => {
      textarea.select();
    });
  });
}

/* ==========================================================================
   8. DYNAMIC ARTICLE RECENCY BADGES & MOBILE BUY BAR
   ========================================================================== */
function initMobileBuyBar() {
  const bar = document.querySelector('.mobile-buy-bar');
  if (!bar || bar.dataset.buyBarBound === 'true') return;
  bar.dataset.buyBarBound = 'true';

  const mainCta = document.querySelector('main .btn-xl.affiliate-link');
  const navMenu = document.getElementById('navMenu');
  let ctaOnScreen = false;
  let drawerOpen = false;
  const sync = () => bar.classList.toggle('is-hidden', ctaOnScreen || drawerOpen);

  if (mainCta && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      ctaOnScreen = entries.some((entry) => entry.isIntersecting);
      sync();
    });
    io.observe(mainCta);
  }

  if (navMenu) {
    const mo = new MutationObserver(() => {
      drawerOpen = navMenu.classList.contains('active');
      sync();
    });
    mo.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
  }
}

function initArticleBadges() {
  const headers = document.querySelectorAll('.blog-card-header[data-published], .article-header-meta[data-published]');
  if (!headers.length) return;

  const docLang = (document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
  const I18N_BADGE = {
    en: { text: 'New', label: 'New article' },
    es: { text: 'Nuevo', label: 'Nuevo artículo' },
    de: { text: 'Neu', label: 'Neuer Artikel' },
    fr: { text: 'Nouveau', label: 'Nouvel article' }
  };
  const locBadge = I18N_BADGE[docLang] || I18N_BADGE.en;

  const now = Date.now();
  const MS_PER_DAY = 86400000;
  const RECENCY_THRESHOLD_DAYS = 45;

  headers.forEach((header) => {
    const rawDate = header.getAttribute('data-published');
    if (!rawDate) return;

    const pubTime = Date.parse(rawDate);
    if (isNaN(pubTime)) return;

    const diffDays = (now - pubTime) / MS_PER_DAY;

    if (diffDays >= 0 && diffDays <= RECENCY_THRESHOLD_DAYS) {
      if (!header.querySelector('.badge-new')) {
        const badge = document.createElement('span');
        badge.className = 'badge badge-gold badge-new';
        badge.setAttribute('aria-label', locBadge.label);
        badge.textContent = locBadge.text;
        header.appendChild(badge);
      }
    }
  });
}
