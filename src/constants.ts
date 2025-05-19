export const COMPATIBILTITY_CHARACTERS: Record<string, string> = {
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
