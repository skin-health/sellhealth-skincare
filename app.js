/* ==========================================================================
   DERM GLOW JOURNAL - INTERACTIVE LOGIC & AFFILIATE MANAGEMENT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAffiliateLinks();
  initFAQ();
  initNavigation();
});

/* ==========================================================================
   1. AFFILIATE LINK MANAGEMENT & STORAGE
   ========================================================================== */

// Default SellHealth Affiliate Links for User ID 282956
const DEFAULT_LINKS = {
  kollagen: 'https://www.kollagenintensiv.com/ct/282956',
  illuminatural: 'https://www.illuminatural6i.com/ct/282956'
};

function sanitizeAndValidateAffiliateLink(rawUrl, productKey) {
  if (!rawUrl) return DEFAULT_LINKS[productKey];
  
  const cleanVal = rawUrl.trim();
  
  // If it is just a numeric string, build the proper URL
  if (/^\d+$/.test(cleanVal)) {
    if (productKey === 'kollagen') {
      return `https://www.kollagenintensiv.com/ct/${cleanVal}`;
    } else if (productKey === 'illuminatural') {
      return `https://www.illuminatural6i.com/ct/${cleanVal}`;
    }
  }
  
  // If it is a full URL, validate it
  try {
    const parsed = new URL(cleanVal);
    // Enforce HTTPS protocol
    if (parsed.protocol !== 'https:') {
      return DEFAULT_LINKS[productKey];
    }
    // Enforce hostname matches target merchant
    const expectedHost = productKey === 'kollagen' ? 'www.kollagenintensiv.com' : 'www.illuminatural6i.com';
    const expectedHostAlt = productKey === 'kollagen' ? 'kollagenintensiv.com' : 'illuminatural6i.com';
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
  
  try {
    savedKollagen = localStorage.getItem('sellhealth_kollagen_link');
    savedIlluminatural = localStorage.getItem('sellhealth_illuminatural_link');
  } catch (e) {
    console.warn('LocalStorage access restricted, using default affiliate links.', e);
  }

  return {
    kollagen: sanitizeAndValidateAffiliateLink(savedKollagen, 'kollagen'),
    illuminatural: sanitizeAndValidateAffiliateLink(savedIlluminatural, 'illuminatural')
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

  if (!quizResult) return;

  const links = getAffiliateLinks();
  let recommendedProduct = 'kollagen';

  if (quizAnswers.concern === 'darkspots') {
    recommendedProduct = 'illuminatural';
  } else if (quizAnswers.concern === 'both') {
    recommendedProduct = 'combo';
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
    resultDesc.textContent = 'Based on your skin profile, boosting cellular collagen and smoothing expression lines is your #1 priority for firm, youthful skin.';

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
    actionLink.innerHTML = 'Claim Discount Offer <i class="fa-solid fa-arrow-right"></i>';

  } else if (recommendedProduct === 'illuminatural') {
    resultTitle.textContent = 'Match: Illuminatural 6i™ Advanced Skin Brightener';
    resultDesc.textContent = 'Your primary concern is hyperpigmentation, sun damage, or dark spots. Illuminatural 6i interrupts melanin production safely without toxic bleaches.';

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
    actionLink.innerHTML = 'Claim Discount Offer <i class="fa-solid fa-arrow-right"></i>';

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
    actionLink.innerHTML = 'Explore Package Deals <i class="fa-solid fa-arrow-right"></i>';
  }

  infoBlock.appendChild(productTitle);
  infoBlock.appendChild(productText);
  infoBlock.appendChild(actionLink);
  container.appendChild(infoBlock);
  resultProductWrap.appendChild(container);

  quizResult.style.display = 'block';
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
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all active items
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        const ans = el.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   4. IMAGE SWITCHER FOR PRODUCT GALLERY (GLOBAL SCOPE)
   ========================================================================== */
window.switchImage = function(mainImgId, newSrc, thumbEl) {
  const mainImg = document.getElementById(mainImgId);
  if (mainImg) {
    mainImg.src = newSrc;
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
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
}
