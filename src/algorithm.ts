import { randomInt, randomBool, randomFloat, codeToEmoji } from './utils'

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

abstract class TriageAlgorithm {
  abstract newPatient (code: Code): Patient
  abstract controlBleeding (): Partial<Patient>
  abstract clearAirway (): Partial<Patient>
  abstract checkRespiratoryRate (p: Patient): Partial<Patient>
  abstract checkCapillaryRefill (p: Patient): Partial<Patient>
  abstract checkMentalStatus (p: Patient): Partial<Patient>
  abstract checkWalking (p: Patient): Partial<Patient>
  abstract getFeedback (p: Patient): string[]
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
    const capillaryRefill = code >= Code.IMMEDIATE ? randomFloat(0, 6) : randomFloat(0, 2)

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

  getFeedback (p: Patient): string[] {
    const feedback = []

    if (p.assignedCode === undefined) feedback.push('❓ You did not assign a code to this patient')
    else if (p.assignedCode !== p.code) {
      feedback.push(`❌ The correct code was ${codeToEmoji(p.code)}, you assigned ${codeToEmoji(p.assignedCode)}`)
    } else feedback.push(`🎉 The correct code was ${codeToEmoji(p.code)}!`)

    if (p.bleeding) {
      if (p.bleedingControlled === true) feedback.push('✅ Bleeding was controlled')
      else feedback.push('❌ Bleeding wasn\'t controlled')
    } else if (p.bleedingControlled === true) feedback.push('❌ Bleeding control wasn\'t needed')

    if (p.airwayObstruction || p.code === Code.EXPECTANT) {
      if (p.airwayCleared === true) feedback.push('✅ Airway was cleared')
      else feedback.push('❌ Airway wasn\'t cleared')
    } else if (p.airwayCleared === true) feedback.push('❌ Airway wasn\'t needed')

    if (p.code === Code.MINOR && (p.respiratoryRate !== undefined || p.obeys !== undefined || p.capillaryRefill !== undefined)) {
      feedback.push('❌ You didn\'t need to proceed beyond checking mobility')
    } else if (p.respiratoryRate !== undefined && (p.obeys !== undefined || p.capillaryRefill !== undefined)) {
      feedback.push('❌ You didn\'t need to proceed beyond checking the respiratory rate')
    } else if (p.capillaryRefill !== undefined && p.obeys !== undefined) {
      feedback.push('❌ You didn\'t need to proceed beyond checking the capillary refill')
    }

    return feedback
  }
}

export const START = new Start()
