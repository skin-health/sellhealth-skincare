/**
 * Derm Audit Journal — Skincare Active Conflict & Layering Matrix
 * Script: /tools/conflict-matrix.js
 * 
 * Standards & Invariants:
 * - 100% Client-side vanilla ES6+ (zero external libraries)
 * - Safe DOM instantiation (OWASP compliant: zero dynamic innerHTML injection)
 * - WCAG 2.2 AA compliant contrast, aria attributes, keyboard navigation
 * - Execution speed < 2ms
 */

'use strict';

(function () {
  // =========================================================================
  // 1. INGREDIENT CATALOG (11 Clinical Actives)
  // =========================================================================
  const INGREDIENTS = Object.freeze([
    {
      id: 'l-ascorbic-acid',
      name: 'L-Ascorbic Acid (Pure Vit C)',
      shortName: 'Vitamin C (L-AA)',
      category: 'Direct Antioxidant / Acid',
      icon: 'fa-solid fa-lemon',
      phRange: [2.8, 3.5],
      optimalPh: 3.2,
      timePreference: 'AM',
      irritationWeight: 22,
      vehicle: 'Water-based aqueous solution',
      featuredProduct: null,
      summary: 'Potent collagen-synthesizing antioxidant. Requires low acidic pH (<3.5) for stratum corneum absorption; susceptible to transition-metal oxidation.'
    },
    {
      id: 'syn-coll',
      name: 'Palmitoyl Tripeptide-5 (Syn-Coll®)',
      shortName: 'Syn-Coll® Peptide',
      category: 'Signal Peptide / Collagen Booster',
      icon: 'fa-solid fa-dna',
      phRange: [5.0, 6.5],
      optimalPh: 5.8,
      timePreference: 'AM_PM',
      irritationWeight: 0,
      vehicle: 'Emulsion / Cream serum',
      featuredProduct: 'Kollagen Intensiv™',
      summary: 'Patented TGF-β biomimetic signal peptide engineered to stimulate intrinsic type I and II collagen synthesis. Sensitive to acid hydrolysis.'
    },
    {
      id: 'syn-ake',
      name: 'SYN-AKE® (Dipeptide Derivative)',
      shortName: 'SYN-AKE® Neuropeptide',
      category: 'Neuropeptide / Expression Smoother',
      icon: 'fa-solid fa-wand-magic-sparkles',
      phRange: [5.0, 6.5],
      optimalPh: 5.7,
      timePreference: 'AM_PM',
      irritationWeight: 0,
      vehicle: 'Aqueous serum / Gel',
      featuredProduct: 'Synevra UltraLift™',
      summary: 'Reversible antagonist of muscular nicotinic acetylcholine receptors. Relaxes dynamic facial expression tension; destabilized in low-pH environments.'
    },
    {
      id: 'alpha-arbutin',
      name: 'Alpha-Arbutin (α-Arbutin)',
      shortName: 'Alpha-Arbutin',
      category: 'Melanin Inhibitor / Glycoside',
      icon: 'fa-solid fa-sun',
      phRange: [4.9, 6.5],
      optimalPh: 5.5,
      timePreference: 'AM_PM',
      irritationWeight: 5,
      vehicle: 'Water-based serum',
      featuredProduct: 'Illuminatural 6i™',
      summary: 'Pure hydroquinone glucoside that competitively halts tyrosinase activity. Ether linkage undergoes hydrolysis to free hydroquinone in strong acids.'
    },
    {
      id: 'retinol',
      name: 'Retinol (Vitamin A)',
      shortName: 'Retinol (Vit A)',
      category: 'Retinoid / Cellular Turnover',
      icon: 'fa-solid fa-bolt',
      phRange: [5.5, 6.5],
      optimalPh: 6.0,
      timePreference: 'PM',
      irritationWeight: 38,
      vehicle: 'Lipid suspension / Emulsion',
      featuredProduct: null,
      summary: 'Nuclear retinoic acid receptor agonist that triggers cellular turnover. Photolabile (PM strictly); high barrier desquamation potential.'
    },
    {
      id: 'glycolic-acid',
      name: 'Glycolic Acid (AHA)',
      shortName: 'Glycolic Acid',
      category: 'Alpha Hydroxy Acid / Exfoliant',
      icon: 'fa-solid fa-flask',
      phRange: [3.0, 3.8],
      optimalPh: 3.4,
      timePreference: 'PM',
      irritationWeight: 32,
      vehicle: 'Water-based solution',
      featuredProduct: null,
      summary: 'Smallest molecular alpha-hydroxy acid. Rapidly dissolves corneodesmosomes. Lowers surface pH; causes photosensitivity and high irritation with retinoids.'
    },
    {
      id: 'salicylic-acid',
      name: 'Salicylic Acid (BHA)',
      shortName: 'Salicylic Acid (BHA)',
      category: 'Beta Hydroxy Acid / Keratolytic',
      icon: 'fa-solid fa-microscope',
      phRange: [3.0, 4.0],
      optimalPh: 3.5,
      timePreference: 'PM',
      irritationWeight: 26,
      vehicle: 'Ethanol / Aqueous solution',
      featuredProduct: null,
      summary: 'Lipophilic keratolytic acid that penetrates and clears sebum within follicular units. Potentiates barrier drying if stacked with retinoids.'
    },
    {
      id: 'niacinamide',
      name: 'Niacinamide (Vitamin B3)',
      shortName: 'Niacinamide (B3)',
      category: 'Barrier Repair / Melanosome Blocker',
      icon: 'fa-solid fa-shield-halved',
      phRange: [5.5, 7.0],
      optimalPh: 6.0,
      timePreference: 'AM_PM',
      irritationWeight: 4,
      vehicle: 'Water-based serum',
      featuredProduct: null,
      summary: 'Upregulates epidermal ceramide synthesis, regulates sebum, and blocks melanosome transfer. Extremely versatile; buffers retinoid irritation.'
    },
    {
      id: 'copper-peptides',
      name: 'Copper Tripeptide-1 (GHK-Cu)',
      shortName: 'Copper Peptides',
      category: 'Remodeling Tripeptide / Metal Complex',
      icon: 'fa-solid fa-droplet',
      phRange: [5.5, 7.5],
      optimalPh: 6.5,
      timePreference: 'PM',
      irritationWeight: 6,
      vehicle: 'Aqueous serum',
      featuredProduct: null,
      summary: 'High-affinity copper-coordinated tripeptide for dermal extracellular matrix remodeling. Rapidly inactivated by low-pH acids and direct reducing agents.'
    },
    {
      id: 'azelaic-acid',
      name: 'Azelaic Acid',
      shortName: 'Azelaic Acid',
      category: 'Dicarboxylic Acid / Anti-Inflammatory',
      icon: 'fa-solid fa-bandage',
      phRange: [4.0, 5.5],
      optimalPh: 4.8,
      timePreference: 'AM_PM',
      irritationWeight: 14,
      vehicle: 'Suspension / Light cream',
      featuredProduct: null,
      summary: 'Dicarboxylic acid targeting tyrosinase and Cutibacterium acnes. Stable and well-tolerated, but chelates transition metal ions.'
    },
    {
      id: 'beta-glucan',
      name: 'Beta-Glucan (Symglucan®)',
      shortName: 'Beta-Glucan',
      category: 'Polysaccharide / Barrier Buffer',
      icon: 'fa-solid fa-shield-virus',
      phRange: [4.5, 7.0],
      optimalPh: 5.8,
      timePreference: 'AM_PM',
      irritationWeight: -18,
      vehicle: 'Aqueous gel / Moisture barrier',
      featuredProduct: 'Dermefface FX7®',
      summary: 'High-molecular-weight oat polysaccharide. 20% more hydrating than hyaluronic acid; stimulates macrophage repair and neutralizes irritation.'
    }
  ]);

  // =========================================================================
  // 2. PAIRWISE CONFLICT & SYNERGY RULES MATRIX
  // =========================================================================
  const PAIRWISE_RULES = Object.freeze({
    // L-Ascorbic Acid Pairings
    'copper-peptides|l-ascorbic-acid': {
      severity: 'critical',
      title: 'Redox Oxidation & Free Radical Inactivation',
      mechanism: 'L-Ascorbic Acid acts as an electron donor, rapidly reducing Cu(II) in GHK-Cu to Cu(I). This triggers a Fenton-type redox reaction that turns vitamin C inactive (yellow-brown) while breaking the peptide-metal coordination complex.',
      resolution: 'Strict separation. Apply L-Ascorbic Acid in the AM for antioxidant defense; reserve Copper Peptides for nocturnal PM repair.'
    },
    'l-ascorbic-acid|retinol': {
      severity: 'high',
      title: 'pH Inversion & Conversion Enzyme Inhibition',
      mechanism: 'L-Ascorbic Acid requires an acidic pH (<3.5) for non-ionized cutaneous penetration, whereas retinol conversion enzymes (retinol dehydrogenase) function optimally at pH 5.5–6.5. Layering simultaneously blunts conversion and sparks erythema.',
      resolution: 'AM/PM Split. Apply L-Ascorbic Acid in the AM to bolster SPF protection; apply Retinol strictly in the PM away from sunlight.'
    },
    'glycolic-acid|l-ascorbic-acid': {
      severity: 'high',
      title: 'Acid Mantle Hyper-Acidification',
      mechanism: 'Co-applying two direct low-pH acids (pH 2.8–3.5) drops surface pH far below the skin’s physiological buffer threshold (pH 4.7–5.5), compromising the stratum corneum lipid matrix and triggering neurosensory burning.',
      resolution: 'Split routines. Reserve L-Ascorbic Acid for AM; use Glycolic Acid in the PM on non-retinoid evenings.'
    },
    'l-ascorbic-acid|salicylic-acid': {
      severity: 'high',
      title: 'Cumulative Acid Stripping & Desquamation',
      mechanism: 'Simultaneous application of hydrophilic L-AA and lipophilic BHA causes dual lipid-mantle stripping, precipitating stinging and acute barrier flaking.',
      resolution: 'Use L-AA in the AM; apply Salicylic Acid in the PM or use BHA as a wash-off cleanser.'
    },
    'l-ascorbic-acid|syn-coll': {
      severity: 'high',
      title: 'Acid-Catalyzed Peptide Bond Cleavage',
      mechanism: 'Palmitoyl Tripeptide-5 requires physiological pH 5.0–6.5. Direct exposure to low-pH L-AA (pH < 3.5) risks hydrolyzing the peptide bond before it binds TGF-β receptors.',
      resolution: 'Apply L-AA in the AM; apply Syn-Coll peptide cream (Kollagen Intensiv™) in the PM or wait 20 minutes between serums.'
    },
    'l-ascorbic-acid|syn-ake': {
      severity: 'high',
      title: 'Neuropeptide Denaturation in Low pH',
      mechanism: 'The diaminobutyroyl dipeptide structure of SYN-AKE undergoes conformational hydrolysis in unbuffered acids (pH < 3.5), neutralizing its acetylcholine receptor binding affinity.',
      resolution: 'Apply L-AA in the AM; apply SYN-AKE (Synevra UltraLift™) in the PM or after a 20-minute buffering pause.'
    },
    'alpha-arbutin|l-ascorbic-acid': {
      severity: 'moderate',
      title: 'Glycosidic Ether Hydrolysis Caution',
      mechanism: 'Alpha-arbutin is stable at pH 4.9–6.5. Persistent low-pH aqueous environments (pH < 3.5) can catalyze hydrolytic decomposition into free hydroquinone over time.',
      resolution: 'Allow 15 minutes for L-Ascorbic Acid to absorb before applying Alpha-Arbutin, or use Alpha-Arbutin in the PM.'
    },
    'l-ascorbic-acid|niacinamide': {
      severity: 'moderate',
      title: 'Hydrogen-Bonded Complex & Nicotinic Flush',
      mechanism: 'Direct liquid co-application can form a reversible 1:1 hydrogen-bonded nicotinamide-ascorbate complex. Under high acidity and warmth, trace hydrolysis into nicotinic acid may induce temporary microvascular facial flushing.',
      resolution: 'Apply L-AA first, wait 15 minutes before applying Niacinamide, or separate into AM (L-AA) and PM (Niacinamide).'
    },
    'azelaic-acid|l-ascorbic-acid': {
      severity: 'compatible',
      title: 'Dual Antioxidant & Tyrosinase Suppression',
      mechanism: 'Azelaic acid functions well at mild acidity (pH 4.0–5.5) and does not oxidize ascorbic acid. Highly effective dual-action brightening for stubborn melasma.',
      resolution: 'Layer L-Ascorbic Acid first (thinner water solution), then apply Azelaic Acid suspension.'
    },
    'beta-glucan|l-ascorbic-acid': {
      severity: 'synergistic',
      title: 'Antioxidant Lock & Desensitizing Shield',
      mechanism: 'Beta-glucan forms a protective colloidal mesh that locks in pure ascorbic acid while attenuating low-pH erythema through macrophage IL-10 upregulation.',
      resolution: 'Layer L-AA first; follow immediately with Beta-Glucan (Dermefface FX7®) to seal and hydrate.'
    },

    // Retinol Pairings
    'glycolic-acid|retinol': {
      severity: 'critical',
      title: 'Corneodesmosome Cleavage & Retinoid Dermatitis',
      mechanism: 'Glycolic acid dissolves intercellular desmosomes while retinol accelerates basal cell proliferation. Simultaneous application causes catastrophic barrier collapse, intense peeling, and transepidermal water loss (TEWL).',
      resolution: 'Skin Cycling protocol. Use Glycolic Acid on Night 1 (Exfoliation), Retinol on Night 2, and Hydration/Recovery on Nights 3–4.'
    },
    'retinol|salicylic-acid': {
      severity: 'critical',
      title: 'Intercellular Lipid Depletion & Barrier Hazard',
      mechanism: 'Salicylic acid purges sebum and lipid bilayers, exacerbating the drying and flaking induced by retinoic acid receptor activation.',
      resolution: 'Separate nights via Skin Cycling, or use Salicylic Acid solely as a wash-off cleanser in the morning.'
    },
    'copper-peptides|retinol': {
      severity: 'high',
      title: 'Opposing Remodeling Signaling & Irritation Clash',
      mechanism: 'Retinol triggers rapid epidermal shedding, whereas Copper Peptides orchestrate balanced tissue remodeling. Co-layering frequently provokes chronic micro-stinging and redness.',
      resolution: 'Alternate PM evenings: use Retinol on Night A, Copper Peptides on Night B for nocturnal recovery.'
    },
    'niacinamide|retinol': {
      severity: 'synergistic',
      title: 'Gold-Standard Barrier-Reinforcing Synergy',
      mechanism: 'Niacinamide upregulates ceramide and free fatty acid synthesis. Studies indicate it may reduce retinol-induced peeling without hindering retinoic acid nuclear receptor signaling.',
      resolution: 'Layer Niacinamide either before or alongside Retinol in the PM routine to buffer the barrier.'
    },
    'beta-glucan|retinol': {
      severity: 'synergistic',
      title: 'Macrophage Recovery & Hydration Shield',
      mechanism: 'Beta-glucan provides deep dermal hydration and mitigates retinoid-induced trans-epidermal water loss without interfering with cellular differentiation.',
      resolution: 'Apply Retinol first; seal immediately with Beta-Glucan (Dermefface FX7®) to prevent xerosis.'
    },
    'alpha-arbutin|retinol': {
      severity: 'synergistic',
      title: 'Dual-Pathway Hyperpigmentation Clearance',
      mechanism: 'Alpha-arbutin halts tyrosinase melanin synthesis while retinol accelerates the outward shedding of pigmented keratinocytes.',
      resolution: 'Apply Alpha-Arbutin serum, followed by Retinol at night; always maintain strict daytime SPF 50.'
    },
    'azelaic-acid|retinol': {
      severity: 'moderate',
      title: 'Dual Turnover & Stinging Risk',
      mechanism: 'Both agents increase epidermal remodeling and cell renewal. Combining in reactive or unconditioned skin can induce stinging and dryness.',
      resolution: 'Buffer with a moisturizer, or apply Azelaic Acid in the AM and Retinol in the PM.'
    },
    'retinol|syn-coll': {
      severity: 'synergistic',
      title: 'Comprehensive ECM Architecture Stimulation',
      mechanism: 'Palmitoyl Tripeptide-5 initiates TGF-β collagen synthesis, while retinol regulates collagenase MMP-1 breakdown. Perfect complementary anti-aging harmony.',
      resolution: 'Apply Syn-Coll cream (Kollagen Intensiv™) in the PM immediately following Retinol.'
    },
    'retinol|syn-ake': {
      severity: 'synergistic',
      title: 'Static & Dynamic Wrinkle Neutralization',
      mechanism: 'SYN-AKE attenuates dynamic facial muscle tension, while retinol densifies the dermal matrix to erase static surface creases.',
      resolution: 'Apply SYN-AKE serum (Synevra UltraLift™) to expression areas; follow with Retinol over full face.'
    },

    // Copper Peptides Pairings
    'copper-peptides|glycolic-acid': {
      severity: 'critical',
      title: 'Acid Hydrolysis & Copper Ion Dissociation',
      mechanism: 'Glycolic acid (pH 3.0–3.8) protonates the histidine coordination bonds of GHK-Cu, releasing free unchelated copper and inactivating regenerative signaling.',
      resolution: 'Do not mix. Reserve Copper Peptides for recovery nights; use Glycolic Acid on exfoliation nights.'
    },
    'copper-peptides|salicylic-acid': {
      severity: 'critical',
      title: 'BHA Chelation & Tripeptide Cleavage',
      mechanism: 'Salicylic acid destabilizes copper peptide complexes via competitive chelation at acidic pH, neutralizing peptide efficacy.',
      resolution: 'Strict separation into alternating nights.'
    },
    'azelaic-acid|copper-peptides': {
      severity: 'high',
      title: 'Dicarboxylic Chelation of Cu(II) Ions',
      mechanism: 'Azelaic acid exhibits affinity for divalent metal cations and can strip Cu(II) from the GHK tripeptide skeleton.',
      resolution: 'Separate routines: Azelaic Acid in the AM, Copper Peptides in the PM.'
    },
    'beta-glucan|copper-peptides': {
      severity: 'synergistic',
      title: 'Accelerated Tissue Remodeling & Repair',
      mechanism: 'Beta-glucan stimulates macrophage phagocytosis while GHK-Cu stimulates glycosaminoglycan and collagen synthesis. Ideal for healing and scar recovery.',
      resolution: 'Layer Copper Peptides first, followed by Beta-Glucan (Dermefface FX7®).'
    },
    'copper-peptides|niacinamide': {
      severity: 'synergistic',
      title: 'Barrier Lipid Synthesis & ECM Renewal',
      mechanism: 'Both ingredients operate harmoniously at physiological pH 5.5–6.5. Niacinamide restores ceramides while GHK-Cu repairs deep dermis.',
      resolution: 'Layer in the PM routine in order of texture (thinnest to thickest).'
    },
    'copper-peptides|syn-coll': {
      severity: 'compatible',
      title: 'Dual Peptide Collagen Synthesis',
      mechanism: 'Both peptides share near-neutral pH compatibility and work through distinct, non-competing extracellular matrix synthesis pathways.',
      resolution: 'Compatible in the same PM routine.'
    },
    'copper-peptides|syn-ake': {
      severity: 'compatible',
      title: 'Remodeling & Neuromuscular Relaxation',
      mechanism: 'No biological conflict. SYN-AKE targets acetylcholine receptors, while Copper Peptides orchestrate matrix remodeling at pH 5.5–6.5.',
      resolution: 'Compatible in the same PM routine.'
    },

    // Exfoliating Acids (AHA / BHA) Pairings
    'glycolic-acid|salicylic-acid': {
      severity: 'high',
      title: 'Multi-Acid Over-Exfoliation Hazard',
      mechanism: 'Stacking an alpha-hydroxy acid with a beta-hydroxy acid induces profound desquamation, denaturing stratum corneum enzymes and stripping barrier lipids.',
      resolution: 'Alternate usage: Glycolic Acid for surface texture (Night 1), Salicylic Acid for pore congestion (Night 2).'
    },
    'glycolic-acid|syn-coll': {
      severity: 'high',
      title: 'Acid Hydrolysis of Palmitoyl Tripeptide',
      mechanism: 'Glycolic acid (pH < 3.8) hydrolyzes the amide backbone of Palmitoyl Tripeptide-5, destroying its TGF-β collagen stimulation before it penetrates.',
      resolution: 'Use Glycolic Acid in the PM; reserve Syn-Coll (Kollagen Intensiv™) for AM or non-acid nights.'
    },
    'glycolic-acid|syn-ake': {
      severity: 'high',
      title: 'Acid Denaturation of Neuropeptide',
      mechanism: 'The active diaminobutyroyl chain of SYN-AKE is chemically degraded in strong glycolic acid microenvironments.',
      resolution: 'Separate by 12 hours (AHA at night, SYN-AKE in morning), or alternate evenings.'
    },
    'alpha-arbutin|glycolic-acid': {
      severity: 'moderate',
      title: 'Glycosidic Ether Bond Instability',
      mechanism: 'Low pH accelerates the slow hydrolysis of alpha-arbutin into free hydroquinone. Short-term tolerance is possible, but long-term mixing in solution degrades both.',
      resolution: 'Apply Glycolic Acid, wait 20 minutes for skin pH to normalize, then apply Alpha-Arbutin.'
    },
    'glycolic-acid|niacinamide': {
      severity: 'moderate',
      title: 'Acid-Induced Flushing & Complexation',
      mechanism: 'Drastic pH drop can partially hydrolyze niacinamide into nicotinic acid, inducing transient facial vasodilation in rosacea-prone skin.',
      resolution: 'Separate by 20 minutes, or apply Niacinamide in the AM and Glycolic Acid in the PM.'
    },
    'beta-glucan|glycolic-acid': {
      severity: 'synergistic',
      title: 'Post-Acid Barrier Recovery & Soothing',
      mechanism: 'Beta-glucan dampens acid-induced erythema, hydrating newly revealed corneocytes without reducing keratolytic exfoliation.',
      resolution: 'Apply Glycolic Acid; wait 15 minutes; follow with Beta-Glucan (Dermefface FX7®).'
    },
    'salicylic-acid|syn-coll': {
      severity: 'high',
      title: 'Lipophilic Penetration & Peptide Disruption',
      mechanism: 'Low pH of BHA destabilizes Palmitoyl Tripeptide-5 in topical emulsions.',
      resolution: 'Use BHA in PM; use Syn-Coll (Kollagen Intensiv™) in AM or on alternate nights.'
    },
    'salicylic-acid|syn-ake': {
      severity: 'high',
      title: 'Low-pH Neuropeptide Degradation',
      mechanism: 'SYN-AKE dipeptide loses stability when layered beneath leave-on salicylic acid solutions.',
      resolution: 'Separate routines: SYN-AKE (Synevra UltraLift™) in AM; BHA in PM.'
    },
    'niacinamide|salicylic-acid': {
      severity: 'synergistic',
      title: 'Pore Clarifying & Sebum Normalizing Duo',
      mechanism: 'Salicylic acid cleanses follicular pores of sebum while Niacinamide reduces sebum excretion rate and fortifies the barrier.',
      resolution: 'Apply Salicylic Acid first, wait 10 minutes, and layer Niacinamide.'
    },
    'beta-glucan|salicylic-acid': {
      severity: 'synergistic',
      title: 'Hydration Cushion for BHA Keratolysis',
      mechanism: 'Beta-glucan prevents the flaking and tightness characteristic of salicylic acid treatments.',
      resolution: 'Layer Beta-Glucan immediately following BHA absorption.'
    },

    // Peptides & Synergistic Botanical Pairings
    'syn-ake|syn-coll': {
      severity: 'synergistic',
      title: 'Dual Architectural & Neuropeptide Synergy',
      mechanism: 'Syn-Coll (TGF-β mimic) boosts structural collagen I & II synthesis, while SYN-AKE inhibits muscle micro-contractions. Comprehensive anti-aging alignment at pH 5.5–6.0.',
      resolution: 'Highly recommended routine: Apply SYN-AKE serum, followed by Syn-Coll cream (Kollagen Intensiv™).'
    },
    'alpha-arbutin|niacinamide': {
      severity: 'synergistic',
      title: 'Dual-Pathway Pigment Interception',
      mechanism: 'Alpha-arbutin directly halts tyrosinase catalytic action; Niacinamide stops melanosome transfer from melanocytes to keratinocytes. Maximizes hyperpigmentation clearance.',
      resolution: 'Layer together morning or evening; optimal for dark spots and melasma.'
    },
    'alpha-arbutin|syn-coll': {
      severity: 'synergistic',
      title: 'Collagen Density & Radiance Harmony',
      mechanism: 'No biological conflict. Alpha-Arbutin evens tone while Syn-Coll restores dermis elasticity.',
      resolution: 'Combine in morning or evening routines.'
    },
    'azelaic-acid|niacinamide': {
      severity: 'synergistic',
      title: 'Anti-Redness & Blemish Calming Powerhouse',
      mechanism: 'Azelaic acid suppresses Cutibacterium acnes and redness, while Niacinamide strengthens barrier lipid lamellae and calms cytokine cascades.',
      resolution: 'Apply Niacinamide serum first, followed by Azelaic Acid cream.'
    },
    'beta-glucan|syn-coll': {
      severity: 'synergistic',
      title: 'Fibroblast Proliferation & ECM Remodeling',
      mechanism: 'Beta-glucan accelerates macrophage-mediated wound healing while Syn-Coll stimulates baseline pro-collagen mRNA transcription.',
      resolution: 'Ideal restorative pairing: combine morning or night.'
    },
    'beta-glucan|niacinamide': {
      severity: 'synergistic',
      title: 'Intensive Skin Barrier Fortification',
      mechanism: 'Niacinamide promotes endogenous ceramide synthesis; Beta-glucan forms a protective water-binding matrix over the stratum corneum.',
      resolution: 'Universal barrier restorative. Safe for all skin types.'
    }
  });

  // Presets Database
  const PRESETS = Object.freeze({
    'anti-aging': ['syn-coll', 'syn-ake', 'retinol', 'niacinamide'],
    'brightening': ['l-ascorbic-acid', 'alpha-arbutin', 'niacinamide', 'azelaic-acid'],
    'barrier-safe': ['syn-coll', 'niacinamide', 'beta-glucan', 'alpha-arbutin'],
    'high-risk': ['l-ascorbic-acid', 'retinol', 'glycolic-acid', 'copper-peptides']
  });

  // =========================================================================
  // 2B. MULTILINGUAL I18N DICTIONARY lives in tools/i18n/<lang>.js (ES, DE, FR).
  // Read-only hook for routine-planner.js (Phase D). Explicit rules only, no pH fallback.
  window.DERM_ROUTINE_RULES = Object.freeze({
    ids: Object.freeze(INGREDIENTS.map(function (x) { return x.id; })),
    name: function (id, lang) {
      const loc = I18N[lang] && I18N[lang].ingredients && I18N[lang].ingredients[id];
      const base = INGREDIENTS.find(function (x) { return x.id === id; });
      return loc ? loc.shortName : (base ? base.shortName : id);
    },
    rule: function (idA, idB, lang) {
      const key = [idA, idB].sort().join('|');
      const rule = PAIRWISE_RULES[key];
      if (!rule) { return null; }
      const loc = I18N[lang] && I18N[lang].rules && I18N[lang].rules[key];
      return loc ? Object.assign({}, rule, loc) : rule;
    }
  });

  // Each file sets window.DERM_I18N.<lang>. The English page loads none of them,
  // so I18N is empty there and every guarded read falls back to English.
  // =========================================================================
  const I18N = Object.freeze(Object.assign({}, window.DERM_I18N || {}));

  // =========================================================================
  // 3. SAFE DOM BUILDER UTILITIES (Zero innerHTML Injection)
  // =========================================================================
  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [key, val] of Object.entries(attrs)) {
      if (key === 'className') {
        node.className = val;
      } else if (key === 'textContent') {
        node.textContent = val;
      } else if (key.startsWith('on') && typeof val === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), val);
      } else if (val !== null && val !== undefined) {
        node.setAttribute(key, String(val));
      }
    }
    for (const child of children) {
      if (typeof child === 'string' || typeof child === 'number') {
        node.appendChild(document.createTextNode(String(child)));
      } else if (child instanceof Node) {
        node.appendChild(child);
      }
    }
    return node;
  }

  function icon(iconClass) {
    const i = document.createElement('i');
    i.className = iconClass;
    i.setAttribute('aria-hidden', 'true');
    return i;
  }

  // =========================================================================
  // 4. MATRIX EVALUATION ENGINE (Core Logic)
  // =========================================================================
  class ConflictEngine {
    constructor(lang = 'en') {
      this.selectedActives = new Set();
      this.lang = (lang || 'en').toLowerCase().slice(0, 2);
    }

    toggleActive(id) {
      if (this.selectedActives.has(id)) {
        this.selectedActives.delete(id);
        return true;
      }
      if (this.selectedActives.size >= 6) {
        return false; // Max limit reached
      }
      this.selectedActives.add(id);
      return true;
    }

    clear() {
      this.selectedActives.clear();
    }

    setPreset(presetKey) {
      const list = PRESETS[presetKey];
      if (!list) return;
      this.selectedActives.clear();
      list.forEach(id => this.selectedActives.add(id));
    }

    getActivesList() {
      return Array.from(this.selectedActives).map(id => {
        const item = INGREDIENTS.find(x => x.id === id);
        if (!item) return null;
        const loc = I18N[this.lang] && I18N[this.lang].ingredients && I18N[this.lang].ingredients[id];
        return loc ? Object.assign({}, item, loc) : item;
      }).filter(Boolean);
    }

    getPairKey(idA, idB) {
      return [idA, idB].sort().join('|');
    }

    getPairRule(idA, idB) {
      const key = this.getPairKey(idA, idB);
      let rule = PAIRWISE_RULES[key];
      if (rule) {
        const loc = I18N[this.lang] && I18N[this.lang].rules && I18N[this.lang].rules[key];
        return loc ? Object.assign({}, rule, loc) : rule;
      }
      // Default rule based on pH delta
      const a = INGREDIENTS.find(x => x.id === idA);
      const b = INGREDIENTS.find(x => x.id === idB);
      if (!a || !b) return null;

      const locA = I18N[this.lang] && I18N[this.lang].ingredients && I18N[this.lang].ingredients[a.id];
      const locB = I18N[this.lang] && I18N[this.lang].ingredients && I18N[this.lang].ingredients[b.id];
      const nameA = locA ? locA.shortName : a.shortName;
      const nameB = locB ? locB.shortName : b.shortName;

      const uiDefs = I18N[this.lang] && I18N[this.lang].ui && I18N[this.lang].ui.defaultRules;
      const phDelta = Math.abs(a.optimalPh - b.optimalPh);
      if (phDelta > 2.2) {
        return {
          severity: 'high',
          title: (uiDefs && uiDefs.highTitle) || 'pH Microenvironment Divergence',
          mechanism: (uiDefs && uiDefs.highMech)
            ? uiDefs.highMech.replace('{a}', nameA).replace('{pa}', a.optimalPh).replace('{b}', nameB).replace('{pb}', b.optimalPh)
            : `Optimal pH ranges diverge substantially (${nameA} at pH ${a.optimalPh} vs ${nameB} at pH ${b.optimalPh}). Stacking causes neutralization or poor bioavailability.`,
          resolution: (uiDefs && uiDefs.highRes) || 'Separate into morning and evening routines, or space by 20 minutes.'
        };
      }
      if (phDelta > 1.2) {
        return {
          severity: 'moderate',
          title: (uiDefs && uiDefs.modTitle) || 'Moderate pH Range Separation',
          mechanism: (uiDefs && uiDefs.modMech) || 'Slight difference in formula ionization. Layering directly may cause mild stinging in reactive skin types.',
          resolution: (uiDefs && uiDefs.modRes) || 'Apply thinnest texture first, allow to dry completely before second layer.'
        };
      }
      return {
        severity: 'compatible',
        title: (uiDefs && uiDefs.compTitle) || 'Physiological pH Harmony',
        mechanism: (uiDefs && uiDefs.compMech) || 'Both ingredients maintain compatible ionization curves and physiological pH stability without direct molecular clashes.',
        resolution: (uiDefs && uiDefs.compRes) || 'Safe to layer consecutively in the same routine window.'
      };
    }

    analyze() {
      const actives = this.getActivesList();
      const count = actives.length;

      if (count < 2) {
        return { count, ready: false };
      }

      // 1. Calculate All Pairwise Collisions
      const pairs = [];
      let criticalCount = 0;
      let highCount = 0;
      let moderateCount = 0;
      let synergisticCount = 0;

      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const rule = this.getPairRule(actives[i].id, actives[j].id);
          pairs.push({
            activeA: actives[i],
            activeB: actives[j],
            rule: rule
          });

          if (rule.severity === 'critical') criticalCount++;
          else if (rule.severity === 'high') highCount++;
          else if (rule.severity === 'moderate') moderateCount++;
          else if (rule.severity === 'synergistic') synergisticCount++;
        }
      }

      // 2. pH Compatibility Index (0 - 100%)
      let phPenalty = 0;
      pairs.forEach(p => {
        const delta = Math.abs(p.activeA.optimalPh - p.activeB.optimalPh);
        if (delta > 2.0) phPenalty += 24;
        else if (delta > 1.2) phPenalty += 12;
        if (p.rule.severity === 'critical') phPenalty += 20;
      });
      const phScore = Math.max(10, Math.min(100, Math.round(100 - (phPenalty / pairs.length) * 1.5)));

      // 3. Deactivation & Oxidation Risk
      let deactivationRisk = 'Low';
      let deactivationColor = 'var(--color-success)';
      let deactivationDesc = 'Minimal molecular collision risks. Actives preserve biochemical potency.';

      if (criticalCount > 0) {
        deactivationRisk = 'Critical';
        deactivationColor = 'var(--color-danger)';
        deactivationDesc = 'Direct chemical neutralization, Fenton redox oxidation, or peptide bond cleavage detected.';
      } else if (highCount > 0) {
        deactivationRisk = 'High';
        deactivationColor = '#FB923C';
        deactivationDesc = 'Significant pH clash or competing enzymatic pathways. Separation required.';
      } else if (moderateCount > 0) {
        deactivationRisk = 'Moderate';
        deactivationColor = 'var(--color-warning)';
        deactivationDesc = 'Minor temporary complexation or sensitivity flushing risk. Staggering advised.';
      }

      // 4. Epidermal Barrier Overload Score (0 - 100)
      let rawIrritation = 0;
      let harshCount = 0;

      actives.forEach(act => {
        rawIrritation += act.irritationWeight;
        if (act.irritationWeight >= 20) harshCount++;
      });

      // Stacking penalty multiplier
      if (harshCount >= 2) rawIrritation = Math.round(rawIrritation * 1.3);
      if (harshCount >= 3) rawIrritation = Math.round(rawIrritation * 1.6);

      const barrierScore = Math.max(5, Math.min(100, rawIrritation));
      let barrierStatus = 'Optimal Stability';
      let barrierColor = 'var(--color-success)';
      let barrierDesc = 'Stratum corneum lipid integrity maintained. Negligible TEWL risk.';

      if (barrierScore > 75) {
        barrierStatus = 'Critical Barrier Hazard';
        barrierColor = 'var(--color-danger)';
        barrierDesc = 'Acute stratum corneum breakdown, micro-tearing, and severe retinoid/acid dermatitis hazard.';
      } else if (barrierScore > 50) {
        barrierStatus = 'High Overload';
        barrierColor = '#FB923C';
        barrierDesc = 'Substantial keratolytic load. High risk of stinging, erythema, and compromised acid mantle.';
      } else if (barrierScore > 28) {
        barrierStatus = 'Moderate Load';
        barrierColor = 'var(--color-warning)';
        barrierDesc = 'Tolerable in acclimated skin. Requires moisturizing buffers and gradual introduction.';
      }

      // 5. Generate Routine Separation Schedule
      const schedule = this.buildSchedule(actives, pairs);

      return {
        ready: true,
        actives,
        pairs,
        phScore,
        deactivationRisk,
        deactivationColor,
        deactivationDesc,
        barrierScore,
        barrierStatus,
        barrierColor,
        barrierDesc,
        criticalCount,
        highCount,
        moderateCount,
        synergisticCount,
        schedule
      };
    }

    buildSchedule(actives, pairs) {
      const amSteps = [];
      const pmSteps = [];
      let needsCycling = false;
      const pmPotent = [];

      // Sort actives by texture & pH
      const sorted = [...actives].sort((a, b) => a.optimalPh - b.optimalPh);

      sorted.forEach(act => {
        if (act.timePreference === 'AM') {
          amSteps.push(act);
        } else if (act.timePreference === 'PM') {
          pmSteps.push(act);
          if (act.irritationWeight >= 25 || act.id === 'copper-peptides') {
            pmPotent.push(act);
          }
        } else {
          // Flexible active: allocate where most balanced
          if (act.id === 'beta-glucan' || act.id === 'niacinamide') {
            amSteps.push(act);
            pmSteps.push(act);
          } else if (amSteps.length <= pmSteps.length) {
            amSteps.push(act);
          } else {
            pmSteps.push(act);
          }
        }
      });

      // Check if nocturnal skin cycling is needed
      if (pmPotent.length >= 2) {
        needsCycling = true;
      }

      return {
        amSteps,
        pmSteps,
        needsCycling,
        pmPotent
      };
    }
  }

  // =========================================================================
  // 5. UI CONTROLLER & VIEW RENDERER
  // =========================================================================
  class MatrixApp {
    constructor() {
      const docLang = (document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
      this.lang = ['es', 'de', 'fr'].includes(docLang) ? docLang : 'en';
      this.engine = new ConflictEngine(this.lang);
      this.gridEl = document.getElementById('activesGrid');
      this.resultsMount = document.getElementById('resultsMount');
      this.counterEl = document.getElementById('selectionCounter');
      this.resetBtn = document.getElementById('resetBtn');

      this.init();
    }

    init() {
      this.renderGrid();
      this.bindEvents();
      this.parseUrlParams();
      this.updateView();
    }

    parseUrlParams() {
      try {
        const params = new URLSearchParams(window.location.search);
        const activesParam = params.get('actives');
        if (activesParam) {
          const list = activesParam.split(',').map(s => s.trim().toLowerCase());
          list.slice(0, 6).forEach(id => {
            if (INGREDIENTS.some(i => i.id === id)) {
              this.engine.selectedActives.add(id);
            }
          });
        }
      } catch (e) {
        // Fallback gracefully on query param parsing error
      }
    }

    syncUrlParams() {
      try {
        const arr = Array.from(this.engine.selectedActives);
        const url = new URL(window.location);
        if (arr.length > 0) {
          url.searchParams.set('actives', arr.join(','));
        } else {
          url.searchParams.delete('actives');
        }
        window.history.replaceState({}, '', url.toString());
      } catch (e) {
        // Ignore History API restrictions in isolated sandbox
      }
    }

    renderGrid() {
      const fragment = document.createDocumentFragment();

      INGREDIENTS.forEach(baseItem => {
        const loc = I18N[this.lang] && I18N[this.lang].ingredients && I18N[this.lang].ingredients[baseItem.id];
        const item = loc ? Object.assign({}, baseItem, loc) : baseItem;

        const phTagText = `pH ${item.phRange[0]}–${item.phRange[1]}`;
        const timeTagText = item.timePreference.replace('_', ' / ');

        const card = el('div', {
          className: 'active-card',
          id: `card-${item.id}`,
          role: 'button',
          tabindex: '0',
          'aria-pressed': 'false'
        });

        // Card Top
        const top = el('div', { className: 'active-card-top' }, [
          el('div', { className: 'active-icon' }, [icon(item.icon)]),
          el('div', { className: 'active-check' }, [icon('fa-solid fa-check')])
        ]);

        // Card Body
        const body = el('div', {}, [
          el('div', { className: 'active-name', textContent: item.name }),
          el('div', { className: 'active-category', textContent: item.category })
        ]);

        // Card Meta Tags
        const meta = el('div', { className: 'active-meta' }, [
          el('span', { className: 'active-tag', textContent: phTagText }),
          el('span', { className: 'active-tag', textContent: timeTagText })
        ]);

        if (item.featuredProduct) {
          meta.appendChild(el('span', {
            className: 'active-tag active-tag-brand',
            textContent: item.featuredProduct
          }));
        }

        card.appendChild(top);
        card.appendChild(body);
        card.appendChild(meta);

        // Click & Keyboard Handler
        const handleToggle = () => {
          const success = this.engine.toggleActive(item.id);
          if (!success) {
            this.flashLimitNotice();
          } else {
            this.syncUrlParams();
            this.updateView();
          }
        };

        card.addEventListener('click', handleToggle);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        });

        fragment.appendChild(card);
      });

      this.gridEl.textContent = '';
      this.gridEl.appendChild(fragment);
    }

    flashLimitNotice() {
      const ui = I18N[this.lang] && I18N[this.lang].ui && I18N[this.lang].ui.counter;
      this.counterEl.classList.add('max');
      this.counterEl.textContent = '';
      this.counterEl.appendChild(icon('fa-solid fa-triangle-exclamation'));
      this.counterEl.appendChild(document.createTextNode(ui ? ui.limitNotice : ' Maximum limit of 6 actives reached'));
      setTimeout(() => {
        this.updateCounterText();
      }, 2000);
    }

    bindEvents() {
      // Preset Buttons
      document.querySelectorAll('.preset-btn[data-preset]').forEach(btn => {
        btn.addEventListener('click', () => {
          const preset = btn.getAttribute('data-preset');
          this.engine.setPreset(preset);
          this.syncUrlParams();
          this.updateView();
        });
      });

      // Reset Button
      if (this.resetBtn) {
        this.resetBtn.addEventListener('click', () => {
          this.engine.clear();
          this.syncUrlParams();
          this.updateView();
        });
      }
    }

    updateCounterText() {
      const count = this.engine.selectedActives.size;
      const ui = I18N[this.lang] && I18N[this.lang].ui && I18N[this.lang].ui.counter;
      this.counterEl.className = 'tool-counter-badge';
      this.counterEl.textContent = '';

      if (count === 0) {
        this.counterEl.appendChild(icon('fa-solid fa-layer-group'));
        this.counterEl.appendChild(document.createTextNode(ui ? ui.empty : ' Selected: 0 of 6 (Choose at least 2)'));
      } else if (count === 1) {
        this.counterEl.appendChild(icon('fa-solid fa-layer-group'));
        this.counterEl.appendChild(document.createTextNode(ui ? ui.one : ' Selected: 1 of 6 (Choose 1 more active)'));
      } else if (count === 6) {
        this.counterEl.classList.add('max');
        this.counterEl.appendChild(icon('fa-solid fa-circle-check'));
        this.counterEl.appendChild(document.createTextNode(ui ? ui.max : ' Selected: 6 of 6 (Maximum capacity)'));
      } else {
        this.counterEl.classList.add('valid');
        this.counterEl.appendChild(icon('fa-solid fa-circle-check'));
        const text = (ui ? ui.valid : ' Selected: {count} of 6 (Ready for analysis)').replace('{count}', count);
        this.counterEl.appendChild(document.createTextNode(text));
      }
    }

    updateView() {
      const count = this.engine.selectedActives.size;

      // Update Active Card States
      INGREDIENTS.forEach(item => {
        const card = document.getElementById(`card-${item.id}`);
        if (!card) return;

        const isSelected = this.engine.selectedActives.has(item.id);
        card.classList.toggle('selected', isSelected);
        card.setAttribute('aria-pressed', isSelected ? 'true' : 'false');

        if (!isSelected && count >= 6) {
          card.classList.add('disabled');
        } else {
          card.classList.remove('disabled');
        }
      });

      this.updateCounterText();
      this.renderDiagnostics();
    }

    renderDiagnostics() {
      const analysis = this.engine.analyze();
      this.resultsMount.textContent = '';

      if (!analysis.ready) {
        this.resultsMount.appendChild(this.buildEmptyState(analysis.count));
        return;
      }

      const fragment = document.createDocumentFragment();

      // 1. Executive Metrics Row
      fragment.appendChild(this.buildMetricsRow(analysis));

      // 2. Collision Matrix Table
      fragment.appendChild(this.buildMatrixTable(analysis));

      // 3. AM / PM Schedule
      fragment.appendChild(this.buildScheduleSection(analysis));

      // 4. Clinical Mechanism Accordion
      fragment.appendChild(this.buildMechanismList(analysis));

      this.resultsMount.appendChild(fragment);
    }

    buildEmptyState(count) {
      const ui = I18N[this.lang] && I18N[this.lang].ui && I18N[this.lang].ui.emptyState;
      const card = el('div', { className: 'empty-state-card' });
      const ico = el('div', { className: 'empty-state-icon' }, [icon('fa-solid fa-flask')]);
      const title = el('h3', {
        textContent: count === 0
          ? (ui ? ui.zeroTitle : 'Select 2 to 6 Actives Above to Begin Analysis')
          : (ui ? ui.oneTitle : 'Select At Least 1 More Active Ingredient')
      });
      const desc = el('p', {
        textContent: count === 0
          ? (ui ? ui.zeroDesc : 'Choose active ingredients from the curated grid or click a clinical preset to compute pH stability, deactivation risks, and AM/PM layering.')
          : (ui ? ui.oneDesc : 'The conflict matrix evaluates pairwise interactions. Add another ingredient to evaluate biochemical compatibility.')
      });

      card.appendChild(ico);
      card.appendChild(title);
      card.appendChild(desc);
      return card;
    }

    buildMetricsRow(analysis) {
      const ui = I18N[this.lang] && I18N[this.lang].ui && I18N[this.lang].ui.metrics;
      const grid = el('div', { className: 'metrics-grid' });

      // pH Compatibility Metric
      const phCard = el('div', { className: 'metric-card' }, [
        el('div', { className: 'metric-title' }, [icon('fa-solid fa-scale-balanced'), document.createTextNode(ui ? ui.phTitle : ' pH Compatibility')]),
        el('div', {
          className: 'metric-value',
          style: `color: ${analysis.phScore > 75 ? 'var(--color-success)' : analysis.phScore > 50 ? 'var(--color-warning)' : 'var(--color-danger)'};`,
          textContent: `${analysis.phScore}%`
        }),
        el('div', { className: 'metric-bar-wrap' }, [
          el('div', {
            className: 'metric-bar-fill',
            style: `width: ${analysis.phScore}%; background-color: ${analysis.phScore > 75 ? 'var(--color-success)' : analysis.phScore > 50 ? 'var(--color-warning)' : 'var(--color-danger)'};`
          })
        ]),
        el('div', { className: 'metric-desc', textContent: analysis.phScore > 75 ? (ui ? ui.phFavorable : 'Ionization curves align favorably for skin delivery.') : (ui ? ui.phClash : 'Significant pH divergence. Separation mandatory.') })
      ]);

      // Deactivation Risk Metric
      let deactRiskLabel = analysis.deactivationRisk;
      let deactDesc = analysis.deactivationDesc;
      if (ui) {
        if (analysis.deactivationRisk === 'Low') {
          deactRiskLabel = ui.riskLow || deactRiskLabel;
          deactDesc = ui.deactDescLow || deactDesc;
        } else if (analysis.deactivationRisk === 'Moderate') {
          deactRiskLabel = ui.riskMod || deactRiskLabel;
          deactDesc = ui.deactDescMod || deactDesc;
        } else if (analysis.deactivationRisk === 'High') {
          deactRiskLabel = ui.riskHigh || deactRiskLabel;
          deactDesc = ui.deactDescHigh || deactDesc;
        } else if (analysis.deactivationRisk === 'Critical') {
          deactRiskLabel = ui.riskCrit || deactRiskLabel;
          deactDesc = ui.deactDescCrit || deactDesc;
        }
      }

      const deactCard = el('div', { className: 'metric-card' }, [
        el('div', { className: 'metric-title' }, [icon('fa-solid fa-triangle-exclamation'), document.createTextNode(ui ? ui.deactTitle : ' Deactivation Risk')]),
        el('div', {
          className: 'metric-value',
          style: `color: ${analysis.deactivationColor};`,
          textContent: deactRiskLabel
        }),
        el('div', { className: 'metric-desc', style: 'margin-top: 1.25rem;', textContent: deactDesc })
      ]);

      // Barrier Overload Metric
      let barrierStatusLabel = analysis.barrierStatus;
      let barrierDesc = analysis.barrierDesc;
      if (ui) {
        if (analysis.barrierStatus === 'Optimal Stability') {
          barrierStatusLabel = ui.barrierOpt || barrierStatusLabel;
          barrierDesc = ui.barrierDescOpt || barrierDesc;
        } else if (analysis.barrierStatus === 'Moderate Load') {
          barrierStatusLabel = ui.barrierMod || barrierStatusLabel;
          barrierDesc = ui.barrierDescMod || barrierDesc;
        } else if (analysis.barrierStatus === 'High Overload') {
          barrierStatusLabel = ui.barrierHigh || barrierStatusLabel;
          barrierDesc = ui.barrierDescHigh || barrierDesc;
        } else if (analysis.barrierStatus === 'Critical Barrier Hazard') {
          barrierStatusLabel = ui.barrierCrit || barrierStatusLabel;
          barrierDesc = ui.barrierDescCrit || barrierDesc;
        }
      }

      const barrierCard = el('div', { className: 'metric-card' }, [
        el('div', { className: 'metric-title' }, [icon('fa-solid fa-shield-halved'), document.createTextNode(ui ? ui.barrierTitle : ' Barrier Overload')]),
        el('div', {
          className: 'metric-value',
          style: `color: ${analysis.barrierColor};`,
          textContent: `${analysis.barrierScore}/100`
        }),
        el('div', { className: 'metric-bar-wrap' }, [
          el('div', {
            className: 'metric-bar-fill',
            style: `width: ${analysis.barrierScore}%; background-color: ${analysis.barrierColor};`
          })
        ]),
        el('div', { className: 'metric-desc', textContent: `${barrierStatusLabel} — ${barrierDesc}` })
      ]);

      grid.appendChild(phCard);
      grid.appendChild(deactCard);
      grid.appendChild(barrierCard);
      return grid;
    }

    buildMatrixTable(analysis) {
      const ui = I18N[this.lang] && I18N[this.lang].ui && I18N[this.lang].ui.matrix;
      const wrap = el('div', { className: 'matrix-card-wrap' });

      // Header & Legend
      const header = el('div', { className: 'matrix-card-header' }, [
        el('h3', { textContent: (ui && ui.title) || 'Pairwise Compatibility Matrix' }),
        el('div', { className: 'matrix-legend' }, [
          el('div', { className: 'legend-item' }, [
            el('span', { className: 'legend-dot', style: 'background: var(--color-success);' }),
            document.createTextNode((ui && ui.legendComp) || ' Compatible / Synergistic')
          ]),
          el('div', { className: 'legend-item' }, [
            el('span', { className: 'legend-dot', style: 'background: var(--color-warning);' }),
            document.createTextNode((ui && ui.legendBuffer) || ' Timing Buffer Required')
          ]),
          el('div', { className: 'legend-item' }, [
            el('span', { className: 'legend-dot', style: 'background: var(--color-danger);' }),
            document.createTextNode((ui && ui.legendConflict) || ' Conflict / Do Not Mix')
          ])
        ])
      ]);

      const tableWrap = el('div', { className: 'table-responsive' });
      const table = el('table', { className: 'collision-table' });

      // Thead
      const thead = el('thead');
      const headerRow = el('tr', {}, [el('th', { textContent: (ui && ui.activeCol) || 'Active' })]);
      analysis.actives.forEach(act => {
        headerRow.appendChild(el('th', { textContent: act.shortName }));
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Tbody
      const tbody = el('tbody');
      analysis.actives.forEach((rowAct) => {
        const row = el('tr', {}, [el('th', { textContent: rowAct.shortName })]);

        analysis.actives.forEach((colAct) => {
          if (rowAct.id === colAct.id) {
            row.appendChild(el('td', { className: 'self-cell', textContent: '—', 'data-label': colAct.shortName }));
          } else {
            const rule = this.engine.getPairRule(rowAct.id, colAct.id);
            const statusClass = `status-${rule.severity}`;
            let pillText = rule.severity === 'critical' ? 'Conflict' : rule.severity;
            if (ui && ui.pills && ui.pills[rule.severity]) {
              pillText = ui.pills[rule.severity];
            }
            const pill = el('span', {
              className: `status-pill ${statusClass}`,
              textContent: pillText
            });
            row.appendChild(el('td', { 'data-label': colAct.shortName }, [pill]));
          }
        });

        tbody.appendChild(row);
      });
      table.appendChild(tbody);

      // Explicit ARIA roles keep table meaning after the <= 600px card layout (display: block).
      table.setAttribute('role', 'table');
      table.querySelectorAll('tr').forEach(tr => tr.setAttribute('role', 'row'));
      table.querySelectorAll('thead th').forEach(th => th.setAttribute('role', 'columnheader'));
      table.querySelectorAll('tbody th').forEach(th => th.setAttribute('role', 'rowheader'));
      table.querySelectorAll('tbody td').forEach(td => td.setAttribute('role', 'cell'));
      tableWrap.appendChild(table);

      wrap.appendChild(header);
      wrap.appendChild(tableWrap);
      return wrap;
    }

    buildScheduleSection(analysis) {
      const ui = I18N[this.lang] && I18N[this.lang].ui && I18N[this.lang].ui.schedule;
      const container = el('div');
      const grid = el('div', { className: 'schedule-grid' });

      // AM Schedule Card
      const amCard = el('div', { className: 'schedule-card' }, [
        el('div', { className: 'schedule-header' }, [
          icon('fa-solid fa-sun'),
          el('h3', { textContent: (ui && ui.amTitle) || 'Morning Protocol (AM Routine)' })
        ])
      ]);

      const amList = el('ul', { className: 'step-list' });
      amList.appendChild(this.buildStepItem(1, (ui && ui.amStep1Title) || 'Gentle Hydrating Cleanser', (ui && ui.amStep1Desc) || 'Wash away nocturnal sebum without stripping the moisture barrier.', null));

      let amStepNum = 2;
      analysis.schedule.amSteps.forEach(act => {
        const wait = act.phRange[1] < 4.0 ? ((ui && ui.waitAcidAM) || 'Wait 15–20 min before next step') : null;
        amList.appendChild(this.buildStepItem(
          amStepNum++,
          `${act.name} (${act.vehicle})`,
          act.summary,
          wait
        ));
      });

      amList.appendChild(this.buildStepItem(amStepNum, (ui && ui.amFinalTitle) || 'Broad-Spectrum SPF 50+', (ui && ui.amFinalDesc) || 'Non-negotiable final step to prevent UV photolysis and active oxidation.', null));
      amCard.appendChild(amList);

      // PM Schedule Card
      const pmCard = el('div', { className: 'schedule-card' }, [
        el('div', { className: 'schedule-header' }, [
          icon('fa-solid fa-clock'),
          el('h3', { textContent: (ui && ui.pmTitle) || 'Evening Protocol (PM Routine)' })
        ])
      ]);

      const pmList = el('ul', { className: 'step-list' });
      pmList.appendChild(this.buildStepItem(1, (ui && ui.pmStep1Title) || 'Double Cleanse (Balm + Gentle Wash)', (ui && ui.pmStep1Desc) || 'Purge sunscreen, pollutants, and sebum to ensure active penetration.', null));

      let pmStepNum = 2;
      analysis.schedule.pmSteps.forEach(act => {
        const wait = act.phRange[1] < 4.0 ? ((ui && ui.waitAcidPM) || 'Allow 15 min for acid mantle buffering') : null;
        pmList.appendChild(this.buildStepItem(
          pmStepNum++,
          `${act.name} (${act.vehicle})`,
          act.summary,
          wait
        ));
      });

      pmList.appendChild(this.buildStepItem(pmStepNum, (ui && ui.pmFinalTitle) || 'Ceramide / Lipid Barrier Cream', (ui && ui.pmFinalDesc) || 'Seal stratum corneum with physiological lipids to mitigate nocturnal TEWL.', null));
      pmCard.appendChild(pmList);

      grid.appendChild(amCard);
      grid.appendChild(pmCard);
      container.appendChild(grid);

      // Alternating Skin Cycling Card (if conflicting potent PM actives exist)
      if (analysis.schedule.needsCycling) {
        container.appendChild(this.buildCyclingCard(analysis.schedule.pmPotent));
      }

      return container;
    }

    buildStepItem(num, title, desc, waitText) {
      const li = el('li', { className: 'step-item' }, [
        el('div', { className: 'step-num', textContent: String(num) })
      ]);

      const content = el('div', { className: 'step-content' }, [
        el('h4', { textContent: title }),
        el('p', { textContent: desc })
      ]);

      if (waitText) {
        content.appendChild(el('div', { className: 'step-wait' }, [
          icon('fa-solid fa-hourglass-half'),
          document.createTextNode(` ${waitText}`)
        ]));
      }

      li.appendChild(content);
      return li;
    }

    buildCyclingCard(pmPotent) {
      const ui = I18N[this.lang] && I18N[this.lang].ui && I18N[this.lang].ui.cycling;
      const card = el('div', { className: 'cycling-card' }, [
        el('div', { className: 'cycling-title' }, [
          icon('fa-solid fa-rotate-left'),
          el('h4', { style: 'margin:0;', textContent: (ui && ui.title) || 'Clinical Skin Cycling Protocol Recommended' })
        ]),
        el('p', {
          style: 'color: var(--color-muted); font-size: 0.88rem; line-height: 1.5;',
          textContent: (ui && ui.intro) || 'Multiple high-potency nocturnal actives were detected in your selection. Applying these together on the same night induces cumulative barrier breakdown. Implement this 3-night rotational cycle:'
        })
      ]);

      const grid = el('div', { className: 'cycling-grid' });

      // Night 1
      grid.appendChild(el('div', { className: 'cycling-day' }, [
        el('h5', { textContent: (ui && ui.night1Title) || 'Night 1: Exfoliation' }),
        el('p', { textContent: (ui && ui.night1Desc) || 'Apply gentle chemical exfoliant (AHA/BHA) to dissolve cellular debris. Follow with neutral barrier hydrator.' })
      ]));

      // Night 2
      grid.appendChild(el('div', { className: 'cycling-day' }, [
        el('h5', { textContent: (ui && ui.night2Title) || 'Night 2: Cellular Retinoid' }),
        el('p', { textContent: (ui && ui.night2Desc) || 'Apply Retinol on cleansed, dry skin. Buffer with Niacinamide or moisturize immediately to temper retinization.' })
      ]));

      // Night 3
      grid.appendChild(el('div', { className: 'cycling-day' }, [
        el('h5', { textContent: (ui && ui.night3Title) || 'Night 3: Barrier Recovery' }),
        el('p', { textContent: (ui && ui.night3Desc) || 'Zero exfoliating acids or retinoids. Focus purely on Peptides (Syn-Coll, SYN-AKE, GHK-Cu) and Beta-Glucan.' })
      ]));

      card.appendChild(grid);
      return card;
    }

    buildMechanismList(analysis) {
      const uiMech = I18N[this.lang] && I18N[this.lang].ui && I18N[this.lang].ui.mechanisms;
      const uiMatrix = I18N[this.lang] && I18N[this.lang].ui && I18N[this.lang].ui.matrix;
      const wrap = el('div', { className: 'mechanisms-wrap' });
      wrap.appendChild(el('h3', {
        style: 'font-size: 1.35rem; margin-bottom: 1.25rem;',
        textContent: (uiMech && uiMech.title) || 'Clinical Mechanism Deep-Dive & Resolutions'
      }));

      analysis.pairs.forEach((pair, idx) => {
        const card = el('div', { className: `mechanism-card ${idx === 0 ? 'active' : ''}` });
        let pillText = pair.rule.severity === 'critical' ? 'Conflict' : pair.rule.severity;
        if (uiMatrix && uiMatrix.pills && uiMatrix.pills[pair.rule.severity]) {
          pillText = uiMatrix.pills[pair.rule.severity];
        }

        const btn = el('button', {
          type: 'button',
          className: 'mechanism-btn',
          'aria-expanded': idx === 0 ? 'true' : 'false'
        }, [
          el('span', {}, [
            el('span', {
              className: `status-pill status-${pair.rule.severity}`,
              style: 'margin-right: 0.75rem;',
              textContent: pillText
            }),
            el('strong', { textContent: `${pair.activeA.shortName} + ${pair.activeB.shortName}: ` }),
            document.createTextNode(pair.rule.title)
          ]),
          icon('fa-solid fa-chevron-down toggle-icon')
        ]);

        btn.addEventListener('click', () => {
          const isActive = card.classList.contains('active');
          card.classList.toggle('active', !isActive);
          btn.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
        });

        const body = el('div', { className: 'mechanism-body' }, [
          el('p', { style: 'margin-top: 0.75rem;', textContent: pair.rule.mechanism }),
          el('div', { className: 'mechanism-strategy' }, [
            el('strong', { textContent: (uiMech && uiMech.strategyLabel) || 'Dermatological Strategy: ' }),
            document.createTextNode(pair.rule.resolution)
          ])
        ]);

        card.appendChild(btn);
        card.appendChild(body);
        wrap.appendChild(card);
      });

      return wrap;
    }
  }

  // =========================================================================
  // 6. DOM READY LIFECYCLE
  // =========================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MatrixApp());
  } else {
    new MatrixApp();
  }
})();
