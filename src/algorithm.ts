import { randomInt, randomBool, randomFloat } from './utils'

export enum Code {
  EXPECTANT = 4,
  IMMEDIATE = 3,
  DELAYED = 2,
  MINOR = 1
}

export interface Patient {
  id: number
  age: number
  code: Code
  assignedCode?: Code
  bleeding: boolean
  bleedingControlled?: boolean
  walking?: boolean
  breathing?: boolean
  airwayObstruction: boolean
  airwayCleared?: boolean
  respiratoryRate?: number
  capillaryRefill?: number
  obeys?: boolean
}

export enum Feedback {
  CODE_NOT_ASSIGNED,
  CODE_CORRECT,
  CODE_INCORRECT,
  BLEEDING_CONTROLLED,
  BLEEDING_NOT_CONTROLLED,
  BLEEDING_NOT_NEEDED,
  AIRWAY_CLEARED,
  AIRWAY_NOT_CLEARED,
  AIRWAY_NOT_NEEDED,
  PROGRESS_STOP_MOBILTY,
  PROGRESS_STOP_RESPIRATORY_RATE,
  PROGRESS_STOP_CAPILLARY_REFILL,
}

abstract class TriageAlgorithm {
  abstract newPatient (code: Code): Patient
  abstract controlBleeding (): Partial<Patient>
  abstract clearAirway (): Partial<Patient>
  abstract checkRespiratoryRate (p: Patient): Partial<Patient>
  abstract checkCapillaryRefill (p: Patient): Partial<Patient>
  abstract checkMentalStatus (p: Patient): Partial<Patient>
  abstract checkWalking (p: Patient): Partial<Patient>
  abstract getFeedback (p: Patient): Feedback[]
}

class Start extends TriageAlgorithm {
  newPatient (code: Code, id?: number): Patient {
    const age = randomInt(0, 80)
    const airwayObstruction = code === Code.IMMEDIATE ? randomBool(0.3) : false
    const bleeding = !!randomBool(0.3)
    const bleedingControlled = false

    return { id: id ?? randomInt(0, 500), age, code, airwayObstruction, bleeding, bleedingControlled }
  }

  controlBleeding (): Partial<Patient> {
    return { bleedingControlled: true }
  }

  clearAirway (): Partial<Patient> {
    return { airwayCleared: true }
  }

  checkRespiratoryRate ({ code, airwayObstruction, airwayCleared }: Patient): Partial<Patient> {
    const obstructed = airwayObstruction && airwayCleared !== true

    let respiratoryRate = 0 // Default value for expectant patients
    if (code < Code.IMMEDIATE) respiratoryRate = randomInt(5, 30)
    if (code === Code.IMMEDIATE) respiratoryRate = obstructed ? 0 : randomInt(10, 45)

    return { respiratoryRate }
  }

  checkCapillaryRefill ({ code }: Patient): Partial<Patient> {
    let capillaryRefill = 0
    if (code === Code.EXPECTANT) capillaryRefill = randomFloat(2, 10)
    else if (code === Code.IMMEDIATE) capillaryRefill = randomFloat(0, 4)
    else capillaryRefill = randomFloat(0, 2)

    return { capillaryRefill }
  }

  checkMentalStatus ({ code }: Patient): Partial<Patient> {
    const obeys = code < Code.IMMEDIATE

    return { obeys }
  }

  checkWalking ({ code }: Patient): Partial<Patient> {
    const walking = code <= Code.MINOR
    return { walking }
  }

  getFeedback (p: Patient): Feedback[] {
    const feedback = []

    if (p.assignedCode === undefined) feedback.push(Feedback.CODE_NOT_ASSIGNED)
    else if (p.assignedCode !== p.code) {
      feedback.push(Feedback.CODE_INCORRECT)
    } else feedback.push(Feedback.CODE_CORRECT)

    if (p.bleeding) {
      if (p.bleedingControlled === true) feedback.push(Feedback.BLEEDING_CONTROLLED)
      else feedback.push(Feedback.BLEEDING_NOT_CONTROLLED)
    } else if (p.bleedingControlled === true) feedback.push(Feedback.BLEEDING_NOT_NEEDED)

    if (p.airwayObstruction || p.code === Code.EXPECTANT) {
      if (p.airwayCleared === true) feedback.push(Feedback.AIRWAY_CLEARED)
      else if (p.respiratoryRate !== undefined) feedback.push(Feedback.AIRWAY_NOT_CLEARED) // Wait until respiratory rate is checked
    } else if (p.airwayCleared === true) feedback.push(Feedback.AIRWAY_NOT_NEEDED)

    if (p.code === Code.MINOR && (p.respiratoryRate !== undefined || p.obeys !== undefined || p.capillaryRefill !== undefined)) {
      feedback.push(Feedback.PROGRESS_STOP_MOBILTY)
    } else if (p.respiratoryRate !== undefined && (p.respiratoryRate === 0 || p.respiratoryRate > 30 || p.airwayObstruction) && (p.obeys !== undefined || p.capillaryRefill !== undefined)) {
      feedback.push(Feedback.PROGRESS_STOP_RESPIRATORY_RATE)
    } else if (p.capillaryRefill !== undefined && p.capillaryRefill >= 2 && p.obeys !== undefined) {
      feedback.push(Feedback.PROGRESS_STOP_CAPILLARY_REFILL)
    }

    return feedback
  }
}

export const START = new Start()
