import { removeCombiningMarks, removeControlCharacters, removeDiacritics, removeIllegalCharacters, replaceSmartTypography } from '../normalizers/special-characters'
import { titleCase } from '../normalizers/string-case'
import { normalizePunctuationSpacing, normalizeWhitespace, removeExtraSpaces } from '../normalizers/whitespace'
import { isValidString } from '../utils'

function normalizeName(text: string): string {
  if (!isValidString(text)) {
    return ''
  }
  text = text.toLowerCase().trim()
  text = replaceSmartTypography(removeCombiningMarks(removeControlCharacters(removeDiacritics(removeIllegalCharacters((text))))))
  text = normalizeWhitespace(removeExtraSpaces(normalizePunctuationSpacing((text), {
    tightPunctuation: ['-', "'"]
  })))
  text = titleCase(text, {
    separators: [' ', '-', "'"]
  })
  return text
}

export { normalizeName }
