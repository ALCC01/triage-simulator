import { type Code } from './algorithm'

export const randomBool = (p: number = 0.5): boolean => {
  return Math.random() < p
}

export const randomFloat = (m: number = 0, M: number = 1): number => {
  return Math.random() * (M - m) + m
}

export const randomInt = (m: number = 0, M: number = 1): number => (Math.floor(randomFloat(m, M)))

export const cx = (...args: unknown[]): string => args
  .flat()
  .filter(x => typeof x === 'string')
  .join(' ')
  .trim()

const colors = {
  0: ['text-gray-400', 'border-gray-400'],
  1: ['text-green-600', 'border-green-600'],
  2: ['text-amber-400', 'border-amber-400'],
  3: ['text-red-600', 'border-red-600'],
  4: ['text-gray-800', 'border-gray-800']
} as const

export const codeToColor = (code: Code): readonly [string, string] => colors[code]

const emojis = {
  1: '🟢',
  2: '🟡',
  3: '🔴',
  4: '⚫️'
}

export const codeToEmoji = (code: Code): string => emojis[code]

export const pct = (n: number): string => {
  if (isNaN(n)) n = 0
  return `${(n * 100).toFixed(2)}%`
}

export const localeToFlag = (cc: string): string => {
  if (cc === 'en') cc = 'eu'

  return cc
    .toUpperCase()
    .split('')
    .map(ch => String.fromCodePoint(ch.charCodeAt(0) + 0x1F1A5))
    .join('')
}

export const pick = (keys: string[], object: Record<string, any>): Record<string, any> =>
  keys.reduce((acc, key) => ({ ...acc, [key]: object[key] }), {})
