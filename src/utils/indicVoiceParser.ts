import { SupportedDialect } from './dialect';

export interface ParsedVoiceListing {
  rawTranscript: string;
  dialectDetected: SupportedDialect;
  cropNameEn: string;
  cropNameHi: string;
  variety: string;
  ratePerKg: number;
  ratePerQuintal: number;
  totalQuantityKg: number;
  totalQuantityQuintals: number;
  estimatedPayout: number;
  confidence: number;
  matchedFields: string[];
}

export interface DialectSample {
  id: string;
  dialect: SupportedDialect;
  dialectLabel: string;
  speakerTag: string;
  transcript: string;
  translation: string;
}

export const DIALECT_PRESET_SAMPLES: DialectSample[] = [
  {
    id: 'sample-malvi',
    dialect: 'mal',
    dialectLabel: 'मालवी (Malwa MP)',
    speakerTag: 'सीहोर किसान रामचरण',
    transcript: 'सीहोर खेत को शरबती गेहूं चालीस क्विंटल अट्ठाईस सौ रुपया भाव में बेचणो है',
    translation: 'Want to sell 40 quintals of Sharbati Wheat from Sehore at ₹2800/quintal.',
  },
  {
    id: 'sample-hindi',
    dialect: 'hi',
    dialectLabel: 'हिंदी (National)',
    speakerTag: 'किसान वॉइस डिक्टेशन',
    transcript: 'सरसों तीस क्विंटल छप्पन सौ पचास रुपये क्विंटल भाव सीधी बिक्री',
    translation: 'Mustard 30 quintals at ₹5650 per quintal for direct sale.',
  },
  {
    id: 'sample-punjabi',
    dialect: 'pa',
    dialectLabel: 'ਪੰਜਾਬੀ (Punjab)',
    speakerTag: 'ਬਠਿੰਡਾ ਕਿਸਾਨ ਬਲਰਾਮ',
    transcript: 'ਬਾਸਮਤੀ ਝੋਨਾ ਪੰਜਾਹ ਕੁਇੰਟਲ ਬਤਾਲੀ ਸੌ ਰੁਪਏ ਭਾਅ ਦਰਜ ਕਰੋ ਜੀ',
    translation: 'Register Basmati Paddy 50 quintals at rate of ₹4200/quintal.',
  },
  {
    id: 'sample-bhojpuri',
    dialect: 'bho',
    dialectLabel: 'भोजपुरी (Purvanchal)',
    speakerTag: 'किसान भाई गंगा राम',
    transcript: 'देसी टमाटर बीस क्विंटल बाईस रुपया किलो के भाव से बेचे के बा',
    translation: 'Want to sell 20 quintals of native tomatoes at rate of ₹22/kg.',
  },
  {
    id: 'sample-english',
    dialect: 'en',
    dialectLabel: 'English (Kisan Assistant)',
    speakerTag: 'English Voice Prompt',
    transcript: 'Sell 35 quintals of Organic Wheat at rate of 2850 rupees per quintal',
    translation: 'Sell 35 quintals of Organic Wheat at rate of ₹2850 per quintal.',
  },
];

// Indic numbers dictionary for speech normalization
const NUMBER_WORDS: Record<string, number> = {
  दस: 10, बीस: 20, तीस: 30, चालीस: 40, पचास: 50, साठ: 60, सत्तर: 70, अस्सी: 80, नब्बे: 90, सौ: 100,
  पंद्रह: 15, पच्चीस: 25, पैंतीस: 35, पैंतालीस: 45, बचपन: 55,
  ਦਸ: 10, ਵੀਹ: 20, ਤੀਹ: 30, ਚਾਲੀ: 40, ਪੰਜਾਹ: 50, ਸੱਠ: 60, ਸੱਤਰ: 70, ਅੱਸੀ: 80, ਨੱਬੇ: 90, ਸੌ: 100,
  ten: 10, twenty: 20, thirty: 30, forty: 40, fifty: 50, hundred: 100,
};

