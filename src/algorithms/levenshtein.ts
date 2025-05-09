// https://github.com/ka-weihe/fastest-levenshtein
import type { SimilarityAlgorithm, SimilarityOptions, SimilarityResult } from '../types'
import { distanceToSimilarity, preprocessStrings } from '../utils'

const peq = new Uint32Array(0x10000)
function myers_32(a: string, b: string): number {
  const n = a.length
  const m = b.length
  const lst = 1 << (n - 1)
  let pv = -1
  let mv = 0
  let sc = n
  let i = n
  while (i--) {
    peq[a.charCodeAt(i)] |= 1 << i
  }
  for (i = 0; i < m; i++) {
    let eq = peq[b.charCodeAt(i)]
    const xv = eq | mv
    eq |= ((eq & pv) + pv) ^ pv
    mv |= ~(eq | pv)
    pv &= eq
    if (mv & lst) {
      sc++
    }
    if (pv & lst) {
      sc--
    }
    mv = (mv << 1) | 1
    pv = (pv << 1) | ~(xv | mv)
    mv &= xv
  }
  i = n
  while (i--) {
    peq[a.charCodeAt(i)] = 0
  }
  return sc
}

function myers_x(b: string, a: string): number {
  const n = a.length
  const m = b.length
  const mhc = []
  const phc = []
  const hsize = Math.ceil(n / 32)
  const vsize = Math.ceil(m / 32)
  for (let i = 0; i < hsize; i++) {
    phc[i] = -1
    mhc[i] = 0
  }
  let j = 0
  for (; j < vsize - 1; j++) {
    let mv = 0
    let pv = -1
    const start = j * 32
    const vlen = Math.min(32, m) + start
    for (let k = start; k < vlen; k++) {
      peq[b.charCodeAt(k)] |= 1 << k
    }
    for (let i = 0; i < n; i++) {
      const eq = peq[a.charCodeAt(i)]
      const pb = (phc[(i / 32) | 0] >>> i) & 1
      const mb = (mhc[(i / 32) | 0] >>> i) & 1
      const xv = eq | mv
      const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb
      let ph = mv | ~(xh | pv)
      let mh = pv & xh
      if ((ph >>> 31) ^ pb) {
        phc[(i / 32) | 0] ^= 1 << i
      }
      if ((mh >>> 31) ^ mb) {
        mhc[(i / 32) | 0] ^= 1 << i
      }
      ph = (ph << 1) | pb
      mh = (mh << 1) | mb
      pv = mh | ~(xv | ph)
      mv = ph & xv
    }
    for (let k = start; k < vlen; k++) {
      peq[b.charCodeAt(k)] = 0
    }
  }
  let mv = 0
  let pv = -1
  const start = j * 32
  const vlen = Math.min(32, m - start) + start
  for (let k = start; k < vlen; k++) {
    peq[b.charCodeAt(k)] |= 1 << k
  }
  let score = m
  for (let i = 0; i < n; i++) {
    const eq = peq[a.charCodeAt(i)]
    const pb = (phc[(i / 32) | 0] >>> i) & 1
    const mb = (mhc[(i / 32) | 0] >>> i) & 1
    const xv = eq | mv
    const xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb
    let ph = mv | ~(xh | pv)
    let mh = pv & xh
    score += (ph >>> (m - 1)) & 1
    score -= (mh >>> (m - 1)) & 1
    if ((ph >>> 31) ^ pb) {
      phc[(i / 32) | 0] ^= 1 << i
    }
    if ((mh >>> 31) ^ mb) {
      mhc[(i / 32) | 0] ^= 1 << i
    }
    ph = (ph << 1) | pb
    mh = (mh << 1) | mb
    pv = mh | ~(xv | ph)
    mv = ph & xv
  }
  for (let k = start; k < vlen; k++) {
    peq[b.charCodeAt(k)] = 0
  }
  return score
}

function levenshteinInternal(a: string, b: string): number {
  if (a.length < b.length) {
    const tmp = b
    b = a
    a = tmp
  }
  if (b.length === 0) {
    return a.length
  }
  if (a.length <= 32) {
    return myers_32(a, b)
  }
  return myers_x(a, b)
};

export class Levenshtein implements SimilarityAlgorithm {
  private defaultOptions: SimilarityOptions = {
    caseSensitive: true,
  }

  public compare(str1: string, str2: string, options?: SimilarityOptions): SimilarityResult {
    const mergedOptions: SimilarityOptions = { ...this.defaultOptions, ...options }
    const [processedStr1, processedStr2] = preprocessStrings(str1, str2, mergedOptions)
    const distance = levenshteinInternal(processedStr1, processedStr2)
    const maxDistance = Math.max(processedStr1.length, processedStr2.length)
    const similarity = distanceToSimilarity(distance, maxDistance)
    return { distance, similarity }
  }

  public similarity(str1: string, str2: string, options?: SimilarityOptions): number {
    return this.compare(str1, str2, options).similarity
  }

  public distance(str1: string, str2: string, options?: SimilarityOptions): number {
    return this.compare(str1, str2, options).distance
  }
}

export const levenshtein = new Levenshtein()
