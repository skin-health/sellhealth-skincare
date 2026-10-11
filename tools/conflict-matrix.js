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
      mechanism: 'Niacinamide upregulates ceramide and free fatty acid synthesis, clinically shown to prevent retinol-induced peeling without hindering retinoic acid nuclear receptor signaling.',
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
  // 2B. MULTILINGUAL I18N DICTIONARY (ES, DE, FR)
  // =========================================================================
  const I18N = Object.freeze({
  "es": {
    "ingredients": {
      "l-ascorbic-acid": {
        "name": "Ácido L-Ascórbico (Vitamina C Pura)",
        "shortName": "Vitamina C (L-AA)",
        "category": "Antioxidante Directo / Ácido",
        "vehicle": "Solución acuosa",
        "summary": "Antioxidante potente para la síntesis de colágeno. Requiere pH ácido (<3.5) para penetración cutánea; susceptible a oxidación metálica."
      },
      "syn-coll": {
        "name": "Palmitoyl Tripeptide-5 (Syn-Coll®)",
        "shortName": "Péptido Syn-Coll®",
        "category": "Péptido Señalizador / Estimulador de Colágeno",
        "vehicle": "Emulsión / Crema de absorción",
        "summary": "Péptido señal biomimético de TGF-β diseñado para estimular la síntesis de colágeno tipo I y II. Sensible a la hidrólisis ácida."
      },
      "syn-ake": {
        "name": "SYN-AKE® (Derivado Dipéptido)",
        "shortName": "Neuropéptido SYN-AKE®",
        "category": "Neuropéptido / Relajante de Expresión",
        "vehicle": "Sérum acuoso / Gel",
        "summary": "Antagonista reversible de receptores musculares nicotínicos de acetilcolina. Relaja la tensión de líneas de expresión; se desestabiliza en pH bajo."
      },
      "alpha-arbutin": {
        "name": "Alfa-Arbutina (α-Arbutina)",
        "shortName": "Alfa-Arbutina",
        "category": "Inhibidor de Melanina / Glucósido",
        "vehicle": "Sérum acuoso",
        "summary": "Glucósido puro de hidroquinona que inhibe competitivamente la tirosinasa. Su enlace éter puede hidrolizarse a hidroquinona libre en ácidos fuertes."
      },
      "retinol": {
        "name": "Retinol (Vitamina A)",
        "shortName": "Retinol (Vit A)",
        "category": "Retinoide / Renovación Celular",
        "vehicle": "Suspensión lipídica / Emulsión",
        "summary": "Agonista de receptores nucleares de ácido retinoico que activa la renovación celular. Fotosensible (solo noche); alto potencial de descamación."
      },
      "glycolic-acid": {
        "name": "Ácido Glicólico (AHA)",
        "shortName": "Ácido Glicólico",
        "category": "Alfa Hidroxiácido / Exfoliante",
        "vehicle": "Solución acuosa",
        "summary": "AHA de menor peso molecular. Disuelve rápidamente los corneodesmosomas. Reduce el pH superficial; fotosensibilizante e irritante con retinoides."
      },
      "salicylic-acid": {
        "name": "Ácido Salicílico (BHA)",
        "shortName": "Ácido Salicílico (BHA)",
        "category": "Beta Hidroxiácido / Queratolítico",
        "vehicle": "Solución hidroalcohólica / Acuosa",
        "summary": "Ácido queratolítico lipofílico que penetra y limpia el sebo en las unidades foliculares. Aumenta la sequedad de la barrera si se combina con retinoides."
      },
      "niacinamide": {
        "name": "Niacinamida (Vitamina B3)",
        "shortName": "Niacinamida (B3)",
        "category": "Reparador de Barrera / Bloqueador de Melanosomas",
        "vehicle": "Sérum acuoso",
        "summary": "Estimula la síntesis de ceramidas epidérmicas, regula el sebo y bloquea la transferencia de melanosomas. Versátil; amortigua la irritación por retinoides."
      },
      "copper-peptides": {
        "name": "Tripéptido de Cobre-1 (GHK-Cu)",
        "shortName": "Péptidos de Cobre",
        "category": "Tripéptido Remodelador / Complejo Metálico",
        "vehicle": "Sérum acuoso",
        "summary": "Tripéptido coordinado con cobre para remodelación dérmica. Se inactiva rápidamente con ácidos de pH bajo y agentes reductores directos."
      },
      "azelaic-acid": {
        "name": "Ácido Azelaico",
        "shortName": "Ácido Azelaico",
        "category": "Ácido Dicarboxílico / Antiinflamatorio",
        "vehicle": "Suspensión / Crema ligera",
        "summary": "Ácido dicarboxílico dirigido a tirosinasa y Cutibacterium acnes. Estable y bien tolerado, pero quela iones metálicos de transición."
      },
      "beta-glucan": {
        "name": "Beta-Glucano (Symglucan®)",
        "shortName": "Beta-Glucano",
        "category": "Polisacárido / Amortiguador de Barrera",
        "vehicle": "Gel acuoso / Hidratante de barrera",
        "summary": "Polisacárido de avena de alto peso molecular. 20% más hidratante que el ácido hialurónico; estimula macrófagos y neutraliza la irritación."
      }
    },
    "ui": {
      "counter": {
        "empty": " Seleccionados: 0 de 6 (Elija al menos 2)",
        "one": " Seleccionados: 1 de 6 (Elija 1 activo más)",
        "max": " Seleccionados: 6 de 6 (Capacidad máxima)",
        "valid": " Seleccionados: {count} de 6 (Listo para análisis)",
        "limitNotice": " Límite máximo de 6 activos alcanzado"
      },
      "emptyState": {
        "zeroTitle": "Seleccione de 2 a 6 Activos Arriba para Comenzar el Análisis",
        "zeroDesc": "Elija ingredientes activos de la cuadrícula o haga clic en una rutina clínica para calcular la estabilidad de pH, riesgos de desactivación y rutinas AM/PM.",
        "oneTitle": "Seleccione al Menos 1 Ingrediente Activo Más",
        "oneDesc": "La matriz de conflictos evalúa interacciones por pares. Agregue otro ingrediente para evaluar la compatibilidad bioquímica."
      },
      "metrics": {
        "phTitle": " Compatibilidad de pH",
        "phFavorable": "Las curvas de ionización se alinean favorablemente para la penetración cutánea.",
        "phClash": "Divergencia significativa de pH. Separación obligatoria.",
        "deactTitle": " Riesgo de Desactivación",
        "riskLow": "Bajo",
        "riskMod": "Moderado",
        "riskHigh": "Alto",
        "riskCrit": "Crítico",
        "deactDescLow": "Riesgo mínimo de colisión molecular. Los activos conservan su potencia bioquímica.",
        "deactDescMod": "Complejación temporal menor o riesgo de enrojecimiento. Se recomienda distanciar la aplicación.",
        "deactDescHigh": "Choque significativo de pH o vías enzimáticas competitivas. Separación requerida.",
        "deactDescCrit": "Neutralización química directa, oxidación redox tipo Fenton o ruptura de enlaces peptídicos detectada.",
        "barrierTitle": " Sobrecarga de Barrera",
        "barrierOpt": "Estabilidad Óptima",
        "barrierMod": "Carga Moderada",
        "barrierHigh": "Alta Sobrecarga",
        "barrierCrit": "Peligro Crítico de Barrera",
        "barrierDescOpt": "Integridad lipídica del estrato córneo preservada. Riesgo insignificante de TEWL.",
        "barrierDescMod": "Tolerable en piel aclimatada. Requiere emolientes de soporte e introducción gradual.",
        "barrierDescHigh": "Carga queratolítica sustancial. Alto riesgo de ardor, eritema y manto ácido debilitado.",
        "barrierDescCrit": "Ruptura aguda del estrato córneo, microfisuras y riesgo grave de dermatitis por ácidos/retinoides."
      },
      "matrix": {
        "title": "Matriz de Compatibilidad por Pares",
        "activeCol": "Activo",
        "legendComp": " Compatible / Sinérgico",
        "legendBuffer": " Requiere Espaciamiento",
        "legendConflict": " Conflicto / No Mezclar",
        "pills": {
          "synergistic": "sinérgico",
          "compatible": "compatible",
          "moderate": "moderado",
          "high": "alto",
          "critical": "Conflicto"
        }
      },
      "schedule": {
        "amTitle": "Protocolo Matutino (Rutina AM)",
        "amStep1Title": "Limpiador Hidratante Suave",
        "amStep1Desc": "Elimina el sebo nocturno sin agredir la barrera lipídica.",
        "amFinalTitle": "Protector Solar SPF 50+ Amplio Espectro",
        "amFinalDesc": "Paso final indispensable para evitar la fotólisis UV y la oxidación de activos.",
        "pmTitle": "Protocolo Nocturno (Rutina PM)",
        "pmStep1Title": "Doble Limpieza (Bálsamo + Gel Suave)",
        "pmStep1Desc": "Elimina protector solar, polución y sebo para asegurar la absorción de los activos.",
        "pmFinalTitle": "Crema de Ceramidas / Barrera Lipídica",
        "pmFinalDesc": "Sella el estrato córneo con lípidos fisiológicos para mitigar la pérdida transepidérmica de agua nocturna.",
        "waitAcidAM": "Espere 15–20 min antes del siguiente paso",
        "waitAcidPM": "Espere 15 min para amortiguación del manto ácido"
      },
      "cycling": {
        "title": "Protocolo Clínico de Ciclado Cutáneo Recomendado",
        "intro": "Se detectaron múltiples activos nocturnos de alta potencia. Aplicarlos juntos la misma noche induce degradación acumulativa de la barrera. Implemente este ciclo rotativo de 3 noches:",
        "night1Title": "Noche 1: Exfoliación Química",
        "night1Desc": "Aplique exfoliante químico suave (AHA/BHA) para disolver células muertas. Continúe con hidratante neutro de barrera.",
        "night2Title": "Noche 2: Retinoide Celular",
        "night2Desc": "Aplique retinol sobre la piel limpia y seca. Amortigüe con niacinamida o hidrate inmediatamente para moderar la retinización.",
        "night3Title": "Noche 3: Recuperación de Barrera",
        "night3Desc": "Sin ácidos ni retinoides. Enfoque exclusivo en Péptidos (Syn-Coll, SYN-AKE, GHK-Cu) y Beta-Glucano."
      },
      "mechanisms": {
        "title": "Análisis Detallado de Mecanismos Clínicos y Resoluciones",
        "strategyLabel": "Estrategia Dermatológica: "
      },
      "defaultRules": {
        "highTitle": "Divergencia Significativa del Microambiente de pH",
        "highMech": "Los rangos óptimos de pH divergen notablemente ({a} a pH {pa} frente a {b} a pH {pb}). La aplicación conjunta causa neutralización o baja biodisponibilidad.",
        "highRes": "Separe en rutinas de mañana y noche, o distancie la aplicación 20 minutos.",
        "modTitle": "Separación Moderada de Rango de pH",
        "modMech": "Ligera diferencia en la ionización de las fórmulas. Aplicar directamente puede provocar escozor leve en pieles reactivas.",
        "modRes": "Aplique primero la textura más ligera; deje secar por completo antes de la siguiente capa.",
        "compTitle": "Armonía Fisiológica de pH",
        "compMech": "Ambos ingredientes mantienen curvas de ionización compatibles y estabilidad fisiológica de pH sin choques moleculares directos.",
        "compRes": "Seguro para aplicar consecutivamente en la misma rutina."
      }
    },
    "rules": {
      "alpha-arbutin|glycolic-acid": {        "title": "Inestabilidad del Enlace Éter Glucosídico",        "mechanism": "El pH bajo acelera la hidrólisis lenta de la alfa-arbutina en hidroquinona libre. La tolerancia a corto plazo es posible, pero la mezcla prolongada en solución degrada ambos activos.",        "resolution": "Aplique el ácido glicólico, espere 20 minutos a que el pH cutáneo se normalice y aplique después la alfa-arbutina."      },
      "alpha-arbutin|l-ascorbic-acid": {        "title": "Precaución: Hidrólisis del Éter Glucosídico",        "mechanism": "La alfa-arbutina es estable a pH 4.9–6.5. Los medios acuosos persistentes de pH bajo (pH < 3.5) pueden catalizar con el tiempo su descomposición hidrolítica en hidroquinona libre.",        "resolution": "Espere 15 minutos a que la vitamina C (L-AA) se absorba antes de aplicar la alfa-arbutina, o use la alfa-arbutina por la noche."      },
      "alpha-arbutin|niacinamide": {        "title": "Intercepción Dual de la Pigmentación",        "mechanism": "La alfa-arbutina detiene directamente la acción catalítica de la tirosinasa; la niacinamida impide la transferencia de melanosomas de los melanocitos a los queratinocitos. Maximiza la reducción de la hiperpigmentación.",        "resolution": "Aplique ambos juntos por la mañana o por la noche; óptimo para manchas oscuras y melasma."      },
      "alpha-arbutin|retinol": {        "title": "Reducción Dual de la Hiperpigmentación",        "mechanism": "La alfa-arbutina frena la síntesis de melanina por la tirosinasa mientras el retinol acelera la renovación de los queratinocitos pigmentados.",        "resolution": "Aplique el sérum de alfa-arbutina y después el retinol por la noche; mantenga siempre un SPF 50 estricto durante el día."      },
      "alpha-arbutin|syn-coll": {        "title": "Armonía entre Densidad de Colágeno y Luminosidad",        "mechanism": "Sin conflicto biológico. La alfa-arbutina uniformiza el tono mientras el Syn-Coll restaura la elasticidad de la dermis.",        "resolution": "Combine en rutinas de mañana o de noche."      },
      "azelaic-acid|copper-peptides": {        "title": "Quelación Dicarboxílica de Iones Cu(II)",        "mechanism": "El ácido azelaico presenta afinidad por los cationes metálicos divalentes y puede extraer el Cu(II) del esqueleto tripéptido GHK.",        "resolution": "Rutinas separadas: ácido azelaico por la mañana, péptidos de cobre por la noche."      },
      "azelaic-acid|l-ascorbic-acid": {        "title": "Antioxidante Dual y Supresión de la Tirosinasa",        "mechanism": "El ácido azelaico funciona bien en acidez suave (pH 4.0–5.5) y no oxida el ácido ascórbico. Aclaramente dual muy eficaz para melasma resistente.",        "resolution": "Aplique primero la vitamina C (L-AA) (solución acuosa más ligera) y después la suspensión de ácido azelaico."      },
      "azelaic-acid|niacinamide": {        "title": "Dúo Potente Anti-Rojeces y Anti-Imperfecciones",        "mechanism": "El ácido azelaico suprime Cutibacterium acnes y el enrojecimiento, mientras la niacinamida refuerza las laminillas lipídicas de la barrera y calma las cascadas de citocinas.",        "resolution": "Aplique primero el sérum de niacinamida y después la crema de ácido azelaico."      },
      "azelaic-acid|retinol": {        "title": "Renovación Dual y Riesgo de Escozor",        "mechanism": "Ambos activos aumentan la remodelación epidérmica y la renovación celular. Combinarlos en piel reactiva o no acondicionada puede provocar escozor y sequedad.",        "resolution": "Mitigue con una hidratante, o aplique el ácido azelaico por la mañana y el retinol por la noche."      },
      "beta-glucan|copper-peptides": {        "title": "Remodelación y Reparación Tisular Aceleradas",        "mechanism": "El beta-glucano estimula la fagocitosis de macrófagos mientras el GHK-Cu estimula la síntesis de glucosaminoglicanos y colágeno. Ideal para la cicatrización y la recuperación de cicatrices.",        "resolution": "Aplique primero los péptidos de cobre y después el beta-glucano (Dermefface FX7®)."      },
      "beta-glucan|glycolic-acid": {        "title": "Recuperación de la Barrera Tras el Ácido y Calma",        "mechanism": "El beta-glucano reduce el eritema inducido por el ácido e hidrata los corneocitos recién renovados sin reducir la exfoliación queratolítica.",        "resolution": "Aplique el ácido glicólico; espere 15 minutos; continúe con el beta-glucano (Dermefface FX7®)."      },
      "beta-glucan|niacinamide": {        "title": "Fortificación Intensiva de la Barrera Cutánea",        "mechanism": "La niacinamida promueve la síntesis endógena de ceramidas; el beta-glucano forma una matriz protectora de unión de agua sobre el estrato córneo.",        "resolution": "Restaurador universal de la barrera. Apto para todos los tipos de piel."      },
      "beta-glucan|salicylic-acid": {        "title": "Colchón de Hidratación para la Queratólisis BHA",        "mechanism": "El beta-glucano previene la descamación y la tirantez características de los tratamientos con ácido salicílico.",        "resolution": "Aplique el beta-glucano inmediatamente después de la absorción del BHA."      },
      "beta-glucan|syn-coll": {        "title": "Proliferación de Fibroblastos y Remodelación de la MEC",        "mechanism": "El beta-glucano acelera la cicatrización mediada por macrófagos mientras el Syn-Coll estimula la transcripción basal de ARNm del pro-colágeno.",        "resolution": "Pareja restauradora ideal: combine por la mañana o por la noche."      },
      "copper-peptides|niacinamide": {        "title": "Síntesis de Lípidos de la Barrera y Renovación de la MEC",        "mechanism": "Ambos ingredientes operan en armonía a pH fisiológico 5.5–6.5. La niacinamida restaura las ceramidas mientras el GHK-Cu repara la dermis profunda.",        "resolution": "Aplique en la rutina nocturna por orden de textura (de la más ligera a la más densa)."      },
      "copper-peptides|syn-ake": {        "title": "Remodelación y Relajación Neuromuscular",        "mechanism": "Sin conflicto biológico. El SYN-AKE actúa sobre los receptores de acetilcolina mientras los péptidos de cobre orquestan la remodelación de la matriz a pH 5.5–6.5.",        "resolution": "Compatibles en la misma rutina nocturna."      },
      "copper-peptides|syn-coll": {        "title": "Síntesis de Colágeno con Péptidos Duales",        "mechanism": "Ambos péptidos comparten compatibilidad de pH casi neutro y actúan por vías de síntesis de la matriz extracelular distintas y no competitivas.",        "resolution": "Compatibles en la misma rutina nocturna."      },
      "glycolic-acid|niacinamide": {        "title": "Rubor por Ácido y Formación de Complejos",        "mechanism": "Una caída drástica del pH puede hidrolizar parcialmente la niacinamida en ácido nicotínico, provocando vasodilatación facial transitoria en piel propensa a rosácea.",        "resolution": "Separe 20 minutos, o aplique la niacinamida por la mañana y el ácido glicólico por la noche."      },
      "glycolic-acid|salicylic-acid": {        "title": "Riesgo de Sobreexfoliación Multiácida",        "mechanism": "Empilar un alfa-hidroxiácido con un beta-hidroxiácido provoca una descamación profunda, desnaturaliza las enzimas del estrato córneo y elimina los lípidos de la barrera.",        "resolution": "Uso alterno: ácido glicólico para la textura superficial (noche 1), ácido salicílico para la congestión de poros (noche 2)."      },
      "glycolic-acid|syn-ake": {        "title": "Desnaturalización Ácida del Neuropéptido",        "mechanism": "La cadena activa de diaminobutiroilo del SYN-AKE se degrada químicamente en microentornos de ácido glicólico concentrado.",        "resolution": "Separe 12 horas (AHA por la noche, SYN-AKE por la mañana) o alterne noches."      },
      "glycolic-acid|syn-coll": {        "title": "Hidrólisis Ácida del Palmitoyl Tripeptide",        "mechanism": "El ácido glicólico (pH < 3.8) hidroliza el esqueleto amida del Palmitoyl Tripeptide-5 y destruye su estimulación del colágeno vía TGF-β antes de penetrar.",        "resolution": "Use el ácido glicólico por la noche; reserve el Syn-Coll (Kollagen Intensiv™) para la mañana o noches sin ácidos."      },
      "l-ascorbic-acid|niacinamide": {        "title": "Complejo por Puentes de Hidrógeno y Rubor Nicotínico",        "mechanism": "La coaplicación líquida directa puede formar un complejo reversible nicotinamida-ascorbato unido por puentes de hidrógeno 1:1. Con acidez y calor elevados, una hidrólisis residual en ácido nicotínico puede provocar rubor facial microvascular temporal.",        "resolution": "Aplique primero la vitamina C (L-AA), espere 15 minutos antes de la niacinamida, o separe en mañana (L-AA) y noche (niacinamida)."      },
      "niacinamide|salicylic-acid": {        "title": "Dúo que Pura Poros y Normaliza el Sebo",        "mechanism": "El ácido salicílico limpia los poros foliculares del sebo mientras la niacinamida reduce la tasa de excreción sebácea y refuerza la barrera.",        "resolution": "Aplique primero el ácido salicílico, espere 10 minutos y aplique la niacinamida."      },
      "retinol|syn-ake": {        "title": "Neutralización de Arrugas Estáticas y Dinámicas",        "mechanism": "El SYN-AKE atenúa la tensión muscular facial dinámica mientras el retinol densifica la matriz dérmica para borrar las arrugas estáticas superficiales.",        "resolution": "Aplique el sérum SYN-AKE (Synevra UltraLift™) en las zonas de expresión; después el retinol en todo el rostro."      },
      "retinol|syn-coll": {        "title": "Estimulación Integral de la Arquitectura de la MEC",        "mechanism": "El Palmitoyl Tripeptide-5 inicia la síntesis de colágeno vía TGF-β mientras el retinol regula la degradación por la colagenasa MMP-1. Armonía antiaging complementaria perfecta.",        "resolution": "Aplique la crema Syn-Coll (Kollagen Intensiv™) por la noche inmediatamente después del retinol."      },
      "salicylic-acid|syn-ake": {        "title": "Degradación del Neuropéptido por pH Bajo",        "mechanism": "El dipéptido SYN-AKE pierde estabilidad cuando se aplica bajo soluciones de ácido salicílico de uso continuo.",        "resolution": "Rutinas separadas: SYN-AKE (Synevra UltraLift™) por la mañana; BHA por la noche."      },
      "salicylic-acid|syn-coll": {        "title": "Penetración Lipofílica y Alteración del Péptido",        "mechanism": "El pH bajo del BHA desestabiliza el Palmitoyl Tripeptide-5 en emulsiones tópicas.",        "resolution": "Use el BHA por la noche; el Syn-Coll (Kollagen Intensiv™) por la mañana o en noches alternas."      },
      "copper-peptides|l-ascorbic-acid": {
        "title": "Oxidación Redox e Inactivación de Radicales Libres",
        "mechanism": "El ácido L-ascórbico actúa como donante de electrones, reduciendo rápidamente el Cu(II) del GHK-Cu a Cu(I). Esto activa una reacción tipo Fenton que inactiva la vitamina C (color marrón-amarillento) y rompe el complejo peptídico.",
        "resolution": "Separación estricta. Aplique ácido L-ascórbico en la mañana y péptidos de cobre en la noche."
      },
      "l-ascorbic-acid|retinol": {
        "title": "Inversión de pH e Inhibición de Enzimas de Conversión",
        "mechanism": "El ácido L-ascórbico requiere un pH ácido (<3.5) para penetración cutánea, mientras que las enzimas de conversión del retinol funcionan óptimamente a pH 5.5–6.5. Combinarlos frena la conversión y provoca eritema.",
        "resolution": "División AM/PM. Aplique ácido L-ascórbico en la mañana con protección solar; reserve el retinol estrictamente para la noche."
      },
      "glycolic-acid|l-ascorbic-acid": {
        "title": "Hiperacidificación del Manto Ácido",
        "mechanism": "La coaplicación de dos ácidos directos de bajo pH (pH 2.8–3.5) reduce el pH superficial muy por debajo del amortiguador fisiológico cutáneo (pH 4.7–5.5), comprometiendo la barrera lipídica y provocando ardor neurosensorial.",
        "resolution": "Rutinas separadas. Reserve el ácido L-ascórbico para la mañana y utilice el ácido glicólico en noches sin retinoides."
      },
      "l-ascorbic-acid|salicylic-acid": {
        "title": "Descamación Ácida Acumulativa y Pérdida Lipídica",
        "mechanism": "La aplicación simultánea de L-AA hidrofílico y BHA lipofílico provoca una eliminación lipídica excesiva, causando escozor y descamación aguda de la barrera.",
        "resolution": "Use L-AA en la mañana; aplique ácido salicílico por la noche o úselo como limpiador con enjuague."
      },
      "l-ascorbic-acid|syn-coll": {
        "title": "Ruptura de Enlaces Peptídicos por Catálisis Ácida",
        "mechanism": "El Palmitoyl Tripeptide-5 requiere un pH fisiológico de 5.0–6.5. La exposición directa al L-AA de pH bajo (pH < 3.5) arriesga hidrolizar el enlace peptídico antes de interactuar con receptores TGF-β.",
        "resolution": "Aplique L-AA en la mañana; aplique la crema con Syn-Coll (Kollagen Intensiv™) por la noche o espere 20 minutos entre productos."
      },
      "l-ascorbic-acid|syn-ake": {
        "title": "Desnaturalización del Neuropéptido en pH Bajo",
        "mechanism": "La estructura dipéptida de SYN-AKE sufre hidrólisis en ácidos sin amortiguar (pH < 3.5), neutralizando su afinidad por receptores de acetilcolina.",
        "resolution": "Aplique L-AA en la mañana; aplique SYN-AKE (Synevra UltraLift™) por la noche o tras una pausa amortiguadora de 20 minutos."
      },
      "glycolic-acid|retinol": {
        "title": "Ruptura de Corneodesmosomas y Dermatitis por Retinoides",
        "mechanism": "El ácido glicólico disuelve los desmosomas intercelulares mientras el retinol acelera la proliferación celular basal. La aplicación simultánea provoca colapso de la barrera y descamación intensa.",
        "resolution": "Protocolo de Skin Cycling. Ácido glicólico en la Noche 1 (Exfoliación), Retinol en la Noche 2 y Recuperación/Hidratación en Noches 3–4."
      },
      "retinol|salicylic-acid": {
        "title": "Agotamiento Lipídico Intercelular y Riesgo de Barrera",
        "mechanism": "El BHA lipofílico disuelve lípidos foliculares y el retinol incrementa la renovación de queratinocitos. Su combinación sin amortiguar debilita el estrato córneo.",
        "resolution": "Alterne noches o aplique BHA por la mañana seguido de protector solar SPF 50+, y retinol por la noche."
      },
      "copper-peptides|retinol": {
        "title": "Estrés Metabólico de Fibroblastos Contrapuesto",
        "mechanism": "Los péptidos de cobre señalizan la remodelación de la matriz extracelular mientras el retinol promueve la diferenciación rápida de queratinocitos. Pueden generar sobrecarga si la piel no está adaptada.",
        "resolution": "Alterne noches entre péptidos de cobre y retinol, o amortigüe con una crema de ceramidas."
      },
      "copper-peptides|glycolic-acid": {
        "title": "Hidrólisis Ácida de Quelatos de Cobre",
        "mechanism": "El ácido glicólico de bajo pH desestabiliza el complejo de coordinación de cobre en GHK-Cu, liberando iones de cobre libres que pueden oxidar lípidos.",
        "resolution": "Estricta separación. Use ácido glicólico en noches de exfoliación y péptidos de cobre en noches de recuperación."
      },
      "copper-peptides|salicylic-acid": {
        "title": "Precipitación y Desactivación del Complejo Metálico",
        "mechanism": "El ácido salicílico forma sales insolubles con iones metálicos y su bajo pH disocia el péptido de cobre, anulando su función reparadora.",
        "resolution": "Separe rutinas. Salicílico en noches alternas o mañanas; péptidos de cobre en noches de descanso."
      },
      "beta-glucan|l-ascorbic-acid": {
        "title": "Sello Antioxidante y Escudo Calmante",
        "mechanism": "El beta-glucano forma una malla coloidal protectora que sella el ácido ascórbico puro mientras atenúa el eritema de bajo pH mediante macrófagos IL-10.",
        "resolution": "Aplique L-AA primero; continúe inmediatamente con Beta-Glucano (Dermefface FX7®) para sellar e hidratar."
      },
      "niacinamide|retinol": {
        "title": "Sinergia de Barrera y Amortiguación de Retinización",
        "mechanism": "La niacinamida estimula la síntesis de ceramidas endógenas y ácidos grasos libres, creando un amortiguador biológico que previene la dermatitis por retinol.",
        "resolution": "Aplique niacinamida antes o junto con el retinol para reducir el enrojecimiento y descamación."
      },
      "beta-glucan|retinol": {
        "title": "Mitigación de Dermatitis y Retención de Hidratación",
        "mechanism": "El beta-glucano reduce notablemente el eritema y la descamación inducida por retinoides al estimular la respuesta inmunitaria dérmica.",
        "resolution": "Aplique retinol y selle con gel de beta-glucano (Dermefface FX7®) para proteger la barrera."
      },
      "syn-ake|syn-coll": {
        "title": "Sinergia Peptídica Dual: Expresión y Matriz Dérmica",
        "mechanism": "SYN-AKE relaja la tensión dinámica muscular mientras Syn-Coll estimula la síntesis de colágeno dérmico. Complementación molecular perfecta sin interferencias.",
        "resolution": "Excelente combinación. Aplique el sérum SYN-AKE primero y luego la crema con Syn-Coll."
      }
    }
  },
  "de": {
    "ingredients": {
      "l-ascorbic-acid": {
        "name": "L-Ascorbinsäure (Reines Vitamin C)",
        "shortName": "Vitamin C (L-AA)",
        "category": "Direktes Antioxidans / Säure",
        "vehicle": "Wässrige Lösung",
        "summary": "Potentes Antioxidans zur Kollagensynthese. Benötigt sauren pH-Wert (<3.5) zur Penetration des Stratum corneum; anfällig für Metalloxidation."
      },
      "syn-coll": {
        "name": "Palmitoyl Tripeptid-5 (Syn-Coll®)",
        "shortName": "Syn-Coll® Peptid",
        "category": "Signalpeptid / Kollagen-Booster",
        "vehicle": "Emulsion / Cremeserum",
        "summary": "Patentiertes biomimetisches TGF-β Signalpeptid zur Stimulierung der Kollagensynthese Typ I und II. Empfindlich gegenüber Säurehydrolyse."
      },
      "syn-ake": {
        "name": "SYN-AKE® (Dipeptid-Derivat)",
        "shortName": "SYN-AKE® Neuropeptid",
        "category": "Neuropeptid / Mimikglätter",
        "vehicle": "Wässriges Serum / Gel",
        "summary": "Reversibler Antagonist muskulärer nikotinischer Acetylcholinrezeptoren. Entspannt mimische Muskelspannung; destabilisiert bei niedrigem pH-Wert."
      },
      "alpha-arbutin": {
        "name": "Alpha-Arbutin (α-Arbutin)",
        "shortName": "Alpha-Arbutin",
        "category": "Melanin-Inhibitor / Glykosid",
        "vehicle": "Wasserbasiertes Serum",
        "summary": "Reines Hydrochinon-Glukosid zur kompetitiven Hemmung der Tyrosinase. Ätherbindung kann in stark saurem Milieu zu freiem Hydrochinon hydrolysieren."
      },
      "retinol": {
        "name": "Retinol (Vitamin A)",
        "shortName": "Retinol (Vit A)",
        "category": "Retinoid / Zellerneuerung",
        "vehicle": "Lipidsuspension / Emulsion",
        "summary": "Agonist nukleärer Retinsäurerezeptoren zur Beschleunigung der Zellerneuerung. Photolabil (nur abends); hohes Schuppungspotenzial."
      },
      "glycolic-acid": {
        "name": "Glykolsäure (AHA)",
        "shortName": "Glykolsäure",
        "category": "Alpha-Hydroxysäure / Peeling",
        "vehicle": "Wässrige Lösung",
        "summary": "Kleinstes AHA-Molekül. Löst Korneodesmosomen schnell auf. Senkt den Oberflächen-pH; verursacht Photosensibilität und Reizung mit Retinoiden."
      },
      "salicylic-acid": {
        "name": "Salicylsäure (BHA)",
        "shortName": "Salicylsäure (BHA)",
        "category": "Beta-Hydroxysäure / Keratolytisch",
        "vehicle": "Hydroalkoholische Lösung",
        "summary": "Lipophile keratolytische Säure zur Follikelreinigung und Sebumreduktion. Verstärkt Barriere-Trockenheit bei gleichzeitiger Retinoid-Anwendung."
      },
      "niacinamide": {
        "name": "Niacinamid (Vitamin B3)",
        "shortName": "Niacinamid (B3)",
        "category": "Barrierereparatur / Melanosomen-Blocker",
        "vehicle": "Wasserbasiertes Serum",
        "summary": "Fördert die epidermale Ceramidsynthese, reguliert Sebum und hemmt den Melanosomentransfer. Dämpft Retinoid-Irritationen."
      },
      "copper-peptides": {
        "name": "Kupfer-Tripeptid-1 (GHK-Cu)",
        "shortName": "Kupfer-Peptide",
        "category": "Remodellierungs-Peptid / Metallkomplex",
        "vehicle": "Wässriges Serum",
        "summary": "Kupferkoordiniertes Tripeptid zur dermalen Matrix-Remodellierung. Wird durch Säuren mit niedrigem pH und Reduktionsmittel rasch inaktiviert."
      },
      "azelaic-acid": {
        "name": "Azelainsäure",
        "shortName": "Azelainsäure",
        "category": "Dicarbonsäure / Entzündungshemmend",
        "vehicle": "Suspension / Leichte Creme",
        "summary": "Dicarbonsäure gegen Tyrosinase und Cutibacterium acnes. Stabil und gut verträglich, cheliert jedoch Übergangsmetallionen."
      },
      "beta-glucan": {
        "name": "Beta-Glucan (Symglucan®)",
        "shortName": "Beta-Glucan",
        "category": "Polysaccharid / Barrierepuffer",
        "vehicle": "Wässriges Gel / Feuchtigkeitsbarriere",
        "summary": "Hochmolekulares Hafer-Polysaccharid. 20% feuchtigkeitsspendender als Hyaluronsäure; stimuliert Makrophagen und beruhigt Reizungen."
      }
    },
    "ui": {
      "counter": {
        "empty": " Ausgewählt: 0 von 6 (Mindestens 2 wählen)",
        "one": " Ausgewählt: 1 von 6 (1 weiteren Wirkstoff wählen)",
        "max": " Ausgewählt: 6 von 6 (Maximale Kapazität)",
        "valid": " Ausgewählt: {count} von 6 (Bereit zur Analyse)",
        "limitNotice": " Maximales Limit von 6 Wirkstoffen erreicht"
      },
      "emptyState": {
        "zeroTitle": "Wählen Sie oben 2 bis 6 Wirkstoffe für die Analyse",
        "zeroDesc": "Wählen Sie Wirkstoffe aus dem Raster oder klicken Sie auf eine Voreinstellung, um pH-Stabilität, Deaktivierungsrisiken und AM/PM-Schichtung zu berechnen.",
        "oneTitle": "Wählen Sie mindestens 1 weiteren Wirkstoff",
        "oneDesc": "Die Konfliktmatrix bewertet paarweise Interaktionen. Fügen Sie einen weiteren Wirkstoff hinzu, um die biochemische Kompatibilität zu prüfen."
      },
      "metrics": {
        "phTitle": " pH-Kompatibilität",
        "phFavorable": "Ionisationskurven sind für die Hautresorption optimal aufeinander abgestimmt.",
        "phClash": "Signifikante pH-Divergenz. Zeitliche Trennung erforderlich.",
        "deactTitle": " Deaktivierungsrisiko",
        "riskLow": "Gering",
        "riskMod": "Mäßig",
        "riskHigh": "Hoch",
        "riskCrit": "Kritisch",
        "deactDescLow": "Minimale molekulare Kollisionsrisiken. Wirkstoffe behalten ihre biochemische Potenz.",
        "deactDescMod": "Geringe temporäre Komplexbildung oder Rötungsrisiko. Zeitlicher Abstand empfohlen.",
        "deactDescHigh": "Signifikanter pH-Konflikt oder konkurrierende Enzymwege. Trennung erforderlich.",
        "deactDescCrit": "Direkte chemische Neutralisation, Fenton-Redoxoxidation oder Spaltung von Peptidbindungen festgestellt.",
        "barrierTitle": " Barriere-Überlastung",
        "barrierOpt": "Optimale Stabilität",
        "barrierMod": "Mäßige Belastung",
        "barrierHigh": "Hohe Überlastung",
        "barrierCrit": "Kritisches Barriere-Risiko",
        "barrierDescOpt": "Lipidintegrität des Stratum corneum bleibt erhalten. Vernachlässigbares TEWL-Risiko.",
        "barrierDescMod": "Gut verträglich bei gewöhnter Haut. Feuchtigkeitsbarriere und schrittweise Gewöhnung empfohlen.",
        "barrierDescHigh": "Erhebliche keratolytische Belastung. Hohes Risiko für Brennen, Rötungen und gestörten Säureschutzmantel.",
        "barrierDescCrit": "Akute Schädigung des Stratum corneum, Mikrorisse und schweres Risiko für Retinoid-/Säuredermatitis."
      },
      "matrix": {
        "title": "Paarweise Kompatibilitätsmatrix",
        "activeCol": "Wirkstoff",
        "legendComp": " Kompatibel / Synergistisch",
        "legendBuffer": " Zeitabstand Erforderlich",
        "legendConflict": " Konflikt / Nicht Mischen",
        "pills": {
          "synergistic": "synergistisch",
          "compatible": "kompatibel",
          "moderate": "mäßig",
          "high": "hoch",
          "critical": "Konflikt"
        }
      },
      "schedule": {
        "amTitle": "Morgen-Protokoll (AM-Routine)",
        "amStep1Title": "Sanfter Feuchtigkeitsreiniger",
        "amStep1Desc": "Entfernt nächtlichen Talg ohne die Hautbarriere anzugreifen.",
        "amFinalTitle": "Breitband-Sonnenschutz LSF 50+",
        "amFinalDesc": "Unverzichtbarer Abschlussschritt gegen UV-Photolyse und Wirkstoffoxidation.",
        "pmTitle": "Abend-Protokoll (PM-Routine)",
        "pmStep1Title": "Doppelreinigung (Balsam + Sanftes Waschgel)",
        "pmStep1Desc": "Entfernt Sonnencreme, Schmutz und Talg für optimale Wirkstoffpenetration.",
        "pmFinalTitle": "Ceramid- / Lipid-Barrierecreme",
        "pmFinalDesc": "Versiegelt das Stratum corneum mit physiologischen Lipiden zur Minimierung des nächtlichen TEWL.",
        "waitAcidAM": "15–20 Min. Wartezeit vor dem nächsten Schritt",
        "waitAcidPM": "15 Min. warten zur Neutralisierung des Säureschutzmantels"
      },
      "cycling": {
        "title": "Klinisches Skin-Cycling-Protokoll Empfohlen",
        "intro": "Mehrere hochwirksame nächtliche Wirkstoffe wurden ausgewählt. Die gleichzeitige Anwendung führt zu kumulativer Barriereschädigung. Wenden Sie diesen 3-Nächte-Zyklus an:",
        "night1Title": "Nacht 1: Chemisches Peeling",
        "night1Desc": "Sanftes chemisches Peeling (AHA/BHA) zur Entfernung abgestorbener Hautzellen. Danach neutraler Feuchtigkeitsspender.",
        "night2Title": "Nacht 2: Zelluläres Retinoid",
        "night2Desc": "Retinol auf gereinigte, trockene Haut auftragen. Mit Niacinamid puffern oder direkt eincremen, um Reizungen zu minimieren.",
        "night3Title": "Nacht 3: Barriereregeneration",
        "night3Desc": "Keine Säuren oder Retinoide. Fokus rein auf Peptide (Syn-Coll, SYN-AKE, GHK-Cu) und Beta-Glucan."
      },
      "mechanisms": {
        "title": "Detaillierte Klinische Wirkmechanismen & Lösungen",
        "strategyLabel": "Dermatologische Strategie: "
      },
      "defaultRules": {
        "highTitle": "Deutliche Divergenz des pH-Mikromilieus",
        "highMech": "Optimale pH-Bereiche weichen deutlich voneinander ab ({a} bei pH {pa} vs. {b} bei pH {pb}). Gleichzeitiges Auftragen führt zu Neutralisation oder verminderter Bioverfügbarkeit.",
        "highRes": "Auf Morgen- und Abendroutine aufteilen oder 20 Minuten Abstand halten.",
        "modTitle": "Mäßige pH-Wert-Abweichung",
        "modMech": "Leichter Unterschied in der Formel-Ionisation. Direktes Schichten kann bei empfindlicher Haut leichtes Brennen hervorrufen.",
        "modRes": "Dünnflüssigste Textur zuerst auftragen und vor der nächsten Schicht vollständig einziehen lassen.",
        "compTitle": "Physiologische pH-Harmonie",
        "compMech": "Beide Wirkstoffe weisen kompatible Ionisationskurven und physiologische pH-Stabilität ohne molekulare Konflikte auf.",
        "compRes": "Kann bedenkenlos nacheinander in derselben Routine aufgetragen werden."
      }
    },
    "rules": {
      "alpha-arbutin|glycolic-acid": {        "title": "Instabilität der glykosidischen Etherbindung",        "mechanism": "Niedriger pH beschleunigt die langsame Hydrolyse von Alpha-Arbutin zu freiem Hydrochinon. Kurzzeitige Toleranz ist möglich, doch langes Mischen in Lösung degradiert beide Wirkstoffe.",        "resolution": "Glykolsäure auftragen, 20 Minuten warten, bis sich der Haut-pH normalisiert, dann Alpha-Arbutin auftragen."      },
      "alpha-arbutin|l-ascorbic-acid": {        "title": "Vorsicht: Hydrolyse der glykosidischen Etherbindung",        "mechanism": "Alpha-Arbutin ist bei pH 4.9–6.5 stabil. Anhaltend saure, wässrige Umgebungen (pH < 3.5) können mit der Zeit die hydrolytische Zersetzung zu freiem Hydrochinon katalysieren.",        "resolution": "15 Minuten einziehen lassen, bevor Alpha-Arbutin aufgetragen wird, oder Alpha-Arbutin abends verwenden."      },
      "alpha-arbutin|niacinamide": {        "title": "Doppelte Unterbrechung der Pigmentbildung",        "mechanism": "Alpha-Arbutin stoppt direkt die Tyrosinase-Katalyse; Niacinamid hemmt den Melanosomen-Transfer von Melanozyten zu Keratinozyten. Maximiert den Abbau von Hyperpigmentierung.",        "resolution": "Morgens oder abends zusammen auftragen; ideal für dunkle Flecken und Melasma."      },
      "alpha-arbutin|retinol": {        "title": "Doppelter Abbau der Hyperpigmentierung",        "mechanism": "Alpha-Arbutin stoppt die Melanin-Synthese über die Tyrosinase, während Retinol die Abschuppung pigmentierter Keratinozyten beschleunigt.",        "resolution": "Alpha-Arbutin-Serum auftragen, danach abends Retinol; tagsüber stets konsequent SPF 50 verwenden."      },
      "alpha-arbutin|syn-coll": {        "title": "Harmonie von Kollagendichte und Strahlkraft",        "mechanism": "Kein biologischer Konflikt. Alpha-Arbutin gleicht den Teint aus, während Syn-Coll die Elastizität der Dermis wiederherstellt.",        "resolution": "In Morgen- oder Abendroutinen kombinieren."      },
      "azelaic-acid|copper-peptides": {        "title": "Dikarboxylische Chelatisierung von Cu(II)-Ionen",        "mechanism": "Azelainsäure zeigt Affinität zu zweiwertigen Metallkationen und kann das Cu(II) aus dem GHK-Tripeptidgerüst herauslösen.",        "resolution": "Routinen trennen: Azelainsäure morgens, Kupfer-Peptide abends."      },
      "azelaic-acid|l-ascorbic-acid": {        "title": "Doppelantioxidans & Tyrosinase-Hemmung",        "mechanism": "Azelainsäure wirkt gut bei milder Säure (pH 4.0–5.5) und oxidiert Ascorbinsäure nicht. Hochwirksame Doppelwirkung gegen hartnäckiges Melasma.",        "resolution": "Zuerst Vitamin C (L-AA) auftragen (dünnere wässrige Lösung), danach die Azelainsäure-Suspension."      },
      "azelaic-acid|niacinamide": {        "title": "Starkes Duo gegen Rötungen & Unreinheiten",        "mechanism": "Azelainsäure unterdrückt Cutibacterium acnes und Rötungen, während Niacinamid die Lipidlamellen der Barriere stärkt und Zytokinkaskaden beruhigt.",        "resolution": "Zuerst Niacinamid-Serum, danach die Azelainsäure-Creme auftragen."      },
      "azelaic-acid|retinol": {        "title": "Doppelter Zellturnover & Brenngefahr",        "mechanism": "Beide Wirkstoffe steigern epidermale Umgestaltung und Zellerneuerung. Die Kombination bei reaktiver oder ungewohnter Haut kann Brennen und Trockenheit auslösen.",        "resolution": "Mit einer Feuchtigkeitscreme puffern oder Azelainsäure morgens und Retinol abends anwenden."      },
      "beta-glucan|copper-peptides": {        "title": "Beschleunigtes Gewebe-Remodeling & Reparatur",        "mechanism": "Beta-Glucan stimuliert die Phagozytose durch Makrophagen, während GHK-Cu die Synthese von Glykosaminoglykanen und Kollagen anregt. Ideal für Heilung und Narbenregeneration.",        "resolution": "Zuerst Kupfer-Peptide, danach Beta-Glucan (Dermefface FX7®) auftragen."      },
      "beta-glucan|glycolic-acid": {        "title": "Barriere-Erholung & Beruhigung nach Säure",        "mechanism": "Beta-Glucan dämpft säurebedingtes Erythem und hydratisiert neu freigelegte Korneozyten, ohne die keratolytische Exfoliation zu mindern.",        "resolution": "Glykolsäure auftragen; 15 Minuten warten; danach Beta-Glucan (Dermefface FX7®)."      },
      "beta-glucan|niacinamide": {        "title": "Intensive Stärkung der Hautbarriere",        "mechanism": "Niacinamid fördert die endogene Ceramid-Synthese; Beta-Glucan bildet eine wasserbindende Schutzmatrix über dem Stratum corneum.",        "resolution": "Universeller Barrieren-Regenerator. Für alle Hauttypen geeignet."      },
      "beta-glucan|retinol": {        "title": "Makrophagen-Erholung & Hydrationsschild",        "mechanism": "Beta-Glucan spendet tiefe dermale Feuchtigkeit und mildert den retinoidbedingten transepidermalen Wasserverlust, ohne die zelluläre Differenzierung zu stören.",        "resolution": "Zuerst Retinol auftragen; sofort mit Beta-Glucan (Dermefface FX7®) versiegeln, um Xerose vorzubeugen."      },
      "beta-glucan|salicylic-acid": {        "title": "Hydrationspolster für die BHA-Keratolyse",        "mechanism": "Beta-Glucan verhindert die für Salicylsäure-Behandlungen typische Schuppung und Spannung.",        "resolution": "Beta-Glucan direkt nach dem Einziehen des BHA auftragen."      },
      "beta-glucan|syn-coll": {        "title": "Fibroblasten-Proliferation & EZM-Remodeling",        "mechanism": "Beta-Glucan beschleunigt die makrophagenvermittelte Wundheilung, während Syn-Coll die basale Pro-Kollagen-mRNA-Transkription stimuliert.",        "resolution": "Ideales regeneratives Paar: morgens oder abends kombinieren."      },
      "copper-peptides|niacinamide": {        "title": "Barriere-Lipidsynthese & EZM-Erneuerung",        "mechanism": "Beide Wirkstoffe wirken harmonisch bei physiologischem pH 5.5–6.5. Niacinamid regeneriert Ceramide, während GHK-Cu die tiefe Dermis repariert.",        "resolution": "In der Abendroutine nach Textur auftragen (von dünn zu dick)."      },
      "copper-peptides|salicylic-acid": {        "title": "BHA-Chelatisierung & Tripeptid-Spaltung",        "mechanism": "Salicylsäure destabilisiert Kupferpeptid-Komplexe durch kompetitive Chelatisierung im sauren pH und neutralisiert die Peptidwirkung.",        "resolution": "Strikte Trennung auf alternierende Abende."      },
      "copper-peptides|syn-ake": {        "title": "Remodeling & Neuromuskuläre Entspannung",        "mechanism": "Kein biologischer Konflikt. SYN-AKE zielt auf Acetylcholinrezeptoren, während Kupfer-Peptide das Matrix-Remodeling bei pH 5.5–6.5 orchestrieren.",        "resolution": "Kompatibel in derselben Abendroutine."      },
      "copper-peptides|syn-coll": {        "title": "Kollagensynthese mit Doppel-Peptiden",        "mechanism": "Beide Peptide sind bei nahezu neutralem pH kompatibel und wirken über unterschiedliche, nicht konkurrierende Synthesewege der extrazellulären Matrix.",        "resolution": "Kompatibel in derselben Abendroutine."      },
      "glycolic-acid|niacinamide": {        "title": "Säurebedingtes Erröten & Komplexbildung",        "mechanism": "Ein drastischer pH-Abfall kann Niacinamid teilweise zu Nikotinsäure hydrolysieren und vorübergehende Gesichts-Vasodilatation bei rosazeaneiger Haut auslösen.",        "resolution": "20 Minuten Abstand halten oder Niacinamid morgens und Glykolsäure abends anwenden."      },
      "glycolic-acid|salicylic-acid": {        "title": "Gefahr der Multi-Säure-Überexfoliation",        "mechanism": "Die Kombination einer Alpha-Hydroxysäure mit einer Beta-Hydroxysäure ruft tiefe Desquamation hervor, denaturiert Stratum-corneum-Enzyme und entfettet die Barriere.",        "resolution": "Im Wechsel: Glykolsäure für die Oberflächenstruktur (Nacht 1), Salicylsäure für Porenverstopfung (Nacht 2)."      },
      "glycolic-acid|syn-ake": {        "title": "Säurebedingte Denaturierung des Neuropeptids",        "mechanism": "Die aktive Diaminobutyryl-Kette von SYN-AKE wird in starken Glykolsäure-Mikroumgebungen chemisch abgebaut.",        "resolution": "12 Stunden trennen (AHA abends, SYN-AKE morgens) oder Abende alternieren."      },
      "glycolic-acid|syn-coll": {        "title": "Säurehydrolyse des Palmitoyl-Tripeptids",        "mechanism": "Glykolsäure (pH < 3.8) hydrolysiert das Amid-Rückgrat von Palmitoyl Tripeptid-5 und zerstört die TGF-β-Kollagenstimulation, bevor sie eindringt.",        "resolution": "Glykolsäure abends verwenden; Syn-Coll (Kollagen Intensiv™) für morgens oder säurefreie Abende reservieren."      },
      "l-ascorbic-acid|niacinamide": {        "title": "Wasserstoffbrücken-Komplex & Nikotin-Flush",        "mechanism": "Die direkte flüssige Co-Applikation kann einen reversiblen 1:1-wasserstoffbrückengebundenen Nicotinamid-Ascorbat-Komplex bilden. Bei hoher Säure und Wärme kann minimale Hydrolyse zu Nikotinsäure vorübergehende mikrovaskuläre Gesichtsrötungen auslösen.",        "resolution": "Zuerst Vitamin C (L-AA) auftragen, 15 Minuten warten, dann Niacinamid; oder trennen in Morgen (L-AA) und Abend (Niacinamid)."      },
      "niacinamide|salicylic-acid": {        "title": "Duo für klare Poren & normale Talgproduktion",        "mechanism": "Salicylsäure reinigt die Follikelporen von Talg, während Niacinamid die Talgexkretionsrate senkt und die Barriere stärkt.",        "resolution": "Zuerst Salicylsäure auftragen, 10 Minuten warten, dann Niacinamid auftragen."      },
      "retinol|syn-ake": {        "title": "Neutralisierung statischer & dynamischer Falten",        "mechanism": "SYN-AKE dämpft die dynamische Gesichtsmuskelspannung, während Retinol die dermale Matrix verdichtet und statische oberflächliche Fältchen glättet.",        "resolution": "SYN-AKE-Serum (Synevra UltraLift™) auf die Mimikbereiche auftragen; danach Retinol im gesamten Gesicht."      },
      "retinol|syn-coll": {        "title": "Umfassende Stimulation der EZM-Architektur",        "mechanism": "Palmitoyl Tripeptid-5 initiiert die TGF-β-Kollagensynthese, während Retinol den Kollagenase-MMP-1-Abbau reguliert. Perfekte komplementäre Anti-Aging-Harmonie.",        "resolution": "Syn-Coll Creme (Kollagen Intensiv™) abends direkt nach dem Retinol auftragen."      },
      "salicylic-acid|syn-ake": {        "title": "Neuropeptid-Abbau durch niedrigen pH",        "mechanism": "Das SYN-AKE-Dipeptid verliert an Stabilität, wenn es unter Leave-on-Salicylsäure-Lösungen aufgetragen wird.",        "resolution": "Routinen trennen: SYN-AKE (Synevra UltraLift™) morgens; BHA abends."      },
      "salicylic-acid|syn-coll": {        "title": "Lipophile Penetration & Peptid-Störung",        "mechanism": "Der niedrige pH des BHA destabilisiert Palmitoyl Tripeptid-5 in topischen Emulsionen.",        "resolution": "BHA abends verwenden; Syn-Coll (Kollagen Intensiv™) morgens oder an alternierenden Abenden."      },
      "copper-peptides|l-ascorbic-acid": {
        "title": "Redox-Oxidation & Radikal-Inaktivierung",
        "mechanism": "L-Ascorbinsäure fungiert als Elektronendonor und reduziert Cu(II) in GHK-Cu rasch zu Cu(I). Dies löst eine Fenton-Redoxreaktion aus, die Vitamin C inaktiviert und den Peptid-Kupfer-Komplex zerstört.",
        "resolution": "Strikte Trennung. L-Ascorbinsäure morgens zum Schutz auftragen; Kupfer-Peptide für die nächtliche Regeneration reservieren."
      },
      "l-ascorbic-acid|retinol": {
        "title": "pH-Inversion & Enzym-Hemmung",
        "mechanism": "L-Ascorbinsäure erfordert sauren pH (<3.5), während Retinol-Umwandlungsenzyme bei pH 5.5–6.5 optimal arbeiten. Gemeinsame Schichtung hemmt die Bioverfügbarkeit und reizt die Haut.",
        "resolution": "AM/PM-Trennung. L-Ascorbinsäure morgens mit Sonnenschutz; Retinol strikt abends anwenden."
      },
      "glycolic-acid|l-ascorbic-acid": {
        "title": "Hyper-Ansäuerung des Säureschutzmantels",
        "mechanism": "Die gleichzeitige Anwendung zweier Säuren mit niedrigem pH (2.8–3.5) senkt den pH-Wert weit unter den physiologischen Puffer (4.7–5.5), schädigt die Lipidmatrix und erzeugt Brennen.",
        "resolution": "Routinen trennen. L-Ascorbinsäure morgens; Glykolsäure abends an retinoidfreien Abenden."
      },
      "l-ascorbic-acid|salicylic-acid": {
        "title": "Kumulative Säure-Entfettung & Schuppung",
        "mechanism": "Hydrophile L-AA und lipophile BHA entfetten die Hautbarriere doppelt. Dies provoziert akutes Brennen und Schuppenbildung.",
        "resolution": "L-AA morgens verwenden; Salicylsäure abends oder als abwaschbares Reinigungsprodukt."
      },
      "l-ascorbic-acid|syn-coll": {
        "title": "Säurekatalysierte Peptidbindungs-Spaltung",
        "mechanism": "Palmitoyl Tripeptid-5 benötigt physiologischen pH (5.0–6.5). Niedriger pH durch L-AA (<3.5) riskiert die Spaltung der Peptidbindung vor Bindung an TGF-β-Rezeptoren.",
        "resolution": "L-AA morgens; Syn-Coll Creme (Kollagen Intensiv™) abends oder mit 20 Min. Abstand auftragen."
      },
      "l-ascorbic-acid|syn-ake": {
        "title": "Neuropeptid-Denaturierung im Niedrig-pH",
        "mechanism": "Die Dipeptid-Struktur von SYN-AKE hydrolysiert in ungepufferten Säuren (pH < 3.5), wodurch die Bindungsaffinität an Acetylcholinrezeptoren verloren geht.",
        "resolution": "L-AA morgens; SYN-AKE (Synevra UltraLift™) abends oder nach 20 Minuten Einziehzeit auftragen."
      },
      "glycolic-acid|retinol": {
        "title": "Korneodesmosomen-Auflösung & Retinoid-Dermatitis",
        "mechanism": "Glykolsäure löst Desmosomen auf, während Retinol die Zellteilung beschleunigt. Gleichzeitige Gabe führt zu Barrierezusammenbruch und starker Schuppung.",
        "resolution": "Skin Cycling. Glykolsäure Nacht 1 (Peeling), Retinol Nacht 2, Erholung/Hydratation Nächte 3–4."
      },
      "retinol|salicylic-acid": {
        "title": "Interzelluläre Lipidverarmung & Barriereschaden",
        "mechanism": "BHA löst follikuläre Lipide und Retinol beschleunigt den Keratinozyten-Umsatz. Ungeschützte Kombination schwächt das Stratum corneum.",
        "resolution": "Abende abwechseln oder BHA morgens mit LSF 50+ und Retinol abends verwenden."
      },
      "copper-peptides|retinol": {
        "title": "Gegensätzlicher metabolischer Fibroblasten-Stimulus",
        "mechanism": "Kupfer-Peptide signalisieren dermale Matrix-Remodellierung, während Retinol die Keratinozyten-Differenzierung forciert. Kann empfindliche Haut überlasten.",
        "resolution": "Nächte abwechseln oder mit einer Ceramid-Barrierecreme puffern."
      },
      "copper-peptides|glycolic-acid": {
        "title": "Säurehydrolyse von Kupferchelaten",
        "mechanism": "Niedriger pH von Glykolsäure zerstört den Kupfer-GHK-Komplex und setzt freie Kupferionen frei, die Lipidoxidation begünstigen.",
        "resolution": "Strikte Trennung. Glykolsäure an Peeling-Abenden, Kupfer-Peptide an Erholungsabenden."
      },
      "beta-glucan|l-ascorbic-acid": {
        "title": "Antioxidans-Siegel & Beruhigender Schutzschild",
        "mechanism": "Beta-Glucan bildet ein kolloidales Netz, das Ascorbinsäure einschließt und Säure-Erytheme über Makrophagen-Aktivierung dämpft.",
        "resolution": "L-AA zuerst auftragen; direkt mit Beta-Glucan (Dermefface FX7®) versiegeln."
      },
      "niacinamide|retinol": {
        "title": "Barriere-Synergie & Milderung der Retinisierung",
        "mechanism": "Niacinamid kurbelt die Synthese hauteigener Ceramide an und bildet einen biologischen Puffer gegen Retinoid-Reizungen.",
        "resolution": "Niacinamid vor oder zusammen mit Retinol auftragen, um Rötungen und Trockenheit zu minimieren."
      },
      "syn-ake|syn-coll": {
        "title": "Duale Peptid-Synergie: Mimik & Kollagenmatrix",
        "mechanism": "SYN-AKE entspannt mimische Kontraktionen während Syn-Coll die Kollagensynthese anregt. Perfekte Ergänzung ohne molekulare Konflikte.",
        "resolution": "Hervorragende Kombination. SYN-AKE Serum zuerst, gefolgt von Syn-Coll Creme."
      }
    }
  },
  "fr": {
    "ingredients": {
      "l-ascorbic-acid": {
        "name": "Acide L-Ascorbique (Vitamine C Pure)",
        "shortName": "Vitamine C (L-AA)",
        "category": "Antioxydant Direct / Acide",
        "vehicle": "Solution aqueuse",
        "summary": "Antioxydant puissant stimulant la synthèse de collagène. Nécessite un pH acide (<3.5) pour la pénétration cutanée; sensible à l'oxydation."
      },
      "syn-coll": {
        "name": "Palmitoyl Tripeptide-5 (Syn-Coll®)",
        "shortName": "Peptide Syn-Coll®",
        "category": "Peptide Signal / Booster de Collagène",
        "vehicle": "Émulsion / Sérum crème",
        "summary": "Peptide signal biomimétique du TGF-β conçu pour stimuler la synthèse de collagène de type I et II. Sensible à l'hydrolyse acide."
      },
      "syn-ake": {
        "name": "SYN-AKE® (Dérivé Dipeptidique)",
        "shortName": "Neuropeptide SYN-AKE®",
        "category": "Neuropeptide / Lisseur d'Expression",
        "vehicle": "Sérum aqueux / Gel",
        "summary": "Antagoniste réversible des récepteurs nicotiniques musculaires de l'acétylcholine. Relaxe les contractions d'expression; instable à pH bas."
      },
      "alpha-arbutin": {
        "name": "Alpha-Arbutine (α-Arbutine)",
        "shortName": "Alpha-Arbutine",
        "category": "Inhibiteur de Mélanine / Glucoside",
        "vehicle": "Sérum à base d'eau",
        "summary": "Glucoside pur d'hydroquinone bloquant l'activité de la tyrosinase. La liaison éther s'hydrolyse en hydroquinone libre en milieu fortement acide."
      },
      "retinol": {
        "name": "Rétinol (Vitamine A)",
        "shortName": "Rétinol (Vit A)",
        "category": "Rétinoïde / Renouvellement Cellulaire",
        "vehicle": "Suspension lipidique / Émulsion",
        "summary": "Agoniste des récepteurs nucléaires de l'acide rétinoïque stimulant le renouvellement cellulaire. Photolabile (soir uniquement); potentiel d'irritation élevé."
      },
      "glycolic-acid": {
        "name": "Acide Glycolique (AHA)",
        "shortName": "Acide Glycolique",
        "category": "Acide Alpha-Hydroxylé / Exfoliant",
        "vehicle": "Solution aqueuse",
        "summary": "AHA de plus faible poids moléculaire. Dissout les cornéodesmosomes. Abaisse le pH cutané; photosensibilisant et irritant avec les rétinoïdes."
      },
      "salicylic-acid": {
        "name": "Acide Salicylique (BHA)",
        "shortName": "Acide Salicylique (BHA)",
        "category": "Acide Bêta-Hydroxylé / Kératolytique",
        "vehicle": "Solution hydro-alcoolique / Aqueuse",
        "summary": "Acide kératolytique lipophile pénétrant les follicules sébacés. Risque d'assèchement aigu de la barrière cutanée en association avec les rétinoïdes."
      },
      "niacinamide": {
        "name": "Niacinamide (Vitamine B3)",
        "shortName": "Niacinamide (B3)",
        "category": "Réparation de Barrière / Bloqueur de Mélanosomes",
        "vehicle": "Sérum à base d'eau",
        "summary": "Stimule la synthèse des céramides, régule le sébum et bloque le transfert des mélanosomes. Très polyvalent; atténue les irritations du rétinol."
      },
      "copper-peptides": {
        "name": "Cuivre Tripeptide-1 (GHK-Cu)",
        "shortName": "Peptides de Cuivre",
        "category": "Tripeptide Remodelant / Complexe Métallique",
        "vehicle": "Sérum aqueux",
        "summary": "Tripeptide coordonné au cuivre pour le remodelage de la matrice dermique. Désactivé rapidement par les acides à pH bas et les antioxydants réducteurs."
      },
      "azelaic-acid": {
        "name": "Acide Azélaïque",
        "shortName": "Acide Azélaïque",
        "category": "Acide Dicarboxylique / Anti-Inflammatoire",
        "vehicle": "Suspension / Crème légère",
        "summary": "Acide dicarboxylique ciblant la tyrosinase et Cutibacterium acnes. Très stable et bien toléré, mais chélate les ions métalliques."
      },
      "beta-glucan": {
        "name": "Bêta-Glucane (Symglucan®)",
        "shortName": "Bêta-Glucane",
        "category": "Polysaccharide / Bouclier Barrière",
        "vehicle": "Gel aqueux / Barrière hydratante",
        "summary": "Polysaccharide d'avoine de haut poids moléculaire. 20% plus hydratant que l'acide hyaluronique; stimule les macrophages et apaise les rougeurs."
      }
    },
    "ui": {
      "counter": {
        "empty": " Sélection : 0 sur 6 (Choisissez au moins 2 actifs)",
        "one": " Sélection : 1 sur 6 (Ajoutez 1 actif supplémentaire)",
        "max": " Sélection : 6 sur 6 (Capacité maximale)",
        "valid": " Sélection : {count} sur 6 (Prêt pour l'analyse)",
        "limitNotice": " Limite maximale de 6 actifs atteinte"
      },
      "emptyState": {
        "zeroTitle": "Sélectionnez 2 à 6 Actifs Ci-Dessus pour Commencer l'Analyse",
        "zeroDesc": "Choisissez des actifs dans la grille ou cliquez sur un profil clinique pour évaluer la stabilité du pH, les risques de neutralisation et le protocole matin/soir.",
        "oneTitle": "Sélectionnez au Moins 1 Actif Supplémentaire",
        "oneDesc": "La matrice évalue les interactions par paires. Ajoutez un autre actif pour calculer la compatibilité biochimique."
      },
      "metrics": {
        "phTitle": " Compatibilité de pH",
        "phFavorable": "Les courbes d'ionisation s'alignent favorablement pour la pénétration cutanée.",
        "phClash": "Divergence importante de pH. Séparation obligatoire.",
        "deactTitle": " Risque de Neutralisation",
        "riskLow": "Faible",
        "riskMod": "Modéré",
        "riskHigh": "Élevé",
        "riskCrit": "Critique",
        "deactDescLow": "Risque minimal de collision moléculaire. Les actifs conservent toute leur efficacité.",
        "deactDescMod": "Légère complexation temporaire ou risque de rougeurs. Espacement conseillé.",
        "deactDescHigh": "Conflit important de pH ou voies enzymatiques concurrentes. Séparation nécessaire.",
        "deactDescCrit": "Neutralisation chimique directe, réaction redox de Fenton ou rupture des liaisons peptidiques détectée.",
        "barrierTitle": " Surcharge de la Barrière",
        "barrierOpt": "Stabilité Optimale",
        "barrierMod": "Charge Modérée",
        "barrierHigh": "Surcharge Élevée",
        "barrierCrit": "Risque Critique pour la Barrière",
        "barrierDescOpt": "Intégrité lipidique de la couche cornée préservée. Risque négligeable de PIE.",
        "barrierDescMod": "Tolérable sur peau habituée. Nécessite des soins hydratants tampons et une introduction progressive.",
        "barrierDescHigh": "Charge kératolytique importante. Risque élevé de picotements, rougeurs et altération du film hydrolipidique.",
        "barrierDescCrit": "Altération aiguë de la couche cornée, micro-fissures et risque sévère de dermite aux rétinoïdes/acides."
      },
      "matrix": {
        "title": "Matrice de Compatibilité par Paires",
        "activeCol": "Actif",
        "legendComp": " Compatible / Synergique",
        "legendBuffer": " Espacement Temporel Requis",
        "legendConflict": " Conflit / Ne Pas Mélanger",
        "pills": {
          "synergistic": "synergique",
          "compatible": "compatible",
          "moderate": "modéré",
          "high": "élevé",
          "critical": "Conflit"
        }
      },
      "schedule": {
        "amTitle": "Protocole du Matin (Routine AM)",
        "amStep1Title": "Nettoyant Doux Hydratant",
        "amStep1Desc": "Élimine le sébum nocturne sans altérer la barrière cutanée.",
        "amFinalTitle": "Protection Solaire SPF 50+ Large Spectre",
        "amFinalDesc": "Étape finale indispensable pour prévenir la photolyse UV et l'oxydation des actifs.",
        "pmTitle": "Protocole du Soir (Routine PM)",
        "pmStep1Title": "Double Nettoyage (Baume + Nettoyant Doux)",
        "pmStep1Desc": "Élimine filtre solaire, pollution et sébum pour garantir la pénétration des actifs.",
        "pmFinalTitle": "Crème Barrière aux Céramides & Lipides",
        "pmFinalDesc": "Scelle la couche cornée avec des lipides physiologiques pour réduire la perte insensible en eau.",
        "waitAcidAM": "Attendre 15 à 20 min avant l'étape suivante",
        "waitAcidPM": "Laisser poser 15 min pour tamponner le film hydrolipidique"
      },
      "cycling": {
        "title": "Protocole de Skin Cycling Clinique Recommandé",
        "intro": "Plusieurs actifs nocturnes puissants ont été détectés. Les superposer le même soir provoque une dégradation cumulative de la barrière. Adoptez ce cycle rotatif sur 3 soirs :",
        "night1Title": "Soir 1 : Exfoliation Chimique",
        "night1Desc": "Appliquez un exfoliant doux (AHA/BHA) pour éliminer les cellules mortes. Complétez avec un hydratant neutre.",
        "night2Title": "Soir 2 : Rétinoïde Cellulaire",
        "night2Desc": "Appliquez le rétinol sur peau propre et sèche. Tamponnez avec la niacinamide ou hydratez immédiatement pour limiter la rétinisation.",
        "night3Title": "Soir 3 : Réparation de la Barrière",
        "night3Desc": "Zéro acide exfoliant ni rétinoïde. Concentrez-vous sur les Peptides (Syn-Coll, SYN-AKE, GHK-Cu) et le Bêta-Glucane."
      },
      "mechanisms": {
        "title": "Analyse Approfondie des Mécanismes Cliniques & Résolutions",
        "strategyLabel": "Stratégie Dermatologique : "
      },
      "defaultRules": {
        "highTitle": "Divergence Majeure du Microenvironnement de pH",
        "highMech": "Les zones optimales de pH divergent fortement ({a} à pH {pa} contre {b} à pH {pb}). L'application simultanée neutralise les actifs ou réduit leur biodisponibilité.",
        "highRes": "Séparez entre matin et soir, ou espacez de 20 minutes.",
        "modTitle": "Écart Modéré de Plage de pH",
        "modMech": "Légère différence d'ionisation des formules. La superposition directe peut causer de légers picotements sur peaux réactives.",
        "modRes": "Appliquez d'abord la texture la plus fluide et laissez sécher avant la couche suivante.",
        "compTitle": "Harmonie Physiologique du pH",
        "compMech": "Les deux ingrédients conservent des courbes d'ionisation compatibles et une stabilité physiologique de pH sans interférence moléculaire.",
        "compRes": "Application consécutive sûre dans la même routine."
      }
    },
    "rules": {
      "alpha-arbutin|glycolic-acid": {        "title": "Instabilité de la Liaison Éther Glycosidique",        "mechanism": "Un pH bas accélère l'hydrolyse lente de l'alpha-arbutine en hydroquinone libre. Une tolérance à court terme est possible, mais un mélange prolongé en solution dégrade les deux actifs.",        "resolution": "Appliquez l'acide glycolique, attendez 20 minutes que le pH cutané se normalise, puis appliquez l'alpha-arbutine."      },
      "alpha-arbutin|l-ascorbic-acid": {        "title": "Précaution : Hydrolyse de la Liaison Éther Glycosidique",        "mechanism": "L'alpha-arbutine est stable à pH 4.9–6.5. Un milieu aqueux durablement acide (pH < 3.5) peut catalyser sa décomposition hydrolytique en hydroquinone libre avec le temps.",        "resolution": "Laisser agir la vitamine C (L-AA) 15 minutes avant d'appliquer l'alpha-arbutine, ou utiliser l'alpha-arbutine le soir."      },
      "alpha-arbutin|niacinamide": {        "title": "Interception Double de la Pigmentation",        "mechanism": "L'alpha-arbutine bloque directement l'action catalytique de la tyrosinase ; la niacinamide stoppe le transfert des mélanosomes des mélanocytes vers les kératinocytes. Maximise l'atténuation de l'hyperpigmentation.",        "resolution": "À appliquer ensemble matin ou soir ; idéal pour les taches brunes et le melasma."      },
      "alpha-arbutin|retinol": {        "title": "Élimination Double de l'Hyperpigmentation",        "mechanism": "L'alpha-arbutine stoppe la synthèse de mélanine par la tyrosinase tandis que le rétinol accélère l'élimination des kératinocytes pigmentés.",        "resolution": "Appliquez le sérum d'alpha-arbutine, puis le rétinol le soir ; maintenez toujours un SPF 50 strict le jour."      },
      "alpha-arbutin|syn-coll": {        "title": "Harmonie Densité de Collagène & Éclat",        "mechanism": "Aucun conflit biologique. L'alpha-arbutine uniformise le teint tandis que le Syn-Coll restaure l'élasticité du derme.",        "resolution": "À combiner dans les routines du matin ou du soir."      },
      "azelaic-acid|copper-peptides": {        "title": "Chélation Dicarboxylique des Ions Cu(II)",        "mechanism": "L'acide azélaïque présente une affinité pour les cations métalliques divalents et peut extraire le Cu(II) du squelette tripeptidique GHK.",        "resolution": "Routines séparées : acide azélaïque le matin, peptides de cuivre le soir."      },
      "azelaic-acid|l-ascorbic-acid": {        "title": "Antioxydant Double & Inhibition de la Tyrosinase",        "mechanism": "L'acide azélaïque fonctionne bien en acidité douce (pH 4.0–5.5) et n'oxyde pas l'acide ascorbique. Éclaircissement double action très efficace contre le melasma tenace.",        "resolution": "Appliquez d'abord la vitamine C (L-AA) (solution aqueuse plus fluide), puis la suspension d'acide azélaïque."      },
      "azelaic-acid|niacinamide": {        "title": "Duo Puissant Anti-Rougeurs & Anti-Imperfections",        "mechanism": "L'acide azélaïque supprime Cutibacterium acnes et les rougeurs, tandis que la niacinamide renforce les lamelles lipidiques de la barrière et apaise les cascades de cytokines.",        "resolution": "Appliquez d'abord le sérum de niacinamide, puis la crème d'acide azélaïque."      },
      "azelaic-acid|retinol": {        "title": "Renouvellement Double & Risque de Picotements",        "mechanism": "Les deux actifs augmentent le remodelage épidermique et le renouvellement cellulaire. Les combiner sur une peau réactive ou non habituée peut provoquer picotements et sécheresse.",        "resolution": "Tamponner avec une crème hydratante, ou appliquer l'acide azélaïque le matin et le rétinol le soir."      },
      "beta-glucan|copper-peptides": {        "title": "Remodelage et Réparation Tissulaire Accélérés",        "mechanism": "Le bêta-glucane stimule la phagocytose des macrophages tandis que le GHK-Cu stimule la synthèse de glycosaminoglycanes et de collagène. Idéal pour la cicatrisation et la récupération des cicatrices.",        "resolution": "Appliquez d'abord les peptides de cuivre, puis le bêta-glucane (Dermefface FX7®)."      },
      "beta-glucan|glycolic-acid": {        "title": "Récupération de la Barrière & Apaisement Post-Acide",        "mechanism": "Le bêta-glucane atténue l'érythème induit par l'acide et hydrate les cornéocytes nouvellement exposés sans réduire l'exfoliation kératolytique.",        "resolution": "Appliquez l'acide glycolique ; attendez 15 minutes ; poursuivez avec le bêta-glucane (Dermefface FX7®)."      },
      "beta-glucan|niacinamide": {        "title": "Fortification Intensive de la Barrière Cutanée",        "mechanism": "La niacinamide favorise la synthèse endogène de céramides ; le bêta-glucane forme une matrice protectrice liant l'eau sur le stratum corneum.",        "resolution": "Régénérateur de barrière universel. Convient à tous les types de peau."      },
      "beta-glucan|retinol": {        "title": "Récupération Macrophagique & Bouclier d'Hydratation",        "mechanism": "Le bêta-glucane apporte une hydratation dermique profonde et atténue la perte en eau trans-épidermique induite par les rétinoïdes sans interférer avec la différenciation cellulaire.",        "resolution": "Appliquez d'abord le rétinol ; scellez immédiatement avec le bêta-glucane (Dermefface FX7®) pour prévenir la xérose."      },
      "beta-glucan|salicylic-acid": {        "title": "Coussin d'Hydratation pour la Kératolyse BHA",        "mechanism": "Le bêta-glucane prévient la desquamation et la sensation de tiraillement caractéristiques des traitements à l'acide salicylique.",        "resolution": "Appliquez le bêta-glucane juste après l'absorption du BHA."      },
      "beta-glucan|syn-coll": {        "title": "Prolifération des Fibroblastes & Remodelage de la MEC",        "mechanism": "Le bêta-glucane accélère la cicatrisation médiée par les macrophages tandis que le Syn-Coll stimule la transcription basale de l'ARNm du pro-collagène.",        "resolution": "Association régénérante idéale : à combiner matin ou soir."      },
      "copper-peptides|niacinamide": {        "title": "Synthèse des Lipides de la Barrière & Renouvellement de la MEC",        "mechanism": "Les deux actifs agissent en harmonie au pH physiologique 5.5–6.5. La niacinamide restaure les céramides tandis que le GHK-Cu répare le derme profond.",        "resolution": "À appliquer dans la routine du soir par ordre de texture (du plus fluide au plus riche)."      },
      "copper-peptides|salicylic-acid": {        "title": "Chélation par le BHA & Clivage du Tripeptide",        "mechanism": "L'acide salicylique déstabilise les complexes de peptides de cuivre par chélation compétitive en pH acide, neutralisant l'efficacité du peptide.",        "resolution": "Séparation stricte sur des soirs alternés."      },
      "copper-peptides|syn-ake": {        "title": "Remodelage & Relaxation Neuromusculaire",        "mechanism": "Aucun conflit biologique. Le SYN-AKE cible les récepteurs de l'acétylcholine tandis que les peptides de cuivre orchestrent le remodelage matriciel à pH 5.5–6.5.",        "resolution": "Compatibles dans la même routine du soir."      },
      "copper-peptides|syn-coll": {        "title": "Synthèse de Collagène par Double Peptide",        "mechanism": "Les deux peptides partagent une compatibilité de pH quasi neutre et agissent par des voies de synthèse de la matrice extracellulaire distinctes et non concurrentes.",        "resolution": "Compatibles dans la même routine du soir."      },
      "glycolic-acid|niacinamide": {        "title": "Rougeurs liées à l'Acide & Complexation",        "mechanism": "Une chute drastique du pH peut hydrolyser partiellement la niacinamide en acide nicotinique, provoquant une vasodilatation faciale transitoire sur les peaux sujettes à la rosacée.",        "resolution": "Espacer de 20 minutes, ou appliquer la niacinamide le matin et l'acide glycolique le soir."      },
      "glycolic-acid|salicylic-acid": {        "title": "Risque de Surexfoliation Multi-Acides",        "mechanism": "Superposer un alpha-hydroxy acide et un bêta-hydroxy acide provoque une desquamation profonde, dénature les enzymes du stratum corneum et décape les lipides de la barrière.",        "resolution": "En alternance : acide glycolique pour la texture de surface (Soir 1), acide salicylique pour la congestion des pores (Soir 2)."      },
      "glycolic-acid|syn-ake": {        "title": "Dénaturation Acide du Neuropeptide",        "mechanism": "La chaîne active diaminobutyroyle du SYN-AKE est chimiquement dégradée dans les micro-environnements d'acide glycolique concentré.",        "resolution": "Espacer de 12 heures (AHA le soir, SYN-AKE le matin) ou alterner les soirs."      },
      "glycolic-acid|syn-coll": {        "title": "Hydrolyse Acide du Tripeptide Palmitoyl",        "mechanism": "L'acide glycolique (pH < 3.8) hydrolyse le squelette amide du Palmitoyl Tripeptide-5 et détruit sa stimulation du collagène via TGF-β avant pénétration.",        "resolution": "Utilisez l'acide glycolique le soir ; réservez le Syn-Coll (Kollagen Intensiv™) au matin ou aux soirées sans acides."      },
      "l-ascorbic-acid|niacinamide": {        "title": "Complexe à Liaisons Hydrogène & Flush Nicotinique",        "mechanism": "La co-application liquide directe peut former un complexe réversible nicotinamide-ascorbate lié par ponts hydrogène 1:1. En cas d'acidité et de chaleur élevées, une hydrolyse résiduelle en acide nicotinique peut provoquer un flush facial microvasculaire temporaire.",        "resolution": "Appliquez d'abord la vitamine C (L-AA), attendez 15 minutes avant la niacinamide, ou séparez en matin (L-AA) et soir (niacinamide)."      },
      "niacinamide|salicylic-acid": {        "title": "Duo Purifiant pour les Pores & Normalisant de Sébum",        "mechanism": "L'acide salicylique nettoie les pores folliculaires du sébum tandis que la niacinamide réduit le taux d'excrétion sébacée et renforce la barrière.",        "resolution": "Appliquez d'abord l'acide salicylique, attendez 10 minutes, puis la niacinamide."      },
      "retinol|syn-ake": {        "title": "Neutralisation des Rides Statiques & Dynamiques",        "mechanism": "Le SYN-AKE atténue la tension musculaire faciale dynamique tandis que le rétinol densifie la matrice dermique pour effacer les ridules statiques de surface.",        "resolution": "Appliquez le sérum SYN-AKE (Synevra UltraLift™) sur les zones d'expression ; puis le rétinol sur l'ensemble du visage."      },
      "retinol|syn-coll": {        "title": "Stimulation Complète de l'Architecture de la MEC",        "mechanism": "Le Palmitoyl Tripeptide-5 initie la synthèse de collagène via TGF-β tandis que le rétinol régule la dégradation par la collagénase MMP-1. Harmonie anti-âge complémentaire parfaite.",        "resolution": "Appliquez la crème Syn-Coll (Kollagen Intensiv™) le soir immédiatement après le rétinol."      },
      "salicylic-acid|syn-ake": {        "title": "Dégradation du Neuropeptide à pH Bas",        "mechanism": "Le dipeptide SYN-AKE perd en stabilité lorsqu'il est appliqué sous des solutions d'acide salicylique sans rinçage.",        "resolution": "Routines séparées : SYN-AKE (Synevra UltraLift™) le matin ; BHA le soir."      },
      "salicylic-acid|syn-coll": {        "title": "Pénétration Lipophile & Perturbation du Peptide",        "mechanism": "Le pH bas du BHA déstabilise le Palmitoyl Tripeptide-5 dans les émulsions topiques.",        "resolution": "Utilisez le BHA le soir ; le Syn-Coll (Kollagen Intensiv™) le matin ou les soirs alternés."      },
      "copper-peptides|l-ascorbic-acid": {
        "title": "Oxydation Redox & Inactivation Radicalaire",
        "mechanism": "L'acide L-ascorbique cède des électrons et réduit le Cu(II) en Cu(I). Cela déclenche une réaction de Fenton qui inactive la vitamine C et dénature le complexe peptidique.",
        "resolution": "Séparation stricte. Acide L-ascorbique le matin en antioxydant ; peptides de cuivre le soir pour la réparation."
      },
      "l-ascorbic-acid|retinol": {
        "title": "Inversion de pH & Inhibition Enzymatique",
        "mechanism": "L'acide L-ascorbique requiert un pH acide (<3.5) pour pénétrer, tandis que les enzymes du rétinol fonctionnent à pH 5.5–6.5. La superposition bloque la conversion et crée des rougeurs.",
        "resolution": "Séparation Matin/Soir. Acide L-ascorbique le matin avec SPF ; rétinol strictement le soir à l'abri du soleil."
      },
      "glycolic-acid|l-ascorbic-acid": {
        "title": "Hyper-Acidification du Film Hydrolipidique",
        "mechanism": "L'association de deux acides directs à bas pH (2.8–3.5) abaisse le pH cutané bien en dessous du seuil physiologique (4.7–5.5), fragilisant la barrière et provoquant des brûlures.",
        "resolution": "Routines séparées. L-ascorbique le matin ; acide glycolique le soir sur des soirées sans rétinoïdes."
      },
      "l-ascorbic-acid|salicylic-acid": {
        "title": "Décapage Acide Cumulatif & Desquamation",
        "mechanism": "L'application simultanée de L-AA hydrophile et de BHA lipophile décape les lipides cutanés, provoquant picotements et desquamation intense.",
        "resolution": "L-AA le matin ; acide salicylique le soir ou sous forme de nettoyant à rincer."
      },
      "l-ascorbic-acid|syn-coll": {
        "title": "Clivage Peptidique par Catalyse Acide",
        "mechanism": "Le Palmitoyl Tripeptide-5 requiert un pH physiologique de 5.0–6.5. Le contact direct avec le L-AA à bas pH (<3.5) risque d'hydrolyser la liaison peptidique.",
        "resolution": "L-AA le matin ; crème Syn-Coll (Kollagen Intensiv™) le soir ou attendre 20 minutes entre les soins."
      },
      "l-ascorbic-acid|syn-ake": {
        "title": "Dénaturation du Neuropeptide à pH Acide",
        "mechanism": "La structure dipeptidique de SYN-AKE subit une hydrolyse dans les acides non tamponnés (pH < 3.5), neutralisant sa liaison aux récepteurs.",
        "resolution": "L-AA le matin ; SYN-AKE (Synevra UltraLift™) le soir ou après 20 minutes de pause."
      },
      "glycolic-acid|retinol": {
        "title": "Dissolution Cornéodesmosomale & Dermite au Rétinol",
        "mechanism": "L'acide glycolique dissout les desmosomes et le rétinol accélère la division cellulaire basale. L'application combinée crée une dégradation brutale de la barrière.",
        "resolution": "Protocole de Skin Cycling. Glycolique le Soir 1 (Exfoliation), Rétinol le Soir 2, Réparation Soirs 3–4."
      },
      "retinol|salicylic-acid": {
        "title": "Perte Lipidique Intercellulaire & Fragilisation de la Barrière",
        "mechanism": "Le BHA dissout les lipides folliculaires et le rétinol accélère le renouvellement. La combinaison directe affaiblit la couche cornée.",
        "resolution": "Alterner les soirs ou appliquer le BHA le matin avec SPF 50+ et le rétinol le soir."
      },
      "copper-peptides|retinol": {
        "title": "Signaux Métaboliques Opposés sur les Fibroblastes",
        "mechanism": "Les peptides de cuivre stimulent le remodelage dermique alors que le rétinol force la différenciation des kératinocytes. Risque de surcharge sur peau réactive.",
        "resolution": "Alterner les soirs ou tamponner avec une crème barrière aux céramides."
      },
      "copper-peptides|glycolic-acid": {
        "title": "Hydrolyse Acide des Chélates de Cuivre",
        "mechanism": "Le pH acide de l'acide glycolique dissocie le complexe cuivre-GHK, libérant des ions cuivre pro-oxydants.",
        "resolution": "Séparation stricte. Acide glycolique les soirs d'exfoliation, peptides de cuivre les soirs de repos."
      },
      "beta-glucan|l-ascorbic-acid": {
        "title": "Bouclier Protecteur & Scellage Antioxydant",
        "mechanism": "Le bêta-glucane forme un réseau colloïdal qui emprisonne l'acide ascorbique tout en calmant les rougeurs via l'activation des macrophages IL-10.",
        "resolution": "Appliquer le L-AA d'abord, puis sceller immédiatement avec le Bêta-Glucane (Dermefface FX7®)."
      },
      "niacinamide|retinol": {
        "title": "Synergie Barrière & Prévention de la Rétinisation",
        "mechanism": "La niacinamide relance la synthèse des céramides et des acides gras, créant un tampon biologique qui prévient la dermite au rétinol.",
        "resolution": "Appliquer la niacinamide avant ou avec le rétinol pour réduire sécheresse et rougeurs."
      },
      "syn-ake|syn-coll": {
        "title": "Synergie Peptidique Totale : Expression & Matrice",
        "mechanism": "SYN-AKE détend les micro-contractions d'expression tandis que Syn-Coll densifie la matrice collagénique. Synergie moléculaire parfaite.",
        "resolution": "Association idéale. Appliquer le sérum SYN-AKE d'abord, puis la crème Syn-Coll."
      }
    }
  }
});

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

        const card = el('div', {
          className: 'active-card',
          id: `card-${item.id}`,
          role: 'button',
          tabindex: '0',
          'aria-pressed': 'false',
          'aria-label': `${item.name}, ${item.category}`
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
          el('span', { className: 'active-tag', textContent: `pH ${item.phRange[0]}–${item.phRange[1]}` }),
          el('span', { className: 'active-tag', textContent: item.timePreference.replace('_', ' / ') })
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
            row.appendChild(el('td', { className: 'self-cell', textContent: '—' }));
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
            row.appendChild(el('td', {}, [pill]));
          }
        });

        tbody.appendChild(row);
      });
      table.appendChild(tbody);
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
