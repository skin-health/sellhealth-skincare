// tools/i18n/fr.js: French dictionary for the conflict matrix.
// Loaded by fr/skincare-conflict-matrix.html only. Sets window.DERM_I18N.fr (read by conflict-matrix.js).
// Keys use double quotes (JSON style). Keep the 42/42 rule coverage (gemini.md).
window.DERM_I18N = window.DERM_I18N || {};
window.DERM_I18N.fr = {
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
};
