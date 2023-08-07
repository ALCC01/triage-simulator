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
