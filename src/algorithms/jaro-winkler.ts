function jaroWinkler(a: string, b: string): number {
  a = a.toLowerCase()
  b = b.toLowerCase()

  if (a.length === 0 && b.length === 0) {
    return 1
  }
  if (a.length === 0 || b.length === 0) {
    return 0
  }
  if (a === b) {
    return 1
  }

  const matchDistance = Math.floor(Math.max(a.length, b.length) / 2) - 1

  const aMatches = Array.from({ length: a.length }).fill(false)
  const bMatches = Array.from({ length: b.length }).fill(false)

  let matchingCharacters = 0
  for (let i = 0; i < a.length; i++) {
    const low = Math.max(0, i - matchDistance)
    const high = Math.min(i + matchDistance + 1, b.length)

    for (let j = low; j < high; j++) {
      if (!aMatches[i] && !bMatches[j] && a[i] === b[j]) {
        aMatches[i] = true
        bMatches[j] = true
        matchingCharacters++
        break
      }
    }
  }

  if (matchingCharacters === 0) {
    return 0
  }

  let transpositions = 0
  let j = 0

  for (let i = 0; i < a.length; i++) {
    if (aMatches[i]) {
      while (!bMatches[j]) {
        j++
      }

      if (a[i] !== b[j]) {
        transpositions++
      }

      j++
    }
  }

  transpositions = Math.floor(transpositions / 2)

  const jaroSimilarity = (
    matchingCharacters / a.length
    + matchingCharacters / b.length
    + (matchingCharacters - transpositions) / matchingCharacters
  ) / 3

  let commonPrefixLength = 0
  const maxPrefixLength = Math.min(4, Math.min(a.length, b.length))

  for (let i = 0; i < maxPrefixLength; i++) {
    if (a[i] === b[i]) {
      commonPrefixLength++
    }
    else {
      break
    }
  }

  const winklerThreshold = 0.7
  const winklerScalingFactor = 0.1

  let jaroWinklerSimilarity = jaroSimilarity
  if (jaroSimilarity > winklerThreshold) {
    jaroWinklerSimilarity
      += commonPrefixLength * winklerScalingFactor * (1 - jaroSimilarity)
  }

  return jaroWinklerSimilarity
}
export { jaroWinkler }
