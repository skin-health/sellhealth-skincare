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

  var MATRIX_BY_LANG = {
  "en": {
    "ING": {
      "RET": {
        "n": "Retinol",
        "c": "Retinoid"
      },
      "VC": {
        "n": "Vitamin C",
        "c": "Antioxidant"
      },
      "NIA": {
        "n": "Niacinamide",
        "c": "Barrier / sebum"
      },
      "BHA": {
        "n": "BHA (Salicylic)",
        "c": "Oil-soluble acid"
      },
      "AHA": {
        "n": "AHA (Glycolic)",
        "c": "Water-soluble acid"
      },
      "BPO": {
        "n": "Benzoyl Peroxide",
        "c": "Oxidizer / antibacterial"
      },
      "PEP": {
        "n": "Peptides",
        "c": "Signaling"
      }
    },
    "VERD": {
      "s": "Synergy",
      "c": "Direct conflict",
      "n": "Neutral / safe"
    },
    "DB": {
      "AHA|BHA": [
        "c",
        8,
        70,
        "Moderate",
        "Alternate nights",
        "Two exfoliating acids at low pH remove stratum corneum layers faster than the barrier can rebuild. The result is over-exfoliation: stinging, tightness and a compromised lipid barrier.",
        "Use one acid per session. Alternate evenings (for example AHA Mon/Thu, BHA Tue/Fri) and follow with a plain moisturizer. Skip both if skin is already irritated."
      ],
      "AHA|BPO": [
        "c",
        7,
        85,
        "Moderate",
        "Split AM / PM",
        "BPO is itself drying and mildly irritating, and AHAs thin the outer barrier so more BPO reaches living cells. Irritation adds up even though neither molecule destroys the other.",
        "Use BPO as a short-contact wash or morning treatment and the AHA at night, not on the same night when starting out. Add a barrier moisturizer."
      ],
      "AHA|NIA": [
        "s",
        2,
        95,
        "Moderate",
        "Same routine",
        "Niacinamide boosts ceramide and fatty-acid synthesis and reduces transepidermal water loss, offsetting the barrier stress from glycolic acid exfoliation.",
        "Apply the AHA first on dry skin, wait a few minutes, then niacinamide. Works at night or in the morning with sunscreen."
      ],
      "AHA|PEP": [
        "c",
        3,
        60,
        "Limited",
        "Split AM / PM",
        "At pH 3–4 an acid can hydrolyze or denature some peptides, and the exfoliated barrier absorbs them unpredictably. This is widely advised against, though direct trials are scarce.",
        "Use the acid at night and peptides in the morning, or use them on alternate days. Rinse-off acid cleansers are fine before peptide serums."
      ],
      "AHA|RET": [
        "c",
        9,
        75,
        "Strong",
        "Alternate nights",
        "Both strip and remodel the outer skin. Layered, they stack irritation, raise retinoid penetration and often trigger peeling and redness. Retinol is also less stable once the skin surface is acidic.",
        "Never layer in the same session. Alternate nights, and introduce each one separately for 2–3 weeks before combining the schedule."
      ],
      "AHA|VC": [
        "c",
        6,
        80,
        "Moderate",
        "Split AM / PM",
        "L-ascorbic acid needs pH 3.5 or below, and AHAs sit in the same range. Stacking them gives a high acid load that is a common cause of stinging and erythema, without extra efficacy.",
        "Vitamin C in the morning under sunscreen, AHA two or three evenings a week. If both are well tolerated, a gap of 30 minutes is the minimum."
      ],
      "BHA|BPO": [
        "n",
        6,
        90,
        "Moderate",
        "Space them out",
        "Both are standard acne actives and are often prescribed together, but they are drying. BHA clears sebum from pores while BPO reduces C. acnes. The risk is irritation, not chemistry.",
        "BHA in the morning and BPO at night works for most people. Moisturize between steps and reduce frequency at the first sign of flaking."
      ],
      "BHA|NIA": [
        "s",
        1,
        95,
        "Moderate",
        "Same routine",
        "BHA dissolves sebum plugs inside pores, and niacinamide helps regulate sebum output and soothe inflammation. The combination tackles oiliness from two angles with little irritation.",
        "Apply BHA, wait 5 minutes, then niacinamide. Fine morning or night."
      ],
      "BHA|PEP": [
        "n",
        2,
        85,
        "Limited",
        "Space them out",
        "Peptides are best at near-neutral pH, so a low-pH BHA can reduce their stability on the skin surface. No clear harm, but potentially less benefit when they are mixed together.",
        "Use BHA first, wait 10–15 minutes or use it at a different time of day, then apply the peptide serum."
      ],
      "BHA|RET": [
        "c",
        8,
        75,
        "Strong",
        "Alternate nights",
        "BHA removes surface lipids and loosens the stratum corneum, which increases how much retinol penetrates. The combination commonly causes dryness, peeling and a damaged barrier.",
        "Alternate evenings. Beginners should use BHA only on non-retinoid nights and keep sessions to 2–3 per week."
      ],
      "BHA|VC": [
        "n",
        4,
        85,
        "Moderate",
        "Space them out",
        "Both work at low pH, so they do not neutralize each other, but both can sting. Salicylic acid also thins the barrier, increasing vitamin C uptake and tingling.",
        "Vitamin C in the morning and BHA at night is the simplest split. If skin is resilient, 15 minutes between them is enough."
      ],
      "BPO|NIA": [
        "s",
        2,
        95,
        "Moderate",
        "Same routine",
        "Niacinamide has anti-inflammatory and barrier-supporting effects that counter BPO dryness. It is not oxidized by BPO in practice and supports adherence to acne regimens.",
        "Apply BPO as a thin layer, then niacinamide and moisturizer. Safe to use morning or night."
      ],
      "BPO|PEP": [
        "c",
        3,
        55,
        "Limited",
        "Split AM / PM",
        "BPO is a strong oxidizer and can break down peptide bonds and, in particular, copper-peptide complexes. Direct clinical data is limited, but the mechanism is plausible.",
        "Keep them in separate sessions: BPO in the morning, peptides at night. Rinse-off BPO is safest."
      ],
      "BPO|RET": [
        "c",
        9,
        30,
        "Strong",
        "Split AM / PM",
        "BPO oxidizes tretinoin and retinol, breaking down much of the retinoid. (Adapalene is an exception and is stable with BPO.) The two also add drying and irritation.",
        "BPO in the morning, retinol at night. Never mix them in the same layer. If you use adapalene, a prescriber can confirm it can be combined."
      ],
      "BPO|VC": [
        "c",
        8,
        30,
        "Strong",
        "Split AM / PM",
        "Benzoyl peroxide is a potent oxidizer that oxidizes and destabilizes L-ascorbic acid, inactivating the antioxidant benefit while increasing irritation.",
        "Use Vitamin C in the morning under SPF and reserve Benzoyl Peroxide for the evening or as a short-contact wash."
      ],
      "NIA|PEP": [
        "s",
        1,
        95,
        "Moderate",
        "Same routine",
        "Both sit at similar, mild pH. Peptides signal repair while niacinamide strengthens the barrier that holds moisture in. No interactions are expected.",
        "Layer thin to thick: niacinamide, then peptides, then moisturizer. Use morning or night."
      ],
      "NIA|RET": [
        "s",
        3,
        95,
        "Strong",
        "Same routine",
        "Niacinamide improves barrier function and reduces retinoid-related dryness and redness, helping people stay on retinol long enough to see results.",
        "Apply retinol, then niacinamide, or buffer with moisturizer first if you are sensitive. Night use."
      ],
      "NIA|VC": [
        "n",
        1,
        95,
        "Strong",
        "Same routine",
        "The old niacin-flush warning came from high-heat lab reactions and is not relevant to normal skincare. Each active works independently, and combined brightening is plausible but not clearly proven.",
        "Use freely together. If you feel flushing, separate them by a few minutes or time of day."
      ],
      "PEP|RET": [
        "s",
        2,
        95,
        "Moderate",
        "Same routine",
        "Retinol drives cell turnover and collagen gene expression while peptides signal matrix repair and support the barrier. The mechanisms are complementary and chemically compatible.",
        "Peptide serum first, retinol after, or peptides in the morning and retinol at night."
      ],
      "PEP|VC": [
        "c",
        3,
        65,
        "Limited",
        "Split AM / PM",
        "Low-pH L-ascorbic acid can oxidize copper in copper-peptide complexes, which may inactivate both. Non-copper peptides are less affected. Evidence is mostly mechanistic.",
        "Vitamin C in the morning, peptides at night. If your peptide serum is non-copper, a 15-minute gap is reasonable."
      ],
      "RET|VC": [
        "s",
        4,
        85,
        "Strong",
        "Split AM / PM",
        "Vitamin C protects against UV-driven oxidative damage by day while retinol remodels the skin at night. Layered together, the low pH needed for stable vitamin C is far from retinol’s preferred range.",
        "Vitamin C in the morning under sunscreen, retinol at night. Together in one routine is not recommended while building tolerance."
      ]
    },
    "DIR": {
      "BPO|VC": {
        "irritation": 4,
        "potency": 20,
        "schedule": "Separate AM / PM",
        "mechanism": "Residual benzoyl peroxide oxidizes subsequently applied L-ascorbic acid on the skin, collapsing antioxidant potency.",
        "advice": "Use Vitamin C in the morning and benzoyl peroxide in the evening, or thoroughly cleanse before applying antioxidants."
      },
      "VC|BPO": {
        "irritation": 4,
        "potency": 30,
        "schedule": "Separate AM / PM",
        "mechanism": "L-ascorbic acid reduces benzoyl peroxide, blunting antibacterial activity while oxidizing and degrading the ascorbate.",
        "advice": "Separate application routines: reserve Vitamin C for the morning and benzoyl peroxide for the evening."
      },
      "AHA|RET": {
        "irritation": 4,
        "potency": 40,
        "schedule": "Alternate nights",
        "mechanism": "Glycolic acid lowers stratum corneum pH below the optimal range (5.5–6.5) for retinol dehydrogenase, impairing conversion while raising penetration and irritation.",
        "advice": "Never layer directly; alternate evenings between AHA and retinol to protect conversion enzymes and barrier integrity."
      },
      "RET|AHA": {
        "irritation": 4,
        "potency": 60,
        "schedule": "Alternate nights",
        "mechanism": "Retinol absorbs into lipid membranes first, preserving greater enzymatic conversion, though subsequent acid exfoliation still amplifies irritation.",
        "advice": "Even with partial conversion preserved, alternate nights to avoid cumulative epidermal barrier breakdown."
      },
      "BHA|RET": {
        "irritation": 3,
        "potency": 55,
        "schedule": "Alternate nights",
        "mechanism": "Salicylic acid mildly acidifies follicular lipids, reducing retinol dehydrogenase efficiency while moderately increasing retinoid flux and drying.",
        "advice": "Alternate evenings or use BHA in the morning and retinol at night to balance pore clearing with retinoid tolerance."
      },
      "RET|BHA": {
        "irritation": 3,
        "potency": 70,
        "schedule": "Alternate nights",
        "mechanism": "Applying retinol first permits cellular uptake at baseline pH; subsequent BHA causes milder irritation with retinoid conversion mostly preserved.",
        "advice": "Space applications or preferably alternate evenings to avoid stripping surface lipids."
      },
      "AHA|BPO": {
        "irritation": 4,
        "potency": 35,
        "schedule": "Separate AM / PM",
        "mechanism": "Glycolic acid exfoliation thins the stratum corneum barrier before peroxide application, raising benzoyl peroxide penetration and chemical burn risk.",
        "advice": "Never apply benzoyl peroxide immediately after an AHA; separate them into morning and evening routines."
      },
      "BPO|AHA": {
        "irritation": 4,
        "potency": 45,
        "schedule": "Separate AM / PM",
        "mechanism": "Benzoyl peroxide dries and desquamates the surface; subsequent glycolic acid stings compromised skin, though deeper penetration risk is slightly lower.",
        "advice": "Split routines: use benzoyl peroxide in the morning or as a wash, and glycolic acid on alternate evenings."
      },
      "RET|BPO": {
        "irritation": 4,
        "potency": 45,
        "schedule": "Separate AM / PM",
        "mechanism": "Retinol absorbs into deeper epidermal layers first; subsequently applied peroxide oxidizes only residual unabsorbed surface retinol.",
        "advice": "Do not layer in the same session; split into retinol at night and benzoyl peroxide in the morning to preserve retinoid activity."
      },
      "BPO|RET": {
        "irritation": 4,
        "potency": 30,
        "schedule": "Separate AM / PM",
        "mechanism": "Residual benzoyl peroxide on the skin oxidizes retinol immediately on contact, degrading the molecule before transdermal absorption.",
        "advice": "Strictly separate routines: apply benzoyl peroxide in the morning or as a wash-off product and retinol at night."
      },
      "VC|PEP": {
        "irritation": 3,
        "potency": 30,
        "schedule": "Separate AM / PM",
        "mechanism": "Low-pH L-ascorbic acid (pH ≤ 3.5) hydrolyzes susceptible amide bonds in topically applied peptides, neutralizing signaling efficacy.",
        "advice": "Apply Vitamin C in the morning and reserve peptide serums for the evening to maintain structural stability."
      },
      "PEP|VC": {
        "irritation": 3,
        "potency": 60,
        "schedule": "Separate AM / PM",
        "mechanism": "Peptide serum absorbs into viable tissue first; subsequently applied acidic ascorbate harms only surface residue.",
        "advice": "Wait at least 15–20 minutes after peptide absorption before applying acidic serums, or separate routines entirely."
      },
      "AHA|VC": {
        "irritation": 4,
        "potency": 50,
        "schedule": "Separate AM / PM",
        "mechanism": "Layering two low-pH acids overwhelms skin buffering, driving neurosensory irritation and acute barrier stress despite potential penetration gains.",
        "advice": "Avoid stacking: apply Vitamin C in the morning under sunscreen and use glycolic acid in the evening 2–3 times a week."
      },
      "VC|AHA": {
        "irritation": 4,
        "potency": 70,
        "schedule": "Separate AM / PM",
        "mechanism": "L-ascorbic acid absorbs and establishes intracellular antioxidant stores first; later glycolic acid exfoliates with less ascorbate degradation but similar irritation.",
        "advice": "While ascorbate potency is better preserved, split them across morning and evening routines to avoid cumulative irritation."
      }
    }
  },
  "es": {
    "ING": {
      "RET": {
        "n": "Retinol",
        "c": "Retinoide"
      },
      "VC": {
        "n": "Vitamina C",
        "c": "Antioxidante"
      },
      "NIA": {
        "n": "Niacinamida",
        "c": "Barrera / sebo"
      },
      "BHA": {
        "n": "BHA (Salicílico)",
        "c": "Ácido liposoluble"
      },
      "AHA": {
        "n": "AHA (Glicólico)",
        "c": "Ácido hidrosoluble"
      },
      "BPO": {
        "n": "Peróxido de Benzoilo",
        "c": "Oxidante / antibacteriano"
      },
      "PEP": {
        "n": "Péptidos",
        "c": "Señalización"
      }
    },
    "VERD": {
      "s": "Sinergia",
      "c": "Conflicto directo",
      "n": "Neutro / seguro"
    },
    "DB": {
      "AHA|BHA": [
        "c",
        8,
        70,
        "Moderada",
        "Noches alternas",
        "Dos ácidos exfoliantes a pH bajo eliminan capas del estrato córneo más rápido de lo que la barrera puede regenerarse, provocando sobreexfoliación, ardor y tirantez.",
        "Use un ácido por sesión. Alterne noches (por ejemplo AHA lun/jue, BHA mar/vie) y aplique después una hidratante neutra. Evite ambos si la piel está irritada."
      ],
      "AHA|BPO": [
        "c",
        7,
        85,
        "Moderada",
        "Dividir AM / PM",
        "El peróxido de benzoilo es resecante e irritante, y el AHA afina la barrera permitiendo mayor penetración. La irritación se acumula aunque no se destruyan químicamente.",
        "Aplique el peróxido de benzoilo por la mañana o como limpiador con enjuague, y el AHA por la noche. Refuerce con crema de barrera."
      ],
      "AHA|NIA": [
        "s",
        2,
        95,
        "Moderada",
        "Misma rutina",
        "La niacinamida estimula la síntesis de ceramidas y ácidos grasos y reduce la pérdida transepidérmica de agua, compensando el estrés del ácido glicólico.",
        "Aplique el AHA primero sobre piel seca, espere unos minutos y aplique la niacinamida. Apto de noche o de mañana con protector solar."
      ],
      "AHA|PEP": [
        "c",
        3,
        60,
        "Limitada",
        "Dividir AM / PM",
        "A pH 3–4 el ácido puede hidrolizar o desnaturalizar algunos péptidos, reduciendo su eficacia de señalización de colágeno.",
        "Use el ácido por la noche y los péptidos por la mañana, o en días alternos. Los limpiadores con ácido y aclarado sí son compatibles antes de péptidos."
      ],
      "AHA|RET": [
        "c",
        9,
        75,
        "Sólida",
        "Noches alternas",
        "Ambos activos aceleran la renovación cutánea. Superpuestos multiplican la penetración del retinoide y desencadenan descamación y eritema agudo.",
        "Nunca aplicar en la misma sesión. Alterne noches e introduzca cada uno por separado durante 2–3 semanas antes de combinarlos."
      ],
      "AHA|VC": [
        "c",
        6,
        80,
        "Moderada",
        "Dividir AM / PM",
        "El ácido L-ascórbico requiere un pH menor a 3.5, similar al AHA. Su aplicación conjunta genera una sobrecarga ácida causante de escozor sin beneficio extra.",
        "Vitamina C por la mañana bajo protector solar y AHA 2 o 3 noches por semana. Si la piel es resistente, un espacio de 30 minutos es lo mínimo."
      ],
      "BHA|BPO": [
        "n",
        6,
        90,
        "Moderada",
        "Espaciar aplicación",
        "Ambos son activos estándar para imperfecciones pero resecan la piel. El BHA desobstruye poros y el BPO combate bacterias. El riesgo es de irritación, no de choque químico.",
        "BHA por la mañana y BPO por la noche funciona para la mayoría. Hidrate bien entre pasos y reduzca la frecuencia ante descamación."
      ],
      "BHA|NIA": [
        "s",
        1,
        95,
        "Moderada",
        "Misma rutina",
        "El BHA disuelve tapones de sebo en los poros y la niacinamida regula la secreción sebácea y calma la inflamación. Excelente sinergia purificante.",
        "Aplique BHA, espere 5 minutos y continúe con niacinamida. Seguro de mañana o de noche."
      ],
      "BHA|PEP": [
        "n",
        2,
        85,
        "Limitada",
        "Espaciar aplicación",
        "Los péptidos operan mejor a pH fisiológico, por lo que un BHA muy ácido puede reducir temporalmente su estabilidad en superficie.",
        "Aplique BHA primero, espere 10–15 minutos o utilícelo en un horario distinto del día antes del sérum peptídico."
      ],
      "BHA|RET": [
        "c",
        8,
        75,
        "Sólida",
        "Noches alternas",
        "El BHA elimina lípidos superficiales y afina la capa córnea, aumentando la penetración y el potencial irritante del retinol.",
        "Alterne noches. Para principiantes, use BHA únicamente en noches sin retinoides y limite las sesiones a 2–3 por semana."
      ],
      "BHA|VC": [
        "n",
        4,
        85,
        "Moderada",
        "Espaciar aplicación",
        "Ambos operan a pH ácido y no se anulan químicamente, pero la acidez combinada puede provocar hormigueo en pieles reactivas.",
        "Vitamina C por la mañana y BHA por la noche es la distribución más sencilla y tolerada."
      ],
      "BPO|NIA": [
        "s",
        2,
        95,
        "Moderada",
        "Misma rutina",
        "La niacinamida posee efectos antiinflamatorios y reparadores de barrera que contrarrestan la resequedad del peróxido de benzoilo.",
        "Aplique una capa fina de peróxido de benzoilo, continúe con niacinamida e hidratante. Apto de mañana o noche."
      ],
      "BPO|PEP": [
        "c",
        3,
        55,
        "Limitada",
        "Dividir AM / PM",
        "El peróxido de benzoilo es un oxidante fuerte que puede degradar enlaces peptídicos y complejos metálicos.",
        "Mantenga en sesiones separadas: peróxido de benzoilo por la mañana y péptidos por la noche."
      ],
      "BPO|RET": [
        "c",
        9,
        30,
        "Sólida",
        "Dividir AM / PM",
        "El BPO oxida directamente el retinol y la tretinoína, degradando gran parte de la molécula y sumando irritación.",
        "Peróxido de benzoilo por la mañana y retinol por la noche. Nunca mezclar en la misma capa."
      ],
      "BPO|VC": [
        "c",
        8,
        30,
        "Sólida",
        "Dividir AM / PM",
        "El peróxido de benzoilo oxida rápidamente el ácido L-ascórbico, inactivando sus propiedades antioxidantes y provocando irritación.",
        "Vitamina C por la mañana bajo protector solar y peróxido de benzoilo por la noche o como limpiador."
      ],
      "NIA|PEP": [
        "s",
        1,
        95,
        "Moderada",
        "Misma rutina",
        "Ambos activos operan a pH neutro compatible. Los péptidos estimulan la reparación dérmica y la niacinamida refuerza la barrera lipídica.",
        "Aplique de textura ligera a densa: niacinamida, péptidos y después hidratante. Uso en mañana o noche."
      ],
      "NIA|RET": [
        "s",
        3,
        95,
        "Sólida",
        "Misma rutina",
        "La niacinamida optimiza la función barrera y reduce el enrojecimiento de la retinización, mejorando la tolerancia cutánea.",
        "Aplique retinol y después niacinamida, o amortigüe previamente con hidratante en pieles sensibles."
      ],
      "NIA|VC": [
        "n",
        1,
        95,
        "Sólida",
        "Misma rutina",
        "Ambos activos funcionan de forma independiente y complementaria para unificar el tono cutáneo sin interferencias químicas.",
        "Seguros de usar juntos. Si percibe enrojecimiento leve, separe por unos minutos o por horarios."
      ],
      "PEP|RET": [
        "s",
        2,
        95,
        "Moderada",
        "Misma rutina",
        "El retinol promueve la renovación celular mientras los péptidos estimulan la síntesis de matriz extracelular. Mecanismos complementarios.",
        "Sérum de péptidos primero y retinol después, o péptidos por la mañana y retinol por la noche."
      ],
      "PEP|VC": [
        "c",
        3,
        65,
        "Limitada",
        "Dividir AM / PM",
        "El pH ácido del ácido L-ascórbico puro puede oxidar o inactivar péptidos de cobre. Los péptidos no metálicos toleran mejor un breve espaciamiento.",
        "Vitamina C por la mañana y péptidos por la noche para máxima biodisponibilidad."
      ],
      "RET|VC": [
        "s",
        4,
        85,
        "Sólida",
        "Dividir AM / PM",
        "La vitamina C defiende contra el daño oxidativo diurno mientras el retinol repara y renueva por la noche.",
        "Vitamina C por la mañana bajo protector solar y retinol estrictamente de noche."
      ]
    },
    "DIR": {
      "BPO|VC": {
        "irritation": 4,
        "potency": 20,
        "schedule": "Dividir AM / PM",
        "mechanism": "El peróxido de benzoilo residual en la piel oxida el ácido L-ascórbico aplicado después, anulando casi toda la potencia antioxidante.",
        "advice": "Aplique la vitamina C por la mañana y el peróxido de benzoilo por la noche, o aclare bien el limpiador antes del sérum."
      },
      "VC|BPO": {
        "irritation": 4,
        "potency": 30,
        "schedule": "Dividir AM / PM",
        "mechanism": "El ácido L-ascórbico reduce el peróxido de benzoilo, atenuando su acción antibacteriana mientras el ascorbato se oxida.",
        "advice": "Separe los momentos de aplicación: use la vitamina C por la mañana y el peróxido de benzoilo por la noche."
      },
      "AHA|RET": {
        "irritation": 4,
        "potency": 40,
        "schedule": "Noches alternas",
        "mechanism": "El ácido glicólico acidifica la capa córnea por debajo del pH 5.5–6.5 requerido por la retinol deshidrogenasa, mermando su conversión y elevando la irritación.",
        "advice": "No superponga ambos productos; alterne noches entre AHA y retinol para preservar las enzimas de conversión."
      },
      "RET|AHA": {
        "irritation": 4,
        "potency": 60,
        "schedule": "Noches alternas",
        "mechanism": "El retinol penetra las estructuras lipídicas antes del ácido, preservando mayor conversión enzimática, aunque la exfoliación posterior aún eleva la irritación.",
        "advice": "Aunque la conversión se conserve mejor, alterne noches para prevenir la desestabilización de la barrera cutánea."
      },
      "BHA|RET": {
        "irritation": 3,
        "potency": 55,
        "schedule": "Noches alternas",
        "mechanism": "El ácido salicílico acidifica levemente la piel y disuelve lípidos foliculares, reduciendo la eficiencia enzimática y aumentando el flujo del retinoide.",
        "advice": "Alterne noches o aplique el BHA por la mañana y el retinol por la noche para mantener la tolerancia."
      },
      "RET|BHA": {
        "irritation": 3,
        "potency": 70,
        "schedule": "Noches alternas",
        "mechanism": "Aplicar primero el retinol permite su absorción a pH fisiológico; la aplicación posterior de BHA genera menor irritación y conserva la conversión.",
        "advice": "Espacie al menos 30 minutos si los combina, o preferiblemente alterne noches para proteger los lípidos cutáneos."
      },
      "AHA|BPO": {
        "irritation": 4,
        "potency": 35,
        "schedule": "Dividir AM / PM",
        "mechanism": "La exfoliación con ácido glicólico afina el estrato córneo, facilitando una penetración excesiva del peróxido de benzoilo y riesgo de quemazón.",
        "advice": "Nunca aplique peróxido de benzoilo inmediatamente tras un AHA; sepárelos en rutinas de mañana y noche."
      },
      "BPO|AHA": {
        "irritation": 4,
        "potency": 45,
        "schedule": "Dividir AM / PM",
        "mechanism": "El peróxido de benzoilo reseca la superficie cutánea; la aplicación posterior de AHA provoca ardor inmediato en piel sensibilizada.",
        "advice": "Divida las aplicaciones: utilice el peróxido por la mañana o como limpiador, y el AHA en noches alternas."
      },
      "RET|BPO": {
        "irritation": 4,
        "potency": 45,
        "schedule": "Dividir AM / PM",
        "mechanism": "Permitir que el retinol se absorba primero internaliza parte del activo, dejando vulnerable a la oxidación solo el residuo superficial.",
        "advice": "No superponga en la misma rutina; use retinol por la noche y peróxido de benzoilo por la mañana."
      },
      "BPO|RET": {
        "irritation": 4,
        "potency": 30,
        "schedule": "Dividir AM / PM",
        "mechanism": "Los residuos de peróxido de benzoilo degradan el retinol al contacto antes de que penetre, provocando una pérdida sustancial de eficacia.",
        "advice": "Separación estricta: use el peróxido de benzoilo por la mañana o con aclarado y el retinol por la noche."
      },
      "VC|PEP": {
        "irritation": 3,
        "potency": 30,
        "schedule": "Dividir AM / PM",
        "mechanism": "Una capa de ácido L-ascórbico a pH bajo (pH ≤ 3.5) hidroliza los enlaces amida de los péptidos aplicados a continuación, neutralizando su función.",
        "advice": "Aplique la vitamina C por la mañana y reserve los sérums de péptidos para la noche para proteger su estructura."
      },
      "PEP|VC": {
        "irritation": 3,
        "potency": 60,
        "schedule": "Dividir AM / PM",
        "mechanism": "Aplicar los péptidos primero permite su absorción dérmica previa; el ácido ascórbico posterior solo afecta al residuo que queda en superficie.",
        "advice": "Espere al menos 15–20 minutos tras el sérum de péptidos antes del ácido ascórbico, o separe las rutinas por completo."
      },
      "AHA|VC": {
        "irritation": 4,
        "potency": 50,
        "schedule": "Dividir AM / PM",
        "mechanism": "Superponer dos ácidos de bajo pH supera la capacidad tampón cutánea, provocando ardor y estrés de la barrera cutánea.",
        "advice": "Evite superponerlos: aplique la vitamina C por la mañana con fotoprotección y el ácido glicólico 2–3 noches por semana."
      },
      "VC|AHA": {
        "irritation": 4,
        "potency": 70,
        "schedule": "Dividir AM / PM",
        "mechanism": "El ácido L-ascórbico se absorbe primero estableciendo reservas antioxidantes; el glicólico posterior conserva la potencia pero mantiene una alta irritación.",
        "advice": "Aunque se conserve la potencia, separe en rutinas de mañana y noche para evitar la inflamación acumulada."
      }
    }
  },
  "de": {
    "ING": {
      "RET": {
        "n": "Retinol",
        "c": "Retinoid"
      },
      "VC": {
        "n": "Vitamin C",
        "c": "Antioxidans"
      },
      "NIA": {
        "n": "Niacinamid",
        "c": "Barriere / Talg"
      },
      "BHA": {
        "n": "BHA (Salicylsäure)",
        "c": "Öllösliche Säure"
      },
      "AHA": {
        "n": "AHA (Glykolsäure)",
        "c": "Wasserlösliche Säure"
      },
      "BPO": {
        "n": "Benzoylperoxid",
        "c": "Oxidationsmittel / antibakteriell"
      },
      "PEP": {
        "n": "Peptide",
        "c": "Signalpeptide"
      }
    },
    "VERD": {
      "s": "Synergie",
      "c": "Direkter Konflikt",
      "n": "Neutral / sicher"
    },
    "DB": {
      "AHA|BHA": [
        "c",
        8,
        70,
        "Moderat",
        "Abwechselnde Abende",
        "Zwei niedrig-pH-Säuren entfernen Hornschichten schneller als die Barriere heilen kann. Die Folge sind Reizungen und Rötungen.",
        "Eine Säure pro Anwendung. Abende abwechseln und mit Feuchtigkeitscreme pflegen."
      ],
      "AHA|BPO": [
        "c",
        7,
        85,
        "Moderat",
        "Aufteilung AM / PM",
        "BPO trocknet aus und AHA schwächt die Hornschicht, sodass mehr BPO lebende Zellen erreicht und Reizungen summiert.",
        "BPO morgens oder als Waschgel verwenden, AHA abends. Eine Barrierecreme ergänzen."
      ],
      "AHA|NIA": [
        "s",
        2,
        95,
        "Moderat",
        "Gleiche Routine",
        "Niacinamid fördert Ceramide und mindert den Wasserverlust, wodurch Säurestress ausgeglichen wird.",
        "AHA auf trockene Haut auftragen, kurz warten, dann Niacinamid anwenden."
      ],
      "AHA|PEP": [
        "c",
        3,
        60,
        "Begrenzt",
        "Aufteilung AM / PM",
        "Bei pH 3–4 können Säuren Peptidbindungen hydrolysieren und ihre Signalwirkung schwächen.",
        "Säure abends und Peptide morgens nutzen oder an getrennten Tagen auftragen."
      ],
      "AHA|RET": [
        "c",
        9,
        75,
        "Stark",
        "Abwechselnde Abende",
        "Beide stimulieren die Zellerneuerung stark. Gleichzeitig aufgetragen führt dies zu Schuppung und Barriereabbau.",
        "Niemals in derselben Routine schichten. Abende abwechseln."
      ],
      "AHA|VC": [
        "c",
        6,
        80,
        "Moderat",
        "Aufteilung AM / PM",
        "L-Ascorbinsäure und AHA benötigen beide niedrige pH-Werte. Die doppelte Säurelast verursacht Brennen.",
        "Vitamin C morgens unter Sonnenschutz, AHA 2-3 Abende pro Woche."
      ],
      "BHA|BPO": [
        "n",
        6,
        90,
        "Moderat",
        "Zeitlich versetzen",
        "Standard bei Unreinheiten, jedoch stark austrocknend. BHA klärt Poren, BPO reduziert Bakterien.",
        "BHA morgens und BPO abends. Ausreichend Feuchtigkeit zuführen."
      ],
      "BHA|NIA": [
        "s",
        1,
        95,
        "Moderat",
        "Gleiche Routine",
        "BHA löst Sebum in den Poren und Niacinamid reguliert die Talgproduktion und beruhigt Reizungen.",
        "BHA auftragen, 5 Minuten warten, danach Niacinamid."
      ],
      "BHA|PEP": [
        "n",
        2,
        85,
        "Begrenzt",
        "Zeitlich versetzen",
        "Peptide sind bei neutralem pH stabiler. Saures BHA kann ihre Aktivität temporär mindern.",
        "BHA auftragen, 10-15 Minuten warten oder zu unterschiedlichen Tageszeiten anwenden."
      ],
      "BHA|RET": [
        "c",
        8,
        75,
        "Stark",
        "Abwechselnde Abende",
        "BHA löst Lipide und verstärkt die Retinolpenetration, was zu Trockenheit und Rötung führt.",
        "Abende abwechseln. Für Einsteiger BHA nur an retinol-freien Tagen nutzen."
      ],
      "BHA|VC": [
        "n",
        4,
        85,
        "Moderat",
        "Zeitlich versetzen",
        "Beide wirken bei niedrigem pH. Die doppelte Säureanwendung kann sensible Haut überreizen.",
        "Vitamin C am Morgen und BHA am Abend ist die verträglichste Kombination."
      ],
      "BPO|NIA": [
        "s",
        2,
        95,
        "Moderat",
        "Gleiche Routine",
        "Niacinamid beruhigt und stärkt die Barriere gegen BPO-bedingte Austrocknung.",
        "BPO dünn auftragen, danach Niacinamid und Feuchtigkeitspflege."
      ],
      "BPO|PEP": [
        "c",
        3,
        55,
        "Begrenzt",
        "Aufteilung AM / PM",
        "BPO ist ein starkes Oxidationsmittel und kann Peptidketten zerstören.",
        "Getrennte Routinen: BPO morgens, Peptide abends."
      ],
      "BPO|RET": [
        "c",
        9,
        30,
        "Stark",
        "Aufteilung AM / PM",
        "BPO oxidiert Retinol und zerstört den Wirkstoff direkt auf der Hautoberfläche.",
        "BPO morgens, Retinol abends. Niemals direkt aufeinander schichten."
      ],
      "BPO|VC": [
        "c",
        8,
        30,
        "Stark",
        "Aufteilung AM / PM",
        "BPO oxidiert L-Ascorbinsäure rasch und entwertet die antioxidative Schutzwirkung.",
        "Vitamin C morgens unter Sonnenschutz, BPO abends anwenden."
      ],
      "NIA|PEP": [
        "s",
        1,
        95,
        "Moderat",
        "Gleiche Routine",
        "Beide haben hautneutrale pH-Werte. Peptide signalisieren Reparatur, Niacinamid stärkt die Schutzbarriere.",
        "Niacinamid, dann Peptidserum, abschließend Feuchtigkeitscreme."
      ],
      "NIA|RET": [
        "s",
        3,
        95,
        "Stark",
        "Gleiche Routine",
        "Niacinamid verbessert die Barrierefunktion und reduziert Retinoid-Trockenheit deutlich.",
        "Retinol auftragen, danach Niacinamid zur Beruhigung der Haut."
      ],
      "NIA|VC": [
        "n",
        1,
        95,
        "Stark",
        "Gleiche Routine",
        "Beide Wirkstoffe ergänzen sich hervorragend bei Pigmentstörungen und Teint-Unregelmäßigkeiten.",
        "Frei kombinierbar. Bei sensiblem Flush kurz zeitlich versetzen."
      ],
      "PEP|RET": [
        "s",
        2,
        95,
        "Moderat",
        "Gleiche Routine",
        "Retinol stimuliert die Zellerneuerung, Peptide fördern die Kollagensynthese.",
        "Peptidserum zuerst, danach Retinol, oder Peptide morgens und Retinol abends."
      ],
      "PEP|VC": [
        "c",
        3,
        65,
        "Begrenzt",
        "Aufteilung AM / PM",
        "Niedriger pH von Vitamin C kann Kupferpeptide oxidieren und inaktivieren.",
        "Vitamin C morgens, Peptidseren bevorzugt abends anwenden."
      ],
      "RET|VC": [
        "s",
        4,
        85,
        "Stark",
        "Aufteilung AM / PM",
        "Vitamin C schützt tagsüber vor UV-Radikalen, Retinol regeneriert die Hautzellen über Nacht.",
        "Vitamin C morgens unter Sonnenschutz, Retinol strikt für den Abend."
      ]
    },
    "DIR": {
      "BPO|VC": {
        "irritation": 4,
        "potency": 20,
        "schedule": "Aufteilung AM / PM",
        "mechanism": "Rückstände von Benzoylperoxid oxidieren nachfolgend aufgetragene L-Ascorbinsäure sofort auf der Haut und zerstören deren Wirksamkeit nahezu vollständig.",
        "advice": "Vitamin C morgens und Benzoylperoxid abends anwenden oder Peroxid-Waschgele vor der Serumapplikation gründlich abspülen."
      },
      "VC|BPO": {
        "irritation": 4,
        "potency": 30,
        "schedule": "Aufteilung AM / PM",
        "mechanism": "L-Ascorbinsäure reduziert Benzoylperoxid, wodurch die antibakterielle Wirkung geschwächt wird und das Vitamin C selbst oxidiert.",
        "advice": "Trennen Sie die Anwendungen: Vitamin C morgens und Benzoylperoxid abends auftragen."
      },
      "AHA|RET": {
        "irritation": 4,
        "potency": 40,
        "schedule": "Abwechselnde Abende",
        "mechanism": "Glykolsäure senkt den pH-Wert der Hornschicht unter das Wirkoptimum (pH 5.5–6.5) der Retinol-Dehydrogenase, was die Umwandlung hemmt und Irritationen steigert.",
        "advice": "Niemals in derselben Routine schichten; wechseln Sie die Abende zwischen AHA und Retinol ab."
      },
      "RET|AHA": {
        "irritation": 4,
        "potency": 60,
        "schedule": "Abwechselnde Abende",
        "mechanism": "Retinol zieht vor der Säure in die Lipidstrukturen ein und erhält so mehr Umwandlungskapazität, dennoch verstärkt die nachfolgende Säure die Reizung.",
        "advice": "Trotz besserer Erhaltung der Umwandlung sollten Sie die Abende abwechseln, um die Barriere zu schonen."
      },
      "BHA|RET": {
        "irritation": 3,
        "potency": 55,
        "schedule": "Abwechselnde Abende",
        "mechanism": "Salicylsäure senkt den pH-Wert moderat und löst Follikellipide, was die enzymatische Retinolumwandlung dämpft und die Reizbereitschaft leicht erhöht.",
        "advice": "Abende abwechseln oder BHA morgens und Retinol abends verwenden, um Reizungen zu vermeiden."
      },
      "RET|BHA": {
        "irritation": 3,
        "potency": 70,
        "schedule": "Abwechselnde Abende",
        "mechanism": "Retinol zieht bei normalem Haut-pH ein; nachfolgendes BHA erzeugt geringere Irritationen, während die enzymatische Umwandlung weitgehend stabil bleibt.",
        "advice": "Mindestens 30 Minuten Abstand einhalten oder vorzugsweise an getrennten Abenden anwenden."
      },
      "AHA|BPO": {
        "irritation": 4,
        "potency": 35,
        "schedule": "Aufteilung AM / PM",
        "mechanism": "Glykolsäure verdünnt die schützende Hornschicht, wodurch Benzoylperoxid tiefer eindringt und das Risiko für Verätzungen und Rötungen deutlich steigt.",
        "advice": "Niemals Benzoylperoxid direkt nach einem AHA auftragen; strikt auf Morgen- und Abendroutine aufteilen."
      },
      "BPO|AHA": {
        "irritation": 4,
        "potency": 45,
        "schedule": "Aufteilung AM / PM",
        "mechanism": "Benzoylperoxid trocknet die Oberfläche aus; nachfolgende Glykolsäure brennt stark auf der gereizten Haut, birgt aber etwas geringere Tiefenpenetration.",
        "advice": "Routinen vollständig trennen: Benzoylperoxid morgens oder als Wash, Glykolsäure an separaten Abenden nutzen."
      },
      "RET|BPO": {
        "irritation": 4,
        "potency": 45,
        "schedule": "Aufteilung AM / PM",
        "mechanism": "Zieht Retinol zuerst ein, gelangt ein Teil in die Epidermis; das nachfolgende Peroxid oxidiert primär an der Oberfläche verbliebene Reste.",
        "advice": "Nicht in einer Sitzung schichten; Retinol abends und Benzoylperoxid morgens anwenden."
      },
      "BPO|RET": {
        "irritation": 4,
        "potency": 30,
        "schedule": "Aufteilung AM / PM",
        "mechanism": "Verbleibendes Benzoylperoxid oxidiert Retinol direkt beim Auftragen und zerstört den Wirkstoff, bevor er absorbiert werden kann.",
        "advice": "Strikt trennen: Benzoylperoxid morgens oder als Wash verwenden und Retinol ausschließlich abends auftragen."
      },
      "VC|PEP": {
        "irritation": 3,
        "potency": 30,
        "schedule": "Aufteilung AM / PM",
        "mechanism": "Der saure pH-Wert von L-Ascorbinsäure (pH ≤ 3.5) spaltet empfindliche Peptidbindungen nachfolgend aufgetragener Peptide und mindert deren Signalwirkung stark.",
        "advice": "Vitamin C morgens anwenden und Peptidseren für die Abendroutine reservieren, um deren Molekülstruktur zu schützen."
      },
      "PEP|VC": {
        "irritation": 3,
        "potency": 60,
        "schedule": "Aufteilung AM / PM",
        "mechanism": "Peptide ziehen zuerst in das Gewebe ein; nachfolgend aufgetragene Ascorbinsäure greift überwiegend nur verbliebene Oberflächenreste an.",
        "advice": "Nach dem Peptidserum mindestens 15–20 Minuten warten oder die Wirkstoffe komplett auf AM und PM verteilen."
      },
      "AHA|VC": {
        "irritation": 4,
        "potency": 50,
        "schedule": "Aufteilung AM / PM",
        "mechanism": "Das Schichten zweier Niedrig-pH-Säuren überfordert den Hautpuffer und löst akuten Barrierestress und Brennen aus.",
        "advice": "Nicht schichten: Vitamin C morgens unter Sonnenschutz und Glykolsäure 2–3 Abende pro Woche anwenden."
      },
      "VC|AHA": {
        "irritation": 4,
        "potency": 70,
        "schedule": "Aufteilung AM / PM",
        "mechanism": "L-Ascorbinsäure zieht zuerst ein und baut ein Reservoir auf; spätere Glykolsäure bewahrt die Ascorbatpotenz, reizt die Haut aber dennoch spürbar.",
        "advice": "Obwohl die Potenz besser erhalten bleibt, sollten beide Wirkstoffe auf Morgen und Abend aufgeteilt werden."
      }
    }
  },
  "fr": {
    "ING": {
      "RET": {
        "n": "Rétinol",
        "c": "Rétinoïde"
      },
      "VC": {
        "n": "Vitamine C",
        "c": "Antioxydant"
      },
      "NIA": {
        "n": "Niacinamide",
        "c": "Barrière / sébum"
      },
      "BHA": {
        "n": "BHA (Salicylique)",
        "c": "Acide liposoluble"
      },
      "AHA": {
        "n": "AHA (Glycolique)",
        "c": "Acide hydrosoluble"
      },
      "BPO": {
        "n": "Peroxyde de Benzoyle",
        "c": "Oxydant / antibactérien"
      },
      "PEP": {
        "n": "Peptides",
        "c": "Signalisation"
      }
    },
    "VERD": {
      "s": "Synergie",
      "c": "Conflit direct",
      "n": "Neutre / sans risque"
    },
    "DB": {
      "AHA|BHA": [
        "c",
        8,
        70,
        "Modéré",
        "Soirs alternés",
        "Deux acides exfoliants à pH acide altèrent la barrière plus vite qu'elle ne se régénère, causant tiraillements et rougeurs.",
        "Un acide par session. Alterner les soirs et suivre d'une crème hydratante neutre."
      ],
      "AHA|BPO": [
        "c",
        7,
        85,
        "Modéré",
        "Séparer AM / PM",
        "Le peroxyde de benzoyle assèche la peau et l'AHA affine la barrière, augmentant la pénétration et le risque d'irritation.",
        "Utiliser le peroxyde le matin ou en nettoyant à rincer, et l'AHA le soir."
      ],
      "AHA|NIA": [
        "s",
        2,
        95,
        "Modéré",
        "Même routine",
        "La niacinamide stimule la synthèse des céramides et compense le stress cutané induit par l'acide glycolique.",
        "Appliquer l'AHA sur peau sèche, attendre quelques minutes, puis appliquer la niacinamide."
      ],
      "AHA|PEP": [
        "c",
        3,
        60,
        "Limité",
        "Séparer AM / PM",
        "À pH 3–4 l'acidité peut hydrolyser certains peptides et réduire leur efficacité de signalisation.",
        "Acide le soir et peptides le matin, ou utilisation en jours alternés."
      ],
      "AHA|RET": [
        "c",
        9,
        75,
        "Solide",
        "Soirs alternés",
        "Les deux actifs accélèrent fortement le renouvellement cellulaire, risquant une desquamation sévère en superposition.",
        "Ne jamais superposer. Alterner les soirs pour préserver la tolérance cutanée."
      ],
      "AHA|VC": [
        "c",
        6,
        80,
        "Modéré",
        "Séparer AM / PM",
        "L'acide L-ascorbique et les AHA nécessitent un pH acide. La double charge acide provoque des picotements.",
        "Vitamine C le matin sous protection solaire, AHA deux à trois soirs par semaine."
      ],
      "BHA|BPO": [
        "n",
        6,
        90,
        "Modéré",
        "Espacer l'application",
        "Association courante contre les imperfections mais asséchante. Le BHA désincruste les pores et le BPO réduit les bactéries.",
        "BHA le matin et BPO le soir. Hydrater intensément entre les étapes."
      ],
      "BHA|NIA": [
        "s",
        1,
        95,
        "Modéré",
        "Même routine",
        "Le BHA élimine le sébum folliculaire et la niacinamide régule la brillance tout en apaisant les rougeurs.",
        "Appliquer le BHA, attendre 5 minutes, puis appliquer la niacinamide."
      ],
      "BHA|PEP": [
        "n",
        2,
        85,
        "Limité",
        "Espacer l'application",
        "Les peptides sont plus stables à pH neutre. Le BHA acide peut réduire temporairement leur efficacité.",
        "Appliquer le BHA d'abord, attendre 10 à 15 minutes avant le sérum peptidique."
      ],
      "BHA|RET": [
        "c",
        8,
        75,
        "Solide",
        "Soirs alternés",
        "Le BHA élimine les lipides de surface et amplifie l'absorption du rétinol, favorisant rougeurs et desquamation.",
        "Alterner les soirs. Réserver le BHA aux soirs sans rétinoïdes."
      ],
      "BHA|VC": [
        "n",
        4,
        85,
        "Modéré",
        "Espacer l'application",
        "Les deux actifs fonctionnent à pH acide sans se neutraliser mais peuvent provoquer des picotements.",
        "Vitamine C le matin et BHA le soir reste la répartition la plus confortable."
      ],
      "BPO|NIA": [
        "s",
        2,
        95,
        "Modéré",
        "Même routine",
        "La niacinamide offre une action anti-inflammatoire qui contrebalance l'assèchement provoqué par le peroxyde.",
        "Appliquer une fine couche de peroxyde, puis la niacinamide et une crème."
      ],
      "BPO|PEP": [
        "c",
        3,
        55,
        "Limité",
        "Séparer AM / PM",
        "Le peroxyde de benzoyle est un puissant oxydant capable de rompre les liaisons peptidiques.",
        "Séparer les sessions : peroxyde le matin, peptides le soir."
      ],
      "BPO|RET": [
        "c",
        9,
        30,
        "Solide",
        "Séparer AM / PM",
        "Le peroxyde oxyde le rétinol et la trétinoïne, dégradant la molécule active en surface.",
        "Peroxyde le matin, rétinol le soir. Ne jamais mélanger dans la même application."
      ],
      "BPO|VC": [
        "c",
        8,
        30,
        "Solide",
        "Séparer AM / PM",
        "Le peroxyde de benzoyle oxyde rapidement l'acide L-ascorbique et annule son pouvoir antioxydant.",
        "Vitamine C le matin sous SPF, peroxyde le soir ou en nettoyant."
      ],
      "NIA|PEP": [
        "s",
        1,
        95,
        "Modéré",
        "Même routine",
        "Parfaite harmonie à pH neutre. Les peptides relancent la matrice dermique et la niacinamide renforce la barrière.",
        "Appliquer de la texture fluide à riche : niacinamide, peptides, puis crème."
      ],
      "NIA|RET": [
        "s",
        3,
        95,
        "Solide",
        "Même routine",
        "La niacinamide fortifie la barrière et atténue les rougeurs de rétinisation, facilitant l'observance du soin.",
        "Appliquer le rétinol puis la niacinamide pour apaiser immédiatement la peau."
      ],
      "NIA|VC": [
        "n",
        1,
        95,
        "Solide",
        "Même routine",
        "Les deux actifs opèrent indépendamment et unifient le teint en synergie sans neutralisation chimique.",
        "Utilisation conjointe sans risque. Espacer de quelques minutes si besoin."
      ],
      "PEP|RET": [
        "s",
        2,
        95,
        "Modéré",
        "Même routine",
        "Le rétinol stimule le renouvellement épidermique et les peptides relancent la matrice de collagène.",
        "Sérum aux peptides d'abord, rétinol ensuite, ou peptides le matin et rétinol le soir."
      ],
      "PEP|VC": [
        "c",
        3,
        65,
        "Limité",
        "Séparer AM / PM",
        "Le pH acide de la vitamine C pure peut inactiver les peptides de cuivre par oxydation redox.",
        "Vitamine C le matin, peptides le soir pour préserver l'efficacité des deux actifs."
      ],
      "RET|VC": [
        "s",
        4,
        85,
        "Solide",
        "Séparer AM / PM",
        "La vitamine C protège contre le stress oxydatif le jour et le rétinol répare les structures dermiques la nuit.",
        "Vitamine C le matin sous protection solaire, rétinol strictement le soir."
      ]
    },
    "DIR": {
      "BPO|VC": {
        "irritation": 4,
        "potency": 20,
        "schedule": "Séparer AM / PM",
        "mechanism": "Les résidus de peroxyde de benzoyle oxydent immédiatement l'acide L-ascorbique appliqué ensuite, effondrant la puissance antioxydante de l'ascorbate.",
        "advice": "Appliquez la vitamine C le matin et le peroxyde de benzoyle le soir, ou rincez abondamment le peroxyde avant le sérum."
      },
      "VC|BPO": {
        "irritation": 4,
        "potency": 30,
        "schedule": "Séparer AM / PM",
        "mechanism": "L'acide L-ascorbique réduit le peroxyde de benzoyle, affaiblissant l'action antibactérienne tout en provoquant l'oxydation de l'ascorbate.",
        "advice": "Séparez les applications : réservez la vitamine C au matin et le peroxyde de benzoyle au soir."
      },
      "AHA|RET": {
        "irritation": 4,
        "potency": 40,
        "schedule": "Soirs alternés",
        "mechanism": "L'acide glycolique acidifie la couche cornée sous le pH optimal (5.5–6.5) de la rétinol déshydrogénase, réduisant la conversion tout en augmentant l'irritation.",
        "advice": "Ne superposez pas ces actifs ; alternez les soirs entre AHA et rétinol pour préserver l'efficacité enzymatique."
      },
      "RET|AHA": {
        "irritation": 4,
        "potency": 60,
        "schedule": "Soirs alternés",
        "mechanism": "Le rétinol pénètre les structures lipidiques avant l'acide, préservant une meilleure conversion enzymatique, bien que l'exfoliation suivante amplifie l'irritation.",
        "advice": "Même avec une conversion partiellement préservée, alternez les soirs pour éviter toute rupture de barrière."
      },
      "BHA|RET": {
        "irritation": 3,
        "potency": 55,
        "schedule": "Soirs alternés",
        "mechanism": "L'acide salicylique acidifie modérément la peau et dissout les lipides folliculaires, diminuant l'efficacité enzymatique tout en augmentant l'absorption.",
        "advice": "Alternez les soirs ou utilisez le BHA le matin et le rétinol le soir pour préserver la tolérance cutanée."
      },
      "RET|BHA": {
        "irritation": 3,
        "potency": 70,
        "schedule": "Soirs alternés",
        "mechanism": "Appliquer le rétinol d'abord permet son absorption au pH cutané de base ; le BHA appliqué ensuite limite l'irritation tout en préservant la conversion.",
        "advice": "Espacez d'au moins 30 minutes si superposés, ou alternez de préférence les soirs."
      },
      "AHA|BPO": {
        "irritation": 4,
        "potency": 35,
        "schedule": "Séparer AM / PM",
        "mechanism": "L'exfoliation aux AHA affine la couche cornée, permettant au peroxyde de benzoyle de pénétrer trop profondément avec un risque élevé de brûlure cutanée.",
        "advice": "N'appliquez jamais de peroxyde de benzoyle directement après un AHA ; séparez matin et soir."
      },
      "BPO|AHA": {
        "irritation": 4,
        "potency": 45,
        "schedule": "Séparer AM / PM",
        "mechanism": "Le peroxyde de benzoyle assèche la surface ; l'acide glycolique appliqué ensuite provoque des picotements intenses sur une peau sensibilisée.",
        "advice": "Séparez totalement : utilisez le peroxyde le matin ou en nettoyant, et l'AHA certains soirs."
      },
      "RET|BPO": {
        "irritation": 4,
        "potency": 45,
        "schedule": "Séparer AM / PM",
        "mechanism": "Laisser le rétinol pénétrer d'abord permet d'absorber une partie de l'actif ; le peroxyde n'oxyde alors que les résidus de surface.",
        "advice": "Ne superposez pas dans la même séance ; appliquez le rétinol le soir et le peroxyde de benzoyle le matin."
      },
      "BPO|RET": {
        "irritation": 4,
        "potency": 30,
        "schedule": "Séparer AM / PM",
        "mechanism": "Les résidus de peroxyde de benzoyle dégradent le rétinol dès l'application avant toute pénétration, entraînant une perte d'efficacité majeure.",
        "advice": "Séparation stricte : appliquez le peroxyde le matin ou en produit à rincer et le rétinol le soir."
      },
      "VC|PEP": {
        "irritation": 3,
        "potency": 30,
        "schedule": "Séparer AM / PM",
        "mechanism": "Le pH très acide de l'acide L-ascorbique (pH ≤ 3.5) hydrolyse les liaisons peptidiques des peptides appliqués ensuite, annulant leur signal biologique.",
        "advice": "Appliquez la vitamine C le matin et réservez les sérums aux peptides pour le soir pour garantir leur stabilité."
      },
      "PEP|VC": {
        "irritation": 3,
        "potency": 60,
        "schedule": "Séparer AM / PM",
        "mechanism": "Appliquer les peptides en premier leur permet d'être absorbés ; l'acide ascorbique appliqué ensuite n'affecte que les résidus de surface.",
        "advice": "Attendez au moins 15 à 20 minutes après les peptides avant d'appliquer l'acide, ou séparez complètement les routines."
      },
      "AHA|VC": {
        "irritation": 4,
        "potency": 50,
        "schedule": "Séparer AM / PM",
        "mechanism": "Superposer deux acides à pH bas sature le pouvoir tampon cutané, provoquant brûlure neurosensorielle et stress de la barrière.",
        "advice": "Évitez la superposition : vitamine C le matin sous protection solaire et acide glycolique deux à trois soirs par semaine."
      },
      "VC|AHA": {
        "irritation": 4,
        "potency": 70,
        "schedule": "Séparer AM / PM",
        "mechanism": "L'acide L-ascorbique pénètre d'abord et crée une réserve antioxydante ; l'AHA appliqué ensuite préserve l'activité mais maintient une forte irritation.",
        "advice": "Bien que l'efficacité soit mieux préservée, séparez matin et soir pour prévenir l'inflammation cutanée."
      }
    }
  }
};
  var ORDER = ["RET", "VC", "NIA", "BHA", "AHA", "BPO", "PEP"];

  function getMatrix() {
    var curLang = getLang();
    return MATRIX_BY_LANG[curLang] || MATRIX_BY_LANG.en;
  }

  function key(a, b) {
    return [a, b].sort().join("|");
  }

  function recordFromArray(a) {
    return {
      verdict: a[0],
      irritation: a[1],
      potency: a[2],
      evidence: a[3],
      schedule: a[4],
      mechanism: a[5],
      advice: a[6]
    };
  }

  // Directional overrides for one language.
  function overridesFor(m) {
    return m.DIR || {};
  }

  function lookup(a, b) {
    var m = getMatrix();
    var base = recordFromArray(m.DB[key(a, b)] || m.DB[key(b, a)] || ["n", 1, 90, "", "", "", ""]);
    var dir = m.DIR || {};
    var fwd = dir[a + "|" + b];
    var rev = dir[b + "|" + a];
    var out = Object.assign({}, base, fwd || {});
    var other = Object.assign({}, base, rev || {});
    out.order = [a, b];
    out.directional = !!fwd;
    var cmpFields = ["verdict", "irritation", "potency", "schedule", "mechanism", "advice"];
    out.reversedDiffers = cmpFields.some(function (k) {
      return out[k] !== other[k];
    });
    out.reverse = other;
    return out;
  }

  function stats() {
    var m = getMatrix();
    var n = ORDER.length;
    return {
      actives: n,
      pairs: Object.keys(m.DB).length,
      ordered: n * (n - 1),
      overrides: Object.keys(m.DIR || {}).length
    };
  }

  window.DermAuditMatrix = {
    ORDER: ORDER,
    getMatrix: getMatrix,
    getLang: getLang,
    lookup: lookup,
    stats: stats
  };
})();