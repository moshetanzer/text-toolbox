const COMPATIBILTITY_CHARACTERS_MAP: Record<string, string> = {
  // Germanic/Nordic character replacements
  ß: 'ss', // German eszett
  æ: 'ae', // ae ligature
  Æ: 'AE', // uppercase ae ligature
  ø: 'oe', // Danish/Norwegian slashed o
  Ø: 'OE', // uppercase slashed o
  å: 'aa', // Danish/Norwegian/Swedish ring a
  Å: 'AA', // uppercase ring a

  // Icelandic characters
  ð: 'd', // Small letter eth (ð)
  Ð: 'D', // Capital letter eth (Ð)
  þ: 'th', // Small letter thorn (þ)
  Þ: 'TH', // Capital letter thorn (Þ)

  // Historical characters
  ƿ: 'w', // Lower case wynn (Old English)
  Ƿ: 'W', // Upper case wynn

  // Visually similar replacements
  ħ: 'h', // Small h with stroke (ħ)
  Ħ: 'H', // Capital H with stroke (Ħ)
  ı: 'i', // Dotless i (ı)
  ĸ: 'k', // Small letter kra (ĸ)
  ł: 'l', // Small l with stroke (ł)
  Ł: 'L', // Capital L with stroke (Ł)
  ŋ: 'n', // Small letter eng (ŋ)
  Ŋ: 'N', // Capital letter eng (Ŋ)
  ſ: 's', // Long s (ſ)
  ŧ: 't', // Small t with stroke (ŧ)
  Ŧ: 'T', // Capital T with stroke (Ŧ)

  // Additional ligatures
  œ: 'oe', // oe ligature
  Œ: 'OE', // uppercase oe ligature

  // Extended Latin variants
  đ: 'd', // Small d with stroke (đ)
  Đ: 'D', // Capital D with stroke (Đ)
  ɖ: 'd', // Small letter African d (ɖ)
  ẜ: 's', // Long s with diagonal stroke
  ẝ: 's', // Long s with high stroke
}

const TITLE_SUFFIXES = [
  // Generational / Familial
  'Jr',
  'Sr',
  'II',
  'III',
  'IV',
  'V',
  'VI',

  // Academic Degrees
  'PhD',
  'EdD',
  'DSc',
  'ThD',
  'DM',
  'MD',
  'DO',
  'DDS',
  'DVM',
  'JD',
  'LLB',
  'LLM',
  'MBA',
  'BBA',
  'BSc',
  'BA',
  'MSc',
  'MA',
  'MSW',

  // Certifications & Professional Titles
  'RN',
  'CNA',
  'LPN',
  'CPA',
  'CFA',
  'CFP',
  'PE',
  'CFE',
  'CMA',
  'CISA',
  'CISM',
  'CISSP',

  // Legal / Honorific
  'Esq',
  'Esquire',
  'QC',
  'KC',
  'SC',

  // Religious
  'Rev',
  'Reverend',
  'Fr',
  'Father',
  'Rabbi',
  'Imam',
  'Pastor',

  // Honorary Titles & Orders
  'KBE',
  'OBE',
  'MBE',
  'CH',
  'CMG',
  'CVO',
  'GCMG',
  'DBE',
  'Dame',
  'Sir',

  // Military & Governmental (Post-nominals)
  'Ret',
  'USN',
  'USA',
  'USAF',
  'USMC',
  'USCG',
  'RAF',
  'RCAF',
  'RCN',

  // Miscellaneous
  'Eng',
  'Tech',
  'Arch',
  'Vet',
]

const TITLE_PREFIXES = [
  'Mr',
  'Mrs',
  'Ms',
  'Miss',
  'Mx',
  'Dr',
  'Prof',
  'Professor',
  'Rev',
  'Reverend',
  'Fr',
  'Father',
  'Imam',
  'Sheikh',
  'Rabbi',
  'Canon',
  'Bishop',
  'Archbishop',
  'Cardinal',
  'Pope',
  'Sir',
  'Dame',
  'Lord',
  'Lady',
  'Hon',
  'Judge',
  'Justice',
  'President',
  'Ambassador',
  'Gov',
  'Govt',
  'Senator',
  'Sen',
  'Rep',
  'Capt',
  'Captain',
  'Cmdr',
  'Commander',
  'Lt',
  'Lieutenant',
  'Col',
  'Colonel',
  'Gen',
  'General',
  'Adm',
  'Admiral',
  'Chief',
  'Principal',
  'CEO',
  'CFO',
  'CTO',
]

const ADDRESS_CORRECTION_MAP: Record<string, string> = {
  'st': 'Street',
  'st.': 'Street',
  'rd': 'Road',
  'rd.': 'Road',
  'ave': 'Avenue',
  'ave.': 'Avenue',
  'blvd': 'Boulevard',
  'blvd.': 'Boulevard',
  'ln': 'Lane',
  'ln.': 'Lane',
  'dr': ' Drive',
  'dr.': 'Drive',
  'apt': 'Apartment',
  'apt.': 'Apartment',
  'n': 'North',
  'n.': 'North',
  's': 'South',
  's.': 'South',
  'e': 'East',
  'e.': 'East',
  'w': 'West',
  'w.': 'West',
}
export { ADDRESS_CORRECTION_MAP, COMPATIBILTITY_CHARACTERS_MAP, TITLE_PREFIXES, TITLE_SUFFIXES }