export function parseIndicVoiceCommand(text: string, currentDialect: SupportedDialect = 'hi'): ParsedVoiceListing {
  const lower = text.toLowerCase();
  let cropEn = 'Sharbati Wheat';
  let cropHi = 'शरबती गेहूं';
  let variety = 'Organic Heritage Grade A';
  let qtyQuintals = 30;
  let ratePerQuintal = 2800;
  const matchedFields: string[] = [];

  // 1. Detect Crop Name
  if (lower.includes('गेहूं') || lower.includes('ਕਣਕ') || lower.includes('wheat') || lower.includes('गहू')) {
    cropEn = 'Sharbati Wheat';
    cropHi = 'शरबती गेहूं';
    variety = 'C-306 Gold Grain';
    ratePerQuintal = 2850;
    matchedFields.push('Crop: Wheat / गेहूं');
  } else if (lower.includes('सरसों') || lower.includes('ਸਰ੍ਹੋਂ') || lower.includes('mustard') || lower.includes('राई')) {
    cropEn = 'Mustard Seed';
    cropHi = 'पीली सरसों';
    variety = 'Pusa Bold Yellow';
    ratePerQuintal = 5650;
    matchedFields.push('Crop: Mustard / सरसों');
  } else if (lower.includes('धान') || lower.includes('चावल') || lower.includes('ਝੋਨਾ') || lower.includes('rice') || lower.includes('बासमती')) {
    cropEn = 'Basmati Rice (Paddy)';
    cropHi = 'बासमati धान';
    variety = '1121 Pusa Supreme';
    ratePerQuintal = 4200;
    matchedFields.push('Crop: Basmati Rice / धान');
  } else if (lower.includes('टमाटर') || lower.includes('tomato')) {
    cropEn = 'Farm-Fresh Tomatoes';
    cropHi = 'देसी लाल टमाटर';
    variety = 'Abhinav Hybrid Red';
    ratePerQuintal = 2200;
    matchedFields.push('Crop: Tomato / टमाटर');
  } else if (lower.includes('चना') || lower.includes('छोले') || lower.includes('chana') || lower.includes('chickpea')) {
    cropEn = 'Desi Chickpeas';
    cropHi = 'देसी चना';
    variety = 'Kabuli Dollar Grade';
    ratePerQuintal = 6800;
    matchedFields.push('Crop: Chickpeas / चना');
  } else if (lower.includes('सोयाबीन') || lower.includes('soybean')) {
    cropEn = 'Yellow Soybean';
    cropHi = 'पीला सोयाबीन';
    variety = 'JS 9560';
    ratePerQuintal = 4650;
    matchedFields.push('Crop: Soybean / सोयाबीन');
  }

  // 2. Extract Quantity (Quintals or Kg)
  // Look for number words or digits
  const digitMatch = text.match(/(\d+)\s*(क्विंटल|कुਇੰਟਲ|quintal|qtl|kg|किलो|ਕਿਲੋ)/i) || text.match(/(\d+)/);
  if (digitMatch && digitMatch[1]) {
    const val = parseInt(digitMatch[1], 10);
    if (val > 0) {
      if (text.includes('kg') || text.includes('किलो') || text.includes('ਕਿਲੋ')) {
        qtyQuintals = Math.max(1, Math.round(val / 100));
      } else {
        qtyQuintals = val;
      }
      matchedFields.push(`Quantity: ${qtyQuintals} Quintals (${qtyQuintals * 100} kg)`);
    }
  } else {
    // Check Hindi/Indic words
    for (const [word, num] of Object.entries(NUMBER_WORDS)) {
      if (text.includes(word)) {
        qtyQuintals = num;
        matchedFields.push(`Quantity: ${num} Quintals (${num * 100} kg)`);
        break;
      }
    }
  }

  // 3. Extract Price / Rate
  const priceMatch =
    text.match(/(\d{3,5})\s*(रुपया|रुपये|रुपिया|ਰੁਪਏ|rupees|भाव|bhau|rate)/i) ||
    text.match(/(भाव|rate|रुपये|rupees)\s*(\d{3,5})/i);

  if (priceMatch) {
    const rateVal = parseInt(priceMatch[1] || priceMatch[2], 10);
    if (rateVal >= 100) {
      ratePerQuintal = rateVal;
      matchedFields.push(`Rate: ₹${ratePerQuintal}/quintal (₹${(ratePerQuintal / 100).toFixed(1)}/kg)`);
    }
  } else {
    // Look for per kg rate (e.g., 22 रुपया किलो)
    const perKgMatch = text.match(/(\d{1,3})\s*(रुपया|रुपये|रुपिया|rupee|rupees)?\s*(किलो|kg)/i);
    if (perKgMatch && perKgMatch[1]) {
      const kgVal = parseInt(perKgMatch[1], 10);
      ratePerQuintal = kgVal * 100;
      matchedFields.push(`Rate: ₹${kgVal}/kg (₹${ratePerQuintal}/quintal)`);
    }
  }

  const totalQuantityKg = qtyQuintals * 100;
  const ratePerKg = Number((ratePerQuintal / 100).toFixed(1));
  const estimatedPayout = Math.round(totalQuantityKg * ratePerKg);

  return {
    rawTranscript: text,
    dialectDetected: currentDialect,
    cropNameEn: cropEn,
    cropNameHi: cropHi,
    variety,
    ratePerKg,
    ratePerQuintal,
    totalQuantityKg,
    totalQuantityQuintals: qtyQuintals,
    estimatedPayout,
    confidence: matchedFields.length >= 2 ? 0.96 : 0.82,
    matchedFields,
  };
}
