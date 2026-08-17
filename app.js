/* ==========================================================================
   DERM AUDIT JOURNAL - INTERACTIVE LOGIC & AFFILIATE MANAGEMENT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAffiliateLinks();
  initFAQ();
  initNavigation();
  initScrollReveal();
});

/* ==========================================================================
   1. AFFILIATE LINK MANAGEMENT & STORAGE
   ========================================================================== */

// Default Affiliate Links (SellHealth & ClickBank)
const DEFAULT_LINKS = {
  kollagen: 'https://www.kollagenintensiv.com/ct/282956',
  illuminatural: 'https://www.illuminatural6i.com/ct/282956',
  dermefface: 'https://www.dermeffacefx7.com/ct/282956',
  synevra: 'https://fa90bat349vj5m8h47ps5z4k7l.hop.clickbank.net',
  axavive: 'https://09cf56o9v9wfep64fslwmu3r7f.hop.clickbank.net'
};

function sanitizeAndValidateAffiliateLink(rawUrl, productKey) {
  if (!rawUrl) return DEFAULT_LINKS[productKey];
  
  const cleanVal = rawUrl.trim();
  
  // If it is just a numeric string, build the proper SellHealth URL
  if (/^\d+$/.test(cleanVal)) {
    if (productKey === 'kollagen') {
      return `https://www.kollagenintensiv.com/ct/${cleanVal}`;
    } else if (productKey === 'illuminatural') {
      return `https://www.illuminatural6i.com/ct/${cleanVal}`;
    } else if (productKey === 'dermefface') {
      return `https://www.dermeffacefx7.com/ct/${cleanVal}`;
    }
  }
  
  // If it is a full URL, validate it
  try {
    const parsed = new URL(cleanVal);
    // Enforce HTTPS protocol
    if (parsed.protocol !== 'https:') {
      return DEFAULT_LINKS[productKey];
    }

    // ClickBank link validation
    if (productKey === 'synevra' || productKey === 'axavive') {
      if (parsed.hostname.endsWith('hop.clickbank.net') || parsed.hostname.endsWith('clickbank.net')) {
        return cleanVal;
      }
      return DEFAULT_LINKS[productKey];
    }

    // SellHealth domain matching
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
    // Enforce pathname structure: /ct/numericId
    const pathParts = parsed.pathname.split('/');
    if (pathParts.length === 3 && pathParts[1] === 'ct' && /^\d+$/.test(pathParts[2])) {
      return `https://www.${expectedHostAlt}/ct/${pathParts[2]}`;
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
  let savedAxavive = null;
  
  try {
    savedKollagen = localStorage.getItem('sellhealth_kollagen_link');
    savedIlluminatural = localStorage.getItem('sellhealth_illuminatural_link');
    savedDermefface = localStorage.getItem('sellhealth_dermefface_link');
    savedSynevra = localStorage.getItem('affiliate_synevra_link');
    savedAxavive = localStorage.getItem('affiliate_axavive_link');
  } catch (e) {
    /* Silent fallback — default affiliate links are used automatically. */
  }

  return {
    kollagen: sanitizeAndValidateAffiliateLink(savedKollagen, 'kollagen'),
    illuminatural: sanitizeAndValidateAffiliateLink(savedIlluminatural, 'illuminatural'),
    dermefface: sanitizeAndValidateAffiliateLink(savedDermefface, 'dermefface'),
    synevra: sanitizeAndValidateAffiliateLink(savedSynevra, 'synevra'),
    axavive: sanitizeAndValidateAffiliateLink(savedAxavive, 'axavive')
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
}

/* ==========================================================================
   2. INTERACTIVE SKIN QUIZ LOGIC (GLOBAL SCOPE)
   ========================================================================== */

let quizAnswers = {
  concern: '',
  skinType: '',
  age: ''
};

window.selectQuizOption = function(step, value) {
  if (step === 1) quizAnswers.concern = value;
  if (step === 2) quizAnswers.skinType = value;
  if (step === 3) quizAnswers.age = value;

  const currentStepEl = document.querySelector(`.quiz-step[data-step="${step}"]`);
  const nextStepEl = document.querySelector(`.quiz-step[data-step="${step + 1}"]`);

  if (currentStepEl) currentStepEl.classList.remove('active');

  if (nextStepEl) {
    nextStepEl.classList.add('active');
  } else {
    showQuizResults();
  }
};

function showQuizResults() {
  const quizResult = document.getElementById('quizResult');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');
  const resultProductWrap = document.getElementById('resultProductWrap');

  if (!quizResult || !resultTitle || !resultDesc || !resultProductWrap) return;

  const links = getAffiliateLinks();
  let recommendedProduct = 'kollagen';

  // Primary filter: concern determines the product category
  if (quizAnswers.concern === 'darkspots') {
    recommendedProduct = 'illuminatural';
  } else if (quizAnswers.concern === 'scars') {
    recommendedProduct = 'dermefface';
  } else if (quizAnswers.concern === 'both') {
    recommendedProduct = 'combo';
  } else {
    // 'wrinkles' or any unexpected value defaults to kollagen
    recommendedProduct = 'kollagen';
  }

  // Secondary refinement: build context string from skinType and age
  let skinContext = '';
  if (quizAnswers.skinType === 'dry') {
    skinContext = 'dry or mature skin';
  } else if (quizAnswers.skinType === 'sensitive') {
    skinContext = 'sensitive, redness-prone skin';
  } else {
    skinContext = 'combination skin';
  }

  let ageContext = '';
  if (quizAnswers.age === '60+') {
    ageContext = 'For deep-set concerns in the 60+ age range, clinical-strength formulas deliver the most visible results.';
  } else if (quizAnswers.age === '46-60') {
    ageContext = 'At 46-60, active collagen support and targeted correction produce the strongest improvements.';
  } else {
    ageContext = 'Starting in your 30s-40s, early intervention helps preserve skin structure and prevent future damage.';
  }

  // Clear existing content safely
  resultProductWrap.textContent = '';

  // Container element
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.gap = '1.5rem';
  container.style.justifyContent = 'center';
  container.style.flexWrap = 'wrap';

  // Info Block element
  const infoBlock = document.createElement('div');
  infoBlock.style.textAlign = 'left';
  infoBlock.style.maxWidth = '350px';

  const productTitle = document.createElement('h4');
  productTitle.style.marginBottom = '0.3rem';

  const productText = document.createElement('p');
  productText.style.fontSize = '0.85rem';
  productText.style.color = '#64748B';
  productText.style.marginBottom = '0.8rem';

  const actionLink = document.createElement('a');
  actionLink.className = 'btn btn-gold btn-sm affiliate-link';
  actionLink.target = '_blank';
  actionLink.rel = 'noopener noreferrer nofollow sponsored';

  if (recommendedProduct === 'kollagen') {
    resultTitle.textContent = 'Match: Kollagen Intensiv™ Collagen Renewal Cream';
    resultDesc.textContent = 'For your ' + skinContext + ', boosting cellular collagen and smoothing expression lines is your #1 priority for firm, youthful skin. ' + ageContext;

    const img = document.createElement('img');
    img.src = 'Pictures/KollagenIntensiv.jpg';
    img.alt = 'Kollagen Intensiv';
    img.style.maxHeight = '120px';
    img.style.objectFit = 'contain';
    container.appendChild(img);

    productTitle.textContent = 'Kollagen Intensiv™';
    productText.textContent = 'Clinically proven Syn-Coll® formula boosts natural collagen synthesis by 354%.';
    
    actionLink.href = links.kollagen;
    actionLink.setAttribute('data-product', 'kollagen');
    const icon1 = document.createElement('i');
    icon1.className = 'fa-solid fa-arrow-right';
    actionLink.textContent = 'Claim Discount Offer ';
    actionLink.appendChild(icon1);

  } else if (recommendedProduct === 'illuminatural') {
    resultTitle.textContent = 'Match: Illuminatural 6i™ Advanced Skin Brightener';
    resultDesc.textContent = 'For your ' + skinContext + ', interrupting melanin overproduction safely and without toxic bleaches is the priority. ' + ageContext;

    const img = document.createElement('img');
    img.src = 'Pictures/illuminatural.jpg';
    img.alt = 'Illuminatural 6i';
    img.style.maxHeight = '120px';
    img.style.objectFit = 'contain';
    container.appendChild(img);

    productTitle.textContent = 'Illuminatural 6i™';
    productText.textContent = '6-active clinically proven skin lightener designed to fade dark spots in 4 weeks.';
    
    actionLink.href = links.illuminatural;
    actionLink.setAttribute('data-product', 'illuminatural');
    const icon2 = document.createElement('i');
    icon2.className = 'fa-solid fa-arrow-right';
    actionLink.textContent = 'Claim Discount Offer ';
    actionLink.appendChild(icon2);

  } else if (recommendedProduct === 'dermefface') {
    resultTitle.textContent = 'Match: Dermefface FX7™ Scar Reduction Therapy';
    resultDesc.textContent = 'For your ' + skinContext + ', accelerating skin remodeling to fade scar tissue and acne marks is the priority. ' + ageContext;

    const img = document.createElement('img');
    img.src = 'Pictures/dermefface.jpg';
    img.alt = 'Dermefface FX7';
    img.style.maxHeight = '120px';
    img.style.objectFit = 'contain';
    container.appendChild(img);

    productTitle.textContent = 'Dermefface FX7™';
    productText.textContent = '7 active ingredients, clinically proven to boost Type I collagen by 1190% to speed skin repair.';
    
    actionLink.href = links.dermefface;
    actionLink.setAttribute('data-product', 'dermefface');
    const icon3 = document.createElement('i');
    icon3.className = 'fa-solid fa-arrow-right';
    actionLink.textContent = 'Claim Discount Offer ';
    actionLink.appendChild(icon3);

  } else {
    resultTitle.textContent = 'Match: Total Rejuvenation System (Kollagen + Illuminatural)';
    resultDesc.textContent = 'You indicated both wrinkle reduction and dark spot fading. Combining Kollagen Intensiv with Illuminatural 6i delivers maximum dermatological results.';

    const img1 = document.createElement('img');
    img1.src = 'Pictures/KollagenIntensiv.jpg';
    img1.alt = 'Kollagen';
    img1.style.maxHeight = '90px';
    container.appendChild(img1);

    const img2 = document.createElement('img');
    img2.src = 'Pictures/illuminatural.jpg';
    img2.alt = 'Illuminatural';
    img2.style.maxHeight = '90px';
    container.appendChild(img2);

    productTitle.textContent = 'The Dual Rejuvenation Bundle';
    productText.textContent = 'Apply Illuminatural 6i for dark spots, followed by Kollagen Intensiv for total wrinkle smoothing.';
    
    actionLink.href = links.kollagen;
    actionLink.setAttribute('data-product', 'kollagen');
    const icon4 = document.createElement('i');
    icon4.className = 'fa-solid fa-arrow-right';
    actionLink.textContent = 'Explore Package Deals ';
    actionLink.appendChild(icon4);
  }

  infoBlock.appendChild(productTitle);
  infoBlock.appendChild(productText);
  infoBlock.appendChild(actionLink);
  container.appendChild(infoBlock);
  resultProductWrap.appendChild(container);

  quizResult.style.display = 'block';
  resultTitle.focus();
}

window.resetQuiz = function() {
  quizAnswers = { concern: '', skinType: '', age: '' };
  const steps = document.querySelectorAll('.quiz-step');
  steps.forEach(s => s.classList.remove('active'));

  const step1 = document.querySelector('.quiz-step[data-step="1"]');
  if (step1) step1.classList.add('active');

  const quizResult = document.getElementById('quizResult');
  if (quizResult) quizResult.style.display = 'none';
};

/* ==========================================================================
   3. FAQ ACCORDION
   ========================================================================== */
function initFAQ() {
  const faqContainers = document.querySelectorAll('.faq-accordion, .faq-container');
  if (!faqContainers.length) return;

  faqContainers.forEach(container => {
    container.addEventListener('click', (e) => {
      const question = e.target.closest('.faq-question');
      if (!question) return;

      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all other active items in this container
      container.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        const ans = el.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      if (!isActive && answer) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   4. IMAGE SWITCHER FOR PRODUCT GALLERY (GLOBAL SCOPE)
   ========================================================================== */
window.switchImage = function(mainImgId, newSrc, thumbEl, newAlt) {
  const mainImg = document.getElementById(mainImgId);
  if (mainImg) {
    mainImg.src = newSrc;
    if (newAlt) {
      mainImg.alt = newAlt;
    }
  }

  if (thumbEl && thumbEl.parentElement) {
    const thumbs = thumbEl.parentElement.querySelectorAll('.thumb');
    thumbs.forEach(t => t.classList.remove('active'));
    thumbEl.classList.add('active');
  }
};

/* ==========================================================================
   5. NAVIGATION CONTROLS
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
    });

    // Close mobile menu on click outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        updateIconState(false);
      }
    });

    // Close mobile menu on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        updateIconState(false);
        menuToggle.focus();
      }
    });
  }
}

/* ==========================================================================
   6. SCROLL-TRIGGERED REVEAL ANIMATIONS
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


