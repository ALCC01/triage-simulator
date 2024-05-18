export enum Code {
  EXPECTANT = 4,
  IMMEDIATE = 3,
  DELAYED = 2,
  MINOR = 1
}

export abstract class TriageAlgorithm<T, A> {
  abstract newPatient (code: Code): T
  abstract action (action: A, p: T): Partial<T>
  abstract getFeedback (p: T): string[]
}
