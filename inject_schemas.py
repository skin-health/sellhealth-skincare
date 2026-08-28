import os

base_dir = r'C:\Users\A2\OneDrive\Documents\python projects\Sellhealth Project'

files_data = {
    'kollagen-intensiv-review.html': {
        'product': {
            'name': 'Kollagen Intensiv™',
            'image': 'KollagenIntensiv.jpg',
            'description': 'Clinically advanced anti-aging collagen renewal cream featuring patented Syn-Coll® peptide technology proven to boost natural collagen production by 354% and reduce wrinkle appearance by 84%.',
            'brand': 'Skinception',
            'ratingValue': '4.8', 'reviewCount': '247',
            'url': 'https://www.kollagenintensiv.com/ct/282956',
            'price': '59.95'
        },
        'faq': [
            {'q': 'Can I use Kollagen Intensiv morning and night?', 'a': 'Yes! It is specifically formulated as a 2-in-1 day cream and night treatment. In the morning, apply a thin layer before sunscreen. At night, apply after cleansing so the peptides can work while you sleep.'},
            {'q': 'Does it make my skin peel like Retinol?', 'a': 'No. Unlike prescription retinoids that cause the "retinol uglies" (redness, flaking, burning), Kollagen Intensiv uses gentle peptides and soothing botanicals that rebuild your skin barrier without irritation.'}
        ]
    },
    'dermefface-fx7-review.html': {
        'product': {
            'name': 'Dermefface FX7® Scar Reduction Therapy',
            'image': 'dermefface.jpg',
            'description': 'Advanced dermatological scar reduction therapy formulated with 7 clinically proven actives and peptides including 10% Symglucan and 2% Pro-Coll-One+ to boost Type I collagen by 1190%.',
            'brand': 'Skinception',
            'ratingValue': '4.7', 'reviewCount': '186',
            'url': 'https://www.dermeffacefx7.com/ct/282956',
            'price': '59.95'
        },
        'faq': [
            {'q': 'Does Dermefface FX7 work on old scars?', 'a': 'Yes! While fresh scars remodel faster, Dermefface FX7 is clinically formulated to soften and fade mature scars that are years old. For older scars, we recommend consistent use for 60 to 90 days.'},
            {'q': 'Can I use it on pitted acne scars?', 'a': 'Yes. The Pro-Coll-One+ peptide stimulates Type I collagen synthesis directly inside the depressed pits to help fill and smooth indented post-acne texture.'}
        ]
    },
    'illuminatural-6i-review.html': {
        'product': {
            'name': 'Illuminatural 6i™ Advanced Skin Lightener',
            'image': 'illuminatural.jpg',
            'description': 'Botanical skin brightening corrector featuring six clinical actives including Alpha-Arbutin and Niacinamide that inhibit melanin synthesis to fade dark spots without toxic hydroquinone.',
            'brand': 'Skinception',
            'ratingValue': '4.6', 'reviewCount': '193',
            'url': 'https://www.illuminatural6i.com/ct/282956',
            'price': '49.95'
        },
        'faq': [
            {'q': 'Can I use Illuminatural 6i on post-acne marks?', 'a': 'Yes! It is one of the most popular uses for Illuminatural 6i. It rapidly calms post-inflammatory hyperpigmentation (PIH) and clears stubborn red and brown acne spots.'},
            {'q': 'Will it lighten my normal skin color?', 'a': 'No. Illuminatural 6i only interrupts hyperactive, panicked melanin production in dark spots. It will not bleach or alter your natural baseline skin tone.'}
        ]
    },
    'kerassentials-review.html': {
        'product': {
            'name': 'Kerassentials™ Nail & Skin Recovery Oil',
            'image': 'kerassentials.jpg',
            'description': 'Professional-grade nail and skin recovery oil featuring Undecylenic Acid (USP 5%) and a 4-oil botanical matrix to combat drug-resistant fungus and rebuild clear keratin nail beds.',
            'brand': 'Kerassentials',
            'ratingValue': '4.5', 'reviewCount': '312',
            'url': 'https://bcc98cmbc7vi94g3q3t7as3h4m.hop.clickbank.net',
            'price': '69.00'
        },
        'faq': [
            {'q': 'How often should I apply Kerassentials?', 'a': 'For best results, apply 4 times daily (twice in the morning and twice in the afternoon/evening). Use the enclosed brush applicator to coat the nail surface and use a cotton swab to work the oil into the cuticle and under the nail tip.'},
            {'q': 'Can I wear nail polish while using Kerassentials?', 'a': 'We recommend avoiding thick cosmetic nail polishes during the active recovery phase because polish seals in moisture and prevents the essential oil matrix from penetrating deep into the nail bed.'}
        ]
    },
    'revitag-review.html': {
        'product': {
            'name': 'ReviTag™ Skin Tag & Blemish Serum',
            'image': 'revitag.jpg',
            'description': 'Natural skin tag removal serum using collagen-untangling mechanism with Colloidal Oatmeal, Sea Buckthorn Omega-7, and Epicatechin to painlessly dry and shed skin tags.',
            'brand': 'ReviTag',
            'ratingValue': '4.5', 'reviewCount': '204',
            'url': 'https://3f9bafm1t3xb7i2mu1ld2i9k8n.hop.clickbank.net',
            'price': '69.00'
        },
        'faq': [
            {'q': 'Does ReviTag sting or burn when applied?', 'a': 'Not at all! Unlike drugstore chemical wart-freezers or burning acids, ReviTag feels like a smooth, soothing facial oil. It contains Colloidal Oatmeal and Sea Buckthorn to actively calm irritated skin.'},
            {'q': 'Can I use it on sensitive areas like my neck or underarms?', 'a': 'Yes. Friction zones like the neck, collarbone, underarms, and under the chest are where skin tags form most often. ReviTag\'s non-greasy formula was specifically formulated for these friction-prone areas. (Avoid direct contact with eyes).'}
        ]
    },
    'axavive-review.html': {
        'product': None,
        'faq': [
            {'q': 'Can I take Axavive along with my regular daily moisturizer?', 'a': 'Absolutely! In fact, pairing an oral nutricosmetic like Axavive with a topical cream like Kollagen Intensiv is considered the ultimate "inside-out + outside-in" skincare stack.'},
            {'q': 'Are there any side effects or allergens?', 'a': 'Axavive is formulated with 100% natural botanical extracts, free of soy, dairy, gluten, and GMOs. It is gentle on the stomach and manufactured under strict cGMP standards.'}
        ]
    },
    'synevra-ultralift-review.html': {
        'product': None,
        'faq': [
            {'q': 'Will Synevra make my face look frozen or stiff?', 'a': 'Not at all! Unlike neurotoxin injections that completely freeze muscles, SYN-AKE® produces a gentle, natural relaxation of surface twitching while letting you smile, laugh, and express yourself freely.'},
            {'q': 'How do I use the serum and capsules together?', 'a': 'Apply 3–4 drops of the UltraLift serum to clean skin morning and evening, gently massaging into forehead, brow, and smile creases. Take 2 VitaLock™ capsules daily with a glass of water.'}
        ]
    }
}

