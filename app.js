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
    kollagen: savedKollagen || DEFAULT_LINKS.kollagen,
    illuminatural: savedIlluminatural || DEFAULT_LINKS.illuminatural
  };
}

function applyAffiliateLinks() {
  const links = getAffiliateLinks();
  const affiliateElements = document.querySelectorAll('.affiliate-link');

  affiliateElements.forEach(el => {
    const productKey = el.getAttribute('data-product');
    if (productKey && links[productKey]) {
      let finalUrl = links[productKey];

      // Format bare ID strings (e.g. 282956) into official SellHealth target URLs
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        if (productKey === 'kollagen') {
          finalUrl = `https://www.kollagenintensiv.com/ct/${finalUrl}`;
        } else if (productKey === 'illuminatural') {
          finalUrl = `https://www.illuminatural6i.com/ct/${finalUrl}`;
        }
      }

      el.setAttribute('href', finalUrl);
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

  if (recommendedProduct === 'kollagen') {
    resultTitle.textContent = 'Match: Kollagen Intensiv™ Collagen Renewal Cream';
    resultDesc.textContent = 'Based on your skin profile, boosting cellular collagen and smoothing expression lines is your #1 priority for firm, youthful skin.';
    resultProductWrap.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
        <img src="Pictures/KollagenIntensiv.jpg" alt="Kollagen Intensiv" style="max-height: 120px; object-fit: contain;">
        <div style="text-align: left; max-width: 350px;">
          <h4 style="margin-bottom: 0.3rem;">Kollagen Intensiv™</h4>
          <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.8rem;">Clinically proven Syn-Coll® formula boosts natural collagen synthesis by 354%.</p>
          <a href="${links.kollagen}" class="btn btn-gold btn-sm affiliate-link" data-product="kollagen" target="_blank" rel="noopener noreferrer nofollow sponsored">
            Claim Discount Offer <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `;
  } else if (recommendedProduct === 'illuminatural') {
    resultTitle.textContent = 'Match: Illuminatural 6i™ Advanced Skin Brightener';
    resultDesc.textContent = 'Your primary concern is hyperpigmentation, sun damage, or dark spots. Illuminatural 6i interrupts melanin production safely without toxic bleaches.';
    resultProductWrap.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
        <img src="Pictures/illuminatural.jpg" alt="Illuminatural 6i" style="max-height: 120px; object-fit: contain;">
        <div style="text-align: left; max-width: 350px;">
          <h4 style="margin-bottom: 0.3rem;">Illuminatural 6i™</h4>
          <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.8rem;">6-active clinically proven skin lightener designed to fade dark spots in 4 weeks.</p>
          <a href="${links.illuminatural}" class="btn btn-gold btn-sm affiliate-link" data-product="illuminatural" target="_blank" rel="noopener noreferrer nofollow sponsored">
            Claim Discount Offer <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `;
  } else {
    resultTitle.textContent = 'Match: Total Rejuvenation System (Kollagen + Illuminatural)';
    resultDesc.textContent = 'You indicated both wrinkle reduction and dark spot fading. Combining Kollagen Intensiv with Illuminatural 6i delivers maximum dermatological results.';
    resultProductWrap.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
        <img src="Pictures/KollagenIntensiv.jpg" alt="Kollagen" style="max-height: 90px;">
        <img src="Pictures/illuminatural.jpg" alt="Illuminatural" style="max-height: 90px;">
        <div style="text-align: left; max-width: 350px;">
          <h4 style="margin-bottom: 0.3rem;">The Dual Rejuvenation Bundle</h4>
          <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.8rem;">Apply Illuminatural 6i for dark spots, followed by Kollagen Intensiv for total wrinkle smoothing.</p>
          <a href="${links.kollagen}" class="btn btn-gold btn-sm affiliate-link" data-product="kollagen" target="_blank" rel="noopener noreferrer nofollow sponsored">
            Explore Package Deals <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `;
  }

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
