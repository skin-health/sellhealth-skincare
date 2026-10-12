// tools/i18n/es.js: Spanish dictionary for the conflict matrix.
// Loaded by es/skincare-conflict-matrix.html only. Sets window.DERM_I18N.es (read by conflict-matrix.js).
// Keys use double quotes (JSON style). Keep the 42/42 rule coverage (gemini.md).
window.DERM_I18N = window.DERM_I18N || {};
window.DERM_I18N.es = {
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
};
