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
  bleeding?: boolean
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
}

class Start extends TriageAlgorithm {
  newPatient (code: Code, id?: number): Patient {
    const age = randomInt(0, 80)
    const airwayObstruction = code === Code.IMMEDIATE ? randomBool(0.3) : false
    const bleeding = randomBool(0.3) ? true : undefined

    return { id: id ?? randomInt(0, 500), age, code, airwayObstruction, bleeding }
  }

  controlBleeding (): Partial<Patient> {
    return { bleeding: false }
  }

  clearAirway (): Partial<Patient> {
    return { airwayCleared: true }
  }

  checkRespiratoryRate ({ code, airwayObstruction, airwayCleared }: Patient): Partial<Patient> {
    const obstructed = airwayObstruction && airwayCleared !== true

    let respiratoryRate = 0
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
}

export const START = new Start()
