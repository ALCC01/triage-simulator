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
  1: ['bg-green-600', 'border-green-600'],
  2: ['bg-amber-400', 'border-amber-400'],
  3: ['bg-red-600', 'border-red-600'],
  4: ['bg-gray-800', 'border-gray-800']
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
