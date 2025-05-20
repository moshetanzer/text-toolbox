import { removeCombiningMarks, removeControlCharacters, removeDiacritics, removeIllegalCharacters, removeNonASCII } from '../normalizers/special-characters'
import { titleCase } from '../normalizers/string-case'
import { normalizePunctuationSpacing, normalizeWhitespace, removeExtraSpaces } from '../normalizers/whitespace'

function normalizeName(text: string): string {
  text = text.toLowerCase().trim()
  text = normalizePunctuationSpacing(text)
  text = removeCombiningMarks(removeControlCharacters(removeDiacritics(removeIllegalCharacters(removeNonASCII(text)))))
  text = normalizeWhitespace(removeExtraSpaces(normalizePunctuationSpacing((text))))
  text = titleCase(text)
  return text
}

export {
  normalizeName
}