product_template = """
  <!-- JSON-LD Product & Offer Schema -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "{name}",
    "image": "https://dermaudit.com/Pictures/{image}",
    "description": "{description}",
    "brand": {{
      "@type": "Brand",
      "name": "{brand}"
    }},
    "aggregateRating": {{
      "@type": "AggregateRating",
      "ratingValue": "{ratingValue}",
      "reviewCount": "{reviewCount}",
      "bestRating": "5",
      "worstRating": "1"
    }},
    "offers": {{
      "@type": "Offer",
      "url": "{url}",
      "priceCurrency": "USD",
      "price": "{price}",
      "priceValidUntil": "2026-12-31",
      "validFrom": "2026-01-01",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "hasMerchantReturnPolicy": {{
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 90,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/ReturnFeesCustomerResponsibility"
      }},
      "shippingDetails": {{
        "@type": "OfferShippingDetails",
        "shippingRate": {{
          "@type": "MonetaryAmount",
          "value": "0.00",
          "currency": "USD"
        }},
        "shippingDestination": {{
          "@type": "DefinedRegion",
          "addressCountry": "US"
        }},
        "deliveryTime": {{
          "@type": "ShippingDeliveryTime",
          "transitTime": {{
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 5,
            "unitCode": "DAY"
          }}
        }}
      }}
    }}
  }}
  </script>"""

faq_template = """
  <!-- JSON-LD FAQPage Schema -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {{
        "@type": "Question",
        "name": "{q1}",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "{a1}"
        }}
      }},
      {{
        "@type": "Question",
        "name": "{q2}",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "{a2}"
        }}
      }}
    ]
  }}
  </script>
</head>"""

for filename, data in files_data.items():
    filepath = os.path.join(base_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_blocks = ""

    if data['product']:
        new_blocks += product_template.format(**data['product'])
    
    new_blocks += faq_template.format(q1=data['faq'][0]['q'], a1=data['faq'][0]['a'], q2=data['faq'][1]['q'], a2=data['faq'][1]['a'])

    # Find </head> and replace it with the new blocks
    content = content.replace("</head>", new_blocks)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("All schemas injected successfully.")
