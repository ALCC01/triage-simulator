export const cx = (...args: unknown[]): string => args
  .flat()
  .filter(x => typeof x === 'string')
  .join(' ')
  .trim()
