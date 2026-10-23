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

  var INGREDIENTS_BY_LANG = {
  "en": [
    {
      "code": "RET",
      "name": "Retinol (Vitamin A)",
      "cat": "Retinoid / Cellular Turnover",
      "icon": "fa-solid fa-arrows-rotate",
      "desc": "Gold standard active for accelerating epidermal cellular shedding, activating fibroblasts, promoting Type I collagen transcription, and smoothing deep expression lines.",
      "synergies": "Niacinamide (buffers irritation), Peptides (complementary matrix repair), Hyaluronic Acid",
      "conflicts": "AHA/BHA (extreme barrier overload), Benzoyl Peroxide (oxidation/breakdown), Direct Vitamin C in same layer",
      "timing": "PM Evening Routine strictly; follow with daily morning broad-spectrum SPF",
      "pairLink": "/tools/skincare-conflict-matrix.html?actives=retinol"
    },
    {
      "code": "VC",
      "name": "Vitamin C (L-Ascorbic Acid)",
      "cat": "Antioxidant / Environmental Defense",
      "icon": "fa-solid fa-sun",
      "desc": "Potent free-radical scavenger that donates electrons to neutralize UV-driven oxidative stress, suppresses tyrosinase melanin synthesis, and serves as an essential cofactor in enzymatic collagen cross-linking.",
      "synergies": "Ferulic Acid, Vitamin E, Niacinamide (routine safe), Sunscreen",
      "conflicts": "High-pH formulas, Copper Peptides (oxidation hazard), Heavy direct acid stacking",
      "timing": "AM Morning Routine under broad-spectrum sunscreen for photoprotective defense",
      "pairLink": "/tools/skincare-conflict-matrix.html?actives=l-ascorbic-acid"
    },
    {
      "code": "NIA",
      "name": "Niacinamide (Vitamin B3)",
      "cat": "Barrier Defense / Sebum Regulation",
      "icon": "fa-solid fa-shield-halved",
      "desc": "Multi-functional water-soluble vitamin that upregulates epidermal ceramide and free fatty acid synthesis, reduces transepidermal water loss (TEWL), mitigates redness, and normalizes follicular sebum production.",
      "synergies": "Retinol (dramatically lowers retinization irritation), Salicylic Acid, Glycolic Acid, Peptides",
      "conflicts": "Essentially non-colliding; chemically robust across a broad physiologic pH spectrum (4.5–7.0)",
      "timing": "AM & PM versatile; ideal as a calming layer following acid or retinoid treatments",
      "pairLink": "/tools/skincare-conflict-matrix.html?actives=niacinamide"
    },
    {
      "code": "BHA",
      "name": "BHA (Salicylic Acid)",
      "cat": "Lipophilic Exfoliant / Pore Decongestion",
      "icon": "fa-solid fa-flask-vial",
      "desc": "Oil-soluble beta hydroxy acid capable of penetrating through sebum-filled follicles to dissolve intercellular lipid cement, break down keratinocyte plugs, and relieve inflamed blemishes.",
      "synergies": "Niacinamide (soothes post-exfoliation pore linings), Hydrating barrier serums",
      "conflicts": "Retinol (severe stratum corneum stripping), Glycolic Acid (chemical over-exfoliation)",
      "timing": "AM or PM (2–3 evenings per week); avoid stacking with other strong exfoliators",
      "pairLink": "/tools/skincare-conflict-matrix.html?actives=salicylic-acid"
    },
    {
      "code": "AHA",
      "name": "AHA (Glycolic Acid)",
      "cat": "Hydrophilic Exfoliant / Radiance Refinement",
      "icon": "fa-solid fa-droplet",
      "desc": "Smallest molecular weight alpha hydroxy acid that penetrates deeply to weaken desmosome bonds between dead corneocytes, accelerating exfoliation, refining irregular skin texture, and restoring surface radiance.",
      "synergies": "Niacinamide (strengthens lipid synthesis post-acid), Hyaluronic Acid, Barrier moisturizers",
      "conflicts": "Retinoids (multiplies peeling and erythema), Benzoyl Peroxide, Peptides (acid hydrolysis)",
      "timing": "PM Evening Routine strictly; always require morning sun protection due to photo-sensitization",
      "pairLink": "/tools/skincare-conflict-matrix.html?actives=glycolic-acid"
    },
    {
      "code": "BPO",
      "name": "Benzoyl Peroxide",
      "cat": "Oxidative Antibacterial / Anti-Blemish",
      "icon": "fa-solid fa-bolt",
      "desc": "Lipophilic bactericidal agent that decomposes into benzoic acid and oxygen radicals inside sebaceous follicles, destroying anaerobic Cutibacterium acnes bacteria without promoting bacterial resistance.",
      "synergies": "Niacinamide (offsets barrier peeling), Non-comedogenic barrier creams",
      "conflicts": "Retinol / Tretinoin (oxidizes and degrades the retinoid molecule), Peptides",
      "timing": "AM Morning treatment or short-contact wash; keep separated from evening retinoid routines",
      "pairLink": "/tools/skincare-conflict-matrix.html?actives=benzoyl-peroxide"
    },
    {
      "code": "PEP",
      "name": "Peptides (Syn-Coll® & Eyeseryl®)",
      "cat": "Signaling Peptides / Extracellular Remodeling",
      "icon": "fa-solid fa-dna",
      "desc": "Short amino acid biomimetic sequences (such as Palmitoyl Tripeptide-5 and Acetyl Tetrapeptide-5) that mimic collagen breakdown fragments, signaling cellular receptors to synthesize new collagen and relieve periorbital congestion.",
      "synergies": "Retinol (complementary collagen gene signaling), Niacinamide, Hyaluronic Acid",
      "conflicts": "Direct low-pH exfoliating acids (pH < 3.5 can hydrolyze peptides), Strong oxidizers",
      "timing": "AM & PM routines; apply after water-light serums and before occlusive creams",
      "pairLink": "/tools/skincare-conflict-matrix.html?actives=peptides"
    }
  ],
  "es": [
    {
      "code": "RET",
      "name": "Retinol (Vitamina A)",
      "cat": "Retinoide / Renovación Celular",
      "icon": "fa-solid fa-arrows-rotate",
      "desc": "Estándar de oro para acelerar la renovación epidérmica, activar fibroblastos, promover la síntesis de colágeno Tipo I y suavizar líneas profundas de expresión.",
      "synergies": "Niacinamida (amortigua irritación), Péptidos (remodelación complementaria), Ácido Hialurónico",
      "conflicts": "AHA/BHA (sobrecarga severa de barrera), Peróxido de Benzoilo (oxidación y ruptura), Vitamina C directa en la misma capa",
      "timing": "Rutina nocturna PM estrictamente; aplicar protección solar de amplio espectro por la mañana",
      "pairLink": "/es/skincare-conflict-matrix.html?actives=retinol"
    },
    {
      "code": "VC",
      "name": "Vitamina C (Ácido L-Ascórbico)",
      "cat": "Antioxidante / Defensa Ambiental",
      "icon": "fa-solid fa-sun",
      "desc": "Potente antioxidante que neutraliza el estrés oxidativo provocado por la radiación UV, suprime la tirosinasa para atenuar manchas y actúa como cofactor esencial en la síntesis de colágeno.",
      "synergies": "Ácido Ferúlico, Vitamina E, Niacinamida (rutina compatible), Protector Solar",
      "conflicts": "Fórmulas de pH alcalino, Péptidos de Cobre (riesgo redox), Coaplicación directa con ácidos fuertes",
      "timing": "Rutina matutina AM bajo protector solar de amplio espectro para defensa fotoprotectora",
      "pairLink": "/es/skincare-conflict-matrix.html?actives=l-ascorbic-acid"
    },
    {
      "code": "NIA",
      "name": "Niacinamida (Vitamina B3)",
      "cat": "Reparación de Barrera / Regulación Sebácea",
      "icon": "fa-solid fa-shield-halved",
      "desc": "Vitamina hidrosoluble multifuncional que incrementa la síntesis de ceramidas epidérmicas y ácidos grasos, reduce la pérdida transepidérmica de agua (TEWL) y calma rojeces.",
      "synergies": "Retinol (reduce sustancialmente la irritación de retinización), Ácido Salicílico, Ácido Glicólico, Péptidos",
      "conflicts": "Esencialmente sin colisiones; químicamente estable en un amplio rango fisiológico de pH (4.5–7.0)",
      "timing": "Versátil en AM y PM; ideal como capa calmante tras tratamientos exfoliantes o retinoides",
      "pairLink": "/es/skincare-conflict-matrix.html?actives=niacinamide"
    },
    {
      "code": "BHA",
      "name": "BHA (Ácido Salicílico)",
      "cat": "Exfoliante Liposoluble / Descongestión de Poros",
      "icon": "fa-solid fa-flask-vial",
      "desc": "Beta hidroxiácido soluble en lípidos capaz de penetrar folículos sebáceos para disolver el sebo acumulado, eliminar tapones de queratinocitos y calmar brotes e imperfecciones.",
      "synergies": "Niacinamida (calma la pared del poro post-exfoliación), Sérums hidratantes de barrera",
      "conflicts": "Retinol (descamación aguda del estrato córneo), Ácido Glicólico (sobreexfoliación química)",
      "timing": "AM o PM (2–3 noches por semana); evitar combinar con otros exfoliantes potentes",
      "pairLink": "/es/skincare-conflict-matrix.html?actives=salicylic-acid"
    },
    {
      "code": "AHA",
      "name": "AHA (Ácido Glicólico)",
      "cat": "Exfoliante Hidrosoluble / Renovación de Luminosidad",
      "icon": "fa-solid fa-droplet",
      "desc": "Alfa hidroxiácido de menor peso molecular que penetra profundamente para debilitar uniones entre células muertas, acelerando la exfoliación y restaurando la luminosidad superficial.",
      "synergies": "Niacinamida (refuerza síntesis lipídica tras la exfoliación), Ácido Hialurónico, Hidratantes de barrera",
      "conflicts": "Retinoides (multiplica irritación y descamación), Peróxido de Benzoilo, Péptidos (hidrólisis ácida)",
      "timing": "Rutina nocturna PM estrictamente; requiere fotoprotección estricta por la mañana",
      "pairLink": "/es/skincare-conflict-matrix.html?actives=glycolic-acid"
    },
    {
      "code": "BPO",
      "name": "Peróxido de Benzoilo",
      "cat": "Antibacteriano Oxidante / Anti-Imperfecciones",
      "icon": "fa-solid fa-bolt",
      "desc": "Agente bactericida lipofílico que libera oxígeno dentro de los folículos sebáceos, destruyendo la bacteria anaerobia Cutibacterium acnes sin inducir resistencia bacteriana.",
      "synergies": "Niacinamida (contrarresta sequedad y descamación), Hidratantes no comedogénicos",
      "conflicts": "Retinol / Tretinoína (oxida y degrada la molécula retinoide), Péptidos",
      "timing": "Tratamiento matutino AM o limpiador con aclarado; mantener separado de retinoides nocturnos",
      "pairLink": "/es/skincare-conflict-matrix.html?actives=benzoyl-peroxide"
    },
    {
      "code": "PEP",
      "name": "Péptidos (Syn-Coll® y Eyeseryl®)",
      "cat": "Péptidos Señalizadores / Remodelación Matricial",
      "icon": "fa-solid fa-dna",
      "desc": "Cadenas cortas de aminoácidos biomiméticos que actúan como señales biológicas para estimular a los fibroblastos a producir nuevo colágeno y mejorar el drenaje linfático periorbital.",
      "synergies": "Retinol (señalización complementaria de genes de colágeno), Niacinamida, Ácido Hialurónico",
      "conflicts": "Ácidos exfoliantes directos de pH bajo (pH < 3.5 hidroliza péptidos), Oxidantes fuertes",
      "timing": "Rutinas AM y PM; aplicar tras sérums acuosos y antes de cremas oclusivas",
      "pairLink": "/es/skincare-conflict-matrix.html?actives=peptides"
    }
  ],
  "de": [
    {
      "code": "RET",
      "name": "Retinol (Vitamin A)",
      "cat": "Retinoid / Zelluläre Erneuerung",
      "icon": "fa-solid fa-arrows-rotate",
      "desc": "Goldstandard zur Beschleunigung der epidermalen Zellerneuerung, Fibroblasten-Aktivierung, Förderung der Typ-I-Kollagensynthese und Glättung tiefer Mimikfalten.",
      "synergies": "Niacinamid (puffert Hautreizungen ab), Peptide (komplementärer Matrix-Umbau), Hyaluronsäure",
      "conflicts": "AHA/BHA (extreme Barriere-Überlastung), Benzoylperoxid (Oxidation/Abbau), Direktes Vitamin C in derselben Schicht",
      "timing": "Strikt für die Abend-Routine (PM); tagsüber konsequent Breitspektrum-Sonnenschutz verwenden",
      "pairLink": "/de/skincare-conflict-matrix.html?actives=retinol"
    },
    {
      "code": "VC",
      "name": "Vitamin C (L-Ascorbinsäure)",
      "cat": "Antioxidans / Umweltschutz",
      "icon": "fa-solid fa-sun",
      "desc": "Potenter Radikalfänger, der UV-bedingten oxidativen Stress neutralisiert, die Tyrosinase-Melaninsynthese hemmt und als essenzieller Kofaktor bei der Kollagenbildung dient.",
      "synergies": "Ferulasäure, Vitamin E, Niacinamid (routinesicher), Sonnenschutz",
      "conflicts": "Hohe pH-Werte, Kupferpeptide (Redox-Oxidationsgefahr), Starke direkte Säureschichtung",
      "timing": "Morgen-Routine (AM) unter Breitspektrum-Sonnenschutz für optimalen Zellschutz",
      "pairLink": "/de/skincare-conflict-matrix.html?actives=l-ascorbic-acid"
    },
    {
      "code": "NIA",
      "name": "Niacinamid (Vitamin B3)",
      "cat": "Barriereschutz / Talgregulierung",
      "icon": "fa-solid fa-shield-halved",
      "desc": "Multifunktionales Vitamin, das die Synthese von Ceramiden und freien Fettsäuren ankurbelt, transepidermalen Wasserverlust (TEWL) senkt und Rötungen lindert.",
      "synergies": "Retinol (senkt Retinisierungs-Irritationen drastisch), Salicylsäure, Glykolsäure, Peptide",
      "conflicts": "Weitgehend konfliktfrei; chemisch stabil in einem breiten physiologischen pH-Bereich (4,5–7,0)",
      "timing": "Vielseitig in AM & PM; ideal als beruhigende Schicht nach Säure- oder Retinoidbehandlungen",
      "pairLink": "/de/skincare-conflict-matrix.html?actives=niacinamide"
    },
    {
      "code": "BHA",
      "name": "BHA (Salicylsäure)",
      "cat": "Öllösliches Peeling / Porenklärung",
      "icon": "fa-solid fa-flask-vial",
      "desc": "Öllösliche Beta-Hydroxysäure, die tief in talggefüllte Poren eindringt, Verhornungen löst und entzündliche Unreinheiten sichtbar mildert.",
      "synergies": "Niacinamid (beruhigt gereizte Porenwände), Feuchtigkeits-Barriere-Seren",
      "conflicts": "Retinol (starke Schuppung des Stratum corneum), Glykolsäure (chemische Überpeeling-Gefahr)",
      "timing": "AM oder PM (2–3 Abende pro Woche); nicht mit anderen starken Peelings kombinieren",
      "pairLink": "/de/skincare-conflict-matrix.html?actives=salicylic-acid"
    },
    {
      "code": "AHA",
      "name": "AHA (Glykolsäure)",
      "cat": "Wasserlösliches Peeling / Strahlkraft",
      "icon": "fa-solid fa-droplet",
      "desc": "Niedermolekulare Alpha-Hydroxysäure, die Desmosomen zwischen abgestorbenen Hornzellen lockert, die Zellerneuerung beschleunigt und einen ebenmäßigen Teint schenkt.",
      "synergies": "Niacinamid (stärkt Lipidsynthese nach Säureeinwirkung), Hyaluronsäure, Barrierecremes",
      "conflicts": "Retinoide (verstärkt Rötungen und Schuppung), Benzoylperoxid, Peptide (Säurehydrolyse)",
      "timing": "Strikt für die Abend-Routine (PM); morgens stets Sonnenschutz wegen Photosensibilisierung tragen",
      "pairLink": "/de/skincare-conflict-matrix.html?actives=glycolic-acid"
    },
    {
      "code": "BPO",
      "name": "Benzoylperoxid",
      "cat": "Oxidatives Bakterizid / Anti-Unreinheiten",
      "icon": "fa-solid fa-bolt",
      "desc": "Lipophiler Wirkstoff, der in Talgdrüsenfollikeln Sauerstoff freisetzt und anaerobe Cutibacterium acnes Bakterien zerstört, ohne bakterielle Resistenzen zu fördern.",
      "synergies": "Niacinamid (wirkt Barriere-Trockenheit entgegen), Nicht-komedogene Pflegecremes",
      "conflicts": "Retinol / Tretinoin (oxidiert und zerstört das Retinoidmolekül), Peptide",
      "timing": "Morgens als Behandlung oder kurzes Waschpeeling; getrennt von abendlichen Retinoiden anwenden",
      "pairLink": "/de/skincare-conflict-matrix.html?actives=benzoyl-peroxide"
    },
    {
      "code": "PEP",
      "name": "Peptide (Syn-Coll® & Eyeseryl®)",
      "cat": "Signalpeptide / Matrix-Remodellierung",
      "icon": "fa-solid fa-dna",
      "desc": "Kurze biomimetische Aminosäuresequenzen, die Kollagenabbauprodukte imitieren und Fibroblasten zur Neubildung von Kollagen stimulieren sowie Mikrostauungen lindern.",
      "synergies": "Retinol (ergänzende Signalisierung der Kollagengene), Niacinamid, Hyaluronsäure",
      "conflicts": "Direkte säurehaltige Peelings mit niedrigem pH (<3,5 hydrolysiert Peptide), Starke Oxidationsmittel",
      "timing": "AM & PM Routinen; nach wässrigen Seren und vor reichhaltigen Versiegelungscremes auftragen",
      "pairLink": "/de/skincare-conflict-matrix.html?actives=peptides"
    }
  ],
  "fr": [
    {
      "code": "RET",
      "name": "Rétinol (Vitamine A)",
      "cat": "Rétinoïde / Renouvellement Cellulaire",
      "icon": "fa-solid fa-arrows-rotate",
      "desc": "Actif de référence pour accélérer le renouvellement épidermique, activer les fibroblastes, stimuler le collagène de Type I et lisser les rides profondes.",
      "synergies": "Niacinamide (tamponne les irritations), Peptides (réparation matricielle complémentaire), Acide Hyaluronique",
      "conflicts": "AHA/BHA (surcharge sévère de la barrière), Peroxyde de Benzoyle (dégradation par oxydation), Vitamine C pure superposée",
      "timing": "Strictement en routine du soir (PM) ; appliquer impérativement un SPF à large spectre le matin",
      "pairLink": "/fr/skincare-conflict-matrix.html?actives=retinol"
    },
    {
      "code": "VC",
      "name": "Vitamine C (Acide L-Ascorbique)",
      "cat": "Antioxydant / Défense Environnementale",
      "icon": "fa-solid fa-sun",
      "desc": "Antioxydant puissant neutralisant le stress oxydatif causé par les UV, inhibant la tyrosinase pour atténuer les taches et cofacteur indispensable à la synthèse du collagène.",
      "synergies": "Acide Férulique, Vitamine E, Niacinamide (compatible en routine), Crème Solaire",
      "conflicts": "Formules à pH alcalin, Peptides de Cuivre (oxydation redox), Superposition directe avec acides forts",
      "timing": "Routine du matin (AM) sous protection solaire à large spectre pour un bouclier antioxydant",
      "pairLink": "/fr/skincare-conflict-matrix.html?actives=l-ascorbic-acid"
    },
    {
      "code": "NIA",
      "name": "Niacinamide (Vitamine B3)",
      "cat": "Bouclier Barrière / Régulation du Sébum",
      "icon": "fa-solid fa-shield-halved",
      "desc": "Vitamine hydrosoluble polyvalente stimulant la synthèse des céramides, réduisant la perte insensible en eau (PIE), calmant les rougeurs et équilibrant la production de sébum.",
      "synergies": "Rétinol (réduit drastiquement l'inconfort de rétinisation), Acide Salicylique, Acide Glycolique, Peptides",
      "conflicts": "Quasiment aucun conflit ; excellente stabilité chimique sur une large plage de pH (4,5–7,0)",
      "timing": "Polyvalent matin et soir ; idéal en couche apaisante après un peeling ou un rétinoïde",
      "pairLink": "/fr/skincare-conflict-matrix.html?actives=niacinamide"
    },
    {
      "code": "BHA",
      "name": "BHA (Acide Salicylique)",
      "cat": "Exfoliant Lipophile / Désincrustant des Pores",
      "icon": "fa-solid fa-flask-vial",
      "desc": "Bêta-hydroxyacide liposoluble capable de pénétrer le sébum des follicules pour dissoudre les bouchons de kératine et soulager les imperfections inflammatoires.",
      "synergies": "Niacinamide (apaise la paroi des pores après exfoliation), Sérums hydratants réparateurs",
      "conflicts": "Rétinol (desquamation sévère de la couche cornée), Acide Glycolique (risque de surexfoliation chimique)",
      "timing": "Matin ou soir (2 à 3 fois par semaine) ; éviter d'associer avec d'autres exfoliants puissants",
      "pairLink": "/fr/skincare-conflict-matrix.html?actives=salicylic-acid"
    },
    {
      "code": "AHA",
      "name": "AHA (Acide Glycolique)",
      "cat": "Exfoliant Hydrosoluble / Éclat Cutané",
      "icon": "fa-solid fa-droplet",
      "desc": "Acide de faible poids moléculaire affaiblissant les jonctions entre cornéocytes morts pour accélérer l'exfoliation, lisser le grain de peau et raviver l'éclat.",
      "synergies": "Niacinamide (stimule la synthèse lipidique post-acide), Acide Hyaluronique, Crèmes barrières",
      "conflicts": "Rétinoïdes (multiplie les rougeurs et la desquamation), Peroxyde de Benzoyle, Peptides (hydrolyse acide)",
      "timing": "Strictement en routine du soir (PM) ; nécessite une protection solaire le matin contre la photosensibilité",
      "pairLink": "/fr/skincare-conflict-matrix.html?actives=glycolic-acid"
    },
    {
      "code": "BPO",
      "name": "Peroxyde de Benzoyle",
      "cat": "Antibactérien Oxydant / Anti-Imperfections",
      "icon": "fa-solid fa-bolt",
      "desc": "Agent antibactérien lipophile libérant de l'oxygène dans les follicules sébacés pour éradiquer la bactérie Cutibacterium acnes sans créer de résistance.",
      "synergies": "Niacinamide (compense le dessèchement cutané), Crèmes hydratantes non comédogènes",
      "conflicts": "Rétinol / Trétinoïne (oxyde et détruit la molécule de rétinoïde), Peptides",
      "timing": "Traitement du matin ou nettoyant à rincer ; séparer strictement des rétinoïdes du soir",
      "pairLink": "/fr/skincare-conflict-matrix.html?actives=benzoyl-peroxide"
    },
    {
      "code": "PEP",
      "name": "Peptides (Syn-Coll® & Eyeseryl®)",
      "cat": "Peptides Signal / Remodelage Cutané",
      "icon": "fa-solid fa-dna",
      "desc": "Courtes séquences d'acides aminés biomimétiques envoyant des signaux cellulaires aux fibroblastes pour synthétiser du collagène neuf et drainer la congestion péri-orbitaire.",
      "synergies": "Rétinol (signalisation complémentaire de la synthèse de collagène), Niacinamide, Acide Hyaluronique",
      "conflicts": "Acides exfoliants directs à pH acide (<3,5 hydrolyse les liaisons peptidiques), Oxydants puissants",
      "timing": "Routines du matin et du soir ; appliquer après les sérums aqueux et avant les crèmes riches",
      "pairLink": "/fr/skincare-conflict-matrix.html?actives=peptides"
    }
  ]
};

  var LABELS = {
    en: {
      synergies: "Key Synergies:",
      conflicts: "Key Conflicts:",
      timing: "Recommended Timing:",
      launchMatrix: "Launch in Conflict Matrix"
    },
    es: {
      synergies: "Sinergias Clave:",
      conflicts: "Conflictos Clave:",
      timing: "Horario Recomendado:",
      launchMatrix: "Ver en la Matriz de Conflictos"
    },
    de: {
      synergies: "Wichtige Synergien:",
      conflicts: "Wichtige Konflikte:",
      timing: "Empfohlene Anwendungszeit:",
      launchMatrix: "In Konflikt-Matrix öffnen"
    },
    fr: {
      synergies: "Synergies Clés :",
      conflicts: "Conflits Clés :",
      timing: "Application Conseillée :",
      launchMatrix: "Ouvrir dans la Matrice"
    }
  };

  function renderIngredients() {
    var grid = document.getElementById("ingredients-grid");
    if (!grid) return;

    var curLang = getLang();
    var list = INGREDIENTS_BY_LANG[curLang] || INGREDIENTS_BY_LANG.en;
    var lbl = LABELS[curLang] || LABELS.en;

    var html = list.map(function (ing) {
      return '<article class="glass ing-card">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">' +
        '<div style="display:flex;align-items:center;gap:.75rem;">' +
        '<div style="width:40px;height:40px;border-radius:10px;background:rgba(166,107,255,.12);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--violet-hi);">' +
        '<i class="' + ing.icon + '"></i>' +
        '</div>' +
        '<div>' +
        '<h3 style="font-size:1.2rem;margin:0;">' + ing.name + '</h3>' +
        '<span style="font-family:var(--mono);font-size:.78rem;color:var(--mute);">' + ing.cat + '</span>' +
        '</div>' +
        '</div>' +
        '<span class="tag">' + ing.code + '</span>' +
        '</div>' +
        '<p style="font-size:.9rem;color:var(--text);line-height:1.55;margin-bottom:1.2rem;">' + ing.desc + '</p>' +
        '<div style="background:rgba(255,255,255,.02);border:1px solid var(--line);border-radius:8px;padding:.85rem;margin-bottom:1.2rem;display:flex;flex-direction:column;gap:.5rem;font-size:.82rem;">' +
        '<div><strong style="color:var(--safe);"><i class="fa-solid fa-plus-circle"></i> ' + lbl.synergies + '</strong> <span style="color:var(--text);">' + ing.synergies + '</span></div>' +
        '<div><strong style="color:var(--bad);"><i class="fa-solid fa-triangle-exclamation"></i> ' + lbl.conflicts + '</strong> <span style="color:var(--text);">' + ing.conflicts + '</span></div>' +
        '<div><strong style="color:var(--sci);"><i class="fa-solid fa-clock"></i> ' + lbl.timing + '</strong> <span style="color:var(--text);">' + ing.timing + '</span></div>' +
        '</div>' +
        '<a href="' + ing.pairLink + '" class="btn btn-ghost" style="width:100%;text-align:center;">' + lbl.launchMatrix + ' <i class="fa-solid fa-arrow-right"></i></a>' +
        '</article>';
    }).join("");

    grid.innerHTML = html;
  }

  /* ---------- HOVER FX ---------- */
  function initHoverFX() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && window.matchMedia("(hover: hover)").matches) {
      document.addEventListener("pointermove", function (e) {
        var g = e.target.closest && e.target.closest(".glass");
        if (!g) return;
        var r = g.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        g.style.setProperty("--mx", x + "px");
        g.style.setProperty("--my", y + "px");
        if (g.classList.contains("rev") || g.classList.contains("post")) {
          g.style.setProperty("--ry", ((x / r.width - .5) * 6).toFixed(2) + "deg");
          g.style.setProperty("--rx", ((.5 - y / r.height) * 6).toFixed(2) + "deg");
        }
      });
      document.addEventListener("pointerout", function (e) {
        var g = e.target.closest && e.target.closest(".rev,.post");
        if (g && !g.contains(e.relatedTarget)) {
          g.style.setProperty("--rx", "0deg");
          g.style.setProperty("--ry", "0deg");
        }
      });
    }
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
    renderIngredients();
    initLangSwitcher();
    startClock();
    initHoverFX();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
